const webpack = require("webpack");
require("dotenv").config();
const path = require("path");
const withImages = require("next-images");
module.exports = withImages({
  webpack: config => {
    const env = Object.keys(process.env).reduce((acc, curr) => {
      acc[`process.env.${curr}`] = JSON.stringify(process.env[curr]);
      return acc;
    }, {});
    config.plugins.push(new webpack.DefinePlugin(env));
    config.resolve.alias["components"] = path.join(
      __dirname,
      "./src/components"
    );
    config.resolve.alias["helpers"] = path.join(__dirname, "./src/helpers");
    return config;
  }
});
