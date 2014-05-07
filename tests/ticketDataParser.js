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
describe("Ticket Data Parser",function(){
  before(function(done){
      eventBus.once("jms_ready",done);
      start();
      eventBus.on("parse_ticket_error",function(e){
        throw(e);
      });
  });
  it ("should emit parsed_ticket event",function(done){
    eventBus.once("parsed_ticket",function(data,action,employeeId){
      assert(data.ticketID);
      assert(data.ticketNumber);
      assert(data.ticketType);
      assert(action=="Added");
      done();
    });
    stompClientStub.mockTicketData();
  });
  it ("should emit parsed_employee_ticket event",function(done){
    eventBus.once("parsed_employee_ticket",function(data,action){
      assert(data.ticketID);
      assert(data.employeeID);
      assert(action=="Added");
      done();
    });
    stompClientStub.mockTicketData();
  });
  it ("should emit parsed_product_ticket event",function(done){
    eventBus.once("parsed_product_ticket",function(data,action){
      assert(data.ticketID);
      assert(data.unitID);
      assert(action=="Added");
      done();
    });
    stompClientStub.mockTicketData();
  });
  it ("should emit parsed_task event",function(done){
    eventBus.once("parsed_task",function(data,action){
      assert(data.ticketID);
      assert(data.unitID);
      assert(data.taskID);
      assert(action=="Added");
      done();
    });
    stompClientStub.mockTicketData();
  });
});