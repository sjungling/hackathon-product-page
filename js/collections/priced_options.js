define([
  'underscore',
  'backbone',
  'models/priced_option'
], function(_, Backbone, PricedOptionModel) {

  var PricedOptionsCollection = Backbone.Collection.extend({

    model: PricedOptionModel
  });

  return PricedOptionsCollection;
});