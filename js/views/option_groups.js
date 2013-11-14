define([
  'marionette',
  'models/option_group'
], function(Marionette, OptionGroupModel) {

  var OptionGroupsView = Backbone.Marionette.View.extend({

    model: OptionGroupModel,
    events: {
      'click .pricedOption': 'selectionChange'
    },

    selectionChange: function(e) {
      console.log(e.currentTarget);
    }

  });

  return OptionGroupsView;

});
