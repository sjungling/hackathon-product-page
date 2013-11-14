define([
	'marionette',
	'views/finish'
], function(m, FinishItemView) {

	var FinishesCollectionView = Backbone.Marionette.CollectionView.extend({

		initialize: function() {
			console.log('initializing finishes collection view');
		},

		itemView: FinishItemView,

		events: {
			'click': 'showFinish'
		},

		showFinish: function(e) {
			console.log('hovered!');
		}


	});

	return FinishesCollectionView;
});