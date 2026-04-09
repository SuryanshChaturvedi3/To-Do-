const taskModel = require('../models/taskModel');

function sendError(res, error) {
  const statusCode = error.statusCode || 500;
  const message = statusCode === 500 ? 'Something went wrong.' : error.message;

  return res.status(statusCode).json({
    success: false,
    error: message,
  });
}

function getAllTasks(req, res) {
  return res.json({
    success: true,
    data: taskModel.getTasks(),
  });
}

function createNewTask(req, res) {
  try {
    const { title } = req.body;

    if (typeof title !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Title is required.',
      });
    }

    const task = taskModel.createTask(title);

    return res.status(201).json({
      success: true,
      data: task,
    });
  } catch (error) {
    return sendError(res, error);
  }
}

function toggleTaskStatus(req, res) {
  try {
    const task = taskModel.toggleTask(req.params.id);

    return res.json({
      success: true,
      data: task,
    });
  } catch (error) {
    return sendError(res, error);
  }
}

function removeTask(req, res) {
  try {
    taskModel.deleteTask(req.params.id);

    return res.json({
      success: true,
      data: { message: 'Task deleted successfully.' },
    });
  } catch (error) {
    return sendError(res, error);
  }
}

module.exports = {
  getAllTasks,
  createNewTask,
  toggleTaskStatus,
  removeTask,
};
