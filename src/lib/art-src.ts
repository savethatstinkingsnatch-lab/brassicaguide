const art = new Map<string, string>();

export function registerArt(next: Record<string, string>) {
  for (const [path, url] of Object.entries(next)) art.set(path, url);
}

export function artSrc(src: string) {
  return art.get(src) ?? src;
}
