import { createElementBlock as c, openBlock as n, createElementVNode as e, toDisplayString as r } from "vue";
const i = { class: "lp-alert" }, m = { class: "lp-alert-content" }, _ = {
  __name: "alert",
  props: {
    modelValue: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["update:modelValue", "close"],
  setup(l, { emit: o }) {
    const s = o, a = () => {
      s("close");
    };
    return (p, d) => {
      var t;
      return n(), c("div", i, [
        e("div", m, r((t = l.modelValue) == null ? void 0 : t.message), 1),
        e("div", { class: "lp-alert-btns" }, [
          e("button", {
            class: "lp-alert-btn lp-alert-ok",
            onClick: a
          }, "确定")
        ])
      ]);
    };
  }
};
export {
  _ as default
};
