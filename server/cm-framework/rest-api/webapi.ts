/**
 * 2021 Patrik Forsberg <patrik.forsberg@coldmind.com>
 */

import { AppConfig }   from "@shared/app.config";
import { Settings }    from "@cmRest/settings";
import { log }         from "@cmUtils/logger";
import { Str }         from "@cmUtils/string.util";
import * as bodyParser from "body-parser";
import * as cors       from "cors";
import { Tags }        from "@app/app.const";
import { Router }      from "express";
import * as express    from "express";
import { registry }    from "tsyringe";
import { injectable }  from "tsyringe";
import { container }   from "tsyringe";
import { IRestApiController }   from "./types/api-controller.type";

@injectable()
export class WebApi {
	app: express.Application;
	server: any;
	webRoutes: Router                 = Router();
	controllers: IRestApiController[] = new Array<IRestApiController>();

	constructor() {
		log("Web Api Init");

		const envPort: number    = Str.toInt(process.env.PORT);
		const listenPort: number = !envPort ? Settings.ListenPort : envPort;

		this.app = express();

		this.webRoutes.use(bodyParser.json());
		this.webRoutes.use(bodyParser.urlencoded({ extended: true }));
		this.webRoutes.use(cors());
		this.webRoutes.options('*', cors());

		this.app.use(this.webRoutes);

		const controllers = container.resolveAll<IRestApiController>(Tags.ApiController);

		for (let controller of controllers) {
			controller.initRoutes(this.webRoutes);
		}

		this.listen();
	}

	public async listen(): Promise<boolean> {
		let result = true;

		let port: number = Number.parseInt(process.env.PORT);
		let host: string = process.env.HOST;

		if (!port) port = AppConfig.WebServerPort;
		if (!host) host = "0.0.0.0";

		log("Web Server Port", port);
		log("Web Server Host", host);

		try {
			this.server = await this.app.listen(port, host);
			console.log("Web Server is listening on port ::", port);
		}
		catch (err) {
			console.log('App Listen :: error ::', err);
			result = false;
		}

		return result;
	}
}
