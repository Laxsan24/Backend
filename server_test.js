// import express from "express";
// const app =express();
// var express = require("express");
// var http = require("http");
// // var app = express();
// // const http = require('http');  
// const PORT = 3000;

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

// // function handleGetRequest(req,res){
// //   res.send("Hello")
// // }
// // app.get('/',handleGetRequest);

// function requestHandler(req, res) {
//   console.log("incoming request: " + req.url);
//   res.send("Hello from the server!");
// }
// var server = http.createServer(requestHandler);
// server.listen(3000);

// //Need to involve "?q="
// //GET request is what's in the link and shows what it's receiving (returns the data).
// app.get("/products", function(req, res) {
//   res.send("Welcome to my book shop!");
// });
// app.get("/checkout", function(req,res){
//   res.send("Checkout page");

// })
// app.get("/products/shoppingcart", function(req, res) {
//   res.send("Checkout page");
// });
// // 

// app.get("/products/:id", function(req, res) {
//   const id = parseInt(req.params.id, 10);
//   res.send("Product ID: " + id);
// });
// //POST request is creates a link and shows what it's receiving in the data (New data which is shown in the body).
// app.post("/products", function(req,res){
//   res.send("success")
// });
// app.post("/checkout", function(req,res){
//   res.send("Details published");

// })
// //PUT request creates a link but updates it
// app.put("/products", function(req,res){
// })
// app.put("/checkout", function(req,res){
//   req.send("Details")
// })
// app.delete("/products", function(req,res){
// });
// app.delete("/checkout", function(req,res){
// });
// var express = require("express");
// var app =express();
// var http = require("http"); 
// var PORT =3000;
// function requestHandler(request, response) {
// console.log("Incoming request to: " + request.url);
//  response.end("Hello, world!");
// }
// app.get("/checkout", function(req,res){
//   res.send("Checkout page");

// })
// var server = http.createServer(requestHandler);
// app.use(function(req, res) {
//   res.status(404).send("Sorry, that route doesn't exist.");
// });
//  app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}/`);
// });
// server.listen(3000);
