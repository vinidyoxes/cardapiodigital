# MenuFlow MVP

MVP funcional de um serviço de cardápio digital para restaurantes, bares, cafeterias e negócios de alimentação.

## Executar localmente

```bash
npm install
npm run dev
```

## Acesso de demonstração

- E-mail: `demo@menuflow.com.br`
- Senha: `12345678`

## Funcionalidades

- Landing page comercial responsiva
- Cadastro e login demonstráveis
- Painel administrativo com visão geral
- Cadastro, edição, ocultação e exclusão de produtos
- Edição dos dados do estabelecimento
- Cardápio público com busca e categorias
- Link com identificador fixo por estabelecimento
- QR Code estático com download em PNG
- Persistência local no navegador para demonstração

## Limite desta versão

Esta primeira versão usa `localStorage` para validar produto, interface e processo comercial. Antes de receber clientes reais, conecte autenticação, banco de dados, armazenamento de imagens e cobrança recorrente em um backend de produção.
