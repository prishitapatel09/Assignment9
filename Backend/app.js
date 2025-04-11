const express = require('express');
const connectDB = require('./db');
const userRoutes = require('./routes/userRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger');
const cors = require('cors');
const jobRoutes = require('./routes/jobRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors()); // Allow all origins during development
app.use(express.json());
app.use('/user', userRoutes);
app.use('/images', express.static('images')); // Serve images statically
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs)); // Swagger UI
app.use('/jobs', jobRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

// Start Server
const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});