# Collabo: Real-Time Collaborative Kanban App

## Overview
Collabo is a real-time collaborative Kanban-style task management application with:
- **User authentication (register/login/logout)**
- **Smart task assignment**
- **Conflict detection and resolution**
- **Live activity log panel**
- **Beautiful, responsive, modern UI**
- **Real-time updates via WebSockets**

Built with **Node.js, Express, MongoDB, React (TypeScript), Socket.io**, and **no external UI libraries**—all styling is custom and inline for maximum flexibility.

---

## Features

### 1. User Authentication
- Secure registration and login with JWT-based authentication.
- Passwords hashed with bcrypt.
- JWT stored in browser localStorage for persistent sessions.
- Route protection: Only authenticated users can access the Kanban board.
- User context for global state management and auto-login.

### 2. Real-Time Collaborative Kanban Board
- Drag-and-drop tasks between columns (To Do, In Progress, Done).
- All board changes are synced in real-time for every user via Socket.io.
- Responsive glassmorphism UI with SVG backgrounds and animated effects.
- Dark mode toggle.

### 3. Smart Task Assignment
- New tasks are auto-assigned to the user with the fewest open tasks.
- Assigned user info is displayed on each task card.

### 4. Conflict Handling
- Backend detects concurrent edits (using `updatedAt`).
- If two users edit the same task, the UI prompts for merge or overwrite.

### 5. Activity Log Panel
- Live feed of all board activity (task moves, edits, assignments).
- Updates in real-time for all users.

### 6. Security
- JWT secret and MongoDB URI stored in environment variables.
- CORS configured for secure frontend-backend communication.

---

## Getting Started

### Prerequisites
- **Node.js** (v16+ recommended)
- **npm**
- **MongoDB** (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

### 1. Clone the Repository
```sh
git clone <your-repo-url>
cd collabo
```

### 2. Setup Environment Variables
Create a `.env` file in the `backend/` directory with:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/collabo
JWT_SECRET=your_jwt_secret_here
```
- For MongoDB Atlas, use your connection string instead of `mongodb://localhost:27017/collabo`.

### 3. Install Dependencies
#### Backend
```sh
cd backend
npm install
```
#### Frontend
```sh
cd ../frontend
npm install
```

### 4. Start MongoDB
- If running locally: open a terminal and run
  ```sh
  mongod
  ```
- For Atlas: ensure your cluster is running and network access is allowed.

### 5. Start the Backend Server
```sh
cd backend
npm run dev
```
- The backend runs on [http://localhost:5000](http://localhost:5000)

### 6. Start the Frontend (Vite)
```sh
cd ../frontend
npm run dev
```
- The frontend runs on [http://localhost:5173](http://localhost:5173)

---

## Usage
1. **Register** a new account or **login** with an existing one.
2. **Add, move, and edit tasks** on the Kanban board. All changes sync in real time.
3. **See live activity** in the log panel.
4. **Logout** from the board header.

---

## Project Structure
```
collabo/
├── backend/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── server.js
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── App.tsx
│   └── ...
└── README.md
```

---

## Tech Stack
- **Frontend:** React (TypeScript), react-router-dom, socket.io-client
- **Backend:** Node.js, Express, MongoDB, Mongoose, bcryptjs, jsonwebtoken, socket.io

---

## Customization & Deployment
- All API URLs and secrets should be configured via environment variables for production.
- For deployment, use services like **Vercel**, **Netlify** (frontend), and **Render**, **Railway**, or **Atlas** (backend/db).

---

## Troubleshooting
- **CORS errors:** Ensure backend CORS is set to your frontend’s URL (see `server.js`).
- **MongoDB connection errors:** Make sure MongoDB is running and `MONGO_URI` is correct.
- **Port conflicts:** Change the `PORT` in `.env` or Vite config if needed.

---

## License
MIT

---

## Author
- Built by Karthik and contributors.

---

## Questions?
Open an issue or contact the maintainer!
