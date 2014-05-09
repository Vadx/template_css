/*
	VadxNav.js 1.0.0	
*/

(function() {
  var $;

  $ = jQuery;

  $.fn.vadxNav = function(options) {
    var $nav, 		
		breakpoint, 
		count,
		resizer, 
		settings, 		
		toggle_selector, 
		touch_selector;
		
    settings = $.extend({
      'animationSpeed': 400,      
      'buttonSelector': '.menu-button',      
      
    }, options);
    
	$nav = $(this);
    $nav.addClass('with-js');
    
    $nav.find("li").each(function() {
      if ($(this).has("ul").length) {
        return $(this).addClass("item-with-ul").find("ul");
      }
    });
    
	if ($nav.data('breakpoint')) {
      	breakpoint = $nav.data('breakpoint');
    }
        
    resizer = function() {
      var selector;
      if ($(window).width() <= breakpoint) {
	        $nav.removeClass("lg-screen").addClass("sm-screen");
	        
	        selector = settings['buttonSelector'] + ', ' + settings['buttonSelector'] + ' .touch-button';
	        $(selector).removeClass('active');
	        return $('.one-page li a').on('click', function() {
	          return $nav.removeClass('vadx-nav-show');
	        });
      } else if ($(window).width() > breakpoint) {
	        $nav.removeClass("sm-screen").addClass("lg-screen");        
	        $nav.removeClass('vadx-nav-show').find('.item-with-ul').on();
	        $('.item-with-ul').find('ul').removeClass('vadx-nav-show');        
       
      }
    };
    $(settings['buttonSelector']).data('navEl', $nav);
    
	touch_selector = '.item-with-ul, ' + settings['buttonSelector'];
    $(touch_selector).append('<span class="touch-button"><i class="navicon">&#9660;</i></span>');
    toggle_selector = settings['buttonSelector'] + ', ' + settings['buttonSelector'] + ' .touch-button';
    $(toggle_selector).on('click', function(e) {
	      var $btnParent, $thisNav, bs;
	      $(toggle_selector).toggleClass('active');
	      e.preventDefault();
	      e.stopPropagation();
	      bs = settings['buttonSelector'];
	      $btnParent = $(this).is(bs) ? $(this) : $(this).parent(bs);
	      $thisNav = $btnParent.data('navEl');
	      return $thisNav.toggleClass('vadx-nav-show');
    });
    
	$('.touch-button').on('click', function(e) {
      var $sub, $touchButton;
      $sub = $(this).parent('.item-with-ul').find('>ul');
      $touchButton = $(this).parent('.item-with-ul').find('>span.touch-button');
      if ($nav.hasClass('lg-screen') === true) {
        $(this).parent('.item-with-ul').siblings().find('ul.vadx-nav-show').removeClass('vadx-nav-show');
      }
      if ($sub.hasClass('vadx-nav-show') === true) {
        	$sub.removeClass('vadx-nav-show').slideUp(settings.animationSpeed);
        return $touchButton.removeClass('active');
      } else if ($sub.hasClass('vadx-nav-show') === false) {
        	$sub.addClass('vadx-nav-show').slideDown(settings.animationSpeed);
        return $touchButton.addClass('active');
      }
    });
    $nav.find('.item-with-ul *').focus(function() {
	      $(this).parent('.item-with-ul').parent().find(".open").not(this).removeClass("open").hide();
	      return $(this).parent('.item-with-ul').find('>ul').addClass("open").show();
    });
    resizer();
    return $(window).on('resize', resizer);
  };

}).call(this);
