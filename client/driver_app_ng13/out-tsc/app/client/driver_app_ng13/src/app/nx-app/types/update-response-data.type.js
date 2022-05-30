// Converts JSON strings to/from your types
export class Convert {
    static toIDriverResponseData(json) {
        return JSON.parse(json);
    }
    static iDriverResponseDataToJson(value) {
        return JSON.stringify(value);
    }
}
