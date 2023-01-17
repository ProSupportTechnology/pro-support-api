# API Pro Support

<p align="center">
   <img src="https://avatars.githubusercontent.com/u/116978611?s=400&u=c5a5a4e8fb6f34d1d505e8ff934539a8437453de&v=4" alt="ProSupport" width="250" height="250"/>
</p>

## Tabela de Conteúdos

- [Visão Geral](#1-visão-geral)
- [Diagrama ER](#2-diagrama-er)
- [Início Rápido](#3-início-rápido)
    - [Instalando Dependências](#31-instalando-dependências)
    - [Variáveis de Ambiente](#32-variáveis-de-ambiente)
    - [Migrations](#33-migrations)
    - [Scripts](#34-scripts)
- [Endpoints](#4-endpoints)
- [Desenvolvedores](#5-desenvolvedores)

---

## 1. Visão Geral

Visão geral do projeto, um pouco das tecnologias usadas.

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)
- [Yup](https://www.npmjs.com/package/yup)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [Pg](https://www.npmjs.com/package/pg)
- [Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [Express-async-errors](https://www.npmjs.com/package/express-async-errors)
- [Pg](https://www.npmjs.com/package/pg)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Cross-env](https://www.npmjs.com/package/cross-env)

A URL base da aplicação: https://prosupport.onrender.com

---

## 2. Diagrama ER
[ Voltar para o topo ](#tabela-de-conteúdos)

Diagrama ER da API definindo bem as relações entre as tabelas do banco de dados.

<p align="center">
   <img src="https://i.imgur.com/PgOiDfF.png" alt="Diagrama ER"  width="500" height="500"/>
</p>

---

## 3. Início Rápido
[ Voltar para o topo ](#tabela-de-conteúdos)


### 3.1. Instalando Dependências

Clone o projeto em sua máquina e instale as dependências com o comando:

```shell
yarn
```

### 3.2. Variáveis de Ambiente

Em seguida, crie um arquivo **.env**, copiando o formato do arquivo **.env.example**

Configure suas variáveis de ambiente com suas credenciais do Postgres e uma nova database.

### 3.3. Migrations

Execute as migrations com o comando:

```
yarn typeorm migration:run -d src/data-source.ts
```

### 3.4. Scripts

Executar aplicação em ambiente de desenvolvimento:

```
yarn dev
```

Executar aplicação em ambiente de testes:

```
yarn test
```

---

## 4. Endpoints

[ Voltar para o topo ](#tabela-de-conteúdos)

### Índice

- [Users](#1-Users)
- [Login](#2-Login)
- [Answers](#3-Answers)
- [Questions](#4-Questions)

---

## 1. **Users**
[ Voltar para o topo ](#tabela-de-conteúdos)

### Endpoints

| Método   | Rota       | Descrição                               |
|----------|------------|-----------------------------------------|
| POST     | /users     | Criação de um usuário.                  |
| GET      | /users     | Lista todos os usuários                 |
| GET      | /users/:user_id     | Lista um usuário usando seu ID como parâmetro |
| PATCH    | /users/:user_id     | Editar as informações do usuário usando seu ID como parâmetro   |
| DELETE    | /users/:user_id     | Deletar usuário usando seu ID como parâmetro   

---

### 1.1. **Criação de Usuário**

### `POST/users`

### Exemplo de Request:
```
POST /users
Host: https://prosupport.onrender.com
Authorization: None
Content-type: application/json
```

### Exemplo de Corpo da Requisição:
```json
{
	"name": "user",
	"email": "user@mail.com",
	"password": "User@1234",
}
```
Campos opcionais: bio e image.

### Exemplo de Response:
```
201 Created
```

```json
{
	"updatedAt": "2023-01-12T12:21:48.406Z",
	"createdAt": "2023-01-12T12:21:48.406Z",
	"image": null,
	"bio": null,
	"isAdm": false,
	"email": "user@mail.com",
	"name": "user",
	"id": "27b147c3-c125-4b51-ae9c-b67f753d0076"
}
```
O campo password não deve ser retornado, os campos isAdm (possui o valor false como default), updatedAt, createdAt e id (do tipo uuid e gerado automáticamente no banco de dados) não são passados na requisição mas devem ser retornados na reposta.

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 409 Conflict   | User already exists. |

---

### 1.2. **Listando Usuários**

### `GET/users` (Rota protegida - apenas ADMIN pode acessar)

### Exemplo de Request:
```
GET/users
Host: https://prosupport.onrender.com
Authorization: Bearer token
Content-type: None
```

### Corpo da Requisição:
```json
Vazio
```

### Exemplo de Response:
```
200 OK
```
```json
[
	{
		"updatedAt": "2023-01-12T12:21:48.406Z",
		"createdAt": "2023-01-12T12:21:48.406Z",
		"image": null,
		"bio": "Dev Front-end",
		"isAdm": false,
		"email": "user@gmail.com",
		"name": "Usuário",
		"id": "27b147c3-c125-4b51-ae9c-b67f753d0076"
	},
	{
		"updatedAt": "2023-01-10T18:17:47.609Z",
		"createdAt": "2023-01-10T18:17:47.609Z",
		"image": null,
		"bio": "Desenvolvedor especializado nas tecnologias mais utilizadas, com o intuito de responder perguntas para programadores profissionais",
		"isAdm": true,
		"email": "admin@mail.com",
		"name": "admin",
		"id": "8ce51b81-5985-433c-9087-871476e76425"
	}
]
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 401 Unauthorized   | Invalid token. |
| 403 Forbiden   | Missing admin authorization. |

---

### 1.3. **Listar Usuário por ID**

### `GET/users/:user_id`

### Exemplo de Request:
```
GET/users/9cda28c9-e540-4b2c-bf0c-c90006d37893
Host: https://prosupport.onrender.com
Authorization: Bearer token
Content-type: None
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
| user_id     | string      | Identificador único do usuário (User) |

### Corpo da Requisição:
```json
Vazio
```

### Exemplo de Response:
```
200 OK
```
```json
{
	"updatedAt": "2023-01-12T12:21:48.406Z",
	"createdAt": "2023-01-12T12:21:48.406Z",
	"image": null,
	"bio": "Dev Front-end",
	"isAdm": false,
	"email": "user@gmail.com",
	"name": "Usuário",
	"id": "27b147c3-c125-4b51-ae9c-b67f753d0076"
}
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 401 Unauthorized   | Invalid token. |
| 404 Not Found   | User not found. |
| 406 Not Acceptable   | Invalid input syntax for type uuid. |

---

### 1.4. **Editar Usuário por ID**

### `PATCH/users/:user_id`

### Exemplo de Request:
```
PATCH/users/9cda28c9-e540-4b2c-bf0c-c90006d37893
Host: https://prosupport.onrender.com
Authorization: Bearer token
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
| user_id     | string      | Identificador único do usuário (User) |

### Corpo da Requisição:
```json
{
	"email": "usuario@email.com",
	"password": "Teste123",
	"name": "Usuário Teste",
	"bio": "Biografia do usuário",
	"image": "https://i.pinimg.com/564x/27/e5/93/27e59307291762cf9ea054811b4ab5f7.jpg"
}
```
Apenas os campos acima podem ser editados e todos eles são opcionais.

### Exemplo de Response:
```
200 OK
```
```json
{
	"updatedAt": "2023-01-12T12:21:48.406Z",
	"createdAt": "2023-01-12T12:21:48.406Z",
	"image": "https://i.pinimg.com/564x/27/e5/93/27e59307291762cf9ea054811b4ab5f7.jpg",
	"bio": "Biografia do usuário",
	"isAdm": false,
	"email": "usuario@email.com",
	"name": "Usuário teste",
	"id": "27b147c3-c125-4b51-ae9c-b67f753d0076"
}
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 401 Unauthorized   | Invalid token. |
| 404 Not Found   | User not found. |
| 406 Not Acceptable   | Invalid input syntax for type uuid. |

---

### 1.5. **Deletar Usuário por ID**

### `DELETE/users/:user_id` 

### Exemplo de Request:
```
DELETE/users/9cda28c9-e540-4b2c-bf0c-c90006d37893
Host: https://prosupport.onrender.com
Authorization: Bearer token
Content-type: None
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
| user_id     | string      | Identificador único do usuário (User) |

### Corpo da Requisição:
```json
Vazio
```

### Exemplo de Response:
```
204 No content
```
```json
Vazio
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 401 Unauthorized   | Invalid token. |
| 404 Not Found   | User not found. |
| 406 Not Acceptable   | Invalid input syntax for type uuid. |

---

## 2. **Login**
[ Voltar para o topo ](#tabela-de-conteúdos)

### Endpoints

| Método   | Rota       | Descrição                               |
|----------|------------|-----------------------------------------|
| POST     | /login     | Autentica o usuário para ter acesso ao sistema.       |

### `POST/login`

### Exemplo de Request:
```
POST/login
Host: https://prosupport.onrender.com
Authorization: None
Content-type: application/json
```

### Exemplo de Corpo da Requisição:
```json
{
	"email": "user@mail.com",
	"password": "User@1234",
}
```

### Exemplo de Response:
```
200 Ok
```

```json
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbSI6dHJ1ZSwiaWF0IjoxNjczNzg4MzQ5LCJleHAiOjE2NzM4NzQ3NDksInN1YiI6IjhjZTUxYjgxLTU5ODUtNDMzYy05MDg3LTg3MTQ3NmU3NjQyNSJ9.uxrYGh7bRtbNx_Kqk-ec7L3P1J5lBjGsXafQnaN1qzg"
}
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 403 Forbidden   | User or password invalid. |

---

## 3. **Answers**
[ Voltar para o topo ](#tabela-de-conteúdos)

### Endpoints

| Método   | Rota       | Descrição                               |
|----------|------------|-----------------------------------------|
| POST     | /answers     | Criação de uma resposta.                  |
| GET      | /answers     | Lista todos as respostas.                 |
| PATCH    | /answers/:answer_id     | Editar as informações de uma resposta usando seu ID como parâmetro.   |
| DELETE    | /answers/:answer_id     | Deleta resposta usando seu ID como parâmetro.   

---

### 3.1. **Criação de Resposta** (Rota protegida - apenas ADMIN pode acessar)

### Exemplo de Request:
```
POST/answers
Host: https://prosupport.onrender.com
Authorization: Bearer token
Content-type: application/json
```

### Exemplo de Corpo da Requisição:
```json
{
	"description": "Para tipar o useState de um objeto você deve criar uma interface inserindo todas as chaves do objeto.",
	"questionId":"4251a508-c54d-4163-b373-aad5921ab49a",
	"userId": "8ce51b81-5985-433c-9087-871476e76425"
}
```

### Exemplo de Response:
```
201 Created
```

```json
{
	"question": {
		"id": "4251a508-c54d-4163-b373-aad5921ab49a",
		"title": "duvida",
		"description": "muita duvida",
		"tech": "node",
		"createdAt": "2023-01-10T21:13:01.145Z",
		"updatedAt": "2023-01-10T21:13:01.145Z",
		"user": {}
	},
	"user": {
		"updatedAt": "2023-01-10T18:17:47.609Z",
		"createdAt": "2023-01-10T18:17:47.609Z",
		"image": "https://www.undb.edu.br/hubfs/administra%C3%A7%C3%A3o%20undb-1.jpg",
		"bio": "Desenvolvedor especializado nas tecnologias mais utilizadas, com o intuito de responder perguntas para programadores profissionais",
		"isAdm": true,
		"email": "admin@prosupport.com",
		"name": "Pro Support",
		"id": "8ce51b81-5985-433c-9087-871476e76425"
	},
	"updatedAt": "2023-01-12T21:47:58.426Z",
	"createdAt": "2023-01-12T21:47:58.426Z",
	"description": "Para tipar o useState de um objeto você deve criar uma interface inserindo todas as chaves do objeto.",
	"id": "29286c17-a091-4864-84f1-d42c68ccaf04"
}
```


### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 400 Bad request   | Invalid body. |
| 401 Unauthorized   | Invalid token. |
| 403 Forbiden   | Missing admin authorization. |
| 404 Not Found   | User or question not found.  |

---

### 3.2. **Listando Respostas**

### `GET/answers` (Rota protegida - apenas ADMIN pode acessar)

### Exemplo de Request:
```
GET/answers
Host: https://prosupport.onrender.com
Authorization: Bearer token
Content-type: None
```

### Corpo da Requisição:
```json
Vazio
```

### Exemplo de Response:
```
200 OK
```
```json
[
	{
		"question": {
		"id": "4251a508-c54d-4163-b373-aad5921ab49a",
		"title": "duvida",
		"description": "muita duvida",
		"tech": "node",
		"createdAt": "2023-01-10T21:13:01.145Z",
		"updatedAt": "2023-01-10T21:13:01.145Z",
		"user": {}
	},
	"user": {
		"updatedAt": "2023-01-10T18:17:47.609Z",
		"createdAt": "2023-01-10T18:17:47.609Z",
		"image": "https://www.undb.edu.br/hubfs/administra%C3%A7%C3%A3o%20undb-1.jpg",
		"bio": "Desenvolvedor especializado nas tecnologias mais utilizadas, com o intuito de responder perguntas para programadores profissionais",
		"isAdm": true,
		"email": "admin@prosupport.com",
		"name": "Pro Support",
		"id": "8ce51b81-5985-433c-9087-871476e76425"
	},
	"updatedAt": "2023-01-12T21:47:58.426Z",
	"createdAt": "2023-01-12T21:47:58.426Z",
	"description": "Para tipar o useState de um objeto você deve criar uma interface inserindo todas as chaves do objeto.",
	"id": "29286c17-a091-4864-84f1-d42c68ccaf04"
	},
]
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 401 Unauthorized   | Invalid token. |
| 403 Forbiden   | Missing admin authorization. |

---
### 3.3. **Editar Resposta por ID** (Rota protegida - apenas ADMIN pode acessar)

### `PATCH/answers/:answer_id`

### Exemplo de Request:
```
PATCH/answers/9cda28c9-e540-4b2c-bf0c-c90006d37893
Host: https://prosupport.onrender.com
Authorization: Bearer token
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
| answer_id     | string      | Identificador único da resposta (Answer) |

### Exemplo de Corpo da Requisição:
```json
{
	"description": "Para tipar o useState de um objeto você deve criar uma interface inserindo todas as chaves do objeto!.",
	"questionId":"4251a508-c54d-4163-b373-aad5921ab49a",
	"userId": "8ce51b81-5985-433c-9087-871476e76425"
}
```

### Exemplo de Response:
```
200 OK
```

```json
{
	"question": {
		"id": "4251a508-c54d-4163-b373-aad5921ab49a",
		"title": "duvida",
		"description": "muita duvida",
		"tech": "node",
		"createdAt": "2023-01-10T21:13:01.145Z",
		"updatedAt": "2023-01-10T21:13:01.145Z",
		"user": {}
	},
	"user": {
		"updatedAt": "2023-01-10T18:17:47.609Z",
		"createdAt": "2023-01-10T18:17:47.609Z",
		"image": "https://www.undb.edu.br/hubfs/administra%C3%A7%C3%A3o%20undb-1.jpg",
		"bio": "Desenvolvedor especializado nas tecnologias mais utilizadas, com o intuito de responder perguntas para programadores profissionais",
		"isAdm": true,
		"email": "admin@prosupport.com",
		"name": "Pro Support",
		"id": "8ce51b81-5985-433c-9087-871476e76425"
	},
	"updatedAt": "2023-01-12T21:47:58.426Z",
	"createdAt": "2023-01-12T21:47:58.426Z",
	"description": "Para tipar o useState de um objeto você deve criar uma interface inserindo todas as chaves do objeto!.",
	"id": "29286c17-a091-4864-84f1-d42c68ccaf04"
}
```


### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 400 Bad request   | Invalid body. |
| 401 Unauthorized   | Invalid token. |
| 403 Forbiden   | Missing admin authorization. |
| 404 Not Found   | Answer not found.  |
| 406 Not Acceptable   | Invalid input syntax for type uuid. |

---

### 3.4. **Deletar Resposta por ID** (Rota protegida - apenas ADMIN pode acessar)

### `DELETE/answers/:answer_id` 

### Exemplo de Request:
```
DELETE/answers/9cda28c9-e540-4b2c-bf0c-c90006d37893
Host: https://prosupport.onrender.com
Authorization: Bearer token
Content-type: None
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
| answer_id     | string      | Identificador único da resposta (Answer) |

### Corpo da Requisição:
```json
Vazio
```

### Exemplo de Response:
```
204 No content
```
```json
Vazio
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 401 Unauthorized   | Invalid token. |
| 403 Forbiden   | Missing admin authorization. |
| 404 Not Found   | User not found. |
| 406 Not Acceptable   | Invalid input syntax for type uuid. |

---

## 4. **Questions**
[ Voltar para o topo ](#tabela-de-conteúdos)

### Endpoints

| Método   | Rota       | Descrição                               |
|----------|------------|-----------------------------------------|
| POST     | /questions     | Criação de uma perguta.                  |
| GET      | /questions     | Lista todos as perguntas.                 |
| PATCH    | /questions/:question_id     | Editar as informações de uma questão usando seu ID como parâmetro.   |
| DELETE    | /questions/:question_id     | Deleta uma questão usando seu ID como parâmetro.   

---

### 4.1. **Criação de Pergunta** 

### Exemplo de Request:
```
POST/questions
Host: https://prosupport.onrender.com
Authorization: Bearer token
Content-type: application/json
```

### Exemplo de Corpo da Requisição:
```json
{
	"title": "Nu Kenzie",
	"description": "Não consigo usar o useEffect",
	"tech": "React",
	"userId": "8ce51b81-5985-433c-9087-871476e76425"
}
```

### Exemplo de Response:
```
201 Created
```

```json
{
	"id": "a0e42d17-213f-4f20-b6fe-feabcfee6e3f",
	"title": "Nu Kenzie",
	"description": "Não consigo usar o useEffect",
	"tech": "React",
	"createdAt": "2023-01-13T18:52:01.088Z",
	"updatedAt": "2023-01-13T18:52:01.088Z",
	"user": {
		"updatedAt": "2023-01-10T18:17:47.609Z",
		"createdAt": "2023-01-10T18:17:47.609Z",
		"image": "https://www.undb.edu.br/hubfs/administra%C3%A7%C3%A3o%20undb-1.jpg",
		"bio": "Desenvolvedor especializado nas tecnologias mais utilizadas, com o intuito de responder perguntas para programadores profissionais",
		"isAdm": true,
		"email": "admin@prosupport.com",
		"name": "Pro Support",
		"id": "8ce51b81-5985-433c-9087-871476e76425"
	}
}
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 401 Unauthorized   | Invalid token. |

---

### 4.2. **Listando Perguntas**

### `GET/questions` 

### Exemplo de Request:
```
GET/questions
Host: https://prosupport.onrender.com
Authorization: Bearer token
Content-type: None
```

### Corpo da Requisição:
```json
Vazio
```

### Exemplo de Response:
```
200 OK
```
```json
[
	{
		"id": "4251a508-c54d-4163-b373-aad5921ab49a",
		"title": "duvida",
		"description": "muita duvida",
		"tech": "node",
		"createdAt": "2023-01-10T21:13:01.145Z",
		"updatedAt": "2023-01-10T21:13:01.145Z",
		"deletedAt": null
	},
	{
		"id": "a0e42d17-213f-4f20-b6fe-feabcfee6e3f",
		"title": "Nu Kenzie",
		"description": "Não consigo usar o useEffect",
		"tech": "React",
		"createdAt": "2023-01-13T18:52:01.088Z",
		"updatedAt": "2023-01-13T18:52:01.088Z",
		"deletedAt": null
	}
]
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 401 Unauthorized   | Invalid token. |

---
### 4.3. **Editar pergunta por ID** 

### `PATCH/questions/:question_id`

### Exemplo de Request:
```
PATCH/answers/9cda28c9-e540-4b2c-bf0c-c90006d37893
Host: https://prosupport.onrender.com
Authorization: Bearer token
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
| question_id     | string      | Identificador único da questão (Question) |

### Exemplo de Corpo da Requisição:
```json
{
	"title": "Nu Kenzie",
	"description": "Quando coloco algo no array de dependencias do useEffect, ele entra em loop infinito",
	"tech": "React"
}
```

### Exemplo de Response:
```
200 OK
```

```json
{
	"id": "a0e42d17-213f-4f20-b6fe-feabcfee6e3f",
	"title": "Nu Kenzie",
	"description": "Quando coloco algo no array de dependencias do useEffect, ele entra em loop infinito",
	"tech": "React",
	"createdAt": "2023-01-13T18:52:01.088Z",
	"updatedAt": "2023-01-16T13:15:11.802Z",
	"deletedAt": null
}
```


### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 401 Unauthorized   | Invalid token. |
| 404 Not Found   | Question not found.  |
| 406 Not Acceptable   | Invalid input syntax for type uuid. |

---

### 4.4. **Deletar Pergunta por ID** 

### `DELETE/questions/:question_id` 

### Exemplo de Request:
```
DELETE/questions/9cda28c9-e540-4b2c-bf0c-c90006d37893
Host: https://prosupport.onrender.com
Authorization: Bearer token
Content-type: None
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
| question_id     | string      | Identificador único do usuário (Question) |

### Corpo da Requisição:
```json
Vazio
```

### Exemplo de Response:
```
204 No content
```
```json
Vazio
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 401 Unauthorized   | Invalid token. |
| 404 Not Found   | Question not found. |
| 406 Not Acceptable   | Invalid input syntax for type uuid. |

---

## 5. Desenvolvedores
[ Voltar para o topo ](#tabela-de-conteúdos)


| [<img src="https://avatars.githubusercontent.com/u/104766684?v=4" width=115><br><sub>Wesley Matos</sub>](https://github.com/wesleydematos) | [<img src="https://avatars.githubusercontent.com/u/106447484?v=4" width=115><br><sub>Victoria Milan</sub>](https://github.com/victoriamilans) |
| :----------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------: |

| [<img src="https://avatars.githubusercontent.com/u/103422552?v=4" width=115><br><sub>Lucas Mitori</sub>](https://github.com/LucasMitori) | [<img src="https://avatars.githubusercontent.com/u/106627534?v=4" width=115><br><sub>Bianca Vellego</sub>](https://github.com/biancavellego) |
| :---------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------: |

| [<img src="https://avatars.githubusercontent.com/u/106770677?v=4" width=115><br><sub>Thomas Schreiner</sub>](https://github.com/ThomSchreiner) | [<img src="https://avatars.githubusercontent.com/u/106772940?v=4" width=115><br><sub>Altieris Souza</sub>](https://github.com/Altieris-Souza) |
| :--------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------: |
