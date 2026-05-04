var Qe = Object.defineProperty;
var Ye = (t, e, n) => e in t ? Qe(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var m = (t, e, n) => Ye(t, typeof e != "symbol" ? e + "" : e, n);
import { defineComponent as U, getCurrentInstance as et, reactive as ue, createElementBlock as M, openBlock as v, defineAsyncComponent as B, ref as x, watch as Ae, markRaw as ye, onErrorCaptured as tt, useAttrs as de, useSlots as Ee, computed as T, Fragment as nt, createBlock as Me, createCommentVNode as ge, resolveDynamicComponent as Le, mergeProps as rt, toHandlers as ot, createSlots as st, renderList as at, unref as pe, withCtx as it, renderSlot as ct, normalizeProps as lt, guardReactiveProps as ut, createElementVNode as Y, toDisplayString as dt, withModifiers as pt, normalizeStyle as Ie, normalizeClass as Ne, h as ft, createVNode as he, onMounted as mt } from "vue";
import fe from "axios";
function z(t, e = !0) {
  if (typeof t != "string")
    return "";
  let r = t.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[^a-zA-Z0-9]+/g, " ").split(" ");
  r = r.filter((o) => o !== "");
  for (let o = 0; o < r.length; o++)
    o === 0 && !e ? r[o] = r[o].toLowerCase() : r[o] = r[o].charAt(0).toUpperCase() + r[o].slice(1).toLowerCase();
  return r.join("");
}
const E = [];
function Ir(t) {
  E.find((n) => n.name === t.name) || E.push(t);
}
async function yt(t) {
  var s;
  let e = null;
  for (let a in E) {
    let i = E[a];
    if (i.packages && ((s = i.packages) != null && s.includes(t))) {
      e = i;
      break;
    }
  }
  let n = e || E[0];
  if (!n)
    throw new Error("没有网关");
  let r = await fe.post(n.url, {
    name: t
  });
  if (r.data.code !== 200)
    throw new Error(r.data.msg);
  if (!r.data.data.row)
    throw new Error("组件包不存在");
  const o = r.data.data.row;
  return o.loadStatus = 0, o;
}
function ee(t, e = 100) {
  return new Promise((n) => {
    const r = setInterval(() => {
      t() && (clearInterval(r), n());
    }, e);
  });
}
class gt {
  constructor() {
    // group -> value -> HTMLElement
    m(this, "store", /* @__PURE__ */ new Map());
    // metadata (自动 GC，不会泄漏)
    m(this, "meta", /* @__PURE__ */ new WeakMap());
  }
  /**
   * 注册或更新元素
   * @param group 分组名称
   * @param value 元素值，可选
   * @param elementOrFn 元素实例或创建函数
   * @returns 注册或更新后的元素实例
   */
  register(e, n, r) {
    this.store.has(e) || this.store.set(e, /* @__PURE__ */ new Map());
    const o = this.store.get(e);
    o.has(n) && this.unload(e, n);
    const s = typeof r == "function" ? r() : r;
    return o.set(n, s), this.meta.set(s, { el: s, group: e, value: n }), s;
  }
  /**
   * 注销元素
   * @param group 分组名称
   * @param value 元素值，可选
   */
  unload(e, n) {
    const r = this.store.get(e);
    if (!r) return;
    if (n === void 0) {
      for (const [, s] of r)
        s.remove(), this.meta.delete(s);
      this.store.delete(e);
      return;
    }
    const o = r.get(n);
    o && (o.remove(), this.meta.delete(o), r.delete(n)), r.size === 0 && this.store.delete(e);
  }
  // 可选：取值
  get(e, n) {
    var r;
    return ((r = this.store.get(e)) == null ? void 0 : r.get(n)) ?? null;
  }
  // 可选：检查存在
  exists(e, n) {
    var r;
    return ((r = this.store.get(e)) == null ? void 0 : r.has(n)) ?? !1;
  }
  // 可选：列出组内容
  list(e) {
    var n;
    return Array.from(((n = this.store.get(e)) == null ? void 0 : n.values()) ?? []);
  }
  // 可选：卸载所有
  unloadAll() {
    for (const e of Array.from(this.store.keys()))
      this.unload(e);
  }
}
class ht {
  constructor() {
    m(this, "elementManager", new gt());
    m(this, "loadingPromises", /* @__PURE__ */ new Map());
  }
  /**
   * 解析样式名称，判断是组件包还是具体组件
   * @param name 样式名称，格式：包名 或 包名@组件名
   * @returns 解析结果
   */
  parseName(e) {
    const n = e.split("@");
    return n.length === 1 ? { packageName: n[0] } : { packageName: n[0], componentName: n[1] };
  }
  /**
   * 创建样式链接元素
   * @param href 样式链接地址
   * @returns 样式链接元素创建函数
   */
  createStyleLink(e) {
    return () => {
      const n = document.createElement("link");
      return n.rel = "stylesheet", n.href = e, n;
    };
  }
  /**
   * 加载样式
   * @param name 样式名称，格式：包名 或 包名@组件名
   * @param styleUrls 样式URL数组
   * @param version 版本号，用于替换__version__占位符
   * @returns Promise
   */
  async loadStyle(e, n, r = "") {
    const { packageName: o, componentName: s } = this.parseName(e), a = s ? `${o}@${s}` : o;
    if (this.loadingPromises.has(a))
      return this.loadingPromises.get(a);
    if (this.isStyleLoaded(e))
      return;
    const i = this.doLoadStyle(a, n, r, s);
    this.loadingPromises.set(a, i);
    try {
      await i;
    } finally {
      this.loadingPromises.delete(a);
    }
  }
  /**
   * 实际执行样式加载的方法
   * @param group 样式组名
   * @param styleUrls 样式URL数组
   * @param version 版本号
   * @param componentName 组件名（可选）
   * @returns Promise
   */
  async doLoadStyle(e, n, r, o) {
    const s = n.map((a, i) => new Promise((l, d) => {
      const y = a.replace("__version__", r), p = this.createStyleLink(y)();
      p.onload = () => {
        console.debug(`已加载样式: %c${y}`, "color: green"), l();
      }, p.onerror = () => {
        console.error(`加载样式失败: ${y}`), document.head.removeChild(p), o ? (console.warn(`组件样式加载失败，继续执行: ${y}`), l()) : (console.error(`组件包样式加载失败: ${y}`, e), d(new Error(`加载样式失败: ${y}`)));
      }, this.elementManager.register(e, `style-${i}`, p), document.head.appendChild(p);
    }));
    console.log("loadPromises", n, s), await Promise.all(s);
  }
  /**
   * 卸载样式
   * @param name 样式名称，格式：包名 或 包名@组件名
   */
  unloadStyle(e) {
    const { packageName: n, componentName: r } = this.parseName(e);
    if (r) {
      const o = `${n}@${r}`;
      console.debug(`卸载组件样式: %c${o}`, "color: orange"), this.elementManager.unload(o);
    } else
      console.debug(`卸载组件包样式: %c${n}`, "color: orange"), this.elementManager.unload(n), this.getAllGroups().forEach((s) => {
        s.startsWith(`${n}@`) && this.elementManager.unload(s);
      });
  }
  /**
   * 检查样式是否已加载
   * @param name 样式名称，格式：包名 或 包名@组件名
   * @returns 是否已加载
   */
  isStyleLoaded(e) {
    const { packageName: n, componentName: r } = this.parseName(e), o = r ? `${n}@${r}` : n;
    return this.elementManager.list(o).length > 0;
  }
  getLoadedStyles(e) {
    const { packageName: n, componentName: r } = this.parseName(e), o = r ? `${n}@${r}` : n;
    return this.elementManager.list(o);
  }
  /**
   * 获取所有已注册的组名（私有方法，用于内部遍历）
   * @returns 组名数组
   */
  getAllGroups() {
    return [];
  }
  /**
   * 卸载所有样式
   */
  unloadAllStyles() {
    console.debug("卸载所有样式", "color: red"), this.elementManager.unloadAll();
  }
}
const C = new ht(), me = {
  /**
   * 模块加载模式
   * - 'es'：加载 ES 模块
   * - 'umd'：加载 UMD 模块
   * @default 'es'
   */
  mode: "umd"
}, bt = (() => {
  try {
    return typeof import.meta < "u" && !!import.meta.url;
  } catch {
    return !1;
  }
})();
bt && (me.mode = "es");
const j = class j {
  /**
   * 加载远程模块
   * - 自动识别模块类型，根据后缀名判断是否为 ES 模块或 UMD 模块
   * @param {string} url 模块地址
   * @returns {Promise<any>}
   */
  static async load(e) {
    return me.mode === "es" ? await j.loadES(e) : await j.loadUMD(e);
  }
  /**
   * 加载 ES 模块
   * @param url 模块URL
   * @returns 模块导出
   */
  static async loadES(e) {
    return await import(
      /* @vite-ignore */
      e
    );
  }
  /**
   * 加载 UMD 模块
   * @param url 模块URL
   * @returns 模块导出
   */
  static async loadUMD(e) {
    if (document.querySelector(`script[data-looplan-src="${e}"]`)) return;
    const r = j.scriptLoadingMap[e];
    if (r)
      return await r;
    const o = new Promise((s, a) => {
      const i = document.createElement("script");
      i.src = e, i.async = !0, i.dataset.looplanSrc = e, i.onload = () => {
        s(), delete j.scriptLoadingMap[e];
      }, i.onerror = () => {
        delete j.scriptLoadingMap[e], a(new Error(`加载远程脚本失败: ${e}`));
      }, document.body.appendChild(i);
    });
    return j.scriptLoadingMap[e] = o, await o;
  }
};
m(j, "scriptLoadingMap", {});
let te = j;
const b = {}, $ = {};
class wt {
  constructor() {
    m(this, "components", {});
    /**
     * TODO -- 组件包网关加载状态
     * 0 -- 未加载
     * 1 -- 加载中
     * 200 -- 已加载
     */
    m(this, "pkgGatewayLoading", {});
  }
  /**
   * 规范化组件名称，格式：包名@驼峰组件名
   */
  parseComponentName(e) {
    const [n, r] = e.split("@");
    return `${n}@${z(r)}`;
  }
  /**
   * 获取或注册组件。
   * TODO -- 获取或注册组件。
   * @param nameRaw 原始名称，如 'MuloLayer@TestComponent'
   * @param component 可选，如果传入则注册该组件
   */
  async component(e, n = null) {
    var l;
    const r = this.parseComponentName(e);
    if (n) {
      this.components[r] = n;
      return;
    }
    const {
      row: o,
      componentOption: s,
      pkg: a,
      name: i
    } = await this.getMember(e);
    return s && s.styleImportCase === "use" && s.styleCdn && await C.loadStyle(r, s.styleCdn, ((l = b[a]) == null ? void 0 : l.version) || ""), this.isAsyncComponent(a, i) ? (console.debug("加载异步组件", r), o()) : o;
  }
  /**
   * TODO -- 获取组件
   * @param name 组件名称
   * @returns 组件
   */
  async getMember(e) {
    const n = this.parseComponentName(e), [r, o] = n.split("@");
    if (!b[r] && E.length)
      if (this.pkgGatewayLoading[r] == 0 || this.pkgGatewayLoading[r] == null) {
        this.pkgGatewayLoading[r] = 1;
        try {
          const l = await yt(r);
          b[r] = l;
        } catch (l) {
          console.error("从网关加载组件包失败", r, l);
        }
      } else
        await ee(() => !!b[r]);
    if (!$[r]) {
      const l = await this.getPackage(r);
      this.registerComponents(b[r], l);
    }
    const s = b[r];
    s && s.styleCdn && s.styleCdn.length > 0 && s.styleImportCase === "use" && await C.loadStyle(r, s.styleCdn, s.version || "");
    const a = this.getComponentOption(n);
    let i = this.components[n];
    if (i || (i = $[r][o]), !i)
      throw new Error(`未找到${n}`);
    return {
      pkgConfig: s,
      componentOption: a,
      row: i,
      pkg: r,
      name: o
    };
  }
  /**
   * TODO -- 获取组件选项对象
   * @param item 组件选项或组件名称字符串
   * @returns 组件选项对象
   */
  getComponentOptionObject(e) {
    return typeof e == "string" ? jt(e) : e;
  }
  /**
   * 注册包内所有组件到 this.components
   * TODO -- 注册
   */
  registerComponents(e, n) {
    e.components.forEach((r) => {
      const o = this.getComponentOptionObject(r), s = z(o.name), a = `${e.name}@${s}`;
      this.components[a] = n[s];
    });
  }
  /**
   * TODO -- 获取组件选项对象
   * @param raw 组件名称字符串
   * @returns 组件选项对象
   */
  getComponentOption(e) {
    const n = this.parseComponentName(e), [r, o] = n.split("@"), s = b[r];
    if (!s) return;
    const a = s.components.find((i) => {
      const l = this.getComponentOptionObject(i);
      return z(l.name) === o;
    });
    return a ? this.getComponentOptionObject(a) : void 0;
  }
  /**
   * TODO -- 判断是否异步组件
   * @param pkg 包名
   * @param comp 组件名
   * @returns 
   */
  isAsyncComponent(e, n) {
    const r = b[e];
    if (!r) return !1;
    if (r.asyncComponents)
      return r.asyncComponents.includes(n);
    const o = r.components.find((s) => {
      const a = this.getComponentOptionObject(s);
      return z(a.name) === n;
    });
    return o ? !!this.getComponentOptionObject(o).isAsync : !1;
  }
  /**
   * TODO -- 异步加载组件包
   * 
   * @todo 加载组件文件到内存
   * @param packageName 组件包名称
   * @returns 组件包数据
   */
  async getPackage(e) {
    let n = b[e];
    if (!n) throw new Error(`组件包不存在: ${e}`);
    if ($[e])
      return $[e];
    if (n.type === "cdn") {
      if (n.loadStatus === -1 && (n.loadStatus = 0), n.loadStatus === 0) {
        n.loadStatus = 1;
        try {
          n.styleCdn && n.styleCdn.length > 0 && n.styleImportCase === "register" && await C.loadStyle(e, n.styleCdn, n.version || "");
          const r = await this.loadOnlineComponentPackage(n);
          $[e] = r, n.loadStatus = 200;
        } catch (r) {
          throw n.loadStatus = -1, r;
        }
      }
      n.loadStatus === 1 && await ee(() => !!$[e]);
    }
    return n.type === "local" && n.styleCdn && n.styleCdn.length > 0 && n.styleImportCase === "register" && await C.loadStyle(e, n.styleCdn, n.version || ""), $[e];
  }
  /**
   * TODO -- 手动添加本地组件包
   * @param cfg 组件包配置
   * @param data 组件包数据
   */
  addLocalPackage(e, n) {
    b[e.name] = e, $[e.name] = n, this.registerComponents(e, n);
  }
  /**
   * TODO -- 添加组件包配置
   * @param cfg 组件包配置
   */
  registerPackage(e) {
    e = Object.assign({
      loadStatus: 0,
      styleImportCase: "register"
      // 默认在注册时导入样式
    }, e), b[e.name] = e;
  }
  /**
   * TODO -- 通过 CDN 加载全局 UMD 包
   * @todo 添加script
   * @todo 读取已加载数据
   * @param packageInfo 组件包配置
   * @returns 组件包数据
   */
  loadOnlineComponentPackage(e) {
    return new Promise(async (n, r) => {
      try {
        const { title: o, name: s, version: a, cdn: i, esCdn: l } = e, d = me.mode === "es", y = d && l || i;
        if (!y) {
          r(new Error(`组件库 ${s} 未设置 ${d ? "ESM" : "CDN"} 地址`));
          return;
        }
        const p = y.replace("__version__", a || ""), S = await te.load(p);
        if (d) {
          const K = S && S.default && typeof S.default == "object" ? S.default : S;
          n(K);
          return;
        }
        if (!window[s]) {
          r(new Error(`组件未在全局命名空间中找到: ${s}`));
          return;
        }
        console.debug(`已加载在线组件库: %c${s}`, "color: green"), n(window[s]), e.keepOfWindow || delete window[s];
      } catch (o) {
        r(new Error(`加载 ${e.title || e.name} 组件库失败: ${(o == null ? void 0 : o.message) || o}`));
      }
    });
  }
  // TODO ## 加载
  // TODO ## 装载
}
function jt(t) {
  return {
    title: t,
    name: t,
    modelType: "none"
  };
}
const k = new wt(), Ct = { class: "m-tip" }, Re = /* @__PURE__ */ U({
  __name: "asyncLoading",
  setup(t) {
    const e = et();
    return console.log("loading instance", e), ue({}), (n, r) => (v(), M("div", Ct, " Loading... "));
  }
}), $t = {
  "[object Number]": "number",
  "[object String]": "string",
  "[object Boolean]": "bool",
  "[object Array]": "array",
  "[object Object]": "object",
  "[object Undefined]": "undefined",
  "[object Function]": "function",
  "[object RegExp]": "regexp",
  "[object Date]": "date",
  "[object Symbol]": "symbol"
};
class vt {
  static typeof(e) {
    let n = Object.prototype.toString.call(e);
    return $t[n] || "unknow";
  }
  static isArray(e) {
    return Object.prototype.toString.call(e) === "[object Array]";
  }
  static isEmpty(e) {
    return e == null ? !0 : typeof e == "string" ? e.trim() === "" : Array.isArray(e) ? e.length === 0 : typeof e == "object" ? Object.keys(e).length === 0 : !1;
  }
  /**
   * 复制对象|数组
   * @param {Array|Object} obj 
   * @returns {Array|Object} 复制的
   */
  static copyObj(e) {
    return JSON.parse(JSON.stringify(e));
  }
}
function Nr(t) {
  switch (t) {
    case "number":
      return 0;
    case "string":
      return "";
    case "bool":
      return !1;
    case "array":
      return [];
    case "object":
      return {};
    case "undefined":
      return;
    case "function":
      return null;
    case "regexp":
      return null;
    case "date":
      return "";
    case "symbol":
      return null;
    default:
      return null;
  }
}
function _t(t) {
  return typeof t != "string" ? !1 : t.match(/^[a-zA-Z0-9-]+@[a-zA-Z0-9-_]+$/);
}
function Rr(t) {
  k.addLocalPackage(t.packageConfig, t);
}
function Fr(t, e) {
  k.addLocalPackage(t, e);
}
function Ur(t) {
  k.registerPackage(t);
}
function Dr(t) {
  console.debug("%c注册组件包", "color:green;", t), k.registerPackage(t);
}
async function zr(t, e, n) {
  return C.loadStyle(t, e || [], n);
}
function Gr(t) {
  C.unloadStyle(t);
}
function Br(t) {
  return C.isStyleLoaded(t);
}
function qr(t) {
  return C.getLoadedStyles(t);
}
function Wr() {
  C.unloadAllStyles();
}
function Vr(t = 500) {
  return B({
    loader: () => new Promise(async (e, n) => {
      try {
        setTimeout(() => {
          e(function() {
            return "";
          });
        }, t);
      } catch (r) {
        n(r);
      }
    })
  });
}
function Hr(t) {
  return k.getComponentOption(t);
}
function Fe(t, e = {}) {
  t = k.parseComponentName(t);
  const n = Object.assign({
    // 定义组件加载失败时显示的组件
    errorComponent: function(r) {
      return `组件加载失败:${t}`;
    },
    // 定义组件加载时显示的加载组件
    loadingComponent: Re
  }, e);
  return B({
    // 异步加载组件的函数
    loader: () => new Promise(async (r, o) => {
      try {
        let s = await k.component(t);
        if (!s) {
          o(new Error("组件不存在:" + t));
          return;
        }
        r(s);
      } catch (s) {
        o(s);
      }
    }),
    // 展开合并后的配置项
    ...n
  });
}
const St = {
  key: 1,
  class: "lp-component-error"
}, Ot = { class: "error-msg" }, Tt = {
  name: "lp-component",
  // 设置 inheritAttrs 为 false 以禁用默认的属性继承行为
  inheritAttrs: !1
}, q = /* @__PURE__ */ U({
  ...Tt,
  props: {
    is: {
      type: [String, Object, Function],
      default: ""
    }
  },
  setup(t, { expose: e }) {
    const n = t, r = x(!1), o = x("");
    let s = null;
    const a = x(null), i = x(0), l = x(null);
    Ae(() => n.is, (c, f) => {
      if (c !== f && i.value++, a.value = null, r.value = !1, o.value = "", s = null, !c) {
        l.value = null;
        return;
      }
      typeof c == "string" && _t(c) ? d(c) : l.value = ye(c);
    }, { immediate: !0 });
    function d(c) {
      l.value = ye(Fe(c, {
        loadingComponent: Re,
        errorComponent: function(f) {
          return "";
        },
        onError: (f, h, w, Z) => {
          console.error("onError", Z), s = h, r.value = !0, o.value = `组件加载失败: ${f.message}`, w();
        }
      }));
    }
    function y() {
      r.value = !1, o.value = "", s == null || s();
    }
    tt((c, f, h) => (console.error(`err of ${n.is}`), console.error("onErrorCaptured", c), !1));
    const p = de(), S = Ee(), K = T(() => Object.keys(p).reduce((c, f) => (f.startsWith("on") || (c[f] = p[f]), c), {})), Ze = T(() => Object.keys(p).reduce((c, f) => {
      if (f.startsWith("on")) {
        const h = f.slice(2).replace(/^\w/, (w) => w.toLowerCase());
        c[h] = p[f];
      }
      return c;
    }, {}));
    T(() => {
      const c = {};
      return "modelValue" in p && (c.modelValue = p.modelValue), c;
    }), T(() => {
      const c = {};
      return "onUpdate:modelValue" in p && (c["update:modelValue"] = p["onUpdate:modelValue"]), c;
    });
    const Xe = new Proxy({}, {
      get(c, f) {
        const h = a.value;
        return h == null ? void 0 : h[f];
      },
      set(c, f, h) {
        const w = a.value;
        return w ? (w[f] = h, !0) : !1;
      },
      has(c, f) {
        const h = a.value;
        return h ? f in h : !1;
      }
    });
    return e(Xe), (c, f) => (v(), M(nt, null, [
      t.is ? (v(), Me(Le(l.value), rt({
        key: i.value,
        ref_key: "innerRef",
        ref: a
      }, K.value, ot(Ze.value)), st({ _: 2 }, [
        at(pe(S), (h, w) => ({
          name: w,
          fn: it((Z) => [
            ct(c.$slots, w, lt(ut(Z || {})))
          ])
        }))
      ]), 1040)) : ge("", !0),
      r.value ? (v(), M("div", St, [
        Y("div", Ot, dt(o.value), 1),
        Y("button", {
          class: "btn btn-primary link",
          onClick: pt(y, ["stop"])
        }, "重试")
      ])) : ge("", !0)
    ], 64));
  }
});
let kt = {
  install: (t) => {
    t.component(q.name, q);
  }
};
const Pt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpComponent: q,
  default: kt
}, Symbol.toStringTag, { value: "Module" }));
var Ue = typeof global == "object" && global && global.Object === Object && global, xt = typeof self == "object" && self && self.Object === Object && self, _ = Ue || xt || Function("return this")(), W = _.Symbol, De = Object.prototype, At = De.hasOwnProperty, Et = De.toString, N = W ? W.toStringTag : void 0;
function Mt(t) {
  var e = At.call(t, N), n = t[N];
  try {
    t[N] = void 0;
    var r = !0;
  } catch {
  }
  var o = Et.call(t);
  return r && (e ? t[N] = n : delete t[N]), o;
}
var Lt = Object.prototype, It = Lt.toString;
function Nt(t) {
  return It.call(t);
}
var Rt = "[object Null]", Ft = "[object Undefined]", be = W ? W.toStringTag : void 0;
function I(t) {
  return t == null ? t === void 0 ? Ft : Rt : be && be in Object(t) ? Mt(t) : Nt(t);
}
function J(t) {
  return t != null && typeof t == "object";
}
var ze = Array.isArray;
function Ge(t) {
  var e = typeof t;
  return t != null && (e == "object" || e == "function");
}
var Ut = "[object AsyncFunction]", Dt = "[object Function]", zt = "[object GeneratorFunction]", Gt = "[object Proxy]";
function Be(t) {
  if (!Ge(t))
    return !1;
  var e = I(t);
  return e == Dt || e == zt || e == Ut || e == Gt;
}
var X = _["__core-js_shared__"], we = function() {
  var t = /[^.]+$/.exec(X && X.keys && X.keys.IE_PROTO || "");
  return t ? "Symbol(src)_1." + t : "";
}();
function Bt(t) {
  return !!we && we in t;
}
var qt = Function.prototype, Wt = qt.toString;
function P(t) {
  if (t != null) {
    try {
      return Wt.call(t);
    } catch {
    }
    try {
      return t + "";
    } catch {
    }
  }
  return "";
}
var Vt = /[\\^$.*+?()[\]{}|]/g, Ht = /^\[object .+?Constructor\]$/, Jt = Function.prototype, Kt = Object.prototype, Zt = Jt.toString, Xt = Kt.hasOwnProperty, Qt = RegExp(
  "^" + Zt.call(Xt).replace(Vt, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Yt(t) {
  if (!Ge(t) || Bt(t))
    return !1;
  var e = Be(t) ? Qt : Ht;
  return e.test(P(t));
}
function en(t, e) {
  return t == null ? void 0 : t[e];
}
function D(t, e) {
  var n = en(t, e);
  return Yt(n) ? n : void 0;
}
var ne = D(_, "WeakMap"), tn = 9007199254740991;
function qe(t) {
  return typeof t == "number" && t > -1 && t % 1 == 0 && t <= tn;
}
function nn(t) {
  return t != null && qe(t.length) && !Be(t);
}
var rn = Object.prototype;
function We(t) {
  var e = t && t.constructor, n = typeof e == "function" && e.prototype || rn;
  return t === n;
}
var on = "[object Arguments]";
function je(t) {
  return J(t) && I(t) == on;
}
var Ve = Object.prototype, sn = Ve.hasOwnProperty, an = Ve.propertyIsEnumerable, cn = je(/* @__PURE__ */ function() {
  return arguments;
}()) ? je : function(t) {
  return J(t) && sn.call(t, "callee") && !an.call(t, "callee");
};
function ln() {
  return !1;
}
var He = typeof exports == "object" && exports && !exports.nodeType && exports, Ce = He && typeof module == "object" && module && !module.nodeType && module, un = Ce && Ce.exports === He, $e = un ? _.Buffer : void 0, dn = $e ? $e.isBuffer : void 0, pn = dn || ln, fn = "[object Arguments]", mn = "[object Array]", yn = "[object Boolean]", gn = "[object Date]", hn = "[object Error]", bn = "[object Function]", wn = "[object Map]", jn = "[object Number]", Cn = "[object Object]", $n = "[object RegExp]", vn = "[object Set]", _n = "[object String]", Sn = "[object WeakMap]", On = "[object ArrayBuffer]", Tn = "[object DataView]", kn = "[object Float32Array]", Pn = "[object Float64Array]", xn = "[object Int8Array]", An = "[object Int16Array]", En = "[object Int32Array]", Mn = "[object Uint8Array]", Ln = "[object Uint8ClampedArray]", In = "[object Uint16Array]", Nn = "[object Uint32Array]", u = {};
u[kn] = u[Pn] = u[xn] = u[An] = u[En] = u[Mn] = u[Ln] = u[In] = u[Nn] = !0;
u[fn] = u[mn] = u[On] = u[yn] = u[Tn] = u[gn] = u[hn] = u[bn] = u[wn] = u[jn] = u[Cn] = u[$n] = u[vn] = u[_n] = u[Sn] = !1;
function Rn(t) {
  return J(t) && qe(t.length) && !!u[I(t)];
}
function Fn(t) {
  return function(e) {
    return t(e);
  };
}
var Je = typeof exports == "object" && exports && !exports.nodeType && exports, F = Je && typeof module == "object" && module && !module.nodeType && module, Un = F && F.exports === Je, Q = Un && Ue.process, ve = function() {
  try {
    var t = F && F.require && F.require("util").types;
    return t || Q && Q.binding && Q.binding("util");
  } catch {
  }
}(), _e = ve && ve.isTypedArray, Dn = _e ? Fn(_e) : Rn;
function zn(t, e) {
  return function(n) {
    return t(e(n));
  };
}
var Gn = zn(Object.keys, Object), Bn = Object.prototype, qn = Bn.hasOwnProperty;
function Wn(t) {
  if (!We(t))
    return Gn(t);
  var e = [];
  for (var n in Object(t))
    qn.call(t, n) && n != "constructor" && e.push(n);
  return e;
}
var re = D(_, "Map"), oe = D(_, "DataView"), se = D(_, "Promise"), ae = D(_, "Set"), Se = "[object Map]", Vn = "[object Object]", Oe = "[object Promise]", Te = "[object Set]", ke = "[object WeakMap]", Pe = "[object DataView]", Hn = P(oe), Jn = P(re), Kn = P(se), Zn = P(ae), Xn = P(ne), O = I;
(oe && O(new oe(new ArrayBuffer(1))) != Pe || re && O(new re()) != Se || se && O(se.resolve()) != Oe || ae && O(new ae()) != Te || ne && O(new ne()) != ke) && (O = function(t) {
  var e = I(t), n = e == Vn ? t.constructor : void 0, r = n ? P(n) : "";
  if (r)
    switch (r) {
      case Hn:
        return Pe;
      case Jn:
        return Se;
      case Kn:
        return Oe;
      case Zn:
        return Te;
      case Xn:
        return ke;
    }
  return e;
});
var Qn = "[object String]";
function Yn(t) {
  return typeof t == "string" || !ze(t) && J(t) && I(t) == Qn;
}
var er = "[object Map]", tr = "[object Set]", nr = Object.prototype, rr = nr.hasOwnProperty;
function or(t) {
  if (t == null)
    return !0;
  if (nn(t) && (ze(t) || typeof t == "string" || typeof t.splice == "function" || pn(t) || Dn(t) || cn(t)))
    return !t.length;
  var e = O(t);
  if (e == er || e == tr)
    return !t.size;
  if (We(t))
    return !Wn(t).length;
  for (var n in t)
    if (rr.call(t, n))
      return !1;
  return !0;
}
const A = [];
function Jr(t) {
  A.find((n) => n.name === t.name) || A.push(t);
}
async function sr(t) {
  var s;
  console.log("## 获取图标包", t);
  let e = null;
  for (let a in A) {
    let i = A[a];
    if (i.packages && ((s = i.packages) != null && s.includes(t))) {
      e = i;
      break;
    }
  }
  let n = e || A[0];
  if (!n)
    throw console.log("没有网关", t, A), new Error("没有网关");
  let r = await fe.post(n.url, {
    name: t
  });
  if (r.data.code !== 200)
    throw new Error(r.data.msg);
  if (!r.data.data.row)
    throw new Error("图标包不存在");
  return r.data.data.row;
}
const R = {}, G = {};
async function ar(t) {
  let e = ir(t), n = R[e.package];
  if (n || (G[e.package] && await ee(() => !!R[e.package]), n = R[e.package]), !n)
    try {
      G[e.package] = 1, n = await sr(e.package), R[e.package] = n, delete G[e.package];
    } catch (r) {
      throw delete G[e.package], console.error("加载图标包失败", r), r;
    }
  if (cr(n), !n.icons[e.icon])
    throw console.error("图标不存在:", e), new Error("图标不存在");
  return n.icons[e.icon];
}
function Kr(t) {
  R[t.name] = t;
}
function ir(t) {
  if (!t.includes("@"))
    return {
      package: "default",
      icon: t
    };
  let [e, n] = t.split("@");
  return {
    package: e,
    icon: n
  };
}
const V = {};
function cr(t) {
  if (V[t.name])
    return;
  const e = document.createElement("style"), n = t.name || "iconfont", r = (t.data.woff2.startsWith("//"), t.data.woff2), o = (t.data.woff.startsWith("//"), t.data.woff), s = (t.data.truetype.startsWith("//"), t.data.truetype);
  e.innerHTML = `
        @font-face {
            font-family: '${n}';
            src: url('${r}') format('woff2'),
                 url('${o}') format('woff'),
                 url('${s}') format('truetype');
        }
    `, document.head.appendChild(e), V[t.name] = e, console.log("已挂载字体:", t.name);
}
function Zr(t) {
  const e = V[t.name];
  e && e.parentNode && (e.parentNode.removeChild(e), delete V[t.name], console.log("已卸载字体:", t.name));
}
const lr = ["innerHTML"], ur = {
  name: "lp-icon"
}, ie = /* @__PURE__ */ U({
  ...ur,
  props: {
    is: { default: "loading" },
    size: { default: 12 },
    color: { default: "#000000" }
  },
  emits: ["click"],
  setup(t, { emit: e }) {
    const n = e, r = de(), o = {}, s = x(""), a = t;
    Ae(() => a.is, async (d, y) => {
      if (d !== y) {
        if (o[d]) {
          s.value = "&#x" + o[d];
          return;
        }
        try {
          o[d] = await ar(d), s.value = "&#x" + o[d];
        } catch (p) {
          console.error("加载图标失败", p);
        }
      }
    }, {
      // 初始化时加载图标
      immediate: !0
    });
    const i = T(() => {
      const { size: d, color: y } = a;
      let p = d;
      return Yn(d) && (p = parseInt(d, 10)), {
        fontSize: `${p}px`,
        color: y,
        display: "inline-flex",
        fontFamily: "'default'"
      };
    }), l = (d) => {
      n("click", d);
    };
    return (d, y) => (v(), M("i", {
      class: Ne(["lp-icon", [pe(r).class]]),
      style: Ie(i.value),
      innerHTML: s.value,
      onClick: l
    }, null, 14, lr));
  }
}), dr = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [r, o] of e)
    n[r] = o;
  return n;
}, pr = ["fill"], fr = ["xlink:href"], mr = {
  name: "LpSvg"
}, yr = /* @__PURE__ */ Object.assign(mr, {
  props: {
    icon: {
      type: String,
      required: !0
    },
    size: {
      type: [Number, String],
      default: 12
    },
    color: {
      type: String,
      default: "#000000"
    }
  },
  setup(t) {
    const e = t, n = T(() => `#${e.icon}`), r = T(() => {
      const { size: o, color: s } = e;
      let a = `${o}`;
      return a = `${a.replace("px", "")}px`, {
        width: a,
        fill: s,
        height: a
      };
    });
    return (o, s) => (v(), M("svg", {
      class: Ne([o.$attrs.class]),
      style: Ie(r.value),
      fill: t.color,
      "aria-hidden": "true"
    }, [
      Y("use", { "xlink:href": n.value }, null, 8, fr)
    ], 14, pr));
  }
}), ce = /* @__PURE__ */ dr(yr, [["__scopeId", "data-v-4508aad0"]]);
let gr = {
  install: (t) => {
    t.component(ie.name, ie), t.component(ce.name, ce);
  }
};
const hr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpIcon: ie,
  LpSvg: ce,
  default: gr
}, Symbol.toStringTag, { value: "Module" }));
function br(t) {
  let e = {};
  for (const n in t)
    e[n] = () => {
      var r;
      return (r = t[n]) == null ? void 0 : r.map(H);
    };
  return e;
}
function H(t) {
  if (typeof t == "string" || typeof t == "number") return t;
  const { component: e, props: n, children: r } = t;
  let o = {};
  return t.slots && (o = {
    ...o,
    ...br(t.slots)
  }), r && r.length > 0 && (o.default = () => r == null ? void 0 : r.map(H)), e.includes("@") ? he(
    q,
    { ...n, is: e },
    o
  ) : he(
    e,
    n || {},
    r == null ? void 0 : r.map(H)
  );
}
function wr(t, e) {
  console.log("useRenderComponent", t);
  const n = ue({ layout: t });
  return U({
    name: "DynamicLayout",
    setup() {
      return console.log("useRenderComponent setup", n.layout), () => ft("div", {}, n.layout.map((r) => H(r)));
    }
  });
}
const jr = { class: "lp-layout" }, Cr = {
  name: "LpLayout"
}, le = /* @__PURE__ */ U({
  ...Cr,
  props: {
    data: {
      type: [Object, Array],
      default: () => []
    }
  },
  setup(t) {
    const e = de(), n = Ee();
    ue({});
    const o = wr(t.data);
    return mt(() => {
      console.log(e), console.log("layout slots", n);
    }), (s, a) => (v(), M("div", jr, [
      (v(), Me(Le(pe(o))))
    ]));
  }
});
let $r = {
  install: (t) => {
    t.component(le.name, le);
  }
};
const vr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpLayout: le,
  default: $r
}, Symbol.toStringTag, { value: "Module" }));
function _r(t) {
  const e = /* @__PURE__ */ Object.assign({ "./lp-component/index.ts": Pt, "./lp-icon/index.ts": hr, "./lp-layout/index.ts": vr });
  console.debug("%cglobalComponents", "color:green", e), Object.keys(e).forEach((n) => {
    const r = e[n].default;
    or(r) || t.use(r);
  });
}
function Xr(t, e) {
  if (!t)
    throw new Error("Invalid component: " + t);
  if (typeof t == "string") {
    if (Sr(t))
      return Fe(t);
    if (!e)
      throw new Error("获取全局组件失败：未提供 Vue 应用实例");
    const n = e.component(t);
    if (!n)
      throw new Error(`Component "${t}" not found in app registry`);
    return n;
  }
  if (typeof t == "object" && !("then" in t))
    return t;
  if (t instanceof Promise || typeof t == "object" && "then" in t)
    return B(() => t.then((n) => n.default || n));
  if (typeof t == "function") {
    const n = t();
    return n instanceof Promise || typeof n == "object" && "then" in n ? B(
      () => n.then((r) => r.default || r)
    ) : t;
  }
  throw new Error("Unknown component type: " + t);
}
function Sr(t) {
  return t.includes("@");
}
function Or(t) {
  return new Promise((e) => setTimeout(e, t));
}
class Tr {
  constructor(e, n) {
    m(this, "maxRetry");
    m(this, "delay");
    this.retryOption = e, this.createRawClient = n, this.maxRetry = e.maxRetry ?? 3, this.delay = e.delay ?? 1e3;
  }
  /**
   * 根据响应判断是否需要重试
   * @param response 响应数据
   * @returns 是否需要重试
   */
  async shouldRetryByResponse(e) {
    return this.retryOption.check ? await this.retryOption.check(e) : e.status >= 500 || e.status === 429 || e.status === 408;
  }
  /**
   * 发送请求并返回响应
   * @param rawClient 原始请求客户端
   * @param config 请求配置
   * @returns 响应数据
   */
  async requestAsResponse(e, n) {
    try {
      return await e.request(n);
    } catch (r) {
      const o = r == null ? void 0 : r.response;
      if (o)
        return o;
      throw r;
    }
  }
  /**
   * 执行重试
   * @param config 
   * @param initialResponse 
   * @returns 
   */
  async run(e, n) {
    const r = this.createRawClient();
    let o = n;
    for (; await this.shouldRetryByResponse(o); ) {
      const s = e.__retryCount ?? 0;
      if (s >= this.maxRetry || this.retryOption.handle && !await this.retryOption.handle(o))
        return o;
      e.__retryCount = s + 1, e.__isRetry = !0, this.delay > 0 && await Or(this.delay * e.__retryCount), o = await this.requestAsResponse(r, e);
    }
    return o;
  }
}
function Ke(t) {
  t = t || {};
  const e = {
    baseURL: t.baseURL,
    timeout: t.timeout || 1e4,
    headers: {
      ...t.headers || {}
    }
  }, n = fe.create(e);
  n.interceptors.request.use((o) => (t.requestInterceptors ? o = t.requestInterceptors(o) : t.baseInterceptors, o), (o) => Promise.reject(o));
  let r = null;
  return t.retry && (r = async (o) => {
    if (t.retry) {
      const s = t.retry;
      if (t.retry.check(o)) {
        const i = () => Ke({
          baseURL: t.baseURL,
          timeout: t.timeout,
          headers: t.headers,
          requestInterceptors: t.requestInterceptors,
          baseInterceptors: !1,
          __retryMode: !0
        }), l = new Tr(s, i), d = (o == null ? void 0 : o.config) || {};
        return await l.run(d, o);
      }
    }
    return o;
  }), t.__retryMode || n.interceptors.response.use(async (o) => {
    if (r && (o = await r(o)), t.responseInterceptors)
      return t.responseInterceptors(o);
    if (t.baseInterceptors)
      return o.data;
  }, async (o) => {
    if (console.log("response err", { err: o }), r && o && (o != null && o.response)) {
      let s = o == null ? void 0 : o.response;
      return s = await r(s), s;
    }
    return Promise.reject(o);
  }), n;
}
class L extends Error {
  constructor(n, r = 0, o = {}) {
    super(n);
    m(this, "code");
    m(this, "data");
    m(this, "name", "LooplanException");
    this.code = r, this.data = o, Object.setPrototypeOf(this, L.prototype);
  }
  getData() {
    return this.data;
  }
  getCode() {
    return this.code;
  }
  getMessage() {
    return this.message;
  }
}
function g(t) {
  return {
    error: {
      code: 500,
      msg: "请求失败"
    },
    ...t
  };
}
class kr {
  constructor(e, n) {
    m(this, "space");
    m(this, "modelName");
    this.space = e, this.modelName = n;
  }
  handleResult(e) {
    if (e.code !== 200)
      throw new L(e.msg || "请求失败", e.code, e.data);
  }
  /**
   * 列表数据
   * TODO list
   * @param params 其他参数
   */
  async list(e = {}) {
    const { instance: n } = this.space;
    let r = await n.post(`${this.modelName}.list`, {
      ...e
    });
    return r ? {
      error: r.code === 200 ? null : {
        code: r.code,
        msg: r.msg || "请求失败"
      },
      result: r,
      list: r.data.list || []
    } : g({ list: [], result: r });
  }
  /**
   * 分页列表
   * TODO paginate
   * @param page 页码
   * @param psize 每页数量
   * @param params 其他参数
   */
  async paginate(e = 1, n = 10, r = {}) {
    const { instance: o } = this.space;
    let s = await o.post(`${this.modelName}.paginate`, {
      page: e,
      psize: n,
      ...r
    });
    if (!s)
      return g({ list: [], result: s });
    let a = s.data.list, i = (a == null ? void 0 : a.data) || [];
    return delete a.list, {
      error: s.code === 200 ? null : {
        code: s.code,
        msg: s.msg || "请求失败"
      },
      result: s,
      list: i,
      pageStatus: a || {}
    };
  }
  /**
   * 大数据分页列表
   * TODO paginateX
   */
  async paginateX(e, n, r = {}) {
    const { instance: o } = this.space;
    let s = await o.post(`${this.modelName}.paginateX`, {
      lastIndex: e,
      options: n || null,
      ...r
    });
    if (!s)
      return g({ list: [], result: s });
    let a = s.data.list, i = (a == null ? void 0 : a.data) || [];
    return delete a.list, {
      error: s.code === 200 ? null : {
        code: s.code,
        msg: s.msg || "请求失败"
      },
      result: s,
      list: i,
      pageStatus: a || {}
    };
  }
  /**
   * 保存
   * TODO save
   * @param data 要保存的数据
   * @param id 要保存的记录ID
   * @param params 其他参数
   */
  async save(e, n, r = {}) {
    const { instance: o } = this.space;
    let s = await o.post(`${this.modelName}.save`, {
      id: n,
      data: e,
      ...r
    });
    return s ? {
      error: s.code === 200 ? null : {
        code: s.code,
        msg: s.msg || "请求失败"
      },
      result: s
    } : g({ result: s });
  }
  /**
   * 添加
   * TODO add
   * @param data 要添加的数据
   * @param params 其他参数
   */
  async add(e, n = {}) {
    const { instance: r } = this.space;
    let o = await r.post(`${this.modelName}.save`, {
      data: e,
      ...n
    });
    return o ? {
      error: o.code === 200 ? null : {
        code: o.code,
        msg: o.msg || "请求失败"
      },
      result: o
    } : g({ result: o });
  }
  /**
   * 更新
   * TODO update
   * @param data 要更新的数据
   * @param id 要更新的记录ID
   * @param params 其他参数
   */
  async update(e, n, r = {}) {
    const { instance: o } = this.space;
    let s = await o.post(`${this.modelName}.save`, {
      id: n,
      data: e,
      ...r
    });
    return s ? {
      error: s.code === 200 ? null : {
        code: s.code,
        msg: s.msg || "请求失败"
      },
      result: s
    } : g({ result: s });
  }
  /**
   * 删除
   * TODO delete
   * @param id 要删除的记录ID
   * @param params 其他参数
   */
  async delete(e, n = {}) {
    const { instance: r } = this.space;
    let o = await r.post(`${this.modelName}.delete`, {
      id: e,
      ...n
    });
    return o ? {
      error: o.code === 200 ? null : {
        code: o.code,
        msg: o.msg || "请求失败"
      },
      result: o
    } : g({ result: o });
  }
  /**
   * 恢复删除
   * TODO restore
   * @param id 要恢复删除的记录ID
   * @param params 其他参数
   */
  async restore(e, n = {}) {
    const { instance: r } = this.space;
    let o = await r.post(`${this.modelName}.restore`, {
      id: e,
      ...n
    });
    return o ? {
      error: o.code === 200 ? null : {
        code: o.code,
        msg: o.msg || "请求失败"
      },
      result: o
    } : g({ result: o });
  }
  /**
   * 详情
   * TODO row
   */
  async row(e, n = {}) {
    var s;
    const { instance: r } = this.space;
    let o = await r.post(`${this.modelName}.row`, {
      id: e,
      ...n
    });
    return o ? {
      error: o.code === 200 ? null : {
        code: o.code,
        msg: o.msg || "请求失败"
      },
      result: o,
      row: ((s = o.data) == null ? void 0 : s.row) || {}
    } : g({ result: o, row: null });
  }
  /**
   * 保存选项
   * TODO saveOptions
   */
  async saveOptions(e, n = {}, r = {}) {
    const { instance: o } = this.space;
    let s = await o.post(`${this.modelName}.saveOptions`, {
      list: e,
      belong: n,
      ...r
    });
    return s ? {
      error: s.code === 200 ? null : {
        code: s.code,
        msg: s.msg || "请求失败"
      },
      result: s
    } : g({ result: s });
  }
  /**
   * 统计数量
   * TODO count
   * @param filterOption 过滤选项
   * @param params 其他参数
   */
  async count(e = null, n = {}) {
    const { instance: r } = this.space;
    let o = await r.post(`${this.modelName}.count`, {
      filter: e,
      ...n
    });
    return o ? {
      error: o.code === 200 ? null : {
        code: o.code,
        msg: o.msg || "请求失败"
      },
      result: o,
      count: o.data.count || 0
    } : g({ result: o, count: 0 });
  }
  /**
   * 保存字段
   * TODO saveField
   * 
   * @param id 数据ID
   * @param field 字段名
   * @param value 字段值
   * @param params 其他参数
   */
  async saveField(e, n, r, o = {}) {
    const { instance: s } = this.space;
    let a = await s.post(`${this.modelName}.saveField`, {
      id: e,
      field: n,
      value: r,
      ...o
    });
    return a ? {
      error: a.code === 200 ? null : {
        code: a.code,
        msg: a.msg || "请求失败"
      },
      result: a
    } : g({ result: a });
  }
  /**
   * 检查是否存在
   * TODO exists
   */
  async exists(e = null, n = {}) {
    var s;
    const { instance: r } = this.space;
    let o = await r.post(`${this.modelName}.exists`, {
      filter: e,
      ...n
    });
    return o ? {
      error: o.code === 200 ? null : {
        code: o.code,
        msg: o.msg || "请求失败"
      },
      result: o,
      exists: ((s = o.data) == null ? void 0 : s.isExist) || !1
    } : g({ result: o });
  }
  /**
   * 批量保存
   * TODO multiSave
   */
  async multiSave(e) {
    const { instance: n } = this.space;
    let r = await n.post(`${this.modelName}.multiSave`, {
      list: e
    });
    return r ? {
      error: r.code === 200 ? null : {
        code: r.code,
        msg: r.msg || "请求失败"
      },
      result: r
    } : g({ result: r });
  }
  /**
   * 批量删除
   * TODO multiDelete
   */
  async multiDelete(e, n = {}) {
    const { instance: r } = this.space;
    let o = await r.post(`${this.modelName}.multiDelete`, {
      ids: e,
      ...n
    });
    return o ? {
      error: o.code === 200 ? null : {
        code: o.code,
        msg: o.msg || "请求失败"
      },
      result: o
    } : g({ result: o });
  }
}
class Qr {
  constructor(e) {
    m(this, "url");
    m(this, "options");
    /**
     * 实例化后的API客户端
     */
    m(this, "instance");
    this.url = e.url, this.options = e, this.createApiClient();
  }
  createApiClient() {
    let e;
    this.options.retry === !0 ? e = Pr() : vt.typeof(this.options.retry) === "object" && (e = this.options.retry), console.log("重试配置:", e), this.instance = Ke({
      baseURL: this.url,
      timeout: 1e4,
      headers: {},
      /**
      * 请求拦截器
      * @param config 请求配置
      * @returns 返回配置
      */
      requestInterceptors: async (n) => {
        var r, o, s, a;
        if (n.headers["Content-Type"] || (n.headers["Content-Type"] = "application/json"), this.options.provideToken) {
          const i = await ((o = (r = this.options).provideToken) == null ? void 0 : o.call(r, !!n.__isRetry)) || "", l = this.options.tokenField || "Authorization";
          i && (n.headers[l] = i);
        }
        return (a = (s = this.options).requestInterceptors) == null || a.call(s, n), n;
      },
      /**
       * 响应拦截器
       * @param response 响应数据
       * @returns 返回数据
       */
      responseInterceptors: async (n) => n.data,
      retry: e
    });
  }
  /**
   * 
   * @param name 模型名称(space/name)
   * @returns 模型API
   */
  useModel(e) {
    return new kr(this, e);
  }
  /**
   * 导入云函数
   * @param name 云函数名称
   */
  useCloudFunction(e, n) {
    return (r) => this.callCloudFunction(e, r, (n == null ? void 0 : n.config) || {});
  }
  /**
   * 调用云函数
   * @param name 云函数名称
   * @param params 调用参数
   */
  async callCloudFunction(e, n, r = {}) {
    try {
      return await this.instance.post(`/${e}`, n, r);
    } catch (o) {
      throw new L(o.message || "云函数调用失败", o.code || 0, o.data || {});
    }
  }
  /**
   * 导入云对象
   * @param name 云对象名称
   */
  useCloudObject(e, n) {
    n = Object.assign({
      args: !1
    }, n || {});
    const r = this;
    return new Proxy({}, {
      get(o, s) {
        if (s !== "then")
          return (...a) => {
            let i = a.length > 0 ? a[0] : {};
            return n.args && (i = {
              $params: a
            }), r.callCloudObject(e, s, i, n.config);
          };
      }
    });
  }
  /**
   * 调用云对象方法
   * @param objectName 云对象名称
   * @param methodName 方法名称
   * @param params 调用参数
   */
  async callCloudObject(e, n, r, o) {
    const s = `${e}.${n}`;
    try {
      return await this.instance.post(`/${s}`, r, o);
    } catch (a) {
      throw new L(a.message || "云对象调用失败", a.code || 0, a.data || {});
    }
  }
}
function Pr() {
  return {
    // 最大重试次数
    maxRetry: 3,
    // 重试延迟时间(毫秒)
    delay: 200,
    // 检查是否需要重试
    check: (t) => {
      var e;
      return t.status === 401 || ((e = t.data) == null ? void 0 : e.code) === 401;
    },
    // 处理重试
    handle: async (t) => {
      var e;
      try {
        if (((e = t.data) == null ? void 0 : e.code) === 401 || t.status === 401) {
          const n = xr("main");
          if (!n)
            return console.error("无法获取main空间实例"), !1;
          const o = await n.useCloudObject("Auth").dataToken();
          return o.code != 200 ? (console.error("获取dataToken失败:", o), !1) : (localStorage.setItem("dataToken", o.data.token), !0);
        }
      } catch (n) {
        console.error("处理重试时出错:", n);
      }
      return !1;
    }
  };
}
const xe = /* @__PURE__ */ new Map(), xr = (t) => {
  if (!xe.has(t))
    throw new L(`模型空间 ${t} 不存在`);
  return xe.get(t);
};
function Ar(t) {
  _r(t);
}
const Yr = { install: Ar };
export {
  R as IconPackages,
  vt as JsDataType,
  L as LooplanException,
  q as LpComponent,
  ie as LpIcon,
  ce as LpSvg,
  kr as ModelClient,
  Qr as ModelSpace,
  Vr as asyncComponentDelay,
  Ke as createApi,
  Yr as default,
  E as gatewayOptions,
  Hr as getComponentOption,
  yt as getComponentPackage,
  sr as getIconPackage,
  qr as getLoadedStyles,
  A as iconGatewayOptions,
  Ar as install,
  Br as isStyleLoaded,
  Fe as loadComponent,
  ar as loadIcon,
  zr as loadStyle,
  me as looplanConfig,
  xe as modelSpaceMap,
  cr as mountIconfont,
  _t as nameIsUseAsyncComponent,
  Ur as regPkg,
  _r as registerLooplanComponents,
  Dr as registerPackage,
  Xr as resolveComponent,
  Rr as setComponentPackage,
  Ir as setGateway,
  Jr as setIconGateway,
  Kr as setIconPackage,
  Fr as setPkg,
  Nr as typeDefaultValue,
  Wr as unloadAllStyles,
  Gr as unloadStyle,
  Zr as unmountIconfont,
  xr as useModelSpace
};
