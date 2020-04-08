const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const sample = require("./routes/api/sample");
app.use("/api/sample", sample);

const server = app.listen(port, () =>
  console.log(`Listening on port: ${port}.`)
);

//Export for testing
module.exports = server;
function stop() {
  server.close();
}
module.exports.stop = stop;
