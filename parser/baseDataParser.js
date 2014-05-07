
var Parser = require("./Parser");
var util=require("util");
function BaseDataParser() {
  Parser.call(this, "amq_msg_basedata", "BaseData", [{
    "msg":"parsed_site",
    "ele":"InstallSite"
  },{
    "msg":"parsed_sitehoursofoperation",
    "ele":"InstallSiteHoursOfOperation"
  },{
    "msg":"parsed_product",
    "ele":"InstallProduct"
  },{
    "msg":"parsed_producthistory",
    "ele":"InstallProductHistory"
  },], "parse_basedata_error");
}
util.inherits(BaseDataParser,Parser);
module.exports=new BaseDataParser();