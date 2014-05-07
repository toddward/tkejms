var EventEmitter=require("events").EventEmitter;
var util=require("util");

function EventBus(){
  EventEmitter.call(this);
}
util.inherits(EventBus,EventEmitter);

module.exports=new EventBus();