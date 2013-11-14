define([
  'backbone',
  'views/priced_option',
  'models/option_group'
], function(Backbone, PricedOptionView, OptionGroupModel) {

  var OptionGroupsView = Backbone.View.extend({

    model: OptionGroupModel,
    el: '.poGroup',
    initialize: function() {
      this.optionViews = [];
      for (var i = 0; i < this.model.options.models.length; i++) {
        this.optionViews.push(new PricedOptionView({model: this.model.options.models[i]}));
      }
      console.log(this.optionViews);
    },

  });

  return OptionGroupsView;

});
