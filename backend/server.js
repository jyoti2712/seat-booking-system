import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import seatRoutes from './routes/seatRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/seats', seatRoutes);

// Health Check
app.get('/', (req, res) => {
  res.send('Train Seat Booking API is running');
});

// Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
