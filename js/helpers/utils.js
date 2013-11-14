define([
  'jquery-cookie'
  ], function (cookie) {
  var util = window.util || {};

  util.formatCurrency = function (price) {
    return "$" + price.toFixed(2);
  };

  util.isZip = function (str) {
    return (/^\d{5}(?:[\-\s]*\d{4})?$/.test(str) || /^[a-zA-Z]\d[a-zA-Z] \d[a-zA-Z]\d$/.test(str));
  };

  util.isPostalCodeDefined = function() {
    return ($.cookie('postalCode') !== '' && $.cookie('postalCode') !== null);
  };

  return util;
});