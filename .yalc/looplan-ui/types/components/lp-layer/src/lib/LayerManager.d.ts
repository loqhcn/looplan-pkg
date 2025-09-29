import type Layer from './Layer';
import type LayerGroup from './LayerGroup';
/**
 * 添加层
 * @todo 添加层后，需要判断是否需要锁定body
 * @param layer
 */
declare function onAddLayer(layer: Layer): void;
/**
 * 移除层
 * @param layer
 */
declare function onRemoveLayer(layer: Layer): void;
declare function getLayers(): Layer[];
/**
 * 获取特定组内的层
 * @param group 组
 * @returns 组内的层数组
 */
declare function getLayersByGroup(group: LayerGroup): Layer[];
export { onAddLayer, onRemoveLayer, getLayers, getLayersByGroup };
