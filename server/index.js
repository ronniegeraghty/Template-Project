require("dotenv").config();
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dbConnect = require("./dbConnect");

// Set port depending if in development or not.
let port;
if (process.env.NODE_ENV == "development") {
  port = 3001;
} else {
  port = process.env.PORT;
}

// Set Up Express App
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "..", "build")));
// If in development, use morgan for monitoring express
if (process.env.NODE_ENV == "development") {
  app.use(morgan("tiny"));
}

// Connect to DB
dbConnect.connect();

// Add the Home route to the React UI
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
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
