# React + Vite

# 💬 Basic Application – React + Vite Frontend

A clean, modular frontend built with **React** and **Vite**. This application features **authentication**, a **dark mode toggle**, a **dynamic user greeting**, and a functional **chatbot**. Perfect for learning or extending into a full-stack app.

---


## 🧩 Features

- 🔐 **Login & Signup** pages with validation
- 🌙 **Dark Mode Toggle** using React state
- 👋 **Dynamic Welcome Message** for logged-in users
- 🤖 **Integrated Chatbot UI**
- ✨ Modular and scalable project structure
- ⚡ Blazing-fast Vite dev server and build times

---

## 📂 Project Structure

src/
├── assets/ # Static files (optional)
├── components/ # Reusable UI components
│ ├── Chatbot.jsx
│ ├── Chatbot.css
│ └── DarkModeToggle.jsx
├── pages/ # Page components
│ ├── Home.jsx / Home.css
│ ├── Login.jsx
│ └── Signup.jsx
├── App.jsx # Main application component
├── App.css
├── main.jsx # Entry point
├── RefrrshHandler.js # Token/session handler
├── utils.jsx # Helper functions
└── index.css # Global styles




---

## 🛠️ Getting Started




Backend URL: http://localhost:5000


VITE_API_URL=http://localhost:5000

fetch(`${import.meta.env.VITE_API_URL}/auth/login`)


server: {
  proxy: {
    '/auth': 'http://localhost:5000',
  }
}


🧑‍💻 Author
Made with ❤️ by Piyush Rai


