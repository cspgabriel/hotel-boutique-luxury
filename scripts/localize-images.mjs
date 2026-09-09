/**
 * Baixa, otimiza e passa a servir localmente todas as imagens remotas do
 * hotel.config.ts.
 *
 * Hotlink de banco de imagens e aceitavel numa demo noindex, nunca num site de
 * cliente pago: a licenca nao acompanha o link, o terceiro pode remover ou
 * trocar o arquivo, e cada visita paga a latencia de um dominio externo.
 *
 * Uso:
 *   node scripts/localize-images.mjs            # baixa, otimiza e reescreve o config
 *   node scripts/localize-images.mjs --dry-run  # so relata o que faria
 *
 * O config e reescrito para /images/<slug>.webp e um CREDITS.md e gerado com a
 * URL de origem de cada arquivo, para a verificacao de licenca.
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CONFIG = path.join(root, 'src/data/hotel.config.ts');
const OUT_DIR = path.join(root, 'public/images');
const PUBLIC_PREFIX = '/images';

// Largura maxima servida. O layout nunca usa mais que isso; acima disso e peso
// puro. Imagens menores que o limite nao sao ampliadas.
const MAX_WIDTH = 2000;
const QUALITY = 78;

const dryRun = process.argv.includes('--dry-run');

const slugify = (s) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60);

/** Nome estavel derivado da URL, para que re-execucoes nao dupliquem arquivos. */
function nameFor(url, used) {
  const { pathname } = new URL(url);
  const base = slugify(path.basename(pathname).replace(/\.[a-z]+$/i, '')) || 'imagem';
  let name = base;
  let n = 2;
  while (used.has(name)) name = `${base}-${n++}`;
  used.add(name);
  return name;
}

const source = await readFile(CONFIG, 'utf8');

const urls = [...new Set(source.match(/https:\/\/[^'"\s]+/g) ?? [])].filter((u) =>
  /\.(jpe?g|png|webp|avif)(\?|$)/i.test(u) || u.includes('images.unsplash.com')
);

if (urls.length === 0) {
  console.log('Nenhuma imagem remota no config — nada a fazer.');
  process.exit(0);
}

console.log(`${urls.length} imagens remotas encontradas.`);
if (dryRun) {
  for (const u of urls) console.log('  -', u);
  process.exit(0);
}

await mkdir(OUT_DIR, { recursive: true });

const used = new Set();
const mapping = [];
const failures = [];

for (const url of urls) {
  const name = nameFor(url, used);
  const file = `${name}.webp`;
  const dest = path.join(OUT_DIR, file);

  if (existsSync(dest)) {
    console.log(`  = ${file} (ja existe)`);
    mapping.push({ url, file });
    continue;
  }

  try {
    const res = await fetch(url, { redirect: 'follow' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());

    const image = sharp(buf);
    const meta = await image.metadata();
    const pipeline =
      meta.width && meta.width > MAX_WIDTH
        ? image.resize({ width: MAX_WIDTH, withoutEnlargement: true })
        : image;

    const out = await pipeline.webp({ quality: QUALITY }).toBuffer();
    await writeFile(dest, out);

    const saved = Math.round((1 - out.length / buf.length) * 100);
    console.log(
      `  + ${file}  ${(buf.length / 1024).toFixed(0)}kB -> ${(out.length / 1024).toFixed(0)}kB (${saved}%)`
    );
    mapping.push({ url, file });
  } catch (err) {
    console.error(`  ! FALHOU ${url}: ${err.message}`);
    failures.push({ url, error: err.message });
  }
}

if (failures.length) {
  console.error(
    `\n${failures.length} download(s) falharam. O config NAO foi reescrito — ` +
      'resolva as falhas e rode de novo para nao deixar referencias quebradas.'
  );
  process.exit(1);
}

let rewritten = source;
for (const { url, file } of mapping) {
  rewritten = rewritten.split(url).join(`${PUBLIC_PREFIX}/${file}`);
}
await writeFile(CONFIG, rewritten);

const credits = [
  '# Créditos das imagens',
  '',
  'Arquivos gerados por `scripts/localize-images.mjs`.',
  '',
  '> **Verifique a licença de cada origem antes de publicar um site de cliente.**',
  '> Uma URL acessível não é uma licença de uso comercial.',
  '',
  '| Arquivo | Origem |',
  '| --- | --- |',
  ...mapping.map(({ url, file }) => `| \`${file}\` | ${url} |`),
  '',
].join('\n');
await writeFile(path.join(OUT_DIR, 'CREDITS.md'), credits);

console.log(
  `\n${mapping.length} imagens locais em public/images. Config reescrito. ` +
    'Revise public/images/CREDITS.md e confirme as licenças.'
);
