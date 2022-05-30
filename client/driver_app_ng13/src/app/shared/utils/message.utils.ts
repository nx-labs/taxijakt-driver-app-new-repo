/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { VarUtils }  from "./var.utils";
import { IMessage }  from "../messages/message-types";
import { JsonUtils } from "./json.utils";

export class MessageUtils {
	/**
	 * Check if provided object is a valid IMessage
	 * @param obj
	 * @returns {boolean}
	 */
	public static isValidMessage(obj: any): boolean {
		let result: boolean = false;
		let parseResult: boolean | object = JsonUtils.parseToJsonObj(obj);

		if (typeof parseResult === "object") {
			const messObj = parseResult as IMessage;
			result = VarUtils.isNumeric(messObj?.type);
		}

		return result;
	}
}
