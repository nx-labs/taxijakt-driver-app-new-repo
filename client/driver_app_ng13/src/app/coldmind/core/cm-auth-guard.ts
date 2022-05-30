/**
 * Copyright (c) 2018 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary, unlicensed this piece of software is under the most restrictive model.
 * There are commercial licensing available which then falls under the license model
 * described in GPL V2.1 (https://www.gnu.org/licenses/old-licenses/lgpl-2.1.en.html)
 *
 * @license
 * Dual license
 *
 * @description:
 *
 * @author
 * Patrik Forsberg<patrik.forsberg@coldmind.com> on 2018-04-12
 *
 */

import { CanActivateChild }       from "@angular/router";
import { UrlTree }                from "@angular/router";
import { RouterStateSnapshot }    from "@angular/router";
import { ActivatedRouteSnapshot } from "@angular/router";
import { CanActivate }            from "@angular/router";
import { Subject }                from "rxjs";
import { Observable }             from "rxjs";

export class CmAuthGuard implements CanActivate {
	public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
		return new Subject()
	}
}

export class CmAuthChildGuard implements CanActivateChild {
	public canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
		let res = new Subject<any>();
		return res.asObservable();
	}
}

