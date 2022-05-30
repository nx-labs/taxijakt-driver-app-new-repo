/**
 * Copyright (c) 2019 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { Injectable } from '@angular/core';

@Injectable(
	{
		providedIn: 'root'
	})
export class LoggingService {

	constructor() { }

	public debug(label: string = "Debug Log", ...data: any[]): void {
		console.log(label, data);
	}

	public out(label: string = ">>", data: any): void {
		this.debug(label, data);
	}

	public error(...data: any[]) {

	}

	public serverError(...data: any[]) {

	}
}
