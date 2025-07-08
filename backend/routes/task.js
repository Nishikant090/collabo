// routes/task.js

const express = require('express');
const router = express.Router();

const { smartAssignTask } = require('../services/taskService');
const Task = require('../models/Task');
const authMiddleware = require('../middleware/authMiddleware');

// Create a new task with smart assignment
router.post('/tasks', authMiddleware, async (req, res) => {
  try {
    const task = await smartAssignTask(req.body);
    res.status(201).json(task);
  } catch (err) {
    console.error('Error assigning task:', err);
    res.status(500).json({ message: 'Failed to assign task', error: err.message });
  }
});

// Get all tasks
router.get('/tasks', authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find().populate('assignedTo', 'name email');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch tasks', error: err.message });
  }
});

// Get a single task by ID
router.get('/tasks/:id', authMiddleware, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('assignedTo', 'name email');
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch task', error: err.message });
  }
});

// Update a task
router.put('/tasks/:id', authMiddleware, async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    if (!updatedTask) return res.status(404).json({ message: 'Task not found' });
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update task', error: err.message });
  }
});

// Delete a task
router.delete('/tasks/:id', authMiddleware, async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete task', error: err.message });
  }
});

module.exports = router;
