/**
 * Add custom data formats here <3
 */
const yaml = require("js-yaml");

module.exports = [["yaml", (c) => yaml.safeLoad(c)]];
module.exports = [["yml", (c) => yaml.safeLoad(c)]];
