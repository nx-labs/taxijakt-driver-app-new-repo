import { ITJWebDriver } from "@nxApp/types/api-login-response.type";

export interface IDriverResponseData {
	orders?: any[];
	messages?: any[];
	availOrders?: any[];
	info?: IDriverInfo;
	driverEntry?: IDriverEntry;
}

export interface IDriverEntry {
	uuid?: string;
	id?: string;
	dataHash?: null;
	availOrdersHash?: null;
	messagesHash?: null;
	ordersHash?: null;
	data?: IDriverData;
	lat?: number;
	lon?: number;
	accuracy?: number;
}

export interface IDriverData {
	id?: string;
	uuid?: string;
	name?: string;
	status?: string;
	webSession?: string;
	cardsIdent?: string;
	lastUpdated?: number;
	lastPong?: number;
	data?: ITJWebDriver
	jadi?: string;
}

export interface IDriverInfo {
	points?: number;
	id?: string;
	mode?: IDriverType;
	is_pro_auto_renewal?: null;
	display_auto_renewal_msg?: null;
	valid_until?: string;
	successful_orders?: number;
	lower_commission_to?: null;
	has_lower_commission?: boolean;
	is_driver_service_enabled?: boolean;
	carrier_has_debts?: null;
}

export interface IDriverType {
	is_basic?: boolean;
	is_pro_available?: boolean;
	is_temporary_pro?: boolean;
	has_changed?: boolean;
}

// Converts JSON strings to/from your types
export class Convert {
	public static toIDriverResponseData(json: string): IDriverResponseData {
		return JSON.parse(json);
	}

	public static iDriverResponseDataToJson(value: IDriverResponseData): string {
		return JSON.stringify(value);
	}
}
