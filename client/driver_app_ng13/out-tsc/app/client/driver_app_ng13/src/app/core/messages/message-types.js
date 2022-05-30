/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
export var MessageType;
(function (MessageType) {
    MessageType[MessageType["Ping"] = 0] = "Ping";
    MessageType[MessageType["Pong"] = 1] = "Pong";
})(MessageType || (MessageType = {}));
export var MsgType;
(function (MsgType) {
    MsgType[MsgType["Connect"] = 0] = "Connect";
    MsgType[MsgType["Disconnect"] = 1] = "Disconnect";
    MsgType[MsgType["DriverLogin"] = 2] = "DriverLogin";
    MsgType[MsgType["DriverGetInfo"] = 3] = "DriverGetInfo";
    MsgType[MsgType["DriverUpdate"] = 4] = "DriverUpdate";
    MsgType[MsgType["GetOrders"] = 5] = "GetOrders";
    MsgType[MsgType["OrderAction"] = 6] = "OrderAction";
    MsgType[MsgType["NeedReauthentication"] = 15] = "NeedReauthentication";
})(MsgType || (MsgType = {}));
