var assert=require("assert");
var stompClient=require("../jms/stompClient");
var env=require("../env");
describe("AMQService",function(){
  it ("can init with param",function(done){
    stompClient.init(function(err){
      assert(!err);
      done();
    });
  });
});