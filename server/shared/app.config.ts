/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

export module AppConfig {
	export const WebServerPort       = 3000;
	export const WebSocketPort       = 3001;
	export const PortableConsolePort = 6320;

	export const TaxijaktOldBaseUriLive  = "https://taxijakt.se"
	export const TaxijaktOldBaseUriDev   = "https://dev.taxijakt.se"
	export const TaxijaktOldBaseUri      = TaxijaktOldBaseUriDev;
	export const LocalWebSocketURI       = `http://localhost:${ WebSocketPort }`;
	export const LocalPortableConsoleURI = `http://localhost:${ PortableConsolePort }`;
}

