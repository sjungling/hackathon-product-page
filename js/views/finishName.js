define([
	'marionette'
], function() {

	var FinishNameView = Backbone.View.extend({

		initialize: function() {
			this.model = new Backbone.Model();
			this.listenTo(this.pubSub, 'finishHovered', this.updateFinishName);
		},

		el: '#finishName',

		updateFinishName: function(data) {
			this.model.set({
				name: data.name
			});
			this.render();
		},

		render: function() {
			this.$el.html(this.model.get('name'));
		}

	});

	return FinishNameView;

});