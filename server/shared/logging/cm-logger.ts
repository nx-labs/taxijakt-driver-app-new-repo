/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

export enum DebugReportingLevel {
	None   = 0,
	Low    = 1,
	Medium = 2,
	High   = 3,
}

export class CmLogger {
	public debugLog = false;
	private logLevel = DebugReportingLevel.Low;

	public IsVerbose(): boolean {
		return this.logLevel === DebugReportingLevel.High;
	}
}
