define([
	'marionette'
], function(Marionette) {

	var HeadingView = Backbone.Marionette.View.extend({

		initialize: function() {

			this.model = new Backbone.Model();

			this.listenTo(this.pubSub, 'finishClicked', this.updateTitle);
		},

		el: '#titleName',

		updateTitle: function(data) {
			this.model.set(data);
			this.render();
		},

		render: function() {
			this.$el.html(this.model.get('title'));
		}

	});

	return HeadingView;

});