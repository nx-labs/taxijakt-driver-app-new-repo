/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */


let cookie = "jadi=12872606-52ff7d24ff1d8dc8cf7555d38838f0a2;eav=0; referer=https%3A%2F%2Fwww.google.com%2F; http_referer=https%3A%2F%2Fwww.google.com%2F; _gcl_au=1.1.1252104886.1645084783; customer_name=Kalle%20Kula; customer_phone=%2B46708633007; accept_cookies=true; converted_popup=true; payment_method=PAY_IN_CAR; PHPSESSID=52jvkbpgr6lsalmuthcn7rb4d4; _gaexp=GAX1.2.WH_f-LmsTqSN9DwcLgeQnw.19192.2; _clck=pppio3|1|f15|0; _uetvid=1c087a50f0be11eb8a18adeea1d90d37; session=13499188-152c3cd79f9e18af649e9cfba1fa20a5";


let cookieMap         = new Map<string, string>();
let rawList: string[] = [];

if (cookie.indexOf(";") < 0) {
	rawList.push(cookie)
}
else {
	rawList = cookie.split(";");
}

console.log("poj ::", rawList);

for (let str of rawList) {

	if (!str) {
		continue;
	}

	let keyVal = str.trim().split("=");
	console.log("A ::", str);


	cookieMap.set(keyVal[0], keyVal[1]);
}


for (let [key, value] of cookieMap) {
	console.log(`"${key}" has value ""${value}`);
}



console.log("RES ::", cookieMap)



