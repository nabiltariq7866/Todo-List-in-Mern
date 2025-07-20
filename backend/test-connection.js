const mongoose = require("mongoose");

console.log("🔍 Testing MongoDB Atlas Connection...");
console.log("=====================================");

// Test DNS resolution first
const dns = require('dns').promises;

async function testDNS() {
  try {
    console.log("📡 Testing DNS resolution...");
    const addresses = await dns.resolve4('cluster0.bj9qvqw.mongodb.net');
    console.log("✅ DNS resolution successful:", addresses);
    return true;
  } catch (error) {
    console.log("❌ DNS resolution failed:", error.message);
    return false;
  }
}

async function testConnection() {
  try {
    console.log("\n🔌 Testing MongoDB connection...");
    
    const connectionString = "mongodb+srv://nabiltariq7866:Nabil859@cluster0.bj9qvqw.mongodb.net/todo-app?retryWrites=true&w=majority";
    
    const conn = await mongoose.connect(connectionString, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    
    console.log("✅ MongoDB connection successful!");
    console.log(`📍 Connected to: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    
    await mongoose.connection.close();
    console.log("🔌 Connection closed successfully");
    
  } catch (error) {
    console.log("❌ MongoDB connection failed:", error.message);
    
    if (error.message.includes('EREFUSED') || error.message.includes('querySrv')) {
      console.log("\n🔧 This appears to be a network/DNS issue. Try:");
      console.log("1. Check your internet connection");
      console.log("2. Try using a mobile hotspot or VPN");
      console.log("3. Check if your firewall is blocking the connection");
      console.log("4. Verify the cluster name in MongoDB Atlas dashboard");
    }
  }
}

async function runTests() {
  const dnsWorks = await testDNS();
  
  if (!dnsWorks) {
    console.log("\n⚠️ DNS resolution failed. This suggests a network connectivity issue.");
    console.log("Try using a different network or VPN.");
    return;
  }
  
  await testConnection();
}

runTests(); 