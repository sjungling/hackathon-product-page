define([
  'underscore',
  'backbone'
], function(_, Backbone) {

  var FinishModel = Backbone.Model.extend({

    // helpers
    isSelected: function() {
      return this.isSelected;
    },

    defaults: {
      isSelected: false,
      isAvailable: true,
      hasMapRestriction: false
    },

    initialize: function(data) {
      // placeholder
    }

  });

  return FinishModel;

});