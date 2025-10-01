import express from 'express';
import cors from 'cors';
import taskRouter from './routes/taskRoutes.js';

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/tasks', taskRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Server Error",
  });
})