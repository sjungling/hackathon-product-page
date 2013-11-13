window.BUILD = {
	Models: {},
	Collections: {},
	Views: {}
};
// The Meat & Potatos
require([
  'marionette',
  'require',
  'helpers/utils',
  'models/product'
  ], function (Marionette, require, util, ProductModel) {

    var app = new Backbone.Marionette.Application();

    app.addRegions({
      image: '#productImage',
      heading: '#titleName',
      finishName: '#finishName',
      leadTime: '#prdStockMessage',
      inventory: '.stock-messages',
      // shipping: '',
      addToCart: '#addToCartWrap',
      // configuration: '',
      finishes: '.finishes.hnav',
      ratingsReviews: '#avgRatingAndReviewsDiv',
      quantity: '#qtyselected',
      price: '#productPrice',
      savings: '#productSavings'
    });

    var Product = new ProductModel(window.dataLayer.product);
    BUILD.Models['Product'] = Product;
});
