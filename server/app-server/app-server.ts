/**
 * Copyright (c) 2021 Netix AB. -  Patrik Forsberg <patrik.forsberg@coldmind.com>
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { RealtimeServer }        from "@app/api/realtime-server";
import { AppConst }              from "@app/app.const";
import { AppEvents }             from "@app/app.events";
import { PConsole }              from "@app/core/cm-pconsole/pconsole";
import { DebugBooking }          from "@app/debug/debug-booking";
import { CustomSettings }        from "@app/app-settings";
import { IDriverUpdateResponse } from "@app/types/driver-update-response.type";
import { IActionMessage }        from "@cmCore/messages/action-message";
import { IApiResponse }          from "@cmCore/messages/message-types"
import { ISocketEvent }          from "@cmCore/websocket/socket-event";
import { CmEventService }        from "@cmEvents/cm-event.service";
import { Logger }                from "@cmUtils/logger";
import { AppConfig }             from "@shared/app.config";
import { DriverStatusType }      from "@shared/driver/driver-status";
import { DriverStatus }          from "@shared/driver/driver-status";
import { MsgType }               from "@shared/messages/message-types";
import { IMessage }              from "@shared/messages/message-types";
import { IMsgData }              from "@shared/messages/msg-data";
import { DriverCarOptions }      from "@shared/driver/driver-car-options";
import { OrderAction }           from "@shared/types/order-action";
import { DataUtils }             from "@shared/utils/data.utils";
import { VarUtils }              from "@shared/utils/var.utils";
import { PhpClient }             from "@taxijakt/php-web-integration/php-client";
import { DriverEntry }           from "@taxijakt/server/driver-entry";
import { ISrvDriverData }        from "@taxijakt/types/driver-data.type";
import { ISrvDriverEntry }       from "@taxijakt/types/driver-entry.type";
import { ITJWebDriver }          from "@taxijakt/types/login-response.type";
import { ITJWebLoginResp }       from "@taxijakt/types/login-response.type";
import * as querystring          from "querystring";
import { injectable }       from "tsyringe";
import DRIVER_UPDATE_INTERVAL = AppConst.DRIVER_UPDATE_INTERVAL;

const crypto = require('crypto');
const log    = Logger;

export interface ITaxiAppServer {
}

@injectable()
export class TaxiAppServer implements ITaxiAppServer {
	drivers = new Array<ISrvDriverEntry>();

	updTimer: any;

	private taxijaktApp: PhpClient;

	constructor(
		private rtServer: RealtimeServer,
		private eventService: CmEventService,
		private logger: Logger,
		private pLog: PConsole
	) {
		this.taxijaktApp = new PhpClient();
		this.startTimers();

		rtServer.eventStream.subscribe(
			(event: ISocketEvent) => {

				let evType = -90000;

				if (event && event.jsonPayload) {
					evType = event.jsonPayload.type;
				}

				logger. log("(SUB) eventStream Data ::", );

				if (event.jsonPayload) {
					//
					// Special threatment for login since it does
					// not require a dataEntry or anything
					//
					if (event.jsonPayload.type === MsgType.DriverLogin) {
						log.logBlue("MsgType.DriverLogin ::", event.jsonPayload);
						this.processLogin(event.jsonPayload);
					}
					else if (event.jsonPayload.type === MsgType.ShowDebug) {

					}
					else if (event.jsonPayload.type === MsgType.DebugBooking) {
						new DebugBooking().bookTaxi();
					}
					else {
						this.processMessage(event.jsonPayload);
					}
				}
			}
		);
	}

	private executeTimer() {
		for (let entry of this.drivers) {
			this.requestDriverUpdate(entry);
		}
	}

	private startTimers(): void {
		this.updTimer = setInterval(
			() => {
				this.executeTimer();
			},
			DRIVER_UPDATE_INTERVAL
		);
	}

	/**
	 * Retrieve driver data by UUID
	 * @param {string} uuid
	 * @returns {ISrvDriverEntry}
	 */
	private getDriverEntryByUUID(uuid: string): any {
		let result: ISrvDriverEntry = null;

		for (let entry of this.drivers) {
			//console.log(`Entry UUID ${entry.uuid} given UUID ${uuid}`);

			if (entry.uuid === uuid) {
				result = entry;
				break;
			}
		}

		return result;
	}

	private getDriverEntryById(id: string): ISrvDriverEntry {
		let result: ISrvDriverEntry = null;

		for (let entry of this.drivers) {
			if (entry.id == id) {
				result = entry;
				break;
			}
		}

		return result;
	}

	private getDriverEntries(uuid: string): [ boolean, string, ISrvDriverEntry, ISrvDriverData ] {
		let success: boolean                = true;
		let errorMessage: string            = undefined;
		let driverEntry: ISrvDriverEntry    = undefined;
		let driverDataEntry: ISrvDriverData = undefined;

		if (uuid) {
			driverEntry     = this.getDriverEntryByUUID(uuid);
			driverDataEntry = driverEntry?.data;
		}

		if (!driverDataEntry) {
			errorMessage = `Could not get DriverDataEntry for UUID "${ uuid }"`;
			success      = false;
		}

		if (!driverEntry) {
			errorMessage = `Could not get DriverData for UUID "${ uuid }"`;
			success      = false;
		}

		return [ success, errorMessage, driverEntry, driverDataEntry ];
	}

	public replyMsg(msg: IMessage, data: IMsgData): Promise<IActionMessage> {
		const result: IMessage = {
			type: -1,
			tag: msg.tag
		}

		return null;
	}

	private composeResponseMsg(msgType: number, uuid: string, msgData?: any): IMessage {
		return {
			type: msgType,
			uuid: uuid,
			data: msgData
		}
	}

	private stopTimers(): void {
		clearTimeout(this.updTimer);
	}

	/**
	 * Perform user login
	 * @param {IMessage} msg
	 * @returns {Promise<IMessage>}
	 */
	public async loginUser(msg: IMessage): Promise<IMessage> {
		console.log("################################# ***** AppServer ::: LOGIN :::: ********");

		try {
			let loginRes = await this.taxijaktApp.loginUser(
				msg.data.user,
				msg.data.pass
			);

			msg.data = loginRes;

			log.logBlue("AppServer :: loginUser ::", loginRes);
		}
		catch (e) {
			log.error("loginUser :: Failed ::", e);
		}

		return msg;
	}

	/**
	 * Method handling incoming WS Messages
	 * @param {IMessage} msg
	 * @param requireLogin
	 * @returns {Promise<IMessage>}
	 */
	public async processMessage(msg: IMessage, requireLogin: boolean = true): Promise<IMessage> {
		let result: Promise<IMessage> = null;

		if (CustomSettings.MutedEvents.indexOf(msg.type) === -1) {
			console.log("***** NEW MESSAGE :::", msg)
		}

		if (msg && msg.uuid) {
			if (!this.getDriverEntryByUUID(msg.uuid)) {
				log.error("*** Need to re-authenticate ***");
				this.rtServer.sendMessage(MsgType.NeedReauthentication, msg.uuid);
				return;
			}
		}

		let driverEntry: ISrvDriverEntry;
		let driverDataEntry: ISrvDriverData;

		if (msg.uuid) {
			driverEntry = this.getDriverEntryByUUID(msg.uuid);
		}

		if (requireLogin) {
			//
			// Verify that both entry and entry data is present, otherwize
			// throw exception...
			//
			if (!driverEntry && msg.type !== MsgType.DriverLogin) {
				let errMsg = {
					type        : MsgType.Error,
					errorMessage: `Could not get DriverEntry for UUID "${ msg.uuid }"`
				}

				Logger.error(errMsg);
				return errMsg;
			}
		}

		driverDataEntry = driverEntry?.data;

		console.log("driverEntry '::", driverDataEntry.webSession);

		switch (msg?.type) {
			case MsgType.SetDriverStatus:
				if (VarUtils.isString(msg?.data)) {
					driverEntry.data.status = msg.data as string;
					this.requestDriverUpdate(driverEntry);
				}
				break;

			case MsgType.SetDriverBusy:
				await this.rtServer.reply(
					msg,
					await this.taxijaktApp.driverBusy(msg.data.minutes, driverDataEntry.webSession)
				);
				break;

			case MsgType.DriverLogOut:
				log.logRed(`Logging out driver with session ${ driverDataEntry.webSession }`);
				this.taxijaktApp.logoutUser(driverDataEntry.webSession)
				break;

			//
			// Get Cars
			//
			case MsgType.GetCars:
				log.logYellow("MsgType.GetCars :: webSession ::", driverDataEntry.webSession);
				let cars = await this.taxijaktApp.getDriverCars(driverDataEntry.webSession);

				console.log("*** MsgType.GetCars ::", cars);

				let resp = this.composeResponseMsg(msg?.type, msg.uuid, cars);

				console.log("*** MsgType.GetCars :: resp ::", resp);

				await this.rtServer.reply(resp, cars);

				break;

			case MsgType.SetCurrentCar:
				log.logYellow("MsgType.SetCurrentCar :: called");
				let options = msg.data as DriverCarOptions;
   				/*
				 session=705337-a2646e0a1bda58dc3cd2e97a44ebc4f2&car_id=2630&baby_seats=2&child_seats=2&booster_seats=2&has_shield=0&animals_in_cage=1&animals_without_cage=1
				 */
				break;

			case MsgType.UpdateDriverData:
				// log.logYellow("MsgType.DriverUpdate ::", msg);
				let driver = this.getDriverEntryByUUID(msg.uuid);

				if (driver) {
					driver.lat      = msg.data.lat;
					driver.lon      = msg.data.lon;
					driver.accuracy = msg.data.accuracy;
				}

				await this.rtServer.reply(msg, driver);
				break;

			case MsgType.GetOrdersBySession:
				log.logCyan("TaxiAppServer:: MsgType.GetOrdersBySession", msg);
				let res = await this.taxijaktApp.getActiveOrdersBySession(driverDataEntry.webSession);
				await this.rtServer.reply(msg, res);
				break;

			case MsgType.GetMessagesBySession:
				break;

			case MsgType.AcceptOrder:
				await this.rtServer.reply(
					msg,
					await this.taxijaktApp.orderAction(OrderAction.Accept, msg.data.id, driverDataEntry.webSession)
				);
				break;

			case MsgType.DenyOrder:
				let denyResult = await this.taxijaktApp.orderAction(OrderAction.Deny, msg.data.id, driverDataEntry.webSession);

				console.log("DENY RESULT :::", denyResult);

				await this.rtServer.reply(
					msg,
					denyResult
				);
				break;

			case MsgType.CompleteOrder:
				await this.rtServer.reply(
					msg,
					//await this.taxijaktApp.orderAction(OrderAction.Complete, msg.data.id, driverDataEntry.webSession)
					await this.taxijaktApp.completeOrder(msg.data.id, driverDataEntry.webSession)
				);
				break;

			case MsgType.CustomerNoShow:
				await this.rtServer.reply(
					msg,
					await this.taxijaktApp.orderAction(OrderAction.CustomerNoShow, msg.data.id, driverDataEntry.webSession)
				);
				break;

			case MsgType.CantCompleteOrder:
				await this.rtServer.reply(
					msg,
					await this.taxijaktApp.orderAction(OrderAction.CantDeliver, msg.data.id, driverDataEntry.webSession)
				);
				break;
		}

		return result;
	}

	private removeSession(uuid: string): boolean {
		let result: boolean = false;
	}

	private async requestDriverUpdate(entry: ISrvDriverEntry): Promise<void> {
		const axios = require('axios');
		axios.default.withCredentials = true;

		/*
		 lat	"65.58488538690582"
		 lng	"22.132562562790763"
		 */

		entry.lat      = 65.58485856997812;
		entry.lon      = 22.1326283826008;
		entry.accuracy = 65

		let cmFormData = {
			session           : encodeURIComponent(entry.data.webSession),
			jadi              : entry.data.jadi,
			androidVersionName: '10.0',
			lat               : entry.lat,
			lng               : entry.lon,
			accuracy          : entry.accuracy,
			provider          : "GPS/Web",
			time              : Date.now(),
			driverStatus      : entry.data ? entry.data.status : DriverStatusType.Available
		}

		/*
		 formData.append('lat', '65.5848249');
		 formData.append('lng', '22.1325158');
		 formData.append('accuracy', '15.449');
		 formData.append('located', '1643214597361');
		 formData.append('provider', 'GPS/Web');
		 formData.append('time', '1643214598772');
		 formData.append('position_timestamp', '1643214597361');
		 */

		let rawFormData   = querystring.stringify(cmFormData);
		let contentLength = rawFormData.length;

		let config = {
			method : 'post',
			url    : `${ AppConfig.TaxijaktOldBaseUri }/zf/driver/api/driver-update`,
			mode: 'cors',
			headers: {
				'Content-Length': contentLength,
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
				//'Content-Type'  : 'application/x-www-form-urlencoded',
				"Accept": "*/*",
				'Access-Control-Allow-Origin': '*',
				"Accept-Language": "en-US,en;q=0.5",
				"gHost": "dev.taxijakt.se",
				"X-Requested-With": "XMLHttpRequest",
			},
			withCredentials: true,
			data   : rawFormData
		};

		axios(config).then((response) => {
			this.parseDriverUpdateResponse(response.data, entry.uuid);
		}).catch((error) => {
			log.error(error);
		});
	}

	/**
	 * The every sec update message received from t
	 * @param data
	 * @param {string} uuid
	 */
	private async parseDriverUpdateResponse(data: any, uuid: string): Promise<void> {
		let tmpPayload: any = {};

		console.log("parseDriverUpdateResponse ::", data);

		let updateResponse = data as IDriverUpdateResponse;

		if (updateResponse.driver_status === DriverStatusType.NoSessionFound) {
			console.log("<<<<<< LOGGED OUT >>>>>");
			this.removeSession(uuid);

			await this.rtServer.sendMessage(
				MsgType.LoggedOut,
				uuid,
				null
			);

			return;
		}

		let driverEntry: ISrvDriverEntry = this.getDriverEntryByUUID(uuid);
		driverEntry.data.status = updateResponse.driver_status;

		if (!driverEntry) {
			log.logRed(`parseDriverUpdateResponse :: driverEntry is missing for UUID ${ uuid }`);
			return;
		}

		function toSHA2Str(data: any): string {
			const sha2 = crypto.createHash('sha256');
			return sha2.update(JSON.stringify(data)).digest("hex");
		}

		driverEntry. orders      = data.orders;
		let messages    = data.messages;
		let availOrders = data.available_orders;

		let dataPayload = {
			orders     : orders,
			messages   : messages,
			availOrders: availOrders,
			info       : data?.driver,
			driverEntry: driverEntry
		}

		let respMsg: IMessage = {
			type: MsgType.DriverUpdate,
			uuid: uuid,
			data: dataPayload
		}

		orders      = DataUtils.ensureArray(data.orders);
		messages    = DataUtils.ensureArray(data.messages);
		availOrders = DataUtils.ensureArray(data.available_orders);

		let ordersEmpty      = DataUtils.arrayIsEmpty(orders);
		let messagesEmpty    = DataUtils.arrayIsEmpty(messages);
		let availOrdersEmpty = DataUtils.arrayIsEmpty(availOrders);

		//if (!CustomSettings.MuteDriverUpdateLog)
			console.log("Emitting Driver Update ::", respMsg);

		await this.rtServer.emit("parseDriverUpdateResponse", respMsg);

		/*
		 if (ordersEmpty && messagesEmpty && availOrdersEmpty) {
		 //log.out("driverUpdate :: Nothing to emit ::", respMsg.uuid);
		 }
		 else {
		 //log.out("driverUpdate :: Emitting message :: DriverUpdate ::", respMsg);
		 this.rtServer.emit(respMsg);
		 }
		 */

		/*
		 let ordersHash: string      = toSHA2Str(orders);
		 let messagesHash: string    = toSHA2Str(messages)
		 let availOrdersHash: string = toSHA2Str(availOrders);

		 if (ordersHash !== driverEntry.ordersHash) {
		 driverEntry.ordersHash = ordersHash;
		 tmpPayload.orders      = orders;
		 }

		 if (messagesHash !== driverEntry.messagesHash) {
		 driverEntry.messagesHash = messagesHash;
		 tmpPayload.messages      = messages;
		 }

		 if (availOrdersHash !== driverEntry.availOrdersHash) {
		 driverEntry.availOrdersHash = availOrdersHash;
		 tmpPayload.availOrders      = availOrders;
		 }

		 // TODO: Remove "true debug"
		 if (true) {//(Object.keys(tmpPayload).length > 0) {
		 log.logBlue("driverUpdate :: Emitting AppEvents.DriverUpdate");

		 let dataPayload = {
		 orders     : orders,
		 messages   : messages,
		 availOrders: availOrders
		 }

		 let msg: IMessage = {
		 type: AppEvents.DriverUpdate,
		 uuid: driverEntry.uuid,
		 data: dataPayload
		 }

		 log.out("driverUpdate :: Emitting message :: DriverUpdate ::", msg);

		 this.rtServer.emit(msg)


		 /*
		 let newDriverObj: ISrvDriverData = {
		 id         : driverEntry.id,
		 name       : driverEntry.name,
		 status     : driverEntry.shift,
		 webSession : apiResp.data.web_session,
		 cardsIdent : apiResp.data.cards_identifier,
		 lastUpdated: Date.now(),
		 lastPong   : Date.now(),
		 data       : updateResponse,
		 jadi       : apiResp.data.jadi
		 };

		 let newEntry = new DriverEntry(msg.uuid, updateResponse.id, newDriverObj);

		 console.log("DRIVER OBJ ::", newDriverObj);

		 let addDriver = true;

		 for (let driverIdx in this.drivers) {
		 let driverEntry = this.drivers[ driverIdx ];

		 if (driverEntry.id == newDriverObj.id) {
		 log.logCyan("processLoginR OBJ ::", newDriverObj);
		 this.drivers[ driverIdx ] = newEntry;
		 addDriver                 = false;
		 break;
		 }
		 }

		 if (apiResp) {
		 this.drivers.push(newEntry);
		 }

		 this.eventService.publishEvent(AppEvents.DriverLogin, apiResp.data);
		 1this.rtServer.emit(loginRes);

		 }
		 */
	}

	private async processLogin(msg: IMessage): Promise<void> {
		let loginRes: IMessage    = await this.loginUser(msg);
		let apiResp: IApiResponse = loginRes.data;
		log.logCyan("processLogin :: msg ::", msg);

		//
		// If successful login
		//  -> Add user to the list of drivers
		//  -> Send response to driver app
		//  -> Trigger internal event
		//
		if (apiResp.success) {
			let webAppRespData: ITJWebLoginResp = apiResp.data;
			let driverData: ITJWebDriver        = webAppRespData.driver;

			this.pLog.log("Login Success ::: MSG ::", msg);
			this.pLog.log("Login Success ::: D1 ::", webAppRespData);
			this.pLog.log("Login Success ::: D2 ::", driverData);

			// Create Driver Object
			let newDriverObj: ISrvDriverData = {
				id         : driverData.id,
				uuid       : msg.uuid,
				name       : driverData.name,
				status     : driverData.shift,
				webSession : apiResp.data.web_session,
				cardsIdent : apiResp.data.cards_identifier,
				lastUpdated: Date.now(),
				lastPong   : Date.now(),
				data       : driverData,
				jadi       : apiResp.data.jadi
			};

			let newEntry = new DriverEntry(msg.uuid, driverData.id, newDriverObj);

			this.pLog.log("Driver Object ::", newDriverObj);

			let addDriver = true;

			for (let driverIdx in this.drivers) {
				let driverEntry = this.drivers[ driverIdx ];

				if (driverEntry.id == newDriverObj.id) {
					this.pLog.log("#SRV: UPDATE DRIVER OBJ ::", newDriverObj);
					this.drivers[ driverIdx ] = newEntry;
					addDriver                 = false;
					break;
				}
			}

			if (apiResp) {
				this.drivers.push(newEntry);
			}

			this.eventService.publishEvent(AppEvents.DriverLogin, apiResp.data);
			this.rtServer.emit("login", loginRes);
		}
	}
}
