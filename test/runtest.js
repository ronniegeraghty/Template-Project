const path = require("path");
const glob = require("glob");
const Mocha = require("mocha");

const mocha = new Mocha({
  ui: "bdd",
});
mocha.color(true);

process.env.NODE_ENV = "test";
process.env.DB_URL = "mongodb://localhost:27017/test";

const testRoot = path.resolve(__dirname, "..");

glob("{,!(node_modules)/**/}*.test.js", { cwd: testRoot }, (err, files) => {
  if (err) {
    console.log(`ERROR: ${err}`);
    return error(err);
  }

  // Add files to the test suite
  files.forEach((file) => mocha.addFile(path.resolve(testRoot, file)));

  try {
    // Run the mocha test
    mocha.run((failures) => {
      if (failures > 0) {
        error(new Error(`${failures} tests failed.`));
      }
    });
  } catch (err) {
    console.error(err);
    error(err);
  }
});
