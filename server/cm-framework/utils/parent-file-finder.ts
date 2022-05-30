/*=--------------------------------------------------------------=

 TSPath - Typescript Path Resolver

 Author : Patrik Forsberg
 Email  : patrik.forsberg@coldmind.com
 GitHub : https://github.com/duffman

 I hope this piece of software brings joy into your life, makes
 you sleep better knowing that you are no longer in path hell!

 Use this software free of charge, the only thing I ask is that
 you obey to the terms stated in the license, i would also like
 you to keep the file header intact.

 Also, I would love to see you getting involved in the project!

 Enjoy!

 This software is subject to the LGPL v2 License, please find
 the full license attached in LICENCE.md

 =---------------------------------------------------------------=

 This file is part of the TypeScript Path Igniter Project:
 https://github.com/duffman/ts-path-igniter

 Author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 Date: 2017-09-02

 =---------------------------------------------------------------= */

import * as fs   from "fs";
import * as path from "path";

export class FileFindResult{
	constructor(
		public fileFound : boolean = false,
		public path : string       = "",
		public result : string     = ""
	) {}
}

export class ParentFileFinder {
	/**
	 * Cross platform method that verifies that the given path ends
	 * with a path delimiter, NOTE that this method does no effort
	 * in verifying that your path string is correct.
	 * @param searchPath
	 * @returns {string}
	 */
	public static ensureTrailingPathDelimiter(searchPath: string) {
		if (!searchPath) {
			return;
		}

		let pathSep = path.sep;
		if (searchPath.endsWith(pathSep) == false) {
			searchPath = searchPath + pathSep;
		}
		return searchPath;
	}

	/**
	 * File finder which traverses parent directories
	 * until a given filename is found.
	 * @param startPath
	 * @param filename
	 * @returns {FileFindResult}
	 */
	public static findFile(startPath : string, filename : string) : FileFindResult {
		let result = new FileFindResult();
		let sep = path.sep;
		let parts = startPath.split(sep);

		let tmpStr : string = sep;

		for (let i = 0; i < parts.length; i++) {
			tmpStr = path.resolve(tmpStr, parts[i]);
			tmpStr = ParentFileFinder.ensureTrailingPathDelimiter(tmpStr);
			parts[i] = tmpStr;
		}

		for (let i = parts.length - 1; i > 0; i--) {
			tmpStr = parts[i];
			let matchFile = path.resolve(tmpStr, filename);

			if (fs.existsSync(matchFile)) {
				result.fileFound = true;
				result.path = tmpStr;
				result.result = filename;
				break;
			}
		}

		return result;
	}
}
