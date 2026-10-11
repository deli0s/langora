import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(process.argv[2] || '.');
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.webmanifest':'application/manifest+json','.json':'application/json'};
const server = http.createServer(async (req,res)=>{try{let pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);let file=path.join(root,pathname==='/'?'index.html':pathname);if(!file.startsWith(root))throw new Error('invalid path');try{if((await stat(file)).isDirectory())file=path.join(file,'index.html')}catch{}const body=await readFile(file);res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-cache'});res.end(body)}catch{res.writeHead(404);res.end('Not found')}});
server.listen(4173,'0.0.0.0',()=>console.log(`Langora running at http://localhost:4173 (root: ${root})`));
