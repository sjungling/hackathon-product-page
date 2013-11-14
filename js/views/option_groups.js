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

      for (var i = 0; i < this.optionViews.length; i++) {
        this.optionViews[i].on('pricedOption:changed', this.optionChanged, this);
      };
    },

    optionChanged: function() {
      if (this.isConfigured()) {
        this.model.set('isConfigured', true);
      } else {
        this.model.set('isConfigured', false);
      }
    },
    isConfigured: function() {
      if (this.model.get('isRequired')) {
        if (this.model.options.where({isSelected:true}).length === 1) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    }

  });

  return OptionGroupsView;

});
