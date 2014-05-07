var assert = require("assert");
var eventBus = require("../eventbus");
var start=require("../init");
describe("Init", function() {
  it("should emit app ready", function(done) {
    start();
    eventBus.once("jms_ready", function() {
      done();
    });
  });
});