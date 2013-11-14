define([
  'underscore',
  'backbone'
], function(_, Backbone) {

    var PricedOptionModel = Backbone.Model.extend({

      defaults: {
        isSelected: true
      }

    });

    return PricedOptionModel;
});