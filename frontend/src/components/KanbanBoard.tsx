import React, { useEffect, useState, useCallback } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

import { io, Socket } from 'socket.io-client';
import TaskCard from './TaskCard';
import AddTaskModal from './AddTaskModal';
import update from 'immutability-helper';
import KanbanColumn from './KanbanColumn';

const API_URL = 'http://localhost:5000/api';
const SOCKET_URL = 'http://localhost:5000';

export type Task = {
  _id: string;
  title: string;
  description: string;
  status: 'Todo' | 'In Progress' | 'Done';
  priority: 'Low' | 'Medium' | 'High';
  assignedTo?: { name: string; email: string; };
  updatedAt: string;
};

const columns = [
  { key: 'Todo', label: 'To Do' },
  { key: 'In Progress', label: 'In Progress' },
  { key: 'Done', label: 'Done' },
];

const demoUsers = [
  { name: 'Alice', email: 'alice@example.com', avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
  { name: 'Bob', email: 'bob@example.com', avatar: 'https://randomuser.me/api/portraits/men/35.jpg' },
  { name: 'Carol', email: 'carol@example.com', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { name: 'Dave', email: 'dave@example.com', avatar: 'https://randomuser.me/api/portraits/men/23.jpg' },
  { name: 'Eva', email: 'eva@example.com', avatar: 'https://randomuser.me/api/portraits/women/12.jpg' },
  { name: 'Frank', email: 'frank@example.com', avatar: 'https://randomuser.me/api/portraits/men/51.jpg' },
];


const KanbanBoard: React.FC = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([
    {
      _id: '1',
      title: 'Design Landing Page',
      description: 'Create a modern landing page for the app.',
      status: 'Todo',
      priority: 'High',
      assignedTo: demoUsers[0],
      updatedAt: new Date().toISOString(),
    },
    {
      _id: '2',
      title: 'Setup Backend API',
      description: 'Implement REST API with authentication.',
      status: 'In Progress',
      priority: 'Medium',
      assignedTo: demoUsers[1],
      updatedAt: new Date().toISOString(),
    },
    {
      _id: '3',
      title: 'Write Documentation',
      description: 'Document all endpoints and features.',
      status: 'Todo',
      priority: 'Low',
      assignedTo: demoUsers[2],
      updatedAt: new Date().toISOString(),
    },
    {
      _id: '4',
      title: 'Add Unit Tests',
      description: 'Increase code coverage to 80%.',
      status: 'Done',
      priority: 'Medium',
      assignedTo: demoUsers[3],
      updatedAt: new Date().toISOString(),
    },
    {
      _id: '5',
      title: 'Deploy to Netlify',
      description: 'Set up CI/CD and deploy the frontend.',
      status: 'In Progress',
      priority: 'High',
      assignedTo: demoUsers[4],
      updatedAt: new Date().toISOString(),
    },
    {
      _id: '6',
      title: 'User Feedback Survey',
      description: 'Collect feedback from beta users.',
      status: 'Done',
      priority: 'Low',
      assignedTo: demoUsers[5],
      updatedAt: new Date().toISOString(),
    },
  ]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [dark, setDark] = useState(false);
  const [toast, setToast] = useState<string|null>(null);

  useEffect(() => {
    fetch(`${API_URL}/tasks`, {
      headers: { 'Authorization': localStorage.getItem('token') || '' }
    })
      .then(res => res.json())
      .then(setTasks);
    const s = io(SOCKET_URL);
    setSocket(s);
    s.on('taskUpdated', (task: Task) => {
      setTasks(prev => {
        const idx = prev.findIndex(t => t._id === task._id);
        if (idx !== -1) return update(prev, { [idx]: { $set: task } });
        return [task, ...prev];
      });
    });
    return () => { s.disconnect(); };
  }, []);

  const moveTask = useCallback((taskId: string, status: Task['status']) => {
    setTasks(prev => prev.map(task => task._id === taskId ? { ...task, status } : task));
    fetch(`${API_URL}/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token') || ''
      },
      body: JSON.stringify({ status })
    });
    socket?.emit('updateTask', { _id: taskId, status });
  }, [socket]);

  return (
    <>
      {/* Sticky Professional Header */}
      {/* Decorative SVG Background */}
      <svg
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
          pointerEvents: 'none',
          opacity: dark ? 0.18 : 0.12,
        }}
        width="100%" height="100%" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="bg-gradient" cx="50%" cy="50%" r="80%" fx="50%" fy="50%" gradientUnits="userSpaceOnUse">
            <stop stopColor={dark ? '#6366f1' : '#a5b4fc'} stopOpacity="0.4" />
            <stop offset="1" stopColor={dark ? '#232946' : '#f0f4ff'} stopOpacity="0.1" />
          </radialGradient>
        </defs>
        <ellipse cx="720" cy="450" rx="900" ry="400" fill="url(#bg-gradient)" />
        <ellipse cx="200" cy="100" rx="300" ry="120" fill="#3b82f6" opacity="0.13" />
        <ellipse cx="1240" cy="800" rx="260" ry="110" fill="#6366f1" opacity="0.11" />
      </svg>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          zIndex: 10,
          background: 'rgba(255,255,255,0.97)',
          boxShadow: '0 2px 12px #6366f122',
          padding: '0 32px',
          height: 72,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <img
          src="https://ui-avatars.com/api/?name=Kanban&background=3b82f6&color=fff&rounded=true&size=40"
          alt="Kanban Logo"
          style={{ width: 44, height: 44, borderRadius: '50%', boxShadow: dark ? '0 2px 8px #232946' : '0 2px 8px #3b82f6' }}
        />
        <h1 style={{ fontSize: 32, fontWeight: 800, color: dark ? '#fff' : '#232946', letterSpacing: 2, margin: 0, textShadow: dark ? '0 2px 8px #16161a' : '0 2px 8px #a5b4fc' }}>Kanban Board</h1>
        <button
          style={{
            marginLeft: 'auto',
            marginRight: 12,
            background: 'linear-gradient(90deg,#6366f1 0%,#3b82f6 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: 12,
            padding: '10px 26px',
            fontWeight: 700,
            fontSize: 18,
            cursor: 'pointer',
            boxShadow: '0 3px 18px rgba(59,130,246,0.15)',
            transition: 'transform 0.13s, box-shadow 0.18s',
            letterSpacing: 1,
          }}
          onClick={() => setShowAddModal(true)}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(0.96)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          <span style={{ fontSize: 24, marginRight: 8, verticalAlign: 'middle' }}>+</span> Add Task
        </button>
        <button
          style={{
            background: dark ? '#232946' : '#e0e7ff',
            color: dark ? '#fff' : '#232946',
            border: 'none',
            borderRadius: 10,
            padding: '8px 16px',
            fontWeight: 600,
            fontSize: 17,
            cursor: 'pointer',
            boxShadow: dark ? '0 1px 4px #16161a' : '0 1px 4px #a5b4fc',
            marginLeft: 8,
            transition: 'background 0.18s',
          }}
          onClick={() => setDark(d => !d)}
        >{dark ? '🌙 Dark' : '☀️ Light'}</button>
        {user && (
          <div style={{ display: 'inline-flex', alignItems: 'center', marginLeft: 18 }}>
            <span style={{ color: dark ? '#fff' : '#232946', fontWeight: 500, fontSize: 16, marginRight: 10 }}>
              {user.name} <span style={{ color: '#6366f1', fontWeight: 400, fontSize: 13 }}>({user.email})</span>
            </span>
            <button
              style={{
                background: 'linear-gradient(90deg, #6366f1 0%, #3b82f6 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: 9,
                padding: '7px 19px',
                fontWeight: 600,
                fontSize: 15,
                marginLeft: 8,
                cursor: 'pointer',
                boxShadow: '0 2px 12px #6366f133',
                transition: 'background 0.16s, box-shadow 0.16s',
              }}
              onClick={() => { logout(); navigate('/login'); }}
            >Logout</button>
          </div>
        )}
      </header>
      <div
        className="kanban-board"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))',
          gap: 32,
          width: '100vw',
          height: 'calc(100vh - 72px)',
          margin: 0,
          padding: '24px 14px 64px 14px',
          background: 'linear-gradient(120deg, #f8fafc 0%, #e0e7ff 100%)',
          position: 'fixed',
          top: 72,
          left: 0,
          right: 0,
          bottom: 0,
          justifyItems: 'center',
          alignItems: 'start',
          overflowX: 'auto',
          overflowY: 'auto',
          zIndex: 1,
        }}
      >
        {columns.map(col => (
          <KanbanColumn
            key={col.key}
            status={col.key as Task['status']}
            tasks={tasks.filter(task => task.status === col.key)}
            moveTask={moveTask}
            dark={dark}
          />
        ))}
      </div>
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(30px) scale(0.97); }
          to { opacity: 1; transform: none; }
        }
      `}</style>
      {/* Add Task Modal */}
      <AddTaskModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={(task) => {
          setTasks(prev => [
            {
              _id: Math.random().toString(36).slice(2),
              title: task.title,
              description: task.description,
              status: 'Todo',
              priority: task.priority as Task['priority'],
              assignedTo: task.assignedTo ? { name: task.assignedTo, email: '' } : undefined,
              updatedAt: new Date().toISOString(),
            },
            ...prev,
          ]);
          setToast('Task added!');
          setTimeout(() => setToast(null), 2200);
        }}
      />
      {/* Toast notification */}
      {toast && (
        <div style={{
          position: 'fixed',
          bottom: 120,
          right: 36,
          background: dark ? '#232946' : '#fff',
          color: dark ? '#fff' : '#232946',
          borderRadius: 10,
          boxShadow: '0 4px 24px rgba(59,130,246,0.13)',
          padding: '16px 30px',
          fontWeight: 600,
          fontSize: 17,
          zIndex: 2002,
          opacity: 0.98
        }}>{toast}</div>
      )}
      {/* Floating Add Task Button */}
      <button
        style={{
          position: 'fixed',
          bottom: 36,
          right: 36,
          background: 'linear-gradient(90deg, #6366f1 0%, #3b82f6 100%)',
          color: '#fff',
          border: 'none',
          borderRadius: '50%',
          width: 64,
          height: 64,
          fontSize: 38,
          boxShadow: '0 6px 24px rgba(59,130,246,0.18)',
          cursor: 'pointer',
          zIndex: 1200,
          transition: 'background 0.2s, box-shadow 0.2s, transform 0.13s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        title="Add Task"
        onClick={() => setShowAddModal(true)}
        onMouseDown={e => e.currentTarget.style.transform = 'scale(0.94)'}
        onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        <span style={{ marginBottom: 2 }}>+</span>
      </button>
    </>
  );
};

export default KanbanBoard;
