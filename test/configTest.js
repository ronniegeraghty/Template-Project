require("dotenv").config();
const Sample = require("../server/models/Sample");

module.exports.config = () => {
  process.env.NODE_ENV = "test";
  process.env.PORT = 6000;
  process.env.DB_URL = "mongodb://localhost:27017/test";
};

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

module.exports.clearTestDB = () => {
  return Sample.deleteMany({}, function (err) {
    if (err) {
      console.error(err);
    }
  });
};
