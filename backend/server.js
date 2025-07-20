const app = require("./index.js");
const connectDb = require("./config/db");

const startServer = async () => {
  try {
    // Connect to the database
    await connectDb();
    
    // Start the server
    app.listen(3000, () => {
      console.log("Server is running on port http://localhost:3000");
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();


