define([
	'marionette'
], function(Marionette) {

	var InventoryView = Backbone.Marionette.View.extend({

		initialize: function() {
			this.listenTo(this.pubSub, 'finishHovered', this.updateStock);
		},

		el: '#stockCount',

		updateStock: function(data) {
			this.model = new Backbone.Model({
				stock: data.stock
			});
			this.render();
		},

		render: function() {
			if (this.model) {
				var text = this.model.get('stock') > 0 ?
					this.model.get('stock') + ' In Stock' :
					'Out Of Stock';
				this.$el.html(text);
			}
		}

	});

	return InventoryView;

});