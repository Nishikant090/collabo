import React from 'react';

import type { Task } from './KanbanBoard';

interface TaskCardProps {
  task: Task;
  dark?: boolean;
}
const TaskCard: React.FC<TaskCardProps> = ({ task, dark }) => {
  // HTML5 drag and drop for task card
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('taskId', task._id);
  };
  // Animation and style handlers
  const handleMouseOver = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'scale(1.03)';
    e.currentTarget.style.border = dark ? '1.5px solid #6366f1' : '1.5px solid #3b82f6';
  };
  const handleMouseOut = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'scale(1)';
    e.currentTarget.style.border = dark ? '1.5px solid #343850' : '1.5px solid #f3f4f6';
  };
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.boxShadow = '0 4px 16px rgba(59,130,246,0.12)';
  };
  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.boxShadow = dark ? '0 2px 16px rgba(36,37,50,0.22)' : '0 2px 10px rgba(0,0,0,0.08)';
  };
  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.boxShadow = dark ? '0 2px 16px rgba(36,37,50,0.22)' : '0 2px 10px rgba(0,0,0,0.08)';
  };
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    e.currentTarget.style.boxShadow = '0 4px 16px rgba(59,130,246,0.12)';
  };
  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    e.currentTarget.style.boxShadow = dark ? '0 2px 16px rgba(36,37,50,0.22)' : '0 2px 10px rgba(0,0,0,0.08)';
  };
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'scale(1.03)';
  };
  const handleTouchCancel = (e: React.TouchEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'scale(1)';
  };

  return (
    <div
      className="task-card"
      style={{
        background: dark ? 'linear-gradient(120deg,#232946 40%,#16161a 100%)' : '#fff',
        color: dark ? '#f4f4f4' : '#222',
        marginBottom: 12,
        padding: 'clamp(12px, 3vw, 20px)',
        borderRadius: 12,
        boxShadow: dark ? '0 2px 16px rgba(36,37,50,0.22)' : '0 2px 10px rgba(0,0,0,0.08)',
        borderLeft: `6px solid ${task.priority === 'High' ? '#ef4444' : task.priority === 'Medium' ? '#f59e42' : '#22c55e'}`,
        cursor: 'grab',
        transition: 'box-shadow 0.2s, transform 0.18s, border 0.18s',
        userSelect: 'none',
        maxWidth: 400,
        width: '100%',
        minWidth: 0,
        position: 'relative',
        border: dark ? '1.5px solid #343850' : '1.5px solid #f3f4f6',
      }}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      draggable
      onDragStart={handleDragStart}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
      onTouchCancel={handleTouchCancel}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <span style={{
          display: 'inline-block',
          width: 10,
          height: 10,
          borderRadius: '50%',
          background: task.priority === 'High' ? '#ef4444' : task.priority === 'Medium' ? '#f59e42' : '#22c55e',
        }} />
        <h3 style={{
          margin: 0,
          fontSize: 'clamp(15px, 3vw, 20px)',
          color: '#222',
          fontWeight: 600,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          flex: 1,
        }}>{task.title}</h3>
      </div>
      <p style={{
        margin: 0,
        marginBottom: 10,
        color: '#555',
        fontSize: 'clamp(13px, 2.5vw, 16px)',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}>{task.description}</p>
      <div style={{ display: 'flex', gap: 10, fontSize: 13, color: '#666', marginBottom: 4, flexWrap: 'wrap' }}>
        <span style={{ fontWeight: 500 }}>Priority:</span> <span>{task.priority}</span>
        <span style={{ fontWeight: 500, marginLeft: 12 }}>Status:</span> <span>{task.status}</span>
      </div>
      {task.assignedTo && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, color: dark ? '#a3bffa' : '#3b82f6', marginTop: 8 }}>
          <img
            src={task.assignedTo.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(task.assignedTo.name)}&background=${dark ? '232946' : '3b82f6'}&color=fff&rounded=true&size=32`}
            alt={task.assignedTo.name}
            style={{ width: 32, height: 32, borderRadius: '50%', marginRight: 7, border: dark ? '2px solid #343850' : '2px solid #e0e7ef', background: '#fff', boxShadow: '0 2px 8px #a5b4fc22' }}
          />
          <span style={{ fontWeight: 600 }}>{task.assignedTo.name}</span>
        </div>
      )}
    </div>
  );
};

export default TaskCard;

