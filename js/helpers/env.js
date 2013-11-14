define(function () {
  var Environment = function Environment() {}

  Environment.prototype.hasTouch = function () {
    return Modernizr.touch;
  };

  Environment.prototype.isTablet = function () {
    return this.hasTouch();
  };

  return Environment;

});