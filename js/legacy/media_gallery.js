
  //For Desktop - This prevents window from scrolling when media gallery is open.
  var lockWindow = function() {
    $window = $(window);

    var width = $window.width(),
      height = $window.height();

    $('body').css({
      width: width + 'px',
      height: height + 'px',
      overflow: 'hidden'
    });
  };

  // This sets up the space for images to fit horizontally or vertically.
  var imageSpacer = function() {
    var $images = $('#media-images'),
      $fsModal = $('.jqm-full');

    // Check to see if we are horizontal, or vertical.
    if ($fsModal.hasClass('horizontal')) {

      $images.css({
        width: ($fsModal.width() - 250) + 'px',
        height: ($fsModal.height()) + 'px'
      });

    } else if ($fsModal.hasClass('vertical')) {

      $images.css({
        width: ($fsModal.width()) + 'px',
        height: ($fsModal.height() - 250) + 'px'
      });
    }
  };

  // This sizes the image appropriate to it's own proportions in the space designated(which is the same as imageSpazer())
  var imageSizer = function($image) {
    var $width = '',
      $height = '',
      $fsModal = $('.jqm-full'),
      $nativeWidth = $image.attr('data-width'),
      $nativeHeight = $image.attr('data-height'),
      nhRatio = $nativeWidth / $nativeHeight,
      mhRatio = '';


    // Standard CSS for All Images
    if ($(document).fullScreen() === false) {
      $image.css({
        'position': 'absolute'
      });
    } else {
      $image.css({
        'position': 'relative'
      });
    }

    imageSpacer();

    // Check to see if we are horizontal, or vertical.
    if ($fsModal.hasClass('horizontal')) {
      $width = $fsModal.width() - 250;
      $height = $fsModal.height();

      if ($(document).fullScreen() === false || $(document).fullScreen() === null) {
        $('#media-images').css({
          width: ($fsModal.width() - 250) + 'px',
          height: ($fsModal.height()) + 'px'
        });
      } else {
        $('#media-images').css({
          'height': '100%',
          'width': '100%'
        });
      }

      if ($(document).fullScreen()) {
        $image.css({
          'display': 'block',
          'left': '0',
          'margin': '0 auto'
        });
      }

    } else if ($fsModal.hasClass('vertical')) {
      $width = $fsModal.width();
      $height = $fsModal.height() - 250;

      if ($(document).fullScreen() === false || $(document).fullScreen() === null) {
        $('#media-images').css({
          width: ($fsModal.width()) + 'px',
          height: ($fsModal.height() - 250) + 'px'
        });
      } else {
        $('#media-images').css({
          'height': '100%',
          'width': '100%'
        });
      }

      if ($(document).fullScreen()) {
        $image.css({
          'display': 'block',
          'left': '0',
          'margin': '0 auto'
        });
      }

    }

    // Set the ratio accordingly.
    mhRatio = $width / $height;

    // Check to See if Image Needs to be Resized
    if (($nativeWidth > $width) || ($nativeHeight > $height)) {

      // Resizes Image to Fit Vertically
      if (nhRatio <= mhRatio) {

        if ($(document).fullScreen() === false || $(document).fullScreen() === null) {
          $image.css({
            top: 0 + 'px',
            height: $height + 'px',
            width: 'auto',
            left: (($width - ($height * nhRatio)) / 2) + 'px'
          });
        } else {
          $image.css({
            height: 'auto',
            'display': 'block',
            'left': '0',
            'margin': '0 auto'
          });
        };
        // Resizes Image to Fit Horizontally. Rare Scenario.
      } else if (nhRatio >= mhRatio) {

        $image.css({
          width: $width + 'px',
          height: 'auto',
          top: ((($height - ($width / nhRatio)) / 2)) + 'px',
          left: 0
        });

        if ($(document).fullScreen()) {
          $image.css({
            'display': 'block',
            'margin': '0 auto'
          });
        };
      }

      // If Image Doesn't Need to be Resized, Center it.
    } else {

      $image.css({
        width: $nativeWidth + 'px',
        height: $nativeHeight + 'px',
        left: (($width - $nativeWidth) / 2) + 'px',
        top: ((($height - $nativeHeight) / 2)) + 'px'
      });
      if ($(document).fullScreen() === false || $(document).fullScreen() === null) {
        $image.css({
          left: (($width - $nativeWidth) / 2) + 'px'
        });
      } else {
        $image.css({
          left: 0,
          'display': 'block',
          'margin': '0 auto'
        });
      };
    }
  };

  // This sizes / positions the modal appropraite to window size. It also sets overflow for the side-bar / bottom-bar to scroll when necessary.
  var sizeModal = function() {
    var winWid = $window.width(),
      winHt = $window.height(),
      $fsModal = $('.jqm-full'),
      $spinner = $('.media-preloader'),
      $scroll = $('#media-scroll'),
      $current = $('#current-image');

    // Only do things when the modal exists.
    if ($fsModal) {

      // Adjust Gallery Displaying Vertically or Horizontally
      if (winHt > winWid) {
        if ($fsModal.hasClass('horizontal')) {
          $fsModal.removeClass('horizontal');
        }

        $fsModal.addClass('vertical');

        if ($scroll.children('.clearfix').length) {

        } else {
          $scroll.append('<div class="clearfix"></div>');
        }

      } else {
        if ($fsModal.hasClass('vertical')) {
          $fsModal.removeClass('vertical');
        }

        $fsModal.addClass('horizontal');

        if ($scroll.children('.clearfix').length) {
          $scroll.remove('clearfix');
        } else {

        }
      }

      // Center the Modal

      if (tablet && touch) {

        $fsModal.css({
          'width': (winWid - 40) + 'px', //subtract 15 for disappearing
          'height': (winHt - 40) + 'px'
        }).css({
          'left': ((winWid - $fsModal.width()) / 2) + 'px',
          'top': ((winHt - $fsModal.height()) / 2) + 'px'
        });

      } else {

        $fsModal.css({
          'width': (winWid - 85) + 'px', //subtract 15 for disappearing
          'height': (winHt - 100) + 'px'
        }).css({
          'left': ((winWid - $fsModal.width()) / 2) + 'px',
          'top': ((winHt - $fsModal.height()) / 2) + 'px'
        });
      }
    }
  };

  // Centers the spinner to the center of the image.
  var orientSpinner = function() {
    var $fsModal = $('#media-gallery'),
      $fsHorizontal = $('#media-gallery.horizontal'),
      $spinner = $('.media-preloader');

    if ($fsHorizontal.length) {
      $spinner.css({
        'left': ((($fsModal.width() / 2) - 125) - ($spinner.width() / 2)) + 'px',
        'top': (($fsModal.height() / 2) - ($spinner.height() / 2)) + 'px'
      });
    } else {
      $spinner.css({
        'left': (($fsModal.width() / 2) - ($spinner.width() / 2)) + 'px',
        'top': ((($fsModal.height() / 2) - 125) - ($spinner.height() / 2)) + 'px'
      });
    }
  };

  // This positions the arrows for desktop and the information for the image when there is an overflow.
  var displayInformation = function() {
    // Care for Media Information - Cleanly
    var $horizInfo = $('#media-gallery.horizontal #media-information'),
      $infoSubs = $('#media-scroll'),
      $imageContent = $('#media-information'),
      $arrows = $('.media-arrow span'),
      contentHeight = $infoSubs.height(),
      galleryHeight = $imageContent.height();

    if (contentHeight > galleryHeight) {

      // IE has different size scrollbars
      if (dl.browser.client === 'Explorer') {
        $imageContent.addClass('ie-narrow');
      } else {
        $imageContent.addClass('narrow');
      }

    } else {
      if ($imageContent.hasClass('ie-narrow')) {
        $imageContent.removeClass('ie-narrow');
      } else if ($imageContent.hasClass('narrow')) {
        $imageContent.removeClass('narrow');
      }
    }

    if ($horizInfo.length) {
      $arrows.css({
        top: (($('#media-gallery').height() / 2) - ($arrows.height() / 2)) + 'px'
      });
    } else {
      $arrows.css({
        top: ((($('#media-gallery').height() - $imageContent.height()) / 2) - ($arrows.height() / 2)) + 'px'
      });
    }
  };

  // Preloads images using the preload function in general. Handles a single image, or consecutively preloads images in a string, one by one.

  function preloader(imgs) {
    function insertPreloadList(img) {
      $.preload(img).then(
        function(retImg) {
          preloadList.normal.push(img);
        }, function(retImg) {

        }
      );
    }

    if (typeof imgs === "string") {
      if (($.inArray(imgs, preloadList.normal) < 0)) {
        return insertPreloadList(imgs);
      }

    } else {

      for (var i = 0; i < imgs.length; i++) {
        if (($.inArray(imgs[i], preloadList.normal) < 0)) {
          insertPreloadList(imgs[i]);
        }
      }
    }
  }

  // This is the actual initialization of the modal on click from the product page. It sets up preloading, image information, arrows, and the order of images being loaded. Probably does some other things, it's burly.
  var initGalleryModal = function($this) {
    var $mg = $('#media-gallery'),
      $infoSubs = $('#media-scroll'),
      mgData = dl.mediaGallery,
      mgTemplate = {
        'thumbs': ''
      },
      imgTitle = '',
      currentNumber = 0,
      imgFinish = '',
      mgMarkup = '',
      mgClasses = '',
      currentObj = {},
      imgDetails = '',
      mediaNav = '',
      mainImg = '',
      modalContent = '',
      notLoaded = [],
      notLoadedOrder = [],
      touchList = '',
      i = 0;

    // This happens on first init of modal.
    if ($mg.length === 0) {

      mgClasses = (tablet && touch) ? 'jqm-window jqm-full tablet' : 'jqm-window jqm-full desktop';
      mgMarkup = '<div id="media-gallery" class="' + mgClasses + '"><span class="jqm-close close-modal">×</span><div class="media-preloader"><div class="media-spinner"></div></div></div>';
      $('body').append(mgMarkup);
      //Push images into the template object.
      for (i = 0; i < mgData.length; i++) {
        imgTitle = mgData[i].TITLE;
        imgFinish = mgData[i].FINISH;
        if (mgData[i].IMAGEPATHS) {

          // Let's find out which images haven't been preloaded.
          if ($.inArray(mgData[i].IMAGEPATHS['800'], preloadList.normal) >= 0) {} else {
            notLoaded.push(mgData[i].IMAGEPATHS['800']);
            notLoadedOrder.push(i);
          }

          if (mgData[i].TYPE === 'galleryImage') {
            if ($this.attr('href').toLowerCase() === mgData[i].IMAGEPATHS['800'].toLowerCase()) {
              currentObj = mgData[i];
              mgTemplate.thumbs += '<li class="current" data-i="' + i + '"><img src="' + mgData[i].IMAGEPATHS['50'] + '" width="50" height="50" alt="' + manufacturerName + ' ' + productId + ' ' + productTitle + ' : ' + imgTitle + '" /></li>';
            } else {
              mgTemplate.thumbs += '<li data-i="' + i + '"><img src="' + mgData[i].IMAGEPATHS['50'] + '" width="50" height="50" alt="' + manufacturerName + ' ' + productId + ' ' + productTitle + ' : ' + imgTitle + '" /></li>';
            }

            if (tablet && touch) {
              if ($this.attr('href').toLowerCase() === mgData[i].IMAGEPATHS['800'].toLowerCase()) {
                touchList += '<div id="current-slide" data-i="' + i + '"><img src="' + mgData[i].IMAGEPATHS['800'] + '"></div>';
              } else {
                touchList += '<div data-i="' + i + '"><img src="' + mgData[i].IMAGEPATHS['800'] + '"></div>';
              }
            }

          } else if (mgData[i].TYPE === 'finishImage') {
            if ($this.attr('href').toLowerCase() === mgData[i].IMAGEPATHS['800'].toLowerCase()) {
              currentObj = mgData[i];
              mgTemplate.thumbs += '<li class="current" data-i="' + i + '"><img src="' + mgData[i].IMAGEPATHS['50'] + '" width="50" height="50" alt="' + manufacturerName + ' ' + productId + ' ' + productTitle + ' in ' + imgFinish + '" /></li>';
            } else {
              mgTemplate.thumbs += '<li data-i="' + i + '"><img src="' + mgData[i].IMAGEPATHS['50'] + '" width="50" height="50" alt="' + manufacturerName + ' ' + productId + ' ' + productTitle + ' in ' + imgFinish + '" /></li>';
            }

            if (tablet && touch) {
              if ($this.attr('href').toLowerCase() === mgData[i].IMAGEPATHS['800'].toLowerCase()) {
                touchList += '<div id="current-slide" data-i="' + i + '"><img  src="' + mgData[i].IMAGEPATHS['800'] + '"></div>';
              } else {
                touchList += '<div data-i="' + i + '"><img src="' + mgData[i].IMAGEPATHS['800'] + '"></div>';
              }
            }

          }

          preloadList.order.push(i);
        }
      }

      // Prioritization : First = Title, Second = Finish, Third = Text
      imgDetails = (currentObj.TITLE) ? ('<span class="pre">Description: </span><span class="post">' + currentObj.TITLE + '</span>') : ((currentObj.FINISH) ? ('<span class="pre">Finish: </span><span class="post">' + currentObj.FINISH + '</span>') : ('<span class="pre">Description: </span><span class="post">' + currentObj.TEXT + '</span>'));
      mediaNav = ((tablet && touch) ? '' : ('<div class="media-arrow toggle-left"><span></span></div><div class="media-arrow toggle-right"><span></span></div>'));
      mainImg = '<div id="media-images">' + mediaNav + '<div id="media-footer"></div></div>';

      modalContent = '<div id="media-content">' + mainImg + '<div id="media-information"><div id="media-scroll"><div class="media-specs"><img id="manu-logo" src="' + $manuLogo.attr('src') + '" alt="' + dl.manufacturer + ' Logo" /><h2>' + dl.manufacturer + ' ' + dl.productId + '</h2><h3>' + imgDetails + '</h3><p>' + dl.title + '</p></div><div class="media-thumbs"><ul class="clearfix">' + mgTemplate.thumbs + '</ul></div></div>';
      $('#media-gallery').append(modalContent);

      $('#media-gallery').jqm({
        onShow: galleryLaunch,
        onHide: galleryHide,
        overlay: 50,
        overlayClass: 'jqm-overlay',
        closeClass: 'jqm-close'
      });
      preloader(notLoaded);

      $('#media-images').on({
        'mouseenter': function() {
          var $left = $('#media-images .toggle-left'),
            $right = $('#media-images .toggle-right');

          $left.css({
            left: 0 + 'px'
          });

          $right.css({
            right: 0 + 'px'
          });
        },
        'mouseleave': function() {
          var $left = $('#media-images .toggle-left'),
            $right = $('#media-images .toggle-right');
          $left.css({
            left: -$left.width() + 'px'
          });

          $right.css({
            right: -$right.width() + 'px'
          });
        }
      });

    } else {
      // This happens if the modal has been closed, and re-opened.

      var $thumbs = $('#media-scroll .media-thumbs li');
      currentObj = {};
      $thumbs.removeClass('current');

      for (i = 0; i < mgData.length; i++) {
        if (mgData[i].IMAGEPATHS) {
          if (mgData[i].IMAGEPATHS['800'].toLowerCase() === $this.attr('href').toLowerCase()) {
            currentObj = mgData[i];
            $('#media-scroll .media-thumbs li[data-i="' + i + '"]').addClass('current');
          }
        }
      }

      // Prioritization : First = Title, Second = Finish, Third = Text
      imgDetails = (currentObj.TITLE) ? ('<span class="pre">Description: </span><span class="post">' + currentObj.TITLE + '</span>') : ((currentObj.FINISH) ? ('<span class="pre">Finish: </span><span class="post">' + currentObj.FINISH + '</span>') : ('<span class="pre">Description: </span><span class="post">' + currentObj.TEXT + '</span>'));
      $('.media-specs h3').html(imgDetails);
      $infoSubs.css({
        top: 0
      });
    }
  };

  // Callback from JQM on Modal Launch
  var galleryLaunch = function(hash) {
    if (tablet && touch) {
      hash.o.fadeIn(250);
    } else {
      lockWindow();
    }
    hash.w.show();
  };

  // Callback from JQM on Modal Hide
  var galleryHide = function(hash) {
    $('body').removeAttr('style');

    if (tablet && touch) {
      hash.o.fadeOut(250);
      $('#current-image').remove();
      $('.upcoming').remove();
    } else {
      $bodyWrap.removeClass('blur-area');
      hash.o.remove();
      $('#current-image').remove();
      $('#media-footer .social-bar-h').remove();
      if ($('#media-fullscreen')) {
        $('#media-fullscreen').remove();
      };
    }
    hash.w.hide();
  };

  // Checks for the next image, or images to see if they are preloaded. Concurrently loads or preloads those image/images. Dekstop preloads once, tablet preloads 3 images for swiping.
  var initImages = function($this, direction) {

    var $modal = $('.jqm-full'),
      $spinner = $('.media-preloader'),
      $images = $('#media-images'),
      currentHref = typeof $this === 'string' ? $this : $this.attr('href'),
      img = '<img id="current-image" src="' + currentHref + '" />';

    // Inital image check for both tablet / desktop. Concurrent for desktop there on out.
    var imageInit = function(img) {
      var $current = $('#current-image');

      if ($current.length) {
        $current.attr('id', 'past-current');
      }

      $images.append(img);

      $('#current-image').on('load', function() {
        var appended = document.getElementById('current-image'),
          width = $(appended).width(),
          height = $(appended).height();

        $(appended).attr({
          'data-width': width,
          'data-height': height
        });

        imageSizer($('#current-image'));
        $spinner.hide();
        $(appended).show();
        $('#past-current').remove();
      });
    };

    // Preloads images to the left and right for swiping on tablet.
    var preInit = function(href, direction) {
      var $img = $('<img style="display:none;" class="upcoming swipe-' + direction + '" src=' + href + ' />');

      $spinner.hide();

      $images = $('#media-images');

      $images.append($img);

      $img.on('load', function() {

        var $appended = $('#media-images .swipe-' + direction + ''),
          $width = $appended.width(),
          $height = $appended.height();

        $img.attr({
          'data-width': $width,
          'data-height': $height
        });

        imageSizer($img);

        if (direction === 'left') {
          $img.css({
            left: -$images.width()
          });
        } else if (direction === 'right') {
          $img.css({
            left: $images.width()
          });
        }

        $img.show();

        galleryState = 'loaded';
      });
    };

    //Does the actual image preload checking.
    var checkImageLoad = function(href, direction) {
      if (href || direction) {
        var swipeCheck = setTimeout(function() {
          if ($.inArray(href, preloadList.normal) >= 0) {
            preInit(href, direction);
            clearTimeout(swipeCheck);
          } else {
            $spinner.show();
            checkImageLoad(href, direction);
          }
        }, 25);
      } else {
        var repeatCheck = setTimeout(function() {
          if ($.inArray(currentHref, preloadList.normal) >= 0) {
            imageInit(img);
            clearTimeout(repeatCheck);
          } else {
            checkImageLoad();
          }
        }, 25);
      }
    };

    // Sends information over to check tablet images.
    var tabletPreload = function(next, previous) {
      checkImageLoad(previous, 'left');
      checkImageLoad(next, 'right');
    };

    if (!direction) {
      if ($.inArray(currentHref, preloadList.normal) >= 0) {
        checkImageLoad();

      } else {
        $spinner.show();
        preloader(currentHref);
        checkImageLoad();
      }
    }

    if (touch && tablet) {

      var active = parseInt($('#media-scroll ul li.current').attr('data-i'), 10),
        order = preloadList.order,
        activePosition = ($.inArray(active, order)),
        nextNumber = 0,
        prevNumber = 0;

      if (activePosition === 0) {
        nextNumber = order[order.length - 1];
        prevNumber = order[activePosition + 1];
      } else if (activePosition === (order.length - 1)) {
        nextNumber = order[activePosition - 1];
        prevNumber = order[0];
      } else {
        nextNumber = order[activePosition - 1];
        prevNumber = order[activePosition + 1];
      }

      tabletPreload(dl.mediaGallery[prevNumber].IMAGEPATHS['800'], dl.mediaGallery[nextNumber].IMAGEPATHS['800']);

    }
  };

  // This replaces the old way of doing social icons within the Media Gallery and at the Product Level
  // Done because the old method was actually broken (didn't open popups correctly) and to provide a common interface for social sharing icons.
  var onSocialIconClick = function(context, imageRef) {
    var popupHref = '',
      socialPopWidth = 0,
      socialPopHeight = 0,
      imgLink = '',
      socialLink = ''

      // See display.inc.cfm for the code that generates the socialShareContent object and some of its properties.
    socialShareContent.PRODSHARELINK = 'http://' + document.domain + socialShareContent.PRODLINK;
    // This enables us to create links that automatically open the media gallery at a specific image on pageload.
    if (imageRef !== 0) {
      socialShareContent.PRODSHARELINK += '#image-' + imageRef;
    };

    socialShareContent.CURRACTIVE = $(context).attr('class').replace('sprite ', '');

    // Testing if we're sharing from within the gallery.  If so, generate a link to open on whatever image the user is looking at...
    if ($('.' + socialShareContent.CURRACTIVE, '#media-gallery').length === 1) {
      var $currentImageContext = $('#current-image').attr('src');
      imgLink = $currentImageContext;
      socialLink = 'http://' + document.domain + socialShareContent.PRODLINK + '#image-' + $currentImageContext.split('/')[$currentImageContext.split('/').length - 1]
      // ...If not, just use a default value.
    } else {
      imgLink = socialShareContent.PRODIMAGE.PIN;
      socialLink = socialShareContent.PRODSHARELINK;
    };

    // Check to see which network the icon is for and craft the appropriate link, as well as give the right height/width for it.
    // Supplied heights/widths take into account factors like Pinterest properly resizing the popup when Pinning, but not if you need to log in.
    if (socialShareContent.CURRACTIVE === 'fb-icon') {
      popupHref = 'https://www.facebook.com/sharer.php?s=100&p[title]=' + socialShareContent.PRODTITLE.FB + '&p[url]=' + encodeURIComponent(socialLink) + '&p[summary]=' + socialShareContent.PRODTEXT + '&p[images][0]=' + encodeURIComponent(socialShareContent.PRODIMAGE.FB);
      socialPopWidth = 675;
      socialPopHeight = 300;
    } else if (socialShareContent.CURRACTIVE === 'p-icon') {
      popupHref = 'http://pinterest.com/pin/create/button/?url=' + encodeURIComponent(socialLink) + '&media=' + encodeURIComponent(imgLink) + '&description=' + socialShareContent.PRODTEXT;
      socialPopWidth = 650;
      socialPopHeight = 640;
    } else if (socialShareContent.CURRACTIVE === 't-icon') {
      popupHref = 'https://twitter.com/share?url=' + encodeURIComponent(socialLink) + '&text=' + socialShareContent.PRODTEXT + '&source=' + socialShareContent.PRODSOURCE;
      socialPopWidth = 650;
      socialPopHeight = 260;
    } else if (socialShareContent.CURRACTIVE === 'su-icon') {
      popupHref = 'http://www.stumbleupon.com/submit?url=' + encodeURIComponent(socialLink) + '&title=' + socialShareContent.PRODTITLE.SU + '&source=' + socialShareContent.PRODSOURCE;
      socialPopWidth = 800;
      socialPopHeight = 550;
    } else if (socialShareContent.CURRACTIVE === 'g-icon') {
      popupHref = 'https://plus.google.com/share?&url=' + encodeURIComponent(socialLink) + '&source=' + socialShareContent.PRODSOURCE;
      socialPopWidth = 480;
      socialPopHeight = 530;
    } else if (socialShareContent.CURRACTIVE === 'email-icon') {
      popupHref = socialShareContent.PRODEMAILSHARE.toString();
      socialPopWidth = 620;
      socialPopHeight = 715;
    } else if (socialShareContent.CURRACTIVE === 'print-icon') {
      printPage();
    };
    // Print icon doesn't need a popup - it calls the printPage() method.  For everything else, this runs.
    if (socialShareContent.CURRACTIVE !== 'print-icon') {
      window.open(popupHref, '', 'width=' + socialPopWidth.toString() + ',height=' + socialPopHeight.toString());
    };
  };

  $('.social-bar-h').on('click', 'a', function() {
    onSocialIconClick($(this), 0);
  });

  var appendSocialIcons = function($context) {
    var $soccialList = {},
      $currImageUrl = {},
      $targetImage = '',
      $mediaFooter = {}

    $socialList = $('.social-bar-h').clone();
    $socialList.find('.print-icon').remove();
    currImageUrl = $context.attr('href');
    targetImage = currImageUrl.split('/')[currImageUrl.split('/').length - 1]; // Making sure I get the last piece of the URL.
    $mediaFooter = $('#media-footer');
    $mediaFooter.append($socialList);
    $mediaFooter.find('.social-bar-h').on('click', 'a', function() {
      onSocialIconClick($(this), targetImage);
    });
  };

  // Sequences the order of operations on modal launch
  var launchModal = function($this) {
    initGalleryModal($this);
    sizeModal();
    orientSpinner();
    if ($('#current-image').length) {
      $('#media-images').empty();
    }
    initImages($this);
    $('#media-gallery').jqmShow();
    if ($(document).fullScreen() != null) {
      $('#media-footer').append('<img id="media-fullscreen" src="/themes/build/images/beta/icon_fullscreen.png" alt="Fullscreen button"/>');
    };
    $('#media-fullscreen').on('click', function() {
      $('#media-images').toggleFullScreen();
      imageSizer($('#current-image'));
    });
    displayInformation();
    appendSocialIcons($this);
  };

  // Checks the array of preloaded / all images and knows which images are currently loaded, and lets initImages know which needs to be preloaded
  var navigateImages = function($this) {
    var $w = $(window),
      $t = $this,
      $title = $('.media-specs h3'),
      $left = $('#media-images .toggle-left'),
      $right = $('#media-images .toggle-right'),
      nextNumber = 0,
      max = dl.mediaGallery.length,
      imgDetails = '',
      next = {},
      active = parseInt($('#media-information .media-thumbs li.current').attr('data-i'), 10),
      order = preloadList.order,
      activePosition = ($.inArray(active, order));

    if ($t.hasClass('toggle-left')) {
      if (isNaN(active)) {
        nextNumber = order[0];
      } else if (activePosition === 0) {
        nextNumber = order[order.length - 1];
      } else {
        nextNumber = order[activePosition - 1];
      }

    } else if ($t.hasClass('toggle-right')) {
      if (isNaN(active)) {
        nextNumber = order[order.length - 1];
      } else if (activePosition === (order.length - 1)) {
        nextNumber = order[0];
      } else {
        nextNumber = order[activePosition + 1];
      }
    } else {
      nextNumber = $this.attr('data-i');
    }

    next = dl.mediaGallery[nextNumber];

    imgDetails = (next.TITLE) ? ('<span class="pre">Description: </span><span class="post">' + next.TITLE + '</span>') : ((next.FINISH) ? ('<span class="pre">Finish: </span><span class="post">' + next.FINISH + '</span>') : ('<span class="pre">Description: </span><span class="post">' + next.TEXT + '</span>'));
    $('#media-scroll .media-thumbs li').siblings().removeClass('current');
    $('#media-scroll .media-thumbs li[data-i="' + nextNumber + '"]').addClass('current');
    preloader(dl.mediaGallery[nextNumber].IMAGEPATHS['800']);

    if ($t.hasClass('swipe') && $t.hasClass('toggle-left')) {
      initImages(dl.mediaGallery[nextNumber].IMAGEPATHS['800'], 'left');
    } else if ($t.hasClass('swipe') && $t.hasClass('toggle-right')) {
      initImages(dl.mediaGallery[nextNumber].IMAGEPATHS['800'], 'right');
    } else {
      initImages(dl.mediaGallery[nextNumber].IMAGEPATHS['800']);
    }

    $title.html(imgDetails);
    return false;
  };

  // Event for hovering/clicking thumbs on product page
  $galleryImages.on({
    'mouseenter': function() {
      var $this = $(this),
        $imgSrc = $this.attr('href');

      // Swap Out Main Image
      $productImage.attr('src', $this.data('gallery-image'));
      $productImageLink.attr('href', $this.attr('href'));

      preloader(['/themes/build/images/global/ajax-loader.gif', '/themes/build/images/media_gallery/arrows.png']);
      preloader($imgSrc);

    },
    'click': function(e) {
      e.preventDefault();

      var $this = $(this),
        $imgSrc = $this.attr('href');

      preloader(['/themes/build/images/global/ajax-loader.gif', '/themes/build/images/media_gallery/arrows.png']);
      preloader($imgSrc);
      launchModal($this);
    }
  });

  // Event for hovering/clicking main product image
  $productImageLink.on({
    'mouseenter': function() {
      var $this = $(this),
        $imgSrc = $this.attr('href');

      preloader($imgSrc);
    },
    'click': function(e) {
      e.preventDefault();

      var $this = $(this),
        $imgSrc = $this.attr('href');

      preloader($imgSrc);
      launchModal($this);
    }
  });

  //Handles resize event, both tablet and desktop
  $window.on({
    'resize': _.debounce(function() {
      sizeModal();
      imageSizer($('#current-image'));
      displayInformation();
      orientSpinner();
    }, 150)
  });

  // Handles touch events for tablet
  if (touch && tablet) {

    //This prevents the optip on swatches, so you don't have to tap twice to actually select a finish. I know it's whack, but deal with it.
    $('.purchasebox .swatch_wrapper').removeClass('optip').removeClass('optip_top');

    head.js("/themes/build/scripts/vendor/plugins/hammer.js", function() {

      var swipeMethod = function(ev) {

        var $t = $(ev.target),
          $space = $('#media-images'),
          $right = $space.children('.swipe-right'),
          $left = $space.children('.swipe-left'),
          dragStart = 0,
          dragFinish = 0;

        var deltaX = ev.gesture.deltaX,
          direction = ev.gesture.direction;

        if (ev.gesture.touches.length > 1) {

          ev.gesture.preventDefault();

        } else if (($t.parent().attr('id') === 'media-images')) {

          if (ev.type === 'drag' && (ev.gesture.direction === 'left' || ev.gesture.direction === 'right')) {

            if (galleryState === 'pending' || galleryState === 'loading' || galleryState === 'done') {
              return false;
            }

            ev.gesture.preventDefault();

            var $current = $('#current-image');
            $right = $space.children('.swipe-right');
            $left = $space.children('.swipe-left');

            galleryState = "drag";

            $current.css({
              left: deltaX + 'px'
            });


            $left.css({
              left: ((-$space.width()) + deltaX) + 'px'
            });

            $right.css({
              left: ($space.width() + deltaX) + 'px'
            });

            if (-100 < deltaX && deltaX < 100) {
              imageSizer($current);
              $left.css('left', -$space.width() + 'px');
              $right.css('left', $space.width() + 'px');

            } else {
              if (deltaX < -100) {

                galleryState = 'pending';

                $current.css({
                  left: -$space.width() + 'px'
                });

                imageSizer($right);

                $current.on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function() {
                  $left.remove();
                  $current.remove();

                  $right.removeClass('upcoming, swipe-right');
                  $right.css('display', 'block').attr('id', 'current-image');
                  navigateImages($('<div class="toggle-right swipe"></div>'));
                  galleryState = "done";
                  ev.gesture.preventDefault();
                });

              } else if (deltaX > 100) {

                galleryState = 'pending';

                $current.css({
                  left: $space.width() + 'px'
                });

                imageSizer($left);

                $current.on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function() {
                  $right.remove();
                  $current.remove();

                  $left.removeClass('upcoming, swipe-left');
                  navigateImages($('<div class="toggle-left swipe"></div>'));
                  $left.css('display', 'block').attr('id', 'current-image');
                  galleryState = "done";
                  ev.gesture.preventDefault();
                });
              }
            }
          }
          ev.gesture.preventDefault();
        } else if ($t.parent().attr('data-i') || $t.parent().hasClass('media-specs')) {
          if (ev.type === 'drag') {
            return true;

          } else if (ev.type === 'tap' && $t.parent().attr('data-i')) {
            navigateImages($($t.parent()));
            $right.remove();
            $left.remove();
            galleryState = 'done';

            ev.gesture.preventDefault();
          }
          //ev.gesture.preventDefault();
        } else if (($t.hasClass('jqm-close') || $t.hasClass('jqm-overlay')) && ev.type === 'tap') {

          $('#media-gallery').jqmHide();
          galleryState = '';
          ev.gesture.preventDefault();

        } else {
          ev.gesture.preventDefault();
        }
      };



      // Binds touch events to the body, delegates events accordingly.
      $('body').hammer({
        drag_min_distance: 1,
        hold_timeout: 50,
        swipe_max_touches: 0
      }).on("touch tap drag", "#media-gallery, .jqm-overlay", function(ev) {
        swipeMethod(ev);
      });
    });
  } else {

    // Binds clicking a thumbnail  / arrow on desktop, and effects the change to next images
    $('body').on('click', '#media-gallery .media-arrow, #media-scroll .media-thumbs li', _.debounce(function(e) {
      navigateImages($(this));
    }, 100));
  }
