/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 *
 * Simple implementation of a class providing console log
 * with color capabilities
 */

export class Crayon {
	// Control Sequences
	private static cliReset = "\x1b[0m";
	private static clrBright = "\x1b[1m";
	private static clrDim = "\x1b[2m";
	private static cliUnderscore = "\x1b[4m";
	private static cliBlink = "\x1b[5m";
	private static cliReverse = "\x1b[7m";
	private static cliHidden = "\x1b[8m";

	// Foreground
	private static fgBlack = "\x1b[30m";
	private static fgRed = "\x1b[31m";
	private static fgGreen = "\x1b[32m";
	private static fgYellow = "\x1b[33m";
	private static fgBlue = "\x1b[34m";
	private static fgMagenta = "\x1b[35m";
	private static fgCyan = "\x1b[36m";
	private static fgWhite = "\x1b[37m";

	private static bgBlack = "\x1b[40m";
	private static bgRed = "\x1b[41m";
	private static bgGreen = "\x1b[42m";
	private static bgYellow = "\x1b[43m";
	private static bgBlue = "\x1b[44m";
	private static bgMagenta = "\x1b[45m";
	private static bgCyan = "\x1b[46m";
	private static bgWhite = "\x1b[47m";

	private static logColor(color: string, bright: boolean, message: string, optionalParams?: string[]): void {
		let data = new Array<string>();

		message = !message ? " " : message;

		data.push(message);

		if (optionalParams) {
			data.push(optionalParams.join(" :: "));
		}

		console.log(color, data, Crayon.cliReset);
	}

	private static logBright(color: string, message: string, optionalParams?: string[]): void {
		if (optionalParams && optionalParams.length < 1) optionalParams = undefined;
		Crayon.logColor(color, true, message, optionalParams);
	}

	private static logDim(color: string, message: string, optionalParams?: string[]): void {
		if (optionalParams && optionalParams.length < 1) optionalParams = undefined;
		Crayon.logColor(color, false, message, optionalParams);
	}

	public static redBright(message: string, ...optionalParams: string[]) {
		Crayon.logBright(Crayon.fgRed, message, optionalParams);
	}

	public static cyan(message: string, ...optionalParams: string[]) {
		Crayon.logBright(Crayon.fgCyan, message, optionalParams);
	}

	public static dimCyan(message?: any, ...optionalParams: any[]) {
		Crayon.logDim(Crayon.fgCyan, message, optionalParams);
	}

	public static yellow(message?: any, ...optionalParams: any[]) {
		Crayon.logBright(Crayon.fgYellow, message, optionalParams);
	}

	public static dimYellow(message?: any, ...optionalParams: any[]) {
		Crayon.logDim(Crayon.fgYellow, message, optionalParams);
	}

}
