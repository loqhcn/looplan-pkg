import { createElementBlock as a, openBlock as i, createElementVNode as c, toDisplayString as m } from "vue";
const r = { class: "lp-confirm" }, f = { class: "lp-confirm-content" }, _ = {
  __name: "confirm",
  props: {
    modelValue: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["update:modelValue", "close", "confirm", "cancel"],
  setup(o, { emit: t }) {
    const e = t, l = () => {
      e("confirm", !0), e("close");
    }, s = () => {
      e("cancel", !1), e("close");
    };
    return (p, d) => {
      var n;
      return i(), a("div", r, [
        c("div", f, m((n = o.modelValue) == null ? void 0 : n.message), 1),
        c("div", { class: "lp-confirm-btns" }, [
          c("button", {
            class: "lp-confirm-btn lp-confirm-cancel",
            onClick: s
          }, "取消"),
          c("button", {
            class: "lp-confirm-btn lp-confirm-ok",
            onClick: l
          }, "确定")
        ])
      ]);
    };
  }
};
export {
  _ as default
};
