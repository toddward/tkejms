
var Parser = require("./Parser");
var util=require("util");

function TicketDataParser() {
  Parser.call(this, "amq_msg_ticket", "TicketData", [{
    "msg": "parsed_ticket",
    "ele": "Ticket"
  }, {
    "msg": "parsed_employee_ticket",
    "ele": "Employee"
  }, {
    "msg": "parsed_product_ticket",
    "ele": "Unit"
  }, {
    "msg": "parsed_task",
    "ele": "Task"
  }], "parse_ticket_error");
}
util.inherits(TicketDataParser,Parser);
var instance=new TicketDataParser();
module.exports=instance;