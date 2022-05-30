/**
 * Copyright (c) 2017 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 *
 * This file is part of: BlockChainIgniter
 */

const params = process.argv.slice(2);

export class CliUtil {
	public static paramAt(index: number): string {
		let result: string = undefined;

		if (index >-1 && index <= params.length) {
			result = params[index];
		}

		return result;
	}

	public static firstParam(str: string, def?: string): string {
		let param = CliUtil.paramAt(0);
		return !param && def ? def : param;
	}

	public static firstParamIs(str: string): boolean {
		return CliUtil.firstParam(str) === str;
	}

	public static echoExt(delim: string, padding: boolean, ...parts: any[]): void {
		let strBuffer = [delim];

		for (let part of parts) {
			(typeof part === "string") ? strBuffer.push(part)
									   : strBuffer.push(JSON.stringify(part));
		}

		strBuffer.push(delim);

		if (padding) {
			//strBuffer.splice(0, 0, "\n");
			strBuffer.push("\n");
		}

		console.log(`${ strBuffer.join(` ${ delim } `) }`);
	}

	public static echo(...parts: any[]): void {
		CliUtil.echoExt("::", true, parts);
	}

	public static  printJson(data: any): void {
		const jsonStr = JSON.stringify(data);
		const object = JSON.parse(jsonStr);

		console.dir(object, { depth: null, colors: true });
	}

	public static  jsonSection(label: string, data: any) {
		console.log(`\n:: ${label} ::`);
		CliUtil.printJson(data);
		console.log(`\n---------------- // END : ${label} ----------------\n`);
	}
}
