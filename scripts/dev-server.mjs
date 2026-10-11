import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, join, relative, isAbsolute } from 'node:path';

const root = resolve(process.argv[2] || '.');
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webmanifest': 'application/manifest+json',
  '.json': 'application/json'
};

createServer(async (request, response) => {
  try {
    const path = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const destination = resolve(join(root, path.replace(/^\/+/, '')));
    const fromRoot = relative(root, destination);
    if (fromRoot.startsWith('..') || isAbsolute(fromRoot)) throw new Error('Invalid path');
    let file = destination;
    try {
      file = (await stat(destination)).isDirectory() ? join(destination, 'index.html') : destination;
    } catch {
      // In the source tree, static PWA assets live in public/. The build
      // flattens them into dist/, so this fallback is development-only.
      file = resolve(join(root, 'public', path.replace(/^\/+/, '')));
      const fromPublic = relative(join(root, 'public'), file);
      if (fromPublic.startsWith('..') || isAbsolute(fromPublic)) throw new Error('Invalid asset');
    }
    const data = await readFile(file);
    response.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
    response.end(data);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Not found');
  }
}).listen(4173, () => console.log('Langora available at http://localhost:4173'));
