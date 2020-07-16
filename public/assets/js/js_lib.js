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