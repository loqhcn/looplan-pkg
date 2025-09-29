declare class JsDataType {
    static typeof(data: any): "string" | "number" | "symbol" | "undefined" | "object" | "function" | "bool" | "array" | "regexp" | "date";
    static isArray(data: any): boolean;
    static isEmpty(value: any): boolean;
    /**
     * 复制对象|数组
     * @param {Array|Object} obj
     * @returns {Array|Object} 复制的
     */
    static copyObj(obj: object): any;
}
/**
 * 获取数据类型的默认值
 * @param {*} type
 * @returns
 */
declare function typeDefaultValue(type: string): {} | null | undefined;
export { JsDataType, typeDefaultValue };
