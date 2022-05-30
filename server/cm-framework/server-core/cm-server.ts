/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

// https://www.digitalocean.com/community/tutorials/how-to-use-decorators-in-typescript
import "reflect-metadata";

interface CmServerObj {
	fuel: any[];
}


const myDecorator = (target: Object, propertyKey: string, descriptor: PropertyDescriptor) =>  {
	// do something with your method
}


const enumerable = (value: boolean) => {
	return (target: any, memberName: string, propertyDescriptor: PropertyDescriptor) => {
		propertyDescriptor.enumerable = value;
	}
}


const minimumFuel2 = (deprecationReason: number) => {
	return (target: any, memberName: string, propertyDescriptor: PropertyDescriptor) => {
		return {
			get() {
				const wrapperFn = (...args: any[]) => {
					console.warn(`Method ${memberName} is deprecated with reason: ${deprecationReason}`);
					propertyDescriptor.value.apply(this, args)
				}

				Object.defineProperty(this, memberName, {
					value: wrapperFn,
					configurable: true,
					writable: true
				});
				return wrapperFn;
			}
		}
	}
}

const aKey = "design:type";

const minimumFuel = (fuel: number) => (
	target: Function,
	memberName: string,
	descriptor: PropertyDescriptor
) => {
	/*	const originalMethod = descriptor.value;

		const wrapperFn = function(...args) {

		};
	*/
	const originalMethod = descriptor.value;

	const wrapperFn = (...args: any[]) => {
		let inst = this as unknown as CmServerObj;
		inst.fuel.push("fuel");

		Reflect.defineMetadata(aKey, "Balle", app, "test");


		/*
		if (this.fuel > fuel) {
			originalMethod.apply(this, args);
		} else {
			console.log("Not enough fuel!");
		}
		*/

		originalMethod.apply(this, args)
	}

	return wrapperFn();
};

const Server = (target: any) => {
	// do something with your class
}

class Rocket {}

export interface ICmServer {}

@Server
export class CmServer {
	public data : any[] = [];

	@enumerable(false)
	@minimumFuel2(1)
	test() {
		this.data.push("YoMan");
		console.log("Yo ::", this.data);
	}
}

let app = new CmServer();


const mKey = "design:type";

let metadataValue = Reflect.getMetadata(mKey, app, "test");
console.log("metadataValue ::", metadataValue);

let result = Reflect.getOwnMetadataKeys(app);
console.log("RESULT ::", result);

app.test();
console.log("CmServer Data ::", app.data);
