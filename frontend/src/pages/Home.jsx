import { useEffect, useState } from "react";

import Header from "../components/Header";
import TodoForm from "../components/TodoForm";
import TodoFilters from "../components/TodoFilters";
import TodoList from "../components/TodoList";

import { getTodos, createTodo, updateTodo, deleteTodo } from "../api/todoApi";

function Home() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [editTodo, setEditTodo] = useState(null);

  const [filter, setFilter] = useState("All");

  const [search, setSearch] = useState("");

  // FETCH TODOS
  const fetchTodos = async () => {
    try {
      setLoading(true);

      const response = await getTodos();

      setTodos(response.data);
    } catch (error) {
      setError("Failed to fetch todos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // ADD TODO
  const handleAddTodo = async (data) => {
    try {
      await createTodo(data);

      fetchTodos();
    } catch (error) {
      setError("Failed to add todo");
    }
  };

  // DELETE TODO
  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id);

      fetchTodos();
    } catch (error) {
      setError("Failed to delete todo");
    }
  };

  // EDIT TODO
  const handleEditTodo = (todo) => {
    setEditTodo(todo);
  };

  // UPDATE TODO
  const handleUpdateTodo = async (data) => {
    try {
      await updateTodo(editTodo._id, data);

      setEditTodo(null);

      fetchTodos();
    } catch (error) {
      setError("Failed to update todo");
    }
  };

  // TOGGLE COMPLETE
  const handleToggleTodo = async (todo) => {
    try {
      await updateTodo(todo._id, {
        completed: !todo.completed,
      });

      fetchTodos();
    } catch (error) {
      setError("Failed to update task");
    }
  };

  // FILTER TODOS
  const filteredTodos = todos

    .filter((todo) => {
      if (filter === "Completed") {
        return todo.completed;
      }

      if (filter === "Pending") {
        return !todo.completed;
      }

      return true;
    })

    .filter((todo) => todo.text.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="app-wrapper">
      <div className="app-container">
        <Header />

        <TodoForm
          onSubmit={editTodo ? handleUpdateTodo : handleAddTodo}
          editTodo={editTodo}
          clearEdit={() => setEditTodo(null)}
        />

        <TodoFilters
          filter={filter}
          setFilter={setFilter}
          search={search}
          setSearch={setSearch}
        />

        {loading && <p className="loading">Loading tasks...</p>}

        {error && <p className="error">{error}</p>}

        {!loading && (
          <TodoList
            todos={filteredTodos}
            onDelete={handleDeleteTodo}
            onEdit={handleEditTodo}
            onToggle={handleToggleTodo}
          />
        )}
      </div>
    </div>
  );
}

export default Home;
