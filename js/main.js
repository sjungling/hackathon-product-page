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
  'models/product',
  'views/finishes'
  ], function (Marionette, require, util, ProductModel, FinishesView) {

    var Layout = Backbone.Marionette.Layout.extend({

      regions: {
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
      }

    });

    var layout = new Layout();

    layout.finishes.show(new FinishesView());


    var Product = new ProductModel(window.dataLayer.product);
    BUILD.Models['Product'] = Product;
});
