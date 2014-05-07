module.exports = init;

var eventBus = require("./eventbus");
var stompClient = require("./jms/stompClient");
var messageDispatcher=require("./jms/messageDispatcher");
var async = require("async");
var log = require("./log");
var env = require("./env");


function init() {
  async.parallel([
      //init stomp client
      function(cb) {
        stompClient.init(function(err){
          if (err){
            cb(err);
          }else{
            messageDispatcher.init(cb);
          }
        });
      },
      require("./parser/ticketDataParser")
    ],
    function(err) {
      if (err) {
        log.error("TKE JMS initialise failed.");
        eventBus.emit("jms_init_failed");
      } else {
        log.info("Application initialised.");
        eventBus.emit("jms_ready");
      }
    });
}