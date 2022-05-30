/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

/* CUSTOMER IN CAR REQUEST
fetch("https://dev.taxijakt.se/driver/api/customer-in-car", {
	"headers": {
		"accept": "*  /*",
		"accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
		"cache-control": "no-cache",
		"content-type": "application/x-www-form-urlencoded; charset=UTF-8",
		"pragma": "no-cache",
		"sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"100\", \"Google Chrome\";v=\"100\"",
		"sec-ch-ua-mobile": "?0",
		"sec-ch-ua-platform": "\"macOS\"",
		"sec-fetch-dest": "empty",
		"sec-fetch-mode": "cors",
		"sec-fetch-site": "same-origin",
		"x-requested-with": "XMLHttpRequest",
		"cookie": "_ga=GA1.2.1466379319.1631309291; jadi=12872606-52ff7d24ff1d8dc8cf7555d38838f0a2; eav=0; _hjSessionUser_2566741=eyJpZCI6IjdkOGU3MWQ1LTJhMDctNTE2MC05MDIxLWIzZTdiNWI1NTEzNyIsImNyZWF0ZWQiOjE2Mzc2MzUzMDcxMjEsImV4aXN0aW5nIjpmYWxzZX0=; referer=https%3A%2F%2Fwww.google.com%2F; http_referer=https%3A%2F%2Fwww.google.com%2F; _gcl_au=1.1.1252104886.1645084783; customer_name=Kalle%20Kula; customer_phone=%2B46708633007; accept_cookies=true; converted_popup=true; payment_method=PAY_IN_CAR; PHPSESSID=52jvkbpgr6lsalmuthcn7rb4d4; _gaexp=GAX1.2.WH_f-LmsTqSN9DwcLgeQnw.19192.2; _clck=pppio3|1|f15|0; _uetvid=1c087a50f0be11eb8a18adeea1d90d37; session=13499188-152c3cd79f9e18af649e9cfba1fa20a5",
		"Referer": "https://dev.taxijakt.se/zf/driver/web",
		"Referrer-Policy": "strict-origin-when-cross-origin"
	},
	"body": "order_id=2172725&session=705594-e7c6043f922a6981a121e5a85136e755",
	"method": "POST"
});
 */

