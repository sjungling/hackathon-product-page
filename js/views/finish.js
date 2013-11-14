define([
	'marionette',
	'models/finish'
], function(Marionette, FinishModel) {

	var FinishView = Backbone.Marionette.View.extend({

		initialize: function() {
			this.listenTo(this.pubSub, 'finishClicked', this.render)
		},

		model: FinishModel,

		events: {
			'mouseenter': 'showFinish',
			'mouseleave': 'showDefaultFinish',
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
			this.pubSub.trigger('finishHovered', this.model.toJSON());
		},

		showDefaultFinish: function(e) {
			var finish = window.BUILD.Collections.Finishes.getSelectedFinish();
			this.pubSub.trigger('finishHovered', finish.toJSON());
		},

		updatePage: function(e) {
			e.preventDefault();
			this.pubSub.trigger('finishClicked', this.model.toJSON());
		},

		render: function() {
			this.$el.find('label').toggleClass('active', this.model.get('isSelected'))
		}


	});

	return FinishView;

});