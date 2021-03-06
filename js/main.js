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
  'views/finishName',
  'views/heading',
  'views/image',
  'views/inventory',
  'views/price',
  'views/leadTime',
  'views/savings',
  'views/finishes',
  'views/option_groups'
  ], function (
    Marionette,
    require,
    util,
    ProductModel,
    FinishNameView,
    HeadingView,
    ImageView,
    InventoryView,
    PriceView,
    LeadTimeView,
    SavingsView,
    FinishesView,
    OptionGroupsView) {

    BUILD.Utilities = util;

    Backbone.Marionette.View.prototype.pubSub =
      Backbone.View.prototype.pubSub =
      Backbone.Collection.prototype.pubSub = _.extend({},Backbone.Events);

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
        new OptionGroupsView({
          model: Product.optionGroups.models[i]
        });
      }
    }

    layout.image.show(new ImageView());
    var $priceViews = $('.js-price');

    for (var i = 0; i < $priceViews.length; i++) {
      new PriceView({
        model: new Backbone.Model(Product.finishes.getSelectedFinish().toJSON()),
        el: $priceViews[i]
      });
    }
    var savingsView = new SavingsView();
    layout.heading.show(new HeadingView());
    layout.leadTime.show(new LeadTimeView());
    layout.inventory.show(new InventoryView());
    layout.finishName.show(new FinishNameView());


    // Keep at EOF
    //
    // Export objects to global object
    BUILD.Models['Product'] = Product;
    BUILD.Collections['Finishes'] = Product.finishes;
    if (Product.hasPricedOptions()) {
      BUILD.Collections['PricedOptionGroups'] = Product.optionGroups;
    }

});
