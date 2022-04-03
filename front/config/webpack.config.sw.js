const path = require("path");

module.exports = {
  mode: "production",
  entry: {
    sw: [
      path.resolve(__dirname, "../src/analytics/sw-analytics.js"),
      path.resolve(__dirname, "../src/sw-pwa.js"),
    ],
  },

  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "../public"),
  },
};
