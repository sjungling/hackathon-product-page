define([
	'marionette',
	'models/finish'
], function(Marionette, FinishModel) {

	var FinishItemView = Backbone.Marionette.View.extend({

		model: FinishModel,

		events: {
			'mouseenter': 'showFinish',
			'click': 'updatePage'
		},

		/**
		 * showFinish - Swap out relevant product info
		 * 	- Price
		 * 	- Finish Name
		 * 	- Shipping
		 * 	- Lead Time Text
		 * 	- Inventory Level
		 * 	- Product Image
		 * @param  {Event} e mousenterEvent
		 * @return {[type]}   [description]
		 */
		showFinish: function(e) {
			console.log(this.model.attributes);
		},

		updatePage: function(e) {
			// Halt Click action
			e.preventDefault();
			// debugger;
		}


	});

	return FinishItemView;

});