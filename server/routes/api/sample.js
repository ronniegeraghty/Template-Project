const express = require("express");
const router = express.Router();

//Sample Model
const Sample = require("../../models/Sample");

// Routes for interacting with all Samples
router
  .route("/")
  .get(function (req, res) {
    Sample.find({}, function (err, foundSamples) {
      if (!err) {
        res.send(foundSamples);
      } else {
        res.send(err);
      }
    });
  })
  .post(function (req, res) {
    const newSample = new Sample({
      name: req.body.name,
      message: req.body.message,
    });
    newSample.save(function (err, sample) {
      if (!err) {
        res.send(`Successfully posted ${sample}`);
      } else {
        res.send(err);
      }
    });
  })
  .delete(function (req, res) {
    Sample.deleteMany({}, function (err) {
      if (!err) {
        res.send("Successfully deleted all samples.");
      } else {
        res.send(err);
      }
    });
  });

// Routes for working with a specific sample
router
  .route("/:sampleID")
  .get(function (req, res) {
    Sample.findOne({ _id: req.params.sampleID }, function (err, foundSample) {
      if (err) {
        res.send(err);
      } else if (foundSample) {
        res.send(foundSample);
      } else {
        res.send("No Sample matching that ID was found.");
      }
    });
  })
  .put(function (req, res) {
    Sample.update(
      { _id: req.params.sampleID },
      { name: req.body.name, message: req.body.message },
      { overwrite: true },
      function (err, sample) {
        if (!err) {
          res.send(`Successfully updated Sample: ${JSON.stringify(sample)}`);
        } else {
          res.send(err);
        }
      }
    );
  })
  .patch(function (req, res) {
    Sample.updateOne(
      { _id: req.params.sampleID },
      { $set: req.body },
      function (err, sample) {
        if (!err) {
          res.send(`Successfully updated Sample: ${JSON.stringify(sample)}`);
        } else {
          res.send(err);
        }
      }
    );
  })
  .delete(function (req, res) {
    Sample.deleteOne({ _id: req.params.sampleID }, function (err) {
      if (!err) {
        res.send("Successfully deleted the sample.");
      } else {
        res.send(err);
      }
    });
  });

module.exports = router;
