const express = require('express');
const {
  getAllTasks,
  createNewTask,
  toggleTaskStatus,
  removeTask,
} = require('../controllers/taskController');

const router = express.Router();

router.get('/', getAllTasks);
router.post('/', createNewTask);
router.patch('/:id', toggleTaskStatus);
router.delete('/:id', removeTask);

module.exports = router;
