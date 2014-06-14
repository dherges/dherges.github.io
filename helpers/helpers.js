module.exports.register = function (Handlebars, options) {
  'use strict';

  Handlebars.registerHelper('excerptBlock', function (wordCount, options) {
    // render nested helpers
    var item;
    var result = '';
    for (item in options) {
      result += options.fn(this);
    }

    // strip HTML from result string
    result = result.replace(/(<([^>]+)>)/ig, "");

    // return the first n words ('wordCount')
    return result.split(/\s+/).slice(1, wordCount).join(" ").concat("...")
  });

  Handlebars.registerHelper('excerpt', function (input, wordCount) {
    return input.split(/\s+/).slice(1, wordCount).join(" ").concat("...");
  });

  Handlebars.registerHelper('ellipsize', function (input, count) {
    return input.substring(0, count).concat("...");
  });

};
