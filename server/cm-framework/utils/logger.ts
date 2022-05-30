/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { DebugReportingLevel } from "@shared/logging/cm-logger";
import { singleton }           from "tsyringe";

let chalk = require("chalk");

export function log(message?: any, ...optionalParams: any[]): any {
	console.log(message, optionalParams);
}

export function error(message?: any, ...optionalParams: any[]): any {
	console.error(message, optionalParams);
}

@singleton()
export class Logger {
	public static log(...data: any[]) {
		console.log(data);
	}

	public static error(...data: any[]) {
		console.error(data);
	}

	public static spit(num: number = 1, what: string = ' ') {
		for (let i = 0; i < num; i++) {
			console.log(what);
		}
	}

	public static out(logMessage: string, logData: any = null) {
		if (logData != null) {
			log(chalk.green(logMessage), logData);
		}
		else {
			log(chalk.yellow(logMessage));
		}
	}

	public static logSign(message: string): void {
		log('=======================================================');
		log(message);
		log('=======================================================');
	}

	private static makeLine(count: number, char: string = "-"): string {
		let line = "";
		for (let i = 0; i < count; i++) {
			line += char;
		}
		return line;
	}

	public static logObject(obj: any, title: string = null) {
		if (title != null) {
			Logger.logYellow("-- Obj: " + title);
			Logger.logYellow(Logger.makeLine(title.length + 10));
		}

		for (let key in obj) {
			if (obj.hasOwnProperty(key)) {
				Logger.logYellow(key, obj[key]);
			}
		}
	}

	public static objMethod(caller: any, ...data: Array<string>) {
		let objName: string = "";

		if (caller && caller.constructor && caller.constructor.name) {
			objName = caller.constructor.name
		}

		this.logCyan(objName, data.join(" :: "));
	}

	/**
	 * Standard Debug Log
	 *
	 * @param caller - object, used to getAs class field
	 * @param logMessage - The message to print
	 * @param logData - Optional configureWebServer such as configureWebServer structures
	 */
	public static callerLog(caller: any, logMessage: string, logData: any = "") {
		let callerName = (caller.constructor.name && caller.constructor && caller.constructor.name) ? caller.constructor.name : "<unknown called>";
		log(chalk.cyan("[log] " + callerName + " :: " + logMessage), logData);
	}

	public static callerError(caller: any, logMessage: string, logData: any = "") {
		let callerName = (caller.constructor.name && caller.constructor && caller.constructor.name) ? caller.constructor.name : "<unknown called>";
		log(chalk.red("[error] " + caller.constructor.name + " :: " + logMessage), logData);
	}

	public static logDebug(logMessage: string, logData: any = "") {
		log(chalk.cyan("#DEBUG :: " + logMessage), logData);
	}

	public static explicitError(scope: any, currFunc: string, err?: Error): void {
		log(chalk.red(`#ERROR :: ${ scope.constructor.name } :: ${ currFunc }`), err);
	}

	public static logDebugErr(logMessage: string, data: any = null) {
		data = data !== null ? JSON.stringify(data) : null;

		if (data === null) {
			log(chalk.red("#ERR :: " + logMessage));
		}
		else {
			log(chalk.red("#ERR :: " + logMessage + " :: " + data));
		}
	}

	public static logStd(caller: any, logMessage: string, logData: any = "") {
		log(chalk.cyan("#DEBUG :: " + logMessage), logData);
	}

	public static logAppError(caller: any, logMessage: string, logData: any = "") {
		log(chalk.red("#ERROR :: " + caller.constructor.name + " :: " + logMessage), logData);
	}

	public static logCoreInfo(caller: any, logMessage: string, logData: any = "") {
		log(chalk.cyan("#DEBUG :: " + caller.constructor.name + " :: " + logMessage), logData);
	}

	public static logSuccessMessage(message: string, success: boolean) {
		if (success) {
			log(chalk.bold.black.bgGreen("# SUCCESS ") + chalk.black.bgGreen(message));
		}
		else {
			log(chalk.bold.white.bgRed("# FAILED ") + chalk.white.bgBlack(message));
		}
	}

	public static logExtDebug(level: DebugReportingLevel, logMessage: string) {
		log(chalk.green(logMessage));
	}

