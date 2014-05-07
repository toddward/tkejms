var env=require("./env");
var eventBus=require("./eventbus");
var init=require("./init");
module.exports=function(option){
  for (var key in option){
    env.set(key,option[key]);
  }
  init();
  return eventBus;
}