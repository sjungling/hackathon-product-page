// The Meat & Potatos
require([
  "require",
  "helpers/utils",
  "models/product"
  ], function (require, util, ProductModel) {
    var Product = new ProductModel(window.dataLayer.product);
});


// Environment = (function () {

//   function Environment() {}

//   Environment.prototype.hasTouch = function () {
//     var foo = 'bar';
//     return Modernizr.touch;
//   };

//   Environment.prototype.isTablet = function () {
//     return this.hasTouch();
//   };

//   return Environment;

// })();



// myEnv = new Environment();
// console.log(myEnv.isTablet());
// product = new Product(window.dataLayer.product);
// console.log(product.get('categoryIds'));
// console.log(product);