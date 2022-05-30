/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import "reflect-metadata";
import { PathUtils }       from "@cmUtils/path.utils";
import { container }       from "tsyringe";
import { IBootstrap }      from "@cmCore/bootstrap";
import { AppBootstrap }    from "@app/app.bootstrap";
import * as path           from "path";
import { CmEventService }  from "@cmEvents/cm-event.service";
import { ICmEventService } from "@cmEvents/cm-event.service";

export class Main {
	constructor() {
		process.env.DB_DIR = path.resolve(PathUtils.getProjectRoot(), "data");
		console.log("DBDIR == ", process.env.DB_DIR);

		container.register<ICmEventService>(CmEventService, { useClass: CmEventService });
		container.register<ICmEventService>(CmEventService, { useClass: CmEventService });
		container.register<IBootstrap>(AppBootstrap, { useClass: AppBootstrap });

		let appBootstrap = container.resolve(AppBootstrap);
		appBootstrap.initialize(container);
	}
}

new Main();
