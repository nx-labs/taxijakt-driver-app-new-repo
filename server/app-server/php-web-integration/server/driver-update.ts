/**
 * Copyright (c) 2021 Netix AB. -  Patrik Forsberg <patrik.forsberg@coldmind.com>
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

export interface IDriverUpdate {
	driver_status?: string;
	orders?: any[];
	status?: string;
	intents?: any[];
	messages?: any[];
	available_orders?: any[];
	driver?: Driver;
	server_time?: number;
}

export interface Driver {
	points?: number;
	id?: string;
	mode?: Mode;
	is_pro_auto_renewal?: null;
	display_auto_renewal_msg?: null;
	valid_until?: string;
	successful_orders?: string;
	lower_commission_to?: null;
	has_lower_commission?: boolean;
	is_driver_service_enabled?: boolean;
	carrier_has_debts?: null;
}

export interface Mode {
	is_basic?: boolean;
	is_pro_available?: boolean;
	is_temporary_pro?: boolean;
	has_changed?: boolean;
}
