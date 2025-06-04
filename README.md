# 🔐 Auth Refresh Lab - Sistema de Autenticação JWT

## 👥 Equipe
- **Augusto César**
- **Guilherme N.**
- **João Kaio**
- **Rikelme R.**

---

## 📋 Sobre o Projeto

Sistema de autenticação completo desenvolvido em **Node.js** utilizando **JWT (JSON Web Token)** com implementação de **Access Token** e **Refresh Token** para maior segurança.

### 🎯 Objetivo
Consolidar os conceitos de autenticação baseada em token, segurança com refresh tokens e uso de ORM para gerenciamento de dados.

---

## 🛠️ Tecnologias Utilizadas

- **Node.js** v22.16.0
- **Express.js** - Framework web
- **JWT** - Autenticação via tokens
- **Prisma ORM** - Camada de acesso ao banco
- **SQLite** - Banco de dados
- **bcryptjs** - Criptografia de senhas
- **HTML/CSS** - Interface de testes

---

## 🏗️ Estrutura do Projeto

```
auth-refresh-lab/
├── database/
│   └── dev.db                 # Banco SQLite
├── prisma/
│   ├── migrations/            # Migrações do banco
│   └── schema.prisma          # Schema do banco
├── public/
│   ├── index.html            # Interface de testes
│   └── style.css             # Estilos
├── src/
│   ├── routes/
│   │   └── authRoutes.js     # Rotas de autenticação
│   ├── authMiddleware.js     # Middleware de autenticação
│   └── index.js              # Servidor principal
├── .env                      # Variáveis de ambiente
├── .gitignore               # Arquivos ignorados
└── package.json             # Dependências
```

---

## 🚀 Funcionalidades Implementadas

### ✅ Rotas Fornecidas
- **POST `/register`** - Registro de novos usuários
- **POST `/login`** - Autenticação e geração de tokens
- **POST `/logout`** - Invalidação do refresh token

### ✅ Rotas Implementadas pela Equipe
- **POST `/refresh`** - Renovação do access token
- **GET `/protected`** - Rota protegida (requer autenticação)

---

## 🔧 Como Executar

### 1. Pré-requisitos
- Node.js v18.18+ (recomendado v20+)
- npm ou yarn

### 2. Instalação
```bash
# Clonar o repositório
git clone https://github.com/augustocsar/auth-refresh-lab.git
cd auth-refresh-lab

# Instalar dependências
npm install

# Configurar banco de dados
npx prisma generate
npx prisma migrate dev --name init

# Iniciar servidor
npm start
```

### 3. Acessar
- **Interface:** http://localhost:3000
- **API:** http://localhost:3000/api

---

## 🔐 Fluxo de Autenticação

### 1. **Registro**
```javascript
POST /register
{
  "email": "usuario@email.com",
  "password": "senha123"
}
```

### 2. **Login**
```javascript
POST /login
{
  "email": "usuario@email.com", 
  "password": "senha123"
}

// Resposta
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

### 3. **Renovar Token**
```javascript
POST /refresh
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}

// Resposta
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

### 4. **Acessar Rota Protegida**
```javascript
GET /protected
Headers: {
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIs..."
}

// Resposta
{
  "message": "Você acessou uma rota protegida!",
  "userId": 1
}
```

---

## 🛡️ Segurança Implementada

- **Senhas criptografadas** com bcrypt (salt rounds: 10)
- **Access Token** com expiração de 15 minutos
- **Refresh Token** com expiração de 7 dias
- **Validação de tokens** no middleware
- **Invalidação de tokens** no logout
- **Verificação de correspondência** entre refresh token e banco

---

## 📊 Banco de Dados

### Modelo User
```sql
CREATE TABLE User (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    refreshToken TEXT
);
```

---

## 🧪 Testes

### Interface Web
1. Acesse `http://localhost:3000`
2. Teste registro de usuário
3. Teste login
4. Teste acesso à rota protegida
5. Teste logout

### API (Postman/Insomnia)
- Teste todas as rotas via requisições HTTP
- Verifique headers de autorização
- Teste cenários de erro (tokens inválidos/expirados)

---

## 📝 Variáveis de Ambiente

```env
DATABASE_URL="file:./database/dev.db"
ACCESS_TOKEN_SECRET="segredoacesso123"
REFRESH_TOKEN_SECRET="segredorefresh456"
```

---

## 🎓 Aprendizados

- Implementação de autenticação JWT
- Diferença entre Access Token e Refresh Token
- Uso do Prisma ORM
- Middleware de autenticação
- Segurança em APIs REST
- Gerenciamento de sessões

---

## 📅 Desenvolvimento

**Data de Entrega:** 04/06/2025  
**Disciplina:** Desenvolvimento Back-end  
**Atividade:** Desafio Prático - Autenticação com Refresh Token

---

## 🤝 Contribuições

Projeto desenvolvido em equipe como atividade acadêmica.

---

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais.
