# 🛠️ Backend API for React SPA

This is the backend server for the React SPA. It provides authentication and user data management via a RESTful API built with Node.js, Express, and MongoDB.

## 🌐 Base URL

http://localhost:5000



---

## 🚀 Features

- 🔐 **JWT Authentication** (access + refresh tokens)
- 🔒 **Password Hashing** with bcrypt
- 🌿 **MongoDB/Mongoose** integration
- ✅ **Request Validation** using Joi
- 🌍 **CORS** configured for frontend-backend communication
- 📂 **Environment-based configuration** using dotenv
- ⚙️ **Hot reloading** during development with nodemon

---

## 📦 Tech Stack

| Tech        | Description                                  |
|-------------|----------------------------------------------|
| Express     | Web framework for Node.js                    |
| Mongoose    | MongoDB object modeling                      |
| JWT         | JSON Web Token for secure auth               |
| bcrypt      | Secure password hashing                      |
| Joi         | Schema-based request validation              |
| cors        | CORS middleware to handle cross-origin       |
| dotenv      | Load environment variables                   |
| nodemon     | Auto-restart server on code changes          |
| body-parser | Parse incoming request bodies                |

---

## 📁 Folder Structure (Example)

backend/
├── controllers/ # Route logic
├── models/ # Mongoose schemas
├── middleware/ # Auth and validation middleware
├── routes/ # API routes
├── utils/ # Helper functions (e.g. token generation)
├── .env # Environment variables
├── index.js # App entry point
└── package.json