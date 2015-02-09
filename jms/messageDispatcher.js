var eventBus=require("../eventbus");
var log=require("../log");
var stompClient=require("./stompClient");
var env=require("../env");
var xml2js=require("xml2js");
var inited=false;
function MessageDispatcher(){
  this.msg={
    "amq_msg_ticket":"amq_msg_ticket",
    "amq_msg_basedata":"amq_msg_basedata"
  };
}

// set custom option for xml2js
var parser = new xml2js.Parser({
  ignoreAttrs: false,
  attrkey: '_attr'
});

MessageDispatcher.prototype.init=function(cb){
  if (inited===true){
    return cb();
  }
  inited=true;
  stompClient.subscribe(env.get("tke_antenna_queue"),this.onAntennaMessage.bind(this));
  cb();
};

MessageDispatcher.prototype.onAntennaMessage=function(body,headers){
  var self=this;
  parser.parseString(body,function(err,result){
    // console.log(result);
    if (err){
      log.error("Error parse message body to json");
      log.error(body);
      log.error(headers);
    }else{
      if (result["TicketData"]){
        eventBus.emit(self.msg.amq_msg_ticket,result,parseInt(headers.EmployeeID));
      }else if (result["BaseData"]){
        eventBus.emit(self.msg.amq_msg_basedata,result,parseInt(headers.EmployeeID));
      }else{
        log.error("Unknown message body passed in.");
        log.error(body);
        log.error(headers);
        eventBus.emit("msg_antenna_error","unknown message body",body,headers);
      }
    }
  });
}

module.exports=new MessageDispatcher();
