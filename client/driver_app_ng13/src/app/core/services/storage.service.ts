/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { Injectable }    from '@angular/core';
import { StorageConfig } from "@ionic/storage-angular";
import { Storage }       from '@ionic/storage-angular';
import * as localforage  from "localforage";

@Injectable(
	{
		providedIn: 'root'
	})
export class StorageService {
	constructor(private storage: Storage) {
		this.init();
	}

	async init() {
		/*localforage.config({
							   name        : 'taxijaktdriver',
							   version     : 1.0,
							   storeName   : 'data'
					});*/

		let config: StorageConfig = {
			name        : 'taxijaktdriver',
			version     : 1.0,
			storeName   : 'data'
		}

		this.storage = await this.storage.create();
		await this.storage.defineDriver("LocalStorage");
	}

	public async set(key: string, value: any): Promise<any> {
		console.log("SET DATA ::", key, value);
		return await this.storage.set(key, value);
	}

	public get(key: string): Promise<any> {
		return this.storage?.get(key);
	}

	public async getAs<T>(key: string): Promise<T> {
		return await this.storage?.get(key) as T;
	}

	public async remove(key: string): Promise<boolean> {
		return await this.storage?.remove(key);
	}

	public async clear(): Promise<void> {
		return await this.storage?.clear();
	}
}
