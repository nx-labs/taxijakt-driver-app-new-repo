/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { Injectable }     from '@angular/core';
import { StorageService } from "@core/services/storage.service";
import { SocketEvents }   from "@core/socket-events";
import { NxEventService } from "@nxApp/events/nx-event.service";
import { CmLogger }       from "@shared/logging/cm-logger";
import { generateTag }    from "@utils/tag-generator";
import { Socket }         from 'ngx-socket-io';
import { of }             from "rxjs";
import { Observable }     from "rxjs";
import { Subject }        from "rxjs";
import { filter }         from "rxjs/operators";
import { DataTypeName }   from "../../coldmind/utils/cm-type-caster";
import { MsgType }        from "../../shared/messages/message-types";
import { IMessage }       from "../../shared/messages/message-types";
import { ApiFactory }     from "@api/api-factory";
import { LoggingService } from "./logging.service";
import { v4 as uuidv4 }   from 'uuid';

export interface ISocketMessage {
	data: any;
}

@Injectable(
	{
		providedIn: 'root'
	})
export class SocketService {
	public prevMessage: IMessage = { type: -1000 };
	public uuid: string;
	public subject                          = new Subject<IMessage>();
	public dataStream: Observable<IMessage> = this.subject.asObservable();

	public cmStream: Observable<any>;

	public oberveMessage<T>(tag: string = null, ...msgTypes: number[]): Observable<T> {
		tag = !tag ? new Date().getMilliseconds().toString() : tag;

		return this.subject.asObservable().pipe((msg: IMessage | any) => {
			let msgType = Number.isInteger(msg.type) && msgTypes.indexOf(Number(msg.type)) > -1 ? msg : null;
			return ( msgType && tag === ( msgType as any )?.tag ) ? msg : null;
		});
	}

	haveShownDriverData = false;

	constructor(
		private nxEvents: NxEventService,
		private storageService: StorageService,
		private logger: LoggingService,
		private socket: Socket
	) {
		const _funcName = 'SocketService::subscribe';

		this.ensureUUID();

		this.socket.on("disconnect", () => {
			alert("SOCKET DISCONNECT");
		})

		this.cmStream = new Observable(observer => {
			this.socket.fromEvent(SocketEvents.Message).subscribe(
				(message: IMessage) => {

					if (message.type === MsgType.DriverUpdate && !this.haveShownDriverData) {
						console.log("NEW SOCKET MESSAGE :: DRIVET DATA ::", message);
						this.haveShownDriverData = true;
					} else {

						if (message.type !== this.prevMessage.type) {
							this.prevMessage = message;
							console.log("NEW SOCKET MESSAGE ::", message);
						}
					}

					this.subject.next(message);
					observer.next(message);
				},
				(error: any) => {
					this.logger.error(_funcName, "::", error);
				})
		});
	}

	private async ensureUUID(): Promise<boolean> {
		if (!this.uuid) {
			let storedId = await this.storageService.get("uuid");

			this.logger.debug("UUID FROM STORAGE DB ::", storedId);

			if (!storedId) {
				storedId = uuidv4();
				await this.storageService.set("uuid", storedId);
			}

			this.uuid = storedId;
		}

		this.logger.debug("**** STORED UUID: ", this.uuid);

		return !( !this.uuid );
	}

	public getStream() {
		return this.subject.asObservable();
	}

	public handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			this.logger.error(error);
			this.logger.serverError('Error ::', error);
			this.logger.error(`${ operation } failed: ${ error.message }`);

			// Let the app keep running by returning an empty result.
			return of(result as T);
		};
	}

	public fake(type: MsgType, data: any) {
		this.subject.next(
			{
				type: type,
				data: data
			}
		);
	}

	typedStream(type: number): Observable<IMessage> {
		return this.cmStream.pipe(
			filter((val: IMessage) => {
				return val && val?.type == type;
			}),
		);
	}

	typedStreamByTag(type: number, tag: string): Observable<IMessage> {
		return this.cmStream.pipe(
			filter((val: IMessage) => {
				return (val && val?.type === type) && (tag === val?.tag);
			}),
		);
	}


	observeMessage<T>(msg: number, tag?: string): Observable<T> {
		return this.emitMessage<T>(msg, tag);
	}

	emitMessage<T>(msg: number | IMessage, tag?: string): Observable<T> {
		let msgType: number = Number.isInteger(msg) ? Number(msg) : ( msg as IMessage )?.type as number;
		tag = ( !tag ) ? generateTag() : tag;

		return this.oberveMessage<T>(tag, msgType);
	}

	m2(msg: IMessage, tag?: string): Observable<IMessage> {
		this.logger.out("m2 ::", msg);

		msg.uuid = this.uuid;

		if (tag) {
			msg.tag = tag;
		}
		else {
			msg.tag = ApiFactory.newTag();
		}

		const filterStream = this.cmStream.pipe(
			filter((value: any) => {
				this.logger.out("FILLE ::: FILTER", value);

				return value.tag ? value.tag === msg.tag : true;
			})
		);

		this.socket.emit(SocketEvents.Message, msg);

		return filterStream;
	}

	tagMsg(msg: IMessage, tag?: string): Observable<IMessage> {
		msg.uuid = this.uuid;

		if (tag) {
			msg.tag = tag;
		}
		else {
			msg.tag = ApiFactory.newTag();
		}

		this.socket.emit(SocketEvents.Message, msg);
		return this.typedStreamByTag(msg.type, msg.tag);
	}

	sendMessage(msg: IMessage, tag?: string): Observable<any> {
		msg.uuid = this.uuid;

		if (tag) {
			msg.tag = tag;
		}
		else {
			msg.tag = ApiFactory.newTag();
		}

		this.socket.emit(SocketEvents.Message, msg);
		return this.typedStream(msg.type);
	}

	public getMessage(msgType: number): Observable<IMessage> {
		return this.dataStream.pipe(
			filter((value: IMessage) => {
				return value.type == msgType;
			})
		);
	}
}
