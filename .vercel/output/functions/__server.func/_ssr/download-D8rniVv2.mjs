import { i as __toESM } from "../_runtime.mjs";
import { c as pages, t as BOOK_TITLE } from "./book-data-DBkMYBz7.mjs";
import { G as require_jsx_runtime, K as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/download-D8rniVv2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DownloadCopy() {
	const [size, setSize] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		document.title = `Download — ${BOOK_TITLE}`;
		fetch("/the-brassica-book.html", { method: "HEAD" }).then((response) => Number(response.headers.get("content-length"))).then((bytes) => {
			if (bytes > 0) setSize(`${(bytes / 1e6).toFixed(1)} MB`);
		}).catch(() => void 0);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-dvh bg-cloth px-4 py-10 text-paper",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-lg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-widest text-paper/70 uppercase",
					children: "Offline"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 font-display text-4xl text-paper",
					children: "A copy you can keep"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 text-paper/85",
					children: [
						"One file, the same ",
						pages.length,
						"-page book. Save it, then open it in a browser. It does not need a connection."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "/the-brassica-book.html",
					download: "The Brassica Book.html",
					className: "press mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-brass px-5 font-display text-lg text-brass-ink",
					children: ["Download the app", size ? ` · ${size}` : ""]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-sm text-paper/70",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						className: "underline decoration-rule underline-offset-4",
						href: "/",
						children: "Back to the book"
					})
				})
			]
		})
	});
}
//#endregion
export { DownloadCopy as component };
