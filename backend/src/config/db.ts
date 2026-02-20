import mongoose from 'mongoose';

// =====================
// MONGODB CONNECTION
// =====================

const connectDB = async (): Promise<void> => {
  try {
    // Get MongoDB URI from environment variables
    const mongoURI = process.env.MONGO_URI;

    // Check if MONGO_URI exists
    if (!mongoURI) {
      throw new Error('MONGO_URI is not defined in .env file');
    }

    // Connect to MongoDB
    const conn = await mongoose.connect(mongoURI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database Name: ${conn.connection.name}`);

  } catch (error: any) {
    console.error('MongoDB Connection Error:', error.message);
    
    // Exit process with failure
    process.exit(1);
  }
};

// =====================
// CONNECTION EVENTS
// =====================

// When successfully connected
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB');
});

// If connection throws an error
mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

// When connection is disconnected
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected from MongoDB');
});

// If Node process ends, close the Mongoose connection
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('Mongoose connection closed due to app termination');
  process.exit(0);
});

export default connectDB;
