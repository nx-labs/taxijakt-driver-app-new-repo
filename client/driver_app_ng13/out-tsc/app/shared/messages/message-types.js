/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
export var MsgType;
(function (MsgType) {
    MsgType[MsgType["Ping"] = 222000] = "Ping";
    MsgType[MsgType["Pong"] = 100001] = "Pong";
    MsgType[MsgType["UpdateDriverData"] = -40] = "UpdateDriverData";
    MsgType[MsgType["DebugBooking"] = -30] = "DebugBooking";
    MsgType[MsgType["ShowDebug"] = -20] = "ShowDebug";
    MsgType[MsgType["Error"] = -10] = "Error";
    MsgType[MsgType["Connect"] = 0] = "Connect";
    MsgType[MsgType["Disconnect"] = 1] = "Disconnect";
    MsgType[MsgType["DriverLogin"] = 2] = "DriverLogin";
    MsgType[MsgType["DriverLogOut"] = 3] = "DriverLogOut";
    MsgType[MsgType["DriverGetInfo"] = 4] = "DriverGetInfo";
    MsgType[MsgType["DriverUpdate"] = 5] = "DriverUpdate";
    MsgType[MsgType["GetDriverOrder"] = 6] = "GetDriverOrder";
    MsgType[MsgType["GetOrdersBySession"] = 7] = "GetOrdersBySession";
    MsgType[MsgType["GetMessagesBySession"] = 8] = "GetMessagesBySession";
    MsgType[MsgType["AcceptOrder"] = 9] = "AcceptOrder";
    MsgType[MsgType["DenyOrder"] = 10] = "DenyOrder";
    MsgType[MsgType["CompleteOrder"] = 11] = "CompleteOrder";
    MsgType[MsgType["CustomerNoShow"] = 12] = "CustomerNoShow";
    MsgType[MsgType["CantCompleteOrder"] = 13] = "CantCompleteOrder";
    MsgType[MsgType["GetCars"] = 14] = "GetCars";
    MsgType[MsgType["SetCurrentCar"] = 15] = "SetCurrentCar";
    MsgType[MsgType["NeedReauthentication"] = 16] = "NeedReauthentication";
    MsgType[MsgType["LoggedOut"] = 17] = "LoggedOut";
    MsgType[MsgType["GetRawData"] = 544] = "GetRawData";
})(MsgType || (MsgType = {}));
export class Message {
    static ofType(value, msg) {
        return value === (msg.type ? msg.type : "");
    }
}
//////////////////////////////////////////////////
//
// Api Messages
//
export var ApiAttributeType;
(function (ApiAttributeType) {
    ApiAttributeType["Error"] = "error";
    ApiAttributeType["Message"] = "information";
    ApiAttributeType["Information"] = "information";
})(ApiAttributeType || (ApiAttributeType = {}));
