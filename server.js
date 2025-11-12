import express from "express";
const app = express();
// const http = require('http');  
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello World");
});


function requestHandler(req, res) {
  console.log("incoming request: " + req.url);
  res.end("Hello from the server!");
}

app.get("/lessons", function(req, res) {
  res.send("Lessons returning page");
});
app.use(function(req, res) {
  res.status(404).send("Sorry, that route doesn't exist.");
});

app.get("/products/:id", function(req, res) {
  const id = parseInt(req.params.id, 10);
  res.send("Product ID: " + id);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

//Use this Link to connect to mongoDB. 
// mongodb+srv://laxsan:CJ4g7XVgZzEkPcqP@cluster0.awml2.mongodb.net/?appName=Cluster0
// app.post('/M00863760/users', async (req, res) => { 

