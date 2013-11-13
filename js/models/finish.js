define([
  'underscore',
  'backbone'
], function(_, Backbone) {

  var FinishModel = Backbone.Model.extend({


    defaults: {
      isSelected: false,
      isAvailable: true,
      hasMapRestriction: false
    },

    initialize: function(data) {
      // placeholder
    },

    // helpers
    isSelected: function() {
      return this.get('isSelected');
    }

  });

  return FinishModel;

});