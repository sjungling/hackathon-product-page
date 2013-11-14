define([
  'backbone',
  'models/priced_option'
], function(Backbone, PricedOptionModel) {

  var PricedOptionView = Backbone.View.extend({

    model: PricedOptionModel,
    events: {
      'click': 'selectionChange'
    },

    initialize: function(){
      this.setElement('#input_' + this.model.attributes.id);
    },

    selectionChange: function(e) {
      if (this.$el.prop('type') === "checkbox" || this.$el.prop('type') === "radio"){
        this.model.set('isSelected', e.currentTarget.checked);
      } else {
        if (this.$el.val().length > 0 ) {
          this.model.set('isSelected', true);
        }
      }
    }

  });

  return PricedOptionView;

});
