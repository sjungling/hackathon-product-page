define([
	'marionette'
], function() {

	var PriceView = Backbone.Marionette.View.extend({

		initialize: function() {

			this.model = new Backbone.Model();

			this.listenTo(this.pubSub, 'finishHovered', function(data) {
				this.model.set({
					price: '$' + data.price.toFixed(2) || '--' // if we ever get -- we are in trouble
				});
				this.render();
			});
		},

		el: '#productPrice',

		render: function() {
			this.$el.html(this.model.get('price'));
		}

	});

	return PriceView;

});