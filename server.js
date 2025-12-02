import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import morgan from "morgan";
import { fileURLToPath } from "url";
import cors from "cors";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();

//Express, morgan, cons and connecting to database
app.use(express.json());
app.use(morgan("short"));
app.use(cors());

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
    db = client.db("Shopping");
    console.log("✅ Connected to MongoDB Atlas");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}

connectToDatabase();

//Logger middleware showing data, URL and method.
// app.use(function (req, res, next) {
//   const minutes = (new Date()).getTimezoneOffset();
//   if ((minutes % 2) === 0) {
//     next();
//   }
//   else {
//     res.statusCode = 404;
//     res.end("Not authorized");
//   }
// });
app.use(function (req, res, next) {
  console.log("Request date", + new Date());
  console.log("Request URL:" + req.url);
  console.log(['::ffff:127.0.0.1'].indexOf(req.ip));
  console.log("Request Method:" + req.method);
  next();
});

//Static file middleware
// app.use(function (req, res, next) {
//   const filePath = path.join(__dirname, "static", req.url);
//   fs.stat(filePath, function (err, fileInfo) {
//     if (err) {
//       next();
//       return;
//     }
//     if (fileInfo.isFile()) {
//       res.sendFile(filePath);
//     } else {
//       next();
//     }
//   });
// });

const staticPath = path.resolve(__dirname, "static");
app.use('/images',express.static('images'));

//Image file path.
const imagesPath = path.resolve(__dirname, "images");
app.use("/images", function (req, res, next) {
  const filePath = path.join(imagesPath, req.url);
  fs.access(filePath, function (err) {
    if (err) {
      return res.status(404).json({ error: "Image not found" });
    }
    next();
  });
});

app.use('/images', express.static('images'));
//Connect it to avariable
app.get("/lessons", async (req, res) => {
  try {
    const lessons = await db.collection('Lessons').find().toArray();
    res.json(lessons);
    // console.log(lessons)
    // res.json({ msg: `Lessons collected from MongoDB!`, lessons: lessons });
  } catch (err) {
    res.status(500).send("Error sending lessons");
  }
});

// app.post("/orders", function (req, res) {
//   res.send("Order confirmed");
// });
//POST new order creating new order
app.post("/orders", async (req, res) => {

  try {
    const newOrder = req.body;
    const result = await db.collection("Orders").insertOne(newOrder);
    res.json({ message: "Order saved", id: result.insertedId });
  }
  catch (err) {
    res.status(500).json({ error: "Failed to save order" });
  }
});


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


app.use(function (req, res) {
  res.status(404).send("Sorry, that route doesn't exist.");
});
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
