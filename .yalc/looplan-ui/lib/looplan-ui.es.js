var Ft = Object.defineProperty;
var en = (n, e, l) => e in n ? Ft(n, e, { enumerable: !0, configurable: !0, writable: !0, value: l }) : n[e] = l;
var Y = (n, e, l) => en(n, typeof e != "symbol" ? e + "" : e, l);
import { createElementBlock as m, openBlock as h, defineComponent as te, ref as A, computed as R, provide as ot, withModifiers as Ie, normalizeClass as W, renderSlot as Q, inject as re, onMounted as st, onUnmounted as Lt, watch as Le, createCommentVNode as M, createElementVNode as C, normalizeStyle as ie, createTextVNode as Vt, toDisplayString as F, createVNode as we, Transition as lt, withCtx as Be, nextTick as ve, resolveDirective as tn, withDirectives as Ce, Fragment as ae, renderList as Te, vModelText as ut, vShow as Pt, unref as me, useAttrs as zt, createBlock as Ve, reactive as ye, getCurrentInstance as nn, onBeforeUnmount as on, resolveDynamicComponent as sn, resolveComponent as ln, render as ct, mergeModels as dt, useModel as an } from "vue";
const Bt = (n, e) => {
  const l = n.__vccOpts || n;
  for (const [t, o] of e)
    l[t] = o;
  return l;
}, rn = {
  name: "lp-empty"
}, un = { class: "m-empty" };
function cn(n, e, l, t, o, s) {
  return h(), m("div", un, " 数据为空! ");
}
const pt = /* @__PURE__ */ Bt(rn, [["render", cn]]);
let dn = {
  install: (n) => {
    n.component(pt.name, pt);
  }
};
const pn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: dn
}, Symbol.toStringTag, { value: "Module" })), fn = {
  name: "LpForm"
}, De = /* @__PURE__ */ te({
  ...fn,
  props: {
    model: {},
    rules: {},
    inline: { type: Boolean, default: !1 },
    labelPosition: { default: "right" },
    labelWidth: {},
    labelSuffix: { default: "" },
    hideRequiredAsterisk: { type: Boolean, default: !1 },
    showMessage: { type: Boolean, default: !0 },
    inlineMessage: { type: Boolean, default: !1 },
    statusIcon: { type: Boolean, default: !1 },
    validateOnRuleChange: { type: Boolean, default: !0 },
    size: { default: "default" },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["validate"],
  setup(n, { expose: e, emit: l }) {
    const t = n, o = l, s = A([]), r = (L) => {
      s.value.push(L);
    }, $ = (L) => {
      const S = s.value.indexOf(L);
      S > -1 && s.value.splice(S, 1);
    }, c = async (L, S) => {
      const B = s.value.find((I) => I.prop === L);
      if (!B)
        return console.warn(`[LpForm] 找不到字段 ${L}`), !1;
      try {
        return await B.validate(), S == null || S(!0, ""), !0;
      } catch (I) {
        const p = I.message || "验证失败";
        return S == null || S(!1, p), !1;
      }
    }, f = async (L) => {
      const S = await Promise.allSettled(
        s.value.map((p) => p.validate())
      ), B = S.every((p) => p.status === "fulfilled"), I = S.filter((p) => p.status === "rejected").map((p) => p.reason.message).join("; ");
      return L == null || L(B, I), B;
    }, g = () => {
      s.value.forEach((L) => {
        L.resetField();
      });
    }, N = (L) => {
      const S = L ? Array.isArray(L) ? L : [L] : [];
      s.value.forEach((B) => {
        (!L || S.includes(B.prop)) && B.clearValidate();
      });
    }, G = async () => {
      await f();
    };
    return R(() => typeof t.labelWidth == "number" ? `${t.labelWidth}px` : t.labelWidth || "auto"), ot("lpForm", {
      props: t,
      addFormItem: r,
      removeFormItem: $,
      validateField: c,
      emit: o
    }), e({
      validate: f,
      validateField: c,
      resetFields: g,
      clearValidate: N
    }), (L, S) => (h(), m("form", {
      class: W(["lp-form", {
        "lp-form--inline": L.inline,
        "lp-form--disabled": L.disabled
      }]),
      onSubmit: Ie(G, ["prevent"])
    }, [
      Q(L.$slots, "default")
    ], 34));
  }
}), hn = ["for"], mn = {
  key: 0,
  class: "lp-form-item__label-suffix"
}, gn = { class: "lp-form-item__content" }, vn = {
  name: "LpFormItem"
}, We = /* @__PURE__ */ te({
  ...vn,
  props: {
    label: {},
    labelWidth: {},
    prop: {},
    required: { type: Boolean },
    rules: {},
    error: {},
    showMessage: { type: Boolean, default: !0 },
    inlineMessage: { type: Boolean, default: !1 },
    size: { default: "default" },
    for: {}
  },
  setup(n, { expose: e }) {
    const l = n, t = re("lpForm", null), o = A(""), s = A(""), r = A(!1), $ = R(() => {
      var i;
      return ((i = t == null ? void 0 : t.props) == null ? void 0 : i.labelPosition) || "right";
    }), c = R(() => {
      var i;
      return l.size || ((i = t == null ? void 0 : t.props) == null ? void 0 : i.size) || "default";
    }), f = R(() => l.required !== void 0 ? l.required : S().some((_) => _.required)), g = R(() => {
      var i;
      return ((i = t == null ? void 0 : t.props) == null ? void 0 : i.labelSuffix) || "";
    }), N = R(() => {
      var i;
      return o.value === "error" && l.showMessage && (((i = t == null ? void 0 : t.props) == null ? void 0 : i.showMessage) ?? !0);
    }), G = R(() => {
      var b;
      const i = {};
      if ($.value === "top")
        return i;
      const _ = l.labelWidth || ((b = t == null ? void 0 : t.props) == null ? void 0 : b.labelWidth);
      return _ && (i.width = typeof _ == "number" ? `${_}px` : _), i;
    }), L = R(() => l.for || `lp-form-item-${Math.random().toString(36).substr(2, 9)}`), S = () => {
      var V;
      const i = (V = t == null ? void 0 : t.props) == null ? void 0 : V.rules, _ = l.rules, b = [];
      if (i && l.prop) {
        const j = i[l.prop];
        j && b.push(...Array.isArray(j) ? j : [j]);
      }
      return _ && b.push(...Array.isArray(_) ? _ : [_]), b;
    }, B = () => {
      var _;
      const i = (_ = t == null ? void 0 : t.props) == null ? void 0 : _.model;
      if (!(!i || !l.prop))
        return i[l.prop];
    }, I = async (i) => {
      if (!l.prop)
        return Promise.resolve();
      const _ = S();
      if (!_.length)
        return Promise.resolve();
      const b = i ? _.filter((j) => !j.trigger || j.trigger === i) : _;
      if (!b.length)
        return Promise.resolve();
      o.value = "validating", r.value = !0;
      const V = B();
      return new Promise((j, u) => {
        let a = 0;
        const v = b.length, E = (P, ee) => {
          var J, y;
          if (P)
            a++;
          else {
            o.value = "error", s.value = ee || "验证失败", r.value = !1, (J = t == null ? void 0 : t.emit) == null || J.call(t, "validate", l.prop, !1, ee || ""), u(new Error(ee || "验证失败"));
            return;
          }
          a === v && (o.value = "success", s.value = "", r.value = !1, (y = t == null ? void 0 : t.emit) == null || y.call(t, "validate", l.prop, !0, ""), j());
        };
        b.forEach((P) => {
          p(P, V, E);
        });
      });
    }, p = (i, _, b) => {
      if (i.required && (_ == null || _ === "")) {
        b(!1, i.message || "该字段为必填项");
        return;
      }
      if ((_ == null || _ === "") && !i.required) {
        b(!0);
        return;
      }
      if (i.min !== void 0 || i.max !== void 0 || i.len !== void 0) {
        const V = String(_).length;
        if (i.len !== void 0 && V !== i.len) {
          b(!1, i.message || `长度必须为 ${i.len} 个字符`);
          return;
        }
        if (i.min !== void 0 && V < i.min) {
          b(!1, i.message || `长度不能少于 ${i.min} 个字符`);
          return;
        }
        if (i.max !== void 0 && V > i.max) {
          b(!1, i.message || `长度不能超过 ${i.max} 个字符`);
          return;
        }
      }
      if (i.pattern && !i.pattern.test(String(_))) {
        b(!1, i.message || "格式不正确");
        return;
      }
      if (i.validator) {
        i.validator(i, _, (V) => {
          b(!V, V == null ? void 0 : V.message);
        });
        return;
      }
      b(!0);
    }, w = () => {
      var _;
      o.value = "", s.value = "", r.value = !1;
      const i = (_ = t == null ? void 0 : t.props) == null ? void 0 : _.model;
      i && l.prop && (i[l.prop] = void 0);
    }, X = () => {
      o.value = "", s.value = "", r.value = !1;
    }, x = {
      prop: l.prop || "",
      validate: I,
      resetField: w,
      clearValidate: X
    };
    return st(() => {
      var i;
      l.prop && ((i = t == null ? void 0 : t.addFormItem) == null || i.call(t, x));
    }), Lt(() => {
      var i;
      l.prop && ((i = t == null ? void 0 : t.removeFormItem) == null || i.call(t, x));
    }), Le(() => l.error, (i) => {
      i ? (o.value = "error", s.value = i) : (o.value = "", s.value = "");
    }, { immediate: !0 }), e({
      validate: I,
      resetField: w,
      clearValidate: X
    }), (i, _) => (h(), m("div", {
      class: W(["lp-form-item", {
        "lp-form-item--error": o.value === "error",
        "lp-form-item--success": o.value === "success",
        "lp-form-item--validating": o.value === "validating",
        "lp-form-item--required": f.value,
        [`lp-form-item--${$.value}`]: $.value,
        [`lp-form-item--${c.value}`]: c.value
      }])
    }, [
      i.label || i.$slots.label ? (h(), m("label", {
        key: 0,
        class: "lp-form-item__label",
        style: ie(G.value),
        for: L.value
      }, [
        Q(i.$slots, "label", {}, () => [
          Vt(F(i.label), 1)
        ]),
        g.value ? (h(), m("span", mn, F(g.value), 1)) : M("", !0)
      ], 12, hn)) : M("", !0),
      C("div", gn, [
        Q(i.$slots, "default"),
        we(lt, { name: "lp-zoom-in-top" }, {
          default: Be(() => [
            N.value ? (h(), m("div", {
              key: 0,
              class: W(["lp-form-item__error", {
                "lp-form-item__error--inline": i.inlineMessage
              }])
            }, F(s.value), 3)) : M("", !0)
          ]),
          _: 1
        })
      ])
    ], 2));
  }
}), yn = {
  key: 0,
  class: "lp-input__prepend"
}, bn = { class: "lp-input__wrapper" }, _n = {
  key: 0,
  class: "lp-input__prefix"
}, wn = ["type", "value", "placeholder", "disabled", "readonly", "maxlength", "minlength", "autocomplete", "name", "form", "tabindex"], $n = {
  key: 1,
  class: "lp-input__suffix"
}, xn = {
  key: 1,
  class: "lp-input__append"
}, kn = {
  name: "LpInput"
}, Ne = /* @__PURE__ */ te({
  ...kn,
  props: {
    modelValue: {},
    type: { default: "text" },
    placeholder: {},
    disabled: { type: Boolean },
    readonly: { type: Boolean },
    clearable: { type: Boolean },
    showPassword: { type: Boolean },
    prefixIcon: {},
    suffixIcon: {},
    maxlength: {},
    minlength: {},
    autocomplete: {},
    name: {},
    form: {},
    tabindex: {},
    size: { default: "default" },
    validateEvent: { type: Boolean, default: !0 }
  },
  emits: ["update:modelValue", "input", "change", "focus", "blur", "clear", "keydown", "keyup"],
  setup(n, { expose: e, emit: l }) {
    const t = n, o = l, s = re("lpFormItem", null), r = A(), $ = A(!1);
    A(!1);
    const c = A(!1), f = A(!1), g = R(() => t.size || (s == null ? void 0 : s.size) || "default"), N = async () => {
      var a;
      await ve(), (a = r.value) == null || a.focus();
    }, G = () => {
      var a;
      (a = r.value) == null || a.blur();
    }, L = () => {
      var a;
      (a = r.value) == null || a.select();
    }, S = () => {
      var a;
      o("update:modelValue", ""), o("input", ""), o("change", ""), o("clear"), t.validateEvent && ((a = s == null ? void 0 : s.validate) == null || a.call(s, "change"));
    }, B = (a) => {
      var P;
      const v = a.target;
      let { value: E } = v;
      c.value || (o("update:modelValue", E), o("input", E), t.validateEvent && ((P = s == null ? void 0 : s.validate) == null || P.call(s, "input")));
    }, I = (a) => {
      var P;
      const v = a.target, { value: E } = v;
      o("change", E), t.validateEvent && ((P = s == null ? void 0 : s.validate) == null || P.call(s, "change"));
    }, p = (a) => {
      $.value = !0, o("focus", a);
    }, w = (a) => {
      var v;
      $.value = !1, o("blur", a), t.validateEvent && ((v = s == null ? void 0 : s.validate) == null || v.call(s, "blur"));
    }, X = () => {
      $.value || N();
    }, x = (a) => {
      a.stopPropagation(), S();
    }, i = () => {
      f.value = !f.value, N();
    }, _ = (a) => {
      o("keydown", a);
    }, b = (a) => {
      o("keyup", a);
    }, V = () => {
      c.value = !0;
    }, j = () => {
    }, u = (a) => {
      c.value = !1, B(a);
    };
    return e({
      focus: N,
      blur: G,
      select: L,
      clear: S,
      input: r
    }), (a, v) => (h(), m("div", {
      class: W(["lp-input", {
        "lp-input--disabled": a.disabled,
        "lp-input--readonly": a.readonly,
        "lp-input--clearable": a.clearable && !a.disabled && !a.readonly,
        "lp-input--prefix": a.$slots.prefix || a.prefixIcon,
        "lp-input--suffix": a.$slots.suffix || a.suffixIcon || a.clearable || a.showPassword,
        "lp-input--password": a.showPassword,
        [`lp-input--${g.value}`]: g.value
      }]),
      onClick: X
    }, [
      a.$slots.prepend ? (h(), m("div", yn, [
        Q(a.$slots, "prepend")
      ])) : M("", !0),
      C("div", bn, [
        a.$slots.prefix || a.prefixIcon ? (h(), m("span", _n, [
          Q(a.$slots, "prefix", {}, () => [
            a.prefixIcon ? (h(), m("i", {
              key: 0,
              class: W(a.prefixIcon)
            }, null, 2)) : M("", !0)
          ])
        ])) : M("", !0),
        C("input", {
          ref_key: "inputRef",
          ref: r,
          class: "lp-input__inner",
          type: f.value ? "text" : a.type,
          value: a.modelValue,
          placeholder: a.placeholder,
          disabled: a.disabled,
          readonly: a.readonly,
          maxlength: a.maxlength,
          minlength: a.minlength,
          autocomplete: a.autocomplete,
          name: a.name,
          form: a.form,
          tabindex: a.tabindex,
          onInput: B,
          onChange: I,
          onFocus: p,
          onBlur: w,
          onKeydown: _,
          onKeyup: b,
          onCompositionstart: V,
          onCompositionupdate: j,
          onCompositionend: u
        }, null, 40, wn),
        a.$slots.suffix || a.suffixIcon || a.clearable || a.showPassword ? (h(), m("span", $n, [
          Q(a.$slots, "suffix", {}, () => [
            a.clearable && !a.disabled && !a.readonly && a.modelValue ? (h(), m("i", {
              key: 0,
              class: "lp-input__clear lp-icon-circle-close",
              onClick: x
            })) : M("", !0),
            a.showPassword ? (h(), m("i", {
              key: 1,
              class: W(["lp-input__password", f.value ? "lp-icon-view" : "lp-icon-hide"]),
              onClick: i
            }, null, 2)) : M("", !0),
            a.suffixIcon ? (h(), m("i", {
              key: 2,
              class: W(a.suffixIcon)
            }, null, 2)) : M("", !0)
          ])
        ])) : M("", !0)
      ]),
      a.$slots.append ? (h(), m("div", xn, [
        Q(a.$slots, "append")
      ])) : M("", !0)
    ], 2));
  }
}), Cn = { class: "lp-input-number__input" }, En = ["value", "placeholder", "disabled", "readonly", "name", "autocomplete"], Tn = {
  key: 2,
  class: "lp-input-number__controls"
}, Sn = {
  name: "LpInputNumber"
}, He = /* @__PURE__ */ te({
  ...Sn,
  props: {
    modelValue: {},
    min: {},
    max: {},
    step: { default: 1 },
    stepStrictly: { type: Boolean },
    precision: {},
    size: { default: "default" },
    disabled: { type: Boolean },
    readonly: { type: Boolean },
    controls: { type: Boolean, default: !0 },
    controlsPosition: {},
    name: {},
    placeholder: {},
    autocomplete: { default: "off" },
    validateEvent: { type: Boolean, default: !0 }
  },
  emits: ["update:modelValue", "change", "input", "focus", "blur"],
  setup(n, { expose: e, emit: l }) {
    const t = n, o = l, s = re("lpFormItem", null), r = A(), $ = A(null), c = A(!1), f = A(null), g = R(() => t.size || (s == null ? void 0 : s.size) || "default"), N = R(() => {
      if (t.precision !== void 0)
        return t.precision;
      const y = B(t.step), T = B(t.modelValue);
      return Math.max(y, T);
    }), G = R(() => $.value !== null ? $.value : t.modelValue === void 0 || t.modelValue === null ? "" : typeof t.modelValue == "number" ? t.modelValue.toFixed(N.value) : String(t.modelValue)), L = R(() => t.disabled || t.max !== void 0 && t.modelValue !== void 0 && t.modelValue >= t.max), S = R(() => t.disabled || t.min !== void 0 && t.modelValue !== void 0 && t.modelValue <= t.min), B = (y) => {
      if (y === void 0) return 0;
      const T = y.toString(), O = T.indexOf(".");
      return O !== -1 ? T.length - O - 1 : 0;
    }, I = (y, T) => (T === void 0 && (T = N.value), parseFloat(Math.round(y * Math.pow(10, T)) / Math.pow(10, T) + "")), p = (y) => I(y, N.value), w = (y) => t.max !== void 0 && y > t.max ? t.max : t.min !== void 0 && y < t.min ? t.min : y, X = (y) => t.stepStrictly ? (B(t.step), Math.round(y / t.step) * t.step) : y, x = () => {
      var y;
      (y = r.value) == null || y.focus();
    }, i = () => {
      var y;
      (y = r.value) == null || y.blur();
    }, _ = () => {
      var y;
      (y = r.value) == null || y.select();
    }, b = () => {
      if (L.value) return;
      const y = t.modelValue || 0, T = w(p(y + t.step));
      j(T);
    }, V = () => {
      if (S.value) return;
      const y = t.modelValue || 0, T = w(p(y - t.step));
      j(T);
    }, j = (y) => {
      var O;
      const T = t.modelValue;
      y !== void 0 && (y = X(p(y)), y = w(y)), T !== y && ($.value = null, o("update:modelValue", y), o("change", y, T), t.validateEvent && ((O = s == null ? void 0 : s.validate) == null || O.call(s, "change")));
    }, u = (y) => {
      const O = y.target.value;
      if ($.value = O, O === "") {
        o("update:modelValue", void 0), o("input", void 0);
        return;
      }
      const d = Number(O);
      isNaN(d) || o("input", d);
    }, a = () => {
      const y = $.value;
      if (y === null || y === "") {
        j(void 0);
        return;
      }
      const T = Number(y);
      if (isNaN(T)) {
        $.value = null;
        return;
      }
      j(T);
    }, v = (y) => {
      c.value = !0, o("focus", y);
    }, E = (y) => {
      var T;
      c.value = !1, $.value = null, o("blur", y), t.validateEvent && ((T = s == null ? void 0 : s.validate) == null || T.call(s, "blur"));
    }, P = (y) => {
      switch (y.key) {
        case "ArrowUp":
          y.preventDefault(), b();
          break;
        case "ArrowDown":
          y.preventDefault(), V();
          break;
      }
    }, ee = (y, T) => {
      if (T.button !== 0) return;
      const O = y === "increase" ? b : V;
      O(), f.value = setTimeout(() => {
        const d = setInterval(O, 100), H = () => {
          clearInterval(d), document.removeEventListener("mouseup", H);
        };
        document.addEventListener("mouseup", H);
      }, 300);
    }, J = () => {
      f.value && (clearTimeout(f.value), f.value = null);
    };
    return Le(() => t.modelValue, (y) => {
      $.value = null;
    }, { immediate: !0 }), e({
      focus: x,
      blur: i,
      select: _,
      increase: b,
      decrease: V
    }), (y, T) => (h(), m("div", {
      class: W(["lp-input-number", {
        "lp-input-number--disabled": y.disabled,
        "lp-input-number--controls-right": y.controlsPosition === "right",
        [`lp-input-number--${g.value}`]: g.value
      }])
    }, [
      y.controlsPosition !== "right" ? (h(), m("span", {
        key: 0,
        class: W(["lp-input-number__decrease", {
          "lp-input-number__decrease--disabled": S.value
        }]),
        onMousedown: T[0] || (T[0] = (O) => ee("decrease", O)),
        onMouseup: J,
        onMouseleave: J
      }, T[4] || (T[4] = [
        C("i", { class: "lp-input-number__decrease-icon" }, "-", -1)
      ]), 34)) : M("", !0),
      C("div", Cn, [
        C("input", {
          ref_key: "inputRef",
          ref: r,
          class: "lp-input-number__inner",
          type: "text",
          value: G.value,
          placeholder: y.placeholder,
          disabled: y.disabled,
          readonly: y.readonly,
          name: y.name,
          autocomplete: y.autocomplete,
          onInput: u,
          onChange: a,
          onFocus: v,
          onBlur: E,
          onKeydown: P
        }, null, 40, En)
      ]),
      y.controlsPosition !== "right" ? (h(), m("span", {
        key: 1,
        class: W(["lp-input-number__increase", {
          "lp-input-number__increase--disabled": L.value
        }]),
        onMousedown: T[1] || (T[1] = (O) => ee("increase", O)),
        onMouseup: J,
        onMouseleave: J
      }, T[5] || (T[5] = [
        C("i", { class: "lp-input-number__increase-icon" }, "+", -1)
      ]), 34)) : M("", !0),
      y.controlsPosition === "right" ? (h(), m("div", Tn, [
        C("span", {
          class: W(["lp-input-number__increase", {
            "lp-input-number__increase--disabled": L.value
          }]),
          onMousedown: T[2] || (T[2] = (O) => ee("increase", O)),
          onMouseup: J,
          onMouseleave: J
        }, T[6] || (T[6] = [
          C("i", { class: "lp-input-number__increase-icon" }, "▲", -1)
        ]), 34),
        C("span", {
          class: W(["lp-input-number__decrease", {
            "lp-input-number__decrease--disabled": S.value
          }]),
          onMousedown: T[3] || (T[3] = (O) => ee("decrease", O)),
          onMouseup: J,
          onMouseleave: J
        }, T[7] || (T[7] = [
          C("i", { class: "lp-input-number__decrease-icon" }, "▼", -1)
        ]), 34)
      ])) : M("", !0)
    ], 2));
  }
}), jn = { class: "lp-select__selection" }, On = { class: "lp-select__tag-text" }, Ln = ["onClick"], Vn = ["placeholder", "disabled"], Pn = ["placeholder", "disabled", "readonly"], zn = { class: "lp-select__suffix" }, Bn = { class: "lp-select__dropdown-wrap" }, Mn = {
  key: 0,
  class: "lp-select__empty"
}, An = ["onClick", "onMouseenter"], Rn = {
  key: 0,
  class: "lp-select__option-check lp-icon-check"
}, In = {
  name: "LpSelect"
}, Ue = /* @__PURE__ */ te({
  ...In,
  props: {
    modelValue: { type: [String, Number, Boolean, Object, Array] },
    options: { default: () => [] },
    placeholder: { default: "请选择" },
    disabled: { type: Boolean },
    clearable: { type: Boolean },
    filterable: { type: Boolean },
    multiple: { type: Boolean },
    multipleLimit: {},
    size: { default: "default" },
    valueKey: { default: "value" },
    labelKey: { default: "label" },
    emptyText: { default: "无匹配数据" },
    noDataText: { default: "无数据" },
    validateEvent: { type: Boolean, default: !0 }
  },
  emits: ["update:modelValue", "change", "visible-change", "remove-tag", "clear", "focus", "blur"],
  setup(n, { expose: e, emit: l }) {
    const t = n, o = l, s = re("lpFormItem", null), r = A(), $ = A(!1), c = A(""), f = A(""), g = A(-1), N = A({}), G = R(() => t.size || (s == null ? void 0 : s.size) || "default"), L = R(() => t.multiple ? (Array.isArray(t.modelValue) ? t.modelValue : []).map((H) => t.options.find((se) => p(se) === H) || { [t.valueKey]: H, [t.labelKey]: String(H) }) : []), S = R(() => t.multiple ? Array.isArray(t.modelValue) && t.modelValue.length > 0 : t.modelValue !== void 0 && t.modelValue !== null && t.modelValue !== ""), B = R(() => !t.filterable || !c.value ? t.options : t.options.filter((d) => w(d).toLowerCase().includes(c.value.toLowerCase()))), I = R(() => t.filterable && c.value && !B.value.length || t.options.length ? t.emptyText : t.noDataText), p = (d) => d[t.valueKey] ?? d, w = (d) => d[t.labelKey] ?? String(d[t.valueKey] ?? d), X = (d) => String(p(d)), x = (d) => {
      const H = p(d);
      return t.multiple ? Array.isArray(t.modelValue) && t.modelValue.includes(H) : t.modelValue === H;
    }, i = (d) => d.disabled === !0, _ = () => {
      var d;
      (d = r.value) == null || d.focus();
    }, b = () => {
      var d;
      (d = r.value) == null || d.blur();
    }, V = () => {
      t.disabled || ($.value = !$.value);
    }, j = () => {
      t.disabled || ($.value = !0);
    }, u = () => {
      $.value = !1, c.value = "", g.value = -1;
    }, a = () => {
      t.disabled || (t.filterable ? (j(), ve(() => {
        _();
      })) : V());
    }, v = (d) => {
      var se;
      if (i(d)) return;
      const H = p(d);
      if (t.multiple) {
        const q = Array.isArray(t.modelValue) ? [...t.modelValue] : [], le = q.indexOf(H);
        if (le > -1)
          q.splice(le, 1);
        else {
          if (t.multipleLimit && q.length >= t.multipleLimit)
            return;
          q.push(H);
        }
        o("update:modelValue", q), o("change", q);
      } else
        o("update:modelValue", H), o("change", H), f.value = w(d), u();
      t.validateEvent && ((se = s == null ? void 0 : s.validate) == null || se.call(s, "change"));
    }, E = () => {
      var H;
      const d = t.multiple ? [] : "";
      o("update:modelValue", d), o("change", d), o("clear"), t.multiple || (f.value = ""), t.validateEvent && ((H = s == null ? void 0 : s.validate) == null || H.call(s, "change"));
    }, P = (d) => {
      var q;
      if (t.disabled) return;
      const H = Array.isArray(t.modelValue) ? [...t.modelValue] : [], se = H[d];
      H.splice(d, 1), o("update:modelValue", H), o("change", H), o("remove-tag", se), t.validateEvent && ((q = s == null ? void 0 : s.validate) == null || q.call(s, "change"));
    }, ee = () => {
      t.filterable && j();
    }, J = (d) => {
      o("focus", d);
    }, y = (d) => {
      var H;
      o("blur", d), t.validateEvent && ((H = s == null ? void 0 : s.validate) == null || H.call(s, "blur"));
    }, T = (d) => {
      if (!$.value) {
        (d.key === "Enter" || d.key === " ") && (d.preventDefault(), j());
        return;
      }
      switch (d.key) {
        case "Escape":
          d.preventDefault(), u();
          break;
        case "ArrowDown":
          d.preventDefault(), g.value = Math.min(g.value + 1, B.value.length - 1);
          break;
        case "ArrowUp":
          d.preventDefault(), g.value = Math.max(g.value - 1, 0);
          break;
        case "Enter":
          d.preventDefault(), g.value >= 0 && g.value < B.value.length && v(B.value[g.value]);
          break;
      }
    }, O = () => {
      u();
    };
    return Le(() => t.modelValue, () => {
      if (!t.multiple && t.modelValue) {
        const d = t.options.find((H) => p(H) === t.modelValue);
        d && (f.value = w(d));
      }
    }, { immediate: !0 }), Le($, (d) => {
      o("visible-change", d), d && (g.value = -1);
    }), e({
      focus: _,
      blur: b,
      toggleDropdown: V,
      showDropdown: j,
      hideDropdown: u
    }), (d, H) => {
      const se = tn("click-outside");
      return Ce((h(), m("div", {
        class: W(["lp-select", {
          "lp-select--disabled": d.disabled,
          "lp-select--multiple": d.multiple,
          "lp-select--clearable": d.clearable,
          "lp-select--filterable": d.filterable,
          [`lp-select--${G.value}`]: G.value
        }])
      }, [
        C("div", {
          class: W(["lp-select__wrapper", {
            "lp-select__wrapper--focus": $.value,
            "lp-select__wrapper--disabled": d.disabled
          }]),
          onClick: a
        }, [
          C("div", jn, [
            d.multiple ? (h(), m(ae, { key: 0 }, [
              (h(!0), m(ae, null, Te(L.value, (q, le) => (h(), m("div", {
                key: X(q),
                class: "lp-select__tag"
              }, [
                C("span", On, F(w(q)), 1),
                d.disabled ? M("", !0) : (h(), m("i", {
                  key: 0,
                  class: "lp-select__tag-close lp-icon-close",
                  onClick: Ie((k) => P(le), ["stop"])
                }, null, 8, Ln))
              ]))), 128)),
              d.filterable ? Ce((h(), m("input", {
                key: 0,
                ref_key: "inputRef",
                ref: r,
                class: "lp-select__input",
                "onUpdate:modelValue": H[0] || (H[0] = (q) => c.value = q),
                placeholder: L.value.length ? "" : d.placeholder,
                disabled: d.disabled,
                onInput: ee,
                onFocus: J,
                onBlur: y,
                onKeydown: T
              }, null, 40, Vn)), [
                [ut, c.value]
              ]) : M("", !0)
            ], 64)) : (h(), m(ae, { key: 1 }, [
              d.filterable ? Ce((h(), m("input", {
                key: 0,
                ref_key: "inputRef",
                ref: r,
                class: "lp-select__input",
                "onUpdate:modelValue": H[1] || (H[1] = (q) => f.value = q),
                placeholder: d.placeholder,
                disabled: d.disabled,
                readonly: !d.filterable,
                onInput: ee,
                onFocus: J,
                onBlur: y,
                onKeydown: T
              }, null, 40, Pn)), [
                [ut, f.value]
              ]) : (h(), m("span", {
                key: 1,
                class: W(["lp-select__selected-text", { "lp-select__placeholder": !S.value }])
              }, F(S.value ? f.value : d.placeholder), 3))
            ], 64))
          ]),
          C("div", zn, [
            d.clearable && S.value && !d.disabled ? (h(), m("i", {
              key: 0,
              class: "lp-select__clear lp-icon-circle-close",
              onClick: Ie(E, ["stop"])
            })) : M("", !0),
            C("i", {
              class: W(["lp-select__arrow lp-icon-arrow-down", { "lp-select__arrow--reverse": $.value }])
            }, null, 2)
          ])
        ], 2),
        we(lt, { name: "lp-zoom-in-top" }, {
          default: Be(() => [
            Ce(C("div", {
              class: "lp-select__dropdown",
              style: ie(N.value)
            }, [
              C("div", Bn, [
                B.value.length ? M("", !0) : (h(), m("div", Mn, F(I.value), 1)),
                (h(!0), m(ae, null, Te(B.value, (q) => (h(), m("div", {
                  key: X(q),
                  class: W(["lp-select__option", {
                    "lp-select__option--selected": x(q),
                    "lp-select__option--disabled": i(q),
                    "lp-select__option--hover": g.value === B.value.indexOf(q)
                  }]),
                  onClick: (le) => v(q),
                  onMouseenter: (le) => g.value = B.value.indexOf(q)
                }, [
                  C("span", null, F(w(q)), 1),
                  x(q) ? (h(), m("i", Rn)) : M("", !0)
                ], 42, An))), 128))
              ])
            ], 4), [
              [Pt, $.value]
            ])
          ]),
          _: 1
        })
      ], 2)), [
        [se, O]
      ]);
    };
  }
}), Dn = { class: "lp-radio__input" }, Wn = ["value", "name", "disabled", "checked"], Nn = {
  name: "LpRadio"
}, qe = /* @__PURE__ */ te({
  ...Nn,
  props: {
    modelValue: { type: [String, Number, Boolean] },
    label: { type: [String, Number, Boolean] },
    disabled: { type: Boolean },
    name: {},
    size: { default: "default" },
    validateEvent: { type: Boolean, default: !0 }
  },
  emits: ["update:modelValue", "change"],
  setup(n, { expose: e, emit: l }) {
    const t = n, o = l, s = re("lpRadioGroup", null), r = re("lpFormItem", null), $ = A(), c = A(!1), f = R(() => t.size || (s == null ? void 0 : s.size) || (r == null ? void 0 : r.size) || "default"), g = R(() => t.disabled || (s == null ? void 0 : s.disabled) || !1), N = R(() => t.name || (s == null ? void 0 : s.name)), G = R(() => (s ? s.modelValue : t.modelValue) === t.label), L = () => {
      g.value || ve(() => {
        var p;
        (p = $.value) == null || p.click();
      });
    }, S = () => {
      var w;
      if (g.value) return;
      const p = t.label;
      s ? s.changeEvent(p) : (o("update:modelValue", p), o("change", p)), t.validateEvent && ((w = r == null ? void 0 : r.validate) == null || w.call(r, "change"));
    }, B = () => {
      c.value = !0;
    }, I = () => {
      var p;
      c.value = !1, t.validateEvent && ((p = r == null ? void 0 : r.validate) == null || p.call(r, "blur"));
    };
    return e({
      focus: () => {
        var p;
        return (p = $.value) == null ? void 0 : p.focus();
      },
      blur: () => {
        var p;
        return (p = $.value) == null ? void 0 : p.blur();
      }
    }), (p, w) => {
      var X;
      return h(), m("label", {
        class: W(["lp-radio", {
          "lp-radio--disabled": g.value,
          "lp-radio--checked": G.value,
          "lp-radio--focus": c.value,
          [`lp-radio--${f.value}`]: f.value
        }]),
        onClick: L
      }, [
        C("span", Dn, [
          C("span", {
            class: W(["lp-radio__inner", {
              "lp-radio__inner--checked": G.value,
              "lp-radio__inner--disabled": g.value
            }])
          }, null, 2),
          C("input", {
            ref_key: "radioRef",
            ref: $,
            class: "lp-radio__original",
            type: "radio",
            value: p.label,
            name: N.value || ((X = me(s)) == null ? void 0 : X.name),
            disabled: g.value,
            checked: G.value,
            onFocus: B,
            onBlur: I,
            onChange: S
          }, null, 40, Wn)
        ]),
        p.$slots.default || p.label ? (h(), m("span", {
          key: 0,
          class: W(["lp-radio__label", {
            "lp-radio__label--disabled": g.value
          }])
        }, [
          Q(p.$slots, "default", {}, () => [
            Vt(F(p.label), 1)
          ])
        ], 2)) : M("", !0)
      ], 2);
    };
  }
}), Hn = {
  name: "LpRadioGroup"
}, Ke = /* @__PURE__ */ te({
  ...Hn,
  props: {
    modelValue: { type: [String, Number, Boolean] },
    disabled: { type: Boolean },
    size: { default: "default" },
    name: {},
    validateEvent: { type: Boolean, default: !0 }
  },
  emits: ["update:modelValue", "change"],
  setup(n, { expose: e, emit: l }) {
    const t = n, o = l, s = re("lpFormItem", null), r = R(() => t.size || (s == null ? void 0 : s.size) || "default"), $ = (f) => {
      var g;
      o("update:modelValue", f), o("change", f), t.validateEvent && ((g = s == null ? void 0 : s.validate) == null || g.call(s, "change"));
    }, c = (f) => {
      var I, p, w, X, x;
      const g = f.target, N = g.nodeName === "INPUT" ? "[type=radio]" : "[role=radio]", G = Array.from(((I = g.closest(".lp-radio-group")) == null ? void 0 : I.querySelectorAll(N)) || []), L = G.length, S = G.indexOf(g), B = G.filter((i) => !i.disabled);
      switch (f.key) {
        case "ArrowLeft":
        case "ArrowUp":
          f.stopPropagation(), f.preventDefault(), S === 0 ? (p = B[B.length - 1]) == null || p.focus() : (w = B[S - 1]) == null || w.focus();
          break;
        case "ArrowRight":
        case "ArrowDown":
          f.stopPropagation(), f.preventDefault(), S === L - 1 ? (X = B[0]) == null || X.focus() : (x = B[S + 1]) == null || x.focus();
          break;
      }
    };
    return ot("lpRadioGroup", {
      modelValue: R(() => t.modelValue),
      disabled: R(() => t.disabled),
      size: r,
      name: R(() => t.name),
      changeEvent: $
    }), e({
      name: t.name
    }), (f, g) => (h(), m("div", {
      class: W(["lp-radio-group", {
        "lp-radio-group--disabled": f.disabled,
        [`lp-radio-group--${r.value}`]: r.value
      }]),
      role: "radiogroup",
      onKeydown: c
    }, [
      Q(f.$slots, "default")
    ], 34));
  }
}), Un = ["checked", "disabled"], qn = { class: "lp-switch__core" }, Kn = {
  key: 0,
  class: "lp-switch__loading"
}, Gn = {
  key: 1,
  class: "lp-switch__inner"
}, Xn = { key: 0 }, Yn = { key: 1 }, Zn = { class: "lp-switch__action" }, Jn = {
  key: 0,
  class: "lp-switch__label lp-switch__label--left"
}, Qn = {
  key: 1,
  class: "lp-switch__label lp-switch__label--right"
}, Fn = {
  name: "LpSwitch"
}, Ge = /* @__PURE__ */ te({
  ...Fn,
  props: {
    modelValue: { type: [Boolean, String, Number] },
    disabled: { type: Boolean },
    loading: { type: Boolean },
    size: { default: "default" },
    width: {},
    inlinePrompt: { type: Boolean },
    activeIcon: {},
    inactiveIcon: {},
    activeText: {},
    inactiveText: {},
    activeValue: { type: [Boolean, String, Number], default: !0 },
    inactiveValue: { type: [Boolean, String, Number], default: !1 },
    activeColor: {},
    inactiveColor: {},
    borderColor: {},
    name: {},
    validateEvent: { type: Boolean, default: !0 },
    beforeChange: {}
  },
  emits: ["update:modelValue", "change", "focus", "blur"],
  setup(n, { expose: e, emit: l }) {
    const t = n, o = l, s = re("lpFormItem", null), r = A(), $ = A(!1), c = R(() => t.size || (s == null ? void 0 : s.size) || "default"), f = R(() => t.disabled || $.value), g = R(() => t.modelValue === t.activeValue);
    R(() => {
      const p = {};
      return t.width && (p.width = typeof t.width == "number" ? `${t.width}px` : t.width), t.activeColor && g.value ? (p.backgroundColor = t.activeColor, p.borderColor = t.activeColor) : t.inactiveColor && !g.value && (p.backgroundColor = t.inactiveColor, p.borderColor = t.inactiveColor), p;
    });
    const N = () => {
      var p;
      (p = r.value) == null || p.focus();
    }, G = () => {
      var p;
      (p = r.value) == null || p.blur();
    }, L = async () => {
      var w;
      if (f.value) return;
      if (t.beforeChange) {
        $.value = !0;
        try {
          if (!await t.beforeChange()) {
            $.value = !1;
            return;
          }
        } catch {
          $.value = !1;
          return;
        }
        $.value = !1;
      }
      const p = g.value ? t.inactiveValue : t.activeValue;
      o("update:modelValue", p), o("change", p), t.validateEvent && ((w = s == null ? void 0 : s.validate) == null || w.call(s, "change")), ve(() => {
        r.value.checked = g.value;
      });
    }, S = () => {
    }, B = (p) => {
      o("focus", p);
    }, I = (p) => {
      var w;
      o("blur", p), t.validateEvent && ((w = s == null ? void 0 : s.validate) == null || w.call(s, "blur"));
    };
    return e({
      focus: N,
      blur: G,
      checked: g
    }), (p, w) => (h(), m("div", {
      class: W(["lp-switch", {
        "lp-switch--checked": g.value,
        "lp-switch--disabled": f.value,
        "lp-switch--loading": p.loading,
        [`lp-switch--${c.value}`]: c.value
      }]),
      onClick: L
    }, [
      C("input", {
        ref_key: "inputRef",
        ref: r,
        class: "lp-switch__input",
        type: "checkbox",
        checked: g.value,
        disabled: f.value,
        onChange: S,
        onFocus: B,
        onBlur: I
      }, null, 40, Un),
      C("span", qn, [
        p.loading ? (h(), m("div", Kn, w[0] || (w[0] = [
          C("i", { class: "lp-switch__loading-icon" }, null, -1)
        ]))) : M("", !0),
        p.inlinePrompt && (p.activeText || p.inactiveText) ? (h(), m("span", Gn, [
          g.value ? (h(), m("span", Xn, F(p.activeText), 1)) : (h(), m("span", Yn, F(p.inactiveText), 1))
        ])) : M("", !0),
        C("div", Zn, [
          p.activeIcon && g.value ? (h(), m("i", {
            key: 0,
            class: W([p.activeIcon, "lp-switch__action-icon"])
          }, null, 2)) : p.inactiveIcon && !g.value ? (h(), m("i", {
            key: 1,
            class: W([p.inactiveIcon, "lp-switch__action-icon"])
          }, null, 2)) : M("", !0)
        ])
      ]),
      !p.inlinePrompt && p.activeText && g.value ? (h(), m("span", Jn, F(p.activeText), 1)) : M("", !0),
      !p.inlinePrompt && p.inactiveText && !g.value ? (h(), m("span", Qn, F(p.inactiveText), 1)) : M("", !0)
    ], 2));
  }
}), eo = { class: "lp-upload" }, to = ["name", "multiple", "accept", "disabled"], no = {
  key: 0,
  class: "lp-upload__default"
}, oo = { class: "lp-upload__text" }, so = {
  key: 0,
  class: "lp-upload__tip"
}, lo = { class: "lp-upload__file-info" }, io = { class: "lp-upload__file-name" }, ao = { class: "lp-upload__file-status" }, ro = {
  key: 0,
  class: "lp-upload__loading"
}, uo = {
  key: 1,
  class: "lp-upload__success"
}, co = {
  key: 2,
  class: "lp-upload__error"
}, po = {
  key: 0,
  class: "lp-upload__progress"
}, fo = { class: "lp-upload__file-actions" }, ho = ["onClick"], mo = ["onClick"], go = { class: "lp-upload__file-thumbnail" }, vo = ["src", "alt"], yo = {
  key: 1,
  class: "lp-upload__file-placeholder"
}, bo = { class: "lp-upload__file-info" }, _o = { class: "lp-upload__file-name" }, wo = { class: "lp-upload__file-actions" }, $o = ["onClick"], xo = ["onClick"], ko = {
  key: 0,
  class: "lp-upload__file-progress"
}, Co = {
  key: 1,
  class: "lp-upload__file-error"
}, Eo = {
  name: "LpUpload"
}, Xe = /* @__PURE__ */ te({
  ...Eo,
  props: {
    modelValue: {},
    action: {},
    headers: {},
    method: { default: "POST" },
    data: {},
    name: { default: "file" },
    withCredentials: { type: Boolean },
    multiple: { type: Boolean },
    accept: {},
    autoUpload: { type: Boolean, default: !0 },
    listType: { default: "text" },
    disabled: { type: Boolean },
    limit: {},
    drag: { type: Boolean },
    showFileList: { type: Boolean, default: !0 },
    fileList: { default: () => [] },
    beforeUpload: {},
    beforeRemove: {},
    onPreview: {},
    onRemove: {},
    onSuccess: {},
    onError: {},
    onProgress: {},
    onExceed: {},
    httpRequest: {}
  },
  emits: ["update:modelValue", "change"],
  setup(n, { expose: e, emit: l }) {
    const t = n, o = l;
    re("lpFormItem", null);
    const s = A(), r = A(!1), $ = A(1), c = R({
      get: () => t.modelValue || t.fileList,
      set: (u) => {
        o("update:modelValue", u);
      }
    }), f = () => Date.now() + "_" + $.value++, g = (u) => /^image\//.test(u.type), N = (u) => new Promise((a) => {
      if (!g(u)) {
        a("");
        return;
      }
      const v = new FileReader();
      v.onload = (E) => {
        var P;
        a(((P = E.target) == null ? void 0 : P.result) || "");
      }, v.readAsDataURL(u);
    }), G = (u) => {
      const a = new XMLHttpRequest(), v = new FormData();
      return v.append(u.filename, u.file), u.data && Object.keys(u.data).forEach((E) => {
        v.append(E, u.data[E]);
      }), u.headers && Object.keys(u.headers).forEach((E) => {
        a.setRequestHeader(E, u.headers[E]);
      }), u.withCredentials && (a.withCredentials = !0), a.upload.addEventListener("progress", (E) => {
        E.lengthComputable && u.onProgress(E);
      }), a.addEventListener("load", () => {
        a.status >= 200 && a.status < 300 ? u.onSuccess(a.response) : u.onError(new Error(`HTTP ${a.status}: ${a.statusText}`));
      }), a.addEventListener("error", () => {
        u.onError(new Error("Network Error"));
      }), a.open(u.method, u.action), a.send(v), a;
    }, L = () => {
      c.value = [];
    }, S = (u) => {
      console.log("Abort upload:", u);
    }, B = () => {
      c.value.filter((u) => u.status === "ready").forEach((u) => I(u));
    }, I = async (u) => {
      if (!u.raw) return;
      u.status = "uploading", u.percentage = 0;
      const a = {
        action: t.action,
        method: t.method,
        filename: t.name,
        file: u.raw,
        data: t.data,
        headers: t.headers,
        withCredentials: t.withCredentials,
        onProgress: (E) => {
          var P;
          u.percentage = Math.round(E.loaded / E.total * 100), (P = t.onProgress) == null || P.call(t, E, u, c.value);
        },
        onSuccess: (E) => {
          var P;
          u.status = "success", u.response = E, u.percentage = 100, (P = t.onSuccess) == null || P.call(t, E, u, c.value), o("change", u, c.value);
        },
        onError: (E) => {
          var P;
          u.status = "error", u.error = E, (P = t.onError) == null || P.call(t, E, u, c.value), o("change", u, c.value);
        }
      };
      (t.httpRequest || G)(a);
    }, p = async (u) => {
      var v;
      if (t.disabled) return;
      const a = Array.from(u);
      if (t.limit && c.value.length + a.length > t.limit) {
        (v = t.onExceed) == null || v.call(t, u, c.value);
        return;
      }
      for (const E of a) {
        if (t.beforeUpload)
          try {
            if (!await t.beforeUpload(E)) continue;
          } catch {
            continue;
          }
        const P = {
          uid: f(),
          name: E.name,
          size: E.size,
          type: E.type,
          status: "ready",
          percentage: 0,
          raw: E
        };
        g(E) && (P.preview = await N(E)), c.value = [...c.value, P], o("change", P, c.value), t.autoUpload && t.action && await I(P);
      }
    }, w = () => {
      var u;
      t.disabled || (u = s.value) == null || u.click();
    }, X = (u) => {
      const a = u.target, v = a.files;
      v && p(v), a.value = "";
    }, x = (u) => {
      var v;
      if (t.disabled || !t.drag) return;
      u.preventDefault(), r.value = !1;
      const a = (v = u.dataTransfer) == null ? void 0 : v.files;
      a && p(a);
    }, i = (u) => {
      t.disabled || !t.drag || (u.preventDefault(), r.value = !0);
    }, _ = (u) => {
      t.disabled || !t.drag || (u.preventDefault(), r.value = !1);
    }, b = async (u, a) => {
      var E;
      if (t.beforeRemove)
        try {
          if (!await t.beforeRemove(u, c.value)) return;
        } catch {
          return;
        }
      const v = [...c.value];
      v.splice(a, 1), c.value = v, (E = t.onRemove) == null || E.call(t, u, c.value), o("change", u, c.value);
    }, V = (u, a) => {
      t.action && I(u);
    }, j = (u) => {
      var a;
      (a = t.onPreview) == null || a.call(t, u);
    };
    return e({
      clearFiles: L,
      abort: S,
      submit: B,
      uploadFile: I
    }), (u, a) => (h(), m("div", eo, [
      C("div", {
        class: W(["lp-upload__trigger", {
          "lp-upload__trigger--drag": u.drag,
          "lp-upload__trigger--dragover": r.value,
          "lp-upload__trigger--disabled": u.disabled
        }]),
        onClick: w,
        onDrop: x,
        onDragover: i,
        onDragleave: _
      }, [
        C("input", {
          ref_key: "inputRef",
          ref: s,
          class: "lp-upload__input",
          type: "file",
          name: u.name,
          multiple: u.multiple,
          accept: u.accept,
          disabled: u.disabled,
          onChange: X
        }, null, 40, to),
        !u.$slots.trigger && !u.$slots.default ? (h(), m("div", no, [
          a[1] || (a[1] = C("i", { class: "lp-upload__icon" }, "📁", -1)),
          C("div", oo, [
            C("span", null, F(u.drag ? "将文件拖到此处，或" : ""), 1),
            a[0] || (a[0] = C("em", null, "点击上传", -1))
          ])
        ])) : M("", !0),
        Q(u.$slots, "trigger", {}, () => [
          Q(u.$slots, "default")
        ])
      ], 34),
      u.$slots.tip ? (h(), m("div", so, [
        Q(u.$slots, "tip")
      ])) : M("", !0),
      u.showFileList && c.value.length > 0 ? (h(), m("div", {
        key: 1,
        class: W(["lp-upload__file-list", `lp-upload__file-list--${u.listType}`])
      }, [
        (h(!0), m(ae, null, Te(c.value, (v, E) => (h(), m("div", {
          key: v.uid,
          class: W(["lp-upload__file", {
            "lp-upload__file--success": v.status === "success",
            "lp-upload__file--uploading": v.status === "uploading",
            "lp-upload__file--error": v.status === "error"
          }])
        }, [
          u.listType === "text" ? (h(), m(ae, { key: 0 }, [
            C("div", lo, [
              a[2] || (a[2] = C("i", { class: "lp-upload__file-icon" }, "📄", -1)),
              C("span", io, F(v.name), 1),
              C("span", ao, [
                v.status === "uploading" ? (h(), m("i", ro, "⏳")) : v.status === "success" ? (h(), m("i", uo, "✅")) : v.status === "error" ? (h(), m("i", co, "❌")) : M("", !0)
              ])
            ]),
            v.status === "uploading" ? (h(), m("div", po, [
              C("div", {
                class: "lp-upload__progress-bar",
                style: ie({ width: v.percentage + "%" })
              }, null, 4)
            ])) : M("", !0),
            C("div", fo, [
              v.status !== "uploading" ? (h(), m("button", {
                key: 0,
                class: "lp-upload__action",
                onClick: (P) => b(v, E)
              }, " 删除 ", 8, ho)) : M("", !0),
              v.status === "error" ? (h(), m("button", {
                key: 1,
                class: "lp-upload__action",
                onClick: (P) => V(v)
              }, " 重试 ", 8, mo)) : M("", !0)
            ])
          ], 64)) : u.listType === "picture" || u.listType === "picture-card" ? (h(), m(ae, { key: 1 }, [
            C("div", go, [
              v.url || v.preview ? (h(), m("img", {
                key: 0,
                src: v.url || v.preview,
                alt: v.name,
                class: "lp-upload__file-image"
              }, null, 8, vo)) : (h(), m("i", yo, "🖼️"))
            ]),
            C("div", bo, [
              C("span", _o, F(v.name), 1),
              C("div", wo, [
                v.url || v.preview ? (h(), m("button", {
                  key: 0,
                  class: "lp-upload__action",
                  onClick: (P) => j(v)
                }, " 预览 ", 8, $o)) : M("", !0),
                v.status !== "uploading" ? (h(), m("button", {
                  key: 1,
                  class: "lp-upload__action",
                  onClick: (P) => b(v, E)
                }, " 删除 ", 8, xo)) : M("", !0)
              ])
            ]),
            v.status === "uploading" ? (h(), m("div", ko, [
              C("div", {
                class: "lp-upload__progress-circle",
                style: ie({ "--progress": v.percentage + "%" })
              }, [
                C("span", null, F(v.percentage) + "%", 1)
              ], 4)
            ])) : M("", !0),
            v.status === "error" ? (h(), m("div", Co, a[3] || (a[3] = [
              C("i", { class: "lp-upload__error-icon" }, "❌", -1)
            ]))) : M("", !0)
          ], 64)) : M("", !0)
        ], 2))), 128))
      ], 2)) : M("", !0)
    ]));
  }
});
let To = {
  install: (n) => {
    n.component(De.name, De), n.component(We.name, We), n.component(Ne.name, Ne), n.component(He.name, He), n.component(Ue.name, Ue), n.component(qe.name, qe), n.component(Ke.name, Ke), n.component(Ge.name, Ge), n.component(Xe.name, Xe);
  }
};
const So = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpForm: De,
  LpFormItem: We,
  LpInput: Ne,
  LpInputNumber: He,
  LpRadio: qe,
  LpRadioGroup: Ke,
  LpSelect: Ue,
  LpSwitch: Ge,
  LpUpload: Xe,
  default: To
}, Symbol.toStringTag, { value: "Module" }));
var Mt = typeof global == "object" && global && global.Object === Object && global, jo = typeof self == "object" && self && self.Object === Object && self, fe = Mt || jo || Function("return this")(), Pe = fe.Symbol, At = Object.prototype, Oo = At.hasOwnProperty, Lo = At.toString, ke = Pe ? Pe.toStringTag : void 0;
function Vo(n) {
  var e = Oo.call(n, ke), l = n[ke];
  try {
    n[ke] = void 0;
    var t = !0;
  } catch {
  }
  var o = Lo.call(n);
  return t && (e ? n[ke] = l : delete n[ke]), o;
}
var Po = Object.prototype, zo = Po.toString;
function Bo(n) {
  return zo.call(n);
}
var Mo = "[object Null]", Ao = "[object Undefined]", ft = Pe ? Pe.toStringTag : void 0;
function $e(n) {
  return n == null ? n === void 0 ? Ao : Mo : ft && ft in Object(n) ? Vo(n) : Bo(n);
}
function Me(n) {
  return n != null && typeof n == "object";
}
var Rt = Array.isArray;
function It(n) {
  var e = typeof n;
  return n != null && (e == "object" || e == "function");
}
var Ro = "[object AsyncFunction]", Io = "[object Function]", Do = "[object GeneratorFunction]", Wo = "[object Proxy]";
function Dt(n) {
  if (!It(n))
    return !1;
  var e = $e(n);
  return e == Io || e == Do || e == Ro || e == Wo;
}
var Ae = fe["__core-js_shared__"], ht = function() {
  var n = /[^.]+$/.exec(Ae && Ae.keys && Ae.keys.IE_PROTO || "");
  return n ? "Symbol(src)_1." + n : "";
}();
function No(n) {
  return !!ht && ht in n;
}
var Ho = Function.prototype, Uo = Ho.toString;
function be(n) {
  if (n != null) {
    try {
      return Uo.call(n);
    } catch {
    }
    try {
      return n + "";
    } catch {
    }
  }
  return "";
}
var qo = /[\\^$.*+?()[\]{}|]/g, Ko = /^\[object .+?Constructor\]$/, Go = Function.prototype, Xo = Object.prototype, Yo = Go.toString, Zo = Xo.hasOwnProperty, Jo = RegExp(
  "^" + Yo.call(Zo).replace(qo, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Qo(n) {
  if (!It(n) || No(n))
    return !1;
  var e = Dt(n) ? Jo : Ko;
  return e.test(be(n));
}
function Fo(n, e) {
  return n == null ? void 0 : n[e];
}
function Se(n, e) {
  var l = Fo(n, e);
  return Qo(l) ? l : void 0;
}
var Ye = Se(fe, "WeakMap"), es = 9007199254740991;
function Wt(n) {
  return typeof n == "number" && n > -1 && n % 1 == 0 && n <= es;
}
function ts(n) {
  return n != null && Wt(n.length) && !Dt(n);
}
var ns = Object.prototype;
function Nt(n) {
  var e = n && n.constructor, l = typeof e == "function" && e.prototype || ns;
  return n === l;
}
var os = "[object Arguments]";
function mt(n) {
  return Me(n) && $e(n) == os;
}
var Ht = Object.prototype, ss = Ht.hasOwnProperty, ls = Ht.propertyIsEnumerable, is = mt(/* @__PURE__ */ function() {
  return arguments;
}()) ? mt : function(n) {
  return Me(n) && ss.call(n, "callee") && !ls.call(n, "callee");
};
function as() {
  return !1;
}
var Ut = typeof exports == "object" && exports && !exports.nodeType && exports, gt = Ut && typeof module == "object" && module && !module.nodeType && module, rs = gt && gt.exports === Ut, vt = rs ? fe.Buffer : void 0, us = vt ? vt.isBuffer : void 0, cs = us || as, ds = "[object Arguments]", ps = "[object Array]", fs = "[object Boolean]", hs = "[object Date]", ms = "[object Error]", gs = "[object Function]", vs = "[object Map]", ys = "[object Number]", bs = "[object Object]", _s = "[object RegExp]", ws = "[object Set]", $s = "[object String]", xs = "[object WeakMap]", ks = "[object ArrayBuffer]", Cs = "[object DataView]", Es = "[object Float32Array]", Ts = "[object Float64Array]", Ss = "[object Int8Array]", js = "[object Int16Array]", Os = "[object Int32Array]", Ls = "[object Uint8Array]", Vs = "[object Uint8ClampedArray]", Ps = "[object Uint16Array]", zs = "[object Uint32Array]", Z = {};
Z[Es] = Z[Ts] = Z[Ss] = Z[js] = Z[Os] = Z[Ls] = Z[Vs] = Z[Ps] = Z[zs] = !0;
Z[ds] = Z[ps] = Z[ks] = Z[fs] = Z[Cs] = Z[hs] = Z[ms] = Z[gs] = Z[vs] = Z[ys] = Z[bs] = Z[_s] = Z[ws] = Z[$s] = Z[xs] = !1;
function Bs(n) {
  return Me(n) && Wt(n.length) && !!Z[$e(n)];
}
function Ms(n) {
  return function(e) {
    return n(e);
  };
}
var qt = typeof exports == "object" && exports && !exports.nodeType && exports, Ee = qt && typeof module == "object" && module && !module.nodeType && module, As = Ee && Ee.exports === qt, Re = As && Mt.process, yt = function() {
  try {
    var n = Ee && Ee.require && Ee.require("util").types;
    return n || Re && Re.binding && Re.binding("util");
  } catch {
  }
}(), bt = yt && yt.isTypedArray, Rs = bt ? Ms(bt) : Bs;
function Is(n, e) {
  return function(l) {
    return n(e(l));
  };
}
var Ds = Is(Object.keys, Object), Ws = Object.prototype, Ns = Ws.hasOwnProperty;
function Hs(n) {
  if (!Nt(n))
    return Ds(n);
  var e = [];
  for (var l in Object(n))
    Ns.call(n, l) && l != "constructor" && e.push(l);
  return e;
}
var Ze = Se(fe, "Map"), Je = Se(fe, "DataView"), Qe = Se(fe, "Promise"), Fe = Se(fe, "Set"), _t = "[object Map]", Us = "[object Object]", wt = "[object Promise]", $t = "[object Set]", xt = "[object WeakMap]", kt = "[object DataView]", qs = be(Je), Ks = be(Ze), Gs = be(Qe), Xs = be(Fe), Ys = be(Ye), he = $e;
(Je && he(new Je(new ArrayBuffer(1))) != kt || Ze && he(new Ze()) != _t || Qe && he(Qe.resolve()) != wt || Fe && he(new Fe()) != $t || Ye && he(new Ye()) != xt) && (he = function(n) {
  var e = $e(n), l = e == Us ? n.constructor : void 0, t = l ? be(l) : "";
  if (t)
    switch (t) {
      case qs:
        return kt;
      case Ks:
        return _t;
      case Gs:
        return wt;
      case Xs:
        return $t;
      case Ys:
        return xt;
    }
  return e;
});
var Zs = "[object String]";
function Js(n) {
  return typeof n == "string" || !Rt(n) && Me(n) && $e(n) == Zs;
}
var Qs = "[object Map]", Fs = "[object Set]", el = Object.prototype, tl = el.hasOwnProperty;
function nl(n) {
  if (n == null)
    return !0;
  if (ts(n) && (Rt(n) || typeof n == "string" || typeof n.splice == "function" || cs(n) || Rs(n) || is(n)))
    return !n.length;
  var e = he(n);
  if (e == Qs || e == Fs)
    return !n.size;
  if (Nt(n))
    return !Hs(n).length;
  for (var l in n)
    if (tl.call(n, l))
      return !1;
  return !0;
}
const ol = ["innerHTML"], sl = {
  name: "lp-icon"
}, ll = /* @__PURE__ */ Object.assign(sl, {
  props: {
    icon: {
      type: String
    },
    color: {
      type: String
    },
    size: {
      type: [String, Number],
      default: 12
    },
    prefix: {
      type: String
    }
  },
  emits: ["click"],
  setup(n, { emit: e }) {
    const l = e, t = zt(), o = {
      success: "&#xe72e;",
      success_fill: "&#xe72d;",
      zoomin: "&#xe603;",
      zoomout: "&#xe602;",
      coin: "&#xe66d;",
      unmicrophone: "&#xe607;",
      microphone: "&#xe866;",
      star: "&#xe659;",
      loading: "&#xe891;",
      qrcode: "&#xe7dd;",
      printer: "&#xe7d8;",
      setting2: "&#xe78e;",
      copy: "&#xe744;",
      loading: "&#xe644;",
      loading2: "&#xe891;",
      hide: "&#xe83d;",
      view: "&#xe847;",
      stamping: "&#xe86a;",
      copy: "&#xe744;",
      share: "&#xe6f3;",
      search: "&#xe60e;",
      refresh: "&#xe650;",
      plan: "&#xe62c;",
      attrs: "&#xe643;",
      model: "&#xe6aa;",
      sort: "&#xe600;",
      remove: "&#xe66c;",
      add: "&#xe601;",
      edit: "&#xe61f;",
      setting: "&#xe66f;",
      file: "&#xe63e;",
      yiwancheng: "&#xe612;",
      folder: "&#xe60f;",
      category: "&#xe62f;",
      data: "&#xe61b;",
      address: "&#xe618;",
      radio: "&#xe71e;",
      tasksuccess: "&#xe612;",
      wuliuche: "&#xe635;"
    }, s = n, r = R(() => o[s.icon]), $ = R(() => {
      const { size: f, color: g } = s;
      let N = f;
      return Js(f) && (N = parseInt(f, 10)), {
        fontSize: `${N}px`,
        color: g,
        display: "inline-flex"
      };
    }), c = (f) => {
      l("click", f);
    };
    return (f, g) => (h(), m("i", {
      class: W(["lp-icon", [me(t).class]]),
      style: ie($.value),
      innerHTML: r.value,
      onClick: c
    }, null, 14, ol));
  }
}), il = ["fill"], al = ["xlink:href"], rl = {
  name: "LpSvg"
}, ul = /* @__PURE__ */ Object.assign(rl, {
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
  setup(n) {
    const e = n, l = R(() => `#${e.icon}`), t = R(() => {
      const { size: o, color: s } = e;
      let r = `${o}`;
      return r = `${r.replace("px", "")}px`, {
        width: r,
        fill: s,
        height: r
      };
    });
    return (o, s) => (h(), m("svg", {
      class: W([o.$attrs.class]),
      style: ie(t.value),
      fill: n.color,
      "aria-hidden": "true"
    }, [
      C("use", { "xlink:href": l.value }, null, 8, al)
    ], 14, il));
  }
}), et = /* @__PURE__ */ Bt(ul, [["__scopeId", "data-v-4508aad0"]]), cl = {
  name: "lp-icon"
}, Ct = /* @__PURE__ */ Object.assign(cl, {
  props: {
    type: {
      type: String,
      default: "lp"
    },
    icon: {
      type: String
    },
    color: {
      type: String
    },
    size: {
      type: [String, Number],
      default: 12
    },
    prefix: {
      type: String
    }
  },
  emits: ["click"],
  setup(n, { emit: e }) {
    const l = e, t = zt();
    function o(s) {
      l("click", s);
    }
    return (s, r) => (h(), m(ae, null, [
      n.type == "lp" ? (h(), Ve(ll, {
        key: 0,
        icon: n.icon,
        color: n.color,
        size: n.size,
        onClick: o,
        class: W([me(t).class])
      }, null, 8, ["icon", "color", "size", "class"])) : M("", !0),
      n.type == "svg" ? (h(), Ve(et, {
        key: 1,
        icon: n.icon,
        color: n.color,
        size: n.size,
        onClick: o,
        class: W([me(t).class])
      }, null, 8, ["icon", "color", "size", "class"])) : M("", !0)
    ], 64));
  }
});
let dl = {
  install: (n) => {
    n.component(Ct.name, Ct), n.component(et.name, et);
  }
};
const pl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: dl
}, Symbol.toStringTag, { value: "Module" })), fl = /* @__PURE__ */ te({
  __name: "base",
  props: {
    name: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["enter", "leave", "afterEnter"],
  setup(n, { emit: e }) {
    const l = e, t = (c) => {
      c instanceof HTMLElement && (c.getBoundingClientRect(), ve(() => {
        const f = c.offsetHeight, g = c.offsetWidth;
        l("enter", c, {
          height: f,
          width: g
        });
      }));
    }, o = (c) => {
      c instanceof HTMLElement && (c.style.overflowY = "", c.style.overflowX = ""), l("afterEnter", c);
    }, s = (c) => {
    }, r = (c) => {
      l("leave", c);
    }, $ = (c) => {
      l("leave", c);
    };
    return st(() => {
    }), (c, f) => (h(), Ve(lt, {
      name: n.name,
      onBeforeEnter: t,
      onAfterEnter: o,
      onBeforeLeave: s,
      onAfterLeave: r,
      onLeaveCancelled: $
    }, {
      default: Be(() => [
        Q(c.$slots, "default")
      ]),
      _: 3
    }, 8, ["name"]));
  }
});
function hl() {
  const n = A(null), e = A(null), l = A(null), t = A(null), o = A(8), s = ye({
    x: 0,
    y: 0,
    width: 0,
    height: 0
  }), r = ye({
    position: "absolute",
    width: "14px",
    height: "14px",
    backgroundColor: "#fff",
    transform: "rotate(45deg)"
  }), $ = A(!1);
  function c() {
    var _;
    if (!((_ = e.value) != null && _.arrow) || !t.value) return;
    const x = e.value.arrowSize || o.value, [, i = "center"] = (e.value.position || "bottom-center").split("-");
    switch (Object.assign(r, {
      position: "absolute",
      width: `${x}px`,
      height: `${x}px`,
      transform: "rotate(45deg)",
      top: "",
      left: "",
      right: "",
      bottom: "",
      marginTop: "",
      marginLeft: "",
      marginRight: "",
      marginBottom: ""
    }), t.value) {
      case "top":
        if (r.bottom = `-${x / 2}px`, i === "start") {
          const b = s.width / 2;
          r.left = `${b}px`, r.marginLeft = `-${x / 2}px`;
        } else if (i === "end") {
          const b = s.width / 2;
          r.right = `${b}px`, r.marginRight = `-${x / 2}px`;
        } else
          r.left = "50%", r.marginLeft = `-${x / 2}px`;
        break;
      case "right":
        if (r.left = `-${x / 2}px`, i === "start") {
          const b = s.height / 2;
          r.top = `${b}px`, r.marginTop = `-${x / 2}px`;
        } else if (i === "end") {
          const b = s.height / 2;
          r.bottom = `${b}px`, r.marginBottom = `-${x / 2}px`;
        } else
          r.top = "50%", r.marginTop = `-${x / 2}px`;
        break;
      case "bottom":
        if (r.top = `-${x / 2}px`, i === "start") {
          const b = s.width / 2;
          r.left = `${b}px`, r.marginLeft = `-${x / 2}px`;
        } else if (i === "end") {
          const b = s.width / 2;
          r.right = `${b}px`, r.marginRight = `-${x / 2}px`;
        } else
          r.left = "50%", r.marginLeft = `-${x / 2}px`;
        break;
      case "left":
        if (r.right = `-${x / 2}px`, i === "start") {
          const b = s.height / 2;
          r.top = `${b}px`, r.marginTop = `-${x / 2}px`;
        } else if (i === "end") {
          const b = s.height / 2;
          r.bottom = `${b}px`, r.marginBottom = `-${x / 2}px`;
        } else
          r.top = "50%", r.marginTop = `-${x / 2}px`;
        break;
    }
  }
  function f(x) {
    return x.getBoundingClientRect();
  }
  function g(x, i, _, b) {
    switch (b) {
      case "start":
        return x;
      case "end":
        return x + i - _;
      case "center":
      default:
        return x + (i - _) / 2;
    }
  }
  function N(x, i, _, b) {
    switch (b) {
      case "start":
        return x;
      case "end":
        return x + i - _;
      case "center":
      default:
        return x + (i - _) / 2;
    }
  }
  function G(x, i, _, b, V, j) {
    let u = 0;
    return x < 0 && (u += Math.abs(x)), x + _ > V && (u += x + _ - V), i < 0 && (u += Math.abs(i)), i + b > j && (u += i + b - j), u;
  }
  function L(x, i, _, b, V) {
    const j = x.map((u) => {
      const a = G(
        u.x,
        u.y,
        i,
        _,
        b,
        V
      );
      return { ...u, overflow: a };
    });
    return j.sort((u, a) => u.overflow - a.overflow), j[0];
  }
  function S(x, i, _, b, V, j, u) {
    if (!V || !e.value) {
      console.error("calculateFollowPosition - missing container or options:", {
        container: !!V,
        options: !!e.value
      });
      return;
    }
    s.x = x + _ / 2, s.y = i + b / 2, s.width = _, s.height = b;
    const a = V.getBoundingClientRect(), v = a.width, E = a.height;
    if (v === 0 || E === 0) {
      setTimeout(() => {
        S(x, i, _, b, V, j, u);
      }, 100);
      return;
    }
    const P = window.innerWidth, ee = window.innerHeight, [J, y = "center"] = e.value.position.split("-");
    let T = [];
    const O = e.value.arrowSize || o.value, d = e.value.arrow ? O : 0, H = {
      left: {
        x: x - v - d,
        y: N(i, b, E, y)
      },
      right: {
        x: x + _ + d,
        y: N(i, b, E, y)
      },
      top: {
        x: g(x, _, v, y),
        y: i - E - d
      },
      bottom: {
        x: g(x, _, v, y),
        y: i + b + d
      }
    }, se = H[J];
    se && T.push({ direction: J, ...se });
    const q = ["top", "right", "bottom", "left"];
    let le = q.indexOf(J);
    if (le !== -1)
      for (let K = 1; K < q.length; K++) {
        const D = q[(le + K) % q.length];
        T.push({
          direction: D,
          ...H[D]
        });
      }
    const k = L(T, v, E, P, ee);
    t.value = k.direction, c(), j.left = `${k.x}px`, j.top = `${k.y}px`, j.transform = "", j.right = "", j.bottom = "", u && u();
  }
  function B(x, i, _, b) {
    if (!e.value) return;
    const { clientX: V, clientY: j } = x;
    S(V, j, 0, 0, i, _, b);
  }
  function I(x, i, _) {
    if (!n.value) {
      console.error("updateFollowPosition - no follow target set");
      return;
    }
    if (typeof n.value != "string") {
      if (!e.value) {
        console.error("updateFollowPosition - missing follow options");
        return;
      }
      try {
        if (!(n.value instanceof HTMLElement)) {
          console.error("updateFollowPosition - target is not an HTMLElement:", n.value);
          return;
        }
        if (!document.body.contains(n.value)) {
          console.error("updateFollowPosition - target not in document");
          return;
        }
        const b = f(n.value), { x: V, y: j, width: u, height: a } = b;
        S(V, j, u, a, x, i, _);
      } catch (b) {
        console.error("updateFollowPosition - error calculating position:", b);
      }
    }
  }
  function p(x, i, _) {
    var a;
    l.value && cancelAnimationFrame(l.value);
    const V = 1e3 / (((a = e.value) == null ? void 0 : a.fps) || 60);
    let j = 0;
    const u = (v) => {
      l.value = requestAnimationFrame(u), !(v - j < V) && (j = v, I(x, i, _));
    };
    l.value = requestAnimationFrame(u);
  }
  function w(x, i, _, b) {
    var V;
    return x ? (n.value = x.target, e.value = x.options, $.value = ((V = e.value) == null ? void 0 : V.arrow) || !1, e.value.arrow && (o.value = e.value.arrowSize || 8, c()), typeof n.value == "string" && n.value === "mouse" ? window.addEventListener(
      "mousemove",
      (j) => B(j, i, _, b)
    ) : (I(i, _, b), e.value && e.value.fps ? p(i, _, b) : (window.addEventListener(
      "resize",
      () => I(i, _, b)
    ), window.addEventListener(
      "scroll",
      () => I(i, _, b),
      !0
    ))), !0) : !1;
  }
  function X() {
    window.removeEventListener("mousemove", B), window.removeEventListener("resize", I), window.removeEventListener("scroll", I, !0), l.value && (cancelAnimationFrame(l.value), l.value = null);
  }
  return {
    followTarget: n,
    followOptions: e,
    followAnimationFrame: l,
    arrowDirection: t,
    arrowSize: o,
    arrowStyle: r,
    targetCenter: s,
    showArrow: $,
    initFollow: w,
    updateFollowPosition: I,
    updateArrowStyle: c,
    cleanup: X
  };
}
function ml(n) {
  return new Promise((e, l) => {
    let t;
    const o = () => {
      const s = n();
      s !== void 0 ? (cancelAnimationFrame(t), e(s)) : t = requestAnimationFrame(o);
    };
    t = requestAnimationFrame(o);
  });
}
const gl = { class: "lp-layer-body" }, vl = {
  name: "lp-layer"
}, yl = /* @__PURE__ */ te({
  ...vl,
  props: {
    position: {
      type: Object,
      default: () => ({})
    },
    zIndex: {
      type: Number,
      default: 1e3
    },
    transition: {
      type: String,
      default: "fade"
      // 可选值: fade, zoom, slide-top, slide-bottom, slide-left, slide-right
    },
    /**
     * 层管理对象
     */
    layerObj: {
      type: Object,
      default: () => ({
        getTransitionComponent: () => null
      })
    },
    follow: {
      type: [Object, null],
      default: null
    },
    /**
     * 是否启用resize过渡
     * @todo 当宽高为自动时, 修改大小后,是否需要开启过渡效果
     */
    enableResizeTransition: {
      type: Boolean,
      default: !0
    }
  },
  emits: ["after-leave", "close"],
  setup(n, { expose: e, emit: l }) {
    const t = nn(), o = n, s = l, r = A(!1), $ = A(null), c = A(null), f = A(!1), g = A(!1), { showArrow: N, arrowStyle: G, initFollow: L, updateFollowPosition: S, cleanup: B } = hl();
    o.follow && o.follow.target && (f.value = !0);
    const I = [], p = A(!1), w = ye({
      zIndex: o.zIndex,
      position: "fixed"
    });
    let X = null;
    o.layerObj.getTransitionComponent() ? X = o.layerObj.getTransitionComponent() : X = fl;
    const x = A("");
    let i = {
      enter: !1,
      width: 0,
      height: 0
    };
    const _ = A(!1);
    function b() {
      x.value = `lp-${o.transition}`;
    }
    b();
    function V(k) {
      i.enter = !0, i.width = k.offsetWidth, i.height = k.offsetHeight;
    }
    function j(k) {
      _.value = !0;
    }
    async function u(k) {
      return k.zIndex = "-100", k.opacity = "0", Object.assign(w, k), await ml(() => {
        if (i.enter)
          return !0;
      }), i;
    }
    const a = A(!1), v = 1;
    async function E() {
      var de;
      const { width: k, height: K, x: D, y: U, reverse: oe } = o.position || {}, z = {
        zIndex: o.zIndex,
        position: "fixed",
        transform: "",
        top: "",
        left: "",
        right: "",
        bottom: "",
        width: "",
        height: ""
      };
      k && (z.width = typeof k == "number" ? `${k}px` : k), K && (z.height = typeof K == "number" ? `${K}px` : K);
      let ne = [];
      oe ? (D === "center" || D === void 0 ? (z.left = "50%", ne.push("translateX(-50%)")) : D === "right" ? z.right = "0" : typeof D == "number" ? z.right = `${D}px` : D ? z.right = D : z.left = "0", U === "center" || U === void 0 ? (z.top = "50%", ne.push("translateY(-50%)")) : U === "top" ? z.top = "50px" : U === "bottom" ? z.bottom = "0" : typeof U == "number" ? z.bottom = `${U}px` : U ? z.bottom = U : z.top = "0") : (D === "center" || D === void 0 ? (z.left = "50%", ne.push("translateX(-50%)")) : D === "right" ? z.right = "0" : typeof D == "number" ? z.left = `${D}px` : D ? z.left = D : z.left = "0", U === "center" || U === void 0 ? (z.top = "50%", ne.push("translateY(-50%)")) : U === "top" ? z.top = "50px" : U === "bottom" ? z.bottom = "50px" : typeof U == "number" ? z.top = `${U}px` : U ? z.top = U : z.top = "0"), ne.length > 0 && (z.transform = ne.join(" ")), (de = o.layerObj.options) != null && de.group ? (await u(z), ve(() => {
        var ue;
        (ue = o.layerObj.options) != null && ue.group && o.layerObj.options.group.computePosition(z, o.layerObj);
      })) : (k === "auto" || !k || K == "auto" || !K || D == "center" || !D || U == "center" || !U) && (await u(z), J(z)), z.opacity = "1", z.zIndex = o.zIndex, Object.assign(w, z);
    }
    const P = A(null);
    async function ee() {
      r.value = !0, w.opacity = "0", o.follow && o.follow.target ? L(
        o.follow,
        c.value,
        w,
        () => {
          g.value || (g.value = !0, w.opacity = "1", setTimeout(() => {
            f.value = !1;
          }, 50));
        }
      ) : (await E(), g.value = !0, w.opacity = "1");
    }
    function J(k, K = !1) {
      var xe, ce;
      const D = (xe = k.transform) == null ? void 0 : xe.includes("translateX(-50%)"), U = (ce = k.transform) == null ? void 0 : ce.includes("translateY(-50%)");
      if (!K && !D && !U || !i.width || !i.height) return;
      const oe = i.width, z = i.height, ne = window.innerWidth, de = window.innerHeight;
      let ue = [];
      k.transform && k.transform.split(" ").forEach((je) => {
        je.includes("translate") || ue.push(je);
      }), (D || K) && (Math.abs(oe - ne) <= 1 || oe >= ne ? k.left = "0" : k.left = `calc(50% - ${Math.floor(oe / 2)}px)`), (U || K) && (Math.abs(z - de) <= 1 || z >= de ? k.top = "0" : k.top = `calc(50% - ${Math.floor(z / 2)}px)`), ue.length > 0 ? k.transform = ue.join(" ") : k.transform = "", H();
    }
    const y = (k = "layer") => {
      r.value = !1, p.value = !0, o.follow && o.follow.target && B(), s("close"), I.forEach(({ event: K, callback: D }) => {
        K === "close" && D && D();
      });
    };
    function T() {
      p.value = !1, s("after-leave");
    }
    o.layerObj.setLayerInstance(t), st(() => {
      w.zIndex = o.zIndex, ee();
    });
    let O = null, d = null;
    A(!1);
    function H() {
      if (O) return;
      const { width: k, height: K } = o.position || {};
      O = new ResizeObserver(async (D) => {
        if (a.value) {
          console.log("正在resize中，忽略ResizeObserver回调");
          return;
        }
        console.log("layer-resize", D);
        for (const U of D) {
          const oe = U.contentRect.width, z = U.contentRect.height, ne = i.width, de = i.height, ue = Math.abs(oe - ne), xe = Math.abs(z - de);
          if (ue > v || xe > v) {
            if (console.log("尺寸变化超过容差", { widthDiff: ue, heightDiff: xe, resizeTolerance: v }), i.width = oe, i.height = z, o.follow && o.follow.target)
              S(c.value, w);
            else if (g.value) {
              const ce = { ...w }, je = o.enableResizeTransition && ne > 0 && de > 0, { width: hi, height: mi } = o.position || {};
              je ? (a.value = !0, O && d && (console.log("暂停尺寸检测，开始过渡"), O.unobserve(d)), ce.transition = "left 0.3s, top 0.3s, width 0.3s, height 0.3s", Object.assign(w, ce), J(ce, !0), requestAnimationFrame(() => {
                Object.assign(w, ce);
              }), setTimeout(() => {
                if (w.transition = "", O && d) {
                  console.log("过渡结束，恢复尺寸检测"), O.observe(d);
                  const _e = d.getBoundingClientRect(), it = Math.abs(_e.width - i.width), at = Math.abs(_e.height - i.height);
                  if (it > v || at > v) {
                    console.log("过渡后检测尺寸变化", {
                      oldWidth: i.width,
                      oldHeight: i.height,
                      newWidth: _e.width,
                      newHeight: _e.height,
                      widthDiff: it,
                      heightDiff: at
                    }), i.width = _e.width, i.height = _e.height;
                    const rt = { ...w };
                    J(rt, !0), Object.assign(w, rt);
                  }
                }
                setTimeout(() => {
                  a.value = !1;
                }, 50);
              }, 300)) : (J(ce, !0), Object.assign(w, ce));
            }
          }
        }
      }), ve(() => {
        const D = c.value;
        O && D && (d = D, O.observe(D));
      });
    }
    on(() => {
      o.follow && o.follow.target && B(), O && O.disconnect(), d = null;
    }), ot("lp-layer:core", {
      on: (k, K) => {
        I.push({
          event: k,
          callback: K
        });
      },
      off: (k, K) => {
        let D = I.findIndex((U) => U.event === k && U.callback === K);
        D !== -1 && I.splice(D, 1);
      }
    }), e({
      close: y,
      updatePosition: () => {
        o.follow ? S(c.value, w) : E();
      },
      changeContainerStyle: (k) => {
        Object.assign(w, k);
      },
      getContainerStyle: () => w,
      getInstance: () => t,
      // 全屏切换功能
      toggleFullscreen: () => {
        w.width === "100vw" && w.height === "100vh" ? le() : q();
      },
      // 进入全屏
      useFullscreen: () => {
        q();
      },
      // 退出全屏
      exitFullscreen: () => {
        le();
      },
      // 调整大小
      resizeLayer: (k) => {
        se(k);
      }
    });
    function se(k) {
      if (a.value) {
        console.log("已在进行resize操作，忽略此次调用");
        return;
      }
      a.value = !0;
      const K = parseInt(w.width) || i.width, D = parseInt(w.height) || i.height;
      O && d && (console.log("暂停尺寸检测，开始缩放"), O.unobserve(d));
      const U = { ...w };
      U.transition = "width 0.3s ease, height 0.3s ease, left 0.3s ease, top 0.3s ease, right 0.3s ease, bottom 0.3s ease, transform 0.3s ease", console.log("resizeLayer", k);
      let oe, z;
      typeof k == "number" ? (oe = Math.round(K * k), z = Math.round(D * k), U.width = `${oe}px`, U.height = `${z}px`) : (oe = k.width, z = k.height, U.width = `${oe}px`, U.height = `${z}px`), i.width, i.height, i.width = oe, i.height = z, J(U, !0), Object.assign(w, U), setTimeout(() => {
        if (w.transition = "", O && d) {
          console.log("缩放结束，恢复尺寸检测"), O.observe(d);
          const ne = d.getBoundingClientRect();
          i.width = ne.width, i.height = ne.height;
        }
        setTimeout(() => {
          a.value = !1;
        }, 50);
      }, 300);
    }
    function q() {
      if (a.value) {
        console.log("已在进行resize操作，忽略此次全屏调用");
        return;
      }
      a.value = !0, P.value || (P.value = {
        width: w.width,
        height: w.height,
        left: w.left,
        top: w.top,
        right: w.right,
        bottom: w.bottom,
        transform: w.transform
      }), O && d && (console.log("暂停尺寸检测，开始全屏"), O.unobserve(d));
      const k = { ...w };
      k.transition = "width 0.3s ease, height 0.3s ease, left 0.3s ease, top 0.3s ease, right 0.3s ease, bottom 0.3s ease, transform 0.3s ease", Object.assign(k, {
        width: "100vw",
        height: "100vh",
        left: "0",
        top: "0",
        right: "",
        bottom: "",
        transform: ""
      }), i.width, i.height, i.width = window.innerWidth, i.height = window.innerHeight, Object.assign(w, k), setTimeout(() => {
        if (w.transition = "", O && d) {
          console.log("全屏结束，恢复尺寸检测"), O.observe(d);
          const K = d.getBoundingClientRect();
          i.width = K.width, i.height = K.height;
        }
        setTimeout(() => {
          a.value = !1;
        }, 50);
      }, 300);
    }
    function le() {
      if (!P.value) return;
      if (a.value) {
        console.log("已在进行resize操作，忽略此次退出全屏调用");
        return;
      }
      a.value = !0, O && d && (console.log("暂停尺寸检测，退出全屏"), O.unobserve(d));
      const k = { ...w };
      k.transition = "width 0.3s ease, height 0.3s ease, left 0.3s ease, top 0.3s ease, right 0.3s ease, bottom 0.3s ease, transform 0.3s ease";
      const K = parseInt(P.value.width) || 0, D = parseInt(P.value.height) || 0;
      i.width = K || 300, i.height = D || 200, Object.assign(k, P.value), Object.assign(w, k), P.value = null, setTimeout(() => {
        if (w.transition = "", O && d) {
          console.log("退出全屏结束，恢复尺寸检测"), O.observe(d);
          const U = d.getBoundingClientRect();
          i.width = U.width, i.height = U.height;
        }
        setTimeout(() => {
          a.value = !1;
        }, 50);
      }, 300);
    }
    return (k, K) => (h(), m("div", {
      class: W(["lp-layer-container", { closeing: p.value }]),
      style: ie(w),
      ref_key: "containerRef",
      ref: c
    }, [
      (h(), Ve(sn(me(X)), {
        name: x.value,
        disabled: f.value,
        onEnter: V,
        onAfterEnter: j,
        onLeave: T
      }, {
        default: Be(() => [
          Ce(C("div", {
            class: "lp-layer",
            ref_key: "layerRef",
            ref: $
          }, [
            o.follow && me(N) ? (h(), m("div", {
              key: 0,
              class: "lp-layer-arrow",
              style: ie(me(G))
            }, null, 4)) : M("", !0),
            C("div", gl, [
              Q(k.$slots, "default")
            ])
          ], 512), [
            [Pt, r.value]
          ])
        ]),
        _: 3
      }, 40, ["name", "disabled"]))
    ], 6));
  }
}), bl = { class: "lp-dialog" }, _l = { class: "lp-dialog-header flex align-center justify-between" }, wl = { class: "lp-dialog-title" }, $l = { class: "lp-dialog-body" }, xl = {
  key: 0,
  class: "lp-dialog-footer"
}, Kt = {
  __name: "dialog",
  props: {
    title: {
      type: String,
      default: "title"
    },
    showClose: {
      type: Boolean,
      default: !0
    },
    showFooter: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["close", "confirm", "cancel"],
  setup(n, { emit: e }) {
    const l = e, t = () => {
      l("confirm"), o();
    }, o = () => {
      l("close");
    };
    return (s, r) => {
      const $ = ln("lp-icon");
      return h(), m("div", bl, [
        C("div", _l, [
          C("div", wl, F(n.title), 1),
          n.showClose ? (h(), m("div", {
            key: 0,
            class: "lp-dialog-close",
            onClick: o
          }, [
            we($, {
              class: "lp-dialog-close_icon",
              icon: "remove",
              size: "18px"
            })
          ])) : M("", !0)
        ]),
        C("div", $l, [
          Q(s.$slots, "default")
        ]),
        n.showFooter ? (h(), m("div", xl, [
          Q(s.$slots, "footer", {}, () => [
            C("button", {
              class: "btn btn-info",
              onClick: r[0] || (r[0] = (...c) => s.handleCancel && s.handleCancel(...c))
            }, "取消"),
            C("button", {
              class: "btn btn-primary",
              onClick: t
            }, "确定")
          ])
        ])) : M("", !0)
      ]);
    };
  }
}, kl = { class: "lp-drawer__header" }, Cl = { class: "lp-drawer__title" }, El = { class: "lp-drawer__body" }, Tl = {
  __name: "drawer",
  props: {
    title: {
      type: String,
      default: "抽屉"
    },
    showClose: {
      type: Boolean,
      default: !0
    },
    direction: {
      type: String,
      default: "right",
      // right, left, top, bottom
      validator: (n) => ["right", "left", "top", "bottom"].includes(n)
    }
  },
  emits: ["close"],
  setup(n, { emit: e }) {
    const l = n, t = e, o = R(() => `lp-drawer--${l.direction}`), s = () => {
      t("close");
    };
    return (r, $) => (h(), m("div", {
      class: W(["lp-drawer", [o.value]])
    }, [
      C("div", kl, [
        C("span", Cl, F(n.title), 1),
        n.showClose ? (h(), m("button", {
          key: 0,
          class: "lp-drawer__close",
          onClick: s
        }, "×")) : M("", !0)
      ]),
      C("div", El, [
        Q(r.$slots, "default")
      ])
    ], 2));
  }
}, Gt = {
  appContext: null
}, Sl = /* @__PURE__ */ te({
  __name: "mask",
  props: {
    zIndex: {
      type: Number,
      default: 999
    },
    // 是否显示
    visible: {
      type: Boolean,
      default: !0
    }
  },
  emits: ["click", "mounted"],
  setup(n, { expose: e, emit: l }) {
    const t = A(!1), o = l, s = re("lp-layer:core");
    function r() {
      t.value = !0;
    }
    s.on("close", r);
    function $(f) {
      o("click", f);
    }
    function c(f) {
      console.log("setEventsNone", f), t.value = f;
    }
    return e({
      setEventsNone: c
    }), Lt(() => {
      s.off("close", r);
    }), (f, g) => (h(), m("div", {
      class: W(["lp-mask", { "pointer-events-none": t.value }]),
      style: ie({ zIndex: n.zIndex }),
      onClick: $
    }, null, 6));
  }
});
let ze = !1, Xt = 0, ge = [];
function jl() {
  if (ze) return;
  ze = !0, Xt = window.scrollY || document.documentElement.scrollTop;
  const n = Ol();
  document.body.classList.add("lp-layer-lock-scroll"), document.body.style.width = `calc(100vw - ${n}px)`;
}
function Ol() {
  return window.innerWidth - document.documentElement.clientWidth;
}
function Ll() {
  ze && (ze = !1, document.body.classList.remove("lp-layer-lock-scroll"), document.body.style.width = "", window.scrollTo(0, Xt));
}
function Vl(n) {
  ge.push(n), ge.some((l) => Yt(l)) && jl();
}
function Pl(n) {
  let e = ge.indexOf(n);
  e !== -1 && ge.splice(e, 1), !ge.some((o) => Yt(o)) && Ll();
}
function Yt(n) {
  return n.options.lockBodyScroll !== null ? !!n.options.lockBodyScroll : !!n.options.useMask;
}
function zl() {
  return ge;
}
function Oe(n) {
  return ge.filter((e) => e.options.group === n);
}
class Bl {
  constructor(e = "x") {
    /**
     * 管理组模式
     * x: 水平管理组
     * y: 垂直管理组
     * xy: 水平和垂直管理组(排列一行满了，自动换行)
     */
    Y(this, "mode", "x");
    /**
     * 管理组内部对齐方式(类似flex布局的justify-content)
     * start: 左对齐
     * center: 居中对齐
     * end: 右对齐
     * null: 不进行对齐
     */
    Y(this, "justifyContent", "start");
    /**
     * 管理组内部对齐方式(类似flex布局的align-items)
     * start: 顶部对齐
     * center: 居中对齐
     * end: 底部对齐
     */
    Y(this, "alignItems", "start");
    /**
     * 管理组内部边距
     * 控制弹出层在可渲染区域内
     */
    Y(this, "paddingSize", 10);
    /**
     * 层与层之间的间距
     * 两个层之间的间距
     */
    Y(this, "spaceSize", 16);
    /**
     * 位置过渡动画时长（毫秒）
     */
    Y(this, "transitionDuration", 300);
    /**
     * 位置过渡动画函数
     */
    Y(this, "transitionTimingFunction", "ease");
    /**
     * xy模式下每行的最大宽度
     */
    Y(this, "rowMaxWidth", 0);
    /**
     * xy模式下单个项的标准宽度（0表示自动）
     */
    Y(this, "itemWidth", 0);
    /**
     * xy模式下每行最大项数
     */
    Y(this, "itemsPerRow", 0);
    Y(this, "groupElement", null);
    this.mode = e, this.groupElement = document.createElement("div"), this.groupElement.classList.add("lp-layer-group");
  }
  /**
   * 获取追加到的元素
   * @returns 
   */
  renderGroupElement() {
    return this.groupElement && !this.groupElement.parentElement && document.body.appendChild(this.groupElement), this.groupElement;
  }
  /**
   * 卸载从body中移除组元素
   */
  unmountGroupElement() {
    this.groupElement && this.groupElement.parentElement && this.groupElement.parentElement.removeChild(this.groupElement);
  }
  /**
   * 处理窗口大小变化
   */
  handleResize() {
    this.mode === "xy" && (this.rowMaxWidth = window.innerWidth - this.paddingSize * 2, this.updateLayersPosition());
  }
  /**
   * 设置xy模式下的行宽度
   */
  setRowMaxWidth(e) {
    return this.rowMaxWidth = e, this;
  }
  /**
   * 设置xy模式下的单个项标准宽度
   */
  setItemWidth(e) {
    return this.itemWidth = e, this;
  }
  /**
   * 设置xy模式下每行最大项数
   */
  setItemsPerRow(e) {
    return this.itemsPerRow = e, this;
  }
  /**
   * 设置位置过渡动画时长
   */
  transition(e, l = "ease") {
    return this.transitionDuration = e, this.transitionTimingFunction = l, this;
  }
  /**
   * 设置管理组内部边距
   */
  padding(e) {
    return this.paddingSize = e, this;
  }
  /**
   * 设置层与层之间的间距
   */
  space(e) {
    return this.spaceSize = e, this;
  }
  /**
   * 设置管理组内部对齐方式
   * @param justifyContent 水平对齐方式
   * @param alignItems 垂直对齐方式
   */
  align(e, l) {
    return this.justifyContent = e, this.alignItems = l, this;
  }
  /**
   * 初始化组容器样式
   */
  initGroupContainerStyle() {
    this.groupElement && (this.mode === "x" ? (this.groupElement.style.flexDirection = "row", this.groupElement.style.flexWrap = "nowrap") : this.mode === "y" ? (this.groupElement.style.flexDirection = "column", this.groupElement.style.flexWrap = "nowrap") : this.mode === "xy" && (this.groupElement.style.flexDirection = "row", this.groupElement.style.flexWrap = "wrap"), this.justifyContent && (this.groupElement.style.justifyContent = this.justifyContent), this.groupElement.style.alignItems = this.alignItems, this.groupElement.style.padding = `${this.paddingSize}px`, this.groupElement.style.gap = `${this.spaceSize}px`);
  }
  /**
   * 计算层的位置
   * @param containerStyle 容器样式
   * @param layer 层对象
   */
  computePosition(e, l) {
    if (l.options.follow && l.options.follow.target)
      return;
    this.renderGroupElement(), this.initGroupContainerStyle(), Oe(this).filter((r) => r.layerElement && !r.closing);
    let o = l.getLayerInfo(), s = this.getOrCreatePlaceholder(l);
    s.style.width = `${o.width}px`, s.style.height = `${o.height}px`, this.mode === "xy" && this.itemWidth > 0 && (s.style.width = `${this.itemWidth}px`), requestAnimationFrame(() => {
      const r = s.getBoundingClientRect();
      e.transform = `translate(${r.left}px, ${r.top}px)`, e.top = "0", e.left = "0", this.mode !== "x" && (e.width = `${o.width}px`), this.mode !== "y" && (e.height = `${o.height}px`), l.layerElement && Object.entries(e).forEach(([$, c]) => {
        c != null && (l.layerElement.style[$] = c);
      });
    });
  }
  /**
   * 获取或创建层的占位元素
   * @param layer 层对象
   * @returns 占位元素
   */
  getOrCreatePlaceholder(e) {
    this.groupElement || this.renderGroupElement();
    let l = `p-${e.id}`, t = document.getElementById(l);
    return t || (t = document.createElement("div"), t.id = l, t.className = "lp-layer-placeholder", t.dataset.layerId = e.id, this.groupElement.appendChild(t)), t;
  }
  /**
   * 更新组内所有层的位置
   * @todo 在有元素被移除后, 需要重新计算位置
   */
  updateLayersPosition() {
    this.renderGroupElement();
    const l = Oe(this).filter((t) => t.layerElement && !t.closing);
    l.forEach((t) => {
      t.groupResetStatus = 1;
    }), this.cleanupPlaceholders(l), l.forEach((t) => {
      if (t.layerElement) {
        const o = t.getLayerInfo(), s = this.getOrCreatePlaceholder(t);
        s.style.width = `${o.width}px`, s.style.height = `${o.height}px`, this.mode === "xy" && this.itemWidth > 0 && (s.style.width = `${this.itemWidth}px`);
      }
    }), requestAnimationFrame(() => {
      l.forEach((t) => {
        if (t.layerElement) {
          const o = `p-${t.id}`, s = document.getElementById(o);
          if (s) {
            const r = s.getBoundingClientRect(), $ = t.layerElement.style;
            let c = Object.assign({}, {
              transform: $.transform,
              transition: $.transition,
              top: $.top,
              left: $.left,
              right: $.right,
              bottom: $.bottom,
              width: $.width,
              height: $.height
            });
            c.transform = `translate(${r.left}px, ${r.top}px)`, c.transition = `transform ${this.transitionDuration}ms ${this.transitionTimingFunction}`, c.top = "0", c.left = "0";
            const f = t.getLayerInstance();
            f && f.exposed && f.exposed.changeContainerStyle(c);
          }
        }
      });
    });
  }
  /**
   * 清理不再可见的层的占位元素
   * @param visibleLayers 当前可见的层
   */
  cleanupPlaceholders(e) {
    if (!this.groupElement) return;
    const l = this.groupElement.querySelectorAll(".lp-layer-placeholder"), t = new Set(e.map((o) => o.id));
    l.forEach((o) => {
      const s = o.getAttribute("data-layer-id");
      s && !t.has(s) && o.remove();
    });
  }
  // SECTION 窗口大小变化事件
  /**
   * 注册窗口大小变化事件
   */
  regResizeEvent() {
    window.addEventListener("resize", this.handleResize.bind(this));
  }
  /**
   * 移除窗口大小变化事件
   */
  unregResizeEvent() {
    typeof window < "u" && window.removeEventListener("resize", this.handleResize.bind(this));
  }
  // !SECTION
  getLayers() {
    return Oe(this).filter((l) => l.layerElement && !l.closing);
  }
}
let Ml = 1e3;
const Al = {
  dialog: Kt,
  drawer: Tl
  // 可以在这里添加更多容器类型
};
class pe {
  constructor() {
    /**
     * 层id
     */
    Y(this, "id", "");
    Y(this, "layerInstance", null);
    /**
     * 组重置状态
     * @todo 用于在层关闭时, 组内其它层需要重新计算位置
     */
    Y(this, "groupResetStatus", 0);
    Y(this, "options");
    Y(this, "layerVnode", null);
    Y(this, "contentVnode", null);
    Y(this, "maskLayer", null);
    Y(this, "closing", !1);
    Y(this, "layerZIndex", 0);
    Y(this, "maskZIndex", 0);
    Y(this, "containerEl", null);
    Y(this, "layerElement", null);
    Y(this, "createTime", 0);
    this.options = {
      component: null,
      useMask: !1,
      transition: "fade",
      drawerDirection: "right",
      events: {},
      follow: {
        target: null,
        options: { position: "bottom-center" }
      },
      lockBodyScroll: null
    };
  }
  // 为了兼容旧代码，提供vnode属性
  get vnode() {
    return this.layerVnode;
  }
  static src(e) {
    const l = new pe();
    return l.options.component = e, l.id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15), l.createTime = Date.now(), l;
  }
  model(e) {
    return this.options.model = e, this;
  }
  zIndex(e) {
    return this.options.zIndex = e, this;
  }
  on(e, l) {
    return this.options.events[e] = l, this;
  }
  off(e) {
    return delete this.options.events[e], this;
  }
  /**
   * 设置容器
   * @param container 容器组件或容器名称
   * @returns 
   */
  container(e, l = {}) {
    return typeof e == "string" ? this.options.containerComponent = Al[e] || null : this.options.containerComponent = e, this.options.containerProps = l, this;
  }
  /**
   * 设置过渡动画组件
   * @param transition 过渡动画组件
   * @returns 
   */
  transitionComponent(e) {
    return this.options.transitionComponent = e, this;
  }
  getTransitionComponent() {
    return this.options.transitionComponent;
  }
  group(e) {
    return this.options.group = e, this;
  }
  props(e) {
    return this.options.props = e, this;
  }
  containerProps(e) {
    return this.options.containerProps = e, this;
  }
  containerModel(e) {
    return this.options.containerModel = e, this;
  }
  useMask(e = !0, l = {}) {
    return this.options.useMask = e, this.options.maskOptions = Object.assign({
      close: !0
    }, l), this;
  }
  /**
   * 设置是否锁定body滚动
   * @param lock 是否锁定(null时根据useMask来决定)
   *
   * @todo null时根据useMask来决定
   * @todo true时锁定
   * @todo false时不锁定
   * 
   * @returns 
   */
  lockBodyScroll(e = !0) {
    return this.options.lockBodyScroll = e, this;
  }
  /**
   * 设置过渡类型
   * @param type 过渡类型
   * @example 'fade' | 'zoom' | 'slide-top' | 'slide-bottom' | 'slide-left' | 'slide-right' | 'drawer-right' | 'drawer-left' | 'drawer-top' | 'drawer-bottom'
   * @returns 
   */
  transition(e) {
    return this.options.transition = e, this;
  }
  /**
   * 设置是否追踪某个dom
   * @param target 要跟随的目标元素，可以是DOM元素或"mouse"字符串表示跟随鼠标
   * @param options 跟随选项
   * @returns 
   */
  follow(e, l) {
    if (typeof e != "string" && !(e instanceof HTMLElement))
      throw console.error("Layer.follow - invalid target type, must be HTMLElement or string"), new Error("Follow target must be an HTMLElement or string");
    return this.options.follow = {
      target: e,
      options: l
    }, this;
  }
  /**
   * 设置抽屉方向
   * @param direction 方向
   * @returns 
   */
  drawerDirection(e) {
    return this.options.drawerDirection = e, this.options.transition = `drawer-${e}`, this;
  }
  /**
   * 显示层
   * @param position 位置
   * @returns 
   */
  show(e = {}) {
    var c;
    this.closing = !1, this.options.follow && this.options.follow.target ? this.options.position = {
      width: e.width || "auto",
      height: e.height || "auto"
    } : this.options.position = e;
    let l = {
      onLayerFullscreen: () => {
        console.log("进入或退出全屏"), this.layerInstance && this.layerInstance.exposed && this.layerInstance.exposed.toggleFullscreen();
      },
      onLayerUseFullscreen: () => {
        console.log("进入全屏"), this.layerInstance && this.layerInstance.exposed && this.layerInstance.exposed.useFullscreen();
      },
      onLayerExitFullscreen: () => {
        console.log("退出全屏"), this.layerInstance && this.layerInstance.exposed && this.layerInstance.exposed.exitFullscreen();
      },
      onLayerResize: (f) => {
        console.log("缩放", f), this.layerInstance && this.layerInstance.exposed && this.layerInstance.exposed.resizeLayer(f);
      }
    };
    this.layerZIndex = this.options.zIndex || Ml++, this.maskZIndex = this.layerZIndex - 1;
    const t = (f = "layer") => {
      this.closing || (this.hide(f), this.options.events.close && this.options.events.close());
    }, o = this.options.component.default || this.options.component;
    let s = we(o, {
      modelValue: this.options.model,
      ...this.options.props,
      "onUpdate:modelValue": (f) => {
        this.options.model && (this.options.model = f);
      },
      onClose: () => {
        t("content");
      },
      // 添加弹出层事件监听处理
      ...l,
      // 添加事件监听处理
      ...Object.keys(this.options.events).reduce((f, g) => (g !== "close" && (f[`on${g.charAt(0).toUpperCase() + g.slice(1)}`] = (...N) => {
        this.options.events[g] && this.options.events[g](...N);
      }), f), {})
    }), r = null;
    if (this.options.containerComponent) {
      const f = ((c = this.options.containerComponent) == null ? void 0 : c.default) || this.options.containerComponent, g = {
        ...this.options.containerProps,
        modelValue: this.options.containerModel,
        onClose: () => {
          t("container");
        },
        "onUpdate:modelValue": (N) => {
          this.options.containerModel && (this.options.containerModel = N);
        }
      };
      r = we(f, g, {
        default: () => [s]
      });
    } else
      r = s;
    return this.layerVnode = we(yl, {
      position: this.options.position,
      zIndex: this.layerZIndex,
      transition: this.options.transition,
      onClose: () => {
        t("layer");
      },
      onAfterLeave: () => {
        this.handleAfterLeave();
      },
      layerObj: this,
      follow: this.options.follow || null
    }, {
      default: () => [r]
    }), this.contentVnode = s, this.layerVnode.appContext = Gt.appContext, this.containerEl = this.getContainer(), this.options.useMask && this.createMask(t), ct(this.layerVnode, this.containerEl), this.layerElement = this.containerEl.firstElementChild, this.getAppendTo().appendChild(this.layerElement), Vl(this), this.options.group && (this.options.group.renderGroupElement(), setTimeout(() => {
      var f;
      (f = this.options.group) == null || f.updateLayersPosition();
    }, 50)), this;
  }
  /**
   * 获取追加到的元素
   * @returns 
   */
  getAppendTo() {
    return this.options.group ? document.body : this.options.appendTo ? this.options.appendTo : document.body;
  }
  /**
   * 处理关闭后
   * @todo 关闭动画结束后，删除元素
   * 
   */
  handleAfterLeave() {
    if (this.options.group && this.id) {
      const l = `placeholder-${this.id}`, t = document.getElementById(l);
      t && t.parentNode && t.parentNode.removeChild(t);
    }
    this.removeElements(), Pl(this);
    const e = this.options.group;
    e && e.updateLayersPosition();
  }
  getContainer() {
    return document.createElement("div");
  }
  /**
   * 创建遮罩层
   * @param closeHandler 关闭回调
   */
  createMask(e) {
    this.maskLayer = pe.src(Sl).props({
      zIndex: this.maskZIndex,
      visible: !0
    }).on("click", (l) => {
      var t;
      (t = this.options.maskOptions) != null && t.close && e("mask"), this.emit("maskClick", l);
    }).zIndex(this.maskZIndex).transition("fade").useMask(!1), this.maskLayer.show({
      x: 0,
      y: 0,
      width: "100%",
      height: "100%"
    });
  }
  hide(e = "layer") {
    if (!this.closing)
      if (this.closing = !0, this.maskLayer && (this.maskLayer.hide(), this.maskLayer = null), this.layerVnode && this.layerVnode.component && this.layerVnode.component.exposed)
        try {
          this.layerVnode.component.exposed.close(e);
        } catch (l) {
          console.error("Error closing layer:", l), this.removeElements();
        }
      else
        console.debug("exposed 不存在"), this.removeElements();
  }
  /**
   * 移除所有DOM元素
   * 
   */
  removeElements() {
    try {
      this.containerEl && ct(null, this.containerEl), this.layerElement && this.layerElement.parentNode && this.layerElement.parentNode.removeChild(this.layerElement), this.layerVnode = null, this.containerEl = null, this.layerElement = null;
    } catch (e) {
      console.error("Error removing layer elements:", e);
    }
    this.closing = !1;
  }
  // 触发自定义事件
  emit(e, ...l) {
    return this.options.events[e] && this.options.events[e](...l), this;
  }
  /**
   * 获取层大小
   * @returns 
   */
  getLayerInfo() {
    return this.layerElement ? {
      width: this.layerElement.offsetWidth,
      height: this.layerElement.offsetHeight,
      x: this.layerElement.offsetLeft,
      y: this.layerElement.offsetTop
    } : { width: 0, height: 0, x: 0, y: 0 };
  }
  /**
  * 设置层实例
  * @param layerInstance 层实例
  */
  setLayerInstance(e) {
    return this.layerInstance = e, this;
  }
  /**
   * 获取层实例
   * @returns 层实例
   */
  getLayerInstance() {
    return this.layerInstance;
  }
  // SECTION 外部操作方法
  /**
   * 关闭层
   */
  close() {
    this.hide();
  }
  /**
   * 关闭所有层
   * @param check 过滤方法
   */
  static closeAll(e = null) {
    zl().forEach((t) => {
      e && !e(t) || t.close();
    });
  }
  /**
   * 关闭组内所有层
   * @param group 组
   */
  static closeByGroup(e) {
    Oe(e).forEach((t) => {
      t.close();
    });
  }
  // !SECTION
}
async function Zt(n, e) {
  const l = await import("./toast-CHcysktu.js");
  return pe.src(l.default).props({
    message: n || "",
    duration: (e == null ? void 0 : e.duration) || 2e3
  }).show({
    x: "center",
    y: "15vh",
    width: "auto",
    height: "auto"
  });
}
async function Jt(n) {
  const e = typeof n == "string" ? { message: n } : n;
  return new Promise(async (l) => {
    const t = await import("./confirm-BGvYs8XV.js"), o = ye({
      message: e.message || "确认执行此操作？"
    }), s = {
      onConfirm: () => {
        r.hide(), l(!0);
      },
      onCancel: () => {
        r.hide(), l(!1);
      }
    }, r = pe.src(t.default).useMask().container("dialog").containerModel({
      title: e.title || "确认",
      showClose: !0
    }).model(o).props(s).show();
  });
}
async function Qt(n) {
  const e = typeof n == "string" ? { message: n } : n;
  return new Promise(async (l) => {
    const t = await import("./alert-CItR2_B_.js"), o = ye({
      message: e.message || ""
    }), s = {
      onClose: () => {
        r.hide(), l();
      }
    }, r = pe.src(t.default).useMask().container("dialog").containerModel({
      title: e.title || "提示",
      showClose: !0
    }).model(o).props(s).show();
  });
}
let Rl = {
  install: (n) => {
    n.config.globalProperties.$toast = Zt, n.config.globalProperties.$confirm = Jt, n.config.globalProperties.$alert = Qt, n.config.globalProperties.$layer = pe;
  }
};
const Il = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DialogContainer: Kt,
  Layer: pe,
  LayerGroup: Bl,
  alert: Qt,
  confirm: Jt,
  default: Rl,
  toast: Zt
}, Symbol.toStringTag, { value: "Module" })), Dl = {
  name: "lp-layout"
}, tt = /* @__PURE__ */ te({
  ...Dl,
  props: {
    type: { default: "flex" },
    cols: {},
    rows: {},
    gap: {},
    gapX: {},
    gapY: {},
    justifyContent: {},
    alignContent: {},
    justifyItems: {},
    alignItems: {},
    height: {},
    width: {},
    minHeight: {},
    minWidth: {},
    direction: { default: "column" },
    wrap: { type: Boolean, default: !1 },
    template: {},
    gridTemplateColumns: {},
    gridTemplateRows: {},
    gridTemplateAreas: {}
  },
  setup(n) {
    const e = n, l = R(() => {
      const o = [];
      return e.template ? o.push("lp-grid-layout", e.template) : e.type === "grid" ? (o.push("lp-grid"), e.cols && (typeof e.cols == "number" ? o.push(`cols-${e.cols}`) : o.push(`cols-${e.cols}`)), e.rows && (typeof e.rows == "number" ? o.push(`rows-${e.rows}`) : typeof e.rows == "string" && o.push(`rows-${e.rows}`)), e.gap !== void 0 && typeof e.gap == "number" && o.push(`gap-${e.gap}`), e.gapX !== void 0 && typeof e.gapX == "number" && o.push(`gap-x-${e.gapX}`), e.gapY !== void 0 && typeof e.gapY == "number" && o.push(`gap-y-${e.gapY}`), e.justifyContent && o.push(`justify-${e.justifyContent}`), e.alignContent && o.push(`align-${e.alignContent}`), e.justifyItems && o.push(`justify-items-${e.justifyItems}`), e.alignItems && o.push(`items-${e.alignItems}`), e.height === "100vh" ? o.push("h-screen") : e.height === "100%" && o.push("h-full"), e.minHeight === "100vh" ? o.push("min-h-screen") : e.minHeight === "100%" && o.push("min-h-full"), e.width === "100%" ? o.push("w-full") : e.width === "100vw" && o.push("w-screen")) : (o.push("lp-layout"), e.direction && o.push(e.direction), e.wrap && o.push("wrap"), e.justifyContent && e.alignItems && o.push(`${e.justifyContent}-${e.alignItems}`)), o;
    }), t = R(() => {
      const o = {};
      return e.gridTemplateColumns && (o.gridTemplateColumns = e.gridTemplateColumns), e.gridTemplateRows && (o.gridTemplateRows = e.gridTemplateRows), e.gridTemplateAreas && (o.gridTemplateAreas = e.gridTemplateAreas), e.gap && typeof e.gap == "string" && (o.gap = e.gap), e.gapX && typeof e.gapX == "string" && (o.columnGap = e.gapX), e.gapY && typeof e.gapY == "string" && (o.rowGap = e.gapY), e.height && typeof e.height == "string" && !["100vh", "100%"].includes(e.height) ? o.height = e.height : typeof e.height == "number" && (o.height = `${e.height}px`), e.width && typeof e.width == "string" && !["100%", "100vw"].includes(e.width) ? o.width = e.width : typeof e.width == "number" && (o.width = `${e.width}px`), e.minHeight && typeof e.minHeight == "string" && !["100vh", "100%"].includes(e.minHeight) ? o.minHeight = e.minHeight : typeof e.minHeight == "number" && (o.minHeight = `${e.minHeight}px`), e.minWidth && typeof e.minWidth == "string" ? o.minWidth = e.minWidth : typeof e.minWidth == "number" && (o.minWidth = `${e.minWidth}px`), o;
    });
    return (o, s) => (h(), m("div", {
      class: W(l.value),
      style: ie(t.value)
    }, [
      Q(o.$slots, "default")
    ], 6));
  }
}), Wl = {
  name: "lp-grid-item"
}, nt = /* @__PURE__ */ te({
  ...Wl,
  props: {
    colSpan: {},
    rowSpan: {},
    colStart: {},
    colEnd: {},
    rowStart: {},
    rowEnd: {},
    justifySelf: {},
    alignSelf: {},
    area: {},
    gridColumn: {},
    gridRow: {}
  },
  setup(n) {
    const e = n, l = R(() => {
      const o = ["lp-grid-item"];
      return e.colSpan && (typeof e.colSpan == "number" ? o.push(`col-span-${e.colSpan}`) : o.push(`col-span-${e.colSpan}`)), e.rowSpan && (typeof e.rowSpan == "number" ? o.push(`row-span-${e.rowSpan}`) : o.push(`row-span-${e.rowSpan}`)), e.colStart && o.push(`col-start-${e.colStart}`), e.colEnd && o.push(`col-end-${e.colEnd}`), e.rowStart && o.push(`row-start-${e.rowStart}`), e.rowEnd && o.push(`row-end-${e.rowEnd}`), e.justifySelf && o.push(`justify-self-${e.justifySelf}`), e.alignSelf && o.push(`align-self-${e.alignSelf}`), o;
    }), t = R(() => {
      const o = {};
      return e.area && (o.gridArea = e.area), e.gridColumn && (o.gridColumn = e.gridColumn), e.gridRow && (o.gridRow = e.gridRow), o;
    });
    return (o, s) => (h(), m("div", {
      class: W(l.value),
      style: ie(t.value)
    }, [
      Q(o.$slots, "default")
    ], 6));
  }
});
let Nl = {
  install: (n) => {
    n.component(tt.name, tt), n.component(nt.name, nt);
  }
};
const Hl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GridItem: nt,
  Layout: tt,
  default: Nl
}, Symbol.toStringTag, { value: "Module" })), Ul = { class: "item" }, ql = {
  name: "lp-list"
}, Et = /* @__PURE__ */ Object.assign(ql, {
  props: {
    data: {
      type: [Array],
      default: () => []
    },
    listX: {
      type: Boolean,
      default: !1
    }
  },
  setup(n) {
    return (e, l) => (h(), m("div", {
      class: W(["list", { "list-x": n.listX }])
    }, [
      (h(!0), m(ae, null, Te(n.data, (t, o) => (h(), m("div", Ul, [
        Q(e.$slots, "default", { row: t })
      ]))), 256))
    ], 2));
  }
});
let Kl = {
  install: (n) => {
    n.component(Et.name, Et);
  }
};
const Gl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Kl
}, Symbol.toStringTag, { value: "Module" })), Xl = { class: "lp-message" }, Yl = {
  name: "lp-message"
}, Tt = /* @__PURE__ */ Object.assign(Yl, {
  setup(n) {
    return ye({}), (e, l) => (h(), m("div", Xl, F(e.message), 1));
  }
});
let Zl = {
  install: (n) => {
    n.component(Tt.name, Tt);
  }
};
const Jl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Zl
}, Symbol.toStringTag, { value: "Module" })), Ql = { class: "lp-panel" }, Fl = {
  key: 0,
  class: "title"
}, ei = { class: "body" }, ti = {
  name: "lp-panel"
}, St = /* @__PURE__ */ Object.assign(ti, {
  props: {
    title: {
      type: String,
      default: ""
    }
  },
  emits: ["change"],
  setup(n, { emit: e }) {
    return (l, t) => (h(), m("div", Ql, [
      n.title ? (h(), m("div", Fl, F(n.title), 1)) : M("", !0),
      C("div", ei, [
        Q(l.$slots, "default")
      ])
    ]));
  }
});
let ni = {
  install: (n) => {
    n.component(St.name, St);
  }
};
const oi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ni
}, Symbol.toStringTag, { value: "Module" })), si = { class: "lp-layout" }, li = {
  name: "LpTable"
}, jt = /* @__PURE__ */ te({
  ...li,
  setup(n) {
    return ye({}), (e, l) => (h(), m("div", si, " lp-table "));
  }
});
let ii = {
  install: (n) => {
    n.component(jt.name, jt);
  }
};
const ai = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ii
}, Symbol.toStringTag, { value: "Module" })), ri = ["onClick"], ui = { class: "text" }, ci = {
  name: "lp-tabs"
}, Ot = /* @__PURE__ */ te({
  ...ci,
  props: /* @__PURE__ */ dt({
    keys: { default: () => ({ value: "value", title: "title" }) },
    type: { default: "default" },
    data: { default: () => [] },
    full: { type: Boolean, default: !1 },
    column: { type: Boolean, default: !1 },
    modelType: { default: "field" },
    modelField: { default: void 0 }
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: /* @__PURE__ */ dt(["change"], ["update:modelValue"]),
  setup(n, { emit: e }) {
    const l = an(n, "modelValue"), t = e, o = n;
    function s(c, f) {
      return c[o.keys.value] ?? f;
    }
    function r(c, f) {
      return o.modelType === "index" ? l.value === f : o.modelType === "field" && o.modelField ? l.value === c[o.modelField] : l.value === c[o.keys.value];
    }
    function $(c, f) {
      let g;
      o.modelType === "index" ? g = f : o.modelType === "field" && o.modelField ? g = c[o.modelField] : g = c[o.keys.value], l.value = g, t("change", {
        value: g,
        item: c,
        index: f
      });
    }
    return (c, f) => (h(), m("div", {
      class: W(["lp-tabs", [{ column: c.column, full: c.full }, c.type ? `type-${c.type}` : ""]])
    }, [
      (h(!0), m(ae, null, Te(c.data, (g, N) => (h(), m("div", {
        class: W(["item", { active: r(g, N) }]),
        key: s(g, N),
        onClick: (G) => $(g, N)
      }, [
        C("span", ui, F(g[c.keys.title]), 1)
      ], 10, ri))), 128))
    ], 2));
  }
});
let di = {
  install: (n) => {
    n.component(Ot.name, Ot);
  }
};
const pi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: di
}, Symbol.toStringTag, { value: "Module" }));
function fi(n) {
  const e = /* @__PURE__ */ Object.assign({ "./lp-empty/index.ts": pn, "./lp-form/index.ts": So, "./lp-icon/index.ts": pl, "./lp-layer/index.ts": Il, "./lp-layout/index.ts": Hl, "./lp-list/index.ts": Gl, "./lp-message/index.ts": Jl, "./lp-panel/index.ts": oi, "./lp-table/index.ts": ai, "./lp-tabs/index.ts": pi });
  console.debug("%cglobalComponents", "color:green", e), Object.keys(e).forEach((l) => {
    const t = e[l].default;
    nl(t) || n.use(t);
  });
}
console.debug("looplan-ui");
const yi = {
  install(n) {
    fi(n), Gt.appContext = n._context;
  }
};
export {
  Il as LpLayer,
  yi as default,
  fi as registerLooplanUiComponents
};
