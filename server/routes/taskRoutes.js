import express from 'express';
const router = express.Router();
import TaskController from '../controllers/taskController.js';
import taskValidation from '../middleware/taskValidation.js';

router.get('/', TaskController.getAllTasksController);
router.post('/', taskValidation, TaskController.createTaskController);
router.put('/:id', taskValidation, TaskController.updateTaskController);
router.delete('/:id', TaskController.deleteTaskController);
router.patch('/:id/toggle', TaskController.toggleTaskController);

export default router;
