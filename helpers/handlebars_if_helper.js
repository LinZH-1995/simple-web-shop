module.exports = {
  ifHelper: function (a, b, options) {
    return a === b ? options.fn(this) : options.inverse(this)
  }
}