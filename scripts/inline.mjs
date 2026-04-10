import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const distDir = path.resolve(process.cwd(), 'dist');
const htmlPath = path.join(distDir, 'index.html');
const outputPath = path.join(distDir, 'poe2-offline.html');

const stripPathPrefix = (value) => value.replace(/^(\.\/)+/, '').replace(/^\/+/, '');

const html = await readFile(htmlPath, 'utf8');

const cssRegex = /<link\s+rel="stylesheet"[^>]*href="([^"]+\.css)"[^>]*>/gi;
const jsRegex = /<script\s+type="module"[^>]*src="([^"]+\.js)"[^>]*><\/script>/gi;

let nextHtml = html.replace(/<link\s+rel="modulepreload"[^>]*>\s*/gi, '');

nextHtml = await replaceAsync(nextHtml, cssRegex, async (match, href) => {
  const filePath = path.join(distDir, stripPathPrefix(href));
  const css = await readFile(filePath, 'utf8');
  const safeCss = css.replace(/<\/style>/gi, '<\\/style>');
  return `<style>${safeCss}</style>`;
});

nextHtml = await replaceAsync(nextHtml, jsRegex, async (match, src) => {
  const filePath = path.join(distDir, stripPathPrefix(src));
  const js = await readFile(filePath, 'utf8');
  const safeJs = js.replace(/<\/script>/gi, '<\\/script>');
  return `<script type="module">${safeJs}</script>`;
});

await writeFile(outputPath, nextHtml, 'utf8');

async function replaceAsync(text, regex, replacer) {
  const replacements = [];
  text.replace(regex, (...args) => {
    replacements.push(replacer(...args));
    return '';
  });

  const resolved = await Promise.all(replacements);
  let index = 0;
  return text.replace(regex, () => resolved[index++]);
}
