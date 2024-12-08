import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import LoginForm from './components/LoginForm';
import Dashboard from './pages/Dashboard';
import { initializeMasterUser } from './utils/auth';

function App() {
  useEffect(() => {
    initializeMasterUser();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route 
          path="/dashboard/*" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
        />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default App;