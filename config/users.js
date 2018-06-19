let devUser = "";
var user = "";

var isEnvBeta =
  process.argv.filter(arg => arg.indexOf("--beta") === 0).length === 1;
var isEnvLive =
  process.argv.filter(arg => arg.indexOf("--live") === 0).length === 1;
var isEnvLocal = !user;

if (!isEnvLive && !isEnvBeta && isEnvLocal) {
  devUser = require("./developer_user");
  user = devUser.id;
}

var productType = `${
  isEnvLive ? "" : isEnvBeta ? "beta-" : isEnvLocal ? `${user}-` : ""
}`;
var productProtocol = `http${isEnvLive ? "s" : ""}`;

var api = `${productProtocol}://privateapi.${productType}binplate.com:35000`;
var img = `${productProtocol}://image.${productType}binplate.com`;
var mq = `mq.${isEnvLive ? "" : "beta-"}binplate.com`;
var staticFile = `${productProtocol}://static.${productType}binplate.com`;
var host = `boffice.${productType}binplate.com`;

var { DEV_PORT: devPort = 5000 } = process.env;
var port = function() {
  var incrementToken = 0;
  if (user === "dmcho") incrementToken = 1;
  if (user === "ihpark") incrementToken = 2;
  if (user === "jcchoi") incrementToken = 3;
  if (user === "swpark") incrementToken = 4;
  if (user === "smchun") incrementToken = 5;
  if (user === "cmlee") incrementToken = 6;
  return devPort + incrementToken;
};

var users = {
  user: user,
  port: port(),
  api: api,
  img: img,
  staticFile: staticFile,
  mq: mq,
  host: host,
  build: isEnvLive ? "live" : isEnvBeta ? "beta" : isEnvLocal ? "local" : "dev"
};

module.exports = users;
