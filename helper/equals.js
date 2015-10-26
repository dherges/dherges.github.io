module.exports = function (one, two, options) {
  if (one === two) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
}
