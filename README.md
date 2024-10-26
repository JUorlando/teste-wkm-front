# Projeto Frontend com Next.js Working Minds Teste

Este é um projeto de frontend desenvolvido em React JS e Next.js, que permite o cadastro e a exibição de informações de pessoas, utilizando uma API Strapi rodando localmente.

## Pré-requisitos

Antes de iniciar, certifique-se de ter as seguintes ferramentas instaladas:

- Node.js (versão 16 ou superior)
- Yarn ou npm

Além disso, a API Strapi que serve como backend para este projeto precisa estar rodando localmente. Para configurar e iniciar a API, siga as instruções disponíveis no repositório:

[Repositório da API](https://github.com/JUorlando/teste-wkm)

A API deve estar acessível em: `http://localhost:1337/api`

## Como executar o projeto

### 1. Clonar o repositório

```bash
git clone (https://github.com/JUorlando/teste-wkm-front.git)
cd teste-wkmfront
```

### 2. Instalar as dependências

Utilize o comando abaixo para instalar as dependências necessárias do projeto:

#### Com Yarn:

```bash
yarn install
```

#### Com npm:

```bash
npm install
```

### 3.Rodar o build

Após instalar as dependências, você pode preparar o ambiente rodando o comando build:

#### Com Yarn:

```bash
yarn build
```

#### Com npm:

```bash
npm run build
```

### 4. Iniciar a aplicação

Após instalar as dependências, você pode iniciar a aplicação utilizando:

#### Com Yarn:

```bash
yarn start
```

#### Com npm:

```bash
npm run dev
```

O aplicativo estará disponível em: `http://localhost:3000`

## Configuração da API Backend

Para o funcionamento correto deste frontend, certifique-se de que a API Strapi esteja configurada e rodando localmente. As instruções para instalação e execução da API estão disponíveis no repositório [aqui](https://github.com/JUorlando/teste-wkm).

A API deve estar rodando no endereço `http://localhost:1337/api`.

### Rotas da API utilizadas

As seguintes rotas da API são consumidas pelo projeto:

- `GET /estados` - Retorna a lista de estados.
- `GET /estados/{documentId}` - Retorna um estado específico pelo `documentId`, incluindo suas cidades relacionadas.
- `GET /pessoas/{documentId}` - Retorna uma pessoa específica pelo `documentId`.
- `POST /pessoas` - Cria uma nova pessoa no banco de dados.

## Estrutura de Pastas

A estrutura de pastas do projeto é organizada da seguinte forma:

- `src/app/pages` - Páginas da aplicação.
- `src/app/styles` - Estilos globais.
- `src/app/services` - Serviços para integração com a API.
- `src/components` - Componentes reutilizáveis.
- `src/schemas` - Schemas de validação com Zod.

## Tecnologias Utilizadas

- **React JS**
- **Next.js**
- **Axios** - Para requisições HTTP.
- **Tailwind** - Para estilização.
- **Zod** - Para validação de dados.
- **TypeScript** - Para tipagem estática.

## Funcionalidades

- Cadastro de pessoas através de um formulário.
- Exibição de informações detalhadas de uma pessoa cadastrada.
- Validação de formulários e campos obrigatórios.
- Redirecionamento automático após cadastro.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.
