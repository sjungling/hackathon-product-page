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
  'views/inventory',
  'views/price',
  'views/savings',
  'views/finishes',
  'views/option_groups'
  ], function (Marionette, require, util, ProductModel, HeadingView, InventoryView, PriceView, SavingsView, FinishesView, OptionGroupsView) {

    Backbone.Marionette.View.prototype.pubSub = _.extend({},Backbone.Events);

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
        savings: '#productSavings',
        optionGroups: '.poGroup'
      }

    });

    var layout = new Layout();

    var Product = new ProductModel(window.dataLayer.product);

    layout.finishes.show(new FinishesView({
      collection: Product.finishes
    }));

    if (Product.hasPricedOptions()) {
      for (var i = Product.optionGroups.models.length - 1; i >= 0; i--) {
        layout.optionGroups.show(new OptionGroupsView({
          model: Product.optionGroups.models[i]
        }));
      };
    }

    layout.price.show(new PriceView());
    layout.savings.show(new SavingsView());
    layout.heading.show(new HeadingView());
    layout.inventory.show(new InventoryView());


    // Keep at EOF
    //
    // Export objects to global object
    BUILD.Models['Product'] = Product;
    BUILD.Utilities = util;
    BUILD.Collections['Finishes'] = Product.finishes;
    if (Product.hasPricedOptions()) {
      BUILD.Collections['PricedOptionGroups'] = Product.optionGroups;
    }

});
