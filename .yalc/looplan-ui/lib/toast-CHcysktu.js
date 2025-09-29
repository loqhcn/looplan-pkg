import { onMounted as a, createElementBlock as r, openBlock as c, createElementVNode as i, renderSlot as l, createTextVNode as d, toDisplayString as m } from "vue";
const u = { class: "lp-toast" }, p = { class: "lp-toast-content" }, h = {
  __name: "toast",
  props: {
    message: {
      type: String,
      default: ""
    },
    duration: {
      type: Number,
      default: 3e3
    }
  },
  emits: ["close", "shown"],
  setup(t, { emit: s }) {
    const e = t, o = s;
    return a(() => {
      o("shown"), e.duration > 0 && setTimeout(() => {
        o("close");
      }, e.duration);
    }), (n, f) => (c(), r("div", u, [
      i("div", p, [
        l(n.$slots, "default", {}, () => [
          d(m(t.message), 1)
        ])
      ])
    ]));
  }
};
export {
  h as default
};
