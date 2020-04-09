//require test dependencies
const chai = require("chai");
const chaiHttp = require("chai-http");
console.log("STARTING SERVER");
const server = require("../../index");
const should = chai.should();

chai.use(chaiHttp);
describe("----------TEST /api/sample----------", () => {
  before(function () {
    console.log("CLEARING DB");
    chai.request(server).delete("/api/sample");
  });
  after(function () {
    console.log("CLOSING SERVER AND DB");
    require("../../index").stop();
  });
  describe("/POST", () => {
    it("it should POST a new sample", (done) => {
      chai
        .request(server)
        .post("/api/sample")
        .type("form")
        .send({ name: "Sample", message: "Hello World!" })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");
          done();
        });
    });
  });

  describe("/GET", () => {
    it("it should GET all samples", (done) => {
      chai
        .request(server)
        .get("/api/sample")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body[0].message.should.be.eql("Hello World!");
          done();
        });
    });
  });

  describe("/DELETE", () => {
    it("it should DELETE all samples", (done) => {
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
});
