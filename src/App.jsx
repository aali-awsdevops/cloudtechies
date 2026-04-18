import { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import WelcomePage from './WelcomePage';

function App() {
  const [view, setView] = useState('login');
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLoginSuccess = (username) => setLoggedInUser(username);
  const handleLogout = () => {
    setLoggedInUser(null);
    setView('login');
  };

  if (loggedInUser) {
    return <WelcomePage username={loggedInUser} onLogout={handleLogout} />;
  }

  return (
    <div className="app-shell">
      <div className="card">
        <h1>AA Cloudtechies</h1>
        <p className="subtitle">Get your dream job</p>
        <div className="view-toggle">
          <button
            type="button"
            className={view === 'login' ? 'toggle-button active' : 'toggle-button'}
            onClick={() => setView('login')}
          >
            Login
          </button>
          <button
            type="button"
            className={view === 'register' ? 'toggle-button active' : 'toggle-button'}
            onClick={() => setView('register')}
          >
            Register
          </button>
        </div>
        {view === 'register' ? (
          <RegisterForm onSwitchToLogin={() => setView('login')} />
        ) : (
          <LoginForm onSwitchToRegister={() => setView('register')} onLoginSuccess={handleLoginSuccess} />
        )}
      </div>
    </div>
  );
}

export default App;
