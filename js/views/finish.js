define([
	'marionette',
	'models/finish'
], function(Marionette, FinishModel) {

	var FinishItemView = Backbone.Marionette.View.extend({

		model: FinishModel,

		events: {
			'mouseenter': 'showFinish'
		},

		showFinish: function(e) {
			console.log(this.model.attributes);
		}

	});

	return FinishItemView;

});