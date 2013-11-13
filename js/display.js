window.BUILD = {
	Models: {},
	Collections: {},
	Views: {}
};
// The Meat & Potatos
require([
  "require",
  "helpers/utils",
  "models/product"
  ], function (require, util, ProductModel) {
    var Product = new ProductModel(window.dataLayer.product);
    BUILD.Models['Product'] = Product;
    console.log(Product);
});
