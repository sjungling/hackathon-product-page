define([
  'backbone',
  'views/priced_option',
  'models/option_group'
], function(Backbone, PricedOptionView, OptionGroupModel) {

  var OptionGroupsView = Backbone.View.extend({

    model: OptionGroupModel,
    el: '.poGroup',
    initialize: function() {
      for (var i = 0; i < this.model.options.models.length; i++) {
        new PricedOptionView({model: this.model.options.models[i]});
      }
    },

    selectionChange: function(e) {
      console.log(e.currentTarget);
    }

  });

  return OptionGroupsView;

});
