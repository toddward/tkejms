module.exports=Parser;
var eventBus = require("../eventbus");
var log = require("../log");
/**
 * [Parser description]
 * @param {[type]} msg     message name to subscribe to.
 * @param {[type]} rootKey  root element of subscribed data.
 * @param {[type]} parseMap [{"msg":"parsed_site","ele":InstallSite" }];
 * @param {[type]} errMsg   message to emit if error happens
 */
function Parser(msg,rootKey,parseMap,errMsg) {
  this.inited = false;
  this.msg=msg;
  this.parseMap=parseMap;
  this.rootKey=rootKey;
  this.errMsg=errMsg;
}

Parser.prototype.init = function(cb) {
  if (this.inited === true) {
    return cb();
  }
  this.inited = true;
  eventBus.on(this.msg, this._parseBaseData.bind(this));
  cb();
}

Parser.prototype._parseBaseData=function(data,employeeId){
  var self=this;
  var root=data[self.rootKey];
  try{
    for (var i=0;i<self.parseMap.length;i++){
      var pm=self.parseMap[i];
      self._parseEmitDataArr(pm.msg,root[pm.ele],employeeId);
    }
  }catch (e) {
    log.error("Parse data error");
    log.error(e.toString());
    eventBus.emit(self.errMsg, e);
  }
}

Parser.prototype._parseEmitDataArr=function(msg, data, employeeId) {
  var self=this;
  if (data && data instanceof Array) {
    for (var i = 0; i < data.length; i++) {
      var d = data[i];
      // var action = d.$.rowstate;
      // delete d.$;
      self._pruneData(d);
      self._emit(msg, d, action, employeeId);
    }
  }else{
    log.info("Data from JMS is empty for: "+msg);
  }
}

Parser.prototype._pruneData=function(data) {
  for (var key in data) {
    if (data[key].length == 1) {
      data[key] = data[key][0];
    }
  }
  return data;
}

Parser.prototype._emit=function(msg, d, action, employeeId) {
  setTimeout(function() {
    eventBus.emit(msg, d, action, employeeId);
  }, 0);
}
