import TodoItem from "./TodoItem";
import EmptyState from "./EmptyState";

function TodoList(props) {
  const { todos, onDelete, onEdit, onToggle } = props;

  if (todos.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onDelete={onDelete}
          onEdit={onEdit}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}

export default TodoList;
  