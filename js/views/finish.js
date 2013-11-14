define([
	'marionette',
	'models/finish'
], function(Marionette, FinishModel) {

	var FinishItemView = Backbone.Marionette.View.extend({

		model: FinishModel,

		events: {
			'mouseenter': 'showFinish',
			'click': 'updateTitle'
		},

		showFinish: function(e) {
			console.log(this.model.attributes);
		},

		updateTitle: function(e) {
			e.preventDefault();
			this.pubSub.trigger('finishClicked', {
				title: this.model.get('title')
			});
		}

	});

	return FinishItemView;

});