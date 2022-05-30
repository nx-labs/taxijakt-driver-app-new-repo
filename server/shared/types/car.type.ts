/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

export interface IDriverCar {
	id?:                        string;
	registration_number?:       string;
	registration_number_alias?: string;
	is_taxi?:                   string;
	manufacturer?:              string;
	model?:                     string;
	model_year?:                string;
	carrier_id?:                string;
	type?:                      string;
	color?:                     string;
	combi?:                     string;
	eco?:                       string;
	taxi_company_name?:         string;
	real_taxi_company_name?:    string;
	baby_seats?:                string;
	child_seats?:               string;
	booster_seats?:             string;
	animals_in_cage?:           string;
	animals_without_cage?:      string;
	option_animals?:            string;
	bike_spaces?:               string;
	arlanda_contract?:          string;
	number_of_passengers?:      string;
	number_of_luggages?:        string;
	max_comparison_price?:      string;
	lat?:                       string;
	lng?:                       string;
	concept?:                   string;
	tesla_terminal_id?:         string;
	country_code?:              string;
	arlanda_code?:              string;
	updated?:                   string;
	selected?:                  Date;
	vehicle_id?:                string;
	premium?:                   string;
	infant_seats?:              string;
	taxi_radio?:                string;
	transponder_no?:            string;
	created_at?:                string;
	has_shield?:                string;
}
