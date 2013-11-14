define([
  'underscore',
  'backbone',
  'models/priced_option'
], function(_, Backbone, PricedOptionModel) {

  var PricedOptionsCollection = Backbone.Collection.extend({

    model: PricedOptionModel,

    getSelection: function(){
      return this.where({
        isSelected: true
      }) || false;
    }
  });

  return PricedOptionsCollection;
});