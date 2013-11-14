define([
	'marionette'
], function() {

	var SavingsView = Backbone.Marionette.View.extend({

		initialize: function() {
			this.listenTo(this.pubSub, 'finishHovered', this.finishHovered);
		},

		el: '#productSavings',

		finishHovered: function(data) {

			if (!this.model) {
				this.model = new Backbone.Model();
			}

			this.model.set({
				msrp: data.msrp.toFixed(2) || '--', // if we ever get -- we are in trouble
				savingsPercent: Math.ceil(((data.msrp - data.price) * 100) / data.msrp)
			});
			this.render();
		},

		render: function() {
			if (this.model) {
				this.$el.html('Originally $' + this.model.get('msrp') + ', You Save ' + this.model.get('savingsPercent') + '%');
			}
		}

	});

	return SavingsView;

});