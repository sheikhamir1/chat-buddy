# 📱 Chat Buddy

**Chat Buddy** is a real-time chat application that allows users from around the world to connect and communicate seamlessly. Built with modern web technologies, it provides a smooth and interactive experience, complete with theming, authentication, and real-time messaging via sockets.

---

## 🌍 Features

- 🌐 Real-time global chat
- 🧠 Authentication with Google OAuth
- 🎨 Theme support (30+ themes)
- ⚡ Lightning-fast performance with Vite
- 🔥 Real-time messaging with Socket.IO
- 🔐 JWT-based authentication
- 🖼️ Image uploads via Cloudinary
- 💬 User-friendly UI powered by TailwindCSS + DaisyUI
- 🗃️ Persistent state management using Zustand
- 📡 Backend powered by Express, Node.js, and MongoDB

---

## 🧱 Tech Stack

### Frontend

- **React.js (v19)**
- **Vite** — fast dev server and bundler
- **TailwindCSS** + **DaisyUI** — for styling and components
- **React Router (v7)** — for routing
- **React Query (TanStack)** — for data fetching and caching
- **React Hook Form** — for easy form management
- **Zustand** — for global state management
- **Socket.IO Client** — for real-time communication
- **React Toastify** — for notifications

### Backend

- **Node.js**
- **Express.js**
- **MongoDB (via Mongoose)**
- **JWT (jsonwebtoken)** — for authentication
- **BcryptJS** — for password hashing
- **Cloudinary** — for image uploads
- **Multer** — for file handling
- **Socket.IO** — for real-time messaging
- **Google Auth Library** — for OAuth login
- **Dotenv** — for environment management
- **CORS, Cookie-Parser** — for handling HTTP and cookies

---

## 📦 Project Structure

```
chat-buddy/
├── client/       # Frontend React app
├── server/       # Backend Node.js API
├── README.md     # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+ installed
- MongoDB instance (local or cloud like Atlas)
- A `.env` file with required keys:
  - MongoDB URI
  - JWT Secret
  - Cloudinary API Keys
  - Google OAuth Keys

---

### 🔧 Run the Project Locally

#### 1. Clone the repository

```bash
git clone https://github.com/yourusername/chat-buddy.git
cd chat-buddy
```

#### 2. Setup the server

```bash
cd server
npm install
npm run watch
```

#### 3. Setup the client

```bash
cd client
npm install
npm run dev
```

---

## 🎨 Theming

Chat Buddy supports over **30 themes** using [DaisyUI](https://daisyui.com/themes/). You can switch between them dynamically from the UI.

---

## 🧪 Scripts

### Client Scripts

| Script    | Command           | Description                |
| --------- | ----------------- | -------------------------- |
| Start Dev | `npm run dev`     | Run the client in dev mode |
| Build     | `npm run build`   | Build for production       |
| Preview   | `npm run preview` | Preview production build   |

### Server Scripts

| Script | Command         | Description                |
| ------ | --------------- | -------------------------- |
| Start  | `npm start`     | Run the server             |
| Watch  | `npm run watch` | Auto-reloads using nodemon |

---

## 🧠 Packages Highlight

- `@react-oauth/google`: For Google sign-in
- `zustand`: Lightweight global state manager
- `socket.io-client`: Real-time communication
- `mongoose`: ODM for MongoDB
- `cloudinary`: Image upload & storage
- `bcryptjs`: Password encryption
- `react-hook-form`: Handling form logic

---

## 👨‍💻 Author

**Amir Sohail Shiekh**  
🖥️ Software Developer | 💬 Full Stack Dev  
📧 Email: [amirsohail898198@gmail.com]  
🌐 Portfolio: [amirsohailshiek.in](https://amirsohailshiek.in)

---
