# MERN Stack Registration App

Full-stack registration application with MVC architecture, real-time validation, multi-step form wizard, and dual theme support.

## Tech Stack

| Layer    | Tech                                      |
|----------|-------------------------------------------|
| Frontend | React 18, Vite, Bootstrap 5, React Router |
| Backend  | Node.js, Express 4, ES6 modules           |
| Validation | express-validator (server), custom (client) |
| Storage  | In-memory array (no database required)    |

---

## Quick Start

### 1. Install dependencies

```bash
# Server
cd server && npm install

# Client
cd ../client && npm install
```

### 2. Start the server

```bash
cd server
npm run dev      # uses nodemon (auto-restart)
# or
npm start        # plain node
```

Server runs on **http://localhost:5000**

### 3. Start the client

```bash
cd client
npm run dev
```

Client runs on **http://localhost:3000**

---

## Features

- **Multi-step registration wizard** (3 steps)
- **Real-time field validation** with green ✓ / red ✗ indicators
- **Password strength bar** (Weak / Medium / Strong)
- **Show/hide password** toggle
- **Character count** on text fields
- **Profile picture upload** with preview
- **Dark / Light mode** with smooth CSS transitions (saved in localStorage)
- **Toast notifications** for success and errors
- **Loading spinner** on form submit
- **Protected route** — Dashboard requires login
- **404 page**
- **Fully responsive** — mobile / tablet / desktop

---

## API Endpoints

| Method | Path               | Description              |
|--------|--------------------|--------------------------|
| POST   | /api/form/submit   | Register a new user      |
| GET    | /api/form/data     | List all registered users|
| GET    | /api/health        | Server health check      |

---

## Folder Structure

```
mern-project/
├── client/               # Vite + React frontend
│   ├── src/
│   │   ├── components/   # Navbar, FormInput, PasswordStrengthBar, ThemeToggle
│   │   ├── pages/        # Home, Register, Login, Dashboard
│   │   ├── context/      # ThemeContext
│   │   ├── utils/        # validators.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   └── package.json
└── server/               # Express MVC backend
    ├── src/
    │   ├── controllers/  # formController.js
    │   ├── models/       # formModel.js (in-memory)
    │   ├── routes/       # formRoutes.js
    │   ├── middleware/   # validateMiddleware.js
    │   └── app.js
    ├── .env
    └── package.json
```

---

## Color Scheme

| Token    | Dark Mode | Light Mode |
|----------|-----------|------------|
| Background | `#0f172a` | `#f8fafc` |
| Card     | `#1e293b` | `#ffffff` |
| Text     | `#f1f5f9` | `#0f172a` |
| Primary  | `#6366f1` | `#4f46e5` |
