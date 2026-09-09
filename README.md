# Vila Solarium Boutique Hotel & Spa 🏨✨
### Plataforma Digital Premium de Hotelaria Orientada à Conversão Direta

> Desenvolvido com **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS** e **Lucide React**.  
> Projetado especificamente para **aumentar reservas diretas**, eliminar o custo de comissões de OTAs (Booking, Expedia, Decolar), encantar com direção de arte editorial de luxo e guiar o hóspede na jornada:  
> **Desejo → Descoberta → Confiança → Comparação → Disponibilidade → Reserva.**

- 🌐 **URL de Produção Cloudflare:** [https://hotel-boutique-luxury.pages.dev](https://hotel-boutique-luxury.pages.dev)
- 🐙 **Repositório Oficial GitHub:** [https://github.com/cspgabriel/hotel-boutique-luxury](https://github.com/cspgabriel/hotel-boutique-luxury)

---

## 🌟 Principais Recursos & Pilares Implementados

### 1. Conversão Direta (CRO) & Motor de Reservas
- **Booking Bar Inteligente:** Check-in, check-out, seletor de hóspedes e quartos, cálculo dinâmico de noites e campo para código promocional.
- **Comparativo Direto vs. OTAs:** Mostra com clareza a economia de 10% a 15% ao reservar direto, além de espumante de cortesia na suíte, café artesanal e prioridade de check-in/out.
- **Preparado para Integração Multimotor:** Suporte nativo e configurável para Omnibees, Cloudbeds, SynXis, Bookassist, Desbravador, motor proprietário ou atendimento direto VIP via WhatsApp.
- **Mobile First Thumb-Zone:** Barra persistente inferior nos celulares (`MobileStickyBar`) com botão "Reservar agora" e atalho para WhatsApp, respeitando safe-area do iOS/Android sem bloquear conteúdo.

### 2. CMS Centralizado em Arquivo Único (`src/data/hotel.config.ts`)
- Operadores e gestores do hotel podem alterar 100% dos dados comerciais, textos, fotos, suítes, gastronomia, pacotes, depoimentos, FAQs e canais de contato sem necessidade de conhecimento técnico em programação.

### 3. SEO Técnico & Local de Alta Performance
- **Schema.org Estruturado em JSON-LD:**
  - `Hotel` / `LodgingBusiness` com endereço, coordenadas GPS, avaliações agregadas e comodidades;
  - `HotelRoom` em cada página interna de acomodação (`/acomodacoes/[slug]`);
  - `Restaurant` para a gastronomia autoral (`/gastronomia`);
  - `FAQPage` para as dúvidas frequentes (`/faq`);
  - `BreadcrumbList` em todas as rotas internas.
- **Otimização Local:** Títulos, meta tags e copy desenhados para captar buscas de alto valor como *"hotel boutique em Búzios"*, *"hotel na Praia da Ferradura"*, *"hotel com spa e vista para o mar"*.
- **Arquivos Nativos:** `sitemap.xml` dinâmico e `robots.txt` devidamente configurados.

### 4. Privacidade (LGPD) & Acessibilidade (WCAG)
- **Banner de Cookies Conforme LGPD:** Permite aceitar tudo, recusar opcionais ou configurar granularmente preferências (Essenciais, Analíticos, Marketing), com página dedicada em `/cookies`.
- **Acessibilidade:** Alto contraste verificado, suporte a navegação por teclado (Tab, Escape, setas no Lightbox), tags semânticas e respeito rigoroso à diretiva `prefers-reduced-motion`.

---

## 📁 Arquitetura Completa de Rotas

```
/                                 # Home Page (Hero cinematográfico, Booking Bar, Prova Social, Benefícios)
├── /hotel                        # Apresentação editorial, história, sustentabilidade, pilares
├── /acomodacoes                  # Catálogo completo de suítes e vilas com especificações
│   └── /acomodacoes/[slug]       # Página dedicada da acomodação (galeria, comodidades, schema e booking box)
├── /experiencias                 # Spa, piscina de borda infinita, passeios de veleiro e yoga
├── /gastronomia                  # Restaurante Maresia (Chef Heloísa Prado), Bar & Adega, menus
├── /galeria                      # Mosaico fotográfico com filtros por categoria e Lightbox fullscreen
├── /ofertas                      # Campanhas sazonais e pacotes exclusivos
│   └── /ofertas/[slug]           # Detalhe do pacote, inclusões, termos e CTA direto
├── /destino                      # Guia de Búzios, Praia da Ferradura, microclima e tempos
├── /localizacao                  # Mapa interativo, rotas de carro, aeroportos e agendamento de transfer
├── /eventos                      # Casamentos à beira-mar, convenções corporativas e formulário RFP
├── /faq                          # Perguntas frequentes com accordion acessível e FAQPage schema
├── /contato                      # Canais diretos, formulário com validação e concierge 24h
├── /reservas                     # Motor de disponibilidade, cálculo de diárias e comparativo vs OTAs
├── /politica-de-privacidade      # Termos de privacidade sob a LGPD (Lei 13.709/2018)
├── /termos                       # Regras de hospedagem, cancelamento e convivência
├── /cookies                      # Gerenciador interativo de cookies e consentimento
└── /404                          # Página de erro customizada orientada à recuperação da navegação
```

---

## 🚀 Como Executar o Projeto Localmente

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Iniciar servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   Acesse: [http://localhost:3000](http://localhost:3000)

3. **Gerar build de produção para validação:**
   ```bash
   npm run build
   ```

4. **Iniciar em modo produção:**
   ```bash
   npm run start
   ```

---

## ⚙️ Como Personalizar os Dados do Hotel

Abra o arquivo:  
👉 `src/data/hotel.config.ts`

Você poderá editar:
- **`hotelInfo`:** Nome, endereço, WhatsApp, telefone, CNPJ, coordenadas GPS, horários de check-in/out.
- **`bookingEngine`:** Tipo de motor (`omnibees`, `cloudbeds`, `synxis`, `bookassist`, `custom`, `direct`), URL base e código da propriedade.
- **`rooms`:** Inserir novas categorias, alterar metragens, fotos, comodidades e valores "a partir de".
- **`offers`:** Criar novos pacotes sazonais com cupons promocionais.
- **`dining` & `experiences`:** Atualizar pratos do chef, horários de funcionamento e experiências.
