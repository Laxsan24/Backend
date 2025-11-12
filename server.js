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

app.get("/products", function(req, res) {
  res.send("Welcome to my book shop!");
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