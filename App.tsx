
import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import { UserSession } from './types';

const App: React.FC = () => {
  const [session, setSession] = useState<UserSession>({
    username: '',
    isLoggedIn: false
  });

  const handleLogin = (username: string) => {
    setSession({ username, isLoggedIn: true });
  };

  const handleLogout = () => {
    setSession({ username: '', isLoggedIn: false });
  };

  return (
    <div className="min-h-screen">
      {!session.isLoggedIn ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <Dashboard username={session.username} onLogout={handleLogout} />
      )}
    </div>
  );
};

export default App;
