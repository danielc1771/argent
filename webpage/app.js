var express = require("express");
let MongoClient = require("mongodb").MongoClient;

var app = express();

app.use("/js", express.static(__dirname + "/js"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.listen(3000, function() {
  console.log("server listening on port 3000...");
});
