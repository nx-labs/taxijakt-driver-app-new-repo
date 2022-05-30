/**
 * Copyright (c) 2021 Netix AB. -  Patrik Forsberg <patrik.forsberg@coldmind.com>
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { RestClient }       from "@app/rest-api/rest-client";
import { IApiResponse }     from "@cmCore/messages/message-types";
import { Logger }           from "@cmUtils/logger";
import { Str }              from "@cmUtils/string.util";
import { AppConfig }        from "@shared/app.config";
import { DriverCarOptions } from "@shared/driver/driver-car-options";
import { OrderAction }      from "@shared/types/order-action";
import { ITJWebDriver }     from "@taxijakt/types/login-response.type";
import { ITJWebLoginResp }  from "@taxijakt/types/login-response.type";
import { singleton }        from "tsyringe";

const log = Logger;

const httpProxy = require('http-proxy');

@singleton()
export class PhpClient extends RestClient {
	private currentMethod: string;

	constructor() {
		super();

		let targetUrl = `${AppConfig.TaxijaktOldBaseUri}/zf/driver/api/`;
		let proxyUrl = "127.0.0.1:85";

		let url = targetUrl;

		this.setBaseUrl(url);
	}

	public async jadi(): Promise<IApiResponse> {
		try {
			let dataResult = await this.go("jadi");

			return {
				success: dataResult.success,
				data   : dataResult.data,
				error  : dataResult.error
			}
		}
		catch (e) {
			return {
				success: false,
				error  : e
			}
		}
	}

	/**
	 * Combined Jadi and Login method
	 * @param {string} username
	 * @param {string} password
	 * @returns {Promise<IApiResponse>}
	 */
	public async webApiLogin(username: string, password: string): Promise<IApiResponse> {
		try {
			let jadiRes = await this.jadi();
			let jadiStr = "unknown";
			let session = null;

			if (jadiRes.success && jadiRes.data.jadi) {
				jadiStr = jadiRes.data.jadi;
			}

			// Must be a Zend Thing?? Expecting escaped + signs? uurrrgghhh
			username = encodeURIComponent(username);

			let data     = `username=${ username }&password=${ password }&session=${ session }&jadi=${ jadiStr }`
			let loginRes = await this.exec("login", data);

			log.logCyan("userLoginWebApi :: exex :::", loginRes);

			return {
				success: ( loginRes.data as ITJWebLoginResp ) != null,
				data   : {
					result: loginRes.data,
					jadi  : jadiStr
				}
			};

		}
		catch (e) {
			console.error(e)
		}
	}

	public async webApiLogout(username: string, password: string): Promise<IApiResponse> {
		let isSuccess = true;

		try {

		}
		catch(e) {
			isSuccess = false;
		}

		return {
			success: isSuccess
		};
	}

	public async loginUser(username: string, password: string): Promise<IApiResponse> {
		let loginResp = await this.webApiLogin(
			username,
			password
		);

		log.logCyan("loginUser :: userLoginWebApi :::", loginResp);

		let loginSuccess = loginResp.data.result && ( loginResp.data.result.driver as ITJWebDriver ) !== undefined;

		let msgData: IApiResponse = {
			success: loginSuccess
		}

		if (msgData.success) {
			msgData.data = {
				cards_identifier: loginResp.data.result.cards_identifier,
				web_session     : loginResp.data.result.session,
				jadi            : loginResp.data.jadi,
				driver          : loginResp.data.result.driver
			}
		}
		else {
			msgData[ "error" ] = loginResp.error;
		}

		return msgData;
	}

	public async logoutUser(session: string): Promise<void> {
		let data = `session=${ session }`
		let cars = await this.exec('logout', data);
	}

	/**
	 * Get cars available to the driver
	 * @param {string} session
	 * @returns {Promise<IApiResponse>}
	 */
	public async getDriverCars(session: string): Promise<IApiResponse> {
		let data = `session=${ session }`
		let apiResponse = await this.exec('get-driver-cars', data);

		log.objMethod(this, "getDriverCars :: session ::", session);
		log.logCyan("PhpClient :: getDriverCars ::", apiResponse.data);
		log.logCyan("PhpClient :: getDriverCars :: 2 ::", apiResponse.data.cars);

		return apiResponse.data.cars;
	}

	public async setCurrentCar(carOptions: DriverCarOptions): Promise<IApiResponse> {
		let data = carOptions.compile();
		return await this.exec('set-driver-current-car', data);
	}

	public async getFutureOrders(session: string): Promise<IApiResponse> {
		let payload = `session=${ session }`;
		return await this.exec('get-future-orders', payload);
	}

	/**
	 * Get ongoing orders by session
	 * @param {string} session
	 * @returns {Promise<IApiResponse>}
	 */
	public async getActiveOrdersBySession(session: string): Promise<IApiResponse> {
		let payload = `session=${ session }`;
		return await this.exec('get-active-orders-by-session', payload);
	}

	public completeOrder(orderId: string, session: string) {
		var axios = require('axios');
		var data = `session=${session}&id=${orderId}&driverForceFinish=0`;

		return new Promise((resolve, reject) => {
			var config = {
				method: 'post',
				url: 'https://dev.taxijakt.se/driver/api/order-completed',
				headers: {
					'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:100.0) Gecko/20100101 Firefox/100.0',
					'Accept': '*/*',
					'Accept-Language': 'en-US,en;q=0.5',
					'Accept-Encoding': 'gzip, deflate, br',
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
					'X-Requested-With': 'XMLHttpRequest',
					'Origin': 'https://dev.taxijakt.se',
					'Connection': 'keep-alive',
					'Referer': 'https://dev.taxijakt.se/zf/driver/web',
					'Cookie': 'referer=https%3A%2F%2Fdev.taxijakt.se%2Fzf%2Fdriver%2Fweb; http_referer=https%3A%2F%2Fdev.taxijakt.se%2Fzf%2Fdriver%2Fweb; http_referer=https%3A%2F%2Fdev.taxijakt.se%2Fzf%2Fdriver%2Fweb; referer=https%3A%2F%2Fdev.taxijakt.se%2Fzf%2Fdriver%2Fweb; http_referer=https%3A%2F%2Fdev.taxijakt.se%2Fzf%2Fdriver%2Fweb; referer=https%3A%2F%2Fdev.taxijakt.se%2Fzf%2Fdriver%2Fweb',
					'Sec-Fetch-Dest': 'empty',
					'Sec-Fetch-Mode': 'cors',
					'Sec-Fetch-Site': 'same-origin',
					'TE': 'trailers'
				},
				data : data
			};

			axios(config).then(function (response) {
					console.log("*******************##############################", JSON.stringify(response.data));
					resolve(response.data);
				})
				.catch(function (error) {
					console.log(error);

					reject(error);
				});

		});

	}


	/**
	 * Handle order
	 * @param {OrderAction} action
	 * @param {string} orderId
	 * @param {string} session
	 * @returns {Promise<IApiResponse>}
	 */
	public orderAction(action: OrderAction, orderId: string, session: string): Promise<IApiResponse> {
		let url: string;
		let payload = `id=${ orderId }&session=${ session }`;

		switch (action) {
			case OrderAction.Accept:
				url = "accept-order";
				break;

			case OrderAction.Complete:
				payload = `session=${ session }&id=${ orderId }&driverForceFinish=0`;
				url = "order-completed";
				break;

			case OrderAction.Deny:
				url = "deny-order";
				break;

			case OrderAction.CustomerNoShow:
				url = "customer-did-not-show-up";
				break;

			case OrderAction.CantDeliver:
				url = "driver-cant-deliver";
				break;
		}

		url = `https://dev.taxijakt.se/driver/api/${url}`;

		/*
		await fetch("https://dev.taxijakt.se/driver/api/accept-order", {
			"credentials": "include",
			"headers": {
				"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:99.0) Gecko/20100101 Firefox/99.0",
				"Accept-Language": "en-US,en;q=0.5",
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
				"X-Requested-With": "XMLHttpRequest",
				"Sec-Fetch-Dest": "empty",
				"Sec-Fetch-Mode": "cors",
				"Sec-Fetch-Site": "same-origin"
			},
			"referrer": "https://dev.taxijakt.se/zf/driver/web/",
			"body": "id=2172657&session=705530-58b8e81c8fdd34744986f4062cd3342f",
			"method": "POST",
			"mode": "cors"
		});
		*/

		console.log(`****** ORDER ACTION :: ${url} ::`, payload);

		return new Promise((resolve, reject) => {
			const axios = require('axios');

			const config = {
				method : 'post',
				url    : url,
				headers: {
					'User-Agent'      : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:100.0) Gecko/20100101 Firefox/100.0',
					'Accept'          : '*/*',
					'Accept-Language' : 'en-US,en;q=0.5',
					'Accept-Encoding' : 'gzip, deflate, br',
					'Content-Type'    : 'application/x-www-form-urlencoded; charset=UTF-8',
					'X-Requested-With': 'XMLHttpRequest',
					'Origin'          : 'https://dev.taxijakt.se',
					'Connection'      : 'keep-alive',
					'Referer'         : 'https://dev.taxijakt.se/zf/driver/web',
					'Cookie'          : 'referer=https%3A%2F%2Fdev.taxijakt.se%2Fzf%2Fdriver%2Fweb; http_referer=https%3A%2F%2Fdev.taxijakt.se%2Fzf%2Fdriver%2Fweb; http_referer=https%3A%2F%2Fdev.taxijakt.se%2Fzf%2Fdriver%2Fweb; referer=https%3A%2F%2Fdev.taxijakt.se%2Fzf%2Fdriver%2Fweb',
					'Sec-Fetch-Dest'  : 'empty',
					'Sec-Fetch-Mode'  : 'cors',
					'Sec-Fetch-Site'  : 'same-origin',
					'TE'              : 'trailers'
				},
				data   : payload
			};

			axios(config).then((response) => {

				console.log("\n\n************** ORDER RESPONSE *****************");
				console.log(response);

				console.log("\n\n************** // ORDER RESPONSE *****************");


				let resp: IApiResponse = {
					success: true,
					data: response.data,
					headers: response.headers
				};

				resolve(resp);
			}).catch((error) => {
				console.log(error);
				reject(error);
			});
		});
	}

	/**
	 * Set driver in busy m,ode for
	 * @param {string} session
	 * @param {number} minutes
	 * @returns {Promise<any>}
	 */
	public async driverBusy(minutes: number, session: string): Promise<any> {
		let driverEntry = this
		let data: Array<string> = [
			`session=${session}`,
			`min=${minutes}`
		];

		return await this.exec('driver-busy', data.join("&"));
	}

	public async orderCompleted(id: string, session: string, driverForceFinish: boolean = false): Promise<IApiResponse> {
		let data = `session=${ session }&id=${ id }&driverForceFinish=${ Str.boolToStr(driverForceFinish) }}`
		return await this.exec('order-completed', data);
	}
}
