define([
	'marionette',
	'models/finish'
], function(Marionette, FinishModel) {

	var FinishItemView = Backbone.Marionette.ItemView.extend({
		model: FinishModel
	});

	return FinishItemView;

});