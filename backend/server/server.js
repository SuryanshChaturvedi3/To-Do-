const express = require('express');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ success: true, data: { status: 'ok' } });
});

app.use('/tasks', taskRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found.',
  });
});

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    error: error.message || 'Something went wrong.',
  });
});

app.listen(PORT, () => {
  console.log(`Task Manager API running on port ${PORT}`);
});
