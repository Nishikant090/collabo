import React, { useState } from 'react';

interface AddTaskModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (task: { title: string; description: string; priority: string; assignedTo?: string }) => void;
}

const priorities = ['Low', 'Medium', 'High'];

const AddTaskModal: React.FC<AddTaskModalProps> = ({ open, onClose, onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [assignedTo, setAssignedTo] = useState('');

  if (!open) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(0,0,0,0.25)', zIndex: 2001, display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{
        background: '#fff', borderRadius: 16, boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
        padding: 32, width: 'clamp(320px, 90vw, 400px)', position: 'relative', display: 'flex', flexDirection: 'column', gap: 18
      }}>
        <button onClick={onClose} style={{ position: 'absolute', right: 18, top: 14, background: 'none', border: 'none', fontSize: 22, color: '#888', cursor: 'pointer' }}>×</button>
        <h2 style={{ margin: 0, fontSize: 22, color: '#222', fontWeight: 700 }}>Add New Task</h2>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" style={{ fontSize: 16, padding: 8, borderRadius: 6, border: '1px solid #ddd' }} />
        <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" style={{ fontSize: 15, padding: 8, borderRadius: 6, border: '1px solid #ddd', resize: 'vertical', minHeight: 48 }} />
        <div style={{ display: 'flex', gap: 12 }}>
          <select value={priority} onChange={e => setPriority(e.target.value)} style={{ fontSize: 15, padding: 6, borderRadius: 6, border: '1px solid #ddd' }}>
            {priorities.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          <input value={assignedTo} onChange={e => setAssignedTo(e.target.value)} placeholder="Assign to (name)" style={{ fontSize: 15, padding: 6, borderRadius: 6, border: '1px solid #ddd', flex: 1 }} />
        </div>
        <button
          onClick={() => {
            if (title.trim()) {
              onAdd({ title, description, priority, assignedTo: assignedTo.trim() });
              setTitle(''); setDescription(''); setPriority('Medium'); setAssignedTo('');
              onClose();
            }
          }}
          style={{
            marginTop: 12, background: 'linear-gradient(90deg,#3b82f6,#6366f1)', color: '#fff',
            fontWeight: 600, border: 'none', borderRadius: 8, padding: '12px 0', fontSize: 16, cursor: 'pointer', boxShadow: '0 2px 8px rgba(59,130,246,0.13)'
          }}
        >Add Task</button>
      </div>
    </div>
  );
};

export default AddTaskModal;
