# GerenciaProd - Aplicação de Gerenciamento de Produtos

Uma aplicação moderna de gerenciamento de produtos construída com Next.js, TypeScript e Tailwind CSS. A aplicação permite aos usuários gerenciar produtos com recursos como listagem, filtragem, ordenação, paginação e adição de novos produtos.

## Funcionalidades

- **Listagem de Produtos**: Visualize todos os produtos com suas informações essenciais
- **Detalhes do Produto**: Visualize informações detalhadas sobre um produto específico
- **Filtragem de Produtos**: Filtre produtos por nome, faixa de preço e categoria
- **Ordenação de Produtos**: Ordene produtos por nome, preço, categoria ou data de adição
- **Paginação**: Navegue por grandes conjuntos de produtos com paginação
- **Design Responsivo**: Funciona em desktop, tablet e dispositivos móveis
- **Criar Produtos**: Adicione novos produtos ao catálogo

## Tecnologias Utilizadas

- **Next.js 15**: Framework para aplicações React com arquitetura App Router
- **TypeScript**: Segurança de tipos para melhor experiência de desenvolvimento
- **Tailwind CSS**: Framework CSS utilitário para estilização
- **Zustand**: Biblioteca de gerenciamento de estado para gerenciar estado global
- **MSW (Mock Service Worker)**: Biblioteca de simulação de API para desenvolvimento
- **React Hot Toast**: Notificações toast
- **Zod**: Validação de esquema
- **Jest & React Testing Library**: Framework de testes para testes de componentes

## Decisões de Arquitetura

### Gerenciamento de Estado

A aplicação utiliza Zustand para gerenciamento de estado global. O store inclui:

- Dados de produtos
- Estados de carregamento e erro
- Controles de filtro e paginação

Esta abordagem fornece um armazenamento centralizado que os componentes podem acessar sem prop drilling.

### Camada de API

Uma API simulada é implementada usando MSW (Mock Service Worker) para simular chamadas reais de API durante o desenvolvimento. Esta abordagem permite:

- Comportamento realista de busca de dados
- Teste de operações assíncronas
- Desenvolvimento sem um backend real

A API suporta filtragem, ordenação e paginação realizadas no "lado do servidor" (nos manipuladores simulados).

### Estrutura de Componentes

A aplicação segue uma estrutura de componentes modular:

- Componentes de UI (Button, Input, Select) para elementos comuns de interface
- Componentes específicos de funcionalidades (ProductCard, ProductFilter, etc.)
- Componentes de layout (Header) para estrutura de página
- Páginas para montar componentes com seus requisitos de dados

### Fluxo de Dados

1. Interações do usuário acionam mudanças de estado no store Zustand
2. Mudanças de estado acionam solicitações de API através de hooks personalizados
3. Respostas da API atualizam o store
4. Componentes são renderizados novamente com os novos dados

## Primeiros Passos

### Pré-requisitos

- Node.js 20+
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone git@github.com:gabriel-fragoso/gerencia-prod.git
cd gerencia-prod
```

2. Instale as dependências:
```bash
npm install
# ou
yarn
```

3. Execute o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver a aplicação.

## Executando Testes

```bash
npm run test
# ou
yarn test
```

## Estrutura do Projeto

```
src/
├── app/                 # Páginas do Next.js App Router
│   ├── (products)/      # Rotas relacionadas a produtos
│   │   ├── products/    # Listagem principal de produtos
│   │   ├── products/new # Formulário de novo produto
│   │   └── products/[id]# Detalhes do produto
│   └── layout.tsx       # Layout raiz com provedores
├── components/          # Componentes React
│   ├── layout/          # Componentes de layout
│   ├── ui/              # Componentes de UI
│   └── ...              # Componentes de funcionalidades
├── lib/                 # Bibliotecas compartilhadas
│   ├── hooks/           # Hooks React personalizados
│   ├── services/        # Serviços de API
│   ├── store/           # Store Zustand
│   ├── types/           # Tipos TypeScript
│   └── utils/           # Funções utilitárias
└── tests/               # Arquivos de teste
```

## Melhorias Futuras

- Adicionar autenticação e gerenciamento de usuários
- Implementar renderização do lado do servidor para melhor SEO
- Adicionar validação de formulário mais abrangente
- Implementar gerenciamento de categorias de produtos
- Adicionar funcionalidade de upload de imagens
- Adicionar funcionalidade de busca com filtros avançados
- Implementar ações do servidor para envio de formulários
