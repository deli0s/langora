import { cp, mkdir, rm, readFile, writeFile, readdir } from 'node:fs/promises';
const root = new URL('.', import.meta.url);
const dist = new URL('./dist/', root);
await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
await cp(new URL('./index.html', root), new URL('./dist/index.html', root));
await cp(new URL('./src/', root), new URL('./dist/src/', root), { recursive: true });
for (const entry of await readdir(new URL('./public/', root))) {
  await cp(new URL(`./public/${entry}`, root), new URL(`./dist/${entry}`, root), { recursive: true });
}
const htmlPath = new URL('./dist/index.html', root);
let html = await readFile(htmlPath, 'utf8');
html = html.replace(/href="\.\/manifest\.webmanifest"/g, 'href="./manifest.webmanifest"').replace(/href="\.\/icons\//g, 'href="./icons/');
await writeFile(htmlPath, html);
console.log('Built static PWA into dist/ (no runtime dependencies).');
