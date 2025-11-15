import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// ************* IMPORTANT *************
const uri = process.env.MONGO_URI; 
// *************************************

if (!uri) {
  console.error("❌ ERROR: MONGO_URI is undefined. Check your .env file!");
  process.exit(1);
}

const client = new MongoClient(uri);

let db;

async function connectToDatabase() {
  try {
    await client.connect();
    db = client.db("mydatabase");
    console.log("✅ Connected to MongoDB Atlas");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}

connectToDatabase();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
