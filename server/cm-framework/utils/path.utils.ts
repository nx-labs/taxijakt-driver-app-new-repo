/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { ParentFileFinder } from "./parent-file-finder";

export class PathUtils {
	public static getProjectRoot(startPath: string = __dirname): string {
		let result = startPath;
		const res = ParentFileFinder.findFile(startPath, "package.json");

		if (res.fileFound) {
			result = res.path;
		}

		return result;
	}
}
