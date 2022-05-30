/**
 * Copyright (c) 2021 Netix AB. -  Patrik Forsberg <patrik.forsberg@coldmind.com>
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { RealtimeServer }         from "@app/api/realtime-server";
import { IRealtimeServer }        from "@app/api/realtime-server";
import { Tags }                   from "@app/app.const";
import { AdminRestController }    from "@app/rest-api/controllers/admin.rest-controller";
import { AppRestController }      from "@app/rest-api/controllers/app.rest-controller";
import { MessagesRestController } from "@app/rest-api/controllers/messages.rest-controller";
import { OrdersRestController } from "@app/rest-api/controllers/orders.rest-controller";
import { TaxiAppServer }        from "@app/app-server";
import { ITaxiAppServer }       from "@app/app-server";
import { IServerHandler }       from "@taxijakt/server/server-handler";
import { UserServerHandler }      from "@taxijakt/server/user.server-handler";
import { registry }               from "tsyringe";
import { singleton }              from "tsyringe";
import { IApiClient }             from "@app/rest-api/rest-client";
import { IBootstrap }             from "@cmCore/bootstrap";
import { ICmApplication }         from "@cmCore/cm-application";
import { ICmHttpClient }          from "@cmCore/http/cm-http-common";
import { CmPromiseHttpClient }    from "@cmCore/http/cm-promise-http-client";
import { IRestApiController }     from "@cmRest/types/api-controller.type";
import { AppMain }                from "@app/app.main";
import DependencyContainer        from "tsyringe/dist/typings/types/dependency-container";

@registry([
			  { token: Tags.ApiController, useToken: AdminRestController },
			  { token: Tags.ApiController, useToken: AppRestController },
			  { token: Tags.ApiController, useToken: OrdersRestController }
		  ])
@singleton()
export class AppBootstrap implements IBootstrap {
	initialize(container: DependencyContainer): void {
		container.registerSingleton<ICmApplication>(AppMain);
		container.register<ITaxiAppServer>(TaxiAppServer, { useClass: TaxiAppServer });
		container.register<ICmHttpClient>(CmPromiseHttpClient, { useClass: CmPromiseHttpClient });

		3//
		// Realtime API
		//
		container.registerSingleton<IRealtimeServer>(RealtimeServer);

		//
		// Rest API
		//
		container.register<IRestApiController>(AdminRestController, { useClass: AdminRestController });
		container.register<IRestApiController>(MessagesRestController, { useClass: MessagesRestController });
		container.register<IRestApiController>(OrdersRestController, { useClass: OrdersRestController });

		//
		// Server Handlers
		//
		container.register<IServerHandler>(UserServerHandler, { useClass: UserServerHandler });
		container.resolve(AppMain);
	}
}
