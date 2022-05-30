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
import { Subject } from "rxjs";
export class CmAuthGuard {
    canActivate(route, state) {
        return new Subject();
    }
}
export class CmAuthChildGuard {
    canActivateChild(childRoute, state) {
        let res = new Subject();
        return res.asObservable();
    }
}
