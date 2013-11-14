define([
	'marionette'
], function(Marionette) {

	var InventoryView = Backbone.Marionette.View.extend({

		initialize: function() {
			this.listenTo(this.pubSub, 'finishHovered', this.updateStock);
		},

		el: '#prdStockMessage',

		updateStock: function(data) {
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

	return InventoryView;

});