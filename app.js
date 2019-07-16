const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const app = express();
const port = 3005;
const uri = "mongodb://admin:troy1234@ds151007.mlab.com:51007/argent";

let db;
MongoClient.connect(uri, (err, client) => {
  if (err) {
    console.log(err);
  }
  db = client.db("argent");
  app.listen(port, () => console.log(`server listening on port ${port}...`));
});
app.get("/api/items", (req, res) => {
  db.collection("items")
    .aggregate([
      {
        $group: {
          _id: "$item",
          item: { $first: "$item" },
          prices: { $push: { price: "$price", timestamp: "$timestamp" } }
        }
      },
      {
        $project: {
          _id: 0,
          item: 1,
          prices: 1
        }
      }
    ])
    .toArray(function(err, result) {
      if (err) {
        console.log(err);
      }
      res.send(result);
    });
});
