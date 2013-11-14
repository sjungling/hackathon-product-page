define([
  'underscore',
  'backbone',
  'models/option_group'
], function(_, Backbone, OptionGroupModel) {

  var OptionGroupsCollection = Backbone.Collection.extend({

    model: OptionGroupModel,

    getRequiredGroups: function(){
      return this.where({
        isRequired: true
      }) || false;
    },

    getConfiguredOptions: function() {
      return this.where({
        isConfigured: true
      }) || false;
    }
  });

  return OptionGroupsCollection;
});