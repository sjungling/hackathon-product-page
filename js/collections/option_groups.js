define([
  'underscore',
  'backbone',
  'models/option_group'
], function(_, Backbone, OptionGroupModel) {

  var OptionGroupsCollection = Backbone.Collection.extend({

    model: OptionGroupModel
  });

  return OptionGroupsCollection;
});