/* ACCEPT BORDER REPLY
{"order":{"id":"2172725","created":"2022-05-07 13:56:43","dispatch_time":"2022-05-07
	13:56:43","cancelled":null,"confirmed":"2022-05-07 13:57:32","finished":null,"pickup_time":"2022-05-07
	13:56:43","estimated_pickup_time":null,"taxi_at_from_address":null,"taxi_at_from_address_min_distance":null,"taxi_at_from_address_min_distance_time":null,"taxi_at_to_address":null,"taxi_at_to_address_min_distance":null,"taxi_at_to_address_min_distance_time":null,"from_address":"Bryggargatan
	1, Lule\u00e5","from_zipcode":"97239","from_name":null,"from_formatted":"Bryggargatan 1,
		Lule\u00e5","from_area":"Lule\u00e5
	C","from_lat":"65.5850324","from_lng":"22.1326089433333","from_is_establishment":null,"to_address":"Norrbottensteatern,
		Lule\u00e5","to_zipcode":"97239","to_name":"Norrbottensteatern","to_formatted":"Norrbottensteatern,
		Lule\u00e5","to_area":"Lule\u00e5
	C","to_lat":"65.58500599999999","to_lng":"22.142910999999998","via_addresses":null,"via_positions":null,"route":"[{\"address\":\"Bryggargatan
	1\",\"lat\":\"65.5850324\",\"lng\":\"22.1326089433333\",\"city\":\"Lule\\u00e5\"},{\"address\":\"Norrbottensteatern\",\"lat\":\"65.58500599999999\",\"lng\":\"22.142910999999998\",\"city\":\"Lule\\u00e5\"}]","distance":"525","duration":"114","currency":"SEK","price":"128","price_net":"120.75","price_vat":"7.25","taxameter_price":null,"prepaid":null,"prepaid_voucher":null,"prepaid_reduction":null,"prepaid_card":null,"prepaid_card_net":null,"prepaid_card_vat":null,"prepaid_invoice":null,"prepaid_vat":null,"flight_no":null,"wave_session_id":"13499188","customer_id":null,"customer_name":"Kalle
	Kula","customer_phone":"+46708633007","customer_email":null,"customer_lat":"65.5849381","customer_lng":"22.1324898","target_driver_id":null,"driver_id":"2673","driver_company":"test","driver_car_registration_number":"TAXI01","driver_name":"Kierowca","driver_phone":"+48888777657","driver_email":null,"driver_popup_message":"Ny
	k\u00f6rning!\n\nFr\u00e5n: Bryggargatan 1, Lule\u00e5\n\nTill: Norrbottensteatern, Lule\u00e5\n\nStr\u00e4cka: 0.5
	km\n\nFast pris: 128 kr\n\nKunden: Kalle Kula | +46708633007","ip_address":"35.156.42.228","user_agent":"Mozilla\/5.0
	(Macintosh; Intel Mac OS X 10_15_7) AppleWebKit\/537.36 (KHTML, like Gecko) Chrome\/100.0.4896.127
	Safari\/537.36","http_referer":"https:\/\/dev.taxijakt.se\/","order_page_url":"https:\/\/dev.taxijakt.se\/","customer_did_not_show_up":null,"driver_did_not_show_up":null,"admin_notified":null,"admin_confirmed":null,"handled_by_admin":null,"admin_user_id":null,"super_admin_notified":null,"test":"0","validated":"1","suspect":"0","resent":null,"resent_by_customer":null,"resent_by_customer_wait":null,"target_taxi_company_id":null,"taxi_company_id":null,"jackpot":null,"carrier_id":"1787","carrier_name":"Test","invoice_id":null,"carrier_fee":null,"carrier_compensation":null,"delivery_type":"PASSENGER","urgent":null,"urgent_distance":null,"duplicate_of_order_id":null,"app_version":"4.19","mode":null,"country_code":"SE","locale":"en","admin_id":null,"closed":null,"company_id":null,"device_id":null,"number_of_passengers":null,"number_of_luggages":null,"ref":null,"accept_sms_id":null,"baby_seats":null,"child_seats":null,"booster_seats":null,"animals_in_cage":null,"animals_without_cage":null,"combi":null,"left_to_pay":null,"payica_transaction_id":null,"payica_card_id":null,"secret":"2ED149","domain":"dev.taxijakt.se","signup_min_points":"0","points":"73.6","dialed_phone":null,"partner_id":null,"partner_reference_no":null,"query_id":"76556","message_to_driver":null,"admin_note_id":null,"accept_id":null,"success_id":null,"taxi_company_customer_id":null,"taxi_company_customer_no":null,"allow_forwarding":null,"vehicle_id":"12630","rate_sms_id":null,"status":null,"is_phone_order":"0","customer_in_car":null,"should_be_watched":"1","is_cancelled":"0","is_confirmed":"1","is_finished":"0"}}

 */

/* CUSTOMER IN CAR (INCOMING)
fetch("https://dev.taxijakt.se/driver/api/customer-in-car", {
	"headers": {
		"accept": "*  /*",
		"accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
		"cache-control": "no-cache",
		"content-type": "application/x-www-form-urlencoded; charset=UTF-8",
		"pragma": "no-cache",
		"sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"100\", \"Google Chrome\";v=\"100\"",
		"sec-ch-ua-mobile": "?0",
		"sec-ch-ua-platform": "\"macOS\"",
		"sec-fetch-dest": "empty",
		"sec-fetch-mode": "cors",
		"sec-fetch-site": "same-origin",
		"x-requested-with": "XMLHttpRequest",
		"cookie": "_ga=GA1.2.1466379319.1631309291; jadi=12872606-52ff7d24ff1d8dc8cf7555d38838f0a2; eav=0; _hjSessionUser_2566741=eyJpZCI6IjdkOGU3MWQ1LTJhMDctNTE2MC05MDIxLWIzZTdiNWI1NTEzNyIsImNyZWF0ZWQiOjE2Mzc2MzUzMDcxMjEsImV4aXN0aW5nIjpmYWxzZX0=; referer=https%3A%2F%2Fwww.google.com%2F; http_referer=https%3A%2F%2Fwww.google.com%2F; _gcl_au=1.1.1252104886.1645084783; customer_name=Kalle%20Kula; customer_phone=%2B46708633007; accept_cookies=true; converted_popup=true; payment_method=PAY_IN_CAR; PHPSESSID=52jvkbpgr6lsalmuthcn7rb4d4; _gaexp=GAX1.2.WH_f-LmsTqSN9DwcLgeQnw.19192.2; _clck=pppio3|1|f15|0; _uetvid=1c087a50f0be11eb8a18adeea1d90d37; session=13499188-152c3cd79f9e18af649e9cfba1fa20a5",
		"Referer": "https://dev.taxijakt.se/zf/driver/web",
		"Referrer-Policy": "strict-origin-when-cross-origin"
	},
	"body": "order_id=2172725&session=705594-e7c6043f922a6981a121e5a85136e755",
	"method": "POST"
});
 */
