# Task Manager

A small full stack Task Manager built with React and Express.

The project is split into separate frontend and backend apps. Tasks are stored in memory, so data resets when the backend restarts.

## Project Structure

- `backend/` contains the Express API.
- `frontend/` contains the React app.

## Tech Stack

- Frontend: React (hooks, functional components)
- Backend: Node.js + Express
- Storage: In-memory array (no database)

## Setup

1. Install backend dependencies:

   ```bash
   npm install --prefix backend
   ```

2. Install frontend dependencies:

   ```bash
   npm install --prefix frontend
   ```

You can also run both installs from root with:

```bash
npm run install:all
```

3. Start backend:

   ```bash
   npm start
   ```

4. Start frontend in another terminal:

   ```bash
   npm run dev
   ```

After starting:

- Backend: `http://localhost:3001`
- Frontend: usually `http://localhost:5173` (Vite may choose another port if busy)

## What Is Actually Happening In This Project

At runtime, there are two apps running together:

1. The frontend (React + Vite) renders the UI and sends HTTP requests when you add, toggle, or delete tasks.
2. The backend (Express) receives those requests, updates an in-memory array, and returns JSON.

### Request Flow

1. On page load, React calls `GET /tasks`.
2. Express returns the current `tasks` array from memory.
3. When you submit the form, React calls `POST /tasks` with `{ title }`.
4. Express validates title, creates a task object (`id`, `title`, `completed`, `createdAt`), stores it in memory, and returns it.
5. When you check/uncheck a task, React calls `PATCH /tasks/:id`.
6. Express flips `completed` from `true` to `false` (or the reverse) and returns the updated task.
7. When you delete, React calls `DELETE /tasks/:id`.
8. Express removes the task from memory and returns a success message.

### Important Behavior

- No database is used.
- Data is not persisted.
- Restarting backend clears all tasks.
- Validation is basic (`title` is required and cannot be empty after trim).
- Errors return `success: false` with a message and proper status code.

### Frontend State Behavior

- `loading` is shown while initial tasks are being fetched.
- `error` is shown if any API call fails.
- Local task list updates immediately after successful API responses.

## Response Format

All API endpoints return JSON in this shape:

```json
{
  "success": true,
  "data": {}
}
```

## API Endpoints

### GET /tasks

Returns all tasks.

Example response:

```json
{
  "success": true,
  "data": []
}
```

### POST /tasks

Creates a task.

Request body:

```json
{
  "title": "Buy milk"
}
```

Example response:

```json
{
  "success": true,
  "data": {
    "id": "b3f6f8d3-2f2a-4fd1-9ce4-5f4c22d64c79",
    "title": "Buy milk",
    "completed": false,
    "createdAt": "2026-04-09T12:00:00.000Z"
  }
}
```

### PATCH /tasks/:id

Toggles completed status.

Example response:

```json
{
  "success": true,
  "data": {
    "id": "b3f6f8d3-2f2a-4fd1-9ce4-5f4c22d64c79",
    "title": "Buy milk",
    "completed": true,
    "createdAt": "2026-04-09T12:00:00.000Z"
  }
}
```

### DELETE /tasks/:id

Deletes a task.

Example response:

```json
{
  "success": true,
  "data": {
    "message": "Task deleted successfully."
  }
}
```