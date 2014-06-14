module.exports.register = function (Handlebars, options) {
  'use strict';

  /**
   * Renders a list of the blog's pages, by filtering the 'data.published' attribute
   * and sorting newest pages to the top ('date.date' attribute).
   *
   * @param pages
   * @param options
   * @return
   */
  var blogList = function (pages, options) {

    // filter for 'data.published', then sort by 'data.date' descending (newest first)
    var sortedPages = pages
      .filter(function(page) {
        return page.data && page.data.published;
      })
      .sort(function(pageA, pageB) {
        if (pageA.data && pageB.data && pageA.data.date && pageB.data.date
            && pageA.data.date.getTime && pageB.data.date.getTime) {
          return pageB.data.date.getTime() - pageA.data.date.getTime();
        } else {
          return 0;
        }
      });

    // iterate over the 'sortedPages' array and render each template
    var item;
    var result = '';
    for (item in sortedPages) {
      result += options.fn(sortedPages[item]);
    }
    return result;
  };

  Handlebars.registerHelper('blogList', blogList);


  var cheerio = require('cheerio');
  var marked = require('marked');
  var opts = {
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    silent: false,
    smartLists: true,
    langPrefix: "language-",
    highlight: null/*function (code, lang) {
      var res;
      res = void 0;
      if (!lang) {
        return code;
      }
      switch (lang) {
      case "js":
        lang = "javascript";
      }
      try {
        return res = hljs.highlight(lang, code).value;
      } finally {
        return res || code;
      }
    }*/
  };
  marked.setOptions(opts);

  var markdownExcerpt = function(input, wordCount) {
/*
  if (typeof this.options.highlight === "string") {
    if (this.options.highlight === "auto") {
      this.options.highlight = function (code) {
        return hljs.highlightAuto(code).value;
      };
    } else if (this.options.highlight === "manual") {
      this.options.highlight = function (code, lang) {
        try {
          code = hljs.highlight(lang, code).value;
        } catch (e) {
          code = hljs.highlightAuto(code).value;
        }
        return code;
      };
    }
  }
*/

    // render markdown to HTML, strip HTML tags, return first n words (from 0 to 'wordCount')
    var result = marked(input);

    var $ = cheerio.load(result);
    result = $('*').text();

    return result.split(/\s+/).slice(1, wordCount).join(" ").concat("...")
  };

  Handlebars.registerHelper('markdownExcerpt', markdownExcerpt);





};
