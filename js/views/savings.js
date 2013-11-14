define([
	'backbone'
], function() {

	var SavingsView = Backbone.View.extend({

		initialize: function() {
			this.model = new Backbone.Model();
			this.listenTo(this.pubSub, 'finishHovered', this.finishHovered);
		},

		el: '#productSavings',

		finishHovered: function(data) {
			this.model.set({
				msrp: data.msrp.toFixed(2),
				savings: data.savings
			});
			this.render();
		},

		render: function() {
			this.$el.html('Originally $' + this.model.get('msrp') + ', You Save ' + this.model.get('savings') + '%');
		}

	});

	return SavingsView;

});