define([
  'underscore',
  'backbone',
  'models/finish',
  'collections/finishes'
], function(_, Backbone, FinishModel, FinishesCollection) {
  var Product = Backbone.Model.extend({
    initialize: function(data) {
      // Create the collection of finishes
      this.collection = new FinishesCollection(this.get('finishes'));

      // Get the current active finish
      this.activeFinish = this.collection.getFinishByUniqueId(this.get('selectedFinishUniqueId'));

      // Mark finish as active
      this.activeFinish.set('isSelected', true);
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

    /**
     * TODO: Deprecate?
     */
    hasPricedOptions: function() {
      return this.get('hasPricedOptions');
    },

    /**
     * TODO: Deprecate?
     */
    hasAvailabilityByLocation: function() {
      return this.get('isAvailableByLocation');
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
    }

  });

  return Product;
});