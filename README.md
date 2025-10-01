# Task Manager App

## Backend Setup
1. `cd server`
2. `npm install`
3. `npm start` (runs on port 4000)

## Frontend Setup
1. `cd client`
2. `npm install`
3. `npm run dev` (runs on port 3000)

## API Endpoints
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `PATCH /api/tasks/:id/toggle` - Toggle task completion

## Design Decisions
- In-memory data storage (no database)
- React with Vite for frontend
- Express.js with ES modules for backend
- Ajv for request validation
- Animated carousel for task display

## Time Spent
- Backend setup: ~1.5 hours
- Frontend components: ~2.5 hours
