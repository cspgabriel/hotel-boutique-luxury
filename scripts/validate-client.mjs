/**
 * Porta de qualidade antes de entregar um site de cliente.
 *
 * O template nasce preenchido com o hotel ficticio Vila Solarium. O modo de
 * falha caro nao e o site quebrado — e o site bonito que entra no ar com o
 * telefone do demo, o CNPJ ficticio ou as fotos hotlinkadas. Este script falha
 * com codigo 1 se sobrou qualquer marca do template.
 *
 * Uso:
 *   npm run validate:client
 *
 * Nao roda no build da demo: a demo deve mesmo manter os dados ficticios.
 */
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const config = await readFile(path.join(root, 'src/data/hotel.config.ts'), 'utf8');

/** @type {{label: string, test: RegExp, hint: string}[]} */
const checks = [
  {
    label: 'Nome do hotel ficticio',
    test: /Vila Solarium/i,
    hint: 'Troque hotelInfo.name, legalName e todas as mencoes no copy.',
  },
  {
    label: 'CNPJ do template',
    test: /12\.345\.678\/0001-90/,
    hint: 'Informe o CNPJ real do cliente.',
  },
  {
    label: 'Contatos do template',
    test: /5522997316583|552226239000|vilasolarium/i,
    hint: 'Troque WhatsApp, telefone, e-mails, Instagram e siteUrl.',
  },
  {
    label: 'Imagens hotlinkadas',
    test: /https:\/\/images\.unsplash\.com/,
    hint: 'Rode `node scripts/localize-images.mjs` e revise as licencas.',
  },
  {
    label: 'IDs de analytics do template',
    test: /GTM-VILASOLARIUM|G-VSOLARIUM26|123456789012345/,
    hint: 'Use os IDs do cliente ou deixe vazio se ele nao tiver.',
  },
  {
    label: 'Endereco do template',
    test: /Rua das Falésias|28950-000/,
    hint: 'Informe o endereco real e as coordenadas corretas.',
  },
  {
    label: 'Marcador TODO pendente',
    test: /TODO_/,
    hint: 'Preencha os campos deixados pelo scaffold de novo cliente.',
  },
];

const failed = checks.filter((c) => c.test.test(config));

if (failed.length === 0) {
  console.log('OK — nenhum vestigio do template no hotel.config.ts.');
  console.log('Lembrete: confirme as licencas em public/images/CREDITS.md.');
  process.exit(0);
}

console.error(`\n${failed.length} pendencia(s) antes de entregar:\n`);
for (const { label, hint } of failed) {
  console.error(`  x ${label}`);
  console.error(`    ${hint}\n`);
}
process.exit(1);
