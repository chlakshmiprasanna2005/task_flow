  import { useEffect, useState } from "react";

  function TodoForm({
    onSubmit,
    editTodo,
    clearEdit,
  }) {

    const [text, setText] =
      useState("");

    const [priority, setPriority] =
      useState("Medium");

    const [category, setCategory] =
      useState("General");

    // FILL INPUTS DURING EDIT
    useEffect(() => {

      if (editTodo) {

        setText(editTodo.text);

        setPriority(
          editTodo.priority
        );

        setCategory(
          editTodo.category
        );
      }

    }, [editTodo]);

    // HANDLE SUBMIT
    const handleSubmit = (e) => {

      e.preventDefault();

      if (!text.trim()) return;

      onSubmit({
        text,
        priority,
        category,
      });

      // RESET FORM
      setText("");

      setPriority("Medium");

      setCategory("General");
    };

    return (

      <form
        className="todo-form"
        onSubmit={handleSubmit}
      >

        {/* TASK INPUT */}

        <input
          type="text"
          placeholder="What needs to be done?"
          value={text}
          onChange={(e) =>
            setText(e.target.value)
          }
          className="todo-input"
        />

        {/* PRIORITY + CATEGORY */}

        <div className="form-row">

          <select
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value)
            }
            className="select"
          >

            <option>Low</option>

            <option>Medium</option>

            <option>High</option>

          </select>

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="select"
          />

        </div>

        {/* BUTTONS */}

        <div className="button-group">

          <button className="primary-btn">

            {
              editTodo
                ? "Update Task"
                : "Add Task"
            }

          </button>

          {
            editTodo && (

              <button
                type="button"
                className="secondary-btn"
                onClick={clearEdit}
              >

                Cancel

              </button>
            )
          }

        </div>

      </form>
    );
  }

  export default TodoForm;