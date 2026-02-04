import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Import routes
import adminRoutes from './routes/adminRoutes';
import donorRoutes from './routes/donorRoutes';
import requestRoutes from './routes/requestRoutes';
import contactRoutes from './routes/contactRoutes';

// Load environment variables
dotenv.config();

// Create Express app
const app: Application = express();

// =====================
// MIDDLEWARE SETUP
// =====================

// 1. CORS - Allow frontend to make requests
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Vite default port
  credentials: true
}));

// 2. Body Parser - Parse JSON requests
app.use(express.json());

// 3. URL Encoded - Parse form data
app.use(express.urlencoded({ extended: true }));

// =====================
// ROUTES
// =====================

// Health check route - Test if server is running
app.get('/', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Blood Donation Management System API is running',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/admin', adminRoutes);      // Admin authentication
app.use('/api/donors', donorRoutes);     // Donor management
app.use('/api/requests', requestRoutes); // Blood requests
app.use('/api/contact', contactRoutes);  // Contact messages

// =====================
// ERROR HANDLING
// =====================

// Handle 404 - Route not found
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// Global error handler
app.use((err: any, _req: Request, res: Response, _next: any) => {
  console.error('Error:', err.stack);
  
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

export default app;