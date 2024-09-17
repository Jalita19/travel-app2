// Load environment variables from .env file
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import usersRoutes from './routes/usersRoutes.js';
import destinationsRoutes from './routes/destinationsRoutes.js';
import reviewsRoutes from './routes/reviewsRoutes.js';



const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
// Use Routes
app.use('/api/users', usersRoutes);
app.use('/api/destinations', destinationsRoutes);
app.use('/api/reviews', reviewsRoutes);


// Connect to MongoDB directly using mongoose
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1);
  }
};

connectDB();


// Basic Route
app.get('/', (req, res) => {
  res.send('Welcome to the Travel API!');
});

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;