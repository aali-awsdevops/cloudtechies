import { useState } from 'react';

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';

function RegisterForm({ onSwitchToLogin }) {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setStatus('');

    if (!username || !name || !email || !password) {
      setStatus('error');
      setMessage('Please fill in all registration fields.');
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          password,
          email,
          fullName: name,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setStatus('success');
        setMessage('Registration successful. Please login now.');
        setUsername('');
        setPassword('');
        setEmail('');
        setName('');
      } else {
        setStatus('error');
        setMessage(data.message || 'Registration failed.');
      }
    } catch (error) {
      console.error('Register error:', error);
      setStatus('error');
      setMessage(error.message || 'Unable to reach backend.');
    }
  };

  return (
    <form className="login-form" onSubmit={handleRegisterSubmit}>
      <h2>Registration</h2>
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
        Full Name
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Mohammad AszadAli"
          required
        />
      </label>
      <label>
        Email
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="mss.mohammadaszadali@gmail.com"
          required
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Create a password"
          required
        />
      </label>
      <button type="submit">Register</button>
      <div className="form-links">
        <button type="button" className="link-button" onClick={onSwitchToLogin}>
          Back to login
        </button>
      </div>
      {message && (
        <div className={`message ${status === 'success' ? 'success' : 'error'}`}>
          {message}
        </div>
      )}
    </form>
  );
}

export default RegisterForm;
