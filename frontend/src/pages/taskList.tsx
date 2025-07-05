// src/pages/TaskList.tsx (Note: .tsx for TypeScript)
import React, { useEffect, useState } from 'react';
import socket from '../socket'; // Adjust path if needed

// Define Task type
type Task = {
  _id: string;
  title: string;
  status: string;
};

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    // Fetch initial tasks
    const fetchTasks = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/tasks'); // Adjust if deployed
        const data: Task[] = await res.json();
        setTasks(data);
      } catch (err) {
        console.error('Error fetching tasks:', err);
      }
    };

    fetchTasks();

    // Listen for updates
    socket.on('taskUpdated', (updatedTask: Task) => {
      console.log('📡 Task updated:', updatedTask);

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        )
      );
    });

    return () => {
      socket.off('taskUpdated');
    };
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>📝 Task List</h2>
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>
              <strong>{task.title}</strong> — {task.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
