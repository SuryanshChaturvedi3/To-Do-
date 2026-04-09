# Task Manager

A small full stack Task Manager built with React and Express.

This repository is split into two apps:
- `backend/` for the API
- `frontend/` for the UI

Tasks are stored in an in-memory array on the backend, so all tasks reset when the backend server restarts.

## Project Structure

```text
.
├── backend/
│   ├── package.json
│   └── server/
│       ├── server.js
│       ├── routes/taskRoutes.js
│       ├── controllers/taskController.js
│       └── models/taskModel.js
├── frontend/
│   ├── package.json
│   ├── index.html
│   ├── vite.config.mjs
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       ├── index.css
│       ├── components/
│       │   ├── TaskForm.jsx
│       │   ├── TaskList.jsx
│       │   └── TaskItem.jsx
│       └── services/
│           └── api.js
└── package.json
```

## Tech Stack

- Frontend: React + Vite
- Backend: Node.js + Express
- Storage: in-memory array (no database)

## Setup

1. Install dependencies for both apps:

```bash
npm run install:all
```

Or install separately:

```bash
npm install --prefix backend
npm install --prefix frontend
```

2. Start backend:

```bash
npm start
```

3. Start frontend in another terminal:

```bash
npm run dev
```

Default URLs:
- Backend: `http://localhost:3001`
- Frontend: `http://localhost:5173` (or another Vite port if 5173 is busy)

## What Is Happening In This Project

1. React UI loads and requests `GET /tasks`.
2. Express returns tasks from in-memory storage.
3. Adding a task sends `POST /tasks` with `{ "title": "..." }`.
4. Toggling completion sends `PATCH /tasks/:id`.
5. Deleting sends `DELETE /tasks/:id`.
6. Backend returns JSON responses in a consistent shape and updates the in-memory array.

Important notes:
- No database or persistence layer.
- Restarting backend clears all tasks.
- Backend validates title input (required and non-empty after trim).

## Response Format

Successful response format:

```json
{
	"success": true,
	"data": {}
}
```

Error response format:

```json
{
	"success": false,
	"error": "Error message"
}
```

## API Endpoints

### GET /tasks
Returns all tasks.

### POST /tasks
Creates a task.

Request body:

```json
{
	"title": "Buy milk"
}
```

### PATCH /tasks/:id
Toggles `completed` status of a task.

### DELETE /tasks/:id
Deletes a task.
