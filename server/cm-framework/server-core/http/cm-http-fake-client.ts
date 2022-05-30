/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { IApiClient }          from "@app/rest-api/rest-client";
import { RandomInt }           from "@cmCore/utils/var-utils";
import { CmPromiseHttpClient } from "./cm-promise-http-client";
import { LoggingService }      from "@cmCore/services/logging.service";
import { singleton }           from "tsyringe";

enum EnumLoadSimilation {
	None            = 0,
	LowToNone       = 100,
	Medium          = 600,
	HeadyLoad       = 7000,
	PornHubOnCampus = 22000
}


@singleton()
export class CmHttpFakeClient implements IApiClient {
	prevSuccess = true;
	simulateState?: EnumLoadSimilation;
	publicFakeMode: boolean;
	liveMode: boolean = false;

	constructor(
		private logger: LoggingService,
		private httpClient: CmPromiseHttpClient,
		) {
	}

	public setLiveMode(value: boolean) {

	}

	public setLoadSimilation(value: EnumLoadSimilation) {
		this.simulateState = value;
	}

	private async extSleep(): Promise<any> {
		let minSleep =  !this.simulateState ? 100 : this.simulateState;
		let maxSleep = minSleep * 50;

		return  await this.sleep(RandomInt(minSleep, maxSleep))
	}

	public sleep(ms: number): Promise<any> {
		return new Promise((resolve) => {
			setTimeout(resolve, ms);
		});
	}

	public async get(url: string, params: any): Promise<any> {
		try {
			return  this.httpClient.get<any>(url, params);



		} catch (e) {
			this.logger.logApiGet(this, "get",url, params)
		}
	}

	public async post(url: string, payload?: any): Promise<any> {
		this.prevSuccess = !this.prevSuccess;

		let result = {
			success: this.prevSuccess
		};

		let postResult = await this.httpClient.post<any>(url, payload);

		console.log("POST Result ::", postResult.data);

		await this.extSleep();

		return result;
	}
}
