//require test dependencies
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../index");

const should = chai.should();

chai.use(chaiHttp);
describe("Sample", () => {
  after(function () {
    require("../../index").stop();
  });
  describe("/GET sample", () => {
    it("it should GET Hello World!", (done) => {
      chai
        .request(server)
        .get("/api/sample")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");
          res.body.message.should.be.eql("Hello World!");
          done();
        });
    });
  });
});
