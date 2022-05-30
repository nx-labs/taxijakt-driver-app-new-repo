/**
 * Copyright (c) 2021 Netix AB. -  Patrik Forsberg <patrik.forsberg@coldmind.com>
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { CmPromiseHttpClient } from "@cmCore/http/cm-promise-http-client";
import { IApiResponse }        from "@cmCore/messages/message-types";
import { Str }                 from "@cmUtils/string.util";
import { Response }            from "express";
import { injectable }          from "tsyringe";

export interface IApiClient {
}

@injectable()
export class RestClient extends CmPromiseHttpClient implements IApiClient {
	baseUrl: string;

	constructor() {
		super();
	}

	protected async error(code: number = 505, resp: Response): Promise<void> {
		let jsonErr = {
			apiError: {
				code: code
			}
		};

		resp.json(jsonErr);
	}

	private composeUrl(apiResourcce: string): string {
		console.log("COMPOSE :: this.baseUrl ::", this.baseUrl);
		if (!this.baseUrl) return apiResourcce;

		apiResourcce.endsWith("/") ? "/" + apiResourcce : apiResourcce;

		const reqUrl = this.baseUrl + "/" + apiResourcce;
		console.log("COMPOSE :: reqUrl ::", reqUrl);
		return reqUrl;
	}

	public async go(apiUrl: string): Promise<IApiResponse> {
		console.log(`#12 :: Go URL (${apiUrl})`);

		return new Promise((resolve, reject) => {
			this.get(this.composeUrl(apiUrl)).then(res => {
				resolve({ success: true, data: res.data })
			}).catch(err => {
				resolve({ success: false, data: err })
			});
		});
	}

	public async exec(apiUrl: string, payload?: any, skipUrlPrep?: boolean): Promise<IApiResponse> {
		if (!skipUrlPrep) {
			apiUrl = this.composeUrl(apiUrl);
		}

		return new Promise((resolve, reject) => {
			var axios = require('axios');

			var config = {
				method: 'post',
				url: apiUrl,
				headers: {
					'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:100.0) Gecko/20100101 Firefox/100.0',
					'Accept': '*/*',
					'Accept-Language': 'en-US,en;q=0.5',
					'Accept-Encoding': 'gzip, deflate, br',
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
					'X-Requested-With': 'XMLHttpRequest',
					'Origin': 'https://dev.taxijakt.se',
					'Connection': 'keep-alive',
					'Referer': 'https://dev.taxijakt.se/zf/driver/web',
					'Cookie': 'referer=https%3A%2F%2Fdev.taxijakt.se%2Fzf%2Fdriver%2Fweb; http_referer=https%3A%2F%2Fdev.taxijakt.se%2Fzf%2Fdriver%2Fweb; http_referer=https%3A%2F%2Fdev.taxijakt.se%2Fzf%2Fdriver%2Fweb; referer=https%3A%2F%2Fdev.taxijakt.se%2Fzf%2Fdriver%2Fweb',
					'Sec-Fetch-Dest': 'empty',
					'Sec-Fetch-Mode': 'cors',
					'Sec-Fetch-Site': 'same-origin',
					'TE': 'trailers'
				},
				data : payload
			};

			axios(config).then((response) => {
				let resp: IApiResponse = {
					success: true,
					data: response.data,
					headers: response.headers
				};

				console.log(JSON.stringify(response.data));
				resolve(resp);

			}).catch((error) => {
				console.log(error);
				reject(error);
			});

		});

		/*
		return new Promise((resolve, reject) => {
			this.post(apiUrl, payload).then(res => {
				//console.log("EXEC RESULT :: HEADERS :::", res.headers);
				//console.log("EXEC URL ::", apiUrl, " :: PAYLOAD ::", payload);

				resolve({ success: res.status === 200, data: res.data })
			}).catch(err => {
				resolve({ success: false, data: err })
			});
		});
		*/
	}

	public setBaseUrl(url: string): RestClient {
		if (!Str.isNullOrEmpty(url)) {
			this.baseUrl = url.endsWith("/") ? url.substr(0, url.length - 1) : url;
		}

		console.log("BASE URL ::", url);
		console.log("BASE URL SET TO ::", this.baseUrl);

		return this;
	}

	protected newResponse(success: boolean = true, data?: any, error?: any): IApiResponse {
			return {
				success,
				data,
				error
			}
	}
}
