import KanbanBoard from '../components/KanbanBoard';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Kanban Board</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <KanbanBoard />
      <div style={{marginTop: 32}}>
        <ActivityLog />
      </div>
    </div>
  );
};

import ActivityLog from '../components/ActivityLog';

export default Home;
