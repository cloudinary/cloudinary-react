"use strict";

module.exports = function (api){
  api.cache.never();
  return {
    plugins: ["@babel/proposal-export-default-from"],
  "presets":
    ["@babel/preset-env", "@babel/preset-react"],
}};