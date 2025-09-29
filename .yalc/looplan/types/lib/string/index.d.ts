/**
 * 将字符串转换为驼峰命名法
 * @param {string} str - 要转换的字符串
 * @param {boolean} [upperCase=true] - 是否将首字母大写，默认为 true
 * @returns {string} - 转换后的驼峰命名法字符串
 */
declare function toCamelCase(str: string, upperCase?: boolean): string;
export { toCamelCase };
