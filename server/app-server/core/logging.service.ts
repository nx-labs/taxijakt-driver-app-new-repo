/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

const log = console.log;

export class LoggingService {
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

}
