/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
export class JsonConverter {
    static toType(json) {
        return JSON.parse(json);
    }
    static toString(value) {
        return JSON.stringify(value);
    }
}
