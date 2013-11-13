define([
  'underscore',
  'backbone'
], function(_, Backbone){
  var Product = Backbone.Model.extend({
    initialize: function (data) {
      this.set('hasMapRestrictions', $("[data-hasAddToCartMAPBuster=true]").size() > 0);
    },
    hasMapRestrictions: function () {
      return this.get('hasMapRestrictions');
    },
    hasMultipleFinishes: function () {
      return this.get('finishes').length > 0;
    },
    hasPricedOptions: function () {
      return this.get('hasPricedOptions');
    },
    isOnSale: function () {
      return this.get('onSale');
    },
    getFinishByUniqueId: function (uniqueId) {
      return _.findWhere(this.get('finishes'), {
        uniqueId: uniqueId
      });
    }

  });

  return Product;
});
