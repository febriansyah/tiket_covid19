/*===============================================================================================================	
Author     : Muhammad Febriansyah
Date       : Mei 2019
 =============================================================================================================== */

 $.fn.generate_height = function () {
  var maxHeight = -1;
  $(this).each(function () {
    $(this).children().each(function () {
      maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).height();
    });

    $(this).children().each(function () {
      $(this).height(maxHeight);
    });
  })
}

$.fn.accordion_tnc = function () {
	$(".page").click(function (e) {
		if (!$(this).is('.active')) {
			$(".page,.content").removeClass('active');
			$(".page").siblings('.content:visible').slideUp("slow");
			$(this).addClass('active');
			$(this).siblings('.content').slideDown("slow");
			$(this).siblings('.content').addClass("active");
		} else {
			$(this).removeClass('active');
			$(this).siblings('.content').slideUp("slow");
		}
	});
}

function readmoreFade(){
	$(".detail-text-project .button-readmore").click(function(e) {
		//alert('aaa');
		e.preventDefault();
		var totalHeight = 0;
		var el = $(this);
		var p  = el.parent();
		var up = p.parent();
		var ps = up.find("p:not('.read-more')");

		console.log(totalHeight);
			ps.each(function() {
			totalHeight += $(this).outerHeight();
		});
		up
		.css({
		  // Set height to prevent instant jumpdown when max height is removed
		  "height": "auto",
		  "max-height": 9999
		})
		.animate({
		  "height": "auto"
		});

		// fade out read-more
		p.fadeOut("fast");

		// prevent jump-down
		return false;
        
    });
}
function popupSlider(){
		$(".trigger_slider_search").click(function(){
			var sliderId =$(this).attr("data-slider");

			$("#"+sliderId).removeClass("hide");
			setTimeout(function() {
				$("#"+sliderId).addClass("actived");
			}, 500);
		});
		$(".trigger_close_popup").click(function(){
			$(".popup_slider").removeClass("actived");
			setTimeout(function() {
				$(".popup_slider").addClass("hide");
			}, 500);
		})
	}