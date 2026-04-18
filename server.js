import express from 'express';
import pinoHttp from 'express-pino-logger';
import crypto from 'crypto';
import logger from './logger.js';

const app = express();
const port = 8081;

app.use(express.json());
app.use(pinoHttp({ logger }));

const users = [
  {
    username: 'aali',
    password: 'sbfsajbj@786',
    email: 'aali@example.com',
    fullName: 'Aali Example',
  },
];

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ status: 'error', message: 'Username and password are required.' });
  }

  const user = users.find((item) => item.username === username);
  if (!user || user.password !== password) {
    return res.status(401).json({ status: 'error', message: 'Invalid username or password.' });
  }

  return res.json({ status: 'success', message: 'Login successful' });
});

app.post('/api/users', (req, res) => {
  const { username, password, email, fullName } = req.body;

  if (!username || !password || !email || !fullName) {
    return res.status(400).json({ status: 'error', message: 'All registration fields are required.' });
  }

  const existingUser = users.find((item) => item.username === username || item.email === email);
  if (existingUser) {
    return res.status(409).json({ status: 'error', message: 'User already exists.' });
  }

  users.push({ username, password, email, fullName });
  return res.status(201).json({ status: 'success', message: 'Registration successful' });
});

const passwordResetTokens = new Map();

app.post('/api/login/forgot-password', (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ status: 'error', message: 'Username is required.' });
  }

  const user = users.find((item) => item.username === username);
  if (!user) {
    return res.status(404).json({ status: 'error', message: 'User not found.' });
  }

  const token = crypto.randomUUID();
  passwordResetTokens.set(username, token);

  return res.json({
    status: 'success',
    message: `Password reset token created: ${token}`,
    token,
  });
});

app.post('/api/login/reset-password', (req, res) => {
  const { username, resetToken, newPassword } = req.body;

  if (!username || !resetToken || !newPassword) {
    return res.status(400).json({ status: 'error', message: 'Username, reset token, and new password are required.' });
  }

  const expectedToken = passwordResetTokens.get(username);
  if (!expectedToken || expectedToken !== resetToken) {
    return res.status(401).json({ status: 'error', message: 'Invalid or expired reset token.' });
  }

  const user = users.find((item) => item.username === username);
  if (!user) {
    return res.status(404).json({ status: 'error', message: 'User not found.' });
  }

  user.password = newPassword;
  passwordResetTokens.delete(username);

  return res.json({ status: 'success', message: 'Password has been reset successfully.' });
});

app.listen(port, () => {
  logger.info({ port }, 'Authentication API running');
});
