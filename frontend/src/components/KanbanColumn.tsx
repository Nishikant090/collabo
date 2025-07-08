import React from 'react';
import TaskCard from './TaskCard';
import type { Task } from './KanbanBoard';

export interface KanbanColumnProps {
  status: Task['status'];
  tasks: Task[];
  moveTask: (taskId: string, status: Task['status']) => void;
  dark?: boolean;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ status, tasks, moveTask, dark }) => {
  // HTML5 drag and drop for column
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    if (taskId) moveTask(taskId, status);
  };
  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      style={{
        flex: 1,
        minWidth: 260,
        maxWidth: 400,
        minHeight: 350,
        background: dark
          ? 'rgba(35,41,70,0.66)'
          : 'rgba(245,248,255,0.68)',
        borderRadius: 22,
        padding: 24,
        margin: '0 12px 32px 12px',
        boxShadow: dark
          ? '0 8px 36px 0px #6366f1aa, 0 1.5px 18px #23294655'
          : '0 8px 36px 0px #6366f1aa, 0 1.5px 18px #a5b4fc55',
        border: dark
          ? '1.5px solid rgba(99,102,241,0.32)'
          : '1.5px solid rgba(99,102,241,0.18)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'background 0.25s, box-shadow 0.18s, border 0.18s',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseOver={e => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = dark
          ? '0 12px 48px 0px #6366f1ee, 0 2px 20px #23294666'
          : '0 12px 48px 0px #6366f1ee, 0 2px 20px #a5b4fc66';
        (e.currentTarget as HTMLDivElement).style.border = dark
          ? '2.2px solid #6366f1'
          : '2.2px solid #6366f1';
      }}
      onMouseOut={e => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = dark
          ? '0 8px 36px 0px #6366f1aa, 0 1.5px 18px #23294655'
          : '0 8px 36px 0px #6366f1aa, 0 1.5px 18px #a5b4fc55';
        (e.currentTarget as HTMLDivElement).style.border = dark
          ? '1.5px solid rgba(99,102,241,0.32)'
          : '1.5px solid rgba(99,102,241,0.18)';
      }}
    >
      <h2 style={{
        color: status === 'Todo' ? '#3b82f6' : status === 'In Progress' ? '#f59e42' : '#22c55e',
        fontWeight: 700,
        fontSize: 22,
        letterSpacing: 1,
        marginBottom: 16,
        textAlign: 'center',
        textShadow: '0 1px 2px rgba(0,0,0,0.04)'
      }}>{status}</h2>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {tasks.map(task => (
          <TaskCard key={task._id} task={task} dark={dark} />
        ))}
      </div>
    </div>
  );
};

export default KanbanColumn;
