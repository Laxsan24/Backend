import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const uri = process.env.MONGO_URI; 

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

//Logger middleware
app.use(function(req,res,next){
  console.log("Request URL:" + req.url);
  console.log("Request Method:" + req.method);
  next();
});

app.get("/", (req, res)=>{
  res.send("Hello World");
});
app.get("/lessons", function (req, res){
  res.send("Lessons page");
});
app.get("/lessons/:id", function(req, res) {
  const id = parseInt(req.params.id, 10);
  res.send("Product ID: " + id);
});

app.get("/search", function (req, res) {
  res.send("Search functionality");
});
app.post("/orders", function (req, res){
  res.send("Order confirmed");
});
app.put("/orders", function(req,res){
  res.send("Order")
});

app.use(function(req, res) {
  res.status(404).send("Sorry, that route doesn't exist.");
});
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