	public static logWarning(warningMessage: string, logData: any = null) {
		logData = logData == null ? "" : logData;
		log(chalk.bgYellow.black(warningMessage), logData);
	}

	public static logFatalErrorMess(errorMessage: string, logData: any = "") {
		let data = logData != null ? " ::: " + JSON.stringify(logData) : "";
		log(chalk.white.underline.bgRed(errorMessage + logData));
	}

	public static logFatalError(errorMessage: string, error: Error = null) {
		if (error == null) {
			log(chalk.white.underline.bgRed(errorMessage));
		}
		else {
			log(chalk.white.underline.bgRed(errorMessage), error);
		}
	}

	public static logErrorMessage(errorMessage: string, error: Error = null) {
		if (error == null)
			log(this.error(errorMessage));
		else
			log(this.error(errorMessage), error);
	}

	public static logErrorWithStrongWord(begin: string, strongWord: string, end: string) {
		log(chalk.bold.red(begin) + " " + chalk.bold.white.bgRed(strongWord) + " " + chalk.bold.red(begin));
	}

	public static logOut(logMessage: string, logData: any = null) {
		logData = logData == null ? "" : logData;
		log(this.error(logMessage), logData);
	}

	public static logError(logMessage: string, logData?: any) {
		if (logData) {
			log(this.error(logMessage), logData);
		}
		else {
			log(this.error(logMessage));
		}
	}

	public static le(caller: any, logMessage: string, logData?: any) {
		const callerName = caller && caller.constructor && caller.constructor.name ?
						   caller.constructor.name : "unknown caller";

		Logger.logError(`${ callerName } :: ${ logMessage } ::`, logData);
	}

	/**
	 *
	 * @param success
	 * @param logData
	 * @param logMessages
	 */
	public static globalDebug(success: boolean, logData: any = null, ...logMessages: Array<string>) {
		let message = logMessages.join(":::");
		if (success) {
			Logger.logGreen(message, logData);
		}
		else {
			Logger.logRed(message, logData);
		}
	}

	public static prepStr(logMessage: string, logData: any = null): string {
		logData = logData == null ? "" : JSON.stringify(logData);
		return logMessage + " #> " + logData;
	}

	public static logGreenPrefix(prefix: string, logMessage: string, logData: any = null) {
		let logStr = Logger.prepStr(logMessage, logData);
		log(chalk.bold.black.bgGreen("#" + prefix + ":") + chalk.greenBright(logStr));
	}

	public static logRedPrefix(prefix: string, logMessage: string, logData: any = null) {
		let logStr = Logger.prepStr(logMessage, logData);
		log(chalk.bold.white.bgRed("#" + prefix + ":") + chalk.red(logStr));
	}

	public static logGreen(logMessage: string, logData: any = null) {
		if (logData) {
			log(chalk.greenBright(logMessage), chalk.greenBright(logData));
		}
		else {
			log(chalk.greenBright(logMessage));
		}
	}

	public static logRed(logMessage: string, logData: any = null) {
		log(chalk.red(logMessage + '::'), chalk.red(logData));
	}

	public static logYellow(logMessage: string, logData: any = "") {
		log(chalk.yellow(logMessage), logData);
	}

	public static logCyan(logMessage: string, logData: any = "") {
		log(chalk.cyan(logMessage), logData);
	}

	public static logMega(logMessage: string, ...logData: any) {
		let dataArray = [];

		for (let data in logData) {
			if (logData.hasOwnProperty(data)) {
				dataArray.push(JSON.stringify(data))
			}
		}

		let dataStr = dataArray.join('\n');
		log(chalk.cyan(logMessage), dataStr);
	}

	public static logBlue(logMessage: string, logData: any = "") {
		log(chalk.blue(logMessage), logData);
	}

	public static logPurple(logMessage: string, logData: any = null) {
		if (logData == null) {
			log(chalk.magenta(logMessage));
		} else {
			log(chalk.magenta(logMessage), logData);
		}
	}

	public static logImportant(prefix: string, logMessage: string) {
		log(chalk.bold.white.bgBlue("#" + prefix + ":") + chalk.white.bgMagenta(logMessage));
	}
}

