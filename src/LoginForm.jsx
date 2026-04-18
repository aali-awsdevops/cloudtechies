import { useState } from 'react';

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8081';

function LoginForm({ onSwitchToRegister, onLoginSuccess }) {
  const [mode, setMode] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setStatus('');

    try {
      const response = await fetch(`${backendUrl}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setStatus('success');
        setMessage(data.message || 'Login successful');
        onLoginSuccess(username);
      } else {
        setStatus('error');
        setMessage(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setStatus('error');
      setMessage(error.message || 'Unable to reach backend.');
    }
  };

  const handleForgotSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setStatus('');

    if (!username) {
      setStatus('error');
      setMessage('Please enter your username.');
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/api/login/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      });

      const data = await response.json();
      if (response.ok) {
        setStatus('success');
        setMessage(data.message || 'Password reset token created.');
      } else {
        setStatus('error');
        setMessage(data.message || 'Password reset failed.');
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      setStatus('error');
      setMessage(error.message || 'Unable to reach backend.');
    }
  };

  const handleResetSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setStatus('');

    if (!username || !resetToken || !password) {
      setStatus('error');
      setMessage('Please enter username, reset token and new password.');
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/api/login/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, resetToken, newPassword: password }),
      });

      const data = await response.json();
      if (response.ok) {
        setStatus('success');
        setMessage(data.message || 'Password has been reset successfully.');
        setMode('login');
        setPassword('');
        setResetToken('');
      } else {
        setStatus('error');
        setMessage(data.message || 'Password reset failed.');
      }
    } catch (error) {
      console.error('Reset password error:', error);
      setStatus('error');
      setMessage(error.message || 'Unable to reach backend.');
    }
  };

  const switchToForgot = () => {
    setMode('forgot');
    setMessage('');
    setStatus('');
    setPassword('');
    setResetToken('');
  };

  const switchToReset = () => {
    setMode('reset');
    setMessage('');
    setStatus('');
  };

  const switchToLogin = () => {
    setMode('login');
    setMessage('');
    setStatus('');
    setPassword('');
    setResetToken('');
  };

  return (
    <div className="login-form-shell">
      {mode === 'login' ? (
        <form className="login-form" onSubmit={handleLoginSubmit}>
          <h2>Login</h2>
          <label>
            Username
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="admin"
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="P@ssw0rd"
              required
            />
          </label>
          <button type="submit">Login</button>
          <div className="form-links">
            <button type="button" className="link-button" onClick={switchToForgot}>
              Forgot password?
            </button>
            <button type="button" className="link-button" onClick={onSwitchToRegister}>
              Sign up
            </button>
          </div>
          {message && (
            <div className={`message ${status === 'success' ? 'success' : 'error'}`}>
              {message}
            </div>
          )}
        </form>
      ) : mode === 'reset' ? (
        <form className="login-form" onSubmit={handleResetSubmit}>
          <h2>Reset Password</h2>
          <label>
            Username
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="aali"
              required
            />
          </label>
          <label>
            Reset Token
            <input
              type="text"
              value={resetToken}
              onChange={(event) => setResetToken(event.target.value)}
              placeholder="Enter your reset token"
              required
            />
          </label>
          <label>
            New Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="New password"
              required
            />
          </label>
          <button type="submit">Reset Password</button>
          <div className="form-links">
            <button type="button" className="link-button" onClick={switchToLogin}>
              Back to login
            </button>
          </div>
          {message && (
            <div className={`message ${status === 'success' ? 'success' : 'error'}`}>
              {message}
            </div>
          )}
        </form>
      ) : (
        <form className="login-form" onSubmit={handleForgotSubmit}>
          <h2>Forgot Password</h2>
          <label>
            Username
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="aali"
              required
            />
          </label>
          <button type="submit">Send Reset Token</button>
          <div className="form-links">
            <button type="button" className="link-button" onClick={switchToReset}>
              Use reset token
            </button>
            <button type="button" className="link-button" onClick={switchToLogin}>
              Back to login
            </button>
          </div>
          {message && (
            <div className={`message ${status === 'success' ? 'success' : 'error'}`}>
              {message}
            </div>
          )}
        </form>
      )}
    </div>
  );
}

export default LoginForm;
