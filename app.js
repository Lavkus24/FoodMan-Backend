const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const CustomerRoutes = require("./routes/CustomerRoutes");
const RestaurentRoutes = require("./routes/RestaurentRoutes");

const app = express();

app.use(bodyParser.json()); // application/json

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/customer", CustomerRoutes);
app.use("/restaurent", RestaurentRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(
    "mongodb://hackfooduser:hack123456789@cluster0-shard-00-00.fsvp3.mongodb.net:27017,cluster0-shard-00-01.fsvp3.mongodb.net:27017,cluster0-shard-00-02.fsvp3.mongodb.net:27017/Database?ssl=true&replicaSet=atlas-plnyra-shard-0&authSource=admin&retryWrites=true&w=majority"
  )
  .then((result) => {
    console.log("connected");
    app.listen(8080);
  })
  .catch((err) => console.log(err));
