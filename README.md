# Calculadora FIFA

Aplicação web para calcular o lucro real de vendas no mercado do FIFA Ultimate Team, descontando automaticamente a taxa de 5% cobrada pela EA.

## Funcionalidades

- **Cálculo de Lucro Total**: Mostra quanto você realmente lucra após descontar o valor de compra e a taxa EA de 5% sobre a venda.
- **Cálculo de Perda**: Indica o valor total investido (compra + taxa) caso a venda não saia como esperado.
- **Taxa EA (5%)**: Exibe o valor exato que a EA retém sobre o valor da venda.
- **Interface amigável**: Design inspirado no tema do FIFA, com campo de futebol e cores verde/dourado.
- **Responsiva**: Funciona perfeitamente em celulares, tablets e desktops.
- **PWA (Progressive Web App)**: Pode ser instalada no celular diretamente pelo navegador, funcionando como um app nativo.

## Como usar

1. Acesse o app pelo link publicado.
2. Digite o **Valor da Compra** (quanto você pagou pelo jogador).
3. Digite o **Valor da Venda** (por quanto pretende vendê-lo).
4. Clique em **Calcular**.
5. Veja o resultado: Lucro Total, Perda e Taxa EA.

## Fórmulas

| Resultado | Fórmula |
|-----------|---------|
| **Lucro Total** | `Valor da Venda - Valor de Compra - 5% do Valor da Venda` |
| **Perda** | `Valor de Compra + 5% do Valor da Venda` |
| **Taxa EA (5%)** | `5% do Valor da Venda` |

## Tecnologias

- [React 19](https://react.dev)
- [TanStack Start](https://tanstack.com/start) — Framework full-stack com SSR
- [TanStack Router](https://tanstack.com/router) — Roteamento tipado
- [Tailwind CSS v4](https://tailwindcss.com) — Estilização utilitária
- [Lucide React](https://lucide.dev) — Ícones
- [Vite](https://vitejs.dev) — Build tool

## Estrutura do projeto

```
.
├── public/
│   ├── icon-192.png        # Ícone PWA (192x192)
│   ├── icon-512.png        # Ícone PWA (512x512)
│   └── manifest.json       # Configuração do PWA
├── src/
│   ├── components/         # Componentes reutilizáveis
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utilitários e helpers
│   ├── routes/
│   │   ├── __root.tsx      # Layout raiz (head, meta tags, providers)
│   │   └── index.tsx       # Página principal (calculadora)
│   ├── routeTree.gen.ts    # Roteamento gerado automaticamente
│   ├── router.tsx          # Configuração do router
│   ├── styles.css          # Tokens de design e tema
│   ├── server.ts           # Configuração do servidor
│   └── start.ts            # Entry point do TanStack Start
├── package.json            # Dependências e scripts
├── tsconfig.json           # Configuração TypeScript
├── vite.config.ts          # Configuração Vite
├── wrangler.jsonc          # Configuração Cloudflare Workers
└── README.md               # Este arquivo
```

## Scripts disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera a build de produção |
| `npm run preview` | Pré-visualiza a build localmente |

## Deploy no GitHub Pages

O projeto está configurado para deploy automático no **GitHub Pages** via GitHub Actions.

### Como publicar:

1. **Conecte ao GitHub** (se ainda não conectou):
   - No editor do Lovable, clique no botão **+** (Plus) no canto inferior esquerdo do chat.
   - Selecione **GitHub** → **Connect project**.
   - Autorize o app do Lovable e crie o repositório.

2. **Ative o GitHub Pages no repositório**:
   - Vá até o repositório criado no GitHub.
   - Acesse **Settings** → **Pages**.
   - Em **Build and deployment**, selecione **GitHub Actions** como a fonte.

3. **Deploy automático**:
   - A cada push na branch `main`, o workflow `.github/workflows/deploy.yml` é executado automaticamente.
   - O app será buildado e publicado no GitHub Pages.
   - Acesse a URL gerada: `https://<seu-usuario>.github.io/<nome-do-repo>/`

### Sobre a configuração:

- O workflow usa **Bun** (mesmo gerenciador do projeto) para instalar dependências e buildar.
- O **base path** é configurado automaticamente com o nome do repositório, então os assets (ícones, manifest, CSS) carregam corretamente mesmo em subdiretórios.
- Um arquivo `404.html` é gerado a partir do `index.html`, garantindo que o app funcione como SPA mesmo ao acessar rotas diretamente.

## Deploy Lovable

O app também continua publicado e acessível via Lovable. Para atualizar o deploy da Lovable, clique no botão **Publish** no editor.

## Conectando ao GitHub

Para sincronizar o código com o GitHub:

1. No editor do Lovable, clique no botão **+** (Plus) no canto inferior esquerdo do chat.
2. Selecione **GitHub** → **Connect project**.
3. Autorize o app do Lovable no GitHub.
4. Escolha a conta/organização e crie o repositório.
5. O código será sincronizado automaticamente em tempo real (bidirecional).

## Instalação no celular (PWA)

### Android (Chrome)
1. Acesse o app pelo navegador Chrome.
2. Toque no menu (⋮) → **Adicionar à tela inicial**.
3. Pronto! O app aparecerá como um ícone nativo.

### iOS (Safari)
1. Acesse o app pelo Safari.
2. Toque no botão **Compartilhar** (quadrado com seta para cima).
3. Role e selecione **Adicionar à Tela de Início**.
4. Pronto! O app será instalado como nativo.

## Autor

Inspirado no app original **Calculadora FIFA** desenvolvido por Arthur Lima de Souza.

Versão web recriada e modernizada com React + TanStack Start.
