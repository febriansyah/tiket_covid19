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