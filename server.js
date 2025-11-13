import express from "express";
const app = express();
const PORT = 3000;
const connectionURL = "mongodb+srv://laxsan:CJ4g7XVgZzEkPcqP@cluster0.awml2.mongodb.net/?appName=Cluster0";
app.get("/", (req, res) => {
  res.send("Hello World");
});


function requestHandler(req, res) {
  console.log("incoming request: " + req.url);
  res.end("Hello from the server!");
}
app.get("/lessons", function(req, res) {
  res.send("Lessons page");
});
// app.get("/lessons/returning", function(req, res) {
//   res.send("Lessons returning page");
// });
// app.get("/lessons/update", function(req, res) {
//   res.send("Lessons updated");
// });
app.get("/orders", function(req, res) {
  res.send("Order page");
});
// app.get("/products/:id", function(req, res) {
//   const id = parseInt(req.params.id, 10);
//   res.send("Product ID: " + id);
// });
// app.get("/products", function(req, res) {
//   res.send("Welcome to my book shop!");
// });
// app.get("/products/:id", function(req, res) {
//   const id = parseInt(req.params.id, 10);
//   res.send("Product ID: " + id);
// });
app.post("/lessons/update", function(req, res) {
  res.send("Shopping cart updated");
});
app.post("/orders", function(req,res){
  res.send("Thanks for your new order");
})
// app.put("/orders/update", function(req,res){
//  res.send("Order updated")
//})
// app.put("/lessons/update", function(req,res){
//  res.send("Order updated")
//})
app.use(function(req, res) {
  res.status(404).send("Sorry, that route doesn't exist.");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

//MongoDB is installed in package.json need to check if I should delete it.
//Use this Link to connect to mongoDB. 
// mongodb+srv://laxsan:CJ4g7XVgZzEkPcqP@cluster0.awml2.mongodb.net/?appName=Cluster0
