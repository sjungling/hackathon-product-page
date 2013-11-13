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

    }

  });

  return FinishModel;

});