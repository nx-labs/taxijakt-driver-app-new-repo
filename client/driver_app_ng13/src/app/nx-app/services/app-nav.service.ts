/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { Injectable }        from '@angular/core';
import { ActivatedRoute }    from "@angular/router";
import { NavigationExtras }  from "@angular/router";
import { Router }            from "@angular/router";
import { StorageService }    from "@core/services/storage.service";
import { NavController }     from "@ionic/angular";
import { NavigationOptions } from "@ionic/angular/providers/nav-controller";
import { NxAppPages }        from "../app.paths";

@Injectable(
	{
		providedIn: 'root'
	})
export class AppNavService {

	constructor(
		public navController: NavController,
		public router: Router,
		public storage: StorageService) {
	}

	public async internalError(errorData?: any): Promise<void> {
		this.router.navigate([NxAppPages.InternalError, errorData]);
	}

	public async navigateRoot(path: string, options?: NavigationOptions): Promise<boolean> {
		return await this.navController.navigateRoot([path], options);
	}

	public async navigateWithData(path: string, data: any): Promise<boolean> {
		let navigationExtras: NavigationExtras = {
			queryParams: {
				navData: JSON.stringify(data)
			}
		};

		this.storage.set("fromLogin", true);

		return await this.router.navigate([path], navigationExtras);
	}

	public getNavData(route: ActivatedRoute): Promise<any> {
		return new Promise((resolve, reject) => {
			route.queryParams.subscribe(params => {
				if (params && params.navData) {
					resolve(JSON.parse(params.navData));
				}
			});
		});
	}
}
