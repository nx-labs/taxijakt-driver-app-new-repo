/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { Crayon }     from "@cmUtils/crayon";
import { injectable } from "tsyringe";
const log = console.log;


@injectable()
export class LoggingService {
	public out(...data: any[]): void {
		console.log(data);
	}

	public logRed(logMessage: string, logData: any = null) {
		log(Crayon.redBright(logMessage + '::'), Crayon.redBright(logData));
	}

	public logYellow(logMessage: string, logData: any = "") {
		log(Crayon.yellow(logMessage), logData);
	}

	public logCyan(logMessage: string, logData: any = "") {
		log(Crayon.cyan(logMessage), logData);
	}

	public logApiGet(caller?: any, url?: string, method: string = "GET", params?: any[]) {
		let _func_ = caller ? caller?.constructor?.name : "<unknown-func>";

		console.log("ApiGet Error: *****");
		console.log("Func ::", _func_, method, true, params)
	}

	public error(...data: any[]): void {
		console.error(data);
	}
}
