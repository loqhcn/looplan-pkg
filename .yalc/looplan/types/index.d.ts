import { registerLooplanComponents } from './components';
import { JsDataType } from './lib/data-type';
import { createApi } from './api';
import type { App } from 'vue';
import { gatewayOptions, setGateway, getComponentPackage } from './loader/component/lib/ComponentGateway';
import { setComponentPackage, registerPackage, loadComponent, asyncComponentDelay, nameIsUseAsyncComponent, getComponentOption } from '@/loader/component';
import { iconGatewayOptions, setIconGateway, getIconPackage } from './components/lp-icon/lib/IconGateway';
import { loadIcon, setIconPackage, IconPackages, mountIconfont, unmountIconfont } from './components/lp-icon/lib/index';
import { LpComponent } from './components/lp-component';
import { LpIcon, LpSvg } from './components/lp-icon';
declare function install(app: App): void;
export type { ComponentOption, LoadedModule, ComponentPackageConfig } from '@/types/component';
export type { GatewayOption } from '@/types/index';
export type { IconPackageConfig } from '@/components/lp-icon/types/index';
export { install, LpComponent, LpIcon, LpSvg, createApi, JsDataType, registerLooplanComponents, setComponentPackage, registerPackage, loadComponent, asyncComponentDelay, nameIsUseAsyncComponent, getComponentOption, gatewayOptions, setGateway, getComponentPackage, loadIcon, setIconPackage, IconPackages, mountIconfont, unmountIconfont, iconGatewayOptions, setIconGateway, getIconPackage, };
declare const _default: {
    install: typeof install;
};
export default _default;
