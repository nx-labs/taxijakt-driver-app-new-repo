/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

export interface ITaxiOrder {
	id?:                                     string;
	created?:                                Date;
	dispatch_time?:                          Date;
	cancelled?:                              string;
	confirmed?:                              string;
	finished?:                               string;
	pickup_time?:                            string;
	estimated_pickup_time?:                  string;
	taxi_at_from_address?:                   string;
	taxi_at_from_address_min_distance?:      string;
	taxi_at_from_address_min_distance_time?: string;
	taxi_at_to_address?:                     string;
	taxi_at_to_address_min_distance?:        string;
	taxi_at_to_address_min_distance_time?:   string;
	from_address?:                           string;
	from_zipcode?:                           string;
	from_name?:                              string;
	from_formatted?:                         string;
	from_area?:                              string;
	from_lat?:                               string;
	from_lng?:                               string;
	from_is_establishment?:                  string;
	to_address?:                             string;
	to_zipcode?:                             string;
	to_name?:                                string;
	to_formatted?:                           string;
	to_area?:                                string;
	to_lat?:                                 string;
	to_lng?:                                 string;
	via_addresses?:                          string;
	via_positions?:                          string;
	route?:                                  string;
	distance?:                               string;
	duration?:                               string;
	currency?:                               string;
	price?:                                  string;
	price_net?:                              string;
	price_vat?:                              string;
	taxameter_price?:                        string;
	prepaid?:                                string;
	prepaid_voucher?:                        string;
	prepaid_reduction?:                      string;
	prepaid_card?:                           string;
	prepaid_card_net?:                       string;
	prepaid_card_vat?:                       string;
	prepaid_invoice?:                        string;
	prepaid_vat?:                            string;
	flight_no?:                              string;
	wave_session_id?:                        string;
	customer_id?:                            string;
	customer_name?:                          string;
	customer_phone?:                         string;
	customer_email?:                         string;
	customer_lat?:                           string;
	customer_lng?:                           string;
	target_driver_id?:                       string;
	driver_id?:                              string;
	driver_company?:                         string;
	driver_car_registration_number?:         string;
	driver_name?:                            string;
	driver_phone?:                           string;
	driver_email?:                           string;
	driver_popup_message?:                   string;
	ip_address?:                             string;
	user_agent?:                             string;
	http_referer?:                           string;
	order_page_url?:                         string;
	customer_did_not_show_up?:               string;
	driver_did_not_show_up?:                 string;
	admin_notified?:                         string;
	admin_confirmed?:                        string;
	handled_by_admin?:                       string;
	admin_user_id?:                          string;
	super_admin_notified?:                   string;
	test?:                                   string;
	validated?:                              string;
	suspect?:                                string;
	resent?:                                 string;
	resent_by_customer?:                     string;
	resent_by_customer_wait?:                string;
	target_taxi_company_id?:                 string;
	taxi_company_id?:                        string;
	jackpot?:                                string;
	carrier_id?:                             string;
	carrier_name?:                           string;
	invoice_id?:                             string;
	carrier_fee?:                            string;
	carrier_compensation?:                   string;
	delivery_type?:                          string;
	urgent?:                                 string;
	urgent_distance?:                        string;
	duplicate_of_order_id?:                  string;
	app_version?:                            string;
	mode?:                                   string;
	country_code?:                           string;
	locale?:                                 string;
	admin_id?:                               string;
	closed?:                                 string;
	company_id?:                             string;
	device_id?:                              string;
	number_of_passengers?:                   string;
	number_of_luggages?:                     string;
	ref?:                                    string;
	accept_sms_id?:                          string;
	baby_seats?:                             string;
	child_seats?:                            string;
	booster_seats?:                          string;
	animals_in_cage?:                        string;
	animals_without_cage?:                   string;
	combi?:                                  string;
	left_to_pay?:                            string;
	payica_transaction_id?:                  string;
	payica_card_id?:                         string;
	secret?:                                 string;
	domain?:                                 string;
	signup_min_points?:                      string;
	points?:                                 string;
	dialed_phone?:                           string;
	partner_id?:                             number;
	partner_reference_no?:                   string;
	query_id?:                               string;
	message_to_driver?:                      string;
	admin_note_id?:                          number;
	accept_id?:                              number;
	success_id?:                             number;
	taxi_company_customer_id?:               string;
	taxi_company_customer_no?:               string;
	allow_forwarding?:                       boolean;
	vehicle_id?:                             number;
	rate_sms_id?:                            string;
	status?:                                 string;
	is_phone_order?:                         string;
	customer_in_car?:                        boolean;
	should_be_watched?:                      string;
	is_cancelled?:                           string;
	is_confirmed?:                           string;
	is_finished?:                            string;
	driver_distance?:                        string;
	driver_duration?:                        string;
	has_shield?:                             boolean;
	driver_direction?:                       number;
	driver_direction_text?:                  string;
}
