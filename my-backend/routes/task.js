// routes/task.js

const express = require('express');
const router = express.Router();

const { smartAssignTask } = require('../services/taskService');

// Create a new task with smart assignment
router.post('/tasks', async (req, res) => {
  try {
    const task = await smartAssignTask(req.body);
    res.status(201).json(task);
  } catch (err) {
    console.error('Error assigning task:', err);
    res.status(500).json({ message: 'Failed to assign task', error: err.message });
  }
});

module.exports = router;
