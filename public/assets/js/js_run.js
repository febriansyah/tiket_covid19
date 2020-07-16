/*===============================================================================================================	
Author     : Muhammad Febriansyah
Date       : Mei 2018
 =============================================================================================================== */
$(document).ready(function() {
	$("#searchTrigger").click(function(){
		$("#popup_search").removeClass("hide");
		setTimeout(function() {
			$("#popup_search").addClass("actived");
		}, 500);
	});
	$(".trigger_close_popup").click(function(){
		$(".popup_slider").removeClass("actived");
		setTimeout(function() {
			$(".popup_slider").addClass("hide");
		}, 500);
	})
	
});


