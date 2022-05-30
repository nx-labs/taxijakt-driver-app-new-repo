/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

const deprecated = (deprecationReason: string) => {
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
