const mongoose = require("mongoose");

// Database connection options
const connectionOptions = {
  serverSelectionTimeoutMS: 15000, // 15 seconds timeout
  socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true,
  }
};

const connectDb = async () => {
  try {
    console.log("Attempting to connect to MongoDB Atlas...");
    
    // Use the most reliable connection string format
    const connectionString = "mongodb+srv://nabiltariq7866:Nabil859@cluster0.bj9qvqw.mongodb.net/todo-app?retryWrites=true&w=majority";
    
    const conn = await mongoose.connect(connectionString, connectionOptions);
    
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    
    // Set up connection event listeners
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ MongoDB disconnected');
    });
    
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('🔌 MongoDB connection closed through app termination');
      process.exit(0);
    });
    
    return conn;
  } catch (error) {
    console.error("Error connecting to database:", error.message);
    process.exit(1);
  }
};

module.exports = connectDb;