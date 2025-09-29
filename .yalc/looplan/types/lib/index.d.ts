/**
 * TODO -- 等待加载完成
 * @param callback 回调函数
 * @param delay 每次刷新间隔时间
 * @returns
 */
declare function waitLoaded(callback: () => boolean, delay?: number): Promise<void>;
export { waitLoaded, };
