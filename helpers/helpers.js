module.exports.register = function (Handlebars, options) {
  'use strict';

  Handlebars.registerHelper('excerpt', function (input, wordCount) {
    return input.split(/\s+/).slice(1, wordCount).join(" ").concat("...");
  });

  Handlebars.registerHelper('ellipsize', function (input, count) {
    return input.substring(0, count).concat("...");
  });

};
