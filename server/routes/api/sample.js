const express = require("express");
const router = express.Router();

router.route("/").get(function (req, res) {
  res.send({
    name: "Sample API",
    message: "Hello World!",
  });
});

module.exports = router;
