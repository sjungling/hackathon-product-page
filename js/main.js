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
  'views/heading',
  'views/finishes'
  ], function (Marionette, require, util, ProductModel, HeadingView, FinishesView) {

    Backbone.Marionette.View.prototype.pubSub =
      Backbone.Model.prototype.pubSub = _.extend({},Backbone.Events);

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

    var Product = new ProductModel(window.dataLayer.product);
    BUILD.Models['Product'] = Product;

    layout.finishes.show(new FinishesView({
      collection: Product.finishes
    }));

    layout.heading.show(new HeadingView());
});
