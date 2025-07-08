import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000';

const ActivityLog: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const socket = io(SOCKET_URL);
    socket.on('logUpdated', (log: string) => {
      setLogs(prev => [log, ...prev]);
    });
    return () => { socket.disconnect(); };
  }, []);

  return (
    <div style={{background: '#222', color: '#fff', padding: 16, borderRadius: 8, minHeight: 120, maxHeight: 240, overflowY: 'auto'}}>
      <h3>Activity Log</h3>
      <ul style={{paddingLeft: 16}}>
        {logs.map((log, idx) => <li key={idx}>{log}</li>)}
      </ul>
    </div>
  );
};

export default ActivityLog;
