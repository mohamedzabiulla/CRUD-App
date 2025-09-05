import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import userRoutes from './routes/user.routes';      // Register routes
import authRoutes from './routes/auth';      // Login routes (create this file if not already)
 
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // or configure with { origin: 'http://localhost:5173', credentials: true } if needed
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1/users', userRoutes);     // For registration
app.use('/api/v1/auth', authRoutes);      // For login

// DB Connection and Server Start
mongoose.connect(process.env.MONGO_URI as string, {
  // useNewUrlParser: true, useUnifiedTopology: true - no longer required in latest mongoose
})
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));
