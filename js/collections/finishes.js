define([
  'underscore',
  'backbone',
  'models/finish'
], function(_, Backbone, FinishModel) {

  var FinishesCollection = Backbone.Collection.extend({

    model: FinishModel,

    /**
     * hasSelectedFinish - shortcut to determine whether a finish is active
     * @return {Boolean} If the number of Finish models that are selected is > 0
     */
    hasSelectedFinish: function() {
      // Select the first model where isSelected is true
      // this.where()
    },

    /**
     * getSelectedFinish - get the currently selected finish
     * @return {Object} Finish Model
     */
    getSelectedFinish: function() {

    },

    /**
     * getFinishByUniqueId - get the Finish model by UniqueId
     * @return {Object} Finish Model
     */
    getFinishByUniqueId: function(uniqueId){
      return this.findWhere({uniqueId: uniqueId});
    }


  });

  return FinishesCollection;

});