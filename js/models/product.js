define([
  'underscore',
  'backbone',
  'models/finish',
  'collections/finishes'
], function(_, Backbone, FinishModel, FinishesCollection) {
  var Product = Backbone.Model.extend({
    initialize: function(data) {
      // Create the collection of finishes
      this.finishes = new FinishesCollection(this.get('finishes'));

      // Get the current active finish
      this.activeFinish = this.finishes.getFinishByUniqueId(this.get('selectedFinishUniqueId'));

      // Mark finish as active
      this.activeFinish.set('isSelected', true);
    },

    // Product Type Info
    hasSquareFootage: function() {
      return this.get('hasSquareFootage');
    },

    isSingleFinish: function() {
      return (this.get('finishes').length === 1);
    },

    hasMultipleFinishes: function() {
      return this.get('finishes').length > 0;
    },

    /**
     * TODO: Deprecate?
     */
    hasPricedOptions: function() {
      return this.get('hasPricedOptions');
    },

    /**
     * TODO: Deprecate?
     */
    hasAvailabilityByLocation: function() {
      return this.get('isAvailableByLocation');
    },

    isOnSale: function() {
      return this.get('onSale');
    },

    isLowLead: function() {
      return this.get('AB1953');
    },

    isConfigured: function() {
      // If we have priced options, have they been selected?
      if (this.hasPricedOptions()) {
        // TODO: Add method to determine if we've selected one option from each option group
      }
    },

    fetchStock: function() {
      var _this = this;
      if (this.hasAvailabilityByLocation() !== false) {
        return false;
      }

      // BIG TODO: Move all of this into a BB view.
      // TODO get postcal code from form or cookie
      var passZip = 95926;
      $.ajax({
        url: "http://local.build.com/api/product/availabilitybypostalcode/productuniqueid/" + this.get('selectedFinishUniqueId') + "/postalcode/" + passZip,
        dataType: "json",
        crossdomain: true,
        success: function(resp) {
          if (parseInt(resp.STATUS.CODE, 10) === 0) {
            /**
             * MOCK Return Object
              {
                "DATA": {
                  "POSTALCODE": "95926",
                  "FINISHES": [
                    {
                      "FINISH": "Stainless Steel",
                      "PRODUCTUNIQUEID": 2089876,
                      "STOCKCOUNT": 0,
                      "VARIATIONID": 1,
                      "ISAVAILABLE": false
                    }
                  ],
                  "HASSERVICES": true,
                  "SERVICES": [
                    2,
                    3,
                    4,
                    5,
                    6
                  ],
                  "POSTALCODESOURCE": "confirmed",
                  "MANUFACTURER": "GE",
                  "PRODUCTID": "CDWT280V"
                },
                "STATUS": {
                  "MESSAGE": "success",
                  "CODE": "0"
                }
              }
             */
            // Loop through finishes return object
            // Look up finish from collection
            // Update finish object with new data
            // updateStock(resp.DATA.FINISHES);
            for(finish in resp.DATA.FINSIHES) {
              var selectedFinish = _this.finishes.getFinishByUniqueId(finish.PRODUCTUNIQUEID)
              selectedFinish.set('stock', finish.STOCKCOUNT);
              selectedFinish.set('isAvailable', finish.ISAVAILABLE);
            }
          }
        },
        error: function() {
          console.error("Couldn't fetch stock");
        }
      });

    }

  });

  return Product;
});