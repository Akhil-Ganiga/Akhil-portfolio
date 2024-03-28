$(document).ready(function() {
  /*** Newsfeed ***/
  $('.project_slider').owlCarousel({
   loop: true,
   margin: 50,
   items:3,
   nav:false,
  //  navText: [  
  //     '<img class="left_arrow" src="https://cmrgandhipublicschool.com/wp-content/themes/ed-school/new-assets/images/whycmr-lftarr.png"/>',
  //     '<img class="ryt_arrow" src="https://cmrgandhipublicschool.com/wp-content/themes/ed-school/new-assets/images/whycmr-ryttarr.png"/>'
  // ],
   autoplay:false,
   center: false,
   dots:false,
   responsive:{
     0:{
       items:1
     },
     600:{
       items:1
     },
     768:{
       items:2,
      //  margin:50
     },
     1200:{
       items:3,
      //  margin:20
     }
   }
 });
});









/* Description: Custom JS file */


(function($) {
    "use strict"; 
	
    /* Navbar Scripts */
    // jQuery to collapse the navbar on scroll
    $(window).on('scroll load', function() {
		if ($(".navbar").offset().top > 60) {
			$(".fixed-top").addClass("top-nav-collapse");
		} else {
			$(".fixed-top").removeClass("top-nav-collapse");
		}
    });
    
	// jQuery for page scrolling feature - requires jQuery Easing plugin
	$(function() {
		$(document).on('click', 'a.page-scroll', function(event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top
			}, 600, 'easeInOutExpo');
			event.preventDefault();
		});
    });

    // offcanvas script from Bootstrap + added element to close menu on click in small viewport
    $('[data-toggle="offcanvas"], .navbar-nav li a:not(.dropdown-toggle').on('click', function () {
        $('.offcanvas-collapse').toggleClass('open')
    })

    // hover in desktop mode
    function toggleDropdown (e) {
        const _d = $(e.target).closest('.dropdown'),
            _m = $('.dropdown-menu', _d);
        setTimeout(function(){
            const shouldOpen = e.type !== 'click' && _d.is(':hover');
            _m.toggleClass('show', shouldOpen);
            _d.toggleClass('show', shouldOpen);
            $('[data-toggle="dropdown"]', _d).attr('aria-expanded', shouldOpen);
        }, e.type === 'mouseleave' ? 300 : 0);
    }
    $('body')
    .on('mouseenter mouseleave','.dropdown',toggleDropdown)
    .on('click', '.dropdown-menu a', toggleDropdown);


    /* Move Form Fields Label When User Types */
    // for input and textarea fields
    $("input, textarea").keyup(function(){
		if ($(this).val() != '') {
			$(this).addClass('notEmpty');
		} else {
			$(this).removeClass('notEmpty');
		}
	});
	

    /* Back To Top Button */
    // create the back to top button
    $('body').prepend('<a href="body" class="back-to-top page-scroll">Back to Top</a>');
    var amountScrolled = 700;
    $(window).scroll(function() {
        if ($(window).scrollTop() > amountScrolled) {
            $('a.back-to-top').fadeIn('500');
        } else {
            $('a.back-to-top').fadeOut('500');
        }
    });


	/* Removes Long Focus On Buttons */
	$(".button, a, button").mouseup(function() {
		$(this).blur();
	});

})(jQuery);

		
// akhil script
/*Interactivity to determine when an animated element in in view. In view elements trigger our animation*/
$(document).ready(function() {

//window and animation items
var animation_elements = $.find('.animation-element');
var web_window = $(window);

//check to see if any animation containers are currently in view
function check_if_in_view() {
  //get current window information
  var window_height = web_window.height();
  var window_top_position = web_window.scrollTop();
  var window_bottom_position = (window_top_position + window_height);

  //iterate through elements to see if its in view
  $.each(animation_elements, function() {

    //get the element sinformation
    var element = $(this);
    var element_height = $(element).outerHeight();
    var element_top_position = $(element).offset().top;
    var element_bottom_position = (element_top_position + element_height);

    //check to see if this current container is visible (its viewable if it exists between the viewable space of the viewport)
    if ((element_bottom_position >= window_top_position) && (element_top_position <= window_bottom_position)) {
      element.addClass('in-view');
    } else {
      element.removeClass('in-view');
    }
  });

}

//on or scroll, detect elements in view
$(window).on('scroll resize', function() {
    check_if_in_view()
  })
  //trigger our scroll event on initial load
$(window).trigger('scroll');

});

const page = document.querySelector(".js-page");
const wrapper = document.querySelector(".js-page__wrapper");

// ease value to be used in interpolation
const ease = 0.01; // 20%

// create an object to store scroll details
const scroll = {
current: 0, // current scroll position
target: 0, // target scroll position
limit: 0 // limit of scroll
};

// function to update target scroll position
const updateTarget = (e) => {
// set the target value to deltaY
// which is distance covered by mouseWheel
scroll.target += e.deltaY;
};

// create an event listener to listen for mouse-wheel
document.addEventListener("mousewheel", updateTarget);

// linear interpolation function
const lerp = (current, target) => {
// get distance between current & target scroll points
const distanceBetween = target - current;

// get a percentage of that distance, in this case 20%
const distanceToTravel = distanceBetween * ease;

// add the % distance to the current scroll value
return current + distanceToTravel;
};

// clamping function to limit mousewheel values
const clamp = (min, max, value) => {
const clamped = Math.min(Math.max(value, min), max);
return clamped;
};

// main scroll function
const smoothScroll = () => {
const maxScroll = wrapper.clientHeight - window.innerHeight;
// clamp scroll target value
scroll.target = clamp(0, maxScroll, scroll.target);

const { current, target } = scroll;

const transition = lerp(current, target);
scroll.current = transition;

// translate page wrapper based on lerped value
wrapper.style.transform = `translateY(-${scroll.current}px)`;
window.requestAnimationFrame(smoothScroll);
};

// call smoothScroll to start loop
smoothScroll();
