// In-memory data storage for tasks
const tasks = [
  {
    id: 1,
    title: "Complete project documentation",
    description: "Write comprehensive documentation for the task manager API",
    completed: false,
    createdAt: new Date('2024-01-15T10:00:00Z'),
    priority: 'high'
  },
  {
    id: 2,
    title: "Review code quality",
    description: "Perform code review and refactoring",
    completed: true,
    createdAt: new Date('2024-01-14T14:30:00Z'),
    priority: 'medium'
  },
  {
    id: 3,
    title: "Setup testing environment",
    description: "Configure unit tests and integration tests",
    completed: false,
    createdAt: new Date('2024-01-13T09:15:00Z'),
    priority: 'low'
  }
];

export default tasks;
