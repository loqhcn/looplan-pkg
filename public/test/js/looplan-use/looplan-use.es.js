import { LooplanException as e, useModelSpace as t } from "looplan";
import { markRaw as n, reactive as r, ref as i } from "vue";
import { LpLayer as a } from "looplan-ui";
//#region src/src/useModelTable.ts
function o() {
	return {
		tabFilters: [],
		searchs: [],
		searchOption: { labelWidth: 80 }
	};
}
function s() {
	return {
		title: (e) => e ? `编辑 ${e.name || ""}` : "新增",
		add: { enable: !0 },
		items: []
	};
}
function c(e) {
	if (e === "" || e === void 0) return;
	let t = Number(e);
	return Number.isNaN(t) ? e : t;
}
function l(e) {
	let t = e.command || "";
	return t === "delete" ? {
		title: e.title,
		name: t,
		type: "danger",
		icon: "delete"
	} : t === "edit" ? {
		title: e.title,
		name: t,
		type: "primary",
		icon: "edit"
	} : {
		title: e.title,
		name: t,
		type: "primary"
	};
}
function u(e = [], t) {
	let n = d(t);
	if (!Array.isArray(e) || e.length === 0) return n;
	let r = e.find((e) => e?.usage === "table")?.data, i = e.find((e) => e?.usage === "form")?.data, a = e.find((e) => e?.usage === "filter")?.data, u = r?.columns?.length ? r.columns.map((e) => ({
		title: e.title,
		name: e.name,
		width: c(e.width),
		minWidth: c(e.minWidth),
		align: e.align,
		fixed: e.fixed,
		component: e.component,
		componentProps: e.componentProps
	})) : n.columns || [], f = r?.rowHandles || [], p = f.length > 0 ? {
		title: "操作",
		width: 200,
		items: f.map((e) => l(e))
	} : n.operationColumn, m = s();
	n.form?.items?.length && (m.items = n.form.items), i?.items?.length && (m.items = i.items.map((e) => ({
		title: e.title,
		name: e.name,
		component: e.component,
		componentProps: e.componentProps,
		rules: e.validates || []
	}))), i?.labelWidth !== void 0 && (m.labelWidth = i.labelWidth);
	let h = new Set((r?.handles || []).map((e) => e.command));
	h.size > 0 && (m.add = {
		...m.add || { enable: !0 },
		enable: h.has("add")
	});
	let g = o();
	return g.searchs = (a?.items?.length ? a.items : m.items).map((e) => ({
		title: e.title,
		name: e.name,
		component: e.component,
		componentProps: e.componentProps
	})), a?.labelWidth !== void 0 && (g.searchOption = { labelWidth: a.labelWidth }), {
		columns: u,
		operationColumn: p,
		filter: g,
		form: m,
		headerHandles: r?.handles || []
	};
}
function d(e) {
	let { items: t = [] } = e, n = o(), r = s(), i = [];
	return t.forEach((e) => {
		i.push({
			title: e.title,
			name: e.name,
			width: 120
		}), n.searchs.push({
			title: e.title,
			name: e.name
		}), r.items.push({
			title: e.title,
			name: e.name
		});
	}), i.unshift({
		title: "ID",
		name: "id",
		width: 80
	}), {
		columns: i,
		operationColumn: {
			title: "操作",
			width: 200,
			items: [{
				title: "编辑",
				name: "edit",
				type: "primary",
				icon: "edit"
			}, {
				title: "删除",
				name: "delete",
				type: "danger",
				icon: "delete"
			}]
		},
		filter: n,
		form: r
	};
}
function f(a, o) {
	console.log("useModelTable", a, o);
	let s = null, c = "", l = o?.modelPath || "", d = i(!1), f = i(null);
	if (typeof a == "string") {
		let r = a.split("@");
		if (c = r[0], l = r[1], s = t(c), !s) throw new e(`模型空间 ${c} 不存在`, 0, { spaceName: c });
		s && (f.value = n(s.useModel(l)));
	} else f.value = n(a);
	let p = r({
		model: a,
		columns: [],
		order: { id: "desc" },
		events: {},
		commands: {}
	});
	async function m() {
		let e = s?.useCloudObject("ModelRender"), t = { name: l.replace("/", "@") };
		o?.usages && (t.usages = o.usages);
		let n = await e.table(t);
		if (console.log("modelRowRet", n), n.code != 200) {
			console.log("获取模型表格渲染数据失败", n);
			return;
		}
		let r = u(n.data.usages, n.data.modelData);
		if (console.log("propsData", r), Object.assign(p, r), o?.handle) {
			let e = o.handle(p);
			Object.assign(p, e);
		}
		d.value = !0;
	}
	return m(), {
		isReady: d,
		tableModel: f,
		modelPath: l,
		modelTableProps: p
	};
}
//#endregion
//#region src/index.ts
async function p(e) {
	if (navigator.clipboard && window.isSecureContext) try {
		await navigator.clipboard.writeText(e), a.toast("复制成功", { duration: 2e3 });
		return;
	} catch {
		m(e);
		return;
	}
	m(e);
}
function m(e) {
	let t = document.createElement("textarea");
	t.value = e, t.style.position = "fixed", t.style.top = "-999px", t.style.left = "-999px", document.body.appendChild(t), t.select(), t.setSelectionRange(0, t.value.length);
	try {
		if (document.execCommand("copy")) a.toast("复制成功", { duration: 2e3 });
		else throw Error("execCommand copy failed");
	} catch (e) {
		console.error("降级复制失败", e), a.toast("复制失败，请手动复制", { duration: 2e3 });
	} finally {
		document.body.removeChild(t);
	}
}
//#endregion
export { p as copyText, f as useModelTable };
