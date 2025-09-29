var xe = Object.defineProperty;
var Ie = (e, t, n) => t in e ? xe(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var z = (e, t, n) => Ie(e, typeof t != "symbol" ? t + "" : t, n);
import { defineComponent as Q, getCurrentInstance as ke, reactive as Le, createElementBlock as A, openBlock as $, defineAsyncComponent as de, ref as V, watch as me, onErrorCaptured as Me, useAttrs as ge, useSlots as Ue, computed as w, Fragment as Fe, createBlock as ze, createCommentVNode as ee, resolveDynamicComponent as Be, unref as W, mergeProps as Ge, toHandlers as Ve, createSlots as We, renderList as qe, withCtx as Re, renderSlot as De, normalizeProps as He, guardReactiveProps as Je, createElementVNode as q, toDisplayString as Ke, withModifiers as Ze, normalizeStyle as ye, normalizeClass as be } from "vue";
import Y from "axios";
function k(e, t = !0) {
  if (typeof e != "string")
    return "";
  let o = e.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[^a-zA-Z0-9]+/g, " ").split(" ");
  o = o.filter((r) => r !== "");
  for (let r = 0; r < o.length; r++)
    r === 0 && !t ? o[r] = o[r].toLowerCase() : o[r] = o[r].charAt(0).toUpperCase() + o[r].slice(1).toLowerCase();
  return o.join("");
}
const S = [];
function eo(e) {
  if (S.find((n) => n.name === e.name)) {
    console.error("网关已存在");
    return;
  }
  S.push(e);
}
async function Ne(e) {
  var s;
  console.log("获取组件包", e);
  let t = null;
  for (let l in S) {
    let a = S[l];
    if (a.packages && ((s = a.packages) != null && s.includes(e))) {
      t = a;
      break;
    }
  }
  let n = t || S[0];
  if (!n)
    throw new Error("没有网关");
  let o = await Y.post(n.url, {
    name: e
  });
  if (o.data.code !== 200)
    throw new Error(o.data.msg);
  if (!o.data.data.row)
    throw new Error("组件包不存在");
  const r = o.data.data.row;
  return r.loadStatus = 0, r;
}
function he(e, t = 100) {
  return new Promise((n) => {
    const o = setInterval(() => {
      e() && (clearInterval(o), n());
    }, t);
  });
}
function Xe(e) {
  return {
    title: e,
    name: e,
    modelType: "none"
  };
}
const m = {
  MuloLayer: {
    name: "MuloLayer",
    title: "MuloLayer",
    type: "cdn",
    version: "v1",
    cdn: "http://component.loqh.cn/mulo-layer/__version__/mulo-layer.umd.js",
    styleCdn: [],
    components: [
      {
        title: "测试组件",
        name: "MuloTest",
        modelType: "none"
      }
    ],
    loadStatus: 0
  }
}, b = {}, p = {};
class Qe {
  constructor() {
    z(this, "components", {});
    /**
     * TODO -- 组件包网关加载状态
     * 0 -- 未加载
     * 1 -- 加载中
     * 200 -- 已加载
     */
    z(this, "pkgGatewayLoading", {});
  }
  /**
   * 规范化组件名称，格式：包名@驼峰组件名
   */
  parseComponentName(t) {
    const [n, o] = t.split("@");
    return `${n}@${k(o)}`;
  }
  /**
   * 获取或注册组件。
   * TODO -- 获取或注册组件。
   * @param nameRaw 原始名称，如 'MuloLayer@TestComponent'
   * @param component 可选，如果传入则注册该组件
   */
  async component(t, n = null) {
    const o = this.parseComponentName(t);
    if (n) {
      this.components[o] = n;
      return;
    }
    console.debug("component 加载组件", o);
    const [r, s] = o.split("@");
    if (!m[r] && S.length)
      if (this.pkgGatewayLoading[r] == 0 || this.pkgGatewayLoading[r] == null) {
        this.pkgGatewayLoading[r] = 1;
        try {
          const a = await Ne(r);
          m[r] = a;
        } catch (a) {
          console.error("从网关加载组件包失败", r, a);
        }
      } else
        await he(() => !!m[r]);
    if (!b[r]) {
      const a = await this.getPackage(r);
      console.log("pkgData", r, a, m), this.registerComponents(m[r], a);
    }
    const l = this.getComponentOption(o);
    return l && l.styleImportCase === "use" && l.styleCdn && await this.loadComponentStyles(r, l), this.isAsyncComponent(r, s) ? (console.debug("加载异步组件", o), this.components[o]()) : this.components[o];
  }
  /**
   * TODO -- 获取组件选项对象
   * @param item 组件选项或组件名称字符串
   * @returns 组件选项对象
   */
  getComponentOptionObject(t) {
    return typeof t == "string" ? Xe(t) : t;
  }
  /**
   * 注册包内所有组件到 this.components
   * TODO -- 注册
   */
  registerComponents(t, n) {
    console.log("注册组件包", t.name, n), t.components.forEach((o) => {
      const r = this.getComponentOptionObject(o), s = k(r.name), l = `${t.name}@${s}`;
      console.log("注册组件", l, n[s]), this.components[l] = n[s];
    });
  }
  /**
   * TODO -- 获取组件选项对象
   * @param raw 组件名称字符串
   * @returns 组件选项对象
   */
  getComponentOption(t) {
    const n = this.parseComponentName(t), [o, r] = n.split("@"), s = m[o];
    if (!s) return;
    const l = s.components.find((a) => {
      const f = this.getComponentOptionObject(a);
      return k(f.name) === r;
    });
    return l ? this.getComponentOptionObject(l) : void 0;
  }
  /**
   * TODO -- 判断是否异步组件
   * @param pkg 包名
   * @param comp 组件名
   * @returns 
   */
  isAsyncComponent(t, n) {
    const o = m[t];
    if (!o) return !1;
    if (o.asyncComponents)
      return o.asyncComponents.includes(n);
    const r = o.components.find((s) => {
      const l = this.getComponentOptionObject(s);
      return k(l.name) === n;
    });
    return r ? !!this.getComponentOptionObject(r).isAsync : !1;
  }
  /**
   * TODO -- 异步加载组件包
   * 
   * @todo 加载组件文件到内存
   * @param packageName 组件包名称
   * @returns 组件包数据
   */
  async getPackage(t) {
    console.debug("getPackage 加载组件包", t);
    let n = m[t];
    if (!n) throw new Error(`组件包不存在: ${t}`);
    if (b[t])
      return b[t];
    if (n.type === "cdn") {
      if (n.loadStatus === -1 && (n.loadStatus = 0), n.loadStatus === 0) {
        n.loadStatus = 1;
        try {
          n.styleCdn && n.styleCdn.length > 0 && n.styleImportCase === "register" && await this.loadPackageStyles(t);
          const o = await this.getOnlineComponentPackage(n);
          b[t] = o, n.loadStatus = 200;
        } catch (o) {
          throw n.loadStatus = -1, o;
        }
      }
      n.loadStatus === 1 && await this.waitComputeLoad(t);
    }
    return b[t];
  }
  /** 等待加载完成 */
  waitComputeLoad(t) {
    return new Promise((n) => {
      const o = setInterval(() => {
        b[t] && (clearInterval(o), n());
      }, 100);
    });
  }
  /**
   * TODO -- 手动添加本地组件包
   * @param cfg 组件包配置
   * @param data 组件包数据
   */
  addLocalPackage(t, n) {
    m[t.name] = t, b[t.name] = n, this.registerComponents(t, n);
  }
  /**
   * TODO -- 添加组件包配置
   * @param cfg 组件包配置
   */
  registerPackage(t) {
    t = Object.assign({
      loadStatus: 0,
      styleImportCase: "register"
      // 默认在注册时导入样式
    }, t), m[t.name] = t;
  }
  /**
   * TODO -- 通过 CDN 加载全局 UMD 包
   * @param packageInfo 组件包配置
   * @returns 组件包数据
   */
  getOnlineComponentPackage(t) {
    return new Promise((n, o) => {
      console.debug(`开始加载在线组件库: %c${t.name}`, "color: blue");
      const { title: r, name: s, version: l, cdn: a } = t;
      if (!a) {
        o(new Error(`组件库 ${s} 未设置 CDN 地址`));
        return;
      }
      const f = a.replace("__version__", l || ""), c = document.createElement("script");
      c.src = f, c.onload = () => {
        window[s] ? (console.debug(`已加载在线组件库: %c${s}`, "color: green"), n(window[s]), t.keepOfWindow || delete window[s]) : o(new Error(`组件未在全局命名空间中找到: ${s}`)), document.body.removeChild(c);
      }, c.onerror = () => {
        document.body.removeChild(c), o(new Error(`加载 ${r || s} 组件库失败`));
      }, document.body.appendChild(c);
    });
  }
  /**
   * TODO -- 加载组件包的样式
   * @param packageName 组件包名称
   * @returns 组件包数据
   */
  loadPackageStyles(t) {
    const n = m[t];
    if (!n || !n.styleCdn || n.styleCdn.length === 0)
      return Promise.resolve();
    console.debug(`加载组件包样式: %c${t}`, "color: blue");
    const o = n.version || "";
    p[t] || (p[t] = []);
    const r = n.styleCdn.map((s) => new Promise((l, a) => {
      const f = s.replace("__version__", o), c = document.createElement("link");
      c.rel = "stylesheet", c.href = f, c.onload = () => {
        console.debug(`已加载样式: %c${f}`, "color: green"), l(c);
      }, c.onerror = () => {
        console.error(`加载包样式失败: ${f}`), document.head.removeChild(c), a(new Error(`加载 ${n.title || t} 样式失败: ${f}`));
      }, document.head.appendChild(c), p[t].push(c);
    }));
    return Promise.all(r).then(() => {
    });
  }
  /**
   * TODO -- 加载组件特定的样式
   * @param packageName 组件包名称
   * @param componentOption 组件选项
   * @returns 组件包数据
   */
  async loadComponentStyles(t, n) {
    if (!n.styleCdn || n.styleCdn.length === 0)
      return;
    console.debug(`加载组件特定样式: %c${t}@${n.name}`, "color: blue");
    const o = m[t], r = (o == null ? void 0 : o.version) || "", s = `${t}@${n.name}`;
    p[s] || (p[s] = []);
    const l = n.styleCdn.map((f) => new Promise((c) => {
      const g = f.replace("__version__", r), i = document.createElement("link");
      i.rel = "stylesheet", i.href = g, i.onload = () => {
        console.debug(`已加载组件样式: %c${g}`, "color: green"), c(i);
      }, i.onerror = () => {
        console.error(`加载组件样式失败: ${g}`), document.head.removeChild(i), c(null);
      }, document.head.appendChild(i), p[s].push(i);
    })), a = await Promise.all(l);
    p[s] = p[s].filter(
      (f) => a.includes(f)
    );
  }
  /**
   * TODO -- 卸载组件包的样式
   * @param packageName 组件包名称
   * @returns 组件包数据
   */
  unloadPackageStyles(t) {
    p[t] && (p[t].forEach((n) => {
      document.head.contains(n) && document.head.removeChild(n);
    }), delete p[t]), Object.keys(p).forEach((n) => {
      n.startsWith(`${t}@`) && (p[n].forEach((o) => {
        document.head.contains(o) && document.head.removeChild(o);
      }), delete p[n]);
    });
  }
  /**
   * TODO -- 卸载特定组件的样式
   * @param rawName 组件名称，格式：包名@组件名
   * @returns 组件包数据
   */
  unloadComponentStyles(t) {
    const n = this.parseComponentName(t);
    p[n] && (p[n].forEach((o) => {
      document.head.contains(o) && document.head.removeChild(o);
    }), delete p[n]);
  }
  /**
   * TODO -- 获取所有已加载的样式链接
   * @returns 组件包数据
   */
  getLoadedStyleLinks() {
    return p;
  }
}
const x = new Qe(), Ye = { class: "m-tip" }, we = /* @__PURE__ */ Q({
  __name: "asyncLoading",
  setup(e) {
    const t = ke();
    return console.log("loading instance", t), Le({}), (n, o) => ($(), A("div", Ye, " Loading... "));
  }
}), et = {
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
class to {
  static typeof(t) {
    let n = Object.prototype.toString.call(t);
    return et[n] || "unknow";
  }
  static isArray(t) {
    return Object.prototype.toString.call(t) === "[object Array]";
  }
  static isEmpty(t) {
    return t == null ? !0 : typeof t == "string" ? t.trim() === "" : Array.isArray(t) ? t.length === 0 : typeof t == "object" ? Object.keys(t).length === 0 : !1;
  }
  /**
   * 复制对象|数组
   * @param {Array|Object} obj 
   * @returns {Array|Object} 复制的
   */
  static copyObj(t) {
    return JSON.parse(JSON.stringify(t));
  }
}
function no(e) {
  return typeof e != "string" ? !1 : e.match(/^[a-zA-Z0-9-]+@[a-zA-Z0-9-_]+$/);
}
function oo(e) {
  console.log("%c设置组件包", "color:green;", e), x.addLocalPackage(e.packageConfig, e);
}
function ro(e) {
  console.debug("%c注册组件包", "color:green;", e), x.registerPackage(e);
}
function so(e = 500) {
  return de({
    loader: () => new Promise(async (t, n) => {
      try {
        setTimeout(() => {
          t(function() {
            return "";
          });
        }, e);
      } catch (o) {
        n(o);
      }
    })
  });
}
function ao(e) {
  return x.getComponentOption(e);
}
function tt(e, t = {}) {
  e = x.parseComponentName(e);
  const n = Object.assign({
    // 定义组件加载失败时显示的组件
    errorComponent: function(o) {
      return `组件加载失败:${e}`;
    },
    // 定义组件加载时显示的加载组件
    loadingComponent: we
  }, t);
  return de({
    // 异步加载组件的函数
    loader: () => new Promise(async (o, r) => {
      try {
        console.debug("-- 加载组件:", e);
        let s = await x.component(e);
        if (!s) {
          r(new Error("组件不存在:" + e));
          return;
        }
        o(s);
      } catch (s) {
        r(s);
      }
    }),
    // 展开合并后的配置项
    ...n
  });
}
const nt = {
  key: 1,
  class: "m-component-error"
}, ot = { class: "error-msg" }, rt = {
  name: "lp-component",
  // 设置 inheritAttrs 为 false 以禁用默认的属性继承行为
  inheritAttrs: !1
}, R = /* @__PURE__ */ Q({
  ...rt,
  props: {
    is: {
      type: String,
      default: ""
    }
  },
  setup(e) {
    const t = e, n = V(!1), o = V("");
    let r = null;
    const s = tt(t.is, {
      // //loading 延迟时间
      // delay: 200,
      // // 超时时间
      // timeout: 3000,
      loadingComponent: we,
      errorComponent: function(i) {
        return "";
      },
      onError: (i, d, C, v) => {
        console.error("onError", v), r = d, n.value = !0, o.value = `组件加载失败: ${i.message}`, C();
      }
    });
    me(() => t.is, (i, d) => {
    });
    function l() {
      n.value = !1, o.value = "", r == null || r();
    }
    Me((i, d, C) => (console.log("onErrorCaptured", i, d, C), !1));
    const a = ge(), f = Ue();
    console.log("$slots", f), console.log("$attrs", a);
    const c = w(() => Object.keys(a).reduce((i, d) => (d.startsWith("on") || (i[d] = a[d]), i), {})), g = w(() => Object.keys(a).reduce((i, d) => {
      if (d.startsWith("on")) {
        const C = d.slice(2).replace(/^\w/, (v) => v.toLowerCase());
        i[C] = a[d];
      }
      return i;
    }, {}));
    return w(() => {
      const i = {};
      return "modelValue" in a && (i.modelValue = a.modelValue), i;
    }), w(() => {
      const i = {};
      return "onUpdate:modelValue" in a && (i["update:modelValue"] = a["onUpdate:modelValue"]), i;
    }), console.log("filteredAttrs", c.value), console.log("formattedListeners", g.value), (i, d) => ($(), A(Fe, null, [
      e.is ? ($(), ze(Be(W(s)), Ge({ key: 0 }, c.value, Ve(g.value)), We({ _: 2 }, [
        qe(W(f), (C, v) => ({
          name: v,
          fn: Re((Ae) => [
            De(i.$slots, v, He(Je(Ae || {})))
          ])
        }))
      ]), 1040)) : ee("", !0),
      n.value ? ($(), A("div", nt, [
        q("div", ot, Ke(o.value), 1),
        q("button", {
          class: "btn btn-primary link",
          onClick: Ze(l, ["stop"])
        }, "重试")
      ])) : ee("", !0)
    ], 64));
  }
});
let st = {
  install: (e) => {
    e.component(R.name, R);
  }
};
const at = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpComponent: R,
  default: st
}, Symbol.toStringTag, { value: "Module" }));
var je = typeof global == "object" && global && global.Object === Object && global, ct = typeof self == "object" && self && self.Object === Object && self, y = je || ct || Function("return this")(), M = y.Symbol, Ce = Object.prototype, it = Ce.hasOwnProperty, lt = Ce.toString, T = M ? M.toStringTag : void 0;
function ut(e) {
  var t = it.call(e, T), n = e[T];
  try {
    e[T] = void 0;
    var o = !0;
  } catch {
  }
  var r = lt.call(e);
  return o && (t ? e[T] = n : delete e[T]), r;
}
var pt = Object.prototype, ft = pt.toString;
function dt(e) {
  return ft.call(e);
}
var mt = "[object Null]", gt = "[object Undefined]", te = M ? M.toStringTag : void 0;
function O(e) {
  return e == null ? e === void 0 ? gt : mt : te && te in Object(e) ? ut(e) : dt(e);
}
function F(e) {
  return e != null && typeof e == "object";
}
var ve = Array.isArray;
function _e(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var yt = "[object AsyncFunction]", bt = "[object Function]", ht = "[object GeneratorFunction]", wt = "[object Proxy]";
function $e(e) {
  if (!_e(e))
    return !1;
  var t = O(e);
  return t == bt || t == ht || t == yt || t == wt;
}
var B = y["__core-js_shared__"], ne = function() {
  var e = /[^.]+$/.exec(B && B.keys && B.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function jt(e) {
  return !!ne && ne in e;
}
var Ct = Function.prototype, vt = Ct.toString;
function j(e) {
  if (e != null) {
    try {
      return vt.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var _t = /[\\^$.*+?()[\]{}|]/g, $t = /^\[object .+?Constructor\]$/, St = Function.prototype, Ot = Object.prototype, Tt = St.toString, Pt = Ot.hasOwnProperty, Et = RegExp(
  "^" + Tt.call(Pt).replace(_t, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function At(e) {
  if (!_e(e) || jt(e))
    return !1;
  var t = $e(e) ? Et : $t;
  return t.test(j(e));
}
function xt(e, t) {
  return e == null ? void 0 : e[t];
}
function I(e, t) {
  var n = xt(e, t);
  return At(n) ? n : void 0;
}
var D = I(y, "WeakMap"), It = 9007199254740991;
function Se(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= It;
}
function kt(e) {
  return e != null && Se(e.length) && !$e(e);
}
var Lt = Object.prototype;
function Oe(e) {
  var t = e && e.constructor, n = typeof t == "function" && t.prototype || Lt;
  return e === n;
}
var Mt = "[object Arguments]";
function oe(e) {
  return F(e) && O(e) == Mt;
}
var Te = Object.prototype, Ut = Te.hasOwnProperty, Ft = Te.propertyIsEnumerable, zt = oe(/* @__PURE__ */ function() {
  return arguments;
}()) ? oe : function(e) {
  return F(e) && Ut.call(e, "callee") && !Ft.call(e, "callee");
};
function Bt() {
  return !1;
}
var Pe = typeof exports == "object" && exports && !exports.nodeType && exports, re = Pe && typeof module == "object" && module && !module.nodeType && module, Gt = re && re.exports === Pe, se = Gt ? y.Buffer : void 0, Vt = se ? se.isBuffer : void 0, Wt = Vt || Bt, qt = "[object Arguments]", Rt = "[object Array]", Dt = "[object Boolean]", Ht = "[object Date]", Jt = "[object Error]", Kt = "[object Function]", Zt = "[object Map]", Nt = "[object Number]", Xt = "[object Object]", Qt = "[object RegExp]", Yt = "[object Set]", en = "[object String]", tn = "[object WeakMap]", nn = "[object ArrayBuffer]", on = "[object DataView]", rn = "[object Float32Array]", sn = "[object Float64Array]", an = "[object Int8Array]", cn = "[object Int16Array]", ln = "[object Int32Array]", un = "[object Uint8Array]", pn = "[object Uint8ClampedArray]", fn = "[object Uint16Array]", dn = "[object Uint32Array]", u = {};
u[rn] = u[sn] = u[an] = u[cn] = u[ln] = u[un] = u[pn] = u[fn] = u[dn] = !0;
u[qt] = u[Rt] = u[nn] = u[Dt] = u[on] = u[Ht] = u[Jt] = u[Kt] = u[Zt] = u[Nt] = u[Xt] = u[Qt] = u[Yt] = u[en] = u[tn] = !1;
function mn(e) {
  return F(e) && Se(e.length) && !!u[O(e)];
}
function gn(e) {
  return function(t) {
    return e(t);
  };
}
var Ee = typeof exports == "object" && exports && !exports.nodeType && exports, E = Ee && typeof module == "object" && module && !module.nodeType && module, yn = E && E.exports === Ee, G = yn && je.process, ae = function() {
  try {
    var e = E && E.require && E.require("util").types;
    return e || G && G.binding && G.binding("util");
  } catch {
  }
}(), ce = ae && ae.isTypedArray, bn = ce ? gn(ce) : mn;
function hn(e, t) {
  return function(n) {
    return e(t(n));
  };
}
var wn = hn(Object.keys, Object), jn = Object.prototype, Cn = jn.hasOwnProperty;
function vn(e) {
  if (!Oe(e))
    return wn(e);
  var t = [];
  for (var n in Object(e))
    Cn.call(e, n) && n != "constructor" && t.push(n);
  return t;
}
var H = I(y, "Map"), J = I(y, "DataView"), K = I(y, "Promise"), Z = I(y, "Set"), ie = "[object Map]", _n = "[object Object]", le = "[object Promise]", ue = "[object Set]", pe = "[object WeakMap]", fe = "[object DataView]", $n = j(J), Sn = j(H), On = j(K), Tn = j(Z), Pn = j(D), h = O;
(J && h(new J(new ArrayBuffer(1))) != fe || H && h(new H()) != ie || K && h(K.resolve()) != le || Z && h(new Z()) != ue || D && h(new D()) != pe) && (h = function(e) {
  var t = O(e), n = t == _n ? e.constructor : void 0, o = n ? j(n) : "";
  if (o)
    switch (o) {
      case $n:
        return fe;
      case Sn:
        return ie;
      case On:
        return le;
      case Tn:
        return ue;
      case Pn:
        return pe;
    }
  return t;
});
var En = "[object String]";
function An(e) {
  return typeof e == "string" || !ve(e) && F(e) && O(e) == En;
}
var xn = "[object Map]", In = "[object Set]", kn = Object.prototype, Ln = kn.hasOwnProperty;
function Mn(e) {
  if (e == null)
    return !0;
  if (kt(e) && (ve(e) || typeof e == "string" || typeof e.splice == "function" || Wt(e) || bn(e) || zt(e)))
    return !e.length;
  var t = h(e);
  if (t == xn || t == In)
    return !e.size;
  if (Oe(e))
    return !vn(e).length;
  for (var n in e)
    if (Ln.call(e, n))
      return !1;
  return !0;
}
const _ = [];
function co(e) {
  if (_.find((n) => n.name === e.name)) {
    console.error("网关已存在");
    return;
  }
  _.push(e);
}
async function Un(e) {
  var s;
  console.log("## 获取图标包", e);
  let t = null;
  for (let l in _) {
    let a = _[l];
    if (a.packages && ((s = a.packages) != null && s.includes(e))) {
      t = a;
      break;
    }
  }
  let n = t || _[0];
  if (!n)
    throw console.log("没有网关", e, _), new Error("没有网关");
  let o = await Y.post(n.url, {
    name: e
  });
  if (o.data.code !== 200)
    throw new Error(o.data.msg);
  if (!o.data.data.row)
    throw new Error("图标包不存在");
  return o.data.data.row;
}
const P = {}, L = {};
async function Fn(e) {
  let t = zn(e), n = P[t.package];
  if (n || (L[t.package] && await he(() => !!P[t.package]), n = P[t.package]), !n)
    try {
      L[t.package] = 1, n = await Un(t.package), P[t.package] = n, delete L[t.package];
    } catch (o) {
      throw delete L[t.package], console.error("加载图标包失败", o), o;
    }
  if (Bn(n), !n.icons[t.icon])
    throw new Error("图标不存在");
  return n.icons[t.icon];
}
function io(e) {
  P[e.name] = e;
}
function zn(e) {
  if (!e.includes("@"))
    return {
      package: "default",
      icon: e
    };
  let [t, n] = e.split("@");
  return {
    package: t,
    icon: n
  };
}
const U = {};
function Bn(e) {
  if (U[e.name])
    return;
  const t = document.createElement("style"), n = e.name || "iconfont", o = (e.data.woff2.startsWith("//"), e.data.woff2), r = (e.data.woff.startsWith("//"), e.data.woff), s = (e.data.truetype.startsWith("//"), e.data.truetype);
  t.innerHTML = `
        @font-face {
            font-family: '${n}';
            src: url('${o}') format('woff2'),
                 url('${r}') format('woff'),
                 url('${s}') format('truetype');
        }
    `, document.head.appendChild(t), U[e.name] = t, console.log("已挂载字体:", e.name);
}
function lo(e) {
  const t = U[e.name];
  t && t.parentNode && (t.parentNode.removeChild(t), delete U[e.name], console.log("已卸载字体:", e.name));
}
const Gn = ["innerHTML"], Vn = {
  name: "lp-icon"
}, N = /* @__PURE__ */ Q({
  ...Vn,
  props: {
    is: { default: "loading" },
    size: { default: 12 },
    color: { default: "#000000" }
  },
  emits: ["click"],
  setup(e, { emit: t }) {
    const n = t, o = ge(), r = {}, s = V(""), l = e;
    me(() => l.is, async (c, g) => {
      if (c !== g) {
        if (r[c]) {
          s.value = "&#x" + r[c];
          return;
        }
        try {
          r[c] = await Fn(c), s.value = "&#x" + r[c];
        } catch (i) {
          console.error("加载图标失败", i);
        }
      }
    }, {
      // 初始化时加载图标
      immediate: !0
    });
    const a = w(() => {
      const { size: c, color: g } = l;
      let i = c;
      return An(c) && (i = parseInt(c, 10)), {
        fontSize: `${i}px`,
        color: g,
        display: "inline-flex",
        fontFamily: "'default'"
      };
    }), f = (c) => {
      n("click", c);
    };
    return (c, g) => ($(), A("i", {
      class: be(["lp-icon1", [W(o).class]]),
      style: ye(a.value),
      innerHTML: s.value,
      onClick: f
    }, null, 14, Gn));
  }
}), Wn = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, r] of t)
    n[o] = r;
  return n;
}, qn = ["fill"], Rn = ["xlink:href"], Dn = {
  name: "LpSvg"
}, Hn = /* @__PURE__ */ Object.assign(Dn, {
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
  setup(e) {
    const t = e, n = w(() => `#${t.icon}`), o = w(() => {
      const { size: r, color: s } = t;
      let l = `${r}`;
      return l = `${l.replace("px", "")}px`, {
        width: l,
        fill: s,
        height: l
      };
    });
    return (r, s) => ($(), A("svg", {
      class: be([r.$attrs.class]),
      style: ye(o.value),
      fill: e.color,
      "aria-hidden": "true"
    }, [
      q("use", { "xlink:href": n.value }, null, 8, Rn)
    ], 14, qn));
  }
}), X = /* @__PURE__ */ Wn(Hn, [["__scopeId", "data-v-4508aad0"]]);
let Jn = {
  install: (e) => {
    e.component(N.name, N), e.component(X.name, X);
  }
};
const Kn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpIcon: N,
  LpSvg: X,
  default: Jn
}, Symbol.toStringTag, { value: "Module" }));
function Zn(e) {
  const t = /* @__PURE__ */ Object.assign({ "./lp-component/index.ts": at, "./lp-icon/index.ts": Kn });
  console.debug("%cglobalComponents", "color:green", t), Object.keys(t).forEach((n) => {
    const o = t[n].default;
    Mn(o) || e.use(o);
  });
}
function uo(e) {
  e = e || {};
  const t = Y.create({
    baseURL: e.baseURL,
    timeout: e.timeout || 1e4,
    headers: {
      ...e.headers || {}
    }
  });
  return e.requestInterceptors && t.interceptors.request.use(e.requestInterceptors, (n) => (console.log("request", { err: n }), Promise.reject(n))), e.responseInterceptors && t.interceptors.response.use(e.responseInterceptors, (n) => (console.log("response err", { err: n }), Promise.reject(n))), e.baseInterceptors && !(e.requestInterceptors || e.responseInterceptors) && (t.interceptors.request.use((n) => (console.log("request", { config: n }), n)), t.interceptors.response.use((n) => (console.log("response", { response: n }), n.data))), t;
}
function Nn(e) {
  Zn(e);
}
const po = { install: Nn };
export {
  P as IconPackages,
  to as JsDataType,
  R as LpComponent,
  N as LpIcon,
  X as LpSvg,
  so as asyncComponentDelay,
  uo as createApi,
  po as default,
  S as gatewayOptions,
  ao as getComponentOption,
  Ne as getComponentPackage,
  Un as getIconPackage,
  _ as iconGatewayOptions,
  Nn as install,
  tt as loadComponent,
  Fn as loadIcon,
  Bn as mountIconfont,
  no as nameIsUseAsyncComponent,
  Zn as registerLooplanComponents,
  ro as registerPackage,
  oo as setComponentPackage,
  eo as setGateway,
  co as setIconGateway,
  io as setIconPackage,
  lo as unmountIconfont
};
