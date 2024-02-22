This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Nhac! Aplicação de Gastronomia

Acesse o projeto utilizando o link abaixo:

- https://nhac.conti-server.com.br/

Este projeto é uma aplicação de gastronomia, onde é possível encontrar restaurantes, bares entre outros, o usuário pode se cadastrar e salvar seus restaurantes favoritos, além de poder visualizar os pratos e bebidas disponíveis.

A plataforma foi construida utilizando o framework NextJS, com o intuito de criar uma aplicação única, simplificando o desenvolvimento de seu front-end e back-end, além de utilizar o banco de dados PostgreSQL com o ORM Prisma.

Seu backend foi construido utilizando uma estrutura modular, onde cada módulo representa uma entidade, além de utilizar o padrão de autenticação JWT.

Seu frontend foi construido tomando como principio a responsividade, foi utilizado Material-UI para a construção de seus componentes associado ao Atomic Design pattern e em seu gerenciamento de estados foi utilizado o Context associado ao Zustand.

## Guias e Documentação

- [Documentação Postman](https://documenter.getpostman.com/view/15579034/2sA2rCSLoa) - Documentação da API

- [Figma](https://www.figma.com/file/qT4FRKLzVLZLbl639eqLYI/Nhac?type=design&mode=design&t=jjGFZT6yOm1Bt3L1-1) - Protótipo da aplicação

- [Board](https://trello.com/invite/b/xiBSMhF1/ATTI869d3f09972ef9b92bd7312e9c0480af635A323F/nhac) - Trello para a organização das tarefas

### Como executar o projeto localmente

Para rodar o projeto será nescessário ter o NodeJS instalado na versão 18.0.0 ou superior, utilize o gerenciador de pacote de sua preferência.

```bash
# Crie o arquivo .env seguindo o exemplo abaixo
echo "
  DATABASE_URL=
  ALGORITHM=
  VECTOR_INITIALIZER=
  SECRET_KEY_ENCRYPT=
  JWT_SECRET=
" >> .env

# instale as dependências
yarn install

# execute o projeto
yarn dev
```

Abra [http://localhost:3000](http://localhost:3000) para acessar a aplicação.

### Como rodar uma build do projeto

```bash
  # execute o comando
  yarn build

  #então rode o docker-compose.yaml para construir e rodar a imagem
  docker-compose up

```
