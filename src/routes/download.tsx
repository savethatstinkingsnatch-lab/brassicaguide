import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BOOK_TITLE, pages } from "@/lib/book-data";

export const Route = createFileRoute("/download")({ component: DownloadCopy });

function DownloadCopy() {
  const [size, setSize] = useState("");

  useEffect(() => {
    document.title = `Download — ${BOOK_TITLE}`;
    fetch("/the-brassica-book.html", { method: "HEAD" })
      .then((response) => Number(response.headers.get("content-length")))
      .then((bytes) => {
        if (bytes > 0) setSize(`${(bytes / 1_000_000).toFixed(1)} MB`);
      })
      .catch(() => undefined);
  }, []);

  return (
    <div className="min-h-dvh bg-cloth px-4 py-10 text-paper">
      <div className="mx-auto max-w-lg">
        <p className="text-xs tracking-widest text-paper/70 uppercase">Offline</p>
        <h1 className="mt-3 font-display text-4xl text-paper">A copy you can keep</h1>
        <p className="mt-4 text-paper/85">
          One file, the same {pages.length}-page book. Save it, then open it in a browser. It does not
          need a connection.
        </p>
        <a
          href="/the-brassica-book.html"
          download="The Brassica Book.html"
          className="press mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-brass px-5 font-display text-lg text-brass-ink"
        >
          Download the app{size ? ` · ${size}` : ""}
        </a>
        <p className="mt-6 text-sm text-paper/70">
          <a className="underline decoration-rule underline-offset-4" href="/">
            Back to the book
          </a>
        </p>
      </div>
    </div>
  );
}
