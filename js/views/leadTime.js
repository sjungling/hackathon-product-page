define([
	'marionette'
], function(Marionette) {

	var LeadTimeView = Backbone.Marionette.View.extend({

		initialize: function() {
			this.listenTo(this.pubSub, 'finishHovered', this.updateLeadTime);
		},

		el: '#prdStockMessage',

		updateLeadTime: function(data) {
			this.model = new Backbone.Model({
				leadTimeMessage: data.leadTimeMessage
			});
			this.render();
		},

		render: function() {
			if (this.model) {
				this.$el.html('Ships in: ' + this.model.get('leadTimeMessage'));
			}
		}

	});

	return LeadTimeView;

});