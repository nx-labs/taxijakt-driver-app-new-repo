/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import DependencyContainer from "tsyringe/dist/typings/types/dependency-container";

export interface IBootstrap {
	initialize(container: DependencyContainer): void;
}
