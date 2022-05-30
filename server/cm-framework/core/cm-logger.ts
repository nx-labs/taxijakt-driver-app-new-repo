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
export class CmLogger {
	public logLevel = DebugReportingLevel.High;

	public log(...data: any[]) {
		log(data);
	}

	public debug(label: string, data: any) {
		if (this.logLevel === DebugReportingLevel.None) return;
	}

	public error(...data: any[]) {
		error(data);
	}

	public spit(num: number = 1, what: string = ' ') {
		for (let i = 0; i < num; i++) {
			log(what);
		}
	}

	public out(logMessage: string, logData: any = null) {
		if (logData != null) {
			log(chalk.green(logMessage), logData);
		}
		else {
			log(chalk.yellow(logMessage));
		}
	}

	private makeLine(count: number, char: string = "-"): string {
		let line = "";
		for (let i = 0; i < count; i++) {
			line += char;
		}
		return line;
	}

	public logSign(message: string): void {
		const horiz = '+-' + this.makeLine(message.length) + '-+';

		log(horiz);
		log('| ' + message + ' |');
		log(horiz);
	}

	public logObject(obj: any, title: string = null) {
		if (title != null) {
			this.logYellow("-- Obj: " + title);
			this.logYellow(this.makeLine(title.length + 10));
		}

		for (let key in obj) {
			if (obj.hasOwnProperty(key)) {
				this.logYellow(key, obj[key]);
			}
		}
	}

	/**
	 * Standard Debug Log
	 *
	 * @param caller - object, used to getAs class field
	 * @param logMessage - The message to print
	 * @param logData - Optional configureWebServer such as configureWebServer structures
	 */
	public callerLog(caller: any, logMessage: string, logData: any = "") {
		let callerName = (caller.constructor.name && caller.constructor && caller.constructor.name) ? caller.constructor.name : "<unknown called>";
		log(chalk.cyan("[log] " + callerName + " :: " + logMessage), logData);
	}

	public callerError(caller: any, logMessage: string, logData: any = "") {
		let callerName = (caller.constructor.name && caller.constructor && caller.constructor.name) ? caller.constructor.name : "<unknown called>";
		log(chalk.red("[error] " + caller.constructor.name + " :: " + logMessage), logData);
	}

	public logDebug(logMessage: string, logData: any = "") {
		log(chalk.cyan("#DEBUG :: " + logMessage), logData);
	}

	public logStd(caller: any, logMessage: string, logData: any = "") {
		log(chalk.cyan("#DEBUG :: " + logMessage), logData);
	}

	public logAppError(caller: any, logMessage: string, logData: any = "") {
		log(chalk.red("#ERROR :: " + caller.constructor.name + " :: " + logMessage), logData);
	}

	public logCoreInfo(caller: any, logMessage: string, logData: any = "") {
		log(chalk.cyan("#DEBUG :: " + caller.constructor.name + " :: " + logMessage), logData);
	}

	public logSuccessMessage(message: string, success: boolean) {
		if (success) {
			log(chalk.bold.black.bgGreen("# SUCCESS ") + chalk.black.bgGreen(message));
		}
		else {
			log(chalk.bold.white.bgRed("# FAILED ") + chalk.white.bgBlack(message));
		}
	}

	public logExtDebug(level: DebugReportingLevel, logMessage: string) {
		log(chalk.green(logMessage));
	}

	public logWarning(warningMessage: string, logData: any = null) {
		logData = logData == null ? "" : logData;
		log(chalk.bgYellow.black(warningMessage), logData);
	}

	public logFatalErrorMess(errorMessage: string, logData: any = "") {
		let data = logData != null ? " ::: " + JSON.stringify(logData) : "";
		log(chalk.white.underline.bgRed(errorMessage + logData));
	}

	public logFatalError(errorMessage: string, error: Error = null) {
		if (error == null) {
			log(chalk.white.underline.bgRed(errorMessage));
		}
		else {
			log(chalk.white.underline.bgRed(errorMessage), error);
		}
	}

	public logErrorMessage(errorMessage: string, error: Error = null) {
		if (error == null)
			log(this.error(errorMessage));
		else
			log(this.error(errorMessage), error);
	}

	public logErrorWithStrongWord(begin: string, strongWord: string, end: string) {
		log(chalk.bold.red(begin) + " " + chalk.bold.white.bgRed(strongWord) + " " + chalk.bold.red(begin));
	}

	public logOut(logMessage: string, logData: any = null) {
		logData = logData == null ? "" : logData;
		log(this.error(logMessage), logData);
	}

	public logError(logMessage: string, logData?: any) {
		if (logData) {
			log(this.error(logMessage), logData);
		}
		else {
			log(this.error(logMessage));
		}
	}

	public getCaller(caller: any) {
		return caller && caller.constructor && caller.constructor.name ?
						   caller.constructor.name : "unknown caller";
	}

	/**
	 *
	 * @param success
	 * @param logData
	 * @param logMessages
	 */
	public globalDebug(success: boolean, logData: any = null, ...logMessages: Array<string>) {
		let message = logMessages.join(":::");
		if (success) {
			this.logGreen(message, logData);
		}
		else {
			this.logRed(message, logData);
		}
	}

	public prepStr(logMessage: string, logData: any = null): string {
		logData = logData == null ? "" : JSON.stringify(logData);
		return logMessage + " #> " + logData;
	}

	public logGreenPrefix(prefix: string, logMessage: string, logData: any = null) {
		let logStr = this.prepStr(logMessage, logData);
		log(chalk.bold.black.bgGreen("#" + prefix + ":") + chalk.greenBright(logStr));
	}

	public logRedPrefix(prefix: string, logMessage: string, logData: any = null) {
		let logStr = this.prepStr(logMessage, logData);
		log(chalk.bold.white.bgRed("#" + prefix + ":") + chalk.red(logStr));
	}

	public logGreen(logMessage: string, logData: any = null) {
		if (logData) {
			log(chalk.greenBright(logMessage), chalk.greenBright(logData));
		}
		else {
			log(chalk.greenBright(logMessage));
		}
	}

	public logRed(logMessage: string, logData: any = null) {
		log(chalk.red(logMessage + '::'), chalk.red(logData));
	}

	public logYellow(logMessage: string, logData: any = "") {
		log(chalk.yellow(logMessage), logData);
	}

	public logCyan(logMessage: string, logData: any = "") {
		log(chalk.cyan(logMessage), logData);
	}

	public logBlue(logMessage: string, logData: any = "") {
		log(chalk.blue(logMessage), logData);
	}

	public static logPurple(logMessage: string, logData: any = null) {
		if (logData == null) {
			log(chalk.magenta(logMessage));
		} else {
			log(chalk.magenta(logMessage), logData);
		}
	}

	public logImportant(prefix: string, logMessage: string) {
		log(chalk.bold.white.bgBlue("#" + prefix + ":") + chalk.white.bgMagenta(logMessage));
	}
}

