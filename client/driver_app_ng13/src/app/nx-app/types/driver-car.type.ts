/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

export interface IDriverCar {
	id?:                        string;
	registration_number?:       string;
	registration_number_alias?: null;
	is_taxi?:                   string;
	manufacturer?:              null;
	model?:                     null;
	model_year?:                null;
	carrier_id?:                string;
	type?:                      null;
	color?:                     null;
	combi?:                     string;
	eco?:                       null;
	taxi_company_name?:         string;
	real_taxi_company_name?:    null;
	baby_seats?:                string;
	child_seats?:               string;
	booster_seats?:             string;
	animals_in_cage?:           string;
	animals_without_cage?:      string;
	option_animals?:            null;
	bike_spaces?:               null;
	arlanda_contract?:          null;
	number_of_passengers?:      string;
	number_of_luggages?:        string;
	max_comparison_price?:      null;
	lat?:                       null;
	lng?:                       null;
	concept?:                   null;
	tesla_terminal_id?:         null;
	country_code?:              string;
	arlanda_code?:              null;
	updated?:                   null;
	selected?:                  Date;
	vehicle_id?:                string;
	premium?:                   null;
	infant_seats?:              null;
	taxi_radio?:                null;
	transponder_no?:            string;
	created_at?:                null;
	has_shield?:                string;
}
