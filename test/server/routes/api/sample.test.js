//require test dependencies
const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
chai.use(chaiHttp);
const configTest = require("../../../configTest");
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
    it("It should get err", (done) => {
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

  describe("/DELETE", () => {
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
  });

  describe("/:sampleID/GET", () => {});
  describe("/:sampleID/PUT", () => {});
  describe("/:sampleID/PATCH", () => {});
  describe("/:sampleID/DELETE", () => {});
});
