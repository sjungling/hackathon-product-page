define([
	'marionette'
], function() {

	var ImageView = Backbone.Marionette.View.extend({

		initialize: function() {
			this.listenTo(this.pubSub, 'finishHovered', this.updateImage);
		},

		el: '#productImage',

		updateImage: function(data) {
			this.model = new Backbone.Model({
				image330x320: data.image330x320
			});
			this.render();
		},

		render: function() {
			// don't render on initial view binding
			if (this.model) {
				this.$el.attr('src', this.model.get('image330x320'));
			}
		}

	});

	return ImageView;

});