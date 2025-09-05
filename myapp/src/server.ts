import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes'; // ✅ Make sure this path is correct
import cors from "cors"
dotenv.config(); // Load environment variables
const app = express();
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/v1/users', userRoutes); // Your route URL

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI || '')
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Failed to connect to MongoDB:', error);
  });
