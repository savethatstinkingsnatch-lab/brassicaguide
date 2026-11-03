import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const plates = join(root, "src/offline/plates");
const faces = join(root, "src/offline/faces");
const artDir = join(root, "public/art");

mkdirSync(plates, { recursive: true });
const artFiles = readdirSync(artDir).filter((file) => file.endsWith(".jpg"));
const platesReady = artFiles.every((name) => existsSync(join(plates, name)));
if (!platesReady) {
  for (const name of artFiles) {
    const result = spawnSync(
      "ffmpeg",
      ["-y", "-hide_banner", "-loglevel", "error", "-i", join(artDir, name), "-vf", "scale='min(1200,iw)':-2", "-q:v", "5", "-frames:v", "1", join(plates, name)],
      { stdio: "inherit" },
    );
    if (result.status !== 0) {
      console.error("[offline] ffmpeg is required to create plates, and it failed.");
      process.exit(result.status ?? 1);
    }
  }
}

await writeFonts();

const build = spawnSync("npx", ["vite", "build", "--config", "vite.offline.config.ts"], {
  cwd: root,
  stdio: "inherit",
});
if (build.status !== 0) process.exit(build.status ?? 1);

const dist = join(root, "dist-offline");
const htmlPath = findHtml(dist);
let html = readFileSync(htmlPath, "utf8");
const htmlDir = dirname(htmlPath);
html = inlineAsset(html, /<link rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/g, htmlDir, (css) => `<style>${css}</style>`);
html = inlineAsset(
  html,
  /<script type="module"[^>]*src="([^"]+)"[^>]*><\/script>/g,
  htmlDir,
  (js) => `<script type="module">${js.replaceAll("</script", "<\\/script")}</script>`,
);
if (/<(script|link)\b[^>]+(?:src|href)="(?!data:)/.test(html)) {
  console.error("[offline] bundle still points outside the file");
  console.error(html.slice(0, 800));
  process.exit(1);
}
const out = join(root, "public/the-brassica-book.html");
writeFileSync(out, html);
rmSync(dist, { recursive: true, force: true });
console.log(`[offline] wrote ${out} (${html.length} bytes)`);

function inlineAsset(html, pattern, htmlDir, wrap) {
  return html.replace(pattern, (tag, href) => {
    const file = join(htmlDir, href.split("?")[0]);
    return wrap(readFileSync(file, "utf8"));
  });
}

function findHtml(distDir) {
  const hits = [];
  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) walk(path);
      else if (entry.name.endsWith(".html")) hits.push(path);
    }
  };
  walk(distDir);
  if (hits.length !== 1) {
    console.error("[offline] expected one html file, found", hits);
    process.exit(1);
  }
  return hits[0];
}

async function writeFonts() {
  const cssPath = join(root, "src/offline/fonts.css");
  const blank = "/* System faces. The shop fonts could not be packed into this copy. */\n";
  try {
    mkdirSync(faces, { recursive: true });
    const family =
      "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,560;0,9..144,640;1,9..144,560&family=Literata:ital,opsz,wght@0,7..72,400;0,7..72,650;1,7..72,400&display=swap";
    const css = await fetch(family, {
      headers: { "User-Agent": "Mozilla/5.0" },
      signal: AbortSignal.timeout(15000),
    }).then((response) => {
      if (!response.ok) throw new Error(String(response.status));
      return response.text();
    });
    let index = 0;
    const local = await replaceAsync(css, /url\((https:[^)]+)\)/g, async (_match, url) => {
      const bytes = await fetch(url, { signal: AbortSignal.timeout(15000) }).then((response) => {
        if (!response.ok) throw new Error(String(response.status));
        return response.arrayBuffer();
      });
      const name = `face-${index}.woff2`;
      index += 1;
      writeFileSync(join(faces, name), Buffer.from(bytes));
      return `url(./faces/${name})`;
    });
    writeFileSync(cssPath, local);
  } catch (error) {
    console.warn("[offline] fonts left as system faces:", error instanceof Error ? error.message : error);
    writeFileSync(cssPath, blank);
  }
}

async function replaceAsync(text, pattern, replacer) {
  const matches = [...text.matchAll(pattern)];
  let cursor = 0;
  let out = "";
  for (const match of matches) {
    out += text.slice(cursor, match.index);
    out += await replacer(...match);
    cursor = match.index + match[0].length;
  }
  return out + text.slice(cursor);
}
