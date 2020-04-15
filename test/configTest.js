require("dotenv").config();
const Sample = require("../server/models/Sample");

/**
 * Configure the testing environment
 */
module.exports.config = () => {
  process.env.NODE_ENV = "test";
  process.env.PORT = 6000;
  process.env.DB_URL = "mongodb://localhost:27017/test";
};

/**
 * Populate the Test DB with test data
 * @returns {Promise} Promise from the mongoose save function
 */
module.exports.populateTestDB = () => {
  const testSample = new Sample({
    name: "Sample",
    message: "Hello World!",
  });
  return testSample.save(function (err, sample) {
    if (err) {
      console.error(err);
    }
  });
};

/**
 * Delete all data in the test DB
 */
module.exports.clearTestDB = () => {
  return Sample.deleteMany({}, function (err) {
    if (err) {
      console.error(err);
    }
  });
};
