/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

export class SocketRepository {
	data = new Map<string, string>();

	constructor() {}

	public storeUUID(uuid: string, socketId: string): boolean {
		console.log("STORE UUID :: uuid ::", uuid);
		console.log("STORE UUID :: socketId ::", socketId);

		if (uuid && socketId) {
			this.data.set(uuid, socketId);

			console.log("DATA STORE ::", this.data);

			return true;
		} else {
			return false;
		}
	}

	public async findByUUID(value: string): Promise<string> {
		return await this.data.get(value);
	}

	public findBySocketId(id: string): string {
		for (let [key, value] of this.data) {
			if (value === id) {
				return key;
			}
		}

		return undefined;
	}

	public disconnect(socketId: string): void {
		let uuid = this.findBySocketId(socketId);
		if (uuid) {
			this.data.delete(uuid);
		}
	}

	public clientCount(): number {
		return this.data.size;
	}
}
