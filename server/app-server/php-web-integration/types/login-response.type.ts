/**
 * Copyright (c) 2021 Netix AB. -  Patrik Forsberg <patrik.forsberg@coldmind.com>
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

export interface ITJWebLoginResp {
	driver: ITJWebDriver;
	webSession?: string;
	cardsIdentifier?: string;
}

export interface ITJWebDriver {
	id: string;
	created: string;
	email?: any;
	password: string;
	name: string;
	taxi_driver_license_number: string;
	taxi_driver_license_number_locked_until?: any;
	company: string;
	phone: string;
	phone_icc?: any;
	phone_imei?: any;
	car_registration_number: string;
	likes: string;
	dislikes: string;
	rank?: any;
	android_info?: any;
	android_version_name: string;
	verified: string;
	got_car_charger?: any;
	got_car_mobile_holder?: any;
	lat: string;
	lng: string;
	location_last_ok: string;
	location_first_problem: string;
	location_last_warned: string;
	accuracy: string;
	located?: any;
	located_client_time?: any;
	provider: string;
	last_login: string;
	last_checkin: string;
	last_checkin_client_time: string;
	last_position_logged: string;
	status: string;
	busy_until?: any;
	busy_reason?: any;
	private_name: string;
	private_ssn?: any;
	private_phone: string;
	private_email: string;
	private_company?: any;
	private_organisation_number?: any;
	private_notes: string;
	private_iban_number?: any;
	crm_last_contact?: any;
	crm_next_contact?: any;
	max_comparison_price?: any;
	fraud?: any;
	tester: string;
	paper_rolls?: any;
	ip_address: string;
	prevent_heartbeat: string;
	bank_account: string;
	bank_account_type?: any;
	bank_pg?: any;
	bank_bg?: any;
	carrier?: any;
	option_highchair?: any;
	option_animals?: any;
	option_bike?: any;
	arlanda_contract?: any;
	shift: string;
	current_car_id?: any;
	levels?: any;
	taxi_company_id?: any;
	device?: any;
	food_delivery_approved?: any;
	only_food?: any;
	suspended?: any;
	suspended_until?: any;
	city: string;
	panic_approved?: any;
	avoid_emails?: any;
	avoid_sms?: any;
	language_code: string;
	locale: string;
	premium_approved?: any;
	car_number_of_passengers: string;
	country_code: string;
	http_user_agent: string;
	rating?: any;
	ratings?: any;
	head_of_carrier_id?: any;
	points: string;
	fetch_native_location?: any;
	debug?: any;
	client_id?: any;
	points_disabled?: any;
	points_disabled_approved?: any;
	gender?: any;
	vehicle_id: string;
	carrier_has_debts?: any;
	prevent_future_order_signup?: any;
	customer_rate?: any;
	carrier_debt_suspend_date?: any;
	rates_rating?: any;
	rates_ratings?: any;
	last_reset_at?: any;
	quality_score: string;
	qs_rates: string;
	qs_success_count: string;
	qs_success: string;
	qs_acceptance: string;
	prepaid_only: string;
	current_carrier_id: string;
}

export interface IApiLoginRes {
	cards_identifier: string,
	web_session: string,
	driver: ITJWebDriver
}


