# React SPA with Authentication, Theming, Feed

A single-page React application demonstrating front-end architecture, token-based authentication, theming with context, state management using Redux Toolkit (RTK Query), and real-time chat via WebSocket.

## 🌐 Live Demo

*Add live demo link here if hosted*

---

## 🚀 Features

### ✅ Authentication
- Token-based login via [DummyJSON Auth API](https://dummyjson.com/docs/auth)
- Access & refresh token handling
- Session persistence
- Login redirect to home page

### 🎨 Theming
- Light/Dark theme toggle using React Context API
- Persisted user preference (optional enhancement)

### 🧭 Routing & Navigation
- React Router v7 for navigation
- Routes:
  - `/login` – Login Page
  - `/` – Home Page (Protected)

### 🏠 Home Page
- Top navigation bar with user info
- Main feed with dummy data (from DummyJSON API)
- Infinite scroll for feed content

### 💬 Real-time Chat
- Floating Chat button (bottom-right)
- WebSocket sidebar chat interface
- Real-time communication using:
  - Echo WebSocket server: `wss://echo.websocket.org/.ws`
- Chat powered by RTK Query for WebSocket integration

---

## 🛠 Tech Stack

| Tech             | Usage                        |
|------------------|------------------------------|
| React            | UI Framework                 |
| React Router v7  | Client-side routing          |
| Tailwind CSS     | Styling                      |
| Redux Toolkit    | State management             |
| RTK Query        | API & WebSocket integration  |
| Context API      | Theme state management       

---

## 📁 Folder Structure (Example)
## FRONT_END FOLDER STRUCTURE
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
 
