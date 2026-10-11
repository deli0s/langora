import { cp, mkdir, rm, copyFile } from 'node:fs/promises';
await rm('dist',{recursive:true,force:true});await mkdir('dist',{recursive:true});await copyFile('index.html','dist/index.html');await cp('src','dist/src',{recursive:true});await cp('public','dist',{recursive:true});console.log('Built Langora to dist/ (no external dependencies).');
