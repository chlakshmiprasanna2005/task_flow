function TodoItem({
  todo,
  onDelete,
  onEdit,
  onToggle,
}) {
  return (
    <div
      className={`todo-card ${
        todo.completed
          ? "completed"
          : ""
      }`}
    >
      <div className="todo-left">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() =>
            onToggle(todo)
          }
        />

        <div>
          <h3>{todo.text}</h3>

          <div className="todo-meta">
            <span
              className={`priority ${todo.priority.toLowerCase()}`}
            >
              {todo.priority}
            </span>

            <span className="category">
              {todo.category}
            </span>
          </div>
        </div>
      </div>

      <div className="todo-actions">
        <button
          className="edit-btn"
          onClick={() => onEdit(todo)}
        >
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={() =>
            onDelete(todo._id)
          }
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TodoItem;