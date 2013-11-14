define([
	'backbone'
], function() {

	var PriceView = Backbone.View.extend({

		initialize: function() {

			// this.model = new Backbone.Model();
			this.configurations = [];
			this.listenTo(this.pubSub, 'finishHovered', function(data) {
				this.model.set({
					price: data.price
				});
				this.render();
			});

			// price changes from configuration options
			this.listenTo(this.pubSub, 'pricedOption:changed', function(data){
				if (data.get('isSelected')) {
					this.configurations.push(data.get('price'));
				} else {
					this.configurations.splice(this.configurations.indexOf(data.get('price')), 1);
				}
				this.render();
			});
		},

		render: function() {
			var modelPrice = this.model.get('price');
			var configurationsPrice = _.reduce(this.configurations, function(memo, num){ return memo + num; }, 0);
			var totalPrice = BUILD.Utilities.formatCurrency(modelPrice+configurationsPrice);
			this.$el.html(totalPrice);
		}

	});

	return PriceView;

});