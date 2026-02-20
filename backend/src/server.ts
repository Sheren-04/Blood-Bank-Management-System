import app from './app';
import connectDB from './config/db';
import dotenv from 'dotenv';
import { seedInventory } from "./utils/seedInventory";

dotenv.config();

// =====================
// ENVIRONMENT VARIABLES
// =====================

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// =====================
// START SERVER
// =====================

const startServer = async () => {
  try {
    // 1. Connect to MongoDB
    await connectDB();
    await seedInventory();
    console.log('Database connected successfully');

    // 2. Start Express server
    app.listen(PORT, () => {
      console.log('==========================================');
      console.log(`Server running in ${NODE_ENV} mode`);
      console.log(`Server URL: http://localhost:${PORT}`);
      console.log(`API Base: http://localhost:${PORT}/api`);
      console.log('==========================================');
    });

  } catch (error) {
    console.error('Server startup failed:', error);
    process.exit(1); // Exit with failure code
  }
};

// =====================
// GRACEFUL SHUTDOWN
// =====================

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  console.error('Unhandled Promise Rejection:', err.message);
  console.log('Shutting down server...');
  process.exit(1);
});

// Handle SIGTERM signal (e.g., Ctrl+C)
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  process.exit(0);
});

// Start the server
startServer();
