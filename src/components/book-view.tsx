import { createContext, Fragment, useContext, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, List, X } from "lucide-react";
import {
  APP_NAME,
  BOOK_TITLE,
  PUBLISHER,
  SERIES,
  YEAR,
  essayById,
  findPageIndex,
  glossary,
  pages,
  plantById,
  recipeById,
  shapes,
  stillGood,
  storageRows,
  type Page,
  type StorageRow,
} from "@/lib/book-data";
import { artSrc } from "@/lib/art-src";

const STORAGE_KEY = "brassica-book-page";
const OfflineBook = createContext(false);

function useOffline() {
  return useContext(OfflineBook);
}

function rich(text: string) {
  const parts = text.split(/(\*[^*]+\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      return <em key={index}>{part.slice(1, -1)}</em>;
    }
    return <Fragment key={index}>{part}</Fragment>;
  });
}

function Plate({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    <figure className="my-6">
      <img src={artSrc(src)} alt={alt} onError={() => setFailed(true)} className="mx-auto w-full max-w-md" />
      {caption ? (
        <figcaption className="mt-2 text-center text-sm text-muted italic">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

function Jump({
  id,
  children,
  onJump,
}: {
  id: string;
  children: string;
  onJump: (id: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onJump(id)}
      className="text-left text-leaf underline decoration-rule underline-offset-4 hover:decoration-leaf"
    >
      {children}
    </button>
  );
}

function contentsGroups() {
  const groups: { part: string; items: { page: Page; number: number }[] }[] = [];
  pages.forEach((page, number) => {
    if (!page.toc) return;
    const last = groups[groups.length - 1];
    const item = { page, number: number + 1 };
    if (!last || last.part !== page.part) groups.push({ part: page.part, items: [item] });
    else last.items.push(item);
  });
  return groups;
}

function storageGroups() {
  const groups: { name: string; rows: StorageRow[] }[] = [];
  for (const row of storageRows) {
    const last = groups[groups.length - 1];
    if (!last || last.name !== row.group) groups.push({ name: row.group, rows: [row] });
    else last.rows.push(row);
  }
  return groups;
}

function Cover() {
  const offline = useOffline();
  return (
    <div className="flex flex-col">
      <p className="text-xs tracking-widest text-muted uppercase">{SERIES}</p>
      <h1 id="page-title" tabIndex={-1} className="mt-3 font-display text-4xl text-ink outline-none sm:text-5xl md:text-6xl">
        The Brassica Book
      </h1>
      <p className="mt-4 max-w-prose text-lg text-ink">
        Cauliflower, broccoli, and the other plants we eat from the same family.
      </p>
      <Plate
        src="/art/cover.jpg"
        alt="Watercolor still life of cauliflower, broccoli, cabbage, radishes, and kale"
      />
      <p className="font-display text-xl text-ink">by {PUBLISHER}</p>
      <p className="mt-6 max-w-prose">
        {offline
          ? "This is your offline copy. Open this file in a browser. It does not need a connection. "
          : ""}
        This guide is free. Publishing rights are held by {PUBLISHER}.
      </p>
    </div>
  );
}

function Rights({ onJump }: { onJump: (id: string) => void }) {
  const offline = useOffline();
  return (
    <div>
      <p className="text-xs tracking-widest text-muted uppercase">Front</p>
      <h1 id="page-title" tabIndex={-1} className="mt-3 font-display text-4xl text-ink outline-none">
        Publishing rights
      </h1>
      <div className="mt-6 max-w-prose space-y-4">
        <p className="drop">
          {offline
            ? "This file is the whole book, one page at a time, and it keeps working with no connection. "
            : ""}
          All publishing rights in this text are held by {PUBLISHER}. That means the right to print,
          sell, excerpt, translate, and adapt it. Reading it here is not permission to republish it.
          Please ask {PUBLISHER} before you reprint any of it.
        </p>
      </div>
      <div className="mt-8 max-w-prose">
        <p className="text-sm text-muted">
          {offline ? (
            "Turn the pages with the arrows, or open Contents. Your place is remembered on this computer."
          ) : (
            <>
              A copy that opens with no connection is{" "}
              <a className="underline decoration-rule underline-offset-4" href="/download">
                here
              </a>
              .
            </>
          )}
        </p>
      </div>
      <dl className="mt-10 max-w-prose border-t border-rule pt-6">
        <div className="grid gap-1 border-b border-rule py-3 sm:grid-cols-[8rem_1fr]">
          <dt className="text-sm text-muted">Publisher</dt>
          <dd>{PUBLISHER}</dd>
        </div>
        <div className="grid gap-1 border-b border-rule py-3 sm:grid-cols-[8rem_1fr]">
          <dt className="text-sm text-muted">Work</dt>
          <dd>{BOOK_TITLE}</dd>
        </div>
        <div className="grid gap-1 border-b border-rule py-3 sm:grid-cols-[8rem_1fr]">
          <dt className="text-sm text-muted">Year</dt>
          <dd>{YEAR}</dd>
        </div>
        <div className="grid gap-1 py-3 sm:grid-cols-[8rem_1fr]">
          <dt className="text-sm text-muted">ISBN</dt>
          <dd>None is printed on this edition.</dd>
        </div>
      </dl>
      <p className="mt-8">
        <Jump id="family" onJump={onJump}>
          Begin with the family
        </Jump>
      </p>
    </div>
  );
}

function Contents({ onJump }: { onJump: (id: string) => void }) {
  return (
    <div>
      <p className="text-xs tracking-widest text-muted uppercase">Front</p>
      <h1 id="page-title" tabIndex={-1} className="mt-3 font-display text-4xl text-ink outline-none">
        Contents
      </h1>
      <div className="mt-8 flex flex-col gap-8">
        {contentsGroups().map((group) => (
          <section key={group.part}>
            <h2 className="font-display text-sm tracking-widest text-leaf uppercase">{group.part}</h2>
            <ol className="mt-3">
              {group.items.map((item) => (
                <li key={item.page.id} className="border-b border-rule">
                  <button
                    type="button"
                    onClick={() => onJump(item.page.id)}
                    className="flex min-h-11 w-full items-baseline justify-between gap-4 py-2 text-left"
                  >
                    <span>{item.page.title}</span>
                    <span className="shrink-0 text-sm text-muted tabular-nums">{item.number}</span>
                  </button>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </div>
  );
}

function EssayPage({ essayId, onJump }: { essayId: string; onJump: (id: string) => void }) {
  const essay = essayById(essayId);
  if (!essay) return <p>This page is missing.</p>;
  return (
    <div>
      <p className="text-xs tracking-widest text-muted uppercase">{essay.kicker}</p>
      <h1 id="page-title" tabIndex={-1} className="mt-3 max-w-prose font-display text-4xl text-ink outline-none">
        {essay.title}
      </h1>
      {essay.image ? (
        <Plate src={essay.image} alt={essay.imageAlt ?? ""} caption="The flower has four petals, set in a cross." />
      ) : null}
      <div className="max-w-prose">
        {essay.paragraphs.map((paragraph, index) => (
          <Fragment key={index}>
            <p className={index === 0 ? "drop mt-6" : "mt-4"}>{rich(paragraph)}</p>
            {essay.insert === "shapes" && index === 1 ? (
              <ol className="my-6 border-y border-rule">
                {shapes.map((shape) => (
                  <li key={shape.organ} className="border-b border-rule py-4 last:border-b-0">
                    <p className="font-display text-xl text-ink">{shape.organ}</p>
                    <p className="mt-1 text-leaf">{shape.plants}</p>
                    <p className="mt-1 text-muted">{shape.note}</p>
                  </li>
                ))}
              </ol>
            ) : null}
          </Fragment>
        ))}
        {essay.insert === "signs" ? (
          <ul className="my-6 border-y border-rule">
            {stillGood.map((item) => (
              <li key={item.sign} className="border-b border-rule py-4 last:border-b-0">
                <p className="font-display text-lg text-ink">{item.sign}</p>
                <p className="mt-1">{item.doThis}</p>
              </li>
            ))}
          </ul>
        ) : null}
        {essay.jumps && essay.jumps.length > 0 ? (
          <p className="mt-6 flex flex-col items-start gap-2">
            {essay.jumps.map((jump) => (
              <Jump key={jump.id} id={jump.id} onJump={onJump}>
                {jump.label}
              </Jump>
            ))}
          </p>
        ) : null}
      </div>
    </div>
  );
}

function PlantPage({ plantId, onJump }: { plantId: string; onJump: (id: string) => void }) {
  const plant = plantById(plantId);
  if (!plant) return <p>This plant is missing.</p>;
  return (
    <div>
      <p className="text-xs tracking-widest text-muted uppercase">The plants</p>
      <p className="mt-3 text-sm text-muted italic">{plant.latin}</p>
      <h1 id="page-title" tabIndex={-1} className="mt-2 max-w-prose font-display text-3xl text-ink outline-none sm:text-4xl md:text-5xl">
        {plant.name}
      </h1>
      <p className="mt-3 max-w-prose text-muted">{plant.aka}</p>
      {plant.image ? <Plate src={plant.image} alt={plant.imageAlt ?? plant.name} /> : null}
      <p className="max-w-prose text-lg">{plant.lede}</p>
      <dl className="mt-6 grid gap-4 border-y border-rule py-4 sm:grid-cols-3">
        <div>
          <dt className="text-xs tracking-widest text-muted uppercase">The part we eat</dt>
          <dd className="mt-1">{plant.part}</dd>
        </div>
        <div>
          <dt className="text-xs tracking-widest text-muted uppercase">Season</dt>
          <dd className="mt-1">{plant.season}</dd>
        </div>
        <div>
          <dt className="text-xs tracking-widest text-muted uppercase">Keeps</dt>
          <dd className="mt-1">{plant.keeps}</dd>
        </div>
      </dl>
      <div className="mt-6 max-w-prose space-y-4">
        {plant.body.map((paragraph) => (
          <p key={paragraph}>{rich(paragraph)}</p>
        ))}
        <p>
          <span className="font-display text-ink">Flavor. </span>
          {plant.flavor}
        </p>
        {plant.seeAlso ? <p className="font-display text-leaf">{plant.seeAlso}</p> : null}
      </div>
      <aside className="mt-8 max-w-prose bg-paper-deep px-5 py-5">
        <h2 className="font-display text-xl text-ink">In the larder</h2>
        <p className="mt-2">{plant.storage}</p>
        <p className="mt-3">
          <Jump id="keeping" onJump={onJump}>
            The keeping table
          </Jump>
        </p>
      </aside>
      {plant.recipeIds.length > 0 ? (
        <div className="mt-8 flex max-w-prose flex-col items-start gap-3">
          <h2 className="font-display text-xl text-ink">Cook this</h2>
          {plant.recipeIds.map((id) => {
            const recipe = recipeById(id);
            if (!recipe) return null;
            return (
              <button
                key={id}
                type="button"
                onClick={() => onJump(`recipe-${id}`)}
                className="press min-h-11 rounded-full border border-leaf px-4 py-2 text-left text-leaf hover:bg-leaf hover:text-paper"
              >
                {recipe.title}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

function StoragePage({ onJump }: { onJump: (id: string) => void }) {
  return (
    <div>
      <p className="text-xs tracking-widest text-muted uppercase">The larder</p>
      <h1 id="page-title" tabIndex={-1} className="mt-3 font-display text-4xl text-ink outline-none">
        The keeping table
      </h1>
      <div className="mt-4 max-w-prose space-y-4">
        <p className="drop">
          Times assume a cold crisper, the vegetable unwashed, and no apple leaking ethylene beside
          it. A warm kitchen shortens every number. The freezer column is a blanch, then an ice bath,
          then a dry bag.
        </p>
        <p>
          <Jump id="cold" onJump={onJump}>
            How to blanch, and how to ferment
          </Jump>
        </p>
      </div>
      <div className="mt-8 flex flex-col gap-8">
        {storageGroups().map((group) => (
          <section key={group.name}>
            <h2 className="font-display text-sm tracking-widest text-leaf uppercase">{group.name}</h2>
            <ul className="mt-2">
              {group.rows.map((row) => (
                <li key={row.name} className="border-b border-rule py-4">
                  <p className="font-display text-xl text-ink">{row.name}</p>
                  <p className="mt-1">{row.where}</p>
                  <p className="mt-1 text-muted">
                    Keeps {row.keeps}. {row.freezer}.
                  </p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <p className="mt-8 max-w-prose">
        When the drawer is a mixture of things near the end of their time, cook{" "}
        <Jump id="recipe-tray" onJump={onJump}>
          a tray of the family
        </Jump>
        .
      </p>
    </div>
  );
}

function RecipePage({ recipeId, onJump }: { recipeId: string; onJump: (id: string) => void }) {
  const recipe = recipeById(recipeId);
  if (!recipe) return <p>This recipe is missing.</p>;
  return (
    <div>
      <p className="text-xs tracking-widest text-muted uppercase">The table</p>
      <h1 id="page-title" tabIndex={-1} className="mt-3 max-w-prose font-display text-3xl text-ink outline-none sm:text-4xl">
        {recipe.title}
      </h1>
      <p className="mt-3 text-muted">
        {recipe.serves} · {recipe.time}
      </p>
      <p className="mt-6 max-w-prose text-lg">{recipe.intro}</p>
      <h2 className="mt-8 font-display text-xl text-ink">Ingredients</h2>
      <ul className="mt-3 max-w-prose">
        {recipe.ingredients.map((item) => (
          <li key={item} className="border-b border-rule py-2">
            {item}
          </li>
        ))}
      </ul>
      <h2 className="mt-8 font-display text-xl text-ink">Method</h2>
      <ol className="mt-3 flex max-w-prose flex-col gap-4">
        {recipe.steps.map((step, index) => (
          <li key={step} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3">
            <span className="font-display text-lg text-leaf tabular-nums">{index + 1}</span>
            <p>{step}</p>
          </li>
        ))}
      </ol>
      {recipe.note ? <p className="mt-6 max-w-prose text-muted">{recipe.note}</p> : null}
      {recipe.plantIds.length > 0 ? (
        <p className="mt-8 flex max-w-prose flex-col items-start gap-2">
          {recipe.plantIds.map((id) => {
            const plant = plantById(id);
            if (!plant) return null;
            return (
              <Jump key={id} id={id} onJump={onJump}>
                {`About ${plant.name}`}
              </Jump>
            );
          })}
        </p>
      ) : null}
    </div>
  );
}

function Colophon() {
  const offline = useOffline();
  return (
    <div>
      <p className="text-xs tracking-widest text-muted uppercase">End</p>
      <h1 id="page-title" tabIndex={-1} className="mt-3 font-display text-4xl text-ink outline-none">
        Colophon
      </h1>
      <div className="mt-6 max-w-prose space-y-4">
        <p className="drop">
          {BOOK_TITLE} was made as a field guide to the edible mustard family: how the plants are
          related, how long they keep, and how to cook them without boiling them into a grievance.
        </p>
        <p>
          Publisher and rights holder: {PUBLISHER}.{" "}
          {offline ? "This file is the offline copy. " : ""}
          Please ask {PUBLISHER} before you reprint any of it.
        </p>
        <p>© {YEAR} {PUBLISHER}.</p>
      </div>
    </div>
  );
}

function NotesPage({ page }: { page: Extract<Page, { kind: "notes" }> }) {
  const ListTag = page.ordered ? "ol" : "ul";
  const list = (
    <ListTag className={`mt-6 max-w-prose space-y-3 ${page.ordered ? "list-decimal pl-5" : "list-disc pl-5"}`}>
      {page.items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ListTag>
  );
  return (
    <div>
      <p className="text-xs tracking-widest text-muted uppercase">{page.part}</p>
      <h1 id="page-title" tabIndex={-1} className="mt-3 font-display text-4xl text-ink outline-none">
        {page.title}
      </h1>
      {page.intro ? <p className="drop mt-6 max-w-prose text-lg">{page.intro}</p> : null}
      {page.boxed ? (
        <aside className="mt-6 max-w-prose border-2 border-leaf bg-paper-deep px-5 py-5">{list}</aside>
      ) : (
        list
      )}
    </div>
  );
}

function GlossaryPage() {
  return (
    <div>
      <p className="text-xs tracking-widest text-muted uppercase">End</p>
      <h1 id="page-title" tabIndex={-1} className="mt-3 font-display text-4xl text-ink outline-none">
        Glossary
      </h1>
      <dl className="mt-8 max-w-prose">
        {glossary.map((entry) => (
          <div key={entry.term} className="border-b border-rule py-3">
            <dt className="font-display text-lg text-ink">{entry.term}</dt>
            <dd className="mt-1">{entry.meaning}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function AboutPage() {
  return (
    <div>
      <p className="text-xs tracking-widest text-muted uppercase">End</p>
      <h1 id="page-title" tabIndex={-1} className="mt-3 font-display text-4xl text-ink outline-none">
        About and disclaimer
      </h1>
      <div className="mt-6 max-w-prose space-y-4">
        <p className="drop">
          This pocket guide is for learning. Check your local county extension office for advice in
          your area. Never eat a wild plant you cannot identify for certain.
        </p>
        <p>{PUBLISHER} are not responsible for illness, injury, or crop loss.</p>
        <p>Part of The Education Revolution pocket guide series.</p>
      </div>
    </div>
  );
}

export function PageBody({ page, onJump }: { page: Page; onJump: (id: string) => void }) {
  switch (page.kind) {
    case "cover":
      return <Cover />;
    case "rights":
      return <Rights onJump={onJump} />;
    case "contents":
      return <Contents onJump={onJump} />;
    case "essay":
      return <EssayPage essayId={page.essayId} onJump={onJump} />;
    case "plant":
      return <PlantPage plantId={page.plantId} onJump={onJump} />;
    case "storage":
      return <StoragePage onJump={onJump} />;
    case "recipe":
      return <RecipePage recipeId={page.recipeId} onJump={onJump} />;
    case "notes":
      return <NotesPage page={page} />;
    case "glossary":
      return <GlossaryPage />;
    case "about":
      return <AboutPage />;
    case "colophon":
      return <Colophon />;
    default:
      return null;
  }
}

export function BookView({ offline = false }: { offline?: boolean }) {
  const storageKey = offline ? "brassica-book-offline-page" : STORAGE_KEY;
  const [index, setIndex] = useState(0);
  const [menu, setMenu] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const page = pages[index] ?? pages[0];

  useEffect(() => {
    try {
      const saved = Number(localStorage.getItem(storageKey));
      if (Number.isInteger(saved) && saved > 0 && saved < pages.length) setIndex(saved);
    } catch {
      /* ignore */
    }
  }, [storageKey]);

  useEffect(() => {
    const title = index === 0 ? APP_NAME : `${page.title} — ${APP_NAME}`;
    document.title = title;
  }, [index, page.title]);

  useEffect(() => {
    if (!menu) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenu(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menu]);

  function go(next: number) {
    const clamped = Math.max(0, Math.min(pages.length - 1, next));
    setIndex(clamped);
    try {
      localStorage.setItem(storageKey, String(clamped));
    } catch {
      /* ignore */
    }
    scroller.current?.scrollTo({ top: 0, behavior: "auto" });
  }

  function jump(id: string) {
    setMenu(false);
    go(findPageIndex(id));
  }

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
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

  const progress = ((index + 1) / pages.length) * 100;

  return (
    <OfflineBook.Provider value={offline}>
    <div className="flex h-dvh flex-col bg-cloth text-paper">
      <header className="shrink-0 px-4 pt-3">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate font-display text-sm text-paper">{APP_NAME}</p>
            <p className="truncate text-xs text-paper/70">
              {page.part} · {index + 1} / {pages.length}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setMenu(true)}
            className="press inline-flex h-11 shrink-0 items-center gap-2 rounded-full border border-rule px-3 text-sm text-paper"
          >
            <List className="size-4" aria-hidden="true" />
            Contents
          </button>
        </div>
        <div className="mx-auto mt-3 h-0.5 max-w-3xl bg-cloth-deep" aria-hidden="true">
          <div className="h-full bg-brass" style={{ width: `${progress}%` }} />
        </div>
      </header>

      <div
        ref={scroller}
        className="min-h-0 flex-1 overflow-y-auto px-3 py-4 md:px-8"
        onTouchStart={(event) => {
          const point = event.changedTouches[0];
          touch.current = { x: point.clientX, y: point.clientY };
        }}
        onTouchEnd={(event) => {
          if (!touch.current || menu) return;
          const point = event.changedTouches[0];
          const dx = point.clientX - touch.current.x;
          const dy = point.clientY - touch.current.y;
          if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.4) go(dx < 0 ? index + 1 : index - 1);
          touch.current = null;
        }}
      >
        <article
          key={page.id}
          aria-labelledby="page-title"
          className="page-enter mx-auto min-h-full max-w-3xl bg-paper px-5 py-8 text-ink shadow-sheet sm:px-8 md:px-12 md:py-12"
        >
          <PageBody page={page} onJump={jump} />
        </article>
      </div>

      <footer className="safe-bottom shrink-0 px-3 pt-2">
        <div className="mx-auto flex max-w-3xl items-center gap-2">
          <button
            type="button"
            aria-label="Previous page"
            disabled={index === 0}
            onClick={() => go(index - 1)}
            className="press inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-rule text-paper disabled:opacity-30"
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
          <p className="flex h-12 min-w-0 flex-1 items-center justify-center truncate px-2 text-center font-display text-paper">
            {page.title}
          </p>
          <button
            type="button"
            aria-label="Next page"
            disabled={index === pages.length - 1}
            onClick={() => go(index + 1)}
            className="press inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-rule text-paper disabled:opacity-30"
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        </div>
        <p className="mx-auto mt-2 max-w-3xl pb-1 text-center text-xs text-paper/80">
          Privacy: This guide does not collect your name, email, or any personal information.
        </p>
      </footer>

      {menu ? (
        <div className="fixed inset-0 z-30 flex justify-end bg-cloth/80" onClick={() => setMenu(false)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Contents"
            className="h-full w-full max-w-md overflow-y-auto bg-paper px-5 py-6 text-ink"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-display text-2xl">Contents</h2>
              <button
                type="button"
                aria-label="Close contents"
                onClick={() => setMenu(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-rule"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flex flex-col gap-8">
              {contentsGroups().map((group) => (
                <section key={group.part}>
                  <h3 className="font-display text-sm tracking-widest text-leaf uppercase">{group.part}</h3>
                  <ol className="mt-2">
                    {group.items.map((item) => (
                      <li key={item.page.id} className="border-b border-rule">
                        <button
                          type="button"
                          onClick={() => jump(item.page.id)}
                          className="flex min-h-11 w-full items-baseline justify-between gap-4 py-2 text-left"
                        >
                          <span>{item.page.title}</span>
                          <span className="shrink-0 text-sm text-muted tabular-nums">{item.number}</span>
                        </button>
                      </li>
                    ))}
                  </ol>
                </section>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
    </OfflineBook.Provider>
  );
}
