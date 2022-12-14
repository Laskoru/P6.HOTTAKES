const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user");
const sauceRoutes = require("./routes/sauce");
const likeRoutes = require("./routes/like");
const mongoose = require("mongoose");

const app = express();
const path = require("path");
app.use(express.json());
app.use(bodyParser.json());

mongoose
  .connect("mongodb+srv://hugo:Azerty12345@cluster0.l4oft5i.mongodb.net", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/api/auth", userRoutes);
app.use("/api/sauces", sauceRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/sauces", likeRoutes);

module.exports = app;
