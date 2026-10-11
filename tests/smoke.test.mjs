import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const file = path => readFile(new URL(path, import.meta.url), 'utf8');

test('pnpm-based zero-dependency build and test scripts', async () => {
  const pkg = JSON.parse(await file('../package.json'));
  assert.equal(pkg.packageManager, 'pnpm@10.18.3');
  assert.equal(pkg.scripts.build, 'node scripts/build.mjs');
  assert.equal(pkg.scripts.test, 'node --test');
  assert.equal(Object.keys(pkg.dependencies || {}).length, 0);
});

test('the entrypoint uses the five-language application and new UI', async () => {
  const html = await file('../index.html');
  assert.match(html, /src\/main\.js/);
  assert.match(html, /src\/refinements\.css/);
  assert.match(html, /src\/style\.css/);
  const code = await file('../src/main.js');
  assert.match(code, /from '\.\/content\.js'/);
  assert.match(code, /from '\.\/locale\.js'/);
  assert.match(code, /target-language/);
  assert.match(code, /quick-language/);
  assert.match(code, /ui-language/);
  assert.match(code, /state\.target=e\.target\.value/);
  assert.match(code, /document\.documentElement\.lang=state\.ui/);
  assert.match(code, /langora-app-v2/);
  assert.match(code, /indexedDB/);
  assert.match(code, /'home','academy','situations','listening','conversation','vocabulary'/);
});

test('installability and offline service worker include all application modules', async () => {
  const manifest = JSON.parse(await file('../public/manifest.webmanifest'));
  assert.equal(manifest.display, 'standalone');
  assert.equal(manifest.start_url, './');
  const sw = await file('../public/sw.js');
  for (const path of ['index.html','src/main.js','src/content.js','src/locale.js','src/style.css','src/refinements.css']) {
    assert.ok(sw.includes(path), `${path} must be pre-cached`);
  }
  assert.match(sw, /cache\.addAll/);
  assert.match(sw, /activate/);
});

test('responsive learning UI includes mobile navigation and dark mode', async () => {
  const css = await file('../src/refinements.css');
  assert.match(css, /data-theme=dark/);
  assert.match(css, /mobile-nav/);
  assert.match(css, /max-width:360px/);
});
