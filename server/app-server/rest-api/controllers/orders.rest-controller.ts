/**
 * Patrik Forsberg <patrik.forsberg@coldmind.com>
 */

import { AppEvents }          from "@app/app.events";
import { log }                from "@cmUtils/logger";
import { injectable }         from "tsyringe";
import { IMessage }           from "@cmCore/messages/message-types";
import { BaseRestController } from "@cmRest/common/base.rest-controller";
import { IRestApiController } from "@cmRest/types/api-controller.type";
import { ApiHub }             from "@app/api/api-hub";
import { RT_API_VERSION }     from "@app/app.const";
import { APP_VERSION }        from "@app/app.const";
import { REST_API_VERSION }   from "@app/app.const";
import { Router }             from "express";
import { Response }           from "express";
import { Request }            from "express";

@injectable()
export class OrdersRestController extends BaseRestController implements IRestApiController {

	constructor(private apiHub: ApiHub) {
		super();
	}

	public initRoutes(routes: Router): IRestApiController {
		this.setupRoutes(this);
		routes.get("/order", this.order.bind(this));
		routes.get("/session-order", this.sessionOrders.bind(this));

		return this;
	}

	private order(req: Request, resp: Response): void {
		let mess: IMessage = {
			type: AppEvents.NewOrderEvent,
			data: {
				departure  : "Kalle Kulastigen 1, Stockholm",
				destination: "Swedenborgsgatan 2, Stockholm",
				geoPoint   : {
					lat: "4674435.345",
					lng: "3453424.3455"
				}
			}
		};

		console.log("OrdersRestController :: order ::", mess)

		this.apiHub.sendMessage(mess);

		resp.json(
			{
				APP_VERSION         : APP_VERSION,
				REST_API_VERSION    : REST_API_VERSION,
				REALTIME_API_VERSION: RT_API_VERSION
			}
		);
	}


	private sessionOrders(req: Request, resp: Response): void {
		let mess: IMessage = {
			type: AppEvents.NewOrderEvent,
			data: {
				departure  : "Kalle Kulastigen 1, Stockholm",
				destination: "Swedenborgsgatan 2, Stockholm",
				geoPoint   : {
					lat: "4674435.345",
					lng: "3453424.3455"
				}
			}
		};

		console.log("OrdersRestController :: order ::", mess)

		this.apiHub.sendMessage(mess);

		resp.json(
			{
				APP_VERSION         : APP_VERSION,
				REST_API_VERSION    : REST_API_VERSION,
				REALTIME_API_VERSION: RT_API_VERSION
			}
		);
	}


}
