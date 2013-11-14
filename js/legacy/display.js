jQuery(function($) {

  var util = window.util || {},
    $availabilityVaries = $('#availabilityVariesByLocation'),
    $productImage = $('#productImage'),
    $productImageLink = $('#productImageLink'),
    $qty = $('#qtyselected'),
    $priceAdd = $('.priceAddition'),
    $priceWrap = $('#priceWrap'),
    $prdPrice = $('#productPrice, #priceOptionsProductPrice'),
    $prdSavings = $('#productSavings'),
    $finishRads = $('input.finishRad'),
    $finishName = $('#finishName'),
    $mainImageBox = $('.imagebox'),
    $freeShipping = $("#freeShippingQualifier"),
    $stockAll = $("#stockCount, #out-of-stock, #stockDefault, #cantShip"),
    $configureButton = $('#complex-config-button'),
    $galleryImages = $('.product-gallery'),
    $leadTimeText = $("#lead-time"),
    $titleProdId = $('#titleProdId'),
    $titleName = $('#titleName'),
    $titleManufacturer = $('#titleManufacturer'),
    $uniqueid = $('#productUniqueId'),
    $productLink = $('a.productLink'),
    $window = $(window),
    $bodyWrap = $('#body-wrap'),
    $manuLogo = $("#manufLogo"),
    $selFinish = $('#prdAddToCart input[type=radio], #prdAddToCart input#thisfinish[type=hidden]'),
    $addToCartBtn = $(".addToCart"),
    baseUID = $('input[name="uniqueid"]').attr('value'),
    dl = dataLayer,
    userOS = dl.browser.OS,
    tablet = (userOS === 'iOS') || (userOS === 'Android') || (userOS === 'Nexus') || (userOS === 'Kindle'),
    touch = Modernizr.touch,
    preloadList = {
      normal: [],
      large: [],
      order: []
    },
    manufacturerName = dl.manufacturer,
    productId = dl.productId,
    productTitle = dl.title,
    hasAddToCartMAP = $finishRads.filter("[data-hasAddToCartMAPBuster=true]").size() > 0,
    galleryState = '',
    socialShareContent = window.dataLayer.socialData,
    getFinishByUniqueId,
    isPostalCodeDefined,
    getSelectedFinish,
    hasAvailabilityByLocation,
    isFinishSelected,
    updateStockMessage,
    isAvailableByLocation = ($availabilityVaries.length ? true : false),
    updatePageMessaging,
    $stockZero = $("#out-of-stock"),
    $stockCount = $("#stockCount"),
    $stockDefault = $("#stockCount"),
    getStockMessagePreamble;




  /**
   * NOTES: This should be replaced through a combination of BB & Marionette
   */
  updatePageMessaging = function updatePageMessaging($swatch) {

    // setup
    var currentSelectedFinish, stock, hideOutOfStockMessage, isAvailable;
    currentSelectedFinish = $swatch || getSelectedFinish();

    // If a finish is selected, grab stock and hideOoSM
    if (currentSelectedFinish.length) {
      // Get stock count
      stock = parseInt(currentSelectedFinish.data('stock'),10);

      // Should we hide out of stock message?
      hideOutOfStockMessage = currentSelectedFinish.data("hidemessage") === true ? true : false;
    }


    if (hasAvailabilityByLocation()) {
      // GE  or Hotpoint
      isAvailable = currentSelectedFinish.data("isavailable");

      // Always show fields
      $availabilityVaries.show();

      // Is a finish select
      if (isFinishSelected()) {

        // Is the postal code already defined
        if (isPostalCodeDefined()) {

          // Product Is available
          if (isAvailable) {

            // Hide Can't Ship Message
            pageMessaging.hideUnavailableByLocation();

            updateStockMessage($stockCount, stock).show();

            if (stock === 0) {
              // no stock
              $stockCount.hide();

              if (hideOutOfStockMessage === false) {
                $stockZero.show();
              }
            } else if (stock > 0) {
              // Product has availability by location

              // Show stock
              $stockZero.hide();

              // NOTE: Should always be shown
              // $('.stock-messages').show();
              $leadTimeText.show();

              // Ensure that the configure / add to cart button is active
              toggleAddToCart(true);
            } else {
              if (hideOutOfStockMessage === false) {
                $stockCount.text('Out Of Stock').addClass('out-of-stock').show();
              }
            }
          } else {
            // Product is not available
            // Render Can't Ship Message
            pageMessaging.showUnavailableByLocation();

            /** Hide the following:
                - Current Stock
                - Out of Stock badge
                - Free shipping
                - Lead Time Text
              */
            $stockCount.hide();
            $stockZero.hide();
            $freeShipping.hide();
            $leadTimeText.hide();
          }
        }
      }

    } else {
      // EVERY OTHER PRODUCT IN OUR CATALOG BUT GE & HOTPOINT
      // Huzzah!

      isAvailable = true;


      // Always show lead time text
      //
      $leadTimeText.show();
      if (stock === 0) {
        // Product has no inventory

        // Always hide the stockCount
        $stockCount.hide();


        if (hideOutOfStockMessage) {
          $stockZero.hide();
        } else {
          $stockZero.show();
        }
      } else if (stock > 0) {
        // Has stock

        // Hide Out of Stock in case it was previously shown
        $stockZero.hide();

        // Update Stock count and show
        updateStockMessage($stockCount, stock).show();
      } else {
        // If stock is unknown or previous logic fails for some reason
        if (hideOutOfStockMessage) {
          $stockZero.hide();
        } else {
          $stockZero.show();
        }
      }

    }
  };


  /**
   * FIXED: Replaced via Finishes Collection
   */
  getFinishByUniqueId = function(uniqueId) {
    if (uniqueId === undefined) {
      return null;
    }
    return _.find(window.dataLayer.finishes, function(finish) {
      if (finish.uniqueId === parseInt(uniqueId, 10)) {
        return finish;
      }
    });
  };

  /**
   * FIXED: Replaced via utils.js
   * @return {Boolean} [description]
   */
  isPostalCodeDefined = function() {
    return $.cookie('postalCode') !== '';
  };


  /**
   * FIXED: Replace via Finishes Collection
   * @return {[type]} [description]
   */
  getSelectedFinish = function() {
    // Does this Product have multiple finishes?
    var $selected;
    if ($selFinish.first().prop("type").toLowerCase() === "radio") {
      // Mark helper var as true
      // Get just the selected finish
      $selected = $selFinish.filter(':checked');
    } else if ($selFinish.first().prop("type").toLowerCase() === "hidden") {
      // Just one finish? No problem, just use the first object
      $selected = $selFinish.first();
    }

    return $selected;
  };

  /**
   * FIXED: Replaced via dataLayer augmentation & Product model
   */
  hasAvailabilityByLocation = function() {
    var manufacturers, productManufacturer;
    manufacturers = ['ge', 'hotpoint'];
    // Normalize input - Trim / Lower
    productManufacturer = window.dataLayer.manufacturer.replace(/^\s+|\s+$/g, '').toLowerCase();
    return (_.indexOf(manufacturers, productManufacturer) !== -1);
  };


  /**
   * TODO: Replace with new View management
   */
  updateStockMessage = function($message, stock) {
    if (stock === undefined) {
      return $message.text('').removeClass('out-of-stock');
    }
    stock = parseInt(stock, 10);
    $message.text(stock + " In Stock");
    if (stock > 0) {
      return $message.removeClass('out-of-stock');
    } else {
      return $message.addClass('out-of-stock');
    }
  };

  //wg validation
  var $whiteGloveInstallCheck = $('input[name=Whiteglove]');

  var installZipChecked = false;
  var installZipSupported = false;

  /**
   * FIXED: Relocated to utils.js
   */
  var isZip = function(str) {
    // US Zip: 12345[-9876]
    // Canadian Zip: H2S 2G1
    return ((/^\d{5}(?:[\-\s]*\d{4})?$/).test(str) || (/^[a-zA-Z]\d[a-zA-Z] \d[a-zA-Z]\d$/).test(str));
  };

  $finishRads.attr('checked', false);

  $prdPrice.data('defaultText', $prdPrice.first().text());
  $prdSavings.data('defaultText', $prdSavings.html());
  $productImage.data('defaultImage', $productImage.attr('src'));
  $productImageLink.data('defaultImage', $productImageLink.attr('href'));



  // GE availablity by location text - we do this here so we don't render it on non-GE products.
  var pageMessaging = {
    makeUnavailableMessage: function() {
      // Test if we all ready have the messaging.
      if ($('#cantShip').length === 0) {
        $('.stock-messages').after('<div class="stock-message warning" id="cantShip">Sorry, we can\'t ship this product to the selected Postal Code</div>');
      }
      return $('cantShip');
    },
    // Convenience methods ahoy!
    showUnavailableByLocation: function() {
      this.makeUnavailableMessage();
      $('#cantShip').show();
      $('#stockCount').hide();
    },
    hideUnavailableByLocation: function() {
      this.makeUnavailableMessage();
      $('#cantShip').hide();
      $('#stockCount').show();
    }
  };


  /**
   * FIXED: Replaced via Finishes Collections
   */
  isFinishSelected = function() {
    return (getSelectedFinish().length > 0);
  };

  /**
   * TODO: Evaluate where this should live
   */
  getStockMessagePreamble = function(message) {
    if (message === undefined) {
      return '';
    }
    return message.toLowerCase().indexOf('ship') > -1 ? '' : 'Ships in: ';
  };

  var $activeSwatch, $swatchLinks, $swatches, resetActiveSwatch, resetDefaultImage, setSwatchDetails, swatchesHoverTimeout;

  if ($finishRads.length) {
    $leadTimeText.data("defaultText", $leadTimeText.text());
    $finishName.data("defaultText", $finishName.text());
    $freeShipping.data("defaultText", $freeShipping.text());
    $titleProdId.data("defaultText", $titleProdId.text());
    $titleName.data("defaultText", $titleName.text());
    $uniqueid.data("defaultText", $uniqueid.text());
    swatchesHoverTimeout = null;
    $activeSwatch = $(".swatch_wrapper.selected");
    $swatches = $(".swatch_wrapper");
    $swatchLinks = $(".swatchlink");
    if ($activeSwatch.length) {
      /* mark the active swatch*/
      $("#finish" + $activeSwatch.data("uniqueid")).attr("checked", true);
    }


    /**
     * TODO: Replace this will better view management
     */
    setSwatchDetails = function($sw, clicked) {
      var stockMessagePreamble = "", selectedFinish;

      // This handles the case when you have no selected finish and are moving the mouse off of swatches.
      if ($sw.length === 0) {

        // Reset view to default text
        $productImage.attr("src", $productImage.data("defaultImage"));
        $productImageLink.attr("href", $productImage.data("defaultImage"));
        $leadTimeText.text(stockMessagePreamble + $leadTimeText.data("defaultText"));
        $prdPrice.text($prdPrice.data("defaultText"));
        $prdSavings.html($prdSavings.data("defaultText"));
        $finishName.text($finishName.data("defaultText"));
        $freeShipping.text($freeShipping.data("defaultText"));
        $titleProdId.text($titleProdId.data("defaultText"));
        $titleName.text($titleName.data("defaultText"));
        $uniqueid.text($uniqueid.data("defaultText"));
        $productLink.attr("href", $productImage.attr("href"));
        $priceWrap.removeClass("on");
        $pleaseConfigure.addClass("on");

        // Hide Out of Stock
        $stockZero.hide();

        $stockCount.hide();

        // MAP Restrictions
        if (hasAddToCartMAP) {
          $prdPrice.addClass("strikethrough");
        } else {
          $prdPrice.removeClass("strikethrough");
        }
        // Return to caller
        return;
      }

      // Determine Lead Time Text Preamble
      stockMessagePreamble = getStockMessagePreamble($sw.data('stockmessage'));

      // Get selected finish from dataLayer
      selectedFinish = getFinishByUniqueId($sw.data('uniqueid'));

      // Update Product Image
      $productImage.attr("src", $sw.data("image"));
      $productImageLink.attr("href", $sw.data("largeimage"));

      // Set Lead Time TExt
      $leadTimeText.text(stockMessagePreamble + $sw.attr("data-stockmessage"));

      // Update Finish Name
      $finishName.text($sw.data("name"));

      // Update Shipping
      $freeShipping.text($sw.data("freeshipping"));

      // Discontinued Products
      if ($sw.data("status") === "discontinued") {
        $addButton.hide();
        $discontinuedText.show();
      } else {
        $addButton.show();
        $discontinuedText.hide();
      }

      // Click Events only
      if (clicked) {
        /** Update various parts of the page
            - Product Name
            - Product ID
            - BCI
            - Document Title
        */
        $titleName.text(selectedFinish.title);
        $titleProdId.text(selectedFinish.sku);
        $uniqueid.text(selectedFinish.uniqueId);
        document.title = manufacturerName + " " + selectedFinish.sku + " " + selectedFinish.title;
      }

      updatePageMessaging($sw);
      return updateTotal(true, $sw.closest("li").find("input").get(0));
    };


    /**
     * TODO: Helper method… add to a view file
     */
    resetActiveSwatch = function() {
      return setSwatchDetails($activeSwatch);
    };


    /**
     * Start of EVENTS!!!
     */
    $('.finishes').on('mouseleave', function() {
      resetActiveSwatch();
    });

    if (!(tablet && touch)) {
      $swatches.on('mouseenter', function() {
        return setSwatchDetails($(this), false);
      });
    }

    /**
     * TODO: Integrate into BB views
     */
    $swatchLinks.on("click", function(e) {
      if ($activeSwatch) {
        $activeSwatch.closest("label").removeClass("active");
      }
      $activeSwatch = $(this).find(".swatch_wrapper");
      $activeSwatch.closest("label").addClass("active");
      $("#finish" + $activeSwatch.data("uniqueid")).attr("checked", true);
      $('#availabilityVariesByLocation').show();
      setSwatchDetails($activeSwatch, true);
      $activeSwatch.trigger("swatch:changed", $activeSwatch.data());
      e.stopPropagation();
      return false;
    });



    // Preloads some images
    $swatches.each(function() {
      var img = new Image();
      img.src = $(this).data("image");
      return img;
    });
  } else {

    /**
     * TODO: Method for delegate of the product image region
     */
    resetDefaultImage = function() {
      $productImage.attr("src", $productImage.data("defaultImage"));
      return $productImageLink.attr("href", $productImage.data("defaultImage"));
    };

    $mainImageBox.on('mouseenter', function() {
      if (swatchesHoverTimeout) {
        return window.clearTimeout(swatchesHoverTimeout);
      }
    });

    $galleryImages.on('mouseleave', function() {
      return swatchesHoverTimeout = window.setTimeout(resetDefaultImage, 100);
    });
  }

  //* Product Questions *
  $('#questionbox').on('focus', function(e) {
    e.preventDefault();
    $('#vert_slide').slideDown();
  });


  /** TODO:
  * Deprecate?
  */
  $('a.vote').on('click', function(e) {
    var count = $(this.hash);
    e.preventDefault();
    $.ajax(this.href).success(function(response) {
      if ($.trim(response) === 'true') {
        count.removeClass("vote_error").addClass("vote_success").text((+count.text()) + 1);
      } else {
        count.removeClass("vote_success").addClass("vote_error");
      }
    });
  });

  // Availability by Location
  var $locationBtn, $location_text, $options, $services, fetchStock, getByAvailability, getFinishData, initialLoad, toggleAddToCart, updateFinish, updateStock;

  if ($availabilityVaries.length) {
    $locationBtn = $("#location_btn");
    $location_text = $("#location_text");
    $options = $("[data-service-id]");
    $services = $("[data-service-id]").filter(function() {
      return parseInt($(this).data("service-id"), 10) > 0;
    });
    initialLoad = true;
    // Initially hide messaging
    $("#stockCount, #out-of-stock, #stockDefault, #freeShippingQualifier, #lead-time").hide();


    /**
     * TODO: Look into adding another collection of priced options to Product model
     */
    getByAvailability = function($objects, available) {
      if (available === null || available === undefined) {
        available = true;
      }
      if ($objects === null || $objects === undefined) {
        return [];
      }
      return $objects.filter(function() {
        if ($(this).data("option-available") === available) {
          return this;
        }
      });
    };


    /**
     * TODO: This should be moved to a product level view handler
     * @return {[type]} [description]
     */
    fetchStock = function() {
      var $availabilityDone, $availabilityLoading, passZip, userZip;
      userZip = $location_text.attr("value");
      passZip = (userZip ? "/postalcode/" + encodeURI($("#location_text").attr("value")) : "");
      $availabilityLoading = $("#availabilityLoading");
      $availabilityDone = $("#availabilityDone");
      if (initialLoad) {
        $options.attr("data-option-available", true);
      } else {
        if (!isZip($.trim(userZip))) {
          if ($('#invalid-postal-code').length) {
            $('#invalid-postal-code').show();
          } else {
            $locationBtn.after('<div id="invalid-postal-code" class="alert-box warning">Please enter a valid postal code</div>');
          }
          return false;
        } else {
          $locationBtn.next('.alert-box').remove();
        }
      }
      $availabilityLoading.removeClass("hide");
      $.ajax({
        url: "/api/product/availabilitybypostalcode/productuniqueid/" + baseUID + passZip,
        dataType: "json",
        success: function(resp) {
          if (parseInt(resp.STATUS.CODE, 10) !== 0) {
            // If the Postal Code has an error, ensure that the input field is visible
            $availabilityVaries.show();

            toggleAddToCart(false);
            $.cookie('postalCodeSource', null, {
              path: '/'
            });
          } else {
            updateStock(resp.DATA.FINISHES);
            $.cookie('postalCode', (resp.DATA.POSTALCODE), {
              path: '/'
            });
            $.cookie('postalCodeSource', (resp.DATA.POSTALCODESOURCE || ""), {
              path: '/'
            });
            $location_text.attr("value", $.cookie('postalCode'));
            if (resp.DATA.SERVICES && resp.DATA.SERVICES.length) {
              $services.each(function() {
                var $this;
                $this = $(this);
                $this.attr("data-option-available", $.inArray(parseInt($this.data("service-id"), 10), resp.DATA.SERVICES) > -1);
              });
            } else {
              $services.attr("data-option-available", false);
            }
            // Hide unavailable services
            getByAvailability($services, false).each(function() {
              var $this;
              $this = $(this);
              $this.attr({
                checked: false
              }).trigger('change');
            });

            // Show available services
            getByAvailability($services, true).show();

            $('[data-free-installation]').on('change', function() {
              var $input = $(this);
              if ($input.attr('checked') === "checked") {
                $('[data-required-install]').attr('checked', true).trigger('change');
              }
            });

            if (getByAvailability($options, true).length) {
              $(".steps").find(".poGroup").not(':has([data-option-available=true])').hide();
              $(".steps").find(".poGroup").has('[data-option-available=true]').show();
              $configureButton.show();
              $("#cmplx").show();
            } else {
              $("#cmplx").hide();
              $configureButton.hide();
            }

            initialLoad = false;
            if ($finishRads.length) {
              updateStockMessage($stockCount, $activeSwatch.data("stock"));
            }
            updatePageMessaging();
          }
        },
        error: function() {
          if (!initialLoad) {
            console.error("Sorry, we failed to retrieve the stock information for this product.");
          }

          toggleAddToCart(false);
          $.cookie('postalCodeSource', null, {
            path: '/'
          });
          return $services.show();
        }
      });
    };

    /**
     * TODO: Should be called by fetchStock with return object
     * @param  {[type]} $el       [description]
     * @param  {[type]} stockData [description]
     * @return {[type]}           [description]
     */
    updateFinish = function($el, stockData) {
      var $dataContainer, finishData;
      if ($el.attr("value") !== "0" && stockData && stockData.length) {
        finishData = getFinishData($el.val(), stockData);
        if (!finishData) {
          return;
        }
        if ($el.data('sku') !== undefined) {
          $dataContainer = $el;
        } else {
          $dataContainer = $el.parent("li").find("div[data-name]");
        }
        $dataContainer.data({
          "stock": finishData.STOCKCOUNT,
          "isavailable": finishData.ISAVAILABLE
        });

        jQuery.each(jQuery("div.swatch_wrapper"), function(index, swatch) {
          //Use finishData to update in stock message.
          if (parseInt(jQuery(swatch).attr("data-uniqueid"), 10) === finishData.PRODUCTUNIQUEID) {
            jQuery(swatch).attr("data-stock", finishData.STOCKCOUNT);
          }
        });

        if (finishData.ISAVAILABLE) {
          return $el.parent("li").find("label").removeClass("unavailable");
        } else {
          return $el.parent("li").find("label").addClass("unavailable");
        }
      }
    };

    /**
     * FIXED: Replaced with method in Finish Collection
     */
    getFinishData = function(uid, finishes) {
      var i, len;
      i = 0;
      len = finishes.length;
      while (i < len) {
        if (finishes[i].PRODUCTUNIQUEID === parseInt(uid, 10)) {
          return finishes[i];
        }
        i++;
      }
    };

    /**
     * TODO: This shoudl be integrated into the method that replaces updateFinish
     */
    updateStock = function(stockData) {
      if (!$selFinish.length) {
        return;
      }
      return $selFinish.each(function() {
        return updateFinish($(this), stockData);
      }).trigger("change");
    };

    /**
     * TODO: Purchase Box level method to toggle add to cart button
     * @param  {[type]} on_ [description]
     * @return {[type]}     [description]
     */
    toggleAddToCart = function(on_) {
      $addToCartBtn.toggleClass("disabled", !on_);
      return $configureButton.toggleClass("disabled", !on_);
    };
    $location_text.on("keyup", function(e) {
      $.cookie('locationChanged', ($location_text.val() !== $.cookie('postalCode')), {
        path: '/'
      });
      toggleAddToCart(!$.cookie('locationChanged'));
      if (e.keyCode === 13) {
        return fetchStock();
      }
    });
    $locationBtn.on("click", function(e) {
      e.preventDefault();
      fetchStock();
      return false;
    });
    fetchStock();
  }

  //whiteglove install
  getInstallAvailability = function() {
    var $installLocationBtn = $('#install_location_btn'),
      $install_location_text = $('#install_location_text'),
      $options = $('[IDServiceid]'),
      $services = $('[IDServiceid]').filter(function() {
        return parseInt($(this).attr("IDServiceid"), 10) > 0;
      }),
      initialLoad = true;

    var userZip = $('#install_location_text').val(),
      passZip = userZip ? "/postalcode/" + escape($('#install_location_text').val()) : '',
      $availabilityLoading = $('#availabilityLoading'),
      $availabilityDone = $('#availabilityDone');

    if (!isZip($.trim(userZip))) {
      return $("#wg-zip-label-result").html("<strong>Please enter a valid ZIP code.</strong>");
    }

    //show wait cursor getCheckoutService().getCityByZip(cleanZip)
    $("body").css("cursor", "progress");
    return $.ajax({
      url: "/api/product/availinstallbypostalcode/productuniqueid/" + baseUID + passZip,
      dataType: 'json'
    }).done(function(resp) {

      //turn off the wait cursor
      $("body").css("cursor", "default");

      if (resp.DATA.SERVICES) {
        services = JSON.parse(resp.DATA.SERVICES);

        manuf = resp.DATA.MANUFACTURER;
        type = resp.DATA.TYPE;
        fuel = resp.DATA.FUEL;
        city = resp.DATA.CITYNAME;

        if (services.PRODUCTINSTALLATION === "N") {
          installZipSupported = false;
          //If check is set from prev successful lookup deselect wich will also update cart
          if ($whiteGloveInstallCheck.is(':checked')) {
            $whiteGloveInstallCheck.trigger('click');
            $whiteGloveInstallCheck.attr("checked", false);
          }

          $("#wg-zip-label-result").html("<strong>Sorry, installation is unavailable for this product in " + city + ".</strong>");

        } else {
          installZipChecked = true;
          installZipSupported = true;
          $("#install_location_text").attr('checked', true);
          $("#wg-zip-label-result").html("<strong>Installation is available for " + city + ".</strong>");
        }

      }

      if (resp.STATUS.CODE > 0) {
        $("body").css("cursor", "default");
        $("#wg-zip-label-result").html("<strong>Sorry, we were unable to confirm installation availability.</strong>");

      }


    }).fail(function() {
      //add error message
      if (!initialLoad) {
        //piggy-backing the configurator messaging
        window.configurator.showErrorPopup($locationBtn[0], [{
          message: 'Sorry, we\'re unable to confirm installation availability.'
        }]);
      }
      toggleAddToCart(true);
      window.postalCodeSource = '';
      //show all services
      $services.show();
    }).always(function() {
      //hide ajax spinner
      $('#checkingInstall').addClass('hide');

      initialLoad = false;
    });
  }


  $('#install_location_text').keyup(function(e) {
    window.locationChanged = $('#install_location_text').val() !== window.postalCode;
    //toggleAddToCart(!window.locationChanged);
    //if key is [enter]
    if (e.keyCode === 13) {
      return getInstallAvailability();
    }
  });


  $('#install_location_btn').click(function() {
    getInstallAvailability();
    return false;
  });

  $whiteGloveInstallCheck.on('click', function(e) {
    if (!installZipChecked) {
      $(this).removeAttr('checked');
      $("#install_location_text").attr('checked', false);
      alert("Please enter delivery zip code to confirm installation availability.");
    } else if (!installZipSupported) {
      $(this).attr('checked', false);
      $("#install_location_text").attr('checked', false);
    }
  });
  // end whiteglove

  //Complex Configuration
  var $cmplx = $('#cmplx'),
    $optionList = $('#optionList'),
    $pleaseConfigure = $('#pleaseConfigure'),
    $addButton = $('.addToCartCmplx'),
    $discontinuedText = $("#discontinuedText"),
    $fixErrorsAbove = $('#fixErrorsAbove,#fixErrorsBelow'),
    $poGroup = $('.poGroup'),
    addToCart_form = $('#prdAddToCart'),
    formError = false;

  if ($.stdlib.isIE6()) {
    $('.radio-group li').hoverClass();
  }

  if (!(touch && tablet)) {
    $cmplx.on('mouseover', '.option-input', function() {
      var $t = $(this),
        $p = $t.parent();

      if (!($p.hasClass('on') || $p().siblings().hasClass('on'))) {
        $t.siblings('.thumb').show();
      }

    });

    $cmplx.on('mouseleave', '.option-input', function() {
      var $t = $(this),
        $p = $t.parent();

      if (!($p.hasClass('on') || $p.siblings().hasClass('on'))) {
        $t.siblings('.thumb').hide();
      }

    });
  }

  // Enable the add to cart button and radio buttons now! see IDS-8941
  $addButton.attr('disabled', false).removeClass('disabled');
  $('.addToCart').attr('disabled', false).removeClass('disabled');
  $('input.finishRad').attr('disabled', false);

  // Configure Button
  $configureButton.on('click', function(e) {
    e.preventDefault();
    var $button = $(e.currentTarget);
    if (!$button.hasClass('disabled')) {
      $.scrollTo($button.attr('href'));
    }
  });

  $('.poGroup input').each(function(idx, pricedOption) {
    var price = parseFloat($(pricedOption).data('price'), 10);
    if (price < 0) {
      $(pricedOption).siblings('.cost').html('(' + price + ')');
    }
  });

  $cmplx.on('click', '.pricedOption', function() {
    var $po = $(this);
    //set displayed relative price
    var groupPrice = parseFloat($po.data('price')),
      rads = $po.closest("ul").find('input');
    rads.each(function() {
      var $input = $(this),
        $cost = $input.next('.cost'),
        // FIXME: Disabling relative pricing for now because it's overly complex and confusion depending on the category
        // displayPrice = parseFloat($input.data('price')) - groupPrice;
        displayPrice = parseFloat($input.data('price'));
      $input.closest('li').removeClass('on');
      if ($input.is(':checked')) {
        displayPrice = "<small>&nbsp;Included in price</small>";
      } else {
        displayPrice = "<small>(" + util.formatCurrency(displayPrice) + ")</small>";
      }
      $cost.html(displayPrice);
      $cost.toggleClass('minus', displayPrice < 0);
    });

    $po.closest('li').addClass('on');
    updateTotal(false);
  }).on('click', '#addToCartCmplx', function() {
    if (!$(this).hasClass('disabled')) {
      addToCart_form.submit(); //forces submit when add button lies outside the form.
    }
  });

  //Keep Quantity clean
  $qty.on('keyup change input', function() {
    if (this.value.length > 0) {
      var val = +this.value;
      this.value = (!val || val < 0) ? 1 : val;
    }
    updateTotal(false);
  }).on('blur', function() {
    if (!parseInt(this.value, 10)) {
      this.value = 1;
    }
  });

  // If someone click on a tooltip within a stock-message, stop the click
  $('.stock-message .optip').on('click', function(e) {
    e.preventDefault();
  });

  //we should probably replace this validation with some plugin.
  //form validation singleton
  var formValidator = {
    valid: false,
    formSubmitting: false,
    fieldValidators: [],
    init: function(form) {
      this.form = form;
      this.bindEvents();
      return this;
    },
    validate: function(realValidate) {
      var that = this;
      that.valid = true;
      for (var i = 0, len = that.fieldValidators.length; i < len; i++) {
        if (!that.fieldValidators[i].validate()) {
          that.valid = false;
          realValidate && that.fieldValidators[i].triggerInvalid();
          break;
        } else {
          realValidate && that.fieldValidators[i].triggerValid();
        }
      }
      return that.valid;
    },
    bindEvents: function() {
      var that = this;
      that.form.on({
        submit: function(e) {
          var formSubmit;
          if (that.formSubmitting) {
            $.alert('Just a second; form is already submitting.');
            return false;
          } else {
            $pleaseConfigure.removeClass('on');
            if (that.validate(true)) {

              $fixErrorsAbove.removeClass('on');
              formError = false;

              formSubmit = that.form.triggerHandler('product:addToCart');

              if (formSubmit || typeof formSubmit === 'undefined') {
                $addButton.text("Adding...");
                that.formSubmitting = true;
                return true;
              } else {
                return false;
              }
            } else {
              $fixErrorsAbove.addClass('on');
              formError = true;
              return false; //prevent form from submitting normally
            }
          }
        }
      });
    },
    addFieldValidator: function(fv) {
      return this.fieldValidators.push(fv);
    }
  };

  //Generic Validator Constructor

  function FieldValidator(field, message, validator, onValid, onInvalid) {
    this.field = field;
    this.$field = $(field);
    this.validator = validator;
    this.onValid = onValid || $.noop();
    this.onInvalid = onInvalid || $.noop();
    this.valid = false;
    this.errorMessage = $(this.field.tagName === 'UL' ? '<li/>' : '<em/>', {
      'class': 'error',
      'text': message
    });
    this.$field[(this.field.tagName in {
      'INPUT': 1,
      'SELECT': 1,
      'TEXTAREA': 1
    }) ? 'after' : 'prepend'](this.errorMessage);
    //Add fields to the form validator
    this.formValidator.addFieldValidator(this);

    var that = this;
    that.$field.on("validate", function() {
      that.validate.call(that);
    });
    this.$field.data("fieldValidator", this);
    return this;
  }
  FieldValidator.prototype.validate = function() {
    this.valid = this.field.disabled ? true : this.validator.call(this.field);
    if (!this.valid) {
      //show Invalid Message
      this.errorMessage.addClass('errorOn');
    } else {
      //hide Invalid Message
      this.errorMessage.removeClass('errorOn');
      $fixErrorsAbove.removeClass('on');
      this.triggerValid();
    }
    this.$field.data("valid", this.valid);
    return this.valid;
  };
  FieldValidator.prototype.triggerValid = function() {
    if (this.onValid) {
      this.onValid();
    }
  };
  FieldValidator.prototype.triggerInvalid = function() {
    if (this.onInvalid) {
      this.onInvalid();
    }
  };

  FieldValidator.prototype.formValidator = formValidator;

  //create formValidator
  formValidator.init(addToCart_form);

  if ($finishRads.length) {
    new FieldValidator(this, 'Please select a finish', function() {
      for (var i = 0, len = $finishRads.length; i < len; i++) {
        if ($finishRads[i].type === "radio" && $finishRads[i].checked) {
          return true;
        }
      }

      return false;
    }, function() {
      $finishName.removeClass('prd_error_highlight');
    }, function() {
      $finishName.addClass('prd_error_highlight');
    });

    $finishRads.click(function() {
      $(this).trigger('validate');
    });
  }

  //Required radio group
  $('#cmplx .radio-group').each(function() {
    var $item = $(this);
    new FieldValidator(this, $item.data('errorMessage') || 'Please pick one', function() {
      var rads = $(this).find('input');
      for (var i = 0, len = rads.length; i < len; i++) {
        if (rads[i].type === "radio" && rads[i].checked) {
          return true;
        }
      }
      return false;
    }, function() {
      // Do Nothing
    }, function() {
      $('#fixErrorsBelow').html("<span></span> Please finish configuring below");
      $('#fixErrorsAbove').html("<span></span> Please finish configuring above");
    });
    $item.on('click', 'input', function() {
      return $item.trigger("validate");
    });
  });

  //Set Accessories field to included reqOptions
  addToCart_form.submit(function() {
    var pricedOptions = '';

    //put priced options in hidden input
    $poGroup.find('input').each(function(j, jitem) {
      //DONT include the input for install zip lookup
      if (jitem.id !== "install_location_text") {
        if (jitem.checked && jitem.value !== 'on') {
          pricedOptions += jitem.value + ',';
        } else if (jitem.type === "text" && jitem.value.trim().length) {
          pricedOptions += jitem.id.slice(6) + ';' + jitem.value + ',';
        }
      }
    });

    $optionList.val(pricedOptions);
    return true;
  });
  //This function is getting messy

  function updateTotal(overrideValidation, forceFinish) {
    var total = 0,
      str, mainPriceStr, savingsStr,
      mainPrice = 0,
      origMainPrice = 0,
      savings = 0,
      selectedFinish,
      selectedAddToCartMAPBuster = hasAddToCartMAP;

    if ($finishRads.length === 0) {
      selectedFinish = $priceAdd.filter('[name=uniqueid]');
    } else {
      selectedFinish = $priceAdd.filter('[name=uniqueid]:checked');
    }

    $priceAdd.each(function() {
      //if visible or type=hidden
      var $priceOpt = $(this),
        optPrice = 0;
      if (!this.disabled) {

        if (this.name === 'uniqueid' && this.type === 'hidden') {
          optPrice = $priceOpt.data('price');
          origMainPrice = $priceOpt.data('origprice');
          savings = $priceOpt.data('savingspct');
        } else if (this.type === 'radio' || this.type === 'checkbox') {

          if ((typeof forceFinish !== 'undefined' && this === forceFinish) || (typeof forceFinish === 'undefined' && this.checked)) {
            selectedAddToCartMAPBuster = selectedFinish.data("hasaddtocartmapbuster");
            optPrice = $priceOpt.data('price');

            if (this.name === 'uniqueid') {
              origMainPrice = $priceOpt.data('origprice');
              savings = $priceOpt.data('savingspct');
            }
          }
        } else {

          optPrice = $priceOpt.data('price');
        }
      }
      total += (parseFloat(optPrice, 10) || 0);

    });

    str = (typeof total === "string") ? total : util.formatCurrency(total);
    mainPriceStr = (typeof mainPrice === "string") ? mainPrice : util.formatCurrency(mainPrice);


    if (selectedAddToCartMAPBuster) {
      $prdPrice.addClass("strikethrough");
      savingsStr = $prdSavings.data('defaultText');
    } else {
      $prdPrice.removeClass("strikethrough");
      if (typeof origMainPrice === "number") {
        if (savings > 0) {
          savingsStr = 'Originally ' + util.formatCurrency(origMainPrice) + ', You Save ' + savings + '%';
        } else {
          savingsStr = '';
        }
      }
    }

    // Only do this when the product doesn't have a price per square foot.
    if (typeof(sqftcarton) === 'undefined') {
      if (formValidator.validate(!forceFinish) || overrideValidation) {
        if ($priceAdd.length) {
          $prdPrice.text(mainPriceStr);
          $prdSavings.html(savingsStr);
        }
        $prdPrice.text(str);
        $priceWrap.addClass('on');
        $pleaseConfigure.removeClass('on');
      } else {
        $prdPrice.text($prdPrice.data('defaultText'));
        $prdSavings.html($prdSavings.data('defaultText'));
        $priceWrap.removeClass('on');
        $pleaseConfigure.addClass('on');
      }
    }
  }

  $('#ask_question').on('click', function() {
    $('#q-and-a_tab').trigger('mousedown').scrollTo();
  });

  $('#view_warranty').on('click', function() {
    $('#warranty-tab').trigger('mousedown').scrollTo();
  });

  $('#reviews_read_link').on('click', function() {
    $('#reviews-tab').trigger('mousedown').scrollTo();
  });

  $('#main-container').on('click', '.modal', function(e) {
    e.preventDefault();
    var $modal = $('#' + $(this).data('content'));
    $modal.addClass('jqm-window').jqm({
      overlay: 50,
      overlayClass: 'jqm-overlay',
      closeClass: 'jqm-close'
    });
    $modal.jqmShow();
  });

  var reviewContainer = $('#BVRRContainer');
  if (reviewContainer.length) {
    var $BV = window.$BV || {};
    $BV.ui("rr", "show_reviews", {
      productId: reviewContainer.data('bvid')
    });
  }

  // !!!!!!!!!!!!!!!!!!!!!!!!! //
  // KEEP AT END OF DOC READY  //
  // !!!!!!!!!!!!!!!!!!!!!!!! //
  // otherwise other stuff doesn't execute in time and we wind up with problems.
  // Check URL to see if the very end contains "#image-"
  // If found, parse out, find the image and simulate a click to launch to gallery on that image.
  if (document.location.href.indexOf('#image-') > -1) {
    var currentSelection = {},
      productThumbs = [],
      productSwatches = [],
      scopeImage = '',
      launchMethod = '',
      modalLoadContext = document.location.href.split('#image-')[document.location.href.split('#image-').length - 1.].toString();

    for (var i = 0; i < $('.product-gallery').length; i++) {
      currentSelection = $('.product-gallery')[i];
      productThumbs.push($(currentSelection));
    };
    for (var j = 0; j < $('.swatchlink').length; j++) {
      currentSelection = $('.swatchlink')[j];
      productSwatches.push($(currentSelection));
    };

    for (var k = 0; k < productThumbs.length; k++) {
      scopeImage = $(productThumbs[k]).attr('href').split('/')[$(productThumbs[k]).attr('href').split('/').length - 1];
      if (scopeImage === modalLoadContext) {
        $(productThumbs[k]).mouseover();
        $(productThumbs[k]).click();
        launchMethod = 'thumbs';
        return;
      };
    };
    if (launchMethod !== 'thumbs') { // If we didn't launch before, run the hover+click on the swatch images, then click the main image to launch the gallery in the right place.
      for (var l = 0; l < productSwatches.length; l++) {
        scopeImage = $(productSwatches[l]).find('img').attr('src').split('/')[$(productSwatches[l]).find('img').attr('src').split('/').length - 1];
        if (scopeImage === modalLoadContext) {
          $(productSwatches[l]).mouseover();
          $(productSwatches[l]).click();
          $('#productImageLink').click();
          launchMethod = 'swatch';
          return;
        };
      };
    };
    if (launchMethod !== 'thumbs' && launchMethod !== 'swatch') { // This shouldn't ever be reached, but just in case the image isn't apart of the thumbs OR swatches...
      scopeImage = $('#productImageLink').attr('href').split('/')[$('#productImageLink').attr('href').split('/').length - 1];
      if (scopeImage === modalLoadContext) {
        $('#productImageLink').mouseover();
        $('#productImageLink').click();
      };
    };
  };

});



