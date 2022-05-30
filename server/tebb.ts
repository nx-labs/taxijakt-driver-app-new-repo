/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */


let jsObj: string = `
	{
		driver_status: 'LOGGED IN',
			orders: [],
		status: 'OK',
		intents: [],
		messages: [],
		available_orders: [],
		driver: {
		points: 3374.37,
			id: '2673',
			mode: {
			is_basic: false,
				is_pro_available: false,
				is_temporary_pro: false,
				has_changed: false
		},
		is_pro_auto_renewal: null,
			display_auto_renewal_msg: null,
			valid_until: '',
			successful_orders: '9',
			lower_commission_to: null,
			has_lower_commission: false,
			is_driver_service_enabled: false,
			carrier_has_debts: null
	},
		server_time: 1651226207
	}
`;

console.log("kalle", JSON.stringify(jsObj) );

/*
console.log("kalle", "kula");


let kalle = "Hello";

let map1 = new Map<string, string>();
let map2 = new Map<string, string>();

map1.set("pf956", kalle);
map2.set(kalle, "pf956");

console.log("Map1 ::", map1);
console.log("Map2 ::", map2);

console.log(" ");
console.log(" ");

kalle = "MAN";

console.log("Map1 -2 ::", map1);
console.log("Map2 -2 ::", map2);
*/



