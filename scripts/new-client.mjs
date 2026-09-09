/**
 * Prepara o config para um novo cliente.
 *
 * Substitui os dados de identidade do hotel ficticio por marcadores TODO_ e
 * preserva toda a estrutura — quartos, ofertas, FAQ e copy continuam servindo
 * de andaime a ser reescrito, que e mais rapido que partir do zero.
 *
 * Uso:
 *   node scripts/new-client.mjs "Pousada Recanto" --cidade "Petropolis" --uf RJ
 *
 * Depois: preencha os TODO_, rode localize-images.mjs e valide com
 * validate-client.mjs antes de entregar.
 */
import { readFile, writeFile, copyFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CONFIG = path.join(root, 'src/data/hotel.config.ts');
const BACKUP = `${CONFIG}.template.bak`;

const args = process.argv.slice(2);
const name = args.find((a) => !a.startsWith('--'));
const flag = (n) => {
  const i = args.indexOf(`--${n}`);
  return i >= 0 ? args[i + 1] : undefined;
};

if (!name) {
  console.error('Uso: node scripts/new-client.mjs "Nome do Hotel" [--cidade X] [--uf RJ]');
  process.exit(1);
}

const cidade = flag('cidade') ?? 'TODO_CIDADE';
const uf = flag('uf') ?? 'TODO_UF';

// Guarda o config original uma unica vez: e a referencia de como cada campo
// deve ficar preenchido.
if (!existsSync(BACKUP)) await copyFile(CONFIG, BACKUP);

let s = await readFile(CONFIG, 'utf8');

const swaps = [
  // O nome completo vem antes do curto: senao sobra o sufixo do template colado.
  ['Vila Solarium Boutique Hotel & Spa', name],
  ['Vila Solarium Hotelaria e Turismo Ltda', `TODO_RAZAO_SOCIAL (${name})`],
  ['Vila Solarium', name],
  ['vilasolarium', 'TODO_DOMINIO'],
  ['12.345.678/0001-90', 'TODO_CNPJ'],
  ['5522997316583', 'TODO_WHATSAPP'],
  ['+552226239000', 'TODO_TELEFONE'],
  ['+55 (22) 2623-9000', 'TODO_TELEFONE_FORMATADO'],
  ['+55 (22) 99731-6583', 'TODO_WHATSAPP_FORMATADO'],
  ['GTM-VILASOLARIUM', ''],
  ['G-VSOLARIUM26', ''],
  ['123456789012345', ''],
  ['Rua das Falésias, 120 — Praia da Ferradura', 'TODO_ENDERECO'],
  ['28950-000', 'TODO_CEP'],
  ['Armação dos Búzios', cidade],
  ['Búzios', cidade],
  ['Praia da Ferradura', 'TODO_BAIRRO'],
  ["state: 'RJ'", `state: '${uf}'`],
];

for (const [from, to] of swaps) s = s.split(from).join(to);

await writeFile(CONFIG, s);

console.log(`Config preparado para "${name}".

Proximos passos:
  1. Preencha os campos TODO_ em src/data/hotel.config.ts
     (referencia preenchida em ${path.basename(BACKUP)})
  2. Reescreva copy, quartos, ofertas e FAQ com o material do cliente
  3. Troque as imagens e rode: node scripts/localize-images.mjs
  4. Valide antes de entregar: npm run validate:client
`);
