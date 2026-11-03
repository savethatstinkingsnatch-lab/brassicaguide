import { i as __toESM } from "../_runtime.mjs";
import { a as YEAR, c as pages, d as shapes, f as stillGood, i as RIGHTS_MAILTO, l as plantById, n as PUBLISHER, o as essayById, p as storageRows, r as RIGHTS_EMAIL, s as findPageIndex, t as BOOK_TITLE, u as recipeById } from "./book-data-DBkMYBz7.mjs";
import { G as require_jsx_runtime, K as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as ChevronLeft, i as ChevronRight, r as List, t as X } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DoKi1AD6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var art = /* @__PURE__ */ new Map();
function artSrc(src) {
	return art.get(src) ?? src;
}
var STORAGE_KEY = "brassica-book-page";
var OfflineBook = (0, import_react.createContext)(false);
function useOffline() {
	return (0, import_react.useContext)(OfflineBook);
}
function rich(text) {
	return text.split(/(\*[^*]+\*)/g).map((part, index) => {
		if (part.startsWith("*") && part.endsWith("*") && part.length > 2) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: part.slice(1, -1) }, index);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Fragment, { children: part }, index);
	});
}
function Plate({ src, alt, caption }) {
	const [failed, setFailed] = (0, import_react.useState)(false);
	if (failed) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
		className: "my-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: artSrc(src),
			alt,
			onError: () => setFailed(true),
			className: "mx-auto w-full max-w-md"
		}), caption ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
			className: "mt-2 text-center text-sm text-muted italic",
			children: caption
		}) : null]
	});
}
function Jump({ id, children, onJump }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: () => onJump(id),
		className: "text-left text-leaf underline decoration-rule underline-offset-4 hover:decoration-leaf",
		children
	});
}
function contentsGroups() {
	const groups = [];
	pages.forEach((page, number) => {
		if (!page.toc) return;
		const last = groups[groups.length - 1];
		const item = {
			page,
			number: number + 1
		};
		if (!last || last.part !== page.part) groups.push({
			part: page.part,
			items: [item]
		});
		else last.items.push(item);
	});
	return groups;
}
function storageGroups() {
	const groups = [];
	for (const row of storageRows) {
		const last = groups[groups.length - 1];
		if (!last || last.name !== row.group) groups.push({
			name: row.group,
			rows: [row]
		});
		else last.rows.push(row);
	}
	return groups;
}
function Cover() {
	const offline = useOffline();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-widest text-muted uppercase",
				children: "A field book of the mustard family"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				id: "page-title",
				tabIndex: -1,
				className: "mt-3 font-display text-4xl text-ink outline-none sm:text-5xl md:text-6xl",
				children: "The Brassica Book"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-prose text-lg text-ink",
				children: "Cauliflower, broccoli, and the other plants we eat from the same family."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plate, {
				src: "/art/cover.jpg",
				alt: "Watercolor still life of cauliflower, broccoli, cabbage, radishes, and kale"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-xl text-ink",
				children: PUBLISHER
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-muted",
				children: ["Publisher, ", YEAR]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-6 max-w-prose",
				children: [
					offline ? "This is your offline copy. Open this file in a browser. It does not need a connection. " : "",
					"Publishing rights are held by ",
					PUBLISHER,
					"."
				]
			})
		]
	});
}
function Rights({ onJump }) {
	const offline = useOffline();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs tracking-widest text-muted uppercase",
			children: "Front"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			id: "page-title",
			tabIndex: -1,
			className: "mt-3 font-display text-4xl text-ink outline-none",
			children: "Publishing rights"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 max-w-prose space-y-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "drop",
				children: [
					offline ? "This file is the whole book, one page at a time, and it keeps working with no connection. " : "",
					"All publishing rights in this text are held by ",
					PUBLISHER,
					". That means the right to print, sell, excerpt, translate, and adapt it. Reading it here is not permission to republish it. Write first."
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"Contact:",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					className: "break-all text-leaf underline decoration-rule underline-offset-4",
					href: RIGHTS_MAILTO,
					children: RIGHTS_EMAIL
				})
			] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 max-w-prose",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: offline ? "Turn the pages with the arrows, or open Contents. Your place is remembered on this computer." : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					"A copy that opens with no connection is",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						className: "underline decoration-rule underline-offset-4",
						href: "/download",
						children: "here"
					}),
					"."
				] })
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
			className: "mt-10 max-w-prose border-t border-rule pt-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-1 border-b border-rule py-3 sm:grid-cols-[8rem_1fr]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-sm text-muted",
						children: "Publisher"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: PUBLISHER })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-1 border-b border-rule py-3 sm:grid-cols-[8rem_1fr]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-sm text-muted",
						children: "Work"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: BOOK_TITLE })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-1 border-b border-rule py-3 sm:grid-cols-[8rem_1fr]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-sm text-muted",
						children: "Year"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: YEAR })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-1 py-3 sm:grid-cols-[8rem_1fr]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-sm text-muted",
						children: "ISBN"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: "None is printed on this edition." })]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Jump, {
				id: "family",
				onJump,
				children: "Begin with the family"
			})
		})
	] });
}
function Contents({ onJump }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs tracking-widest text-muted uppercase",
			children: "Front"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			id: "page-title",
			tabIndex: -1,
			className: "mt-3 font-display text-4xl text-ink outline-none",
			children: "Contents"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 flex flex-col gap-8",
			children: contentsGroups().map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-sm tracking-widest text-leaf uppercase",
				children: group.part
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-3",
				children: group.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "border-b border-rule",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => onJump(item.page.id),
						className: "flex min-h-11 w-full items-baseline justify-between gap-4 py-2 text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.page.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "shrink-0 text-sm text-muted tabular-nums",
							children: item.number
						})]
					})
				}, item.page.id))
			})] }, group.part))
		})
	] });
}
function EssayPage({ essayId, onJump }) {
	const essay = essayById(essayId);
	if (!essay) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "This page is missing." });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs tracking-widest text-muted uppercase",
			children: essay.kicker
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			id: "page-title",
			tabIndex: -1,
			className: "mt-3 max-w-prose font-display text-4xl text-ink outline-none",
			children: essay.title
		}),
		essay.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plate, {
			src: essay.image,
			alt: essay.imageAlt ?? "",
			caption: "The flower has four petals, set in a cross."
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-prose",
			children: [
				essay.paragraphs.map((paragraph, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: index === 0 ? "drop mt-6" : "mt-4",
					children: rich(paragraph)
				}), essay.insert === "shapes" && index === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "my-6 border-y border-rule",
					children: shapes.map((shape) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "border-b border-rule py-4 last:border-b-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-xl text-ink",
								children: shape.organ
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-leaf",
								children: shape.plants
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-muted",
								children: shape.note
							})
						]
					}, shape.organ))
				}) : null] }, index)),
				essay.insert === "signs" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "my-6 border-y border-rule",
					children: stillGood.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "border-b border-rule py-4 last:border-b-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-lg text-ink",
							children: item.sign
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1",
							children: item.doThis
						})]
					}, item.sign))
				}) : null,
				essay.jumps && essay.jumps.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 flex flex-col items-start gap-2",
					children: essay.jumps.map((jump) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Jump, {
						id: jump.id,
						onJump,
						children: jump.label
					}, jump.id))
				}) : null
			]
		})
	] });
}
function PlantPage({ plantId, onJump }) {
	const plant = plantById(plantId);
	if (!plant) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "This plant is missing." });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs tracking-widest text-muted uppercase",
			children: "The plants"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-sm text-muted italic",
			children: plant.latin
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			id: "page-title",
			tabIndex: -1,
			className: "mt-2 max-w-prose font-display text-3xl text-ink outline-none sm:text-4xl md:text-5xl",
			children: plant.name
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 max-w-prose text-muted",
			children: plant.aka
		}),
		plant.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plate, {
			src: plant.image,
			alt: plant.imageAlt ?? plant.name
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "max-w-prose text-lg",
			children: plant.lede
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
			className: "mt-6 grid gap-4 border-y border-rule py-4 sm:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
					className: "text-xs tracking-widest text-muted uppercase",
					children: "The part we eat"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
					className: "mt-1",
					children: plant.part
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
					className: "text-xs tracking-widest text-muted uppercase",
					children: "Season"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
					className: "mt-1",
					children: plant.season
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
					className: "text-xs tracking-widest text-muted uppercase",
					children: "Keeps"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
					className: "mt-1",
					children: plant.keeps
				})] })
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 max-w-prose space-y-4",
			children: [plant.body.map((paragraph) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: rich(paragraph) }, paragraph)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-display text-ink",
				children: "Flavor. "
			}), plant.flavor] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "mt-8 max-w-prose bg-paper-deep px-5 py-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl text-ink",
					children: "In the larder"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2",
					children: plant.storage
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Jump, {
						id: "keeping",
						onJump,
						children: "The keeping table"
					})
				})
			]
		}),
		plant.recipeIds.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 flex max-w-prose flex-col items-start gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl text-ink",
				children: "Cook this"
			}), plant.recipeIds.map((id) => {
				const recipe = recipeById(id);
				if (!recipe) return null;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => onJump(`recipe-${id}`),
					className: "press min-h-11 rounded-full border border-leaf px-4 py-2 text-left text-leaf hover:bg-leaf hover:text-paper",
					children: recipe.title
				}, id);
			})]
		}) : null
	] });
}
function StoragePage({ onJump }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs tracking-widest text-muted uppercase",
			children: "The larder"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			id: "page-title",
			tabIndex: -1,
			className: "mt-3 font-display text-4xl text-ink outline-none",
			children: "The keeping table"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 max-w-prose space-y-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "drop",
				children: "Times assume a cold crisper, the vegetable unwashed, and no apple leaking ethylene beside it. A warm kitchen shortens every number. The freezer column is a blanch, then an ice bath, then a dry bag."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Jump, {
				id: "cold",
				onJump,
				children: "How to blanch, and how to ferment"
			}) })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 flex flex-col gap-8",
			children: storageGroups().map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-sm tracking-widest text-leaf uppercase",
				children: group.name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-2",
				children: group.rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "border-b border-rule py-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-xl text-ink",
							children: row.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1",
							children: row.where
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-muted",
							children: [
								"Keeps ",
								row.keeps,
								". ",
								row.freezer,
								"."
							]
						})
					]
				}, row.name))
			})] }, group.name))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-8 max-w-prose",
			children: [
				"When the drawer is a mixture of things near the end of their time, cook",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Jump, {
					id: "recipe-tray",
					onJump,
					children: "a tray of the family"
				}),
				"."
			]
		})
	] });
}
function RecipePage({ recipeId, onJump }) {
	const recipe = recipeById(recipeId);
	if (!recipe) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "This recipe is missing." });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs tracking-widest text-muted uppercase",
			children: "The table"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			id: "page-title",
			tabIndex: -1,
			className: "mt-3 max-w-prose font-display text-3xl text-ink outline-none sm:text-4xl",
			children: recipe.title
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-3 text-muted",
			children: [
				recipe.serves,
				" · ",
				recipe.time
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-6 max-w-prose text-lg",
			children: recipe.intro
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-8 font-display text-xl text-ink",
			children: "Ingredients"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-3 max-w-prose",
			children: recipe.ingredients.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				className: "border-b border-rule py-2",
				children: item
			}, item))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-8 font-display text-xl text-ink",
			children: "Method"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "mt-3 flex max-w-prose flex-col gap-4",
			children: recipe.steps.map((step, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "grid grid-cols-[2rem_minmax(0,1fr)] gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display text-lg text-leaf tabular-nums",
					children: index + 1
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: step })]
			}, step))
		}),
		recipe.note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-6 max-w-prose text-muted",
			children: recipe.note
		}) : null,
		recipe.plantIds.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-8 flex max-w-prose flex-col items-start gap-2",
			children: recipe.plantIds.map((id) => {
				const plant = plantById(id);
				if (!plant) return null;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Jump, {
					id,
					onJump,
					children: `About ${plant.name}`
				}, id);
			})
		}) : null
	] });
}
function Colophon() {
	const offline = useOffline();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs tracking-widest text-muted uppercase",
			children: "End"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			id: "page-title",
			tabIndex: -1,
			className: "mt-3 font-display text-4xl text-ink outline-none",
			children: "Colophon"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 max-w-prose space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "drop",
					children: [BOOK_TITLE, " was made as a field guide to the edible mustard family: how the plants are related, how long they keep, and how to cook them without boiling them into a grievance."]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"Publisher and rights holder: ",
					PUBLISHER,
					".",
					" ",
					offline ? `This file is the offline copy. Write to ${RIGHTS_EMAIL} before you reprint any of it.` : `Write to ${RIGHTS_EMAIL} before you reprint any of it.`
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"© ",
					YEAR,
					" ",
					PUBLISHER,
					"."
				] })
			]
		})
	] });
}
function PageBody({ page, onJump }) {
	switch (page.kind) {
		case "cover": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cover, {});
		case "rights": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rights, { onJump });
		case "contents": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Contents, { onJump });
		case "essay": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EssayPage, {
			essayId: page.essayId,
			onJump
		});
		case "plant": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlantPage, {
			plantId: page.plantId,
			onJump
		});
		case "storage": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoragePage, { onJump });
		case "recipe": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecipePage, {
			recipeId: page.recipeId,
			onJump
		});
		case "colophon": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Colophon, {});
		default: return null;
	}
}
function BookView({ offline = false }) {
	const storageKey = offline ? "brassica-book-offline-page" : STORAGE_KEY;
	const [index, setIndex] = (0, import_react.useState)(0);
	const [menu, setMenu] = (0, import_react.useState)(false);
	const scroller = (0, import_react.useRef)(null);
	const touch = (0, import_react.useRef)(null);
	const page = pages[index] ?? pages[0];
	(0, import_react.useEffect)(() => {
		try {
			const saved = Number(localStorage.getItem(storageKey));
			if (Number.isInteger(saved) && saved > 0 && saved < pages.length) setIndex(saved);
		} catch {}
	}, [storageKey]);
	(0, import_react.useEffect)(() => {
		const title = index === 0 ? BOOK_TITLE : `${page.title} — ${BOOK_TITLE}`;
		document.title = title;
	}, [index, page.title]);
	(0, import_react.useEffect)(() => {
		if (!menu) return;
		const onKey = (event) => {
			if (event.key === "Escape") setMenu(false);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [menu]);
	function go(next) {
		const clamped = Math.max(0, Math.min(pages.length - 1, next));
		setIndex(clamped);
		try {
			localStorage.setItem(storageKey, String(clamped));
		} catch {}
		scroller.current?.scrollTo({
			top: 0,
			behavior: "auto"
		});
	}
	function jump(id) {
		setMenu(false);
		go(findPageIndex(id));
	}
	(0, import_react.useEffect)(() => {
		const onKey = (event) => {
			if (menu) return;
			const target = event.target;
			if (target instanceof HTMLElement && target.closest("input, textarea")) return;
			if (event.key === "ArrowRight") {
				event.preventDefault();
				go(index + 1);
			} else if (event.key === "ArrowLeft") {
				event.preventDefault();
				go(index - 1);
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	});
	const progress = (index + 1) / pages.length * 100;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfflineBook.Provider, {
		value: offline,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex h-dvh flex-col bg-cloth text-paper",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "shrink-0 px-4 pt-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto flex max-w-3xl items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate font-display text-sm text-paper",
								children: BOOK_TITLE
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "truncate text-xs text-paper/70",
								children: [
									page.part,
									" · ",
									index + 1,
									" / ",
									pages.length
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setMenu(true),
							className: "press inline-flex h-11 shrink-0 items-center gap-2 rounded-full border border-rule px-3 text-sm text-paper",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
								className: "size-4",
								"aria-hidden": "true"
							}), "Contents"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto mt-3 h-0.5 max-w-3xl bg-cloth-deep",
						"aria-hidden": "true",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full bg-brass",
							style: { width: `${progress}%` }
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					ref: scroller,
					className: "min-h-0 flex-1 overflow-y-auto px-3 py-4 md:px-8",
					onTouchStart: (event) => {
						const point = event.changedTouches[0];
						touch.current = {
							x: point.clientX,
							y: point.clientY
						};
					},
					onTouchEnd: (event) => {
						if (!touch.current || menu) return;
						const point = event.changedTouches[0];
						const dx = point.clientX - touch.current.x;
						const dy = point.clientY - touch.current.y;
						if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.4) go(dx < 0 ? index + 1 : index - 1);
						touch.current = null;
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
						"aria-labelledby": "page-title",
						className: "page-enter mx-auto min-h-full max-w-3xl bg-paper px-5 py-8 text-ink shadow-sheet sm:px-8 md:px-12 md:py-12",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageBody, {
							page,
							onJump: jump
						})
					}, page.id)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
					className: "safe-bottom shrink-0 px-3 pt-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto flex max-w-3xl items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": "Previous page",
								disabled: index === 0,
								onClick: () => go(index - 1),
								className: "press inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-rule text-paper disabled:opacity-30",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
									className: "size-5",
									"aria-hidden": "true"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "flex h-12 min-w-0 flex-1 items-center justify-center truncate px-2 text-center font-display text-paper",
								children: page.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": "Next page",
								disabled: index === pages.length - 1,
								onClick: () => go(index + 1),
								className: "press inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-rule text-paper disabled:opacity-30",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
									className: "size-5",
									"aria-hidden": "true"
								})
							})
						]
					})
				}),
				menu ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "fixed inset-0 z-30 flex justify-end bg-cloth/80",
					onClick: () => setMenu(false),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						role: "dialog",
						"aria-modal": "true",
						"aria-label": "Contents",
						className: "h-full w-full max-w-md overflow-y-auto bg-paper px-5 py-6 text-ink",
						onClick: (event) => event.stopPropagation(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl",
								children: "Contents"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": "Close contents",
								onClick: () => setMenu(false),
								className: "inline-flex h-11 w-11 items-center justify-center rounded-full border border-rule",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
									className: "size-5",
									"aria-hidden": "true"
								})
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6 flex flex-col gap-8",
							children: contentsGroups().map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-sm tracking-widest text-leaf uppercase",
								children: group.part
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
								className: "mt-2",
								children: group.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
									className: "border-b border-rule",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => jump(item.page.id),
										className: "flex min-h-11 w-full items-baseline justify-between gap-4 py-2 text-left",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.page.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "shrink-0 text-sm text-muted tabular-nums",
											children: item.number
										})]
									})
								}, item.page.id))
							})] }, group.part))
						})]
					})
				}) : null
			]
		})
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookView, {});
}
//#endregion
export { Home as component };
