const path = require("path");
const glob = require("glob");
const Mocha = require("mocha");

const mocha = new Mocha({
  ui: "bdd",
});
mocha.color(true);

const testRoot = path.resolve(__dirname, "..");

glob("{,!(node_modules)/**/}*.test.js", { cwd: testRoot }, (err, files) => {
  if (err) {
    console.log(`ERROR: ${err}`);
    return e(err);
  }

  // Add files to the test suite
  files.forEach((file) => mocha.addFile(path.resolve(testRoot, file)));

  try {
    // Run the mocha test
    mocha.run((failures) => {
      if (failures > 0) {
        e(new Error(`${failures} tests failed.`));
      }
    });
  } catch (err) {
    console.error(err);
    e(err);
  }
});
