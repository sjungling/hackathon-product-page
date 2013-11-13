define([
	'marionette',
	'views/finish'
], function(m, FinishItemView) {

	var FinishesCollectionView = Backbone.Marionette.CollectionView.extend({
		itemView: FinishItemView
	});

	return FinishesCollectionView;
});