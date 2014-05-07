var fs = require("fs");
var env = require("../../env");
module.exports = {
  "map": {},
  "subscribe": function(queue, cb) {
    this.map[queue] = cb;
  },
  "mockMsg": function(queue, body, headers) {
    if (this.map[queue]) {
      // console.log("send mesasge to:"+queue);
      this.map[queue](body, headers)
    }
  },
  "mockTicketData": function() {
    var queue = env.get("tke_antenna_queue");
    var body = fs.readFileSync(__dirname+"/../data/ticketData.xml");
    var headers = {
      'message-id': 'ID',
      tracking_conversationId: 'urn',
      destination: '/queue/jms/TKEAntennaInQueue',
      EmployeeID: '2022',
      timestamp: '1395231998742',
      tracking_ecid: '004xFJ3d_MR0ZrRquWaAUH000407001v3U',
      tracking_compositeInstanceId: '3685510',
      expires: '0',
      persistent: 'true',
      tracking_parentComponentInstanceId: 'bpel',
      priority: '4',
      appID: 'FH1.0'
    };
    this.mockMsg(queue, body, headers);
  },
  "mockBaseData": function() {
    var queue = env.get("tke_antenna_queue");
    var body = fs.readFileSync(__dirname+"/../data/baseData.xml");
    var headers = {
      'message-id': 'ID',
      destination: '/queue/jms/TKEAntennaInQueue',
      EmployeeID: '2022',
      timestamp: '1395232083387',
      expires: '0',
      persistent: 'true',
      priority: '4',
      appID: 'TK2.2'
    };
    this.mockMsg(queue, body, headers);
  }
}