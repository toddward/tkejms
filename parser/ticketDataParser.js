module.exports = init;
var eventBus = require("../eventbus");
var log = require("../log");
var msgs = {
  "parsed_ticket": "parsed_ticket",
  "parsed_employee_ticket": "parsed_employee_ticket",
  "parsed_product_ticket": "parsed_product_ticket",
  "parsed_task": "parsed_task"
};
var inited=false;
function init(cb) {
  if (inited===true){
    return cb();
  }
  inited=true;
  eventBus.on("amq_msg_ticket", _parseTicketData);
  cb();
}

function _parseTicketData(data, employeeId) {
  var ticketData = data.TicketData;
  try {
    _parseEmitDataArr(msgs.parsed_ticket, ticketData.Ticket, employeeId);
    _parseEmitDataArr(msgs.parsed_employee_ticket, ticketData.Employee, employeeId);
    _parseEmitDataArr(msgs.parsed_product_ticket, ticketData.Unit, employeeId);
    _parseEmitDataArr(msgs.parsed_task, ticketData.Task, employeeId);
  } catch (e) {
    log.error("Parse ticket data error");
    log.error(e.toString());
    eventBus.emit("parse_ticket_error", e);
  }
}


function _parseEmitDataArr(msg, data, employeeId) {
  for (var i = 0; i < data.length; i++) {
    var d = data[i];
    var action = d.$.rowstate;
    delete d.$;
    _pruneData(d);
    _emit(msg, d, action, employeeId);
  }
}

function _emit(msg, d, action, employeeId) {
  setTimeout(function() {
      eventBus.emit(msg, d, action, employeeId);
    }, 0);
}

function _pruneData(data) {
  for (var key in data) {
    if (data[key].length == 1) {
      data[key] = data[key][0];
    }
  }
  return data;
}