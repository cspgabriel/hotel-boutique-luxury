/**
 * Publica o site na conta Cloudflare do proprio cliente.
 *
 * Cada cliente tem conta propria: a cota gratuita nao e compartilhada, a conta
 * fica no nome dele e, no fim do contrato, basta devolver o acesso. O preco
 * disso e operacional — sao N credenciais, e usar a errada publica o site de um
 * cliente na conta de outro. Por isso este script exige conta e token
 * explicitos e mostra onde vai publicar antes de subir qualquer arquivo.
 *
 * Uso:
 *   CLOUDFLARE_ACCOUNT_ID=<id> CLOUDFLARE_API_TOKEN=<token> \
 *   node scripts/deploy-client.mjs --project pousada-recanto
 *
 *   --project <nome>   projeto Pages na conta do cliente (obrigatorio)
 *   --branch <nome>    branch de producao (padrao: main)
 *   --skip-validate    pula a porta de qualidade (nao use em entrega real)
 *   --dry-run          mostra o que faria e para
 *
 * NUNCA use a Global API Key do cliente: ela da acesso total e irrevogavel por
 * escopo a conta inteira dele. Peca um API Token com "Cloudflare Pages: Edit".
 */
import { existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const flag = (n) => {
  const i = args.indexOf(`--${n}`);
  return i >= 0 ? args[i + 1] : undefined;
};
const has = (n) => args.includes(`--${n}`);

const project = flag('project');
const branch = flag('branch') ?? 'main';
const dryRun = has('dry-run');

const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
const apiToken = process.env.CLOUDFLARE_API_TOKEN;

const faltando = [];
if (!project) faltando.push('--project <nome-do-projeto-pages>');
if (!accountId) faltando.push('CLOUDFLARE_ACCOUNT_ID (conta do cliente)');
if (!apiToken) faltando.push('CLOUDFLARE_API_TOKEN (token com Pages: Edit)');

if (faltando.length) {
  console.error('\nFalta informar:\n');
  for (const f of faltando) console.error('  x ' + f);
  console.error(`
Exemplo:
  CLOUDFLARE_ACCOUNT_ID=abc123 CLOUDFLARE_API_TOKEN=*** \\
  node scripts/deploy-client.mjs --project pousada-recanto

Veja docs/onboarding-cloudflare.md para como o cliente gera o token.
`);
  process.exit(1);
}

// Uma Global API Key tem 37 caracteres hexadecimais; um API Token nao se
// parece com isso. O aviso vale o falso positivo ocasional.
if (/^[0-9a-f]{37}$/.test(apiToken)) {
  console.error(
    '\nIsso parece uma Global API Key, nao um API Token.\n' +
      'Ela da acesso total a conta do cliente e nao pode ser limitada por escopo.\n' +
      'Peca um API Token com "Cloudflare Pages: Edit". Abortando.\n'
  );
  process.exit(1);
}

// No Windows npx e .cmd e o Node recusa spawn sem shell. Os argumentos aqui
// vem de flags controladas, nao de entrada arbitraria.
const run = (cmd, cmdArgs, env) =>
  execFileSync(cmd, cmdArgs, {
    cwd: root,
    stdio: 'inherit',
    shell: process.platform === 'win32',
    env: env ?? process.env,
  });

if (!has('skip-validate')) {
  console.log('Validando o config antes de publicar...\n');
  try {
    run('node', ['scripts/validate-client.mjs']);
  } catch {
    console.error(
      '\nA porta de qualidade barrou a publicacao. Resolva as pendencias acima.\n' +
        '(Se for proposital, rode de novo com --skip-validate.)\n'
    );
    process.exit(1);
  }
  console.log('');
}

if (!existsSync(path.join(root, 'out'))) {
  console.log('Build ainda nao existe. Rodando next build...\n');
  if (!dryRun) run('npx', ['next', 'build']);
}

const masked = accountId.slice(0, 6) + '...' + accountId.slice(-4);
console.log(`
Publicando
  projeto : ${project}
  branch  : ${branch}
  conta   : ${masked}
  origem  : out/
`);

if (dryRun) {
  console.log('--dry-run: nada foi enviado.');
  process.exit(0);
}

run(
  'npx',
  ['wrangler', 'pages', 'deploy', 'out', '--project-name', project, '--branch', branch],
  { ...process.env, CLOUDFLARE_ACCOUNT_ID: accountId, CLOUDFLARE_API_TOKEN: apiToken }
);

console.log(`
Publicado. Confira o dominio customizado no painel Pages do cliente.
Lembretes:
  - o dominio fica registrado no nome do cliente
  - guarde o token no cofre, nunca no repo
`);
