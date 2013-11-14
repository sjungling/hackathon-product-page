define([
	'marionette',
	'views/finish',
	'collections/finishes'
], function(m, FinishView, FinishesCollection) {

	var FinishesView = Backbone.Marionette.View.extend({

		initialize: function() {
			this.finishViews = [];
			this.collection.each(function(model) {
				this.finishViews.push(new FinishView({
					el: this.$('#finish' + model.get('uniqueId')).closest('li'),
					model: model
				}));
			}.bind(this));
		},

		el: '.finishes',

		collection: FinishesCollection

	});

	return FinishesView;
});