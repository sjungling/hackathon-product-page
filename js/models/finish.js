define([
  'underscore',
  'backbone'
], function(_, Backbone) {

  var FinishModel = Backbone.Model.extend({

    // helpers
    isSelected: function() {
      return this.isSelected;
    },

    defaults: {
    	isSelected: false,
    	isAvailable: true,
    	hasMapRestrictions: false
    },

    initialize: function(data) {
    	// console.log(data);
    	// TODO:
    	// 	- Find sane way to determine map restrictions where are a combination of Pro Status and pricebook
    }

  });

  return FinishModel;

});