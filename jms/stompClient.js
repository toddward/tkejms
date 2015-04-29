var eventBus = require("../eventbus");
var util = require("util");
var Stomp = require("stomp-client");
var env = require("../env");
var client = null;
var starting = false;// flag to catch 'double-starting' the client

function AMQService() {}

AMQService.prototype.log = require("../log");
AMQService.prototype.init = function(cb) {
  this.log.info('AMQ service init called');
  var self = this;
  if (client === null) {
    starting = true;
    this.log.info("Start to initialise AMQService");
    client = new Stomp(env.get("amq_host"), env.get("amq_port"));
    client.connect(function(sessionId) {
        starting = false;
        self.log.info("Connected to: " + env.get("amq_host") + ":" + env.get("amq_port"));
        cb();
      },
      function(err) {
        starting = false;
        self.log.error("Failed to initialise AMQService");
        self.log.error(JSON.stringify(arguments));
        cb(err);
      });

    client.on("error", function(e) {
      self.log.error("AMQService error: " + JSON.stringify(arguments));
      eventBus.emit("amq_error", e);
      client.disconnect(function() {
        self.log.info("AMQService disconnected");
      });
    });
    client.on("connect", function() {
      self.log.info("AMQService has connected");
      eventBus.emit("amq_connect", self);
    });

    client.on("disconnect", function() {
      self.log.warn("AMQService has disconnected");
      // client = null;

      // Harden AMQService by attempting to reconnect automagically
      setTimeout(function() {
        self.log.info("Attempting to reconnect to ActiveMQ...");
        client.connect(function(sessionId) {
          self.log.info("Connected to: " + env.get("amq_host") + ":" + env.get("amq_port"));
        });
      }, 5000);

    });
  } else {
    this.log.info("AMQService has been initialised.");
    cb();
  }

};
/**
 * Subscribe to a queue
 * @param  {[type]} queueName [description]
 * @return {[type]}           [description]
 */
AMQService.prototype.subscribe = function(queueName, cb) {
  var self = this;
  if (client) {
    self.log.info("Begin subscribe to queues:" + queueName);
    client.subscribe(queueName, function(body, headers) {
      self.log.info("Subscribe finished:" + queueName);
      self.log.info("Subscribe Body:", body);
      self.log.info("Subscribe Headers:", headers);
      cb(body, headers);
    });
    return true;
  } else {
    self.log.error("Tried to connect queue without initialising stomp client.");
    return false;
  }
};
AMQService.prototype.publish = function(queueName, message, headers) {
  var self = this;
  if (client) {
    // replace unsafe XML characters
    message = escapeXml(message);

    self.log.info("Publishing Msg:", message);
    self.log.info("Publishing To:", queueName);
    client.publish(queueName, message, headers);
    return true;
  } else {
    self.log.error("Tried to publish message without initialising stomp client.");
    return false;
  }
};

function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, function(c) {
    switch (c) {
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '\'':
        return '&apos;';
      case '"':
        return '&quot;';
      case '&':
        return '&amp;';
    }
  });
}

module.exports = new AMQService();
