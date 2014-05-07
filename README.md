#TKE JMS Message Dispatcher
This module connects to ActiveMQ bridge which connects to TKE JMS provider.

#Usage
##Installation
In package.json add following entry:
```
  "tkejms":"https://github.com/Keyang/tkejms/archive/master.zip"
```
This will download the latest version of dispatcher.

##API
```js
var tkejms=require("tkejms")({
  "amq_host":"127.0.0.1", //activemq server host
  "amq_port":61613, //activemq server port
  "tke_antenna_queue":"/queue/jms/TKEAntennaInQueue" //TKE JMS queue name
});

tkejms.on("amq_msg_ticket",function(jsonObj, employeeId){
  //process the raw ticket json data
});

tkejms.on("amq_msg_basedata",function(jsonObj, employeeId){
  //process the raw basedata json data
});

//action could be Added / ? /? todo: finish this
tkejms.on("parsed_ticket",function(jsonObj, action, employeeId){
  //process the parsed ticket json data
});

tkejms.on("parsed_employee_ticket",function(jsonObj, action, employeeId){
  //process the parsed employee_ticket json data
});

tkejms.on("parsed_product_ticket",function(jsonObj, action, employeeId){
  //process the parsed product_ticket json data
});

tkejms.on("parsed_task",function(jsonObj, action, employeeId){
  //process the parsed task json data
});


```

#Change Log
