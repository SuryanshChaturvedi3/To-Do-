import { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { createTask, deleteTask, getTasks, toggleTask } from './services/api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadTasks() {
      try {
        setError('');
        const data = await getTasks();
        setTasks(data);
      } catch (requestError) {
        setError(requestError.message);
      } finally {
        setLoading(false);
      }
    }

    loadTasks();
  }, []);

  async function handleAddTask(title) {
    try {
      setError('');
      const newTask = await createTask(title);
      setTasks((currentTasks) => [newTask, ...currentTasks]);
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  async function handleToggleTask(id) {
    try {
      setError('');
      const updatedTask = await toggleTask(id);
      setTasks((currentTasks) =>
        currentTasks.map((task) => (task.id === id ? updatedTask : task)),
      );
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  async function handleDeleteTask(id) {
    try {
      setError('');
      await deleteTask(id);
      setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  return (
    <main className="app-shell">
      <section className="task-card">
        <p className="eyebrow">Task Manager</p>
        <h1>Keep a simple task list in one place.</h1>
        <p className="subtitle">
          A small full stack app with an in-memory Express API and a React client.
        </p>

        <TaskForm onAddTask={handleAddTask} />

        {loading ? (
          <p className="status-message">Loading tasks...</p>
        ) : error ? (
          <p className="status-message error">{error}</p>
        ) : (
          <TaskList
            tasks={tasks}
            onToggle={handleToggleTask}
            onDelete={handleDeleteTask}
          />
        )}
      </section>
    </main>
  );
}

export default App;
