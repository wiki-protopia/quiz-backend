const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const keys = require("./config/key");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  Credentials: true
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(express.json());
app.get("/", (req, res, next) => {
  res.send("Hello! Server is running correctly!");
  next();
});
require("./routes")(app);

mongoose
  .connect(`mongodb://${keys.db_uri}/${keys.db_name}`)
  .then(() => {
    console.log("Connect to MongoDB successfully!");
    app.listen(keys.server_port, (req, res) => {
      // res.send("Hello! Server is running correctly!");
      console.log(`Server is running on port ${keys.server_port} `);
    });
  })
  .catch((err) => {
    console.log("[MogoDB Error]", err);
  });
