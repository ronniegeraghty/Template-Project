require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const port = process.env.PORT;
const dbConnect = require("./dbConnect");

// Set Up Express App
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
if (process.env.NODE_ENV == "development") {
  app.use(morgan("tiny"));
}

//Connect to DB
dbConnect.connect();

const sample = require("./routes/api/sample");
app.use("/api/sample", sample);

const server = app.listen(port || 3000, () =>
  console.log(`Listening on port: ${port}.`)
);

//Export for testing
module.exports = server;
function stop() {
  server.close();
  dbConnect.close();
}
module.exports.stop = stop;
