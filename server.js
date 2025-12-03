import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import morgan from "morgan";
import { fileURLToPath } from "url";
import cors from "cors";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("short"));
app.use(cors());



// Load environment variables
const PORT = process.env.PORT || 3000;
const uri = process.env.MONGO_URI;

if (!uri) {
  console.error("❌ ERROR: MONGO_URI is undefined. Check your .env file!");
  process.exit(1);
}

// MongoDB connection
const client = new MongoClient(uri);
let db;

async function connectToDatabase() {
  try {
    await client.connect();
    db = client.db("Shopping");
    console.log("✅ Connected to MongoDB Atlas");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}

connectToDatabase();

// Logger middleware
app.use(function (req, res, next) {
  console.log("Request date:", new Date());
  console.log("Request URL:", req.url);
  console.log("Request Method:", req.method);
  next();
});

// Serve images
const imagesPath = path.resolve(__dirname, "images");

app.use("/images", (req, res, next) => {
  const filePath = path.join(imagesPath, req.url);
  fs.access(filePath, (err) => {
    if (err) return res.status(404).json({ error: "Image not found" });
    next();
  });
});

app.use("/images", express.static("images"));

// Get lessons
app.get("/lessons", async (req, res) => {
  try {
    const lessons = await db.collection("Lessons").find().toArray();
    res.json(lessons);
  } catch (err) {
    res.status(500).send("Error sending lessons");
  }
});

// Create order
app.post("/orders", async (req, res) => {
  try {
    const order = req.body.order; 

    const result = await db.collection("Orders").insertOne({
      firstName: order.firstName,
      lastName: order.lastName,
      Address: order.address,
      City: order.city,
      State: order.state,
      Zip: order.zip,
      Phone: order.phone,
      Gift: order.gift,
      Method: order.method
    });

    res.status(201).json({ message: "Order created", result });
  } catch (err) {
    console.error("Order error:", err);
    res.status(500).json({ error: "Failed to create order" });
  }
});


// Update lesson
app.put("/lessons/:id", async (req, res) => {
  try {
    const lessonId = req.params.id;
    const updates = req.body;

    const result = await db.collection("Lessons").updateOne(
      { _id: new ObjectId(lessonId) },
      { $set: updates }
    );

    res.json({ message: "Lesson updated", result });
  } catch (err) {
    res.status(500).json({ error: "Failed to update lesson" });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).send("Sorry, that route doesn't exist.");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
