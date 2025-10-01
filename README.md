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
- Ajv for request validation and data sanitization
- Animated carousel for task display

## My assumptions
- **Ajv JSON Schema Validation**: Prevents invalid user input by validating all incoming requests against predefined schemas
- **Data Sanitization**: Ensures only valid data types and formats are accepted (title max 100 chars, description max 500 chars, priority enum values)
- **Required Field Validation**: Title field is mandatory to prevent empty task creation
- **Type Safety**: Strict validation for boolean completed status and string priority values
- **Client-side state**: Used React Context for state management instead of Redux
- **React Context for State**: Used useContext instead of prop drilling to share tasks data between components
- **Centralized State Management**: Single TaskContext provider manages all task operations across the app

## Time Spent
- Backend setup: ~1.5 hours
- Frontend components: ~2.5 hours
