const isProduction = process.env.NODE_ENV == "development";
if (isProduction) {
  module.exports = require("./prod");
} else {
  module.exports = require("./dev");
}
