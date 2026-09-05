# SérieJournal — Fase 1

Projeto desenvolvido para a disciplina **Desenvolvimento de Sistemas Frontend**.

O SérieJournal é um diário pessoal de séries assistidas: permite cadastrar,
listar, buscar, editar e excluir séries. Nesta fase 1, os dados são mantidos
em memória (estado do React), sem persistência em banco de dados — ou seja,
a lista volta ao estado inicial a cada atualização da página.

## Como executar o projeto

Pré-requisitos: [Node.js](https://nodejs.org/) (versão 18 ou superior) instalado.

```bash
# 1. Instale as dependências
npm install

# 2. Rode o projeto em modo de desenvolvimento
npm run dev

# 3. Abra o endereço exibido no terminal (geralmente http://localhost:5173)
```

Outros comandos disponíveis:

```bash
npm run build    # gera a versão de produção na pasta dist/
npm run preview  # serve a versão de produção localmente
npm run lint      # roda o oxlint para checar o código
```

Este projeto não possui testes automatizados nesta fase.

## Tecnologias utilizadas

| Tecnologia | Função no projeto |
|---|---|
| [React 19](https://react.dev/) | Biblioteca principal para construção da interface baseada em componentes |
| [Vite](https://vitejs.dev/) | Ferramenta de build e servidor de desenvolvimento |
| [React Router DOM v7](https://reactrouter.com/) | Gerenciamento de rotas/navegação entre páginas (SPA) |
| JavaScript (JSX) | Linguagem utilizada nos componentes |
| CSS puro (com variáveis CSS) | Estilização de todos os componentes, sem framework externo |
| [oxlint](https://oxc.rs/docs/guide/usage/linter) | Linter usado para checar a qualidade do código (`npm run lint`) |

Não foi utilizada nenhuma biblioteca externa de estilização (como Bootstrap ou
Material UI) nem de gerenciamento de estado (como Redux) — o estado é
controlado inteiramente com os hooks nativos do React (`useState`), conforme
o conteúdo estudado em aula.

## Estrutura do projeto

A estrutura segue o padrão de organização por tipo de arquivo, separando
**componentes reutilizáveis** de **páginas** (que compõem esses componentes
em telas completas):

```
serie-journal/
├── docs/
│   └── screenshots/     -> imagens usadas neste README
├── public/               -> arquivos estáticos servidos "como estão"
├── src/
│   ├── components/
│   │   ├── NavBar/       -> barra de navegação (NavBar.jsx + NavBar.css)
│   │   ├── SerieForm/    -> formulário de cadastro/edição
│   │   ├── SerieList/    -> listagem com busca
│   │   └── SerieCard/    -> card individual de uma série (usado pelo SerieList)
│   ├── pages/
│   │   ├── Home/         -> página inicial ("/")
│   │   ├── About/        -> página "Sobre" ("/sobre")
│   │   ├── Register/     -> página de cadastro/edição ("/cadastrar" e "/editar/:id")
│   │   └── ListPage/     -> página de listagem ("/series")
│   ├── App.jsx           -> componente raiz: guarda o estado das séries e define as rotas
│   ├── App.css           -> estilos compartilhados entre páginas
│   ├── main.jsx          -> ponto de entrada da aplicação, configura o roteador
│   └── index.css         -> estilos globais e variáveis de design (cores, fontes)
├── index.html            -> HTML raiz carregado pelo Vite
├── package.json          -> dependências e scripts do projeto
└── README.md
```

Cada componente e cada página possuem seu próprio arquivo `.css`, mantendo o
estilo isolado e ligado diretamente ao elemento que ele representa.

## O que cada componente faz

- **NavBar**: barra de navegação fixa no topo, com links para todas as
  páginas da aplicação (Início, Sobre, Cadastrar série, Minhas séries) e
  destaque visual do link ativo.

- **SerieForm**: formulário controlado com os campos obrigatórios (Título,
  Número de temporadas, Data de lançamento, Diretor, Produtora, Categoria e
  Data em que assistiu). Faz validação dos campos ao perder o foco e ao
  enviar, exibindo mensagens de erro específicas e um feedback visual de
  sucesso/erro após o envio. É reutilizado tanto na tela de cadastro quanto
  na de edição — quando recebe `initialData`, pré-preenche os campos.

- **SerieList**: recebe a lista de séries via props e é responsável pela
  busca (filtra por título, diretor, produtora ou categoria em tempo real) e
  pela renderização de cada item através do `SerieCard`. Também trata o
  estado vazio (nenhuma série cadastrada ou nenhum resultado de busca).

- **SerieCard**: exibe as informações de uma série individual (temporadas,
  diretor, produtora, categoria e datas) e os botões de ação **Editar**
  (navega para a tela de edição pré-preenchida) e **Excluir** (com
  confirmação antes de remover).

## Páginas

- **Início (`/`)**: página de boas-vindas com atalhos para cadastro e lista.
- **Sobre (`/sobre`)**: explica o propósito do projeto e como ele foi construído.
- **Cadastrar série (`/cadastrar`)**: formulário de inclusão de novas séries.
- **Minhas séries (`/series`)**: listagem, busca, edição e exclusão de séries.
- **Editar série (`/editar/:id`)**: reaproveita a tela de cadastro para editar um item existente.

## Capturas de tela

### Página inicial
![Página inicial do SérieJournal](./docs/screenshots/home.png)

### Página Sobre
![Página Sobre](./docs/screenshots/about.png)

### Cadastro de séries
![Formulário de cadastro de séries](./docs/screenshots/cadastro.png)

### Validação do formulário
Ao tentar enviar o formulário com campos obrigatórios não preenchidos, os
campos inválidos são destacados e uma mensagem orienta o usuário:

![Feedback de erro de validação no formulário](./docs/screenshots/erro-validacao.png)

### Edição de série
O mesmo componente `SerieForm` é reutilizado na edição, pré-preenchido com os
dados da série selecionada:

![Formulário de edição de uma série já cadastrada](./docs/screenshots/editar.png)

### Lista de séries
![Lista de séries cadastradas](./docs/screenshots/lista.png)

## Decisões de desenvolvimento

- Optei pelo **Vite** por ser mais rápido que o Create React App e ser a
  ferramenta atualmente recomendada pela comunidade React.
- Usei **React Router** para a navegação entre páginas, mantendo o estado das
  séries centralizado no componente `App` e repassado via props para as
  páginas e componentes — reforçando o conceito de fluxo de dados
  unidirecional visto em aula.
- A operação de exclusão e atualização de listas segue o princípio de
  imutabilidade (uso de `map`/`filter` para gerar novos arrays, sem mutar o
  estado diretamente).
- A identidade visual (tons de azul-tinta com dourado e teal, tipografia
  serifada para títulos e monoespaçada para dados) foi pensada para reforçar
  a ideia de um "diário"/"caderno de registros" de séries, com um motivo
  sutil de película de filme na barra de navegação.
