define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  var Product = Backbone.Model.extend({
    initialize: function(data) {
      // TODO: Add necessary
      for (finish in this.get('finishes')) {
        console.log(finish);
      }
    },


    // Product Type Info
    hasSquareFootage: function() {
      // TODO: Figure out how to calculate this
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

    isOnSale: function() {
      return this.get('onSale');
    },

    isLoadLead: function() {
      return this.get('AB1953');
    },

    isConfigured: function() {
      // If we have priced options, have they been selected?
      if (this.hasPricedOptions()) {
        // TODO: Add method to determine if we've selected one option from each option group
      };
    },

    // Helper Functions
    getFinishByUniqueId: function(uniqueId) {
      return _.findWhere(this.get('finishes'), {
        uniqueId: uniqueId
      });
    }

  });

  return Product;
});