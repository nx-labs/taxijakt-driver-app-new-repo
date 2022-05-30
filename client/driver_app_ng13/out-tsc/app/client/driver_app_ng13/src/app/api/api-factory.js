/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
export class ApiFactory {
    constructor() { }
    static newTag() {
        return Math.random().toString(36).substr(2, 9);
    }
    simpleMessage(messageType, body) {
        return {
            type: messageType,
            data: body,
            timestamp: Date.now()
        };
    }
    newUserMessage(messageType, userId, body) {
        return {
            type: messageType,
            uid: userId,
            data: body,
            timestamp: Date.now()
        };
    }
}
