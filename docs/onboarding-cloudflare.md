# Conta Cloudflare do cliente — passo a passo

Este documento tem duas partes: o que **enviar para o cliente** e o que **você faz depois**.
O site é publicado na conta Cloudflare do próprio cliente — ele é o dono da hospedagem,
do domínio e dos dados, e no fim do contrato basta revogar o seu acesso.

Custo para o cliente: **R$ 0**. O plano gratuito da Cloudflare cobre com folga um site de
hospedagem, e a cota não é dividida com outros clientes.

---

## Parte 1 — Para enviar ao cliente

> Copie daqui até a linha divisória e mande por WhatsApp ou e-mail.

**Criar sua conta Cloudflare (leva uns 10 minutos, é gratuito)**

1. Acesse `dash.cloudflare.com/sign-up` e crie a conta com o e-mail da empresa —
   não use e-mail pessoal de um funcionário, para a conta não se perder se ele sair.
2. Confirme o e-mail que a Cloudflare enviar.
3. **Ative a verificação em duas etapas** no menu do seu perfil, em *Authentication*.
   Essa conta vai controlar o endereço do seu site.
4. Guarde a senha no gerenciador de senhas da empresa.

**Gerar o acesso para publicarmos o site**

5. No painel, abra o menu do seu perfil e vá em *API Tokens* → *Create Token*.
6. Escolha *Create Custom Token*.
7. Dê o nome: `Publicação do site — [nome da agência]`.
8. Em *Permissions*, adicione:
   - **Account** · **Cloudflare Pages** · **Edit**
9. Em *Account Resources*, selecione **apenas a sua conta**.
10. Em *TTL*, defina uma validade (sugestão: 1 ano). Você pode revogar quando quiser.
11. Clique em *Continue to summary* → *Create Token*.
12. **Copie o token e nos envie por uma via segura.** Ele aparece **uma única vez**.
13. Envie também o **Account ID**, que fica na barra lateral do painel da conta.

**Importante:** nunca nos envie a *Global API Key*. Ela dá acesso irrestrito à sua conta
inteira e não pode ser limitada. O token acima só permite publicar o site — nada mais.

Se quiser encerrar nosso acesso a qualquer momento, é um clique: *API Tokens* → o token →
*Delete*. O site continua no ar; só deixamos de conseguir atualizá-lo.

---

## Parte 2 — Do seu lado

### Guardar as credenciais

Um par por cliente, no cofre — nunca no repositório, nunca em mensagem que fica no
histórico:

```
CLOUDFLARE_ACCOUNT_ID=<account id do cliente>
CLOUDFLARE_API_TOKEN=<token do cliente>
```

### Publicar

```bash
CLOUDFLARE_ACCOUNT_ID=<id> CLOUDFLARE_API_TOKEN=<token> \
npm run deploy:client -- --project pousada-recanto
```

O script valida o config antes de subir (`validate:client`), mostra conta mascarada e
projeto antes de enviar, e recusa a Global API Key. Use `--dry-run` para conferir sem
publicar.

### O domínio

Duas situações, e a diferença muda o escopo do token:

**a) O cliente registra e mantém o domínio (recomendado)**
Ele registra em qualquer registrador, no nome dele, e aponta para o Pages. O token de
Pages basta — você não precisa de acesso a DNS. É o cenário que o texto da Parte 1 cobre.

**b) Você opera o DNS a pedido dele**
Aí o token precisa também de **Zone · DNS · Edit**, restrito à zona daquele domínio. Peça
só se for realmente administrar o DNS: é acesso a e-mail e a tudo que depende daquele
domínio, e o estrago de um erro é grande.

Em ambos os casos o domínio fica **registrado no nome do cliente** e pago por ele direto ao
registrador — é o que a proposta comercial promete.

### Encerramento de contrato

1. Peça ao cliente para deletar o token (*API Tokens* → *Delete*).
2. Apague o par de credenciais do seu cofre.
3. Entregue os arquivos do site conforme a proposta.

O site continua no ar na conta dele. Nada a migrar, nada a negociar.

---

## Limites do plano gratuito

Por conta de cliente, não somados entre clientes:

| Recurso | Free |
| --- | --- |
| Pages — requisições | 100.000/dia |
| Pages — builds | 500/mês |
| Largura de banda | ilimitada |
| R2 (arquivos) | 10 GB, sem custo de saída |
| KV | 1 GB · 100 mil leituras/dia · 1 mil escritas/dia |
| D1 (SQLite) | 5 GB · 5 mi leituras/dia · 100 mil escritas/dia |

Um site de pousada não chega perto desses números. **Confirme os valores atuais no painel
antes de prometer qualquer coisa em contrato** — a Cloudflare ajusta os limites do plano
gratuito de tempos em tempos.
