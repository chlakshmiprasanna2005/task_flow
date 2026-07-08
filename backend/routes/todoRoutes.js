const express = require("express");

const router = express.Router();

const Todo = require("../models/Todo");

// GET ALL TODOS
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find().sort({
      createdAt: -1,
    });

    res.status(200).json(todos);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// CREATE TODO
router.post("/", async (req, res) => {
  try {
    console.log(req.body);

    const todo = await Todo.create(req.body);

    res.status(201).json(todo);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// UPDATE TODO
router.put("/:id", async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,

      req.body,

      {
        new: true,
      },
    );

    res.status(200).json(updatedTodo);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// DELETE TODO
router.delete("/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Todo Deleted",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
