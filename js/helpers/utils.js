define(function () {
  var util = window.util || {};

  util.formatCurrency = function (price) {
    return "$" + price;
  };

  util.isZip = function (str) {
    return (/^\d{5}(?:[\-\s]*\d{4})?$/.test(str) || /^[a-zA-Z]\d[a-zA-Z] \d[a-zA-Z]\d$/.test(str));
  };
  return util;
});