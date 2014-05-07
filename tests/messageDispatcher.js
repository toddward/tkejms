var assert=require("assert");
var env=require("../env");
var eventBus=require("../eventbus");
var proxyquire=require("proxyquire");
var stompClientStub=require("./stub/stompClient");
var md=proxyquire("../jms/messageDispatcher",{
  "./stompClient":stompClientStub
});

describe("MessageDispatcher",function(){

  it ("should emit ticket json data",function(done){
    eventBus.once("amq_msg_ticket",function(data,employeeId){
      assert(data);
      assert(employeeId===2022);
      done();
    });
    md.init(function(){
      stompClientStub.mockTicketData();
    });
    
  });

  it ("should emit basedata json data",function(done){
    eventBus.once("amq_msg_basedata",function(data,employeeId){
      assert(data);
      assert(employeeId===2022);
      done();
    });
    md.init(function(){
      stompClientStub.mockBaseData();
    });
    
  });
});