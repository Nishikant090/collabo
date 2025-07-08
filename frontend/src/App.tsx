import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import { UserProvider, useUser } from './context/UserContext';
import { DndProvider, HTML5Backend } from './components/dnd';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useUser();
  const location = useLocation();
  if (loading) return <div style={{ textAlign: 'center', marginTop: 80 }}>Loading...</div>;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  return children;
};

const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useUser();
  if (loading) return <div style={{ textAlign: 'center', marginTop: 80 }}>Loading...</div>;
  if (user) return <Navigate to="/" replace />;
  return children;
};

const App = () => {
  return (
    <UserProvider>
      <DndProvider backend={HTML5Backend}>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />
          <Route path="/register" element={<AuthRoute><Register /></AuthRoute>} />
        </Routes>
      </DndProvider>
    </UserProvider>
  );
};

export default App;
