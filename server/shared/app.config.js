"use strict";
/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
exports.__esModule = true;
exports.AppConfig = void 0;
var AppConfig;
(function (AppConfig) {
    AppConfig.TaxijaktOldBaseUriLive = "https://taxijakt.se";
    AppConfig.TaxijaktOldBaseUriDev = "https://dev.taxijakt.se";
    AppConfig.TaxijaktOldBaseUri = AppConfig.TaxijaktOldBaseUriDev;
    AppConfig.LocalWebSocketURI = "http://localhost:3001";
    AppConfig.WebServerPort = 3000;
    AppConfig.WebSocketPort = 3001;
})(AppConfig = exports.AppConfig || (exports.AppConfig = {}));
