const { randomUUID } = require('crypto');

const tasks = [];

function getTasks() {
  return tasks;
}

function createTask(title) {
  const cleanTitle = title.trim();

  if (!cleanTitle) {
    const error = new Error('Title cannot be empty.');
    error.statusCode = 400;
    throw error;
  }

  const task = {
    id: randomUUID(),
    title: cleanTitle,
    completed: false,
    createdAt: new Date(),
  };

  tasks.unshift(task);
  return task;
}

function findTaskById(id) {
  return tasks.find((task) => task.id === id);
}

function toggleTask(id) {
  const task = findTaskById(id);

  if (!task) {
    const error = new Error('Task not found.');
    error.statusCode = 404;
    throw error;
  }

  task.completed = !task.completed;
  return task;
}

function deleteTask(id) {
  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) {
    const error = new Error('Task not found.');
    error.statusCode = 404;
    throw error;
  }

  const [removedTask] = tasks.splice(index, 1);
  return removedTask;
}

module.exports = {
  getTasks,
  createTask,
  toggleTask,
  deleteTask,
};
