var assert=require("assert");


var eventBus=require("../eventbus");
var proxyquire=require("proxyquire");
var stompClientStub=require("./stub/stompClient");
var md=proxyquire("../jms/messageDispatcher",{
  "./stompClient":stompClientStub
});
var start=proxyquire("../init",{
  "./jms/messageDispatcher":md
});
describe("Base Data Parser",function(){
  before(function(done){
      eventBus.once("jms_ready",done);
      start();
      eventBus.on("parse_basedata_error",function(e){
        throw(e);
      });
  });
  it ("should emit parsed_site event",function(done){
    eventBus.once("parsed_site",function(data,action,employeeId){
      assert(data.siteID);
      assert(data.name);
      assert(data.dispatchArea);
      assert(action=="Added");
      done();
    });
    stompClientStub.mockBaseData();
  });
  it ("should emit parsed_sitehoursofoperation event",function(done){
    eventBus.once("parsed_sitehoursofoperation",function(data,action){
      assert(data.hoursOfOperation);
      assert(data.siteID);
      assert(action=="Added");
      done();
    });
    stompClientStub.mockBaseData();
  });
  it ("should emit parsed_product event",function(done){
    eventBus.once("parsed_product",function(data,action){
      assert(data.siteID);
      assert(data.installProductID);
      assert(action=="Added");
      done();
    });
    stompClientStub.mockBaseData();
  });
});