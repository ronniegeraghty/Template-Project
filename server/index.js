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
// If in development, use morgan for monitoring express
if (process.env.NODE_ENV == "development") {
  app.use(morgan("tiny"));
}

// Connect to DB
dbConnect.connect();

// Import and add routes
const sample = require("./routes/api/sample");
app.use("/api/sample", sample);

// Have server listen on port specified by .env file or port 3000
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
