define([
  'underscore',
  'backbone',
  'models/finish',
  'collections/finishes'
], function(_, Backbone, FinishModel, FinishesCollection) {
  var Product = Backbone.Model.extend({
    initialize: function(data) {
      this.collection = new FinishesCollection(this.get('finishes'));
      this.activeFinish = this.collection.getFinishByUniqueId(this.get('selectedFinishUniqueId'));
    },

    // Product Type Info
    hasSquareFootage: function() {
      return this.get('hasSquareFootage');
    },

    isSingleFinish: function() {
      return (this.get('finishes').length === 1);
    },

    hasMultipleFinishes: function() {
      return this.get('finishes').length > 0;
    },

    hasPricedOptions: function() {
      return this.get('hasPricedOptions');
    },

    hasAvailabilityByLocation: function() {
      return (this.get('manufacturer') === "GE" || this.get('manufacturer') === "Hotpoint");
    },

    isOnSale: function() {
      return this.get('onSale');
    },

    isLowLead: function() {
      return this.get('AB1953');
    },

    isConfigured: function() {
      // If we have priced options, have they been selected?
      if (this.hasPricedOptions()) {
        // TODO: Add method to determine if we've selected one option from each option group
      }
    },

  });

  return Product;
});