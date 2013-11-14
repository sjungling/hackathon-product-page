define([
  'underscore',
  'backbone',
  'collections/priced_options'
], function(_, Backbone, PricedOptionsCollection) {

    var OptionGroupModel = Backbone.Model.extend({
      initialize: function(){
        this.options = new PricedOptionsCollection(this.get('options'));
      }
    });

    return OptionGroupModel;
});