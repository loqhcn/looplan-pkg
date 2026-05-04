var Qn = Object.defineProperty;
var el = (n, e, l) => e in n ? Qn(n, e, { enumerable: !0, configurable: !0, writable: !0, value: l }) : n[e] = l;
var se = (n, e, l) => el(n, typeof e != "symbol" ? e + "" : e, l);
import { defineComponent as le, createElementBlock as g, openBlock as f, normalizeClass as K, createBlock as ge, createCommentVNode as D, renderSlot as ne, unref as G, createTextVNode as Le, toDisplayString as ee, ref as B, computed as I, createElementVNode as L, Fragment as ve, renderList as we, withCtx as xe, mergeModels as Ye, useModel as mt, inject as Ee, onMounted as ke, nextTick as me, watch as de, onUnmounted as gt, normalizeStyle as he, provide as Ae, withModifiers as Re, createVNode as ce, Transition as yt, useAttrs as tl, mergeProps as nl, resolveDynamicComponent as Xe, reactive as $e, getCurrentInstance as En, onBeforeUnmount as qe, withDirectives as nt, vShow as Yt, render as nn, resolveComponent as ln, toRaw as kt, useSlots as Ln, useCssVars as Xt, vModelText as On, isRef as ll, markRaw as on, TransitionGroup as ol } from "vue";
import { LpIcon as _e, resolveComponent as sl, loadComponent as sn, setIconGateway as al, setComponentPackage as il } from "looplan";
import _t from "axios";
const rl = { name: "LpLoading" }, ul = /* @__PURE__ */ le({
  ...rl,
  props: {
    loading: { type: Boolean },
    size: { default: "default" },
    type: { default: "spinner" }
  },
  setup(n) {
    const e = n;
    return (l, t) => (f(), g("span", {
      class: K(["lp-loading", [`lp-loading-${e.type}`, l.size]]),
      "aria-hidden": "true"
    }, null, 2));
  }
}), Pe = (n, e) => {
  const l = n.__vccOpts || n;
  for (const [t, o] of e)
    l[t] = o;
  return l;
}, et = /* @__PURE__ */ Pe(ul, [["__scopeId", "data-v-5093ff88"]]), cl = ["disabled"], dl = {
  name: "LpButton"
}, St = /* @__PURE__ */ le({
  ...dl,
  props: {
    type: { default: "primary" },
    text: { default: "按钮" },
    size: { default: "" },
    loading: { type: Boolean, default: !1 },
    plain: { type: Boolean, default: !1 },
    icon: { default: "" },
    iconSize: { default: 16 },
    iconColor: { default: "" },
    iconPosition: { default: "left" },
    link: { type: Boolean, default: !1 }
  },
  emits: ["click"],
  setup(n, { emit: e }) {
    const l = n, t = e, o = (s) => {
      l.loading || t("click", s);
    };
    return (s, i) => (f(), g("button", {
      class: K(["btn", ["btn-" + s.type, s.size, s.loading ? "is-loading" : "", s.plain ? "plain" : "", s.link ? "link" : "", s.icon ? "has-icon" : "", s.iconPosition === "right" ? "icon-right" : ""]]),
      disabled: s.loading,
      onClick: o
    }, [
      s.loading ? (f(), ge(et, {
        key: 0,
        size: s.size
      }, null, 8, ["size"])) : s.icon ? (f(), ge(G(_e), {
        key: 1,
        is: s.icon,
        size: s.iconSize,
        color: s.iconColor
      }, null, 8, ["is", "size", "color"])) : D("", !0),
      ne(s.$slots, "default", {}, () => [
        Le(ee(s.text), 1)
      ])
    ], 10, cl));
  }
}), pl = { class: "lp-button-group" }, fl = {
  name: "LpButtonGroup"
}, hl = /* @__PURE__ */ le({
  ...fl,
  setup(n) {
    return (e, l) => (f(), g("div", pl, [
      ne(e.$slots, "default", {}, void 0, !0)
    ]));
  }
}), xt = /* @__PURE__ */ Pe(hl, [["__scopeId", "data-v-04957fc5"]]);
let vl = {
  install: (n) => {
    n.component(St.name, St), n.component(xt.name, xt);
  }
};
const ml = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpButton: St,
  LpButtonGroup: xt,
  default: vl
}, Symbol.toStringTag, { value: "Module" })), gl = { class: "lp-checkbox__input" }, yl = ["value", "name", "disabled", "checked", "midway"], _l = {
  key: 0,
  class: "lp-checkbox__label"
}, bl = {
  name: "LpCheckbox"
}, tt = /* @__PURE__ */ le({
  ...bl,
  props: {
    modelValue: { type: [Boolean, String, Number], default: !1 },
    value: { type: [Boolean, String, Number], default: void 0 },
    title: { type: [String, Number, Boolean] },
    trueLabel: {},
    falseLabel: {},
    disabled: { type: Boolean },
    name: {},
    size: { default: "default" },
    midway: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "change", "click"],
  setup(n, { emit: e }) {
    const l = n, t = e, o = B(), s = B(!1), i = I(() => l.value !== void 0 ? l.trueLabel !== void 0 || l.falseLabel !== void 0 ? l.value === l.trueLabel : !!l.value : l.trueLabel !== void 0 || l.falseLabel !== void 0 ? l.modelValue === l.trueLabel : !!l.modelValue), r = I(() => l.size), a = I(() => l.disabled), d = (c) => {
      if (l.value !== void 0) {
        t("click", i.value);
        return;
      }
      const p = c.target.checked;
      let _;
      l.trueLabel !== void 0 || l.falseLabel !== void 0 ? _ = p ? l.trueLabel : l.falseLabel : _ = p, t("update:modelValue", _), t("change", _);
    };
    return (c, $) => (f(), g("label", {
      class: K(["lp-checkbox", [
        `lp-checkbox--${r.value}`,
        {
          "is-disabled": a.value,
          "is-checked": i.value,
          "is-midway": c.midway
        }
      ]])
    }, [
      L("span", gl, [
        L("input", {
          ref_key: "inputRef",
          ref: o,
          type: "checkbox",
          class: "lp-checkbox__original",
          value: c.title || c.trueLabel,
          name: c.name,
          disabled: a.value,
          checked: i.value,
          midway: c.midway,
          onChange: d,
          onFocus: $[0] || ($[0] = (p) => s.value = !0),
          onBlur: $[1] || ($[1] = (p) => s.value = !1)
        }, null, 40, yl),
        $[2] || ($[2] = L("span", { class: "lp-checkbox__inner" }, null, -1))
      ]),
      c.$slots.default || c.title ? (f(), g("span", _l, [
        ne(c.$slots, "default", {}, () => [
          Le(ee(c.title), 1)
        ])
      ])) : D("", !0)
    ], 2));
  }
}), wl = ["aria-label"], $l = {
  name: "LpCheckboxGroup"
}, rt = /* @__PURE__ */ le({
  ...$l,
  props: {
    modelValue: { default: () => [] },
    options: { default: () => [] },
    disabled: { type: Boolean, default: !1 },
    size: { default: "default" },
    min: { default: 0 },
    max: { default: 1 / 0 },
    ariaLabel: {}
  },
  emits: ["update:modelValue", "change"],
  setup(n, { emit: e }) {
    const l = n, t = e, o = I(() => l.modelValue || []), s = (r, a) => {
      if (l.disabled) return;
      const d = !!a, c = [...o.value], $ = c.indexOf(r);
      d ? $ === -1 && c.push(r) : $ > -1 && c.splice($, 1), !(c.length < l.min) && (c.length > l.max || (t("update:modelValue", c), t("change", c)));
    }, i = (r) => o.value.includes(r) ? !1 : o.value.length >= l.max;
    return (r, a) => (f(), g("div", {
      class: K(["lp-checkbox-group", [
        `lp-checkbox-group--${r.size}`,
        {
          "is-disabled": r.disabled
        }
      ]]),
      role: "group",
      "aria-label": r.ariaLabel
    }, [
      (f(!0), g(ve, null, we(r.options, (d) => (f(), ge(tt, {
        key: d.value,
        "model-value": o.value.includes(d.value),
        onChange: (c) => s(d.value, c),
        disabled: d.disabled || r.disabled || i(d.value),
        size: r.size
      }, {
        default: xe(() => [
          Le(ee(d.title), 1)
        ]),
        _: 2
      }, 1032, ["model-value", "onChange", "disabled", "size"]))), 128)),
      ne(r.$slots, "default")
    ], 10, wl));
  }
}), Cl = (n) => {
  n.component(tt.name, tt), n.component(rt.name, rt);
}, kl = {
  install: Cl,
  LpCheckbox: tt,
  LpCheckboxGroup: rt
}, Sl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpCheckbox: tt,
  LpCheckboxGroup: rt,
  default: kl
}, Symbol.toStringTag, { value: "Module" })), xl = {
  name: "lp-empty"
}, Tl = { class: "lp-empty" };
function El(n, e, l, t, o, s) {
  return f(), g("div", Tl, " 数据为空! ");
}
const Tt = /* @__PURE__ */ Pe(xl, [["render", El]]);
let Ll = {
  install: (n) => {
    n.component(Tt.name, Tt);
  }
};
const Ol = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpEmpty: Tt,
  default: Ll
}, Symbol.toStringTag, { value: "Module" })), jl = { class: "lp-fold-header-content" }, Al = {
  name: "LpFold"
}, Ml = /* @__PURE__ */ le({
  ...Al,
  props: /* @__PURE__ */ Ye({
    name: { default: "" },
    title: { default: "" },
    disabled: { type: Boolean, default: !1 },
    showArrow: { type: Boolean, default: !0 },
    active: { type: Boolean },
    expand: { type: Boolean, default: !1 }
  }, {
    active: { type: Boolean, default: !1 },
    activeModifiers: {}
  }),
  emits: /* @__PURE__ */ Ye(["change"], ["update:active"]),
  setup(n, { emit: e }) {
    const l = n, t = e, o = mt(n, "active"), s = Ee("lpCollapse", null), i = B(null), r = B("0px"), a = B(!1), d = B(!0), c = () => {
      if (s && s.activeNames && l.name) {
        const h = s.activeNames.value;
        a.value = Array.isArray(h) ? h.includes(l.name) : h === l.name;
      } else
        a.value = o.value || l.expand;
    }, $ = () => {
      if (l.disabled) return;
      const h = !a.value;
      s && s.setActiveNames && l.name ? s.setActiveNames(l.name) : o.value = h, a.value = h, t("change", l.name, h), me(() => {
        p();
      });
    }, p = () => {
      i.value && (r.value = a.value ? `${i.value.scrollHeight}px` : "0px");
    }, _ = B(null);
    return ke(() => {
      c(), me(() => {
        p(), requestAnimationFrame(() => {
          d.value = !1;
        });
      }), s && s.activeNames && l.name && de(() => s.activeNames.value, () => {
        c(), me(() => {
          p();
        });
      }), (!s || !l.name) && de(o, (h) => {
        a.value = h, me(() => {
          p();
        });
      }), de(a, () => {
        me(() => {
          p();
        });
      }), i.value && (_.value = new MutationObserver(() => {
        p();
      }), _.value.observe(i.value, {
        childList: !0,
        subtree: !0,
        attributes: !0
      }));
    }), gt(() => {
      _.value && _.value.disconnect();
    }), (h, w) => (f(), g("div", {
      class: K(["lp-fold", { "is-disabled": h.disabled }])
    }, [
      L("div", {
        class: K(["lp-fold-header", { "is-active": a.value, "is-disabled": h.disabled }]),
        onClick: $
      }, [
        L("div", jl, [
          ne(h.$slots, "title", {}, () => [
            Le(ee(h.title), 1)
          ], !0)
        ]),
        h.showArrow ? (f(), g("div", {
          key: 0,
          class: K(["lp-fold-arrow", { "is-active": a.value }])
        }, w[0] || (w[0] = [
          L("svg", {
            viewBox: "0 0 1024 1024",
            width: "16",
            height: "16"
          }, [
            L("path", {
              d: "M832.064 320.064L512.064 640.064 192.064 320.064z",
              fill: "currentColor"
            })
          ], -1)
        ]), 2)) : D("", !0)
      ], 2),
      L("div", {
        class: K(["lp-fold-content", { "is-active": a.value, "no-transition": d.value }]),
        style: he({ height: r.value })
      }, [
        L("div", {
          ref_key: "contentRef",
          ref: i,
          class: "lp-fold-content-inner"
        }, [
          ne(h.$slots, "default", {}, void 0, !0)
        ], 512)
      ], 6)
    ], 2));
  }
}), Et = /* @__PURE__ */ Pe(Ml, [["__scopeId", "data-v-fd0ed24b"]]), Pl = { class: "lp-collapse" }, Il = {
  name: "LpCollapse"
}, Bl = /* @__PURE__ */ le({
  ...Il,
  props: {
    modelValue: { default: () => [] },
    accordion: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "change"],
  setup(n, { emit: e }) {
    const l = n, t = e, o = B(l.modelValue), s = (i) => {
      let r = [];
      if (l.accordion)
        r = o.value === i ? "" : i;
      else {
        const a = Array.isArray(o.value) ? [...o.value] : [o.value], d = a.indexOf(i);
        d > -1 ? a.splice(d, 1) : a.push(i), r = a;
      }
      o.value = r, t("update:modelValue", r), t("change", r);
    };
    return de(() => l.modelValue, (i) => {
      o.value = i;
    }), Ae("lpCollapse", {
      activeNames: o,
      setActiveNames: s
    }), (i, r) => (f(), g("div", Pl, [
      ne(i.$slots, "default", {}, void 0, !0)
    ]));
  }
}), Lt = /* @__PURE__ */ Pe(Bl, [["__scopeId", "data-v-8355ddd5"]]);
let Rl = {
  install: (n) => {
    n.component(Et.name, Et), n.component(Lt.name, Lt);
  }
};
const zl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpCollapse: Lt,
  LpFold: Et,
  default: Rl
}, Symbol.toStringTag, { value: "Module" })), Fl = {
  name: "LpForm"
}, Ot = /* @__PURE__ */ le({
  ...Fl,
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
    const t = n, o = l, s = B([]), i = (_) => {
      s.value.push(_);
    }, r = (_) => {
      const h = s.value.indexOf(_);
      h > -1 && s.value.splice(h, 1);
    }, a = async (_, h) => {
      const w = s.value.find((A) => A.prop === _);
      if (!w)
        return console.warn(`[LpForm] 找不到字段 ${_}`), !1;
      try {
        return await w.validate(), h == null || h(!0, ""), !0;
      } catch (A) {
        const x = A.message || "验证失败";
        return h == null || h(!1, x), !1;
      }
    }, d = async (_) => {
      const h = await Promise.allSettled(
        s.value.map((x) => x.validate())
      ), w = h.every((x) => x.status === "fulfilled"), A = h.filter((x) => x.status === "rejected").map((x) => x.reason.message).join("; ");
      return _ == null || _(w, A), w;
    }, c = () => {
      s.value.forEach((_) => {
        _.resetField();
      });
    }, $ = (_) => {
      const h = _ ? Array.isArray(_) ? _ : [_] : [];
      s.value.forEach((w) => {
        (!_ || h.includes(w.prop)) && w.clearValidate();
      });
    }, p = async () => {
      await d();
    };
    return I(() => typeof t.labelWidth == "number" ? `${t.labelWidth}px` : t.labelWidth || "auto"), Ae("lpForm", {
      props: t,
      addFormItem: i,
      removeFormItem: r,
      validateField: a,
      emit: o
    }), e({
      validate: d,
      validateField: a,
      resetFields: c,
      clearValidate: $
    }), (_, h) => (f(), g("form", {
      class: K(["lp-form", {
        "lp-form--inline": _.inline,
        "lp-form--disabled": _.disabled
      }]),
      onSubmit: Re(p, ["prevent"])
    }, [
      ne(_.$slots, "default")
    ], 34));
  }
}), Nl = ["for"], Vl = {
  key: 0,
  class: "lp-form-item__label-suffix"
}, Wl = { class: "lp-form-item__content" }, Dl = {
  name: "LpFormItem"
}, jt = /* @__PURE__ */ le({
  ...Dl,
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
    const l = n, t = Ee("lpForm", null), o = B(""), s = B(""), i = B(!1), r = I(() => {
      var u;
      return ((u = t == null ? void 0 : t.props) == null ? void 0 : u.labelPosition) || "right";
    }), a = I(() => {
      var u;
      return l.size || ((u = t == null ? void 0 : t.props) == null ? void 0 : u.size) || "default";
    }), d = I(() => l.required !== void 0 ? l.required : h().some((v) => v.required)), c = I(() => {
      var u;
      return ((u = t == null ? void 0 : t.props) == null ? void 0 : u.labelSuffix) || "";
    }), $ = I(() => {
      var u;
      return o.value === "error" && l.showMessage && (((u = t == null ? void 0 : t.props) == null ? void 0 : u.showMessage) ?? !0);
    }), p = I(() => {
      var y;
      const u = {};
      if (r.value === "top")
        return u;
      const v = l.labelWidth || ((y = t == null ? void 0 : t.props) == null ? void 0 : y.labelWidth);
      return v && (u.width = typeof v == "number" ? `${v}px` : v), u;
    }), _ = I(() => l.for || `lp-form-item-${Math.random().toString(36).substr(2, 9)}`), h = () => {
      var O;
      const u = (O = t == null ? void 0 : t.props) == null ? void 0 : O.rules, v = l.rules, y = [];
      if (u && l.prop) {
        const j = u[l.prop];
        j && y.push(...Array.isArray(j) ? j : [j]);
      }
      return v && y.push(...Array.isArray(v) ? v : [v]), y;
    }, w = () => {
      var v;
      const u = (v = t == null ? void 0 : t.props) == null ? void 0 : v.model;
      if (!(!u || !l.prop))
        return u[l.prop];
    }, A = async (u) => {
      if (!l.prop)
        return Promise.resolve();
      const v = h();
      if (!v.length)
        return Promise.resolve();
      const y = u ? v.filter((j) => !j.trigger || j.trigger === u) : v;
      if (!y.length)
        return Promise.resolve();
      o.value = "validating", i.value = !0;
      const O = w();
      return new Promise((j, Y) => {
        let S = 0;
        const T = y.length, W = (H, N) => {
          var te, k;
          if (H)
            S++;
          else {
            o.value = "error", s.value = N || "验证失败", i.value = !1, (te = t == null ? void 0 : t.emit) == null || te.call(t, "validate", l.prop, !1, N || ""), Y(new Error(N || "验证失败"));
            return;
          }
          S === T && (o.value = "success", s.value = "", i.value = !1, (k = t == null ? void 0 : t.emit) == null || k.call(t, "validate", l.prop, !0, ""), j());
        };
        y.forEach((H) => {
          x(H, O, W);
        });
      });
    }, x = (u, v, y) => {
      if (u.required && (v == null || v === "")) {
        y(!1, u.message || "该字段为必填项");
        return;
      }
      if ((v == null || v === "") && !u.required) {
        y(!0);
        return;
      }
      if (u.min !== void 0 || u.max !== void 0 || u.len !== void 0) {
        const O = String(v).length;
        if (u.len !== void 0 && O !== u.len) {
          y(!1, u.message || `长度必须为 ${u.len} 个字符`);
          return;
        }
        if (u.min !== void 0 && O < u.min) {
          y(!1, u.message || `长度不能少于 ${u.min} 个字符`);
          return;
        }
        if (u.max !== void 0 && O > u.max) {
          y(!1, u.message || `长度不能超过 ${u.max} 个字符`);
          return;
        }
      }
      if (u.pattern && !u.pattern.test(String(v))) {
        y(!1, u.message || "格式不正确");
        return;
      }
      if (u.validator) {
        u.validator(u, v, (O) => {
          y(!O, O == null ? void 0 : O.message);
        });
        return;
      }
      y(!0);
    }, F = () => {
      var v;
      o.value = "", s.value = "", i.value = !1;
      const u = (v = t == null ? void 0 : t.props) == null ? void 0 : v.model;
      u && l.prop && (u[l.prop] = void 0);
    }, b = () => {
      o.value = "", s.value = "", i.value = !1;
    }, P = {
      prop: l.prop || "",
      validate: A,
      resetField: F,
      clearValidate: b
    };
    return ke(() => {
      var u;
      l.prop && ((u = t == null ? void 0 : t.addFormItem) == null || u.call(t, P));
    }), gt(() => {
      var u;
      l.prop && ((u = t == null ? void 0 : t.removeFormItem) == null || u.call(t, P));
    }), de(() => l.error, (u) => {
      u ? (o.value = "error", s.value = u) : (o.value = "", s.value = "");
    }, { immediate: !0 }), e({
      validate: A,
      resetField: F,
      clearValidate: b
    }), (u, v) => (f(), g("div", {
      class: K(["lp-form-item", {
        "lp-form-item--error": o.value === "error",
        "lp-form-item--success": o.value === "success",
        "lp-form-item--validating": o.value === "validating",
        "lp-form-item--required": d.value,
        [`lp-form-item--${r.value}`]: r.value,
        [`lp-form-item--${a.value}`]: a.value
      }])
    }, [
      u.label || u.$slots.label ? (f(), g("label", {
        key: 0,
        class: "lp-form-item__label",
        style: he(p.value),
        for: _.value
      }, [
        ne(u.$slots, "label", {}, () => [
          Le(ee(u.label), 1)
        ]),
        c.value ? (f(), g("span", Vl, ee(c.value), 1)) : D("", !0)
      ], 12, Nl)) : D("", !0),
      L("div", Wl, [
        ne(u.$slots, "default"),
        ce(yt, { name: "lp-zoom-in-top" }, {
          default: xe(() => [
            $.value ? (f(), g("div", {
              key: 0,
              class: K(["lp-form-item__error", {
                "lp-form-item__error--inline": u.inlineMessage
              }])
            }, ee(s.value), 3)) : D("", !0)
          ]),
          _: 1
        })
      ])
    ], 2));
  }
});
let Hl = {
  install: (n) => {
    n.component(Ot.name, Ot), n.component(jt.name, jt);
  }
};
const Ul = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpForm: Ot,
  LpFormItem: jt,
  default: Hl
}, Symbol.toStringTag, { value: "Module" })), Gl = {
  key: 0,
  class: "lp-input__prepend"
}, Kl = {
  key: 0,
  class: "lp-input__prefix"
}, Yl = {
  key: 1,
  class: "lp-input__suffix"
}, Xl = {
  key: 1,
  class: "lp-input__append"
}, ql = {
  name: "LpInput",
  inheritAttrs: !1
}, ut = /* @__PURE__ */ le({
  ...ql,
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
    rows: { default: 2 },
    autosize: { type: [Boolean, Object], default: !1 },
    size: { default: "default" },
    validateEvent: { type: Boolean, default: !0 }
  },
  emits: ["update:modelValue", "input", "change", "focus", "blur", "clear", "keydown", "keyup"],
  setup(n, { expose: e, emit: l }) {
    const t = n, o = l, s = tl(), i = Ee("lpFormItem", null), r = B(), a = B(), d = B(!1), c = B(!1), $ = B(!1), p = B(!1), _ = I(() => t.size || (i == null ? void 0 : i.size) || "default"), h = I(() => t.type === "textarea"), w = I(() => !!t.autosize), A = I(() => {
      if (t.autosize && typeof t.autosize == "object")
        return t.autosize;
    }), x = (C) => {
      const ie = {};
      return C.split(";").forEach((pe) => {
        const [E, ...Z] = pe.split(":"), q = E == null ? void 0 : E.trim(), X = Z.join(":").trim();
        !q || !X || (ie[q] = X);
      }), ie;
    }, F = (C) => C ? Array.isArray(C) ? C.reduce((ie, pe) => (Object.assign(ie, F(pe)), ie), {}) : typeof C == "string" ? x(C) : typeof C == "object" ? { ...C } : {} : {}, b = I(() => F(s.style)), P = I(() => {
      const C = b.value.height;
      return C == null ? "" : String(C).trim();
    }), u = I(() => {
      const C = { ...b.value };
      return h.value && !w.value && delete C.height, C;
    }), v = I(() => {
      const { style: C, ...ie } = s;
      return ie;
    }), y = I(() => {
      if (!h.value)
        return p.value ? "text" : t.type;
    }), O = async () => {
      if (!h.value || !w.value) return;
      await me();
      const C = a.value;
      if (!C) return;
      C.style.height = "auto";
      const ie = C.scrollHeight, pe = A.value;
      if (!pe) {
        C.style.height = `${ie}px`;
        return;
      }
      const E = window.getComputedStyle(C), Z = Number.parseFloat(E.lineHeight || "0") || 21, q = Number.parseFloat(E.paddingTop || "0") + Number.parseFloat(E.paddingBottom || "0"), X = Number.parseFloat(E.borderTopWidth || "0") + Number.parseFloat(E.borderBottomWidth || "0");
      let ue = ie;
      if (pe.minRows && pe.minRows > 0 && (ue = Math.max(ue, pe.minRows * Z + q + X)), pe.maxRows && pe.maxRows > 0) {
        const V = pe.maxRows * Z + q + X;
        ue = Math.min(ue, V), C.style.overflowY = ie > V ? "auto" : "hidden";
      } else
        C.style.overflowY = "hidden";
      C.style.height = `${ue}px`;
    }, j = () => {
      const C = a.value;
      C && (C.style.height = "", C.style.overflowY = "");
    }, Y = async () => {
      if (!h.value || w.value || d.value) return;
      const C = P.value;
      if (!C) return;
      await me();
      const ie = r.value, pe = a.value;
      if (!ie || !pe) return;
      let E = C;
      if (/^\d+(\.\d+)?$/.test(E) && (E = `${E}px`), /px$/i.test(E)) {
        const Z = window.getComputedStyle(ie), q = Number.parseFloat(Z.borderTopWidth || "0"), X = Number.parseFloat(Z.borderBottomWidth || "0"), ue = Number.parseFloat(E), V = Math.max(0, ue - q - X);
        pe.style.height = `${V}px`;
      } else
        pe.style.height = E;
      d.value = !0;
    }, S = async () => {
      var C;
      await me(), (C = a.value) == null || C.focus();
    }, T = () => {
      var C;
      (C = a.value) == null || C.blur();
    }, W = () => {
      var C;
      (C = a.value) == null || C.select();
    }, H = () => {
      var C;
      o("update:modelValue", ""), o("input", ""), o("change", ""), o("clear"), t.validateEvent && ((C = i == null ? void 0 : i.validate) == null || C.call(i, "change"));
    }, N = (C) => {
      var E;
      const ie = C.target, { value: pe } = ie;
      $.value || (O(), o("update:modelValue", pe), o("input", pe), t.validateEvent && ((E = i == null ? void 0 : i.validate) == null || E.call(i, "input")));
    }, te = (C) => {
      var E;
      const ie = C.target, { value: pe } = ie;
      o("change", pe), t.validateEvent && ((E = i == null ? void 0 : i.validate) == null || E.call(i, "change"));
    }, k = (C) => {
      c.value = !0, o("focus", C);
    }, R = (C) => {
      var ie;
      c.value = !1, o("blur", C), t.validateEvent && ((ie = i == null ? void 0 : i.validate) == null || ie.call(i, "blur"));
    }, J = () => {
      c.value || S();
    }, ye = (C) => {
      C.stopPropagation(), H();
    }, re = () => {
      p.value = !p.value, S();
    }, ze = (C) => {
      o("keydown", C);
    }, Fe = (C) => {
      o("keyup", C);
    }, Ie = () => {
      $.value = !0;
    }, je = () => {
    }, Be = (C) => {
      $.value = !1, N(C);
    };
    return de(() => t.modelValue, () => {
      w.value && O();
    }), de([() => t.type, () => t.autosize, () => t.rows], () => {
      w.value ? O() : (j(), Y());
    }), de(() => s.style, () => {
      d.value = !1, w.value || (j(), Y());
    }), ke(() => {
      w.value ? O() : (j(), Y());
    }), e({
      focus: S,
      blur: T,
      select: W,
      clear: H,
      input: a
    }), (C, ie) => (f(), g("div", nl({ class: "lp-input" }, v.value, {
      style: u.value,
      class: {
        "lp-input--disabled": C.disabled,
        "lp-input--readonly": C.readonly,
        "lp-input--clearable": C.clearable && !C.disabled && !C.readonly,
        "lp-input--prefix": C.$slots.prefix || C.prefixIcon,
        "lp-input--suffix": C.$slots.suffix || C.suffixIcon || C.clearable || C.showPassword && !h.value,
        "lp-input--password": C.showPassword && !h.value,
        "lp-input--textarea": h.value,
        "lp-input--textarea-autosize": h.value && w.value,
        [`lp-input--${_.value}`]: _.value
      },
      onClick: J
    }), [
      C.$slots.prepend ? (f(), g("div", Gl, [
        ne(C.$slots, "prepend")
      ])) : D("", !0),
      L("div", {
        ref_key: "wrapperRef",
        ref: r,
        class: "lp-input__wrapper"
      }, [
        C.$slots.prefix || C.prefixIcon ? (f(), g("span", Kl, [
          ne(C.$slots, "prefix", {}, () => [
            C.prefixIcon ? (f(), g("i", {
              key: 0,
              class: K(C.prefixIcon)
            }, null, 2)) : D("", !0)
          ])
        ])) : D("", !0),
        (f(), ge(Xe(h.value ? "textarea" : "input"), {
          ref_key: "inputRef",
          ref: a,
          class: "lp-input__inner",
          type: y.value,
          value: C.modelValue,
          placeholder: C.placeholder,
          disabled: C.disabled,
          readonly: C.readonly,
          maxlength: C.maxlength,
          minlength: C.minlength,
          rows: h.value ? C.rows : void 0,
          autocomplete: C.autocomplete,
          name: C.name,
          form: C.form,
          tabindex: C.tabindex,
          onInput: N,
          onChange: te,
          onFocus: k,
          onBlur: R,
          onKeydown: ze,
          onKeyup: Fe,
          onCompositionstart: Ie,
          onCompositionupdate: je,
          onCompositionend: Be
        }, null, 40, ["type", "value", "placeholder", "disabled", "readonly", "maxlength", "minlength", "rows", "autocomplete", "name", "form", "tabindex"])),
        C.$slots.suffix || C.suffixIcon || C.clearable || C.showPassword && !h.value ? (f(), g("span", Yl, [
          ne(C.$slots, "suffix", {}, () => [
            C.clearable && !C.disabled && !C.readonly && C.modelValue ? (f(), g("i", {
              key: 0,
              class: "lp-input__clear lp-icon-circle-close",
              onClick: ye
            })) : D("", !0),
            C.showPassword && !h.value ? (f(), g("i", {
              key: 1,
              class: K(["lp-input__password", p.value ? "lp-icon-view" : "lp-icon-hide"]),
              onClick: re
            }, null, 2)) : D("", !0),
            C.suffixIcon ? (f(), g("i", {
              key: 2,
              class: K(C.suffixIcon)
            }, null, 2)) : D("", !0)
          ])
        ])) : D("", !0)
      ], 512),
      C.$slots.append ? (f(), g("div", Xl, [
        ne(C.$slots, "append")
      ])) : D("", !0)
    ], 16));
  }
}), Jl = { class: "lp-input-number__input-box" }, Zl = {
  key: 0,
  class: "lp-input-number__prepend"
}, Ql = ["value", "placeholder", "disabled", "readonly", "name", "autocomplete"], eo = {
  key: 1,
  class: "lp-input-number__append"
}, to = {
  key: 2,
  class: "lp-input-number__controls"
}, no = {
  name: "LpInputNumber"
}, At = /* @__PURE__ */ le({
  ...no,
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
    const t = n, o = l, s = Ee("lpFormItem", null), i = B(), r = B(null), a = B(!1), d = B(null), c = I(() => t.size || (s == null ? void 0 : s.size) || "default"), $ = I(() => {
      if (t.precision !== void 0)
        return t.precision;
      const k = w(t.step), R = w(t.modelValue);
      return Math.max(k, R);
    }), p = I(() => r.value !== null ? r.value : t.modelValue === void 0 || t.modelValue === null ? "" : typeof t.modelValue == "number" ? t.modelValue.toFixed($.value) : String(t.modelValue)), _ = I(() => t.disabled || t.max !== void 0 && t.modelValue !== void 0 && t.modelValue >= t.max), h = I(() => t.disabled || t.min !== void 0 && t.modelValue !== void 0 && t.modelValue <= t.min), w = (k) => {
      if (k === void 0) return 0;
      const R = k.toString(), J = R.indexOf(".");
      return J !== -1 ? R.length - J - 1 : 0;
    }, A = (k, R) => (R === void 0 && (R = $.value), parseFloat(Math.round(k * Math.pow(10, R)) / Math.pow(10, R) + "")), x = (k) => A(k, $.value), F = (k) => t.max !== void 0 && k > t.max ? t.max : t.min !== void 0 && k < t.min ? t.min : k, b = (k) => t.stepStrictly ? (w(t.step), Math.round(k / t.step) * t.step) : k, P = () => {
      var k;
      (k = i.value) == null || k.focus();
    }, u = () => {
      var k;
      (k = i.value) == null || k.blur();
    }, v = () => {
      var k;
      (k = i.value) == null || k.select();
    }, y = () => {
      if (_.value) return;
      const k = t.modelValue || 0, R = F(x(k + t.step));
      j(R);
    }, O = () => {
      if (h.value) return;
      const k = t.modelValue || 0, R = F(x(k - t.step));
      j(R);
    }, j = (k) => {
      var J;
      const R = t.modelValue;
      k !== void 0 && (k = b(x(k)), k = F(k)), R !== k && (r.value = null, o("update:modelValue", k), o("change", k, R), t.validateEvent && ((J = s == null ? void 0 : s.validate) == null || J.call(s, "change")));
    }, Y = (k) => {
      const J = k.target.value;
      if (r.value = J, J === "") {
        o("update:modelValue", void 0), o("input", void 0);
        return;
      }
      const ye = Number(J);
      isNaN(ye) || o("input", ye);
    }, S = () => {
      const k = r.value;
      if (k === null || k === "") {
        j(void 0);
        return;
      }
      const R = Number(k);
      if (isNaN(R)) {
        r.value = null;
        return;
      }
      j(R);
    }, T = (k) => {
      a.value = !0, o("focus", k);
    }, W = (k) => {
      var R;
      a.value = !1, r.value = null, o("blur", k), t.validateEvent && ((R = s == null ? void 0 : s.validate) == null || R.call(s, "blur"));
    }, H = (k) => {
      switch (k.key) {
        case "ArrowUp":
          k.preventDefault(), y();
          break;
        case "ArrowDown":
          k.preventDefault(), O();
          break;
      }
    }, N = (k, R) => {
      if (R.button !== 0) return;
      const J = k === "increase" ? y : O;
      J(), d.value = setTimeout(() => {
        const ye = setInterval(J, 100), re = () => {
          clearInterval(ye), document.removeEventListener("mouseup", re);
        };
        document.addEventListener("mouseup", re);
      }, 300);
    }, te = () => {
      d.value && (clearTimeout(d.value), d.value = null);
    };
    return de(
      () => t.modelValue,
      (k) => {
        r.value = null;
      },
      { immediate: !0 }
    ), e({
      focus: P,
      blur: u,
      select: v,
      increase: y,
      decrease: O
    }), (k, R) => (f(), g("div", {
      class: K(["lp-input-number", {
        "lp-input-number--disabled": k.disabled,
        "lp-input-number--controls-right": k.controlsPosition === "right",
        [`lp-input-number--${c.value}`]: c.value
      }])
    }, [
      k.controlsPosition !== "right" ? (f(), g("span", {
        key: 0,
        class: K(["lp-input-number__decrease", {
          "lp-input-number__decrease--disabled": h.value
        }]),
        onMousedown: R[0] || (R[0] = (J) => N("decrease", J)),
        onMouseup: te,
        onMouseleave: te
      }, R[4] || (R[4] = [
        L("i", { class: "lp-input-number__decrease-icon text" }, "-", -1)
      ]), 34)) : D("", !0),
      L("div", Jl, [
        k.$slots.prepend ? (f(), g("div", Zl, [
          ne(k.$slots, "prepend")
        ])) : D("", !0),
        L("input", {
          ref_key: "inputRef",
          ref: i,
          class: K(["lp-input-number__inner", {
            "lp-input-number__inner--with-prepend": k.$slots.prepend,
            "lp-input-number__inner--with-append": k.$slots.append
          }]),
          type: "text",
          value: p.value,
          placeholder: k.placeholder,
          disabled: k.disabled,
          readonly: k.readonly,
          name: k.name,
          autocomplete: k.autocomplete,
          onInput: Y,
          onChange: S,
          onFocus: T,
          onBlur: W,
          onKeydown: H
        }, null, 42, Ql),
        k.$slots.append ? (f(), g("div", eo, [
          ne(k.$slots, "append")
        ])) : D("", !0)
      ]),
      k.controlsPosition !== "right" ? (f(), g("span", {
        key: 1,
        class: K(["lp-input-number__increase", {
          "lp-input-number__increase--disabled": _.value
        }]),
        onMousedown: R[1] || (R[1] = (J) => N("increase", J)),
        onMouseup: te,
        onMouseleave: te
      }, R[5] || (R[5] = [
        L("i", { class: "lp-input-number__increase-icon text" }, "+", -1)
      ]), 34)) : D("", !0),
      k.controlsPosition === "right" ? (f(), g("div", to, [
        L("span", {
          class: K(["lp-input-number__increase", {
            "lp-input-number__increase--disabled": _.value
          }]),
          onMousedown: R[2] || (R[2] = (J) => N("increase", J)),
          onMouseup: te,
          onMouseleave: te
        }, R[6] || (R[6] = [
          L("i", { class: "lp-input-number__increase-icon" }, "▲", -1)
        ]), 34),
        L("span", {
          class: K(["lp-input-number__decrease", {
            "lp-input-number__decrease--disabled": h.value
          }]),
          onMousedown: R[3] || (R[3] = (J) => N("decrease", J)),
          onMouseup: te,
          onMouseleave: te
        }, R[7] || (R[7] = [
          L("i", { class: "lp-input-number__decrease-icon" }, "▼", -1)
        ]), 34)
      ])) : D("", !0)
    ], 2));
  }
});
let lo = {
  install: (n) => {
    n.component(ut.name, ut), n.component(At.name, At);
  }
};
const oo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Input: ut,
  InputNumber: At,
  default: lo
}, Symbol.toStringTag, { value: "Module" })), so = /* @__PURE__ */ le({
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
  emits: ["enter", "leave", "afterEnter", "afterLeave", "leaveCancelled"],
  setup(n, { emit: e }) {
    const l = e, t = (a) => {
      a instanceof HTMLElement && (a.getBoundingClientRect(), me(() => {
        const d = a.offsetHeight, c = a.offsetWidth;
        l("enter", a, {
          height: d,
          width: c
        });
      }));
    }, o = (a) => {
      a instanceof HTMLElement && (a.style.overflowY = "", a.style.overflowX = ""), l("afterEnter", a);
    }, s = (a) => {
    }, i = (a) => {
      l("afterLeave", a);
    }, r = (a) => {
      l("leaveCancelled", a);
    };
    return ke(() => {
    }), (a, d) => (f(), ge(yt, {
      name: n.disabled ? "" : n.name,
      onBeforeEnter: t,
      onAfterEnter: o,
      onBeforeLeave: s,
      onAfterLeave: i,
      onLeaveCancelled: r
    }, {
      default: xe(() => [
        ne(a.$slots, "default")
      ]),
      _: 3
    }, 8, ["name"]));
  }
});
function ao(n) {
  var j, Y, S;
  const e = B(null), l = B(null);
  n && (e.value = n.target, l.value = n.options);
  const t = B(null), o = B(null), s = o;
  o.value = ((Y = (j = l.value) == null ? void 0 : j.position) == null ? void 0 : Y.split("-")[0]) || null;
  const i = B(8), r = $e({
    x: 0,
    y: 0,
    width: 0,
    height: 0
  }), a = $e({
    position: "absolute",
    width: "14px",
    height: "14px",
    backgroundColor: ((S = l.value) == null ? void 0 : S.arrowColor) || "#fff",
    transform: "rotate(45deg)"
  }), d = B(!1);
  function c() {
    var H;
    if (!((H = l.value) != null && H.arrow) || !s.value) return;
    const T = l.value.arrowSize || i.value, [, W = "center"] = (l.value.position || "bottom-center").split("-");
    switch (Object.assign(a, {
      position: "absolute",
      width: `${T}px`,
      height: `${T}px`,
      transform: "rotate(45deg)",
      top: "",
      left: "",
      right: "",
      bottom: "",
      marginTop: "",
      marginLeft: "",
      marginRight: "",
      marginBottom: ""
    }), s.value) {
      case "top":
        if (a.bottom = `-${T / 2}px`, W === "start") {
          const N = r.width / 2;
          a.left = `${N}px`, a.marginLeft = `-${T / 2}px`;
        } else if (W === "end") {
          const N = r.width / 2;
          a.right = `${N}px`, a.marginRight = `-${T / 2}px`;
        } else
          a.left = "50%", a.marginLeft = `-${T / 2}px`;
        break;
      case "right":
        if (a.left = `-${T / 2}px`, W === "start") {
          const N = r.height / 2;
          a.top = `${N}px`, a.marginTop = `-${T / 2}px`;
        } else if (W === "end") {
          const N = r.height / 2;
          a.bottom = `${N}px`, a.marginBottom = `-${T / 2}px`;
        } else
          a.top = "50%", a.marginTop = `-${T / 2}px`;
        break;
      case "bottom":
        if (a.top = `-${T / 2}px`, W === "start") {
          const N = r.width / 2;
          a.left = `${N}px`, a.marginLeft = `-${T / 2}px`;
        } else if (W === "end") {
          const N = r.width / 2;
          a.right = `${N}px`, a.marginRight = `-${T / 2}px`;
        } else
          a.left = "50%", a.marginLeft = `-${T / 2}px`;
        break;
      case "left":
        if (a.right = `-${T / 2}px`, W === "start") {
          const N = r.height / 2;
          a.top = `${N}px`, a.marginTop = `-${T / 2}px`;
        } else if (W === "end") {
          const N = r.height / 2;
          a.bottom = `${N}px`, a.marginBottom = `-${T / 2}px`;
        } else
          a.top = "50%", a.marginTop = `-${T / 2}px`;
        break;
    }
  }
  function $(T) {
    return T.getBoundingClientRect();
  }
  function p(T, W, H, N) {
    switch (N) {
      case "start":
        return T;
      case "end":
        return T + W - H;
      case "center":
      default:
        return T + (W - H) / 2;
    }
  }
  function _(T, W, H, N) {
    switch (N) {
      case "start":
        return T;
      case "end":
        return T + W - H;
      case "center":
      default:
        return T + (W - H) / 2;
    }
  }
  function h(T, W, H, N, te, k) {
    let R = 0;
    return T < 0 && (R += Math.abs(T)), T + H > te && (R += T + H - te), W < 0 && (R += Math.abs(W)), W + N > k && (R += W + N - k), R;
  }
  function w(T, W, H, N, te) {
    const k = T.map((R) => {
      const J = h(
        R.x,
        R.y,
        W,
        H,
        N,
        te
      );
      return { ...R, overflow: J };
    });
    return k.sort((R, J) => R.overflow - J.overflow), k[0];
  }
  function A(T, W, H, N, te, k, R) {
    if (!te || !l.value) {
      console.error("calculateFollowPosition - missing container or options:", {
        container: !!te,
        options: !!l.value
      });
      return;
    }
    r.x = T + H / 2, r.y = W + N / 2, r.width = H, r.height = N;
    const J = te.getBoundingClientRect(), ye = J.width, re = J.height;
    if (ye === 0 || re === 0) {
      setTimeout(() => {
        A(T, W, H, N, te, k, R);
      }, 100);
      return;
    }
    const ze = window.innerWidth, Fe = window.innerHeight, [Ie, je = "center"] = l.value.position.split("-");
    let Be = [];
    const C = l.value.arrowSize || i.value, ie = l.value.arrow ? C : 0, pe = {
      left: {
        x: T - ye - ie,
        y: _(W, N, re, je)
      },
      right: {
        x: T + H + ie,
        y: _(W, N, re, je)
      },
      top: {
        x: p(T, H, ye, je),
        y: W - re - ie
      },
      bottom: {
        x: p(T, H, ye, je),
        y: W + N + ie
      }
    }, E = pe[Ie];
    E && Be.push({ direction: Ie, ...E });
    const Z = ["top", "right", "bottom", "left"];
    let q = Z.indexOf(Ie);
    if (q !== -1)
      for (let ue = 1; ue < Z.length; ue++) {
        const V = Z[(q + ue) % Z.length];
        Be.push({
          direction: V,
          ...pe[V]
        });
      }
    const X = w(Be, ye, re, ze, Fe);
    s.value = X.direction, c(), k.left = `${X.x}px`, k.top = `${X.y}px`, k.transform = "", k.right = "", k.bottom = "", R && R();
  }
  function x(T, W, H, N) {
    if (!l.value) return;
    const { clientX: te, clientY: k } = T;
    A(te, k, 0, 0, W, H, N);
  }
  function F(T, W, H) {
    if (!e.value) {
      console.error("updateFollowPosition - no follow target set");
      return;
    }
    if (typeof e.value != "string") {
      if (!l.value) {
        console.error("updateFollowPosition - missing follow options");
        return;
      }
      try {
        if (!(e.value instanceof HTMLElement)) {
          console.error("updateFollowPosition - target is not an HTMLElement:", e.value);
          return;
        }
        if (!document.body.contains(e.value)) {
          console.error("updateFollowPosition - target not in document"), O();
          return;
        }
        const N = $(e.value), { x: te, y: k, width: R, height: J } = N;
        A(te, k, R, J, T, W, H);
      } catch (N) {
        console.error("updateFollowPosition - error calculating position:", N);
      }
    }
  }
  function b(T, W, H) {
    var J;
    t.value && cancelAnimationFrame(t.value);
    const te = 1e3 / (((J = l.value) == null ? void 0 : J.fps) || 60);
    let k = 0;
    const R = (ye) => {
      t.value = requestAnimationFrame(R), !(ye - k < te) && (k = ye, F(T, W, H));
    };
    t.value = requestAnimationFrame(R);
  }
  let P = null, u = null, v = null;
  function y(T, W, H) {
    var N, te;
    return n ? (d.value = ((N = l.value) == null ? void 0 : N.arrow) || !1, (te = l.value) != null && te.arrow && (i.value = l.value.arrowSize || 8, c()), typeof e.value == "string" && e.value === "mouse" ? (P = (k) => x(k, T, W, H), window.addEventListener("mousemove", P)) : (F(T, W, H), l.value && l.value.fps ? b(T, W, H) : (u = () => {
      F(T, W, H);
    }, v = () => {
      F(T, W, H);
    }, window.addEventListener("resize", u), window.addEventListener("scroll", v, !0))), !0) : !1;
  }
  function O() {
    P && window.removeEventListener("mousemove", P), u && window.removeEventListener("resize", u), v && window.removeEventListener("scroll", v, !0), t.value && (cancelAnimationFrame(t.value), t.value = null);
  }
  return {
    followTarget: e,
    followOptions: l,
    followAnimationFrame: t,
    followDirection: o,
    arrowDirection: s,
    arrowSize: i,
    arrowStyle: a,
    targetCenter: r,
    showArrow: d,
    initFollow: y,
    updateFollowPosition: F,
    updateArrowStyle: c,
    cleanup: O
  };
}
function an(n) {
  return new Promise((e, l) => {
    let t;
    const o = () => {
      const s = n();
      s !== void 0 ? (cancelAnimationFrame(t), e(s)) : t = requestAnimationFrame(o);
    };
    t = requestAnimationFrame(o);
  });
}
function rn(n, e = "px") {
  return n ? typeof n == "string" ? n : `${n}${e}` : "";
}
function un(n, e) {
  console.warn(`[${n}] ${e}`);
}
function io(n, e) {
  throw new Error(`[${n}] ${e}`);
}
function st(n) {
  return typeof n == "number";
}
function ro(n) {
  return n !== null && typeof n == "object";
}
function jn(n, e) {
  let l = Array.isArray(n) ? [...n] : [n], t = !1, o = !1;
  const s = () => {
    const d = [];
    for (const c of l)
      typeof c == "string" ? document.querySelectorAll(c).forEach(($) => d.push($)) : c instanceof HTMLElement && d.push(c);
    return d;
  }, i = (d) => {
    t = s().some(($) => $.contains(d.target));
  }, r = (d) => {
    if (!o)
      return;
    const $ = s().some((p) => p.contains(d.target));
    (!t || !$) && e();
  }, a = () => {
    o && e();
  };
  return document.addEventListener("mousedown", i), document.addEventListener("click", r), window.addEventListener("blur", a), setTimeout(() => {
    o = !0;
  }, 0), {
    unbind: () => {
      document.removeEventListener("mousedown", i), document.removeEventListener("click", r), window.removeEventListener("blur", a);
    },
    appendSelector: (d) => {
      const c = Array.isArray(d) ? d : [d];
      l.push(...c);
    }
  };
}
const uo = {
  name: "lp-layer"
}, co = /* @__PURE__ */ le({
  ...uo,
  props: {
    position: { default: () => ({}) },
    zIndex: { default: 1e3 },
    transition: { default: "fade" },
    layerObj: {},
    follow: { default: () => ({
      target: null,
      options: {}
    }) },
    enableResizeTransition: { type: Boolean, default: !0 }
  },
  emits: ["after-leave", "close"],
  setup(n, { expose: e, emit: l }) {
    const t = l, o = En(), s = n, i = B(!1), r = B(null), a = B(null), d = B(!1), c = B(""), $ = B(!1), p = B(!1);
    let _ = !1;
    const h = $e({
      zIndex: s.zIndex,
      position: "fixed"
    }), w = $e({});
    function A() {
      c.value = `lp-${s.transition}`;
    }
    A();
    const { showArrow: x, arrowStyle: F, followDirection: b, initFollow: P, updateFollowPosition: u, cleanup: v } = ao(s.follow), y = I(() => !!(s.follow && s.follow.target)), O = I(() => {
      const E = b.value;
      return {
        closeing: p.value,
        "lp-layer--follow": y.value,
        [`lp-layer--follow-${E}`]: y.value && !!E
      };
    }), j = [];
    s.layerObj.options.useBodyScroll && (w["overflow-x"] = "auto", w["overflow-y"] = "auto");
    let Y = null;
    s.layerObj.getTransitionComponent() ? Y = s.layerObj.getTransitionComponent() : Y = so;
    let S = {
      /**
       * 是否过渡完成
       */
      enter: !1,
      width: 0,
      height: 0
    };
    const T = B(!1);
    function W(E) {
      if (E != null)
        return typeof E == "number" ? `${E}px` : E;
    }
    function H(E) {
      const { width: Z, height: q } = s.position || {}, X = W(Z), ue = W(q);
      E.width = X ?? "", E.height = ue ?? "";
    }
    function N(E) {
      S.enter = !0, S.width = E.offsetWidth, S.height = E.offsetHeight;
    }
    function te(E) {
      T.value = !0;
    }
    async function k(E, Z = "size") {
      return E.zIndex = "-100", E.opacity = "0", Object.assign(h, E), i.value = !0, Z == "size" ? (await an(() => {
        if (S.enter)
          return !0;
      }), S) : (_ = !0, d.value = !0, await me(), i.value = !1, await an(() => {
        if (!_)
          return !0;
      }), d.value = !1, await me(), console.log("预加载完成", S), S);
    }
    const R = B(!1);
    async function J() {
      var m, M;
      const { width: E, height: Z, x: q, y: X, reverse: ue } = s.position || {}, V = {
        zIndex: s.zIndex,
        position: "fixed",
        transform: "",
        top: "",
        left: "",
        right: "",
        bottom: "",
        width: "",
        height: ""
      };
      E != null && (V.width = typeof E == "number" ? `${E}px` : E), Z != null && (V.height = typeof Z == "number" ? `${Z}px` : Z);
      const We = ye();
      if ((m = s.layerObj.options) != null && m.group) {
        await k(V), await me(), (M = s.layerObj.options) != null && M.group && await s.layerObj.options.group.computePosition(V, s.layerObj), V.opacity = "1", V.zIndex = s.zIndex, Object.assign(h, V);
        return;
      }
      let Te = [];
      ue ? (q === "center" || q === void 0 ? (V.left = "50%", Te.push("translateX(-50%)")) : q === "right" ? V.right = "0" : typeof q == "number" ? V.right = `${q}px` : q ? V.right = q : V.left = "0", X === "center" || X === void 0 ? (V.top = "50%", Te.push("translateY(-50%)")) : X === "top" ? V.top = "50px" : X === "bottom" ? V.bottom = "0" : typeof X == "number" ? V.bottom = `${X}px` : X ? V.bottom = X : V.top = "0") : (q === "center" || q === void 0 ? (V.left = "50%", Te.push("translateX(-50%)")) : q === "right" ? V.right = "0" : typeof q == "number" ? V.left = `${q}px` : q ? V.left = q : V.left = "0", X === "center" || X === void 0 ? (V.top = "50%", Te.push("translateY(-50%)")) : X === "top" ? V.top = "50px" : X === "bottom" ? V.bottom = "50px" : typeof X == "number" ? V.top = `${X}px` : X ? V.top = X : V.top = "0"), Te.length > 0 && (V.transform = Te.join(" ")), We && (await k(V, "load"), Fe(V)), V.opacity = "1", V.zIndex = s.zIndex, Object.assign(h, V);
    }
    function ye() {
      var V;
      if ((V = s.layerObj.options) != null && V.group)
        return !0;
      const { width: E, height: Z, x: q, y: X, reverse: ue } = s.position || {};
      return E === "auto" || E === void 0 || E === null || Z == "auto" || Z === void 0 || Z === null || q == "center" || !q && q !== 0 || X == "center" || !X && X !== 0;
    }
    const re = B(null);
    async function ze() {
      if (s.follow && s.follow.target) {
        H(h), P(a.value, h, () => {
          $.value || ($.value = !0, h.opacity = "1", setTimeout(() => {
            d.value = !1;
          }, 50));
        });
        return;
      }
      await J(), $.value = !0;
    }
    function Fe(E, Z = !1) {
      var M, z;
      const q = (M = E.transform) == null ? void 0 : M.includes("translateX(-50%)"), X = (z = E.transform) == null ? void 0 : z.includes("translateY(-50%)");
      if (!Z && !q && !X || !S.width || !S.height) return;
      const ue = S.width, V = S.height, We = window.innerWidth, Te = window.innerHeight;
      let m = [];
      E.transform && E.transform.split(" ").forEach((U) => {
        U.includes("translate") || m.push(U);
      }), (q || Z) && (Math.abs(ue - We) <= 1 || ue >= We ? E.left = "0" : E.left = `calc(50% - ${Math.floor(ue / 2)}px)`), (X || Z) && (Math.abs(V - Te) <= 1 || V >= Te ? E.top = "0" : E.top = `calc(50% - ${Math.floor(V / 2)}px)`), m.length > 0 ? E.transform = m.join(" ") : E.transform = "";
    }
    const Ie = (E = "layer") => {
      i.value = !1, p.value = !0, s.follow && s.follow.target && v(), t("close"), j.forEach(({ event: Z, callback: q }) => {
        Z === "close" && q && q();
      });
    };
    function je() {
      if (_) {
        _ = !1;
        return;
      }
      p.value = !1, t("after-leave");
    }
    s.layerObj.setLayerInstance(o), B(!1), Ae("lp-layer:core", {
      on: (E, Z) => {
        j.push({
          event: E,
          callback: Z
        });
      },
      off: (E, Z) => {
        let q = j.findIndex((X) => X.event === E && X.callback === Z);
        q !== -1 && j.splice(q, 1);
      }
    }), Ae("layerInstance", o);
    function Be(E) {
      if (R.value) {
        console.log("已在进行resize操作，忽略此次调用");
        return;
      }
      R.value = !0;
      const Z = parseInt(h.width) || S.width, q = parseInt(h.height) || S.height, X = { ...h };
      X.transition = "width 0.3s ease, height 0.3s ease, left 0.3s ease, top 0.3s ease, right 0.3s ease, bottom 0.3s ease, transform 0.3s ease", console.log("resizeLayer", E);
      let ue, V;
      typeof E == "number" ? (ue = Math.round(Z * E), V = Math.round(q * E), X.width = `${ue}px`, X.height = `${V}px`) : (ue = E.width, V = E.height, X.width = `${ue}px`, X.height = `${V}px`), S.width, S.height, S.width = ue, S.height = V, Fe(X, !0), Object.assign(h, X), setTimeout(() => {
        h.transition = "", setTimeout(() => {
          R.value = !1;
        }, 50);
      }, 300);
    }
    function C() {
      if (R.value) {
        console.log("已在进行resize操作，忽略此次全屏调用");
        return;
      }
      R.value = !0, re.value || (re.value = {
        width: h.width,
        height: h.height,
        left: h.left,
        top: h.top,
        right: h.right,
        bottom: h.bottom,
        transform: h.transform
      });
      const E = { ...h };
      E.transition = "width 0.3s ease, height 0.3s ease, left 0.3s ease, top 0.3s ease, right 0.3s ease, bottom 0.3s ease, transform 0.3s ease", Object.assign(E, {
        width: "100vw",
        height: "100vh",
        left: "0",
        top: "0",
        right: "",
        bottom: "",
        transform: ""
      }), S.width, S.height, S.width = window.innerWidth, S.height = window.innerHeight, Object.assign(h, E), setTimeout(() => {
        h.transition = "", setTimeout(() => {
          R.value = !1;
        }, 50);
      }, 300);
    }
    function ie() {
      if (!re.value) return;
      if (R.value) {
        console.log("已在进行resize操作，忽略此次退出全屏调用");
        return;
      }
      R.value = !0;
      const E = { ...h };
      E.transition = "width 0.3s ease, height 0.3s ease, left 0.3s ease, top 0.3s ease, right 0.3s ease, bottom 0.3s ease, transform 0.3s ease";
      const Z = parseInt(re.value.width) || 0, q = parseInt(re.value.height) || 0;
      S.width = Z || 300, S.height = q || 200, Object.assign(E, re.value), Object.assign(h, E), re.value = null, setTimeout(() => {
        h.transition = "", setTimeout(() => {
          R.value = !1;
        }, 50);
      }, 300);
    }
    e({
      close: Ie,
      updatePosition: () => {
        s.follow ? u(a.value, h) : J();
      },
      changeContainerStyle: (E) => {
        Object.assign(h, E);
      },
      getContainerStyle: () => h,
      getInstance: () => o,
      // 全屏切换功能
      toggleFullscreen: () => {
        h.width === "100vw" && h.height === "100vh" ? ie() : C();
      },
      // 进入全屏
      useFullscreen: () => {
        C();
      },
      // 退出全屏
      exitFullscreen: () => {
        ie();
      },
      // 调整大小
      resizeLayer: (E) => {
        Be(E);
      }
    });
    async function pe() {
      await ze(), i.value = !0;
    }
    return ke(() => {
      if (pe(), s.layerObj.options.useOutsideClose) {
        let E = jn(a.value, () => {
          t("close"), E.unbind();
        });
      }
    }), qe(() => {
      s.follow && s.follow.target && (console.log("清理跟随关系"), v());
    }), (E, Z) => (f(), g("div", {
      class: K(["lp-layer", O.value]),
      style: he(h),
      ref_key: "containerRef",
      ref: a
    }, [
      (f(), ge(Xe(G(Y)), {
        name: c.value,
        disabled: d.value,
        onEnter: N,
        onAfterEnter: te,
        onAfterLeave: je
      }, {
        default: xe(() => [
          nt(L("div", {
            class: "lp-layer__box",
            ref_key: "layerRef",
            ref: r
          }, [
            s.follow && G(x) ? (f(), g("div", {
              key: 0,
              class: "lp-layer__arrow",
              style: he(G(F))
            }, null, 4)) : D("", !0),
            L("div", {
              class: "lp-layer__body",
              style: he(w)
            }, [
              ne(E.$slots, "default")
            ], 4)
          ], 512), [
            [Yt, i.value]
          ])
        ]),
        _: 3
      }, 40, ["name", "disabled"]))
    ], 6));
  }
}), po = { class: "lp-dialog" }, fo = { class: "lp-dialog__header flex align-center justify-between" }, ho = { class: "lp-dialog__title" }, vo = { class: "lp-dialog__body" }, mo = {
  key: 0,
  class: "lp-dialog__footer"
}, An = {
  __name: "dialog",
  props: {
    title: {
      type: String,
      default: ""
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
    const l = e, t = En();
    Ae("layerContainerInstance", t);
    const o = () => {
      l("confirm"), s();
    }, s = () => {
      l("close");
    };
    return (i, r) => (f(), g("div", po, [
      L("div", fo, [
        L("div", ho, ee(n.title), 1),
        n.showClose ? (f(), g("div", {
          key: 0,
          class: "lp-dialog__close",
          onClick: s
        }, [
          ce(G(_e), {
            class: "lp-dialog-close_icon",
            is: "close",
            size: "18px"
          })
        ])) : D("", !0)
      ]),
      L("div", vo, [
        ne(i.$slots, "default")
      ]),
      n.showFooter ? (f(), g("div", mo, [
        ne(i.$slots, "footer", {}, () => [
          L("button", {
            class: "btn btn-info",
            onClick: r[0] || (r[0] = (...a) => i.handleCancel && i.handleCancel(...a))
          }, "取消"),
          L("button", {
            class: "btn btn-primary",
            onClick: o
          }, "确定")
        ])
      ])) : D("", !0)
    ]));
  }
}, go = { class: "lp-drawer__header" }, yo = { class: "lp-drawer__title" }, _o = { class: "lp-drawer__body" }, bo = {
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
    const l = n, t = e, o = I(() => `lp-drawer--${l.direction}`), s = () => {
      t("close");
    };
    return (i, r) => (f(), g("div", {
      class: K(["lp-drawer", [o.value]])
    }, [
      L("div", go, [
        L("span", yo, ee(n.title), 1),
        n.showClose ? (f(), g("button", {
          key: 0,
          class: "lp-drawer__close",
          onClick: s
        }, "×")) : D("", !0)
      ]),
      L("div", _o, [
        ne(i.$slots, "default")
      ])
    ], 2));
  }
}, Mn = {
  appContext: null
}, wo = /* @__PURE__ */ le({
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
    const t = B(!1), o = l, s = Ee("lp-layer:core");
    function i() {
      t.value = !0;
    }
    s.on("close", i);
    function r(d) {
      o("click", d);
    }
    function a(d) {
      console.log("setEventsNone", d), t.value = d;
    }
    return e({
      setEventsNone: a
    }), gt(() => {
      s.off("close", i);
    }), (d, c) => (f(), g("div", {
      class: K(["lp-mask", { "pointer-events-none": t.value }]),
      style: he({ zIndex: n.zIndex }),
      onClick: r
    }, null, 6));
  }
});
let ct = !1, Pn = 0, He = [];
function $o() {
  if (ct) return;
  ct = !0, Pn = window.scrollY || document.documentElement.scrollTop;
  const n = Co();
  document.body.classList.add("lp-layer-lock-scroll"), document.body.style.width = `calc(100vw - ${n}px)`;
}
function Co() {
  return window.innerWidth - document.documentElement.clientWidth;
}
function ko() {
  ct && (ct = !1, document.body.classList.remove("lp-layer-lock-scroll"), document.body.style.width = "", window.scrollTo(0, Pn));
}
function So(n) {
  He.push(n), He.some((l) => In(l)) && $o();
}
function xo(n) {
  let e = He.indexOf(n);
  e !== -1 && He.splice(e, 1), !He.some((o) => In(o)) && ko();
}
function In(n) {
  return n.options.lockBodyScroll !== null ? !!n.options.lockBodyScroll : !!n.options.useMask;
}
function To() {
  return He;
}
function it(n) {
  return He.filter((e) => e.options.group === n);
}
class Bn {
  /**
   * 管理组构造函数
   * @param mode 管理组模式 x | y | xy
   */
  constructor(e = "x") {
    /**
     * 管理组模式
     * x: 水平管理组
     * y: 垂直管理组
     * xy: 水平和垂直管理组(排列一行满了，自动换行)
     */
    se(this, "mode", "x");
    /**
     * 管理组内部对齐方式(类似flex布局的justify-content)
     * start: 左对齐
     * center: 居中对齐
     * end: 右对齐
     * null: 不进行对齐
     */
    se(this, "justifyContent", "start");
    /**
     * 管理组内部对齐方式(类似flex布局的align-items)
     * start: 顶部对齐
     * center: 居中对齐
     * end: 底部对齐
     */
    se(this, "alignItems", "start");
    /**
     * 管理组内部边距
     * 控制弹出层在可渲染区域内
     */
    se(this, "paddingSize", 10);
    /**
     * 层与层之间的间距
     * 两个层之间的间距
     */
    se(this, "spaceSize", 16);
    /**
     * 位置过渡动画时长（毫秒）
     */
    se(this, "transitionDuration", 300);
    /**
     * 位置过渡动画函数
     */
    se(this, "transitionTimingFunction", "ease");
    /**
     * xy模式下每行的最大宽度
     */
    se(this, "rowMaxWidth", 0);
    /**
     * xy模式下单个项的标准宽度（0表示自动）
     */
    se(this, "itemWidth", 0);
    /**
     * xy模式下每行最大项数
     */
    se(this, "itemsPerRow", 0);
    se(this, "groupElement", null);
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
   * TODO 计算层的位置
   * @param containerStyle 容器样式
   * @param layer 层对象
   */
  computePosition(e, l) {
    return new Promise((t, o) => {
      if (l.options.follow && l.options.follow.target)
        return;
      this.renderGroupElement(), this.initGroupContainerStyle(), it(this).filter((a) => a.layerElement && !a.closing);
      let i = l.getLayerInfo(), r = this.getOrCreatePlaceholder(l);
      r.style.width = `${i.width}px`, r.style.height = `${i.height}px`, this.mode === "xy" && this.itemWidth > 0 && (r.style.width = `${this.itemWidth}px`), requestAnimationFrame(() => {
        const a = r.getBoundingClientRect();
        e.top = `${a.top}px`, e.left = `${a.left}px`, this.mode !== "x" && (e.width = `${i.width}px`), this.mode !== "y" && (e.height = `${i.height}px`), l.layerElement && Object.entries(e).forEach(([d, c]) => {
          c != null && (l.layerElement.style[d] = c);
        }), this.updateLayersPosition(), t(this);
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
    const l = it(this).filter((t) => t.layerElement && !t.closing);
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
            const i = s.getBoundingClientRect(), r = t.layerElement.style;
            let a = Object.assign({}, {
              transform: r.transform,
              transition: r.transition,
              top: r.top,
              left: r.left,
              right: r.right,
              bottom: r.bottom,
              width: r.width,
              height: r.height
            });
            a.transition = `left ${this.transitionDuration}ms ${this.transitionTimingFunction}, top ${this.transitionDuration}ms ${this.transitionTimingFunction}`, a.top = `${i.top}px`, a.left = `${i.left}px`;
            const d = t.getLayerInstance();
            d && d.exposed && d.exposed.changeContainerStyle(a);
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
    return it(this).filter((l) => l.layerElement && !l.closing);
  }
}
let Eo = 1e3;
const Lo = {
  dialog: An,
  drawer: bo
  // 可以在这里添加更多容器类型
};
class Me {
  constructor() {
    /**
     * 层id
     */
    se(this, "id", "");
    se(this, "layerInstance", null);
    /**
     * 组重置状态
     * @todo 用于在层关闭时, 组内其它层需要重新计算位置
     */
    se(this, "groupResetStatus", 0);
    se(this, "options");
    se(this, "layerVnode", null);
    se(this, "contentVnode", null);
    se(this, "maskLayer", null);
    se(this, "closing", !1);
    se(this, "layerZIndex", 0);
    se(this, "maskZIndex", 0);
    se(this, "containerEl", null);
    se(this, "layerElement", null);
    se(this, "createTime", 0);
    this.options = {
      component: null,
      useMask: !1,
      useOutsideClose: !1,
      useBodyScroll: !0,
      transition: "fade",
      drawerDirection: "right",
      events: {},
      follow: {
        target: null,
        options: { position: "bottom-center" }
      },
      lockBodyScroll: null,
      sourceInstance: null
    };
  }
  // 为了兼容旧代码，提供vnode属性
  get vnode() {
    return this.layerVnode;
  }
  static src(e) {
    const l = new Me();
    return l.options.component = e, l.id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15), l.createTime = Date.now(), l;
  }
  /**
   * 来源组件实例的上下文
   * @todo 实现读取组件的`provide`
   * @param instance 组件实例
   * @returns 
   */
  source(e) {
    return this.options.sourceInstance = e, this;
  }
  /**
   * 解析应用上下文
   * @returns 应用上下文或undefined
   */
  resolveAppContext() {
    const e = this.options.sourceInstance, l = (e == null ? void 0 : e.appContext) || Mn.appContext;
    if (!l)
      return;
    if (!e) return l;
    const t = e.provides;
    return {
      ...l,
      provides: t || l.provides
    };
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
    return typeof e == "string" ? this.options.containerComponent = Lo[e] || null : this.options.containerComponent = e, this.options.containerProps = l, this;
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
  /**
   * 设置是否开启遮罩层
   * @param use 是否开启(true时开启，false时关闭)
   * @param options 遮罩层配置 
   * - close: 是否点击遮罩层关闭层
   * @returns 
   */
  useMask(e = !0, l = {}) {
    return this.options.useMask = e, this.options.maskOptions = Object.assign({
      close: !0
    }, l), this;
  }
  /**
   * 开启外部点击事件关闭层
   */
  useOutsideClose() {
    return this.options.useOutsideClose = !0, this;
  }
  /**
   * 设置是否开启lp-layer-body滚动
   * @param use 是否开启(true时开启，false时关闭)
   * @returns 
   * 
   * - 默认开启
   */
  useBodyScroll(e = !0) {
    return this.options.useBodyScroll = e, this;
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
   * @example 'fade' | 'zoom' | 'slide-top' | 'slide-bottom' | 'slide-left' | 'slide-right' | 'expand' | 'expand-xy' | 'drawer-right' | 'drawer-left' | 'drawer-top' | 'drawer-bottom'
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
      throw console.error("Layer.follow - 无效的目标元素类型，必须是HTMLElement或字符串"), new Error("目标元素类型必须是HTMLElement或字符串");
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
  getContentComponent() {
    return sl(this.options.component);
  }
  /**
   * 打开弹出层
   * @param position 弹出层位置
   * @returns 
   */
  async open(e = {}) {
    var a;
    this.closing = !1, this.options.follow && this.options.follow.target ? this.options.position = {
      width: e.width ?? "auto",
      height: e.height ?? "auto"
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
      onLayerResize: (d) => {
        console.log("缩放", d), this.layerInstance && this.layerInstance.exposed && this.layerInstance.exposed.resizeLayer(d);
      }
    };
    this.layerZIndex = this.options.zIndex || Eo++, this.maskZIndex = this.layerZIndex - 1;
    const t = (d = "layer") => {
      this.closing || (this.hide(d), this.options.events.close && this.options.events.close());
    }, o = this.getContentComponent();
    let s = ce(o, {
      modelValue: this.options.model,
      ...this.options.props,
      "onUpdate:modelValue": (d) => {
        this.options.model && (this.options.model = d);
      },
      onClose: () => {
        t("content");
      },
      // 添加弹出层事件监听处理
      ...l,
      // 添加事件监听处理
      ...Object.keys(this.options.events).reduce((d, c) => (c !== "close" && (d[`on${c.charAt(0).toUpperCase() + c.slice(1)}`] = (...$) => {
        this.options.events[c] && this.options.events[c](...$);
      }), d), {})
    }), i = null;
    if (this.options.containerComponent) {
      const d = ((a = this.options.containerComponent) == null ? void 0 : a.default) || this.options.containerComponent, c = {
        ...this.options.containerProps,
        modelValue: this.options.containerModel,
        onClose: () => {
          t("container");
        },
        "onUpdate:modelValue": ($) => {
          this.options.containerModel && (this.options.containerModel = $);
        }
      };
      i = ce(d, c, {
        default: () => [s]
      });
    } else
      i = s;
    return this.layerVnode = ce(co, {
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
      follow: this.options.follow
    }, {
      default: () => [i]
    }), this.contentVnode = s, this.layerVnode.appContext = this.resolveAppContext(), this.containerEl = this.getContainer(), this.options.useMask && this.createMask(t), await me(), nn(this.layerVnode, this.containerEl), this.layerElement = this.containerEl.firstElementChild, this.getAppendTo().appendChild(this.layerElement), So(this), this;
  }
  /**
   * 显示层
   * @todo open方法代理
   * @param position 位置
   * @returns 
   */
  async show(e = {}) {
    return await this.open(e);
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
    this.removeElements(), xo(this);
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
    this.maskLayer = Me.src(wo).props({
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
      this.containerEl && nn(null, this.containerEl), this.layerElement && this.layerElement.parentNode && this.layerElement.parentNode.removeChild(this.layerElement), this.layerVnode = null, this.containerEl = null, this.layerElement = null;
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
    if (!this.layerElement) return { width: 0, height: 0, x: 0, y: 0 };
    const e = this.layerElement.getBoundingClientRect();
    return {
      width: e.width,
      height: e.height,
      x: this.layerElement.offsetLeft,
      y: this.layerElement.offsetTop
    };
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
  close(e = !1) {
    this.hide();
  }
  /**
   * 关闭所有层
   * @param check 过滤方法
   */
  static closeAll(e = null) {
    To().forEach((t) => {
      e && !e(t) || t.close();
    });
  }
  /**
   * 关闭组内所有层
   * @param group 组
   */
  static closeByGroup(e) {
    it(e).forEach((t) => {
      t.close();
    });
  }
  // !SECTION
}
const Oo = { class: "lp-toast__content" }, jo = {
  key: 0,
  class: "lp-toast__icon"
}, Ao = { class: "lp-toast__message" }, Mo = /* @__PURE__ */ le({
  __name: "toast",
  props: {
    message: { default: "" },
    duration: { default: 3e3 },
    type: { default: "info" }
  },
  emits: ["close", "shown"],
  setup(n, { emit: e }) {
    const l = n, t = {
      primary: "info-fill",
      success: "success-fill",
      warning: "warning-fill",
      danger: "error-fill",
      info: "info-fill"
    }, o = e;
    let s, i = l.duration, r = 0;
    const a = () => {
      s !== void 0 && (window.clearTimeout(s), s = void 0);
    }, d = (p) => {
      if (a(), p <= 0) {
        o("close");
        return;
      }
      r = Date.now(), s = window.setTimeout(() => {
        o("close");
      }, p);
    }, c = () => {
      if (l.duration <= 0 || s === void 0) return;
      const p = Date.now() - r;
      i = i - p, i < 500 && (i = 500), a();
    }, $ = () => {
      l.duration <= 0 || s !== void 0 || d(i);
    };
    return ke(() => {
      o("shown"), l.duration > 0 && d(l.duration);
    }), qe(() => {
      a();
    }), (p, _) => (f(), g("div", {
      class: K(["lp-toast", [`lp-toast-${p.type}`]]),
      onMouseenter: c,
      onMouseleave: $
    }, [
      L("div", Oo, [
        t[p.type] ? (f(), g("div", jo, [
          ce(G(_e), {
            is: t[p.type],
            size: "16",
            color: `var(--lp-color-${p.type})`
          }, null, 8, ["is", "color"])
        ])) : D("", !0),
        L("div", Ao, [
          ne(p.$slots, "default", {}, () => [
            Le(ee(p.message), 1)
          ])
        ])
      ])
    ], 34));
  }
}), Rn = new Bn("y");
Rn.space(20).padding(20).align("start", "center");
async function qt(n, e) {
  return e = {
    message: n || "Toast",
    duration: (e == null ? void 0 : e.duration) || 2e3,
    type: (e == null ? void 0 : e.type) || "info"
  }, Me.src(Mo).group(Rn).props({
    message: e == null ? void 0 : e.message,
    duration: e == null ? void 0 : e.duration,
    type: e == null ? void 0 : e.type
  }).transition("slide-top").show({
    width: "auto",
    height: "auto"
  });
}
async function zn(n) {
  const e = typeof n == "string" ? { message: n } : n;
  return new Promise(async (l) => {
    const t = await import("./confirm-BGvYs8XV.js"), o = $e({
      message: e.message || "确认执行此操作？"
    }), s = {
      onConfirm: () => {
        i.hide(), l(!0);
      },
      onCancel: () => {
        i.hide(), l(!1);
      }
    }, i = await Me.src(t.default).useMask().container("dialog").containerModel({
      title: e.title || "确认",
      showClose: !0
    }).model(o).props(s).show();
  });
}
async function Fn(n) {
  const e = typeof n == "string" ? { message: n } : n;
  return new Promise(async (l) => {
    const t = await import("./alert-CItR2_B_.js"), o = $e({
      message: e.message || ""
    }), s = {
      onClose: () => {
        i.hide(), l();
      }
    }, i = await Me.src(t.default).useMask().useBodyScroll(!1).container("dialog").containerModel({
      title: e.title || "提示",
      showClose: !0
    }).model(o).props(s).show();
  });
}
let Po = {
  install: (n) => {
    n.config.globalProperties.$toast = qt, n.config.globalProperties.$confirm = zn, n.config.globalProperties.$alert = Fn, n.config.globalProperties.$layer = Me;
  }
};
const Io = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DialogContainer: An,
  Layer: Me,
  LayerGroup: Bn,
  alert: Fn,
  confirm: zn,
  default: Po,
  toast: qt,
  useOutsideClick: jn
}, Symbol.toStringTag, { value: "Module" })), Bo = {
  name: "lp-layout"
}, Ro = /* @__PURE__ */ le({
  ...Bo,
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
    const e = n, l = I(() => {
      const o = [];
      return e.template ? o.push("lp-grid-layout", e.template) : e.type === "grid" ? (o.push("lp-grid"), e.cols && (typeof e.cols == "number" ? o.push(`cols-${e.cols}`) : o.push(`cols-${e.cols}`)), e.rows && (typeof e.rows == "number" ? o.push(`rows-${e.rows}`) : typeof e.rows == "string" && o.push(`rows-${e.rows}`)), e.gap !== void 0 && typeof e.gap == "number" && o.push(`gap-${e.gap}`), e.gapX !== void 0 && typeof e.gapX == "number" && o.push(`gap-x-${e.gapX}`), e.gapY !== void 0 && typeof e.gapY == "number" && o.push(`gap-y-${e.gapY}`), e.justifyContent && o.push(`justify-${e.justifyContent}`), e.alignContent && o.push(`align-${e.alignContent}`), e.justifyItems && o.push(`justify-items-${e.justifyItems}`), e.alignItems && o.push(`items-${e.alignItems}`), e.height === "100vh" ? o.push("h-screen") : e.height === "100%" && o.push("h-full"), e.minHeight === "100vh" ? o.push("min-h-screen") : e.minHeight === "100%" && o.push("min-h-full"), e.width === "100%" ? o.push("w-full") : e.width === "100vw" && o.push("w-screen")) : (o.push("lp-layout"), e.direction && o.push(e.direction), e.wrap && o.push("wrap"), e.justifyContent && e.alignItems && o.push(`${e.justifyContent}-${e.alignItems}`)), o;
    }), t = I(() => {
      const o = {};
      return e.gridTemplateColumns && (o.gridTemplateColumns = e.gridTemplateColumns), e.gridTemplateRows && (o.gridTemplateRows = e.gridTemplateRows), e.gridTemplateAreas && (o.gridTemplateAreas = e.gridTemplateAreas), e.gap && typeof e.gap == "string" && (o.gap = e.gap), e.gapX && typeof e.gapX == "string" && (o.columnGap = e.gapX), e.gapY && typeof e.gapY == "string" && (o.rowGap = e.gapY), e.height && typeof e.height == "string" && !["100vh", "100%"].includes(e.height) ? o.height = e.height : typeof e.height == "number" && (o.height = `${e.height}px`), e.width && typeof e.width == "string" && !["100%", "100vw"].includes(e.width) ? o.width = e.width : typeof e.width == "number" && (o.width = `${e.width}px`), e.minHeight && typeof e.minHeight == "string" && !["100vh", "100%"].includes(e.minHeight) ? o.minHeight = e.minHeight : typeof e.minHeight == "number" && (o.minHeight = `${e.minHeight}px`), e.minWidth && typeof e.minWidth == "string" ? o.minWidth = e.minWidth : typeof e.minWidth == "number" && (o.minWidth = `${e.minWidth}px`), o;
    });
    return (o, s) => (f(), g("div", {
      class: K(l.value),
      style: he(t.value)
    }, [
      ne(o.$slots, "default")
    ], 6));
  }
}), zo = {
  name: "lp-grid-item"
}, Fo = /* @__PURE__ */ le({
  ...zo,
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
    const e = n, l = I(() => {
      const o = ["lp-grid-item"];
      return e.colSpan && (typeof e.colSpan == "number" ? o.push(`col-span-${e.colSpan}`) : o.push(`col-span-${e.colSpan}`)), e.rowSpan && (typeof e.rowSpan == "number" ? o.push(`row-span-${e.rowSpan}`) : o.push(`row-span-${e.rowSpan}`)), e.colStart && o.push(`col-start-${e.colStart}`), e.colEnd && o.push(`col-end-${e.colEnd}`), e.rowStart && o.push(`row-start-${e.rowStart}`), e.rowEnd && o.push(`row-end-${e.rowEnd}`), e.justifySelf && o.push(`justify-self-${e.justifySelf}`), e.alignSelf && o.push(`align-self-${e.alignSelf}`), o;
    }), t = I(() => {
      const o = {};
      return e.area && (o.gridArea = e.area), e.gridColumn && (o.gridColumn = e.gridColumn), e.gridRow && (o.gridRow = e.gridRow), o;
    });
    return (o, s) => (f(), g("div", {
      class: K(l.value),
      style: he(t.value)
    }, [
      ne(o.$slots, "default")
    ], 6));
  }
});
let No = {
  install: (n) => {
  }
};
const Vo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GridItem: Fo,
  Layout: Ro,
  default: No
}, Symbol.toStringTag, { value: "Module" })), Wo = { class: "item" }, Do = {
  name: "lp-list"
}, cn = /* @__PURE__ */ Object.assign(Do, {
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
    return (e, l) => (f(), g("div", {
      class: K(["list", { "list-x": n.listX }])
    }, [
      (f(!0), g(ve, null, we(n.data, (t, o) => (f(), g("div", Wo, [
        ne(e.$slots, "default", { row: t })
      ]))), 256))
    ], 2));
  }
});
let Ho = {
  install: (n) => {
    n.component(cn.name, cn);
  }
};
const Uo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ho
}, Symbol.toStringTag, { value: "Module" }));
let Go = {
  install: (n) => {
    n.component(et.name, et);
  }
};
const Ko = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpLoading: et,
  default: Go
}, Symbol.toStringTag, { value: "Module" })), Yo = { class: "lp-tree__item-box flex items-center justify-between" }, Xo = { class: "lp-tree__item-pre flex items-center" }, qo = { class: "lp-tree__item-cols flex" }, Jo = {
  key: 0,
  class: "lp-tree__item-children"
}, Zo = {
  name: "LpTreeItem"
}, Qo = /* @__PURE__ */ le({
  ...Zo,
  props: {
    item: {},
    itemSlot: {},
    itemFields: {},
    level: { default: 1 }
  },
  setup(n) {
    const e = n, l = Ee("treeColumns", B([])), t = Ee("treeHasColumns", B(!1)), o = Ee("treeSlots", {}), s = I(() => ({
      left: t.value ? "0px" : void 0
    })), i = Ee("treeRoot", {
      onNodeSelect: (w) => {
      },
      selectOptions: {}
    });
    function r(w) {
      return Array.isArray(w.children) && w.children.length > 0;
    }
    function a(w) {
      var A;
      return !!(r(w) || (A = i.hasLoad) != null && A.value && !w.noChildren);
    }
    function d(w) {
      var A;
      return ((A = i.selectOptions) == null ? void 0 : A.foldIcon) === !1 ? !1 : a(w);
    }
    function c(w) {
      var x, F;
      return !(((x = i.selectOptions) == null ? void 0 : x.checkbox) === !1 || (((F = i.selectOptions) == null ? void 0 : F.parentSelect) ?? 1) === 0 && r(w));
    }
    function $(w) {
      if (a(w)) {
        _(w);
        return;
      }
      h(w);
    }
    function p(w) {
      (Array.isArray(w.children) ? w.children : []).forEach((x) => {
        Array.isArray(x.children) && x.children.length > 0 && (x.expanded = !0, p(x));
      });
    }
    async function _(w) {
      var x;
      if (w.loading || (!r(w) && i.loadChildren && !w.loaded && !w.noChildren && await i.loadChildren(w), w.noChildren)) return;
      w.expanded = !w.expanded;
      const A = (x = i.expand) == null ? void 0 : x.deepExpandAll;
      w.expanded && typeof A == "number" && A > 0 && e.level === A && p(w);
    }
    async function h(w) {
      w.disabled || await i.onNodeSelect(w);
    }
    return (w, A) => {
      const x = ln("lp-checkbox"), F = ln("lp-tree-item");
      return nt((f(), g("div", {
        class: K(["lp-tree__item", { "is-pending": w.item.pending }])
      }, [
        L("div", Yo, [
          L("div", {
            class: K(["lp-tree__item-content flex align-center", [{ active: w.item.selected === 1 }, G(t) && "sticky"]]),
            style: he(s.value),
            onClick: A[4] || (A[4] = (b) => $(w.item))
          }, [
            L("div", Xo, [
              c(w.item) ? (f(), g("div", {
                key: 0,
                class: "lp-tree__item-checkbox",
                onClick: A[1] || (A[1] = Re(() => {
                }, ["stop"]))
              }, [
                ce(x, {
                  value: !!w.item.selected,
                  disabled: w.item.disabled,
                  midway: w.item.selected === 2,
                  onClick: A[0] || (A[0] = (b) => h(w.item))
                }, null, 8, ["value", "disabled", "midway"])
              ])) : D("", !0),
              w.item.loading ? (f(), g("div", {
                key: 1,
                class: "lp-tree__item-icon",
                onClick: A[2] || (A[2] = Re(() => {
                }, ["stop"]))
              }, [
                ce(et, { size: "mini" })
              ])) : d(w.item) ? (f(), g("div", {
                key: 2,
                class: "lp-tree__item-icon",
                onClick: A[3] || (A[3] = Re((b) => _(w.item), ["stop"]))
              }, [
                ce(G(_e), {
                  is: "right",
                  class: K(["lp-tree__item-icon-right", { active: w.item.expanded }])
                }, null, 8, ["class"])
              ])) : D("", !0)
            ]),
            w.itemSlot ? (f(), ge(Xe(w.itemSlot), {
              key: 0,
              item: w.item
            }, null, 8, ["item"])) : (f(), g(ve, { key: 1 }, [
              Le(ee(w.item.data[w.itemFields.title]), 1)
            ], 64))
          ], 6),
          L("div", qo, [
            (f(!0), g(ve, null, we(G(l), (b) => (f(), g("div", {
              key: b.name,
              class: K(["lp-tree__item-col", `lp-tree__item-col-${b.name}`, b.fixed && `sticky fixed-${b.fixed}`]),
              style: he({ width: b.computedWidth || b.computedMinWidth, minWidth: b.computedWidth || b.computedMinWidth, left: b.computedStickyLeft, right: b.computedStickyRight })
            }, [
              G(o)[`column.${b.name}`] ? (f(), ge(Xe(G(o)[`column.${b.name}`]), {
                key: 0,
                item: w.item
              }, null, 8, ["item"])) : (f(), g(ve, { key: 1 }, [
                Le(ee(w.item.data[b.name]), 1)
              ], 64))
            ], 6))), 128))
          ])
        ]),
        w.item.expanded && w.item.children ? (f(), g("div", Jo, [
          (f(!0), g(ve, null, we(w.item.children, (b) => (f(), ge(F, {
            key: b.data[w.itemFields.value] || b.data.id,
            item: b,
            itemSlot: w.itemSlot,
            itemFields: w.itemFields,
            level: (e.level ?? 1) + 1
          }, null, 8, ["item", "itemSlot", "itemFields", "level"]))), 128))
        ])) : D("", !0)
      ], 2)), [
        [Yt, !w.item.hidden]
      ]);
    };
  }
});
var Jt = /* @__PURE__ */ ((n) => (n.STRING = "string", n.ARRAY = "array", n.OBJECT = "object", n.AUTO = "auto", n))(Jt || {});
class Nn {
  constructor(e = {}) {
    se(this, "selecteds", B([]));
    se(this, "limit");
    se(this, "valueType");
    se(this, "valueField");
    se(this, "labelField");
    this.limit = e.limit ?? 1, this.valueType = e.valueType ?? "auto", this.valueField = e.valueField ?? "value", this.labelField = e.labelField ?? "label";
  }
  /**
   * 设置已选数据
   */
  setSelecteds(e) {
    this.selecteds.value = e;
  }
  /**
   * 清空已选
   */
  clear() {
    this.selecteds.value = [];
  }
  /**
   * 判断是否选中
   */
  isSelected(e) {
    return this.selecteds.value.some((l) => l[this.valueField] === e[this.valueField]);
  }
  /**
   * 选择/取消选择
   * @param item 选项对象
   * @returns SelectResult
   */
  select(e) {
    if (this.isSelected(e)) {
      const t = this.selecteds.value.findIndex((o) => o[this.valueField] === e[this.valueField]);
      return t > -1 && this.selecteds.value.splice(t, 1), { success: !0, type: "remove", selected: !1 };
    } else
      return this.limit > 1 && this.selecteds.value.length >= this.limit ? { success: !1, type: "limit", selected: !1 } : (this.limit === 1 ? this.selecteds.value = [e] : this.selecteds.value.push(e), { success: !0, type: "add", selected: !0 });
  }
  /**
   * 根据 modelValue 刷新 selecteds
   * @param modelValue v-model 的值
   * @param findOption 根据 value 查找选项对象的方法
   */
  flush(e, l) {
    this.selecteds.value = [];
    const t = l;
    if (this.limit === 1)
      if (this.valueType === "object") {
        const o = e;
        let s;
        o && typeof o == "object" ? s = o[this.valueField] : s = o;
        const i = t(s);
        this.selecteds.value = i ? [i] : [];
      } else {
        const o = t(e);
        this.selecteds.value = o ? [o] : [];
      }
    else {
      let o = [];
      this.valueType === "object" ? o = (Array.isArray(e) ? e : []).map((i) => i && typeof i == "object" ? i[this.valueField] : i).filter((i) => i != null) : this.valueType === "string" || typeof e == "string" ? o = (typeof e == "string" ? e : "").split(",").map((i) => i.trim()).filter(Boolean) : Array.isArray(e) ? o = e : typeof e == "string" ? o = e.split(",").map((s) => s.trim()).filter(Boolean) : o = [], this.selecteds.value = o.map((s) => t(s)).filter((s) => !!s);
    }
  }
  /**
   * 获取 modelValue
   */
  getModelValue() {
    if (this.limit === 1)
      return this.valueType === "object" ? this.selecteds.value.length > 0 ? this.selecteds.value[0] : {} : this.selecteds.value.length > 0 ? this.selecteds.value[0][this.valueField] : "";
    if (this.valueType === "array" || this.valueType === "auto")
      return this.selecteds.value.map((e) => e[this.valueField]);
    if (this.valueType === "string")
      return this.selecteds.value.map((e) => e[this.valueField]).join(",");
    if (this.valueType === "object")
      return this.selecteds.value;
  }
  /**
   * 获取兼容 useSelect 的 modelValue (修正逻辑以匹配原 useSelect)
   * useSelect 中:
   * - AUTO/ARRAY: join(',')
   * - OBJECT: map(i => i.data)
   * - default: map(i => i.value)
   */
  getModelValueForUseSelect() {
    return this.limit === 1 ? this.valueType === "object" ? this.selecteds.value.length > 0 ? this.selecteds.value[0].data || this.selecteds.value[0] : {} : this.selecteds.value.length > 0 ? this.selecteds.value[0][this.valueField] : "" : this.valueType === "object" ? this.selecteds.value.map((e) => (e == null ? void 0 : e.data) ?? e) : this.valueType === "string" ? this.selecteds.value.map((e) => e == null ? void 0 : e[this.valueField]).join(",") : this.selecteds.value.map((e) => e == null ? void 0 : e[this.valueField]);
  }
}
function bt(n, e) {
  if (n === e) return !0;
  if (n.length !== e.length) return !1;
  for (let l = 0; l < n.length; l++)
    if (kt(n[l]) !== kt(e[l])) return !1;
  return !0;
}
function es(n, e) {
  const l = B([]), t = /* @__PURE__ */ new WeakMap(), o = () => {
    var r, a;
    return ((r = e.treeOption) == null ? void 0 : r.nodeChildren) || ((a = e.treeOption) == null ? void 0 : a.children) || "children";
  }, s = (r) => {
    const a = kt(r);
    let d = t.get(a);
    if (d || (d = {
      ...e.toNodeInfo(r),
      data: r
    }, t.set(a, d)), e.treeOption) {
      const c = e.treeOption.children, $ = o(), p = r[c];
      if (Array.isArray(p) || e.isPending) {
        let _ = Array.isArray(p) ? p.map(s) : [];
        if (e.isPending) {
          const w = d[$];
          if (Array.isArray(w)) {
            const A = w.filter((x) => e.isPending(x));
            A.length > 0 && (_ = [..._, ...A]);
          }
        }
        const h = d[$];
        (!h || !bt(h, _)) && (d[$] = _);
      }
    }
    return d;
  }, i = (r) => {
    const a = r.data;
    if (e.treeOption) {
      const d = e.treeOption.children, c = o(), $ = r[c];
      if (Array.isArray($)) {
        const p = $.filter((h) => !e.isPending || !e.isPending(h)).map(i), _ = a[d];
        (!_ || !bt(_, p)) && (a[d] = p);
      }
    }
    return a;
  };
  return de(n, (r) => {
    let a = r.map(s);
    if (e.isPending) {
      const c = l.value.filter(($) => e.isPending($));
      c.length > 0 && (a = [...a, ...c]);
    }
    bt(a, l.value) || (l.value = a);
  }, { immediate: !0, deep: !0 }), de(l, (r) => {
    const d = (e.isPending ? r.filter((c) => !e.isPending(c)) : r).map(i);
    n.value = d;
  }, { deep: !0 }), {
    list: l,
    wrap: s,
    unwrap: i
  };
}
function dn(n) {
  if (n !== void 0)
    return typeof n == "number" ? `${n}px` : /^\d+$/.test(n) ? `${n}px` : n;
}
function at(n) {
  if (!n) return 0;
  const e = parseFloat(n.replace(/px|%|em|rem/g, ""));
  return Number.isNaN(e) ? 0 : e;
}
function Vn(n, e = {}) {
  const l = n.map((s) => ({
    ...s,
    computedWidth: dn(s.width),
    computedMinWidth: dn(s.minWidth)
  }));
  let t = e.stickyLeftOffset ?? 0;
  for (let s = 0; s < l.length; s++) {
    const i = l[s];
    if (i.fixed === "left") {
      const r = at(i.computedWidth) || at(i.computedMinWidth) || 100;
      i.computedStickyLeft = `${t}px`, t += r;
    } else
      i.computedStickyLeft = void 0;
  }
  let o = 0;
  for (let s = l.length - 1; s >= 0; s--) {
    const i = l[s];
    if (i.fixed === "right") {
      const r = at(i.computedWidth) || at(i.computedMinWidth) || 100;
      i.computedStickyRight = `${o}px`, o += r;
    } else
      i.computedStickyRight = void 0;
  }
  return l;
}
const ts = {
  key: 0,
  class: "lp-tree__header flex items-center justify-between"
}, ns = {
  key: 0,
  class: "lp-tree__header-title"
}, ls = { class: "lp-tree__header-cols flex" }, os = {
  name: "LpTree"
}, dt = /* @__PURE__ */ le({
  ...os,
  props: {
    modelValue: {},
    data: {},
    columns: {},
    itemFields: { default: () => ({
      children: "children",
      title: "title",
      value: "value"
    }) },
    nodeKey: {},
    nodeBaseWidth: {},
    load: {},
    loadFirst: { type: Boolean, default: !0 },
    selectOptions: {},
    header: { default: () => ({
      enabled: !1,
      title: "",
      search: !1,
      searchPlaceholder: "搜索"
    }) },
    expand: {}
  },
  emits: ["update:modelValue", "change", "update:data"],
  setup(n, { expose: e, emit: l }) {
    var We, Te;
    const t = n, o = l, s = B(null), i = B(0);
    let r = null;
    const a = Ln();
    Ae("treeSlots", a);
    const d = I(() => {
      var m;
      return (((m = t.columns) == null ? void 0 : m.length) ?? 0) > 0;
    }), c = I(() => t.nodeBaseWidth ?? i.value), $ = I(() => ({
      left: d.value ? "0px" : void 0
    })), p = I(() => t.itemFields), _ = I(
      () => Vn(t.columns ?? [], {
        stickyLeftOffset: d.value && c.value || 0
      })
    ), h = I(() => t.header ?? { enabled: !1, title: "", search: !1, searchPlaceholder: "搜索" }), w = I(() => t.nodeKey), A = I(() => w.value || p.value.value), x = I(() => {
      var m;
      return (((m = t.selectOptions) == null ? void 0 : m.limit) ?? 1) !== 1;
    }), F = I(() => {
      var m;
      return ((m = t.selectOptions) == null ? void 0 : m.includeChild) !== !1;
    }), b = I(() => {
      var m;
      return ((m = t.selectOptions) == null ? void 0 : m.parentSelect) ?? 1;
    }), P = I(() => typeof t.load == "function"), u = I(() => {
      var m;
      return ((m = t.selectOptions) == null ? void 0 : m.limit1Cancel) === !0;
    }), v = B(""), y = new Nn({
      limit: (We = t.selectOptions) == null ? void 0 : We.limit,
      valueType: (Te = t.selectOptions) == null ? void 0 : Te.valueType,
      valueField: t.itemFields.value,
      labelField: t.itemFields.title
    }), O = B(!1), j = B(null), Y = I({
      get: () => t.data,
      set: (m) => o("update:data", m)
    }), S = $e({
      toNodeInfo: (m) => ({
        expanded: !1,
        draging: !1,
        selected: 0,
        disabled: !1,
        loading: !1,
        loaded: !1,
        noChildren: !1,
        hidden: !1,
        pending: !1
        // Default pending state
      }),
      isPending: (m) => m.pending === !0,
      // Check if node is pending
      treeOption: {
        children: p.value.children,
        nodeChildren: "children"
      }
    });
    de(
      () => p.value.children,
      (m) => {
        S.treeOption && (S.treeOption.children = m);
      }
    );
    const { list: T, wrap: W } = es(Y, S);
    function H() {
      if (t.nodeBaseWidth !== void 0) {
        i.value = t.nodeBaseWidth;
        return;
      }
      const m = s.value;
      if (!m) return;
      const M = m.querySelector(".lp-tree__item-content"), z = m.querySelector(".lp-tree__header-left"), U = Math.ceil((M == null ? void 0 : M.getBoundingClientRect().width) || 0), oe = Math.ceil((z == null ? void 0 : z.getBoundingClientRect().width) || 0), Q = Math.max(U, oe);
      Q > 0 && Q !== i.value && (i.value = Q);
    }
    function N(m) {
      const M = [m];
      return Array.isArray(m.children) && m.children.forEach((z) => {
        M.push(...N(z));
      }), M;
    }
    function te(m) {
      return P.value && !m.loaded && !m.noChildren ? !1 : (Array.isArray(m.children) ? m.children : []).length === 0;
    }
    function k(m) {
      return te(m) ? [m] : (Array.isArray(m.children) ? m.children : []).flatMap((z) => k(z));
    }
    async function R(m) {
      if (m.disabled) return !1;
      const M = Array.isArray(m.children) && m.children.length > 0;
      if (x.value && b.value === 2) {
        !M && P.value && !m.loaded && !m.noChildren && await C(m);
        const U = k(m).filter((ae) => !ae.disabled), oe = U.length > 0 && U.every((ae) => y.isSelected(ae.data));
        let Q = !1;
        return oe ? U.forEach((ae) => {
          y.isSelected(ae.data) && y.select(ae.data).success && (Q = !0);
        }) : U.forEach((ae) => {
          y.isSelected(ae.data) || y.select(ae.data).success && (Q = !0);
        }), Q;
      }
      if (x.value && F.value && M) {
        const U = N(m).filter((ae) => !ae.disabled), oe = U.length > 0 && U.every((ae) => y.isSelected(ae.data));
        let Q = !1;
        return oe ? U.forEach((ae) => {
          y.isSelected(ae.data) && y.select(ae.data).success && (Q = !0);
        }) : U.forEach((ae) => {
          y.isSelected(ae.data) || y.select(ae.data).success && (Q = !0);
        }), Q;
      }
      return !x.value && !u.value && y.isSelected(m.data) ? !1 : y.select(m.data).success;
    }
    function J(m) {
      const M = A.value, z = m && typeof m == "object" && M ? m[M] : m, U = (oe, Q) => {
        var ae, Se, Ne, Ge;
        for (let Ke = 0; Ke < oe.length; Ke += 1) {
          const Oe = oe[Ke];
          if (m && typeof m == "object") {
            if (Oe.data === m) return { node: Oe, parent: Q, index: Ke };
            if (M && ((ae = Oe.data) == null ? void 0 : ae[M]) !== void 0 && ((Se = Oe.data) == null ? void 0 : Se[M]) === z) return { node: Oe, parent: Q, index: Ke };
          } else if (M && ((Ne = Oe.data) == null ? void 0 : Ne[M]) !== void 0 && ((Ge = Oe.data) == null ? void 0 : Ge[M]) === z) return { node: Oe, parent: Q, index: Ke };
          const en = Array.isArray(Oe.children) ? Oe.children : [];
          if (en.length > 0) {
            const tn = U(en, Oe);
            if (tn) return tn;
          }
        }
        return null;
      };
      return U(T.value, null);
    }
    function ye(m) {
      var M;
      return (M = J(m)) == null ? void 0 : M.node;
    }
    function re() {
      const m = j.value, M = (U) => {
        U.forEach((oe) => {
          oe.hidden = !1, Array.isArray(oe.children) && M(oe.children);
        });
      };
      if (!m) {
        M(T.value);
        return;
      }
      const z = (U) => {
        const oe = !!m(U.data, U), ae = (Array.isArray(U.children) ? U.children : []).map((Ne) => z(Ne)).some(Boolean), Se = oe || ae;
        return U.hidden = !Se, ae && (U.expanded = !0), Se;
      };
      T.value.forEach((U) => z(U));
    }
    function ze(m) {
      if (typeof m == "function") {
        j.value = m, re();
        return;
      }
      const M = String(m ?? "").trim();
      if (!M) {
        j.value = null, re();
        return;
      }
      const z = p.value.title, U = M.toLowerCase();
      j.value = (oe) => String((oe == null ? void 0 : oe[z]) ?? "").toLowerCase().includes(U), re();
    }
    function Fe(m, M, z = !1) {
      const U = M === void 0 ? m : M, oe = M === void 0 ? null : m, Q = W(U);
      if (Q.expanded = !1, Q.loaded = !0, Q.pending = z, Q.noChildren = !0, !oe)
        return T.value.push(Q), re(), Q;
      const ae = J(oe);
      return ae ? (Array.isArray(ae.node.children) || (ae.node.children = []), ae.node.children.push(Q), ae.node.noChildren = !1, ae.node.loaded = !0, ae.node.expanded = !0, re(), Q) : (T.value.push(Q), re(), Q);
    }
    function Ie(m, M) {
      const z = W(m), U = M ?? {};
      let oe = T.value, Q = null;
      (U.parent !== void 0 || U.parentKey !== void 0) && (Q = J(U.parent ?? U.parentKey), Q && (Array.isArray(Q.node.children) || (Q.node.children = []), oe = Q.node.children, Q.node.noChildren = !1, Q.node.loaded = !0, Q.node.expanded = !0));
      const ae = U.before ?? U.beforeKey ?? U.after ?? U.afterKey;
      if (ae !== void 0) {
        const Se = J(ae);
        if (Se) {
          oe = Se.parent ? Se.parent.children ?? [] : T.value;
          const Ne = oe.findIndex((Ge) => Ge === Se.node);
          if (Ne >= 0) {
            const Ge = U.before !== void 0 || U.beforeKey !== void 0 ? Ne : Ne + 1;
            return oe.splice(Ge, 0, z), re(), z;
          }
        }
      }
      return oe.push(z), re(), z;
    }
    function je(m) {
      if (!w.value) return !1;
      const M = J(m);
      if (!M) return !1;
      const z = N(M.node);
      let U = !1;
      if (z.forEach((oe) => {
        y.isSelected(oe.data) && y.select(oe.data).success && (U = !0);
      }), M.parent) {
        const oe = M.parent.children ?? [];
        oe.splice(M.index, 1), M.parent.children = oe, (M.parent.children ?? []).length === 0 && (M.parent.noChildren = !0);
      } else
        T.value.splice(M.index, 1);
      return ue(T.value), re(), U && q(), !0;
    }
    function Be(m, M) {
      const z = J(m);
      return z ? (Object.assign(z.node.data, M), z.node.pending = !1, !0) : !1;
    }
    async function C(m) {
      var M, z;
      if (P.value && !m.loading && !(m.loaded || m.noChildren)) {
        m.loading = !0;
        try {
          const U = await ((M = t.load) == null ? void 0 : M.call(t, m.data));
          if (m.data && typeof m.data == "object") {
            const oe = p.value.children;
            m.data[oe] = U;
          }
          m.loaded = !0, m.noChildren = !U || U.length === 0, m.noChildren && (m.expanded = !1), await me(), (z = t.expand) != null && z.defaultExpandAll && m.children && ie(m.children), y.flush(t.modelValue, (oe) => V(T.value, oe)), ue(T.value);
        } finally {
          m.loading = !1;
        }
      }
    }
    function ie(m) {
      m.forEach((M) => {
        const z = Array.isArray(M.children) ? M.children : [];
        z.length > 0 && (M.expanded = !0, ie(z));
      });
    }
    function pe(m) {
      var M;
      (M = t.expand) != null && M.defaultExpandAll && ie(m);
    }
    async function E() {
      var m;
      if (P.value) {
        O.value = !0;
        try {
          const M = await ((m = t.load) == null ? void 0 : m.call(t, null));
          Y.value = Array.isArray(M) ? M : [];
        } catch (M) {
          console.error("Failed to load root data", M), O.value = !1;
        }
      }
    }
    async function Z() {
      if (j.value = null, v.value = "", y.clear(), q(), O.value = !0, Y.value = [], await me(), !P.value) {
        O.value = !1;
        return;
      }
      await E();
    }
    Ae("treeRoot", {
      onNodeSelect: async (m) => {
        await R(m) && q();
      },
      loadChildren: C,
      hasLoad: P,
      selectOptions: t.selectOptions,
      expand: t.expand
    }), Ae("treeColumns", _), Ae("treeHasColumns", d);
    function q() {
      const m = y.getModelValue();
      o("update:modelValue", m), o("change", m);
    }
    function X(m) {
      const M = y.isSelected(m.data), z = Array.isArray(m.children) ? m.children : [];
      if (z.length === 0 || (z.forEach((Q) => X(Q)), !x.value))
        return m.selected = M ? 1 : 0, m.selected;
      const U = z.some((Q) => (Q.selected ?? 0) > 0);
      return z.every((Q) => Q.selected === 1) ? (m.selected = 1, m.selected) : U ? (m.selected = 2, m.selected) : (m.selected = M ? 1 : 0, m.selected);
    }
    function ue(m) {
      m.forEach((M) => X(M));
    }
    de(
      y.selecteds,
      () => {
        ue(T.value);
      },
      { deep: !0 }
    );
    function V(m, M) {
      for (const z of m) {
        if (z.data[t.itemFields.value] === M)
          return z.data;
        if (z.children) {
          const U = V(z.children, M);
          if (U) return U;
        }
      }
    }
    return de(
      () => t.modelValue,
      (m) => {
        T.value.length > 0 && y.flush(m, (M) => V(T.value, M));
      },
      { immediate: !0 }
    ), de(
      T,
      async (m) => {
        if (console.log("dataRender change", m), m.length === 0 && P.value && !O.value && t.loadFirst) {
          await E();
          return;
        }
        me(() => {
          pe(m), y.flush(t.modelValue, (M) => V(m, M)), ue(m), j.value && re(), H();
        });
      },
      { immediate: !0, deep: !0 }
    ), e({
      append: Fe,
      remove: je,
      insert: Ie,
      getNode: ye,
      filter: ze,
      saveItem: Be,
      reload: Z
    }), de(v, (m) => {
      var M;
      (M = h.value) != null && M.search && ze(m);
    }), de(
      () => t.nodeBaseWidth,
      () => {
        me(() => {
          H();
        });
      },
      { immediate: !0 }
    ), de(
      () => [t.columns, t.data, t.header],
      () => {
        t.nodeBaseWidth === void 0 && me(() => {
          H();
        });
      },
      { deep: !0 }
    ), ke(() => {
      me(() => {
        H(), s.value && (r = new ResizeObserver(() => {
          t.nodeBaseWidth === void 0 && H();
        }), r.observe(s.value));
      });
    }), qe(() => {
      r == null || r.disconnect(), r = null;
    }), (m, M) => (f(), g("div", {
      class: "lp-tree",
      ref_key: "treeRef",
      ref: s
    }, [
      h.value.enabled ? (f(), g("div", ts, [
        L("div", {
          class: K(["lp-tree__header-left", "flex", "items-center", d.value && "sticky"]),
          style: he($.value)
        }, [
          h.value.title ? (f(), g("div", ns, ee(h.value.title), 1)) : D("", !0),
          h.value.search ? (f(), ge(ut, {
            key: 1,
            modelValue: v.value,
            "onUpdate:modelValue": M[0] || (M[0] = (z) => v.value = z),
            class: "lp-tree__header-search",
            placeholder: h.value.searchPlaceholder || "搜索",
            clearable: "",
            size: "mini"
          }, null, 8, ["modelValue", "placeholder"])) : D("", !0)
        ], 6),
        L("div", ls, [
          (f(!0), g(ve, null, we(_.value, (z) => (f(), g("div", {
            key: z.name,
            class: K(["lp-tree__header-col", `lp-tree__header-col-${z.name}`, z.fixed && `sticky fixed-${z.fixed}`]),
            style: he({ width: z.computedWidth || z.computedMinWidth, minWidth: z.computedWidth || z.computedMinWidth, left: z.computedStickyLeft, right: z.computedStickyRight })
          }, ee(z.title), 7))), 128))
        ])
      ])) : D("", !0),
      (f(!0), g(ve, null, we(G(T), (z) => (f(), ge(Qo, {
        key: z.data[p.value.value] || z.data.id,
        item: z,
        itemSlot: G(a).item,
        itemFields: p.value,
        level: 1
      }, null, 8, ["item", "itemSlot", "itemFields"]))), 128))
    ], 512));
  }
}), ss = { class: "lp-menu" }, as = { class: "lp-menu__node" }, is = { class: "lp-menu__node-left" }, rs = { class: "lp-menu__label" }, us = {
  name: "LpMenu"
}, Mt = /* @__PURE__ */ le({
  ...us,
  props: {
    modelValue: { default: void 0 },
    data: { default: () => [] },
    keys: { default: () => ({
      children: "children",
      label: "title",
      value: "id",
      icon: "icon"
    }) },
    mode: { default: "vertical" },
    searchable: { type: Boolean, default: !1 },
    searchPlaceholder: { default: "搜索" },
    defaultOpeneds: { default: () => [] },
    indent: { default: 16 },
    load: {},
    selectOptions: { default: () => ({}) }
  },
  emits: ["update:modelValue", "change", "select"],
  setup(n, { expose: e, emit: l }) {
    Xt((u) => ({
      "234e740b": h.value
    }));
    const t = n, o = l, s = B(null), i = I(() => {
      var u;
      return ((u = t.keys) == null ? void 0 : u.children) || "children";
    }), r = I(() => {
      var u;
      return ((u = t.keys) == null ? void 0 : u.label) || "title";
    }), a = I(() => {
      var u;
      return ((u = t.keys) == null ? void 0 : u.value) || "id";
    }), d = I(() => {
      var u;
      return ((u = t.keys) == null ? void 0 : u.icon) || "icon";
    }), c = I(() => ({
      children: i.value,
      title: r.value,
      value: a.value
    })), $ = I(() => a.value), p = I(() => ({
      enabled: !1,
      title: "",
      search: !!t.searchable,
      searchPlaceholder: t.searchPlaceholder || "搜索"
    })), _ = I(() => ({
      limit: 1,
      checkbox: !1,
      foldIcon: !1,
      ...t.selectOptions || {}
    })), h = I(() => `${t.indent}px`);
    function w(u) {
      o("update:modelValue", u);
    }
    function A(u) {
      var y, O;
      o("change", u);
      const v = (O = (y = s.value) == null ? void 0 : y.getNode) == null ? void 0 : O.call(y, u);
      o("select", { value: u, item: (v == null ? void 0 : v.data) ?? null });
    }
    function x(u) {
      const v = u == null ? void 0 : u.children;
      return !!(Array.isArray(v) && v.length > 0 || t.load && !(u != null && u.noChildren));
    }
    function F(u) {
      var v;
      return ((v = u == null ? void 0 : u.data) == null ? void 0 : v[r.value]) ?? "";
    }
    function b(u) {
      var y;
      const v = (y = u == null ? void 0 : u.data) == null ? void 0 : y[d.value];
      return typeof v == "string" && v.trim() ? v.trim() : "";
    }
    async function P() {
      !Array.isArray(t.defaultOpeneds) || t.defaultOpeneds.length === 0 || (await me(), t.defaultOpeneds.forEach((u) => {
        var y, O;
        const v = (O = (y = s.value) == null ? void 0 : y.getNode) == null ? void 0 : O.call(y, u);
        v && (v.expanded = !0);
      }));
    }
    return ke(() => {
      P();
    }), de(
      () => t.defaultOpeneds,
      () => {
        P();
      },
      { deep: !0 }
    ), de(
      () => t.data,
      () => {
        P();
      },
      { deep: !0 }
    ), e({
      append: (...u) => {
        var v, y;
        return (y = (v = s.value) == null ? void 0 : v.append) == null ? void 0 : y.call(v, ...u);
      },
      remove: (...u) => {
        var v, y;
        return (y = (v = s.value) == null ? void 0 : v.remove) == null ? void 0 : y.call(v, ...u);
      },
      insert: (...u) => {
        var v, y;
        return (y = (v = s.value) == null ? void 0 : v.insert) == null ? void 0 : y.call(v, ...u);
      },
      getNode: (...u) => {
        var v, y;
        return (y = (v = s.value) == null ? void 0 : v.getNode) == null ? void 0 : y.call(v, ...u);
      },
      filter: (...u) => {
        var v, y;
        return (y = (v = s.value) == null ? void 0 : v.filter) == null ? void 0 : y.call(v, ...u);
      }
    }), (u, v) => (f(), g("div", ss, [
      ce(dt, {
        ref_key: "menuTreeRef",
        ref: s,
        "model-value": t.modelValue,
        data: t.data,
        "item-fields": c.value,
        "node-key": $.value,
        load: t.load,
        "select-options": _.value,
        columns: [],
        header: p.value,
        "onUpdate:modelValue": w,
        onChange: A
      }, {
        item: xe(({ item: y }) => [
          ne(u.$slots, "item", { item: y }, () => [
            L("div", as, [
              L("div", is, [
                b(y) ? (f(), ge(G(_e), {
                  key: 0,
                  class: "lp-menu__icon",
                  is: b(y)
                }, null, 8, ["is"])) : D("", !0),
                L("span", rs, ee(F(y)), 1)
              ]),
              x(y) ? (f(), ge(G(_e), {
                key: 0,
                class: K(["lp-menu__arrow", { open: !!y.expanded }]),
                is: "right"
              }, null, 8, ["class"])) : D("", !0)
            ])
          ])
        ]),
        _: 3
      }, 8, ["model-value", "data", "item-fields", "node-key", "load", "select-options", "header"])
    ]));
  }
});
let cs = {
  install: (n) => {
    n.component(Mt.name, Mt);
  }
};
const ds = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpMenu: Mt,
  default: cs
}, Symbol.toStringTag, { value: "Module" })), ps = { class: "lp-message" }, fs = {
  name: "lp-message"
}, pn = /* @__PURE__ */ Object.assign(fs, {
  setup(n) {
    return $e({}), (e, l) => (f(), g("div", ps, ee(e.message), 1));
  }
});
let hs = {
  install: (n) => {
    n.component(pn.name, pn);
  }
};
const vs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: hs
}, Symbol.toStringTag, { value: "Module" })), ms = {
  key: 0,
  class: "lp-paginate"
}, gs = ["disabled"], ys = ["disabled"], _s = ["onClick"], bs = ["disabled"], ws = ["disabled"], $s = { class: "page-info" }, Cs = ["max"], ks = {
  key: 1,
  class: "lp-paginate"
}, Ss = { class: "page-info" }, xs = {
  name: "lp-paginate"
}, Ts = /* @__PURE__ */ le({
  ...xs,
  props: {
    status: {},
    maxButtons: {},
    showQuickJumper: { type: Boolean, default: !1 }
  },
  emits: ["update:status", "change"],
  setup(n, { emit: e }) {
    const l = n, t = e, o = I(() => l.maxButtons ?? 7), s = I(() => l.status.page), i = I(() => Math.max(1, l.status.limit)), r = I(() => Math.max(0, l.status.total)), a = I(() => Math.max(1, Math.ceil(r.value / i.value))), d = B(s.value);
    de(s, (p) => {
      d.value = p;
    });
    const c = I(() => {
      const p = o.value, _ = Math.floor(p / 2);
      let h = Math.max(1, s.value - _), w = Math.min(a.value, h + p - 1);
      h = Math.max(1, w - p + 1);
      const A = [];
      for (let x = h; x <= w; x++) A.push(x);
      return A;
    });
    function $(p) {
      const _ = Math.max(1, Math.min(a.value, Number.isFinite(p) ? p : s.value)), h = {
        page: _,
        limit: i.value,
        total: r.value,
        lastPage: a.value,
        hasMore: _ < a.value
      };
      t("update:status", h), t("change", h);
    }
    return (p, _) => a.value > 1 ? (f(), g("div", ms, [
      L("button", {
        class: "page-btn",
        disabled: s.value === 1,
        onClick: _[0] || (_[0] = (h) => $(1))
      }, "«", 8, gs),
      L("button", {
        class: "page-btn",
        disabled: s.value === 1,
        onClick: _[1] || (_[1] = (h) => $(s.value - 1))
      }, "‹", 8, ys),
      (f(!0), g(ve, null, we(c.value, (h) => (f(), g("button", {
        key: h,
        class: K(["page-btn", { active: h === s.value }]),
        onClick: (w) => $(h)
      }, ee(h), 11, _s))), 128)),
      L("button", {
        class: "page-btn",
        disabled: s.value === a.value,
        onClick: _[2] || (_[2] = (h) => $(s.value + 1))
      }, "›", 8, bs),
      L("button", {
        class: "page-btn",
        disabled: s.value === a.value,
        onClick: _[3] || (_[3] = (h) => $(a.value))
      }, "»", 8, ws),
      L("span", $s, "第 " + ee(s.value) + " / " + ee(a.value) + " 页（共 " + ee(p.status.total) + " 条）", 1),
      p.showQuickJumper ? (f(), g(ve, { key: 0 }, [
        nt(L("input", {
          type: "number",
          min: "1",
          max: a.value,
          "onUpdate:modelValue": _[4] || (_[4] = (h) => d.value = h),
          class: "page-input"
        }, null, 8, Cs), [
          [
            On,
            d.value,
            void 0,
            { number: !0 }
          ]
        ]),
        L("button", {
          class: "page-btn",
          onClick: _[5] || (_[5] = (h) => $(d.value))
        }, "跳转")
      ], 64)) : D("", !0)
    ])) : (f(), g("div", ks, [
      L("span", Ss, "共 " + ee(p.status.total) + " 条", 1)
    ]));
  }
}), Pt = /* @__PURE__ */ Pe(Ts, [["__scopeId", "data-v-dea61d9b"]]);
let Es = {
  install: (n) => {
    n.component(Pt.name, Pt);
  }
};
const Ls = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpPaginate: Pt,
  default: Es
}, Symbol.toStringTag, { value: "Module" })), Os = { class: "lp-panel" }, js = {
  key: 0,
  class: "lp-panel__header"
}, As = { class: "title text" }, Ms = { class: "body" }, Ps = {
  name: "lp-panel"
}, Is = /* @__PURE__ */ le({
  ...Ps,
  props: {
    title: { default: "" }
  },
  emits: ["change"],
  setup(n, { emit: e }) {
    const l = n;
    return (t, o) => (f(), g("div", Os, [
      t.title ? (f(), g("div", js, [
        L("div", As, ee(l.title), 1),
        ne(t.$slots, "header", {}, void 0, !0)
      ])) : D("", !0),
      L("div", Ms, [
        ne(t.$slots, "default", {}, void 0, !0)
      ])
    ]));
  }
}), It = /* @__PURE__ */ Pe(Is, [["__scopeId", "data-v-5fe6b717"]]);
let Bs = {
  install: (n) => {
    n.component(It.name, It);
  }
};
const Rs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpPanel: It,
  default: Bs
}, Symbol.toStringTag, { value: "Module" })), zs = { class: "lp-progress__inner" }, Fs = {
  key: 0,
  class: "lp-progress__text"
}, Ns = {
  key: 0,
  class: "lp-progress__text"
}, Vs = {
  name: "lp-progress"
}, Bt = /* @__PURE__ */ le({
  ...Vs,
  props: {
    percentage: { default: 0 },
    type: { default: "line" },
    strokeWidth: { default: 6 },
    showText: { type: Boolean, default: !0 },
    textInside: { type: Boolean, default: !1 },
    status: { default: "" },
    color: {},
    width: { default: 126 }
  },
  setup(n) {
    const e = n, l = I(() => {
      const t = {};
      if (t.width = e.percentage + "%", e.color)
        if (typeof e.color == "string")
          t.backgroundColor = e.color;
        else if (Array.isArray(e.color)) {
          const o = e.color, s = o.map((i, r) => {
            const a = r / (o.length - 1) * 100;
            return `${i} ${a}%`;
          }).join(", ");
          t.background = `linear-gradient(to right, ${s})`;
        } else typeof e.color == "function" && (t.backgroundColor = e.color(e.percentage));
      return t;
    });
    return I(() => e.status ? e.status : e.percentage >= 100 ? "success" : ""), (t, o) => (f(), g("div", {
      class: K(["lp-progress", [`lp-progress--${t.status}`, { "lp-progress--text-inside": t.textInside }]])
    }, [
      L("div", {
        class: "lp-progress__outer",
        style: he({ height: t.strokeWidth + "px" })
      }, [
        L("div", zs, [
          L("div", {
            class: "lp-progress__bar",
            style: he(l.value)
          }, [
            t.textInside ? (f(), g("div", Fs, ee(t.percentage) + "% ", 1)) : D("", !0)
          ], 4)
        ])
      ], 4),
      !t.textInside && t.showText ? (f(), g("div", Ns, [
        ne(t.$slots, "default", {}, () => [
          Le(ee(t.percentage) + "%", 1)
        ])
      ])) : D("", !0)
    ], 2));
  }
}), Ws = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpProgress: Bt
}, Symbol.toStringTag, { value: "Module" })), Ds = { class: "lp-radio" }, Hs = ["onClick"], Us = { class: "lp-radio-input" }, Gs = ["value", "checked", "onChange"], Ks = { class: "lp-radio-label" }, Ys = {
  name: "LpRadio"
}, Xs = /* @__PURE__ */ le({
  ...Ys,
  props: {
    modelValue: { type: [String, Number, Boolean, null], default: null },
    options: { default: () => [] },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "change"],
  setup(n, { emit: e }) {
    const l = n, t = e, o = (s) => {
      l.disabled || (t("update:modelValue", s), t("change", s));
    };
    return (s, i) => (f(), g("div", Ds, [
      (f(!0), g(ve, null, we(s.options, (r) => (f(), g("div", {
        key: r.value,
        class: "lp-radio-item",
        onClick: (a) => o(r.value)
      }, [
        L("div", Us, [
          L("input", {
            type: "radio",
            value: r.value,
            checked: s.modelValue === r.value,
            onChange: (a) => o(r.value)
          }, null, 40, Gs),
          i[0] || (i[0] = L("span", { class: "lp-radio-mark" }, null, -1))
        ]),
        L("span", Ks, ee(r.title), 1)
      ], 8, Hs))), 128))
    ]));
  }
}), fn = /* @__PURE__ */ Pe(Xs, [["__scopeId", "data-v-28a906a6"]]);
let qs = {
  install: (n) => {
    n.component(fn.name, fn);
  }
};
const Js = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: qs
}, Symbol.toStringTag, { value: "Module" })), Wn = Symbol("scrollbarContextKey"), Zs = ({
  move: n,
  size: e,
  bar: l
}) => {
  const t = {};
  return (l == null ? void 0 : l.key) === "vertical" ? (t.height = e, t.width = "100%", t.transform = `translateY(${n || 0}px)`) : (t.width = e, t.height = "100%", t.transform = `translateX(${n || 0}px)`), t;
}, Qs = {
  name: "Bar"
}, hn = /* @__PURE__ */ le({
  ...Qs,
  props: {
    always: { type: Boolean, default: !0 },
    width: {},
    height: {},
    ratioX: {},
    ratioY: {},
    visible: { type: Boolean, default: !1 },
    direction: { default: "vertical" }
  },
  setup(n, { expose: e }) {
    const l = n, t = Ee(Wn);
    t || io("Bar", "can not inject scrollbar context");
    const o = B(), s = B(), i = B({}), r = B(!1);
    let a = !1, d = !1, c = 0, $ = document.onselectstart;
    const p = I(() => y[l.direction || (l.ratioX && l.ratioY ? "vertical" : l.ratioX ? "horizontal" : "vertical")]);
    I(() => ({
      [p.value.size]: l[p.value.size],
      [p.value.axis]: i.value[p.value.axis]
    }));
    const _ = I(() => Zs({
      size: l[p.value.size],
      move: i.value[p.value.axis],
      bar: p.value
    }));
    I(
      () => o.value[p.value.offset] ** 2 / t.wrapElement[p.value.scrollSize] / l[p.value.ratio]
    );
    const h = (O) => {
      var S;
      if (O.stopPropagation(), O.ctrlKey || [1, 2].includes(O.button)) return;
      (S = window.getSelection()) == null || S.removeAllRanges();
      const j = O.currentTarget;
      if (!j) return;
      const Y = j.getBoundingClientRect();
      c = O[p.value.client] - Y[p.value.direction], A(O);
    }, w = (O) => {
      if (!s.value || !o.value || !t.wrapElement) return;
      const j = o.value.getBoundingClientRect(), Y = O[p.value.client] - j[p.value.direction], S = s.value[p.value.offset] / 2, T = Y - S, W = o.value[p.value.offset] - s.value[p.value.offset], H = Math.max(0, Math.min(W, T)), N = W > 0 ? H / W * 100 : 0;
      i.value[p.value.axis] = H;
      const te = t.wrapElement[p.value.scrollSize] - t.wrapElement[p.value.offset];
      t.wrapElement[p.value.scroll] = N * te / 100;
    }, A = (O) => {
      O.stopImmediatePropagation(), a = !0, document.addEventListener("mousemove", x), document.addEventListener("mouseup", F), $ = document.onselectstart, document.onselectstart = () => !1;
    }, x = (O) => {
      if (!a || !o.value || !s.value || !t.wrapElement) return;
      const j = o.value.getBoundingClientRect(), S = O[p.value.client] - j[p.value.direction] - c, T = o.value[p.value.offset] - s.value[p.value.offset], W = Math.max(0, Math.min(T, S)), H = T > 0 ? W / T * 100 : 0;
      i.value[p.value.axis] = W;
      const N = t.wrapElement[p.value.scrollSize] - t.wrapElement[p.value.offset];
      t.wrapElement[p.value.scroll] = H * N / 100;
    }, F = () => {
      a = !1, c = 0, document.removeEventListener("mousemove", x), document.removeEventListener("mouseup", F), u(), d && (r.value = !1);
    }, b = () => {
      d = !1, r.value = !!l[p.value.size];
    }, P = () => {
      d = !0, r.value = a;
    }, u = () => {
      document.onselectstart !== $ && (document.onselectstart = $);
    }, v = (O) => {
      if (!a && O && o.value && s.value) {
        const j = O[p.value.scroll], Y = O[p.value.scrollSize] - O[p.value.offset], S = Y > 0 ? j / Y * 100 : 0, T = o.value[p.value.offset] - s.value[p.value.offset];
        i.value[p.value.axis] = S * T / 100;
      }
    };
    ke(() => {
      o.value && (o.value.addEventListener("mousemove", b), o.value.addEventListener("mouseleave", P));
    }), qe(() => {
      u(), document.removeEventListener("mouseup", F), o.value && (o.value.removeEventListener("mousemove", b), o.value.removeEventListener("mouseleave", P));
    });
    const y = {
      vertical: {
        offset: "offsetHeight",
        scroll: "scrollTop",
        scrollSize: "scrollHeight",
        size: "height",
        key: "vertical",
        axis: "Y",
        client: "clientY",
        direction: "top",
        ratio: "ratioY"
      },
      horizontal: {
        offset: "offsetWidth",
        scroll: "scrollLeft",
        scrollSize: "scrollWidth",
        size: "width",
        key: "horizontal",
        axis: "X",
        client: "clientX",
        direction: "left",
        ratio: "ratioX"
      }
    };
    return e({
      handleScroll: v
    }), (O, j) => (f(), ge(yt, { name: "lp-scrollbar-fade" }, {
      default: xe(() => [
        nt(L("div", {
          ref_key: "instance",
          ref: o,
          class: K(["lp-scrollbar__bar", "is-" + p.value.key, { "is-visible": O.always || r.value || l.visible }]),
          onMousedown: w
        }, [
          L("div", {
            ref_key: "thumb",
            ref: s,
            class: "lp-scrollbar__thumb",
            style: he(_.value),
            onMousedown: h
          }, null, 36)
        ], 34), [
          [Yt, O.always || r.value || l.visible]
        ])
      ]),
      _: 1
    }));
  }
}), ea = {
  name: "LpScrollbar"
}, pt = /* @__PURE__ */ le({
  ...ea,
  props: {
    height: { default: "" },
    maxHeight: { default: "" },
    native: { type: Boolean, default: !1 },
    wrapStyle: { type: [Boolean, null, String, Object, Array], default: "" },
    wrapClass: { default: "" },
    viewClass: { default: "" },
    viewStyle: { type: [Boolean, null, String, Object, Array], default: "" },
    noresize: { type: Boolean, default: !1 },
    tag: { default: "div" },
    always: { type: Boolean, default: !1 },
    minSize: { default: 20 }
  },
  emits: ["scroll"],
  setup(n, { expose: e, emit: l }) {
    const t = "LpScrollbar", o = n, s = l;
    let i;
    const r = B(), a = B(), d = B(), c = B(), $ = B(), p = B("0"), _ = B("0");
    $e({});
    const h = B(1), w = B(1), A = B(!1), x = I(() => {
      const S = {};
      return o.height && (S.height = rn(o.height)), o.maxHeight && (S.maxHeight = rn(o.maxHeight)), [o.wrapStyle, S];
    }), F = I(() => [o.wrapClass, "lp-scrollbar__wrap", { "lp-scrollbar__wrap--hidden-default": !o.native }]), b = I(() => ["lp-scrollbar__view", o.viewClass]), P = I(() => o.viewStyle), u = () => {
      if (a.value) {
        const S = a.value.scrollTop, T = a.value.scrollLeft;
        c.value && c.value.handleScroll(a.value), $.value && $.value.handleScroll(a.value), s("scroll", {
          scrollTop: S,
          scrollLeft: T
        });
      }
    };
    function v(S, T) {
      ro(S) ? a.value.scrollTo(S) : st(S) && st(T) && a.value.scrollTo(S, T);
    }
    const y = (S) => {
      if (!st(S)) {
        un(t, "value must be a number");
        return;
      }
      a.value.scrollTop = S;
    }, O = (S) => {
      if (!st(S)) {
        un(t, "value must be a number");
        return;
      }
      a.value.scrollLeft = S;
    }, j = () => {
      if (!a.value) return;
      const S = a.value.clientHeight * 100 / a.value.scrollHeight, T = a.value.clientWidth * 100 / a.value.scrollWidth;
      _.value = S < 100 ? `${S}%` : "", p.value = T < 100 ? `${T}%` : "", h.value = a.value.scrollHeight / a.value.clientHeight, w.value = a.value.scrollWidth / a.value.clientWidth, A.value = !!(_.value || p.value);
    };
    ke(() => {
      o.native || me(() => {
        j();
        const S = new ResizeObserver(() => {
          j();
        });
        a.value && S.observe(a.value);
        const T = new MutationObserver(() => {
          j();
        });
        a.value && T.observe(a.value, {
          childList: !0,
          subtree: !0,
          attributes: !0,
          attributeFilter: ["style", "class"]
        }), i = () => {
          S.disconnect(), T.disconnect();
        };
      }), r.value && (r.value.addEventListener("mouseenter", () => {
        A.value = !!(_.value || p.value);
      }), r.value.addEventListener("mouseleave", () => {
        o.always || (A.value = !1);
      }));
    }), qe(() => {
      i == null || i();
    });
    const Y = $e({
      scrollbarElement: r,
      wrapElement: a
    });
    return Ae(Wn, Y), e({
      /** @description scrollbar wrap ref */
      wrapRef: a,
      /** @description update scrollbar state manually */
      update: j,
      /** @description scrolls to a particular set of coordinates */
      scrollTo: v,
      /** @description set distance to scroll top */
      setScrollTop: y,
      /** @description set distance to scroll left */
      setScrollLeft: O,
      /** @description handle scroll event */
      handleScroll: u
    }), (S, T) => (f(), g("div", {
      ref_key: "scrollbarRef",
      ref: r,
      class: K(["lp-scrollbar", { "lp-scrollbar--hidden": !S.always && !A.value }])
    }, [
      L("div", {
        ref_key: "wrapRef",
        ref: a,
        class: K(["lp-scrollbar__wrap", F.value]),
        style: he(x.value),
        onScroll: u
      }, [
        (f(), ge(Xe(S.tag), {
          ref_key: "resizeRef",
          ref: d,
          class: K(["lp-scrollbar__view", b.value]),
          style: he(P.value)
        }, {
          default: xe(() => [
            ne(S.$slots, "default")
          ]),
          _: 3
        }, 8, ["class", "style"]))
      ], 38),
      S.native ? D("", !0) : (f(), g(ve, { key: 0 }, [
        _.value ? (f(), ge(hn, {
          key: 0,
          ref_key: "verticalBarRef",
          ref: c,
          height: _.value,
          width: "",
          always: S.always,
          "ratio-x": 1,
          "ratio-y": h.value,
          visible: A.value,
          direction: "vertical"
        }, null, 8, ["height", "always", "ratio-y", "visible"])) : D("", !0),
        p.value ? (f(), ge(hn, {
          key: 1,
          ref_key: "horizontalBarRef",
          ref: $,
          height: "",
          width: p.value,
          always: S.always,
          "ratio-x": w.value,
          "ratio-y": 1,
          visible: A.value,
          direction: "horizontal"
        }, null, 8, ["width", "always", "ratio-x", "visible"])) : D("", !0)
      ], 64))
    ], 2));
  }
});
let ta = {
  install: (n) => {
    n.component(pt.name, pt);
  }
};
const na = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpScrollbar: pt,
  default: ta
}, Symbol.toStringTag, { value: "Module" })), la = { class: "lp-select-items" }, oa = ["onClick"], sa = { class: "label" }, aa = {
  key: 0,
  class: "lp-select__selected-icon-box"
}, ia = {
  name: "LpSelectItems"
}, ra = /* @__PURE__ */ le({
  ...ia,
  props: {
    list: { default: () => [] },
    limit: { default: 1 }
  },
  emits: ["select", "close"],
  setup(n, { emit: e }) {
    const l = n, t = e, o = (s) => {
      t("select", s), l.limit == 1 && t("close");
    };
    return $e({}), ke(() => {
    }), (s, i) => (f(), g("div", la, [
      (f(!0), g(ve, null, we(ll(l.list) ? l.list.value : l.list, (r) => (f(), g("div", {
        class: K(["lp-select-items__item", { active: r.__selected }]),
        key: r.value,
        onClick: (a) => o(r)
      }, [
        L("div", sa, ee(r.label), 1),
        r.__selected ? (f(), g("div", aa, [
          ce(G(_e), {
            class: "lp-select__selected-icon",
            is: "selected",
            size: "14"
          })
        ])) : D("", !0)
      ], 10, oa))), 128))
    ]));
  }
}), ua = { class: "lp-select__selected" }, ca = {
  key: 0,
  class: "lp-select__placeholder"
}, da = { class: "lp-select__selected-item input-item" }, pa = /* @__PURE__ */ le({
  __name: "lp-select-selected",
  props: {
    selecteds: {},
    options: {},
    placeholder: {},
    labelField: { default: "label" },
    valueField: { default: "value" },
    limit: { default: 1 },
    itemComponent: {}
  },
  emits: ["removeItem", "search"],
  setup(n, { emit: e }) {
    const l = B(null), t = n;
    $e({});
    const o = B(""), s = e;
    function i(d) {
      console.log("handleRemoveItem", d), s("removeItem", d);
    }
    function r() {
      t.itemComponent ? l.value = on(sn(t.itemComponent)) : t.limit === 1 ? l.value = "div" : l.value = on(sn("LooplanUiNeeds@SelectedTag"));
    }
    function a() {
      s("search", o.value);
    }
    return ke(() => {
      r();
    }), (d, c) => (f(), g("div", ua, [
      !d.selecteds.length && !o.value ? (f(), g("div", ca, ee(d.placeholder), 1)) : D("", !0),
      d.selecteds.length ? (f(!0), g(ve, { key: 1 }, we(d.selecteds, ($, p) => (f(), g("div", {
        key: p,
        class: "lp-select__selected-item"
      }, [
        (f(), ge(Xe(l.value), {
          value: $,
          labelField: d.labelField,
          valueField: d.valueField,
          onRemoveItem: i
        }, {
          default: xe(() => [
            Le(ee($[t.labelField || "label"]), 1)
          ]),
          _: 2
        }, 1064, ["value", "labelField", "valueField"]))
      ]))), 128)) : D("", !0),
      L("div", da, [
        nt(L("input", {
          "onUpdate:modelValue": c[0] || (c[0] = ($) => o.value = $),
          onInput: a,
          class: "lp-select__serch",
          type: "text"
        }, null, 544), [
          [On, o.value]
        ])
      ])
    ]));
  }
});
function fa(n, e = {}) {
  const {
    valueField: l = "value",
    labelField: t = "label",
    limit: o = 1,
    valueType: s = Jt.AUTO
  } = e, i = new Nn({
    limit: o,
    valueType: s,
    valueField: l,
    labelField: t
  }), r = B([]);
  let a = [];
  const d = I(() => i.selecteds.value.length > 0), c = (F) => {
    a = [], r.value = F.map((b) => {
      const P = {
        label: b[t],
        value: b[l],
        data: b,
        __selected: b[l] === n.value
      };
      return a.push(P), P;
    }), h();
  }, $ = () => {
    a.forEach((F) => {
      F.__selected = i.isSelected(F);
    }), r.value = [
      ...a
    ];
  }, p = (F) => {
    const b = i.select(F);
    b.success || b.type === "limit" && qt("选择数量已达上限:" + o, {
      duration: 2e3
    }), F.__selected = b.selected, o === 1 && $(), _();
  };
  function _() {
    n.value = i.getModelValueForUseSelect();
  }
  function h() {
    const F = (b) => a.find((P) => P[l] === b);
    i.flush(n.value, F), $();
  }
  de(() => n.value, () => {
    h();
  });
  function w() {
    i.clear(), _();
  }
  function A(F) {
    p(F);
  }
  function x(F) {
    r.value = a.filter((b) => b.label.indexOf(F) !== -1);
  }
  return {
    selecteds: i.selecteds,
    optionsRender: r,
    clearableVisible: d,
    handleOptions: c,
    onSelect: p,
    onRemoveItem: A,
    onClear: w,
    onSearch: x
  };
}
const ha = { class: "lp-select__main" }, va = { class: "lp-select__right" }, ma = {
  name: "LpSelect"
}, Rt = /* @__PURE__ */ le({
  ...ma,
  props: /* @__PURE__ */ Ye({
    options: { default: () => [] },
    limit: { default: 1 },
    valueType: { default: Jt.AUTO },
    placeholder: { default: "请选择" },
    selectedItemComponent: {}
  }, {
    modelValue: {
      default: ""
    },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(n) {
    const e = B(), l = n, t = mt(n, "modelValue"), o = $e({
      isActive: !1
    }), { selecteds: s, optionsRender: i, clearableVisible: r, handleOptions: a, onSelect: d, onRemoveItem: c, onClear: $, onSearch: p } = fa(t, {
      valueField: "value",
      labelField: "title",
      limit: l.limit,
      valueType: l.valueType
    });
    let _ = null;
    function h(A) {
      var b;
      o.isActive = !o.isActive, A.target;
      const x = "bottom-center";
      if (!o.isActive) {
        _ && _.close();
        return;
      }
      _ = Me.src(ra).props({
        list: i,
        limit: l.limit
      }).follow(e.value, {
        // 跟随位置 [方向]-[对齐位置]，可供选择的四个方向分别是top、left、right、bottom，可供选择的三种对齐方式分别是start、end、center 默认对其方式是center
        position: x,
        // 是否显示箭头
        arrow: !0,
        // 箭头大小
        arrowSize: 10
        // 跟随的fps,用于一些带动画的, 会移动的元素 (可选, 默认不开启)
        // fps: 5
      }).on("close", () => {
        o.isActive = !1;
      }).on("select", (P) => {
        d(P);
      }).transition("expand").useBodyScroll(!1);
      const F = ((b = e.value) == null ? void 0 : b.clientWidth) || 0;
      _.show({
        width: F
        // height:300,
      });
    }
    function w() {
      _ && _.close && _.close(), $();
    }
    return de(
      () => l.options,
      (A) => {
        a(A);
      },
      {
        // 立即执行
        immediate: !0,
        // 深度监听
        deep: !0
      }
    ), ke(() => {
    }), gt(() => {
      _ && _.close(!0);
    }), (A, x) => (f(), g("div", {
      ref_key: "selectRef",
      ref: e,
      class: "lp-select",
      onClick: x[0] || (x[0] = (F) => h(F))
    }, [
      L("div", ha, [
        ce(pa, {
          selecteds: G(s),
          options: G(i),
          limit: l.limit,
          placeholder: l.placeholder,
          itemComponent: l.selectedItemComponent,
          onRemoveItem: G(c),
          onSearch: G(p)
        }, null, 8, ["selecteds", "options", "limit", "placeholder", "itemComponent", "onRemoveItem", "onSearch"]),
        L("div", va, [
          G(r) ? D("", !0) : (f(), ge(G(_e), {
            key: 0,
            is: "down",
            size: "14",
            color: "#ccc",
            class: K(["lp-select__icon", { active: o.isActive }])
          }, null, 8, ["class"])),
          G(r) ? (f(), ge(G(_e), {
            key: 1,
            onClick: Re(w, ["stop"]),
            is: "close",
            size: "14",
            color: "#ccc",
            class: "lp-select__close-icon"
          })) : D("", !0)
        ])
      ])
    ], 512));
  }
}), ga = { class: "lp-layout" }, ya = {
  __name: "lp-select-selected-one",
  setup(n) {
    return $e({}), (e, l) => (f(), g("div", ga, " 单选 "));
  }
}, _a = { class: "lp-select-selected-tag" }, Dn = /* @__PURE__ */ le({
  __name: "lp-select-selected-tag",
  props: {
    value: {},
    labelField: { default: "label" },
    valueField: { default: "value" }
  },
  emits: ["removeItem"],
  setup(n, { emit: e }) {
    const l = e, t = n;
    $e({});
    function o() {
      l("removeItem", t.value);
    }
    return (s, i) => (f(), g("div", _a, [
      ce(G(ht), {
        closable: "",
        onClose: o
      }, {
        default: xe(() => [
          Le(ee(s.value ? s.value[t.labelField] : ""), 1)
        ]),
        _: 1
      })
    ]));
  }
});
let ba = {
  install: (n) => {
    n.component(Rt.name, Rt);
  }
};
const wa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpSelect: Rt,
  LpSelectSelectedOne: ya,
  LpSelectSelectedTag: Dn,
  default: ba
}, Symbol.toStringTag, { value: "Module" })), $a = ["checked", "disabled"], Ca = { class: "lp-switch__core" }, ka = {
  key: 0,
  class: "lp-switch__loading"
}, Sa = {
  key: 1,
  class: "lp-switch__inner"
}, xa = { key: 0 }, Ta = { key: 1 }, Ea = { class: "lp-switch__action" }, La = {
  key: 0,
  class: "lp-switch__label lp-switch__label--left"
}, Oa = {
  key: 1,
  class: "lp-switch__label lp-switch__label--right"
}, ja = {
  name: "LpSwitch"
}, zt = /* @__PURE__ */ le({
  ...ja,
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
    const t = n, o = l, s = Ee("lpFormItem", null), i = B(), r = B(!1), a = I(() => t.size || (s == null ? void 0 : s.size) || "default"), d = I(() => t.disabled || r.value), c = I(() => t.modelValue === t.activeValue);
    I(() => {
      const x = {};
      return t.width && (x.width = typeof t.width == "number" ? `${t.width}px` : t.width), t.activeColor && c.value ? (x.backgroundColor = t.activeColor, x.borderColor = t.activeColor) : t.inactiveColor && !c.value && (x.backgroundColor = t.inactiveColor, x.borderColor = t.inactiveColor), x;
    });
    const $ = () => {
      var x;
      (x = i.value) == null || x.focus();
    }, p = () => {
      var x;
      (x = i.value) == null || x.blur();
    }, _ = async () => {
      var F;
      if (d.value) return;
      if (t.beforeChange) {
        r.value = !0;
        try {
          if (!await t.beforeChange()) {
            r.value = !1;
            return;
          }
        } catch {
          r.value = !1;
          return;
        }
        r.value = !1;
      }
      const x = c.value ? t.inactiveValue : t.activeValue;
      o("update:modelValue", x), o("change", x), t.validateEvent && ((F = s == null ? void 0 : s.validate) == null || F.call(s, "change")), me(() => {
        i.value.checked = c.value;
      });
    }, h = () => {
    }, w = (x) => {
      o("focus", x);
    }, A = (x) => {
      var F;
      o("blur", x), t.validateEvent && ((F = s == null ? void 0 : s.validate) == null || F.call(s, "blur"));
    };
    return e({
      focus: $,
      blur: p,
      checked: c
    }), (x, F) => (f(), g("div", {
      class: K(["lp-switch", {
        "lp-switch--checked": c.value,
        "lp-switch--disabled": d.value,
        "lp-switch--loading": x.loading,
        [`lp-switch--${a.value}`]: a.value
      }]),
      onClick: _
    }, [
      L("input", {
        ref_key: "inputRef",
        ref: i,
        class: "lp-switch__input",
        type: "checkbox",
        checked: c.value,
        disabled: d.value,
        onChange: h,
        onFocus: w,
        onBlur: A
      }, null, 40, $a),
      L("span", Ca, [
        x.loading ? (f(), g("div", ka, F[0] || (F[0] = [
          L("i", { class: "lp-switch__loading-icon" }, null, -1)
        ]))) : D("", !0),
        x.inlinePrompt && (x.activeText || x.inactiveText) ? (f(), g("span", Sa, [
          c.value ? (f(), g("span", xa, ee(x.activeText), 1)) : (f(), g("span", Ta, ee(x.inactiveText), 1))
        ])) : D("", !0),
        L("div", Ea, [
          x.activeIcon && c.value ? (f(), g("i", {
            key: 0,
            class: K([x.activeIcon, "lp-switch__action-icon"])
          }, null, 2)) : x.inactiveIcon && !c.value ? (f(), g("i", {
            key: 1,
            class: K([x.inactiveIcon, "lp-switch__action-icon"])
          }, null, 2)) : D("", !0)
        ])
      ]),
      !x.inlinePrompt && x.activeText && c.value ? (f(), g("span", La, ee(x.activeText), 1)) : D("", !0),
      !x.inlinePrompt && x.inactiveText && !c.value ? (f(), g("span", Oa, ee(x.inactiveText), 1)) : D("", !0)
    ], 2));
  }
});
let Aa = {
  install: (n) => {
    n.component(zt.name, zt);
  }
};
const Ma = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpSwitch: zt,
  default: Aa
}, Symbol.toStringTag, { value: "Module" })), Pa = {
  name: "lp-transition"
}, ft = /* @__PURE__ */ le({
  ...Pa,
  props: {
    name: { default: "" },
    tag: { default: "" }
  },
  setup(n) {
    const e = n;
    return (l, t) => e.name ? (f(), ge(ol, {
      key: 0,
      name: e.name,
      tag: e.tag
    }, {
      default: xe(() => [
        ne(l.$slots, "default")
      ]),
      _: 3
    }, 8, ["name", "tag"])) : ne(l.$slots, "default", { key: 1 });
  }
}), Ia = { class: "lp-table__header-wrapper" }, Ba = { class: "lp-table__thead" }, Ra = { class: "lp-table__tr" }, za = {
  key: 0,
  class: "lp-table__th lp-table__th--expand"
}, Fa = {
  class: "lp-table__body-wrapper",
  ref: "bodyWrapRef"
}, Na = { class: "lp-table__tbody" }, Va = { class: "lp-table__tr" }, Wa = {
  key: 0,
  class: "lp-table__td lp-table__td--expand"
}, Da = ["onClick"], Ha = {
  key: 0,
  class: "lp-table__tr lp-table__expand-row"
}, Ua = ["colspan"], Ga = { class: "lp-table__expand-content" }, Ka = {
  name: "lp-table"
}, Ya = /* @__PURE__ */ le({
  ...Ka,
  props: {
    columns: { default: () => [] },
    data: { default: () => [] },
    stripe: { type: Boolean, default: !1 },
    border: { type: Boolean, default: !1 },
    rowKey: {},
    defaultExpandAll: { type: Boolean, default: !1 },
    rowTransitionName: { default: "" }
  },
  setup(n) {
    Xt((y) => ({
      "6d1381e2": r
    }));
    const e = Ln(), l = B(null), t = B(null), o = B(0), s = B([]), i = B([]), r = "52px", a = I(() => !!e.expand), d = I(() => s.value.length + (a.value ? 1 : 0)), c = n;
    function $(y) {
      if (!y) return 0;
      const O = parseFloat(y.replace(/px|%|em|rem/g, ""));
      return Number.isNaN(O) ? 0 : O;
    }
    function p() {
      return a.value ? $(r) : 0;
    }
    function _(y) {
      return Vn(y, {
        stickyLeftOffset: p()
      });
    }
    de(
      () => [c.columns, a.value],
      () => {
        s.value = _(c.columns);
      },
      { immediate: !0, deep: !0 }
    );
    const h = I(() => {
      if (!s.value || s.value.length === 0)
        return a.value ? r : "auto";
      let y = a.value ? $(r) : 0;
      return s.value.forEach((O) => {
        const j = $(O.computedWidth), Y = $(O.computedMinWidth);
        j > 0 ? y += j : Y > 0 && (y += Y);
      }), y < o.value || y === 0 ? "100%" : `${y}px`;
    }), w = I(() => [c.stripe ? "lp-table--striped" : "", c.border ? "lp-table--bordered" : ""]);
    function A(y, O) {
      return (c.rowKey ? y == null ? void 0 : y[c.rowKey] : void 0) ?? `__index_${O}`;
    }
    function x() {
      if (!a.value) {
        i.value = [];
        return;
      }
      const y = c.data.map((j, Y) => A(j, Y));
      if (c.defaultExpandAll) {
        i.value = y;
        return;
      }
      const O = new Set(y);
      i.value = i.value.filter((j) => O.has(j));
    }
    function F(y, O) {
      return i.value.includes(A(y, O));
    }
    function b(y, O) {
      const j = A(y, O);
      if (i.value.includes(j)) {
        i.value = i.value.filter((Y) => Y !== j);
        return;
      }
      i.value = [...i.value, j];
    }
    function P() {
      o.value = l.value ? l.value.clientWidth : 0;
    }
    function u() {
      const y = o.value, O = t.value;
      if (!O || y <= 0) return;
      if (O.scrollWidth > y) {
        const Y = s.value.map((S) => {
          if (!S.computedWidth && !S.computedMinWidth) {
            const { computedWidth: k, computedMinWidth: R, computedStickyLeft: J, computedStickyRight: ye, ...re } = S;
            return { ...re, minWidth: "100px" };
          }
          const { computedWidth: T, computedMinWidth: W, computedStickyLeft: H, computedStickyRight: N, ...te } = S;
          return te;
        });
        s.value = _(Y);
      }
    }
    let v = null;
    return de(
      () => [c.data, c.rowKey, c.defaultExpandAll, a.value],
      () => {
        x();
      },
      { immediate: !0, deep: !0 }
    ), ke(() => {
      P(), v = new ResizeObserver(() => {
        P(), u();
      }), l.value && v.observe(l.value), setTimeout(() => {
        P(), u();
      }, 0);
    }), qe(() => {
      v == null || v.disconnect();
    }), de(
      () => [c.columns, c.data, a.value],
      () => {
        setTimeout(() => {
          u();
        }, 0);
      },
      { deep: !0 }
    ), (y, O) => (f(), g("div", {
      class: "lp-table-box",
      ref_key: "containerRef",
      ref: l
    }, [
      ce(pt, { class: "lp-table__scrollbar" }, {
        default: xe(() => [
          L("div", Ia, [
            L("table", {
              class: K(["lp-table", w.value]),
              style: he({ width: h.value })
            }, [
              L("colgroup", null, [
                a.value ? (f(), g("col", {
                  key: 0,
                  style: he({ width: r })
                }, null, 4)) : D("", !0),
                (f(!0), g(ve, null, we(s.value, (j) => (f(), g("col", {
                  key: j.name,
                  style: he({ width: j.computedWidth || j.computedMinWidth })
                }, null, 4))), 128))
              ]),
              L("thead", Ba, [
                L("tr", Ra, [
                  a.value ? (f(), g("th", za)) : D("", !0),
                  (f(!0), g(ve, null, we(s.value, (j) => (f(), g("th", {
                    key: j.name,
                    class: K(["lp-table__th", j.align && `lp-table__th--${j.align}`, j.fixed && `fixed-${j.fixed}`]),
                    style: he({
                      left: j.computedStickyLeft,
                      right: j.computedStickyRight
                    })
                  }, ee(j.title), 7))), 128))
                ])
              ])
            ], 6)
          ]),
          L("div", Fa, [
            L("table", {
              class: K(["lp-table", w.value]),
              ref_key: "tableRef",
              ref: t,
              style: he({ width: h.value })
            }, [
              L("colgroup", null, [
                a.value ? (f(), g("col", {
                  key: 0,
                  style: he({ width: r })
                }, null, 4)) : D("", !0),
                (f(!0), g(ve, null, we(s.value, (j) => (f(), g("col", {
                  key: j.name,
                  style: he({ width: j.computedWidth || j.computedMinWidth })
                }, null, 4))), 128))
              ]),
              L("tbody", Na, [
                ce(ft, {
                  name: c.rowTransitionName
                }, {
                  default: xe(() => [
                    (f(!0), g(ve, null, we(c.data, (j, Y) => (f(), g(ve, {
                      key: A(j, Y)
                    }, [
                      L("tr", Va, [
                        a.value ? (f(), g("td", Wa, [
                          L("button", {
                            type: "button",
                            class: "lp-table__expand-trigger",
                            onClick: Re((S) => b(j, Y), ["stop"])
                          }, [
                            ce(G(_e), {
                              is: "right",
                              size: "14",
                              color: "#ccc",
                              class: K(["lp-table__expand-icon", { active: F(j, Y) }])
                            }, null, 8, ["class"])
                          ], 8, Da)
                        ])) : D("", !0),
                        (f(!0), g(ve, null, we(s.value, (S) => (f(), g("td", {
                          key: S.name,
                          class: K(["lp-table__td", S.align && `lp-table__td--${S.align}`, S.fixed && `fixed-${S.fixed}`]),
                          style: he({
                            left: S.computedStickyLeft,
                            right: S.computedStickyRight
                          })
                        }, [
                          G(e)[`column.${S.name}`] ? ne(y.$slots, `column.${S.name}`, {
                            key: 0,
                            item: j,
                            column: S,
                            index: Y
                          }, void 0, !0) : G(e)[`field.${S.name}`] ? ne(y.$slots, `field.${S.name}`, {
                            key: 1,
                            item: j,
                            column: S,
                            index: Y
                          }, void 0, !0) : (f(), g(ve, { key: 2 }, [
                            Le(ee(j[S.name]), 1)
                          ], 64))
                        ], 6))), 128))
                      ]),
                      a.value && F(j, Y) ? (f(), g("tr", Ha, [
                        L("td", {
                          colspan: d.value,
                          class: "lp-table__td lp-table__td--expand-content"
                        }, [
                          L("div", Ga, [
                            ne(y.$slots, "expand", {
                              item: j,
                              index: Y,
                              expanded: !0
                            }, void 0, !0)
                          ])
                        ], 8, Ua)
                      ])) : D("", !0)
                    ], 64))), 128))
                  ]),
                  _: 3
                }, 8, ["name"])
              ])
            ], 6)
          ], 512)
        ]),
        _: 3
      })
    ], 512));
  }
}), Ft = /* @__PURE__ */ Pe(Ya, [["__scopeId", "data-v-36345f8a"]]), Xa = {
  title: {
    type: String,
    default: ""
  },
  name: {
    type: String,
    default: ""
  },
  width: {
    type: String,
    default: ""
  },
  align: {
    type: String,
    default: "left"
  },
  fixed: {
    type: String,
    default: ""
  },
  fixedRight: {
    type: Boolean,
    default: !1
  },
  sortable: {
    type: Boolean,
    default: !1
  }
}, Nt = le({
  name: "LpTableColumn",
  props: Xa,
  setup(n) {
  },
  render() {
  }
});
let qa = {
  install: (n) => {
    n.component(Ft.name, Ft), n.component(Nt.name, Nt);
  }
};
const Ja = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpTable: Ft,
  LpTableColumn: Nt,
  default: qa
}, Symbol.toStringTag, { value: "Module" })), Za = ["onClick"], Qa = { class: "text" }, ei = {
  name: "lp-tabs"
}, Vt = /* @__PURE__ */ le({
  ...ei,
  props: /* @__PURE__ */ Ye({
    data: { default: () => [] },
    keys: { default: () => ({ value: "value", title: "title" }) },
    type: { default: "default" },
    full: { type: Boolean, default: !1 },
    column: { type: Boolean, default: !1 },
    modelType: { default: "field" },
    modelField: { default: void 0 }
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: /* @__PURE__ */ Ye(["change"], ["update:modelValue"]),
  setup(n, { emit: e }) {
    const l = mt(n, "modelValue"), t = e, o = n;
    function s(a, d) {
      return a[o.keys.value] ?? d;
    }
    function i(a, d) {
      return o.modelType === "index" ? l.value === d : o.modelType === "field" && o.modelField ? l.value === a[o.modelField] : l.value === a[o.keys.value];
    }
    function r(a, d) {
      let c;
      o.modelType === "index" ? c = d : o.modelType === "field" && o.modelField ? c = a[o.modelField] : c = a[o.keys.value], l.value = c, t("change", {
        value: c,
        item: a,
        index: d
      });
    }
    return (a, d) => (f(), g("div", {
      class: K(["lp-tabs", [{ column: a.column, full: a.full }, a.type ? `type-${a.type}` : ""]])
    }, [
      (f(!0), g(ve, null, we(a.data, (c, $) => (f(), g("div", {
        class: K(["item", { active: i(c, $) }]),
        key: s(c, $),
        onClick: (p) => r(c, $)
      }, [
        L("span", Qa, ee(c[a.keys.title]), 1)
      ], 10, Za))), 128))
    ], 2));
  }
});
let ti = {
  install: (n) => {
    n.component(Vt.name, Vt);
  }
};
const ni = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpTabs: Vt,
  default: ti
}, Symbol.toStringTag, { value: "Module" })), li = {
  name: "LpTag"
}, oi = /* @__PURE__ */ le({
  ...li,
  props: {
    type: { default: "" },
    size: { default: "" },
    plain: { type: Boolean, default: !1 },
    round: { type: Boolean, default: !1 },
    closable: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["click", "close"],
  setup(n, { emit: e }) {
    const l = n, t = e, o = (i) => {
      l.disabled || t("click", i);
    }, s = (i) => {
      l.disabled || t("close", i);
    };
    return (i, r) => (f(), g("div", {
      class: K(["lp-tag", [
        i.type ? `type-${i.type}` : "",
        i.size ? `size-${i.size}` : "",
        {
          plain: i.plain,
          round: i.round,
          disabled: i.disabled
        }
      ]]),
      onClick: o
    }, [
      ne(i.$slots, "default", {}, void 0, !0),
      i.closable ? (f(), g("div", {
        key: 0,
        class: "close-box",
        onClick: Re(s, ["stop"])
      }, [
        ce(G(_e), {
          is: "close",
          size: "12"
        })
      ])) : D("", !0)
    ], 2));
  }
}), ht = /* @__PURE__ */ Pe(oi, [["__scopeId", "data-v-f94358c1"]]);
let si = {
  install: (n) => {
    n.component(ht.name, ht);
  }
};
const ai = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpTag: ht,
  default: si
}, Symbol.toStringTag, { value: "Module" }));
let ii = {
  install: (n) => {
    n.component(ft.name, ft);
  }
};
const ri = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpTransition: ft,
  default: ii
}, Symbol.toStringTag, { value: "Module" }));
let ui = {
  install: (n) => {
    n.component(dt.name, dt);
  }
};
const ci = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpTree: dt,
  default: ui
}, Symbol.toStringTag, { value: "Module" }));
var Ze = /* @__PURE__ */ ((n) => (n.TEXT = "text", n.IMG = "img", n.FILE = "file", n))(Ze || {}), Ce = /* @__PURE__ */ ((n) => (n.STRING = "string", n.ARRAY = "array", n.OBJECT_ARRAY = "objectArray", n.AUTO = "", n))(Ce || {}), be = /* @__PURE__ */ ((n) => (n.PENDING = "pending", n.UPLOADING = "uploading", n.SUCCESS = "success", n.ERROR = "error", n))(be || {});
class Zt {
  constructor(e, l, t) {
    se(this, "item");
    se(this, "file");
    se(this, "action");
    se(this, "abortController");
    se(this, "callbacks", {});
    se(this, "frontendOption");
    // 前端直传配置
    /**
     * 上传进度
     */
    se(this, "progress", B({
      loaded: 0,
      total: 0,
      percentage: 0
    }));
    /**
     * 上传状态
     */
    se(this, "progressStatus", "");
    this.item = e, this.file = l, this.action = t;
  }
  static create(e, l, t) {
    return new Zt(e, l, t);
  }
  /**
   * 获取前端直传配置
   */
  async getFrontendUploadOption() {
    if (!this.action || this.action.type !== "option")
      return null;
    try {
      const e = await _t.post(this.action.url, {}, {
        headers: {
          "Content-Type": "application/json",
          ...this.action.headers
        }
      });
      return e.data.data || e.data;
    } catch (e) {
      throw console.error("获取前端直传配置失败:", e), e;
    }
  }
  /**
   * 处理文件名和扩展名
   */
  processFileName(e, l) {
    const t = {};
    if (l.includes("etag") && (t.etag = Date.now().toString() + Math.random().toString(36).substr(2, 9)), l.includes("ext")) {
      const o = e.lastIndexOf(".");
      t.ext = o > -1 ? e.substring(o) : "";
    }
    return t;
  }
  /**
   * 替换字符串中的占位符
   */
  replacePlaceholders(e, l) {
    let t = e;
    return Object.entries(l).forEach(([o, s]) => {
      t = t.replace(new RegExp(`\\$\\(${o}\\)`, "g"), s);
    }), t;
  }
  /**
   * 前端直传上传
   */
  async frontendDirectUpload() {
    var s, i, r, a, d, c;
    if (!this.file || !this.frontendOption)
      throw new Error("文件或前端直传配置不存在");
    const e = new FormData(), l = this.processFileName(this.file.name, this.frontendOption.handles), t = this.replacePlaceholders(
      this.frontendOption.data.key || "",
      l
    );
    Object.entries(this.frontendOption.data).forEach(([$, p]) => {
      typeof p == "string" ? e.append($, this.replacePlaceholders(p, l)) : e.append($, String(p));
    });
    const o = this.frontendOption.fieldName || "file";
    e.append(o, this.file), this.abortController = new AbortController();
    try {
      const $ = await _t.post(this.frontendOption.url, e, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        signal: this.abortController.signal,
        onUploadProgress: (_) => {
          var h, w;
          if (_.total) {
            const A = {
              loaded: _.loaded,
              total: _.total,
              percentage: Math.round(_.loaded / _.total * 100)
            };
            (w = (h = this.callbacks).onProgress) == null || w.call(h, A), this.progress.value = A;
          }
        }
      }), p = {
        data: {
          fullUrl: `${this.frontendOption.domain}/${t}`,
          key: t,
          url: `${this.frontendOption.domain}/${t}`
        }
      };
      return (i = (s = this.callbacks).onSuccess) == null || i.call(s, p), p;
    } catch ($) {
      if ($.name === "CanceledError") {
        const _ = new Error("上传已取消");
        throw (a = (r = this.callbacks).onError) == null || a.call(r, _), _;
      }
      const p = new Error(`前端直传失败: ${$.message}`);
      throw (c = (d = this.callbacks).onError) == null || c.call(d, p), p;
    }
  }
  /**
   * 设置回调函数
   */
  setCallbacks(e) {
    return this.callbacks = { ...this.callbacks, ...e }, this;
  }
  /**
   * 上传文件
   * @returns Promise<any>
   */
  async upload() {
    if (!this.file || !this.action)
      throw new Error("文件或上传配置不存在");
    if (this.action.type === "option")
      try {
        if (this.frontendOption = await this.getFrontendUploadOption(), console.log("前端直传配置:", this.frontendOption), this.frontendOption)
          return await this.frontendDirectUpload();
      } catch (e) {
        console.error("前端直传配置获取失败，回退到普通上传:", e);
      }
    return this.normalUpload();
  }
  /**
   * 普通上传
   */
  async normalUpload() {
    var l, t, o, s, i, r;
    if (!this.file || !this.action)
      throw new Error("文件或上传地址不存在");
    const e = new FormData();
    e.append("file", this.file), this.abortController = new AbortController();
    try {
      const a = await _t.post(this.action.url, e, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...this.action.headers
        },
        signal: this.abortController.signal,
        onUploadProgress: (d) => {
          var c, $;
          if (d.total) {
            const p = {
              loaded: d.loaded,
              total: d.total,
              percentage: Math.round(d.loaded / d.total * 100)
            };
            ($ = (c = this.callbacks).onProgress) == null || $.call(c, p), this.progress.value = p;
          }
        }
      });
      return (t = (l = this.callbacks).onSuccess) == null || t.call(l, a.data), a.data;
    } catch (a) {
      if (a.name === "CanceledError") {
        const c = new Error("上传已取消");
        throw (s = (o = this.callbacks).onError) == null || s.call(o, c), c;
      }
      const d = new Error(`上传失败: ${a.message}`);
      throw (r = (i = this.callbacks).onError) == null || r.call(i, d), d;
    }
  }
  /**
   * 中断上传
   */
  abort() {
    this.abortController && (this.abortController.abort(), this.abortController = void 0);
  }
  /**
   * 获取上传状态
   */
  getStatus() {
    return this.abortController ? this.abortController.signal.aborted ? "aborted" : this.progress.value.percentage === 100 ? "success" : this.progress.value.percentage > 0 ? "uploading" : "pending" : "pending";
  }
}
function di(n, e) {
  return e.split(".").reduce((l, t) => l && l[t] !== void 0 ? l[t] : null, n);
}
function wt(n) {
  if (!n) return "";
  try {
    const l = n.split("?")[0].split("#")[0].split("/"), t = l[l.length - 1];
    return !t || t.startsWith(".") ? "未知文件" : decodeURIComponent(t);
  } catch (e) {
    return console.warn("提取文件名失败:", e), "未知文件";
  }
}
function pi(n, e) {
  const l = B([]), t = B(/* @__PURE__ */ new Map()), o = /* @__PURE__ */ new Map();
  let s = 0, i = null;
  const r = () => e.type === Ze.IMG ? "image/*" : e.type === Ze.FILE ? "*" : e.type === Ze.TEXT ? "text/*" : "", a = () => {
    i = n.value;
    const b = document.createElement("input");
    b.type = "file", b.accept = e.value.accept || r(), b.multiple = e.value.limit !== 1, b.addEventListener("change", async (P) => {
      const v = P.target.files;
      if (v && v.length > 0) {
        if (e.value.limit === 1 && l.value.length > 0) {
          const y = l.value[0];
          y.uploader, y._id && o.delete(y._id), l.value = [];
        }
        for (let y = 0; y < v.length; y++) {
          const O = v[y], j = `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, Y = {
            _id: j,
            url: "",
            name: O.name,
            size: O.size,
            type: O.type,
            uploader: null,
            status: be.PENDING
          };
          if (O.type.startsWith("image/")) {
            const S = new FileReader();
            S.readAsDataURL(O), S.onload = () => {
              Y.url = S.result;
            };
          }
          l.value.push(Y), o.set(j, O), e.value.autoUpload && e.value.action && await d(Y, O);
        }
      }
    }), b.click();
  }, d = async (b, P) => {
    if (!e.value.action) {
      console.warn("未配置上传地址");
      return;
    }
    const u = Zt.create(b, P, e.value.action);
    b.uploader = u, b.status = be.UPLOADING, u.setCallbacks({
      onProgress: (v) => {
        console.log("上传进度:", v);
      },
      onSuccess: (v) => {
        const y = e.value.responseField || "data.fullUrl", O = di(v, y);
        O && (b.url = O, b.status = be.SUCCESS, p()), t.value.delete(b), console.log("上传成功:", v);
      },
      onError: (v) => {
        b.status = be.ERROR, t.value.delete(b), console.error("上传失败:", v);
      }
    });
    try {
      await u.upload();
    } catch (v) {
      console.error("上传异常:", v);
    }
  }, c = (b) => {
    if (b.uploader && (b.uploader.abort(), b.uploader = null, t.value.delete(b)), b._id && o.delete(b._id), e.value.limit === 1)
      n.value = i, $(i);
    else {
      const P = l.value.indexOf(b);
      P > -1 && (l.value.splice(P, 1), p());
    }
  }, $ = (b) => {
    o.clear();
    let P = e.value.valueType;
    if (e.value.valueType == Ce.AUTO && (e.value.limit == 1 ? P = Ce.STRING : P = Ce.ARRAY), !b) {
      l.value = [];
      return;
    }
    if (P === Ce.ARRAY)
      l.value = b.map((u) => ({
        _id: `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        url: u,
        name: wt(u),
        uploader: null,
        status: be.SUCCESS
      }));
    else if (P === Ce.STRING) {
      let u = e.value.limit === 1 ? [b] : b.split(",");
      l.value = u.map((v) => ({
        _id: `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        url: v,
        name: wt(v),
        uploader: null,
        status: be.SUCCESS
      }));
    } else P === Ce.OBJECT_ARRAY ? l.value = b.map((u) => ({
      _id: u._id || `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      url: u.url,
      name: u.name || wt(u.url),
      size: u.size || 0,
      type: u.type || "",
      uploader: null,
      status: be.SUCCESS
    })) : l.value = [];
  }, p = () => {
    s++;
    let b = e.value.valueType;
    e.value.valueType == Ce.AUTO && (e.value.limit == 1 ? b = Ce.STRING : b = Ce.ARRAY);
    let P;
    const u = l.value.filter(
      (v) => v.url && !v.url.startsWith("data:")
      // 排除base64预览URL
    );
    b === Ce.ARRAY ? P = u.map((v) => v.url) : b === Ce.STRING ? e.value.limit === 1 ? P = u.length > 0 ? u[0].url : "" : P = u.map((v) => v.url).join(",") : b === Ce.OBJECT_ARRAY ? P = u.map((v) => ({
      url: v.url,
      name: v.name,
      size: v.size,
      type: v.type
    })) : P = "", n.value = P, s--;
  }, _ = () => {
    $(n.value);
  }, h = (b) => {
    const P = l.value[b];
    P.uploader && c(P), o.delete(P._id), l.value.splice(b, 1), p();
  };
  return de(l, (b, P) => {
    s === 0 && (b.some(
      (v) => v.status === be.SUCCESS || v.status === be.ERROR
    ) || b.length < ((P == null ? void 0 : P.length) || 0)) && p();
  }, { deep: !0 }), de(() => n.value, (b, P) => {
    if (s === 0 && JSON.stringify(b) !== JSON.stringify(P)) {
      s++;
      try {
        $(b);
      } finally {
        s--;
      }
    }
  }, { deep: !0 }), {
    // 选择文件
    selectFile: a,
    // 文件列表
    fileList: l,
    // 上传进度
    uploadProgress: t,
    // 刷新文件列表
    flushFileList: $,
    // 更新模型值
    updateModelValue: p,
    // 初始化上传
    initUpload: _,
    // 删除文件
    onDelete: h,
    // 上传文件
    uploadFile: d,
    // 取消上传
    cancelUpload: c,
    // 获取文件列表
    getFileList: () => l.value,
    // 获取文件对象列表
    getFileObjectList: () => (console.log("fileObjectMap:", o), l.value.map((b) => ({
      fileItem: b,
      file: o.get(b._id) || null
    })).filter((b) => b.file !== null)),
    // 上传所有文件
    uploadAllFiles: async () => {
      const b = l.value.filter(
        (P) => P.status === be.PENDING
      );
      if (b.length === 0) {
        console.warn("没有待上传的文件");
        return;
      }
      if (!e.value.action) {
        console.warn("未配置上传地址");
        return;
      }
      for (const P of b) {
        const u = o.get(P._id);
        u ? await d(P, u) : (console.warn("找不到对应的File对象:", P.name), console.log("fileObjectMap:", P, o));
      }
    },
    // 清除所有文件
    clearAllFiles: () => {
      l.value = [], t.value.clear(), o.clear(), p();
    }
  };
}
const fi = { class: "lp-upload" }, hi = {
  key: 0,
  class: "lp-upload__file-list"
}, vi = ["onClick"], mi = ["src"], gi = {
  key: 1,
  class: "lp-upload__placeholder"
}, yi = {
  key: 2,
  class: "lp-upload__progress"
}, _i = { class: "lp-upload__progress-text" }, bi = ["onClick"], wi = {
  key: 3,
  class: "lp-upload__handle"
}, $i = {
  key: 1,
  class: "lp-upload__file-mode"
}, Ci = { class: "lp-upload__file-info" }, ki = { class: "lp-upload__file-details" }, Si = { class: "lp-upload__file-name" }, xi = {
  key: 0,
  class: "lp-upload__file-size"
}, Ti = {
  key: 0,
  class: "lp-upload__file-progress"
}, Ei = { class: "lp-upload__progress-text" }, Li = { class: "lp-upload__file-status" }, Oi = {
  key: 0,
  class: "lp-upload__status-success"
}, ji = {
  key: 1,
  class: "lp-upload__status-error"
}, Ai = {
  key: 2,
  class: "lp-upload__status-pending"
}, Mi = { class: "lp-upload__file-actions" }, Pi = { class: "lp-upload__control flex" }, Ii = {
  name: "LpUpload"
}, Wt = /* @__PURE__ */ le({
  ...Ii,
  props: /* @__PURE__ */ Ye({
    type: { default: "img" },
    limit: { default: 1 },
    accept: { default: "" },
    array: { type: Boolean },
    action: {},
    valueType: { default: Ce.AUTO },
    autoUpload: { type: Boolean, default: !0 },
    responseField: { default: "data.fullUrl" }
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(n, { expose: e }) {
    const l = n, t = mt(n, "modelValue"), o = Ee("uploadConfig", null), s = I(() => ({
      ...l,
      action: l.action || o
    })), {
      // 选择文件
      selectFile: i,
      // 文件列表
      fileList: r,
      // 初始化上传
      initUpload: a,
      // 删除文件
      onDelete: d,
      // 取消上传
      cancelUpload: c,
      // 获取文件列表
      getFileList: $,
      // 获取文件对象列表
      getFileObjectList: p,
      // 上传所有文件
      uploadAllFiles: _,
      // 清除所有文件
      clearAllFiles: h
    } = pi(t, s);
    $e({});
    const w = I(() => !s.value.limit || r.value.length < s.value.limit);
    I(() => r.value.some((b) => b.status === be.PENDING));
    const A = (b) => b < 1024 ? b + " B" : b < 1024 * 1024 ? (b / 1024).toFixed(1) + " KB" : b < 1024 * 1024 * 1024 ? (b / (1024 * 1024)).toFixed(1) + " MB" : (b / (1024 * 1024 * 1024)).toFixed(1) + " GB", x = async () => {
      await _();
    };
    function F(b) {
      s.value.limit === 1 && i();
    }
    return e({
      getFileList: $,
      getFileObjectList: p,
      uploadAllFiles: _,
      selectFile: i,
      fileList: r,
      clearAllFiles: h
    }), ke(() => {
      a();
    }), (b, P) => (f(), g("div", fi, [
      s.value.type === "img" ? (f(), g("div", hi, [
        (f(!0), g(ve, null, we(G(r), (u, v) => (f(), g("div", {
          class: "lp-upload__item",
          key: v,
          onClick: (y) => F()
        }, [
          u.url && u.url.startsWith("http") ? (f(), g("img", {
            key: 0,
            class: "img",
            src: u.url,
            alt: ""
          }, null, 8, mi)) : (f(), g("div", gi, [
            ce(G(_e), {
              is: "upload",
              size: "22",
              color: "#ccc"
            })
          ])),
          u.uploader && u.status === G(be).UPLOADING ? (f(), g("div", yi, [
            ce(G(Bt), {
              percentage: u.uploader.progress.percentage,
              status: u.uploader.progressStatus,
              "show-text": !1
            }, null, 8, ["percentage", "status"]),
            L("div", _i, ee(u.uploader.progress.percentage) + "%", 1),
            L("div", {
              class: "lp-upload__cancel",
              onClick: Re((y) => G(c)(u), ["stop"])
            }, [
              ce(G(_e), {
                is: "close",
                size: "12",
                color: "#fff"
              })
            ], 8, bi)
          ])) : (f(), g("div", wi, [
            ce(G(_e), {
              is: "delete",
              size: "16",
              color: "#fff",
              onClick: Re((y) => G(d)(v), ["stop"])
            }, null, 8, ["onClick"])
          ]))
        ], 8, vi))), 128)),
        w.value ? (f(), g("div", {
          key: 0,
          class: "lp-upload__item",
          onClick: P[0] || (P[0] = //@ts-ignore
          (...u) => G(i) && G(i)(...u))
        }, [
          ne(b.$slots, "select", {}, () => [
            ce(G(_e), {
              is: "upload",
              size: "22",
              color: "#ff0000"
            })
          ])
        ])) : D("", !0)
      ])) : (f(), g("div", $i, [
        (f(!0), g(ve, null, we(G(r), (u, v) => {
          var y, O, j, Y;
          return f(), g("div", {
            class: "lp-upload__file-item",
            key: v
          }, [
            L("div", Ci, [
              ce(G(_e), {
                is: "teaching",
                size: "20",
                color: "#409eff"
              }),
              L("div", ki, [
                L("div", Si, ee(u.name || "未知文件"), 1),
                u.size ? (f(), g("div", xi, ee(A(u.size)), 1)) : D("", !0)
              ])
            ]),
            u.status === G(be).UPLOADING ? (f(), g("div", Ti, [
              ce(G(Bt), {
                percentage: ((O = (y = u.uploader) == null ? void 0 : y.progress) == null ? void 0 : O.percentage) || 0,
                "show-text": !1,
                size: "small"
              }, null, 8, ["percentage"]),
              L("span", Ei, ee(((Y = (j = u.uploader) == null ? void 0 : j.progress) == null ? void 0 : Y.percentage) || 0) + "%", 1)
            ])) : D("", !0),
            L("div", Li, [
              u.status === G(be).SUCCESS ? (f(), g("span", Oi, [
                ce(G(_e), {
                  is: "security",
                  size: "16",
                  color: "#67c23a"
                })
              ])) : u.status === G(be).ERROR ? (f(), g("span", ji, [
                ce(G(_e), {
                  is: "close",
                  size: "16",
                  color: "#f56c6c"
                })
              ])) : u.status === G(be).PENDING ? (f(), g("span", Ai, [
                ce(G(_e), {
                  is: "time",
                  size: "16",
                  color: "#e6a23c"
                })
              ])) : D("", !0)
            ]),
            L("div", Mi, [
              ce(G(_e), {
                is: "delete",
                size: "16",
                color: "#f56c6c",
                onClick: (S) => G(d)(v),
                style: { cursor: "pointer" }
              }, null, 8, ["onClick"])
            ])
          ]);
        }), 128)),
        L("div", Pi, [
          L("div", {
            class: "lp-upload__select-btn",
            onClick: P[1] || (P[1] = //@ts-ignore
            (...u) => G(i) && G(i)(...u))
          }, [
            ne(b.$slots, "select", {}, () => [
              P[2] || (P[2] = L("button", { class: "btn btn-primary" }, "选择文件", -1))
            ])
          ]),
          s.value.autoUpload ? D("", !0) : (f(), g("div", {
            key: 0,
            class: "lp-upload__upload-btn",
            onClick: x
          }, [
            ne(b.$slots, "upload", {}, () => [
              P[3] || (P[3] = L("button", { class: "btn btn-success" }, "上传文件", -1))
            ])
          ]))
        ])
      ]))
    ]));
  }
});
let Bi = {
  install: (n) => {
    n.component(Wt.name, Wt);
  }
};
const Ri = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LpUpload: Wt,
  UploadStatusEnum: be,
  UploadTypeEnum: Ze,
  UploadValueTypeEnum: Ce,
  default: Bi
}, Symbol.toStringTag, { value: "Module" }));
var Hn = typeof global == "object" && global && global.Object === Object && global, zi = typeof self == "object" && self && self.Object === Object && self, Ve = Hn || zi || Function("return this")(), vt = Ve.Symbol, Un = Object.prototype, Fi = Un.hasOwnProperty, Ni = Un.toString, Je = vt ? vt.toStringTag : void 0;
function Vi(n) {
  var e = Fi.call(n, Je), l = n[Je];
  try {
    n[Je] = void 0;
    var t = !0;
  } catch {
  }
  var o = Ni.call(n);
  return t && (e ? n[Je] = l : delete n[Je]), o;
}
var Wi = Object.prototype, Di = Wi.toString;
function Hi(n) {
  return Di.call(n);
}
var Ui = "[object Null]", Gi = "[object Undefined]", vn = vt ? vt.toStringTag : void 0;
function lt(n) {
  return n == null ? n === void 0 ? Gi : Ui : vn && vn in Object(n) ? Vi(n) : Hi(n);
}
function Qt(n) {
  return n != null && typeof n == "object";
}
var Ki = Array.isArray;
function Gn(n) {
  var e = typeof n;
  return n != null && (e == "object" || e == "function");
}
var Yi = "[object AsyncFunction]", Xi = "[object Function]", qi = "[object GeneratorFunction]", Ji = "[object Proxy]";
function Kn(n) {
  if (!Gn(n))
    return !1;
  var e = lt(n);
  return e == Xi || e == qi || e == Yi || e == Ji;
}
var $t = Ve["__core-js_shared__"], mn = function() {
  var n = /[^.]+$/.exec($t && $t.keys && $t.keys.IE_PROTO || "");
  return n ? "Symbol(src)_1." + n : "";
}();
function Zi(n) {
  return !!mn && mn in n;
}
var Qi = Function.prototype, er = Qi.toString;
function Ue(n) {
  if (n != null) {
    try {
      return er.call(n);
    } catch {
    }
    try {
      return n + "";
    } catch {
    }
  }
  return "";
}
var tr = /[\\^$.*+?()[\]{}|]/g, nr = /^\[object .+?Constructor\]$/, lr = Function.prototype, or = Object.prototype, sr = lr.toString, ar = or.hasOwnProperty, ir = RegExp(
  "^" + sr.call(ar).replace(tr, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function rr(n) {
  if (!Gn(n) || Zi(n))
    return !1;
  var e = Kn(n) ? ir : nr;
  return e.test(Ue(n));
}
function ur(n, e) {
  return n == null ? void 0 : n[e];
}
function ot(n, e) {
  var l = ur(n, e);
  return rr(l) ? l : void 0;
}
var Dt = ot(Ve, "WeakMap"), cr = 9007199254740991;
function Yn(n) {
  return typeof n == "number" && n > -1 && n % 1 == 0 && n <= cr;
}
function dr(n) {
  return n != null && Yn(n.length) && !Kn(n);
}
var pr = Object.prototype;
function Xn(n) {
  var e = n && n.constructor, l = typeof e == "function" && e.prototype || pr;
  return n === l;
}
var fr = "[object Arguments]";
function gn(n) {
  return Qt(n) && lt(n) == fr;
}
var qn = Object.prototype, hr = qn.hasOwnProperty, vr = qn.propertyIsEnumerable, mr = gn(/* @__PURE__ */ function() {
  return arguments;
}()) ? gn : function(n) {
  return Qt(n) && hr.call(n, "callee") && !vr.call(n, "callee");
};
function gr() {
  return !1;
}
var Jn = typeof exports == "object" && exports && !exports.nodeType && exports, yn = Jn && typeof module == "object" && module && !module.nodeType && module, yr = yn && yn.exports === Jn, _n = yr ? Ve.Buffer : void 0, _r = _n ? _n.isBuffer : void 0, br = _r || gr, wr = "[object Arguments]", $r = "[object Array]", Cr = "[object Boolean]", kr = "[object Date]", Sr = "[object Error]", xr = "[object Function]", Tr = "[object Map]", Er = "[object Number]", Lr = "[object Object]", Or = "[object RegExp]", jr = "[object Set]", Ar = "[object String]", Mr = "[object WeakMap]", Pr = "[object ArrayBuffer]", Ir = "[object DataView]", Br = "[object Float32Array]", Rr = "[object Float64Array]", zr = "[object Int8Array]", Fr = "[object Int16Array]", Nr = "[object Int32Array]", Vr = "[object Uint8Array]", Wr = "[object Uint8ClampedArray]", Dr = "[object Uint16Array]", Hr = "[object Uint32Array]", fe = {};
fe[Br] = fe[Rr] = fe[zr] = fe[Fr] = fe[Nr] = fe[Vr] = fe[Wr] = fe[Dr] = fe[Hr] = !0;
fe[wr] = fe[$r] = fe[Pr] = fe[Cr] = fe[Ir] = fe[kr] = fe[Sr] = fe[xr] = fe[Tr] = fe[Er] = fe[Lr] = fe[Or] = fe[jr] = fe[Ar] = fe[Mr] = !1;
function Ur(n) {
  return Qt(n) && Yn(n.length) && !!fe[lt(n)];
}
function Gr(n) {
  return function(e) {
    return n(e);
  };
}
var Zn = typeof exports == "object" && exports && !exports.nodeType && exports, Qe = Zn && typeof module == "object" && module && !module.nodeType && module, Kr = Qe && Qe.exports === Zn, Ct = Kr && Hn.process, bn = function() {
  try {
    var n = Qe && Qe.require && Qe.require("util").types;
    return n || Ct && Ct.binding && Ct.binding("util");
  } catch {
  }
}(), wn = bn && bn.isTypedArray, Yr = wn ? Gr(wn) : Ur;
function Xr(n, e) {
  return function(l) {
    return n(e(l));
  };
}
var qr = Xr(Object.keys, Object), Jr = Object.prototype, Zr = Jr.hasOwnProperty;
function Qr(n) {
  if (!Xn(n))
    return qr(n);
  var e = [];
  for (var l in Object(n))
    Zr.call(n, l) && l != "constructor" && e.push(l);
  return e;
}
var Ht = ot(Ve, "Map"), Ut = ot(Ve, "DataView"), Gt = ot(Ve, "Promise"), Kt = ot(Ve, "Set"), $n = "[object Map]", eu = "[object Object]", Cn = "[object Promise]", kn = "[object Set]", Sn = "[object WeakMap]", xn = "[object DataView]", tu = Ue(Ut), nu = Ue(Ht), lu = Ue(Gt), ou = Ue(Kt), su = Ue(Dt), De = lt;
(Ut && De(new Ut(new ArrayBuffer(1))) != xn || Ht && De(new Ht()) != $n || Gt && De(Gt.resolve()) != Cn || Kt && De(new Kt()) != kn || Dt && De(new Dt()) != Sn) && (De = function(n) {
  var e = lt(n), l = e == eu ? n.constructor : void 0, t = l ? Ue(l) : "";
  if (t)
    switch (t) {
      case tu:
        return xn;
      case nu:
        return $n;
      case lu:
        return Cn;
      case ou:
        return kn;
      case su:
        return Sn;
    }
  return e;
});
var au = "[object Map]", iu = "[object Set]", ru = Object.prototype, uu = ru.hasOwnProperty;
function cu(n) {
  if (n == null)
    return !0;
  if (dr(n) && (Ki(n) || typeof n == "string" || typeof n.splice == "function" || br(n) || Yr(n) || mr(n)))
    return !n.length;
  var e = De(n);
  if (e == au || e == iu)
    return !n.size;
  if (Xn(n))
    return !Qr(n).length;
  for (var l in n)
    if (uu.call(n, l))
      return !1;
  return !0;
}
function du(n) {
  const e = /* @__PURE__ */ Object.assign({ "./lp-button/index.ts": ml, "./lp-checkbox/index.ts": Sl, "./lp-empty/index.ts": Ol, "./lp-fold/index.ts": zl, "./lp-form/index.ts": Ul, "./lp-input/index.ts": oo, "./lp-layer/index.ts": Io, "./lp-layout/index.ts": Vo, "./lp-list/index.ts": Uo, "./lp-loading/index.ts": Ko, "./lp-menu/index.ts": ds, "./lp-message/index.ts": vs, "./lp-paginate/index.ts": Ls, "./lp-panel/index.ts": Rs, "./lp-progress/index.ts": Ws, "./lp-radio/index.ts": Js, "./lp-scrollbar/index.ts": na, "./lp-select/index.ts": wa, "./lp-switch/index.ts": Ma, "./lp-table/index.ts": Ja, "./lp-tabs/index.ts": ni, "./lp-tag/index.ts": ai, "./lp-transition/index.ts": ri, "./lp-tree/index.ts": ci, "./lp-upload/index.ts": Ri });
  console.debug("%cglobalComponents", "color:green", e), Object.keys(e).forEach((l) => {
    const t = e[l].default;
    cu(t) || n.use(t);
  });
}
const pu = (n, e, l, t) => {
  n.__pressTimer === null && (n.__pressTimer = window.setTimeout(() => {
    n.__longPressed = !0, typeof e.value == "function" && e.value();
  }, l));
}, Tn = (n) => {
  n.__pressTimer !== null && (clearTimeout(n.__pressTimer), n.__pressTimer = null);
}, fu = {
  mounted(n, e) {
    const l = Number(e.arg) || 500;
    n.__pressTimer = null, n.__longPressed = !1;
    const t = (i) => {
      i.preventDefault(), i.stopPropagation(), pu(n, e, l);
    }, o = (i) => {
      Tn(n), setTimeout(() => {
        n.__longPressed = !1;
      }, 100);
    }, s = (i) => {
      n.__longPressed && (console.log("handleClick 阻止默认事件", i), i.stopImmediatePropagation(), i.stopPropagation(), i.preventDefault(), n.__longPressed = !1);
    };
    n.__handleStart = t, n.__handleCancel = o, n.__handleClick = s, n.addEventListener("pointerdown", t), n.addEventListener("pointerup", o), n.addEventListener("pointerleave", o), n.addEventListener("pointercancel", o), n.addEventListener("click", s, !0);
  },
  unmounted(n) {
    n.removeEventListener("pointerdown", n.__handleStart), n.removeEventListener("pointerup", n.__handleCancel), n.removeEventListener("pointerleave", n.__handleCancel), n.removeEventListener("pointercancel", n.__handleCancel), n.removeEventListener("click", n.__handleClick, !0), Tn(n);
  }
}, hu = {
  name: "LooplanUiNeeds",
  title: "Looplan Ui Needs组件库",
  type: "local",
  version: "0.0.1",
  components: [
    "SelectedTag"
  ]
}, vu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  SelectedTag: Dn,
  packageConfig: hu
}, Symbol.toStringTag, { value: "Module" })), mu = { class: "lp-tooltip" }, gu = {
  name: "LpTooltip"
}, yu = /* @__PURE__ */ le({
  ...gu,
  props: {
    msg: { default: "" },
    bgColor: { default: "rgba(0, 0, 0, 0.8)" }
  },
  setup(n) {
    return Xt((e) => ({
      23479595: e.bgColor
    })), $e({}), (e, l) => (f(), g("div", mu, ee(e.msg), 1));
  }
});
function ku(n, e) {
  const l = [];
  let t = null;
  const o = B(!0), s = (c) => {
    c.closeTimer && (clearTimeout(c.closeTimer), c.closeTimer = null), c.layer.close(), c.el.removeEventListener("mouseenter", c.listeners.enter), c.el.removeEventListener("mouseleave", c.listeners.leave);
    const $ = l.indexOf(c);
    $ > -1 && l.splice($, 1);
  }, i = (c) => {
    if (!o.value) return;
    const p = document.elementsFromPoint(c.clientX, c.clientY).find((_) => _.hasAttribute("lp-tip"));
    if (p) {
      console.log("checkTooltip target", p);
      const _ = l.find((h) => h.el === p);
      if (_)
        _.closeTimer && (clearTimeout(_.closeTimer), _.closeTimer = null);
      else {
        for (; l.length >= n.limit; )
          s(l[0]);
        const h = p.getAttribute("lp-tip") || "", w = _u(p, {
          msg: h,
          bgColor: "rgb(0, 0, 0)"
        }), A = {
          el: p,
          layer: w,
          closeTimer: null,
          listeners: {
            enter: () => {
            },
            leave: () => {
            }
          }
        };
        A.listeners.enter = () => {
          A.closeTimer && (clearTimeout(A.closeTimer), A.closeTimer = null);
        }, A.listeners.leave = () => {
          A.closeTimer || (A.closeTimer = setTimeout(() => {
            s(A);
          }, n.hideDelay));
        }, p.addEventListener("mouseenter", A.listeners.enter), p.addEventListener("mouseleave", A.listeners.leave), l.push(A);
      }
    }
  }, r = (c) => {
    o.value && (t && clearTimeout(t), t = setTimeout(() => {
      i(c);
    }, n.delay));
  }, a = e || window;
  return a.addEventListener("mousemove", r), {
    tooltipEnable: o,
    removeTooltip: () => {
      a.removeEventListener("mousemove", r), t && clearTimeout(t), [...l].forEach(s);
    }
  };
}
function _u(n, e) {
  return Me.src(yu).props(e).follow(n, {
    position: "bottom-center",
    // 显示箭头
    arrow: !0,
    // 箭头颜色
    arrowColor: e.bgColor || "#000"
  }).show({});
}
const Su = /* @__PURE__ */ le({
  __name: "drawer",
  props: {
    name: {
      type: String,
      default: "lp-drawer"
    },
    disabled: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["enter", "leave", "afterEnter", "afterLeave", "leaveCancelled"],
  setup(n, { emit: e }) {
    const l = e, t = (a) => {
      a instanceof HTMLElement && (a.style.overflowY = "hidden", a.style.overflowX = "hidden"), me(() => {
        const d = a.offsetHeight, c = a.offsetWidth;
        l("enter", a, {
          height: d,
          width: c
        });
      });
    }, o = (a) => {
      a instanceof HTMLElement && (a.style.overflowY = "auto", a.style.overflowX = "hidden");
    }, s = (a) => {
      a instanceof HTMLElement && (a.style.overflowY = "hidden", a.style.overflowX = "hidden");
    }, i = (a) => {
      a instanceof HTMLElement && (a.style.overflowY = "auto", a.style.overflowX = "hidden"), l("afterLeave", a);
    }, r = (a) => {
      l("leaveCancelled", a);
    };
    return (a, d) => (f(), ge(yt, {
      name: n.disabled ? "" : n.name,
      onBeforeEnter: t,
      onAfterEnter: o,
      onBeforeLeave: s,
      onAfterLeave: i,
      onLeaveCancelled: r
    }, {
      default: xe(() => [
        ne(a.$slots, "default")
      ]),
      _: 3
    }, 8, ["name"]));
  }
});
console.debug("looplan-ui");
const xu = {
  install(n) {
    du(n), Mn.appContext = n._context, al({
      name: "looplan",
      url: "https://api.looplan.cn/IconGateway.detail"
      // 认证
      // token:''
    }), il(vu), n.directive("longpress", fu);
  }
};
export {
  ut as Input,
  At as InputNumber,
  so as LpBaseTransition,
  St as LpButton,
  xt as LpButtonGroup,
  tt as LpCheckbox,
  rt as LpCheckboxGroup,
  Lt as LpCollapse,
  Su as LpDrawerTransition,
  Tt as LpEmpty,
  Et as LpFold,
  Ot as LpForm,
  jt as LpFormItem,
  Io as LpLayer,
  et as LpLoading,
  Mt as LpMenu,
  Pt as LpPaginate,
  It as LpPanel,
  Bt as LpProgress,
  pt as LpScrollbar,
  Rt as LpSelect,
  ya as LpSelectSelectedOne,
  Dn as LpSelectSelectedTag,
  zt as LpSwitch,
  Ft as LpTable,
  Nt as LpTableColumn,
  ht as LpTag,
  ft as LpTransition,
  dt as LpTree,
  Wt as LpUpload,
  be as UploadStatusEnum,
  Ze as UploadTypeEnum,
  Ce as UploadValueTypeEnum,
  xu as default,
  du as registerLooplanUiComponents,
  ku as useTooltip
};
