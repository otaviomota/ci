$(document).ready(function() {		
	ajuste =  73;	
	larg_Win = $(window).width();
	larg_Dest = $(".banner_destaque").width();
	
	bnnDestaque = $(".banner_destaque").offset()
	posLeft = bnnDestaque.left;
	$(".header_faixa").css("width", posLeft + ajuste);
	
	posLeft = -747 + posLeft - (ajuste/2) + 5;
	
	
	$("#banner_interna1, #banner_interna2, #banner_interna3, #banner_interna4").animate({backgroundPosition: '-' + posLeft+' 0px'}, 10);
	$("#banner_interna5").animate({backgroundPosition: '-' + (posLeft - 6) +' 0px'}, 10);
	$("#destaque1, #destaque3, #destaque4, #destaque5").animate({backgroundPosition: '-' + posLeft+' 0px'}, 10);
	
	$(".list_produtos>div").hover(function(){
		$(".list_produtos>div").not($(this)).stop().fadeTo(300, 0.2)
	},function () {
		$(".list_produtos>div").not($(this)).stop().fadeTo(300, 1);
	  }
	);
	
	$(window).resize(function() {
		$(".destaque_principal").children().fadeOut();
		
		bnnDestaque = $(".banner_destaque").children().offset();
		posLeft = bnnDestaque.left;
		$(".header_faixa").css("width", posLeft + ajuste);
		
		posLeft = -747 + posLeft - (ajuste/2);
		$("#banner_interna1, #banner_interna2, #banner_interna3, #banner_interna4").animate({backgroundPosition: '-' + posLeft+' 0px'}, 10);
		$("#destaque1, #destaque3, #destaque4, #destaque5").animate({backgroundPosition: '-' + posLeft+' 0px'}, 10);
	});
	

			
});


