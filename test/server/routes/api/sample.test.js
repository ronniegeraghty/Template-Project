//require test dependencies
const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
chai.use(chaiHttp);
const configTest = require("../../../configTest"); // Functions to configure the test environment
const Sample = require("../../../../server/models/Sample");

//Make server a global here, but instanciate in before method
let server;

describe("server/routes/api/sample", () => {
  //Execute before tests
  before(async function () {
    console.log("~Setting up ENV VARIABLES~");
    configTest.config();
    console.log("~Starting Server & Connecting to DB~");
    server = require("../../../../server/index");
    console.log("~Clearing DB~");
    await configTest.clearTestDB();
    console.log("~Populating DB with test data~");
    await configTest.populateTestDB();
  });
  //Execute after tests
  after(async function () {
    console.log("~Clearing DB~");
    await configTest.clearTestDB();
    console.log("~Closing Server and DB~");
    require("../../../../server/index").stop();
  });

  describe("/", () => {
    describe("/GET", () => {
      it("It should GET all samples", (done) => {
        chai
          .request(server)
          .get("/api/sample")
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("array");
            res.body[0].name.should.be.equal("Sample");
            res.body[0].message.should.be.equal("Hello World!");
            done();
          });
      });
    });

    describe("/POST", () => {
      it("It should POST a new sample", (done) => {
        chai
          .request(server)
          .post("/api/sample")
          .type("form")
          .send({ name: "Sample", message: "Hello World!" })
          .end((err, res) => {
            res.should.have.status(200);
            res.text.substr(0, 19).should.be.equal("Successfully posted");
            done();
          });
      });
      it('It should get err for missing "message" attribute', (done) => {
        chai
          .request(server)
          .post("/api/server")
          .type("form")
          .send({ name: "Sample" })
          .end((err, res) => {
            res.should.have.status(404);
            done();
          });
      });
    });

    describe("/DELETE", async () => {
      after(async () => {
        // Re-Add Sample Data after test
        console.log("~RePopulating DB with test data~");
        await configTest.populateTestDB();
      });
      it("It should DELETE all samples ", (done) => {
        chai
          .request(server)
          .delete("/api/sample")
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an("object");
            done();
          });
      });
      it("DB Collection should be empty", (done) => {
        Sample.find({}, async (err, foundSamples) => {
          should.not.exist(err);
          foundSamples.length.should.equal(0);
          done();
        });
      });
    });
  });

  describe("/:sampleID", () => {
    before((done) => {
      //Get ID
      Sample.find({}, (err, foundSamples) => {
        if (err) {
          throw err;
        } else if (foundSamples.length === 0) {
          throw new Error("No Samples Found");
        }
        global.foundID = foundSamples[0]._id;
        done();
      });
    });

    describe("/:sampleID/GET", () => {
      it("It should GET a sample by ID", (done) => {
        chai
          .request(server)
          .get("/api/sample/" + global.foundID)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an("object");
            res.body.name.should.be.equal("Sample");
            res.body.message.should.be.equal("Hello World!");
            done();
          });
      });
    });

    describe("/:sampleID/PUT", () => {
      it("It should PUT new values for all attributes", (done) => {
        chai
          .request(server)
          .put("/api/sample/" + global.foundID)
          .type("form")
          .send({ name: "Sample PUT", message: "Hello World!" })
          .end((err, res) => {
            res.should.have.status(200);
            res.text
              .substr(0, 27)
              .should.be.equal("Successfully updated Sample");
            done();
          });
      });

      it("DB should be updated w/ PUT", (done) => {
        Sample.findOne({ _id: global.foundID }, (err, foundSample) => {
          should.not.exist(err);
          foundSample.name.should.equal("Sample PUT");
          done();
        });
      });
    });

    describe("/:sampleID/PATCH", () => {
      it("It should PATCH new value for given attributes", (done) => {
        chai
          .request(server)
          .patch("/api/sample/" + global.foundID)
          .type("form")
          .send({ name: "Sample PATCH" })
          .end((err, res) => {
            res.should.have.status(200);
            res.text
              .substr(0, 27)
              .should.be.equal("Successfully updated Sample");
            done();
          });
      });
      it("DB should be updated w/ PATCH", (done) => {
        Sample.findOne({ _id: global.foundID }, (err, foundSample) => {
          should.not.exist(err);
          foundSample.name.should.equal("Sample PATCH");
          done();
        });
      });
    });

    describe("/:sampleID/DELETE", () => {
      it("It should DELETE sample by ID", (done) => {
        chai
          .request(server)
          .delete("/api/sample/" + global.foundID)
          .end((err, res) => {
            res.should.have.status(200);
            res.text.should.equal("Successfully deleted the sample.");
            done();
          });
      });
      it("Sample should be DELETED from DB", (done) => {
        Sample.findOne({ _id: global.foundID }, (err, foundSample) => {
          should.not.exist(err);
          should.not.exist(foundSample);
        });
        done();
      });
    });
  });
});
