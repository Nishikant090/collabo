const Task = require('../models/Task');
const User = require('../models/User');

async function smartAssignTask(newTaskData) {
  // Step 1: Get task counts for each user
  const taskCounts = await Task.aggregate([
    {
      $match: {
        status: { $in: ['Todo', 'In Progress'] }
      }
    },
    {
      $group: {
        _id: '$assignedTo',
        count: { $sum: 1 }
      }
    }
  ]);

  // Convert to a map for easier lookup
  const userTaskMap = {};
  taskCounts.forEach(entry => {
    userTaskMap[entry._id] = entry.count;
  });

  // Step 2: Get all users
  const users = await User.find();

  // Step 3: Find the user with the fewest tasks
  let minTasks = Infinity;
  let selectedUser = null;

  users.forEach(user => {
    const taskCount = userTaskMap[user._id?.toString()] || 0;
    if (taskCount < minTasks) {
      minTasks = taskCount;
      selectedUser = user;
    }
  });

  // Step 4: Assign the task to selectedUser
  const newTask = new Task({
    ...newTaskData,
    assignedTo: selectedUser._id
  });

  await newTask.save();
  return newTask;
}
