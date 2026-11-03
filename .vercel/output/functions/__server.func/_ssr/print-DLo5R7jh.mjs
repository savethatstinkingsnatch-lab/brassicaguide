import { i as __toESM } from "../_runtime.mjs";
import { G as require_jsx_runtime, K as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/print-DLo5R7jh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PrintRedirect() {
	(0, import_react.useEffect)(() => {
		window.location.replace("/download");
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "bg-cloth px-6 py-10 text-paper",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			className: "underline",
			href: "/download",
			children: "Continue to the download"
		})
	});
}
//#endregion
export { PrintRedirect as component };
