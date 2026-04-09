import TaskItem from './TaskItem';

function TaskList({ tasks, onToggle, onDelete }) {
  if (!tasks.length) {
    return <p className="empty-state">No tasks yet. Add one to get started.</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default TaskList;
