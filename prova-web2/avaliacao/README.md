# 🎓 Sistema de Gerenciamento Acadêmico (SGA)

## 📝 Descrição do Projeto

Este projeto é uma aplicação web completa desenvolvida com uma arquitetura **Full-Stack**, utilizando **Node.js/Express** no backend (API RESTful em padrão **MVC**) e **React** no frontend. O objetivo é gerenciar as entidades principais de um sistema acadêmico: **Usuários** (com autenticação segura), **Alunos** e **Cursos**.

**Funcionalidades Principais (CRUD Completo e Autenticação):**
* **Autenticação Segura:** Login baseado em Sessão (`express-session`) com criptografia de senhas (`bcrypt`).
* **Gestão de Alunos (CRUD):** Cadastro, listagem (com nome do curso associado - JOIN), edição de dados (incluindo alteração de curso - Chave Estrangeira) e exclusão.
* **Gestão de Cursos (CRUD):** Cadastro, listagem e exclusão (com validação de alunos associados - Chave Estrangeira).

## 👥 Integrantes do Grupo

* [Nome do Integrante 1] - [Link para o GitHub]
* [Nome do Integrante 2] - [Link para o GitHub]
* [Nome do Integrante 3] - [Link para o GitHub]

## 🛠️ Instruções de Instalação e Execução

### Pré-requisitos
* Node.js (versão LTS)
* MySQL Server (ou outro SGBD relacional compatível)
* Git

### 1. Configuração do Banco de Dados (MySQL)
1.  Crie o banco de dados: `CREATE DATABASE sga_db;`
2.  Execute os comandos SQL de criação de tabelas (`usuarios`, `alunos`, `cursos`) e de dados de exemplo.

### 2. Configuração do Backend (API)
```bash
# Na pasta raiz do projeto
cd sga-backend

# Instalar dependências
npm install

# Criar e configurar o arquivo .env
cp .env.example .env 
# Edite o .env com suas credenciais do MySQL e a SESSION_SECRET

# Iniciar o servidor Express
npm start # ou node server.js
# O servidor rodará em http://localhost:3001