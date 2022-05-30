/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { ITaxiOrder } from "./taxi-order.type";

export interface IDriverUpdateResponse {
	driver_status?:    string;
	orders?:           ITaxiOrder[];
	status?:           string;
	intents?:          any[];
	messages?:         any[];
	available_orders?: ITaxiOrder[];
	driver?:           Driver;
	server_time?:      string;
}

export interface Driver {
	points?:                    string;
	id?:                        string;
	mode?:                      IDriverMode;
	is_pro_auto_renewal?:       boolean;
	display_auto_renewal_msg?:  boolean;
	valid_until?:               string;
	successful_orders?:         string;
	lower_commission_to?:       string;
	has_lower_commission?:      boolean;
	is_driver_service_enabled?: boolean;
	carrier_has_debts?:         string;
}

export interface IDriverMode {
	is_basic?:         boolean;
	is_pro_available?: boolean;
	is_temporary_pro?: boolean;
	has_changed?:      boolean;
}


// {'address':'Norrbottensteatern','lat':'65.58500599999999','lng':'22.142910999999998','city':'Lule00e5'},{'address':'G00fcltzauuddens Badplats','lat':'65.587352','lng':'22.125006','city':'Lule00e5'}

