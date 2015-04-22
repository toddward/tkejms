var env=require("./env");
var eventBus=require("./eventbus");
var init=require("./init");
var stompClient = require("./jms/stompClient");


exports.startClient=function(option){
  for (var key in option){
    env.set(key,option[key]);
  }
  init();
  return eventBus;
};

exports.sendMessage = function(params,cb){
    var queueName = params.queueName || process.env.out_queue;
    var message = params.message || '<Empty message>';
    var headers = params.headers || {};
    var result = stompClient.publish(queueName,message,headers);

    if(result){
        return cb(null,"message posted");
    } else {
        return cb("message posting failed");
    }

};
