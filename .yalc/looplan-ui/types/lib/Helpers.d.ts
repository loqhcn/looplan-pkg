/**
 * 等待结果
 * @todo 等待结果的函数需要返回一个数据，否则会一直等待
 * @param fn
 * @returns
 */
declare function waitResult(fn: Function): Promise<unknown>;
export { waitResult };
