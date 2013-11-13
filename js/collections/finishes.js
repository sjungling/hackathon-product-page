define([
  'underscore',
  'backbone',
  'models/finish'
], function(_, Backbone, FinishModel) {

  var FinishesCollection = Backbone.Collection.extend({

    model: FinishModel

  });

  return FinishesCollection;

});