/* *************
  NanoRep
**************** */
jQuery(function($) {
  var _nRepData = window._nRepData || [];
  if (typeof enableNanoRep === 'undefined') {
    $('#productQuestionForm').show();
  } else {
    $("#nanoRepEmbedContainer").show();
    $("#nanoRepProxyContainer").show();
    _nRepData.embed = {
      container: 'nanoRepEmbedContainer',
      width: '100%',
      maxHeight: 1000,
      dynamicSize: true,
      cdcFrame: '/assets/nanorep/cdc.html',
      cdcVersion: 3
    };

    (function() {
      var windowLoadFunc = function() {
        var _nRepData = window._nRepData || [];
        _nRepData.windowLoaded = true;
        if (typeof(_nRepData.windowOnload) === 'function') {
          _nRepData.windowOnload();
        }
      };
      if (window.attachEvent) {
        window.attachEvent('onload', windowLoadFunc);
      } else if (window.addEventListener) {
        window.addEventListener('load', windowLoadFunc, false);
      }
      var sc = document.createElement('script');
      sc.type = 'text/javascript';
      sc.async = true;
      sc.defer = true;
      sc.src = ('https:' === document.location.protocol ? 'https://' : 'http://') + 'my.nanorep.com/widget/scripts/embed.js?account=build';
      var _head = document.getElementsByTagName('head')[0];
      _head.appendChild(sc);
    })();
  }

});
