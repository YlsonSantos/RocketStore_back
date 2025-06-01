# Carrinho de Compras - RocketStore com NestJS

Este projeto implementa uma API REST para gerenciar um carrinho de compras, com funcionalidades para adicionar, remover, atualizar produtos, listar itens e finalizar a compra.

---

## Pré-requisitos

- Node.js (versão 16 ou superior recomendada)  
  [Download Node.js](https://nodejs.org/)

- pnpm (gerenciador de pacotes do Node.js)

- Banco de dados SQLite (já incluído no projeto via dependência Prisma)

---

## Passo a passo para rodar a aplicação

### 1. Clonar o repositório

```bash
git clone https://github.com/YlsonSantos/RocketStore_back.git
cd RocketStore_back
```

### 2. Instalar dependências

`pnpm install`

### 3. Configurar o banco de dados

Certifique-se que o arquivo `prisma/schema.prisma` está configurado corretamente.

Para criar e migrar o banco de dados SQLite, rode:

```bash
npx prisma migrate dev --name init
```

### 4. Gerar o cliente Prisma

`npx prisma generate`

### 5. Rodar a aplicação

`pnpm run start:dev`

### 6. Testar a API

| Método | Rota                             | Descrição                         |
| ------ | -------------------------------- | --------------------------------- |
| GET    | `/produtos`                      | Listar todos os produtos          |
| POST   | `/produtos`                      | Criar um novo produto             |
| GET    | `/produtos/id`                   | Buscar produto por ID             |
| PUT    | `/produtos/id`                   | Atualizar produto por ID          |
| DELETE | `/produtos/id`                   | Deletar produto por ID            |
| GET    | `/carrinho`                      | Listar itens do carrinho          |
| POST   | `/carrinho/adicionar`            | Adicionar item ao carrinho        |
| PUT    | `/carrinho/atualizar/Id`         | Atualizar quantidade no carrinho  |
| DELETE | `/carrinho/remover/Id`           | Remover item do carrinho          |
| POST   | `/carrinho/finalizar`            | Finalizar compra                  |


### Testando a API com Postman

Para testar os endpoints da API, recomendamos usar o [Postman](https://www.postman.com/), uma ferramenta que facilita o envio de requisições HTTP.

Nos exemplos abaixo, mostramos como configurar o corpo das requisições no formato raw JSON entro do Postman.

### 7. Exemplo para criar um produto via Postman (POST /produtos)

No corpo da requisição (raw JSON):

{
"nome": "Camiseta",
"descricao": "Camiseta 100% algodão",
"preco": 59.9,
"estoque": 10
}

### 8. Exemplo para adicionar um item no carrinho (POST /carrinho/adicionar)

No corpo da requisição (raw JSON):

{
"produtoId": 1,
"quantidade": 2
}
