<!-- CABEÇALHO -->
<div id="readme-top" align="center">
    <h1>
      Tasks API
    </h1>
    <p>
        <a href="#%EF%B8%8F-sobre-o-projeto">Sobre o Projeto</a> •
        <a href="#-endpoints">Endpoints</a> •
        <a href="#%EF%B8%8F-tecnologias">Tecnologias</a> •
        <a href="#-autor">Autor</a>
    </p>
</div>

<!-- SOBRE O PROJETO -->

## 🖥️ Sobre o Projeto

> Projeto desenvolvido como desafio referente ao módulo Fundamentos do Node.js do curso de Node.js da Rocketseat.

Esse projeto consiste em uma aplicação back-end de um sistema de gerenciamento de tarefas.

O Objetivo do desafio consistia em desenvolver uma API para realizar um CRUD de tarefas

As funcionalidades dessa aplicação são:

- [x] Criação de uma tarefa
- [x] Listagem de todas as tarefas
- [x] Atualização de uma tarefa pelo `id`
- [x] Remover uma tarefa pelo `id`
- [x] Marcar pelo `id` uma tarefa como completa 
- [x] Importação de tarefas em massa por um arquivo CSV

<!-- ENDPOINTS -->

## 💡 Endpoints

| Método | Endpoint                 | Responsabilidade                     | Regras de Negócio                                                                                                                                                |
| ------ | ------------------------ | -------------------------------------| ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| POST   | /tasks                   | Cria uma tarefa                      | Envio dos campos `title`e `description`. Campos `ìd`, `created_at`, `updated_at` e `completed_at` são preenchidos automaticamente                                |
| GET    | /tasks                   | Lista tarefas                        | Lista todas as tarefas. Também realiza uma busca, filtrando as tarefas pelo `title` e `description`                                                              |
| UPDATE | /tasks/:id               | Atualiza uma tarefa                  | Atualiza uma tarefa pelo `ìd`. O `body` da requisição, recebe somente o title e/ou description. Verifica se o `id` pertence a uma tarefa salva no banco de dados |
| PATCH  | /tasks/:id/complete      | Marca uma tarefa como concluída      | Concluí uma tarefa pelo `ìd`. Verifica se o `id` pertence a uma tarefa salva no banco de dados                                                                   |
| DELETE | /tasks/:id               | Deleta uma tarefa                    | Remove uma tarefa pelo `ìd`. O `body` da requisição, recebe somente o title e/ou description. Verifica se o `id` pertence a uma tarefa salva no banco de dados   |

<!-- TECNOLOGIAS -->

## 🛠️ Tecnologias

Para o desenvolvimento desse projeto, as seguintes ferramentas foram utilizadas:

- **[Node.js](https://nodejs.org/)**
- **[TypeScript](https://www.typescriptlang.org/)**
- **[CSV Parse](https://csv.js.org/parse/)**

## 👨‍💻 Autor

<img style="border-radius: 15%;" src="https://gitlab.com/uploads/-/system/user/avatar/8603970/avatar.png?width=400" width=70 alt="author-profile-picture"/>

Marcos Kenji Kuribayashi
