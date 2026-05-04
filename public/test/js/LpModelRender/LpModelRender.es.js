import { defineComponent as B, reactive as D, openBlock as p, createElementBlock as T, createElementVNode as j, ref as z, onMounted as Y, watch as ne, resolveComponent as I, renderSlot as ee, Fragment as K, renderList as Q, createVNode as V, createCommentVNode as R, getCurrentInstance as ce, markRaw as H, createBlock as W, unref as S, mergeProps as oe, withCtx as L, createTextVNode as G, toDisplayString as J, resolveDynamicComponent as ae, inject as _e, useModel as re, mergeModels as le, computed as se, normalizeStyle as he, nextTick as te, useTemplateRef as ge, useSlots as ve, createSlots as be, normalizeProps as ye, guardReactiveProps as Ce } from "vue";
import { LpLayer as N, LpButton as de, LpDrawerTransition as ue, LpTable as Te } from "looplan-ui";
import { resolveComponent as me, useModelSpace as $e } from "looplan";
const we = { class: "lp-layout" }, xe = {
  name: "LpCate"
}, Lt = /* @__PURE__ */ B({
  ...xe,
  setup(o) {
    return D({}), (i, a) => (p(), T("div", we, [...a[0] || (a[0] = [
      j(
        "div",
        { class: "lp-layout__header" },
        [
          j("div", { class: "title" }, "分类管理")
        ],
        -1
        /* CACHED */
      )
    ])]));
  }
}), Ve = { class: "lmr-list" }, ke = { class: "list" }, Se = { class: "list__foter" }, Le = {
  key: 0,
  class: "paginate-box flex justify-end"
}, Ee = {
  name: "lp-list"
}, Re = /* @__PURE__ */ B({
  ...Ee,
  props: {
    list: { default: () => [] },
    model: {},
    apiType: { default: "list" },
    filters: { default: () => ({}) },
    order: { default: () => ({}) },
    loadOnMounted: { type: Boolean, default: !0 },
    belong: {}
  },
  emits: ["event"],
  setup(o, { expose: i, emit: a }) {
    const l = o, c = D({
      listRender: [],
      loading: !1
    }), d = z(null);
    async function _() {
      c.loading = !0;
      const e = l.model, s = {};
      if (l.filters)
        for (const f in l.filters)
          l.filters[f] !== "all" && (s[f] = l.filters[f]);
      const m = {
        filters: {
          ...s,
          ...l.belong
        },
        order: l.order
      };
      if (l.apiType === "list") {
        const { error: f, list: M } = await e.list(m);
        if (f) {
          N.toast(f.msg, {
            duration: 2e3
          });
          return;
        }
        c.listRender = M || [];
      } else if (l.apiType === "paginate") {
        const { error: f, list: M, pageStatus: F } = await e.paginate(d.value?.page, d.value?.limit, m);
        if (f) {
          N.toast(f.msg, {
            duration: 2e3
          });
          return;
        }
        console.log("分页", F, M), d.value = F || null, c.listRender = M || [];
      }
      c.loading = !1;
    }
    async function w(e) {
      d.value && (d.value.page = e.page, await _());
    }
    async function h(e) {
      const s = l.model;
      console.log("onDelete", e), await N.confirm({
        title: "确认删除",
        message: "确定删除吗？"
      }) && (await s.delete(e.id), v());
    }
    async function r() {
      l.loadOnMounted && _();
    }
    Y(() => {
      r();
    });
    const v = async () => {
      await _();
    }, n = async () => {
      await _();
    }, u = (e) => c.listRender[e];
    function b(e, s = {}, m = {}) {
      e === "delete" && h(s);
    }
    return ne(() => l.belong, (e, s) => {
      v();
    }, {
      deep: !0
    }), i({
      reload: v,
      loadmore: n,
      getItemByIndex: u,
      onDelete: h,
      command: b
    }), (e, s) => {
      const m = I("lp-paginate");
      return p(), T("div", Ve, [
        j("div", ke, [
          ee(e.$slots, "list", {
            list: c.listRender,
            onDelete: h,
            loading: c.loading
          }, () => [
            (p(!0), T(
              K,
              null,
              Q(c.listRender, (f) => (p(), T("div", {
                class: "list__item",
                key: f.id
              }, [
                ee(e.$slots, "item", {
                  item: f,
                  onDelete: h
                })
              ]))),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ]),
        j("div", Se, [
          l.apiType == "paginate" && d.value ? (p(), T("div", Le, [
            V(m, {
              status: d.value,
              "onUpdate:status": s[0] || (s[0] = (f) => d.value = f),
              onChange: w
            }, null, 8, ["status"])
          ])) : R("v-if", !0)
        ])
      ]);
    };
  }
}), Fe = {
  name: "HandleList"
}, Oe = /* @__PURE__ */ B({
  ...Fe,
  props: {
    usage: { default: "" },
    handles: { default: () => [] },
    components: { default: () => ({}) },
    loadings: { default: () => ({}) }
  },
  emits: ["event"],
  setup(o, { emit: i }) {
    z({});
    const a = o, l = ce(), c = i;
    D({});
    const d = D({
      LpButton: H(de)
    });
    Object.keys(a.components).forEach((r) => {
      d[r] = H(a.components[r]);
    });
    function _(r, v) {
      c("event", {
        type: "command",
        data: {
          ...v
        }
      });
    }
    function w() {
      a.handles.length > 0 && a.handles.forEach((r) => {
        const v = r.component || "LpButton";
        try {
          const n = me(v, l?.appContext.app);
          d[v] = H(n);
        } catch (n) {
          console.error("获取组件失败", n);
        }
      });
    }
    function h() {
      const r = arguments[0];
      c("event", r);
    }
    return Y(() => {
      w();
    }), (r, v) => (p(!0), T(
      K,
      null,
      Q(a.handles, (n) => (p(), T(
        K,
        {
          key: n.command
        },
        [
          !n.component || n.component == "LpButton" ? (p(), W(S(de), oe({
            key: 0,
            ref_for: !0
          }, n.componentProps, {
            onClick: (u) => _(u, n),
            loading: a.loadings[n.command]
          }), {
            default: L(() => [
              G(
                J(n.title),
                1
                /* TEXT */
              )
            ]),
            _: 2
            /* DYNAMIC */
          }, 1040, ["onClick", "loading"])) : (p(), W(ae(d[n.component || "LpButton"]), oe({
            key: 1,
            ref_for: !0
          }, n.componentProps, {
            onClick: (u) => _(u, n),
            onEvent: h,
            loading: a.loadings[n.command]
          }), null, 16, ["onClick", "loading"]))
        ],
        64
        /* STABLE_FRAGMENT */
      ))),
      128
      /* KEYED_FRAGMENT */
    ));
  }
}), De = { class: "lp-table-header flex-col gap" }, Ie = { class: "lp-table-header__top flex justify-between items-center" }, je = { class: "lp-table-header__filters flex gap" }, Me = { class: "filter-tab__title" }, He = { class: "filter-tab__options" }, Pe = { class: "lp-table-header__right flex gap-mini" }, Be = {
  key: 0,
  class: "lp-table-header__tags flex gap-mini"
}, Ue = {
  name: "TableHeader"
}, fe = /* @__PURE__ */ B({
  ...Ue,
  props: {
    filter: {},
    search: { type: Boolean, default: !0 },
    refresh: { type: Boolean, default: !0 },
    add: { type: Boolean, default: !0 },
    refreshLoading: { type: Boolean, default: !1 },
    searchTags: { default: () => ({}) },
    handles: {}
  },
  emits: ["event", "add", "refresh", "search", "tab-change", "close-tag"],
  setup(o, { emit: i }) {
    const a = o, l = z({}), c = i;
    _e("TextOption", {}), ne(() => a.refreshLoading, (n) => {
      console.log("props.refreshLoading", n), l.value.reload = n;
    });
    const d = D({
      tabValues: {}
    }), _ = (n) => {
      c("event", n);
    }, w = (n, u) => {
      d.tabValues[n] = u, c("tab-change", d.tabValues);
    }, h = (n) => {
      c("close-tag", n);
    }, r = (n) => {
      const u = a.filter?.searchs.find((b) => b.name === n);
      return u ? u.title : n;
    }, v = (n, u) => {
      const b = a.filter?.searchs.find((e) => e.name === n);
      return b && b.getTagInfo ? b.getTagInfo(u, n) : u;
    };
    return (n, u) => {
      const b = I("lp-tabs"), e = I("lp-tag");
      return p(), T("div", De, [
        j("div", Ie, [
          j("div", je, [
            a.filter && a.filter.tabFilters ? (p(!0), T(
              K,
              { key: 0 },
              Q(a.filter.tabFilters, (s, m) => (p(), T("div", {
                key: m,
                class: "filter-tab"
              }, [
                j(
                  "div",
                  Me,
                  J(s.title) + ":",
                  1
                  /* TEXT */
                ),
                j("div", He, [
                  V(b, {
                    "model-value": d.tabValues[s.name] || "",
                    data: [{ title: "全部", value: "" }, ...s.options],
                    "onUpdate:modelValue": (f) => w(s.name, f)
                  }, null, 8, ["model-value", "data", "onUpdate:modelValue"])
                ])
              ]))),
              128
              /* KEYED_FRAGMENT */
            )) : R("v-if", !0)
          ]),
          j("div", Pe, [
            V(Oe, {
              handles: a.handles || [],
              usage: "table-header",
              onEvent: _,
              loadings: l.value
            }, null, 8, ["handles", "loadings"]),
            R(` <lp-button v-if="add" \r
                    type="primary" @click="onAdd" icon="add">{{ TextOption?.add || '新增' }}</lp-button>\r
                <lp-button v-if="search && props.filter && props.filter.searchs && props.filter.searchs.length > 0"\r
                    type="info" @click="onSearch" icon="search"\r
                    >{{ TextOption?.search || '搜索' }}</lp-button>\r
                <lp-button v-if="refresh" \r
                    type="info" @click="reload" :loading="refreshLoading">{{ TextOption?.refresh || '刷新' }}</lp-button> `),
            ee(n.$slots, "right")
          ])
        ]),
        a.searchTags && Object.keys(a.searchTags).length > 0 ? (p(), T("div", Be, [
          u[0] || (u[0] = j(
            "div",
            { class: "tag-label" },
            "搜索条件:",
            -1
            /* CACHED */
          )),
          (p(!0), T(
            K,
            null,
            Q(a.searchTags, (s, m) => (p(), T("div", {
              key: m,
              class: "search-tag"
            }, [
              V(e, {
                closable: "",
                onClose: (f) => h(m)
              }, {
                default: L(() => [
                  G(
                    J(r(m)) + ": " + J(v(m, s)),
                    1
                    /* TEXT */
                  )
                ]),
                _: 2
                /* DYNAMIC */
              }, 1032, ["onClose"])
            ]))),
            128
            /* KEYED_FRAGMENT */
          ))
        ])) : R("v-if", !0)
      ]);
    };
  }
}), Ne = {
  name: "SearchItem-Text"
}, Ae = /* @__PURE__ */ B({
  ...Ne,
  props: /* @__PURE__ */ le({
    condition: { default: "=" }
  }, {
    modelValue: {
      default: ""
    },
    modelModifiers: {}
  }),
  emits: /* @__PURE__ */ le(["event"], ["update:modelValue"]),
  setup(o, { emit: i }) {
    const a = o, l = i, c = re(o, "modelValue");
    return D({}), Y(() => {
      l("event", {
        type: "condition",
        data: a.condition || "="
      });
    }), (d, _) => {
      const w = I("lp-input");
      return p(), W(w, {
        modelValue: c.value,
        "onUpdate:modelValue": _[0] || (_[0] = (h) => c.value = h)
      }, null, 8, ["modelValue"]);
    };
  }
}), ze = { class: "search-item-between flex items-center gap-mini" }, We = {
  name: "SearchItem-Between"
}, qe = /* @__PURE__ */ B({
  ...We,
  props: /* @__PURE__ */ le({
    valueType: { default: "string" }
  }, {
    modelValue: {
      default: () => []
    },
    modelModifiers: {}
  }),
  emits: /* @__PURE__ */ le(["event"], ["update:modelValue"]),
  setup(o, { emit: i }) {
    const a = o, l = i, c = re(o, "modelValue"), d = se({
      get() {
        return c.value?.[0] ?? "";
      },
      set(h) {
        const r = [...c.value || []];
        r[0] = w(h), c.value = r;
      }
    }), _ = se({
      get() {
        return c.value?.[1] ?? "";
      },
      set(h) {
        const r = [...c.value || []];
        r[1] = w(h), c.value = r;
      }
    });
    function w(h) {
      if (a.valueType === "number") {
        if (h === "" || h === null || h === void 0)
          return "";
        const r = Number(h);
        return Number.isNaN(r) ? "" : r;
      }
      return h;
    }
    return Y(() => {
      l("event", {
        type: "condition",
        data: "between"
      });
    }), (h, r) => {
      const v = I("lp-input");
      return p(), T("div", ze, [
        V(v, {
          modelValue: d.value,
          "onUpdate:modelValue": r[0] || (r[0] = (n) => d.value = n)
        }, null, 8, ["modelValue"]),
        r[2] || (r[2] = j(
          "div",
          null,
          "-",
          -1
          /* CACHED */
        )),
        V(v, {
          modelValue: _.value,
          "onUpdate:modelValue": r[1] || (r[1] = (n) => _.value = n)
        }, null, 8, ["modelValue"])
      ]);
    };
  }
}), Ge = { class: "lmr-search-from" }, Je = { class: "lmr-search-from__header flex-col gap" }, Ke = { class: "lmr-search-from__footer flex gap flex-end padding" }, Qe = {
  name: "SearchForm"
}, Xe = /* @__PURE__ */ B({
  ...Qe,
  props: {
    searchs: { default: () => [] },
    searchOption: {},
    formData: { default: () => ({}) },
    conditions: { default: () => ({}) },
    components: { default: () => ({}) }
  },
  emits: ["search", "reset", "close"],
  setup(o, { emit: i }) {
    const a = o, l = i, c = D({
      text: H(Ae),
      between: H(qe)
    });
    Object.keys(a.components).forEach((e) => {
      c[e] = H(a.components[e]);
    });
    const d = D({
      form: b(a.formData),
      conditions: {
        ...a.conditions
      }
    }), _ = se(() => a.searchOption ? typeof a.searchOption?.labelWidth == "number" ? `${a.searchOption?.labelWidth}px` : a.searchOption?.labelWidth || "80px" : "80px"), w = () => {
      const e = {}, s = {};
      Object.keys(d.form).forEach((m) => {
        const f = d.form[m];
        if (!n(f))
          return;
        const M = d.conditions[m] || "=", F = u(M, f);
        F !== null && (s[m] = f, e[m] = F);
      }), l("search", {
        filterData: e,
        searchTags: s,
        conditions: {
          ...d.conditions
        }
      }), l("close");
    }, h = () => {
      d.form = {}, d.conditions = {}, l("reset");
    };
    function r(e) {
      return e ? c[e] || e : c.text;
    }
    function v(e, s) {
      !s || s.type !== "condition" || (d.conditions[e] = s.data || "=");
    }
    function n(e) {
      return e == null ? !1 : typeof e == "string" ? e.trim() !== "" : Array.isArray(e) ? e.length > 0 : !0;
    }
    function u(e, s) {
      if (e === "like")
        return [e, `%${s}%`];
      if (e === "left-like")
        return ["like", `%${s}`];
      if (e === "right-like")
        return ["like", `${s}%`];
      if (e === "between") {
        if (!Array.isArray(s))
          return null;
        const m = n(s[0]), f = n(s[1]);
        return m && f ? ["between", s] : m ? [">=", s[0]] : f ? ["<=", s[1]] : null;
      }
      return e === "in" ? ["in", s] : e === ">" || e === "<" || e === ">=" || e === "<=" || e === "!=" ? [e, s] : s;
    }
    function b(e) {
      const s = {};
      return Object.keys(e || {}).forEach((m) => {
        const f = e[m];
        if (Array.isArray(f)) {
          s[m] = [...f];
          return;
        }
        if (f && typeof f == "object") {
          s[m] = { ...f };
          return;
        }
        s[m] = f;
      }), s;
    }
    return (e, s) => {
      const m = I("lp-form-item"), f = I("lp-form"), M = I("lp-button");
      return p(), T("div", Ge, [
        j("div", Je, [
          V(f, {
            model: d.form,
            "label-width": _.value
          }, {
            default: L(() => [
              (p(!0), T(
                K,
                null,
                Q(a.searchs, (F) => (p(), W(m, {
                  key: F.name,
                  label: F.title,
                  prop: F.name
                }, {
                  default: L(() => [
                    (p(), W(ae(r(F.component)), oe({
                      modelValue: d.form[F.name],
                      "onUpdate:modelValue": (y) => d.form[F.name] = y
                    }, { ref_for: !0 }, F.componentProps, {
                      onEvent: (y) => v(F.name, y)
                    }), null, 16, ["modelValue", "onUpdate:modelValue", "onEvent"]))
                  ]),
                  _: 2
                  /* DYNAMIC */
                }, 1032, ["label", "prop"]))),
                128
                /* KEYED_FRAGMENT */
              ))
            ]),
            _: 1
            /* STABLE */
          }, 8, ["model", "label-width"])
        ]),
        j("div", Ke, [
          V(M, {
            type: "info",
            onClick: h
          }, {
            default: L(() => [...s[0] || (s[0] = [
              G(
                "重置",
                -1
                /* CACHED */
              )
            ])]),
            _: 1
            /* STABLE */
          }),
          V(M, {
            type: "primary",
            onClick: w
          }, {
            default: L(() => [...s[1] || (s[1] = [
              G(
                "查询",
                -1
                /* CACHED */
              )
            ])]),
            _: 1
            /* STABLE */
          })
        ])
      ]);
    };
  }
}), Ye = {
  name: "TextInput"
}, Ze = /* @__PURE__ */ B({
  ...Ye,
  props: {
    modelValue: {
      default: ""
    },
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(o) {
    const i = re(o, "modelValue");
    return D({}), (a, l) => {
      const c = I("lp-input");
      return p(), W(c, {
        modelValue: i.value,
        "onUpdate:modelValue": l[0] || (l[0] = (d) => i.value = d)
      }, null, 8, ["modelValue"]);
    };
  }
}), et = {
  name: "ImgUpload"
}, tt = /* @__PURE__ */ B({
  ...et,
  props: {
    modelValue: {
      default: ""
    },
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(o) {
    const i = re(o, "modelValue");
    return D({}), (a, l) => {
      const c = I("lp-upload");
      return p(), W(c, {
        modelValue: i.value,
        "onUpdate:modelValue": l[0] || (l[0] = (d) => i.value = d)
      }, null, 8, ["modelValue"]);
    };
  }
}), nt = { class: "lp-model-form" }, ot = { class: "form-footer flex justify-end gap padding" }, lt = /* @__PURE__ */ B({
  __name: "Form",
  props: {
    config: {},
    data: { default: () => ({}) },
    model: {},
    mode: { default: "edit" },
    handleSave: {},
    components: { default: () => ({}) }
  },
  emits: ["success", "close"],
  setup(o, { emit: i }) {
    const a = ce(), l = o, c = i, d = z(), _ = D({
      form: {},
      rules: {},
      items: []
    }), w = D({
      text: H(Ze),
      img: H(tt)
    });
    Object.keys(l.components).forEach((n) => {
      w[n] = H(l.components[n]);
    });
    function h() {
      _.form = { ...l.data };
      let n = l.config.items;
      l.mode === "add" && l.config.add?.handleItems && (n = l.config.add.handleItems(n), console.log("add items", n)), _.items = n, n.forEach((u) => {
        const b = [];
        u.required && b.push({ required: !0, message: `请输入${u.title}`, trigger: "blur" }), u.rules && b.push(...u.rules), b.length > 0 && (_.rules[u.name] = b);
        const e = u.component || "text";
        if (!["text", "img"].includes(e)) try {
          const s = me(e, a?.appContext.app);
          w[e] = H(s);
        } catch (s) {
          console.error("获取组件失败", s);
        }
      });
    }
    const r = () => {
      c("close");
    }, v = async () => {
      const n = _.form.id || 0, u = { ..._.form };
      if (!l.handleSave) {
        N.toast("请配置handleSave", { type: "danger" });
        return;
      }
      let b = null;
      try {
        if (b = await l.handleSave?.(u, n), b?.code !== 200) {
          console.error("保存失败", b), N.toast(b?.msg || "保存失败", { type: "danger" });
          return;
        }
      } catch (e) {
        console.error("保存失败", e), N.toast(e.message || "保存失败", { type: "danger" });
        return;
      }
      N.toast("保存成功", { type: "success" }), c("success", {
        data: u,
        id: n,
        result: b.data.result
      }), c("close");
    };
    return Y(() => {
      h();
    }), (n, u) => {
      const b = I("lp-form-item"), e = I("lp-form"), s = I("lp-button");
      return p(), T("div", nt, [
        V(e, {
          ref_key: "formRef",
          ref: d,
          model: _.form,
          rules: _.rules,
          "label-width": l.config.labelWidth || "80px"
        }, {
          default: L(() => [
            (p(!0), T(
              K,
              null,
              Q(_.items, (m) => (p(), W(b, {
                key: m.name,
                label: m.title,
                prop: m.name
              }, {
                default: L(() => [
                  (p(), W(ae(w[m.component || "text"]), oe({
                    modelValue: _.form[m.name],
                    "onUpdate:modelValue": (f) => _.form[m.name] = f
                  }, { ref_for: !0 }, m.componentProps), null, 16, ["modelValue", "onUpdate:modelValue"]))
                ]),
                _: 2
                /* DYNAMIC */
              }, 1032, ["label", "prop"]))),
              128
              /* KEYED_FRAGMENT */
            ))
          ]),
          _: 1
          /* STABLE */
        }, 8, ["model", "rules", "label-width"]),
        j("div", ot, [
          ee(n.$slots, "footer", {}, () => [
            V(s, { onClick: r }, {
              default: L(() => [...u[0] || (u[0] = [
                G(
                  "取消",
                  -1
                  /* CACHED */
                )
              ])]),
              _: 1
              /* STABLE */
            }),
            V(s, {
              type: "primary",
              onClick: v
            }, {
              default: L(() => [...u[1] || (u[1] = [
                G(
                  "保存",
                  -1
                  /* CACHED */
                )
              ])]),
              _: 1
              /* STABLE */
            })
          ])
        ])
      ]);
    };
  }
}), st = ["src"], at = {
  name: "ImgTableCell"
}, rt = /* @__PURE__ */ B({
  ...at,
  props: {
    size: { default: 40 },
    value: {},
    data: {}
  },
  setup(o) {
    const i = o;
    return D({}), (a, l) => (p(), T(
      "div",
      {
        class: "lpt-cell-img",
        style: he({ width: i.size + "px", height: i.size + "px" })
      },
      [
        j("img", {
          class: "img",
          src: i.value || "/static/default/avatar.png",
          alt: ""
        }, null, 8, st)
      ],
      4
      /* STYLE */
    ));
  }
}), it = { class: "lmr-tc-time" }, ct = {
  name: "TimeCell"
}, dt = /* @__PURE__ */ B({
  ...ct,
  props: {
    value: {},
    data: {}
  },
  setup(o) {
    const i = o, a = se(() => i.value ? new Date(i.value || "").toLocaleString().replace(/\//g, "-") : "-");
    return D({}), (l, c) => (p(), T(
      "div",
      it,
      J(a.value),
      1
      /* TEXT */
    ));
  }
}), ut = { class: "lmr-tc-text" }, mt = {
  name: "TextCell"
}, ft = /* @__PURE__ */ B({
  ...mt,
  props: {
    value: { default: "" },
    data: {}
  },
  setup(o) {
    const i = o;
    return D({}), (a, l) => (p(), T(
      "div",
      ut,
      J(i.value),
      1
      /* TEXT */
    ));
  }
});
function pe(o, i) {
  const a = D({
    img: H(rt),
    time: H(dt),
    text: H(ft)
  });
  let l = null;
  const c = z(null), d = z({}), _ = D({
    isLoading: !1
  }), w = z(), h = z([
    // {
    //     name: 'img',
    //     component: 'ImgCell',
    //     componentProps: {
    //         size: 40,
    //     }
    // },
  ]), r = D({
    filters: {},
    searchTags: {},
    searchConditions: {},
    refreshLoading: !1,
    order: {}
  }), v = z({});
  if (typeof o.model == "string") {
    const t = o.model.split("@"), C = t[0], E = t[1];
    l = $e(C), l && (c.value = H(l.useModel(E)));
  } else
    c.value = H(o.model);
  i && i.slots && Object.keys(i?.slots).forEach((t) => {
    if (t.startsWith("column.")) {
      const C = t.split(".")[1];
      h.value.push({
        name: C,
        component: t,
        componentProps: {}
      }), a[t] = H(i.slots?.[t]);
    }
  });
  function n() {
    w.value = o.columns?.map((t) => t.component ? {
      ...t
    } : t) || [], o.operationColumn && w.value.push({
      title: o.operationColumn.title,
      name: "operation",
      width: o.operationColumn.width,
      fixed: "right"
    }), w.value.forEach((t) => {
      t.component && (i && i.slots && i.slots["column." + t.name] || h.value.push({
        name: t.name,
        component: t.component,
        componentProps: t.componentProps || {}
      }));
    });
  }
  const u = () => {
    y(null, {
      handleSave: x
    });
  }, b = (t) => {
    y(t, {
      handleSave: x
    });
  }, e = async (t) => {
    const C = { ...r.filters };
    Object.assign(C, t), Object.keys(C).forEach((E) => {
      C[E] === "" && delete C[E];
    }), r.filters = C, g(), await te(), await k("reload", {}, {});
  }, s = async (t, C) => {
    const E = t?.filterData || t, A = t?.searchTags || t, q = t?.conditions || {}, P = { ...r.filters }, Z = { ...r.searchTags }, ie = { ...r.searchConditions };
    Object.keys(E).forEach((U) => {
      m(E[U]) ? P[U] = E[U] : delete P[U];
    }), Object.keys(A).forEach((U) => {
      m(A[U]) ? (Z[U] = A[U], q[U] && (ie[U] = q[U])) : (delete Z[U], delete P[U], delete ie[U]);
    }), r.filters = P, g(), r.searchTags = Z, r.searchConditions = ie, await te(), await k("reload", {}, {}), C && C();
  };
  function m(t) {
    return t == null ? !1 : typeof t == "string" ? t.trim() !== "" : Array.isArray(t) ? t.length > 0 : !0;
  }
  const f = async (t) => {
    delete r.searchTags[t], delete r.filters[t], delete r.searchConditions[t], g(), await te(), await k("reload", {}, {});
  };
  function M() {
    console.log("搜索"), N.Layer.src(Xe).props({
      searchs: o.filter?.searchs || [],
      searchOption: o.filter?.searchOption || {},
      formData: r.searchTags,
      conditions: r.searchConditions
    }).on("search", (t) => {
      console.log("搜索确认", t), s(t);
    }).container("drawer").containerProps({
      title: "搜索",
      direction: "right"
    }).transition("drawer-right").transitionComponent(ue).useMask().show({
      x: "right",
      y: 0,
      width: 500,
      height: "100%",
      reverse: !0
    });
  }
  async function F(t, C) {
    t.name === "edit" ? X("edit") ? await k("edit", {
      row: C
    }, {}) : o.events?.edit ? o.events.edit(C) : b(C) : t.name === "delete" ? (console.log("删除", t, C), await k("delete", {
      row: C
    }, {})) : await k(t.name, {
      row: C
    }, {});
  }
  function y(t, C = {}) {
    o.form && N.Layer.src(lt).props({
      config: o.form,
      data: t,
      model: c.value,
      mode: t ? "edit" : "add",
      handleSave: C.handleSave,
      components: o.formComponents
    }).on("success", (E) => {
      console.log("保存成功", E), k("success", E, {}), C.callback?.({
        event: "success",
        data: {
          row: t,
          result: E.result,
          id: E.id,
          data: E.data
        }
      });
    }).container("drawer").containerProps({
      title: typeof o.form.title == "function" ? o.form.title(t) : o.form.title || "",
      direction: "right"
    }).transition("drawer-right").transitionComponent(ue).source(i?.instance || null).useMask().show({
      x: "right",
      y: 0,
      width: 500,
      height: "100%",
      reverse: !0
    });
  }
  const $ = ne(() => o.columns, (t) => {
    n();
  });
  v.value = {
    ...r.filters,
    ...o.filters
  }, ne(r.filters, (t) => {
    g();
  }), ne(() => o.filters, async (t) => {
    console.log("props.filters", t), g(), await te(), await k("reload", {}, {});
  }, {
    deep: !0
  });
  function g() {
    return v.value = {
      ...r.filters,
      ...o.filters
    };
  }
  async function x(t, C = 0) {
    o.tree && (console.log("props.tree", o.tree), delete t[o.tree.children], t.pid || (t.pid = 0));
    const E = {
      ...t,
      ...o.belong
    }, A = await c.value?.save(E, C);
    return A ? A.error ? {
      code: A.error.code,
      msg: A.error.msg
    } : {
      code: 200,
      msg: "成功",
      data: {
        result: A.result
      }
    } : {
      code: 500,
      msg: "请求失败"
    };
  }
  async function O() {
    o.order && (r.order = { ...o.order }), n();
  }
  async function k(t, C, E = {}) {
    o.commands?.[t] ? await o.commands[t](C, E) : i?.commands?.[t] ? await i.commands[t](C, E) : console.log("命令不存在", t, C);
  }
  function X(t) {
    return i?.commands?.[t] || o.commands?.[t];
  }
  return {
    state: r,
    columnsRender: w,
    tableSlots: h,
    renderStatus: _,
    searchState: d,
    tableModel: c,
    componentsCache: a,
    finalFilters: v,
    columnsWatch: $,
    init: O,
    openEditForm: y,
    onOperationClick: F,
    onSearch: M,
    handleCloseTag: f,
    handleSearchConfirm: s,
    handleTabChange: e,
    onAdd: u,
    onEdit: b,
    handleColumns: n,
    handleSave: x,
    command: k,
    hasCommand: X
  };
}
const pt = { class: "lmr-table full" }, _t = { class: "lmr-table__header" }, ht = {
  key: 0,
  class: "lmr-table__body"
}, gt = {
  key: 0,
  class: "lmr-table__body-loading"
}, vt = {
  key: 1,
  class: "error-msg"
}, bt = {
  name: "Table"
}, Et = /* @__PURE__ */ B({
  ...bt,
  props: {
    model: {},
    columns: {},
    filter: {},
    headerHandles: {},
    operationColumn: {},
    form: {},
    events: {},
    order: {},
    tree: {},
    filters: {},
    belong: {},
    commands: {},
    components: {},
    formComponents: {}
  },
  emits: ["event"],
  setup(o, { expose: i, emit: a }) {
    const l = ge("listRef"), c = ve(), d = ce(), _ = o, w = a, h = async () => {
      v.refreshLoading = !0, await l.value?.reload(), v.refreshLoading = !1;
    }, r = (O) => {
      console.log("onHeaderEvent", O), typeof O == "object" && O.type == "command" && g(O.data?.command, O.data?.data || {}, O.data?.ext || {});
    }, {
      state: v,
      columnsRender: n,
      componentsCache: u,
      tableSlots: b,
      tableModel: e,
      finalFilters: s,
      init: m,
      onOperationClick: f,
      onSearch: M,
      handleCloseTag: F,
      handleTabChange: y,
      onAdd: $,
      command: g,
      hasCommand: x
    } = pe(_, {
      slots: c,
      instance: d || null,
      // 自定义操作命令
      commands: {
        add: async (O) => {
          $();
        },
        // 刷新事件
        success: async () => {
          h();
        },
        // 自定义刷新事件
        reload: async (O) => {
          h(), w("event", {
            type: "reload",
            data: O
          });
        },
        // 删除事件
        delete: async (O) => {
          console.log("listRef", l.value?.onDelete), l.value?.onDelete(O.row);
        },
        search: async (O) => {
          M();
        }
      }
    });
    return i({
      command: g,
      hasCommand: x
    }), Y(async () => {
      await m(), await te(), l.value?.reload(), console.log("Table slots", c);
    }), (O, k) => {
      const X = I("lp-button"), t = I("lp-button-group"), C = I("lp-loading");
      return p(), T("div", pt, [
        R(` <div>\r
           finalFilters {{ finalFilters }}\r
        </div>\r
        <div>\r
            {{ props.filters }}\r
        </div> `),
        R(` <div>\r
            {{ props.headerHandles }}\r
        </div> `),
        R(" 表格头 "),
        j("div", _t, [
          V(fe, {
            filter: _.filter,
            searchTags: S(v).searchTags,
            handles: _.headerHandles,
            onEvent: r,
            onRefresh: h,
            refreshLoading: S(v).refreshLoading,
            onTabChange: S(y),
            onCloseTag: S(F)
          }, {
            right: L(() => [
              ee(O.$slots, "right")
            ]),
            _: 3
            /* FORWARDED */
          }, 8, ["filter", "searchTags", "handles", "refreshLoading", "onTabChange", "onCloseTag"])
        ]),
        S(e) ? (p(), T("div", ht, [
          R(" 表格体 "),
          V(Re, {
            ref_key: "listRef",
            ref: l,
            apiType: "paginate",
            model: S(e),
            filters: S(s),
            belong: _.belong,
            order: S(v).order,
            loadOnMounted: !1,
            class: "lmr-table__list"
          }, {
            list: L(({ list: E, loading: A }) => [
              R(" {{ list }} "),
              R(" {{ tableSlots }} "),
              R(" {{ columnsRender }} "),
              R(' <tableComponent :data="list" :columns="columnsRender" row-key="id" style="height: 600px;"></tableComponent> '),
              V(S(Te), {
                data: E,
                columns: S(n),
                "row-key": "id",
                style: { height: "100%" }
              }, be({
                "column.operation": L(({ item: q }) => [
                  V(
                    t,
                    null,
                    {
                      default: L(() => [
                        (p(!0), T(
                          K,
                          null,
                          Q(_.operationColumn?.items || [], (P) => (p(), T(
                            K,
                            {
                              key: P.name
                            },
                            [
                              !P.isVisible || P.isVisible(q) ? (p(), W(X, {
                                key: 0,
                                type: P.type || "primary",
                                icon: P.icon,
                                onClick: (Z) => S(f)(P, q)
                              }, {
                                default: L(() => [
                                  G(
                                    J(P.title),
                                    1
                                    /* TEXT */
                                  )
                                ]),
                                _: 2
                                /* DYNAMIC */
                              }, 1032, ["type", "icon", "onClick"])) : R("v-if", !0)
                            ],
                            64
                            /* STABLE_FRAGMENT */
                          ))),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ]),
                      _: 2
                      /* DYNAMIC */
                    },
                    1024
                    /* DYNAMIC_SLOTS */
                  )
                ]),
                _: 2
                /* DYNAMIC */
              }, [
                Q(S(b), (q) => ({
                  name: `column.${q.name}`,
                  fn: L(({ item: P, index: Z }) => [
                    (p(), W(
                      ae(S(u)[q.component]),
                      ye(Ce({ value: P[q.name], ...q.componentProps, item: P, index: Z })),
                      null,
                      16
                      /* FULL_PROPS */
                    ))
                  ])
                }))
              ]), 1032, ["data", "columns"]),
              A ? (p(), T("div", gt, [
                V(C)
              ])) : R("v-if", !0)
            ]),
            _: 1
            /* STABLE */
          }, 8, ["model", "filters", "belong", "order"])
        ])) : R("v-if", !0),
        S(e) ? R("v-if", !0) : (p(), T(
          "div",
          vt,
          " 模型不存在 " + J(_.model),
          1
          /* TEXT */
        ))
      ]);
    };
  }
}), yt = { class: "lmr-table lmr-table-tree full" }, Ct = { class: "lmr-table__header" }, Tt = {
  key: 0,
  class: "lmr-table__body"
}, $t = { class: "flex gap" }, wt = {
  key: 1,
  class: "error-msg"
}, xt = {
  name: "Table"
}, Rt = /* @__PURE__ */ B({
  ...xt,
  props: {
    model: {},
    columns: {},
    filter: {},
    headerHandles: {},
    operationColumn: {},
    form: {},
    events: {},
    order: {},
    tree: { default: () => ({
      children: "children",
      title: "title",
      value: "id",
      pidField: "pid"
    }) },
    filters: {},
    belong: {},
    commands: {},
    components: {},
    formComponents: {}
  },
  setup(o) {
    const i = o, a = D({
      selected: "",
      columnsData: [],
      // Start empty, load from API
      nodeFields: i.tree || {
        children: "children",
        title: "title",
        value: "id"
      }
    }), {
      state: l,
      columnsRender: c,
      tableModel: d,
      init: _,
      openEditForm: w,
      handleCloseTag: h,
      handleTabChange: r,
      handleSave: v,
      command: n
    } = pe(i, {
      // 自定义操作命令
      commands: {
        add: () => {
          m();
        },
        // 自定义刷新事件
        reload: async (y) => {
          b();
        }
      }
    }), u = z(null), b = async () => {
      l.refreshLoading = !0, console.log("刷新", u.value?.reload), await u.value?.reload(), l.refreshLoading = !1;
    }, e = (y) => {
      console.log("onHeaderEvent", y), typeof y == "object" && y.type == "command" && n(y.data?.command, y.data?.data || {}, y.data?.ext || {});
    };
    async function s(y) {
      const $ = y ? y.id : 0, g = {
        ...i.belong
      };
      if ($)
        g.pid = $;
      else {
        const { defaultPid: x = 0 } = i.tree || {};
        g.pid = x;
      }
      try {
        const x = await d.value?.list({
          filters: g
        });
        if (!x)
          return;
        if (x.error) {
          N.toast(x.error.msg, {
            duration: 2e3
          });
          return;
        }
        return x.list;
      } catch (x) {
        return console.error("加载子节点失败", x), [];
      }
    }
    z(1e4);
    function m() {
      M(null);
    }
    function f(y) {
      console.log("编辑节点", y), y?.data?.id, w(y.data, {
        callback: ($) => {
          if ($.event === "success") {
            console.log("编辑节点成功", $);
            const g = {
              ...$.data.data
            };
            console.log("编辑节点", g), u.value?.saveItem(y.data, g);
          }
        },
        handleSave: async ($, g = 0) => await v($, g)
      });
    }
    async function M(y) {
      const $ = y?.data?.id || 0;
      w(null, {
        callback: (g) => {
          if (g.event === "success") {
            console.log("新增节点成功", g);
            const k = {
              id: g.data.result.data.id,
              ...g.data.data
            };
            k[i.tree?.children || "children"] = [], console.log("新增节点", k), u.value?.append($, k, !1);
          }
        },
        handleSave: async (g, x = 0) => (g[i.tree?.pidField || "pid"] = $, console.log("新增节点ID", x), await v(g, x))
      });
    }
    async function F(y) {
      if (!await N.confirm({
        title: "确认删除",
        message: "确认删除选中节点吗？"
      }))
        return;
      const g = y?.data?.id;
      if (!g) {
        console.error("删除节点ID不存在");
        return;
      }
      try {
        let x = await d.value?.delete(g);
        if (!x)
          return;
        if (x.error) {
          N.toast(x.error.msg, {
            duration: 2e3
          });
          return;
        }
        N.toast("删除成功");
      } catch (x) {
        console.error(x), N.toast("删除失败");
        return;
      }
      u.value?.remove(g);
    }
    return Y(() => {
      _();
    }), (y, $) => {
      const g = I("lp-button"), x = I("lp-tree"), O = I("lp-scrollbar");
      return p(), T("div", yt, [
        R(" 表格头 "),
        j("div", Ct, [
          V(fe, {
            filter: i.filter,
            searchTags: S(l).searchTags,
            handles: i.headerHandles,
            onEvent: e,
            refreshLoading: S(l).refreshLoading,
            onTabChange: S(r),
            onCloseTag: S(h)
          }, {
            right: L(() => [
              ee(y.$slots, "right")
            ]),
            _: 3
            /* FORWARDED */
          }, 8, ["filter", "searchTags", "handles", "refreshLoading", "onTabChange", "onCloseTag"])
        ]),
        R(` <div>\r
            {{ columnsRender }}\r
        </div> `),
        S(d) ? (p(), T("div", Tt, [
          R(" 表格体 "),
          V(O, { class: "lp-table__scrollbar" }, {
            default: L(() => [
              V(x, {
                ref_key: "columnsTreeRef",
                ref: u,
                modelValue: a.selected,
                "onUpdate:modelValue": $[0] || ($[0] = (k) => a.selected = k),
                data: a.columnsData,
                "onUpdate:data": $[1] || ($[1] = (k) => a.columnsData = k),
                "item-fields": a.nodeFields,
                "node-key": "id",
                "node-base-width": 200,
                "select-options": { limit: 1 },
                columns: S(c),
                header: { enabled: !0, title: "", search: !1 },
                load: s
              }, {
                "column.operation": L(({ item: k }) => [
                  j("div", $t, [
                    V(g, {
                      type: "primary",
                      size: "mini",
                      onClick: (X) => M(k)
                    }, {
                      default: L(() => [...$[2] || ($[2] = [
                        G(
                          "添加",
                          -1
                          /* CACHED */
                        )
                      ])]),
                      _: 1
                      /* STABLE */
                    }, 8, ["onClick"]),
                    V(g, {
                      type: "primary",
                      size: "mini",
                      onClick: (X) => f(k)
                    }, {
                      default: L(() => [...$[3] || ($[3] = [
                        G(
                          "编辑",
                          -1
                          /* CACHED */
                        )
                      ])]),
                      _: 1
                      /* STABLE */
                    }, 8, ["onClick"]),
                    V(g, {
                      type: "danger",
                      size: "mini",
                      onClick: (X) => F(k)
                    }, {
                      default: L(() => [...$[4] || ($[4] = [
                        G(
                          "删除",
                          -1
                          /* CACHED */
                        )
                      ])]),
                      _: 1
                      /* STABLE */
                    }, 8, ["onClick"])
                  ])
                ]),
                _: 1
                /* STABLE */
              }, 8, ["modelValue", "data", "item-fields", "columns"])
            ]),
            _: 1
            /* STABLE */
          })
        ])) : R("v-if", !0),
        S(d) ? R("v-if", !0) : (p(), T(
          "div",
          wt,
          " 模型不存在 " + J(i.model),
          1
          /* TEXT */
        ))
      ]);
    };
  }
}), Ft = {
  name: "LpModelRender",
  title: "Looplan模型渲染组件库",
  type: "local",
  version: "0.0.1",
  styleCdn: [],
  styleImportCase: "use",
  // 样式导入时机: register(注册时导入) 或 use(使用时导入)
  components: [
    "Home",
    "Table",
    "Form",
    "List",
    "TableHeader"
  ]
};
export {
  lt as Form,
  Lt as Home,
  Re as List,
  Et as Table,
  fe as TableHeader,
  Rt as TreeTable,
  Ft as packageConfig
};
