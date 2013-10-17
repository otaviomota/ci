$(document).ready(function() {
	$("#galeria").jcarousel({
		scroll: 1,
		initCallback: mycarousel_initCallback,
		itemVisibleInCallback: { onBeforeAnimation: mycarousel_itemVisibleInCallbackBeforeAnimation, onAfterAnimation:  mycarousel_itemVisibleInCallbackAfterAnimation },
		
		// This tells jCarousel NOT to autobuild prev/next buttons
		buttonNextHTML: null,
		buttonPrevHTML: null
	});
	
	
	
	$(".tb_controle2").jcarousel({
		scroll: 1,
		initCallback: mycarousel_initCallback,
		
		// This tells jCarousel NOT to autobuild prev/next buttons
		buttonNextHTML: null,
		buttonPrevHTML: null
	});
});


function mycarousel_itemVisibleInCallbackBeforeAnimation(carousel, item, posicao, state) {	
	montaHoverCarousel( 0 , posicao );
};

function mycarousel_itemVisibleInCallbackAfterAnimation(carousel, item, posicao, state) {
	montaHoverCarousel( 0 , posicao );
};



function mycarousel_initCallback(carousel) {
    $('.tb_controle2 li').bind('click', function() {
		movePosiccao = $.jcarousel.intval( $(this).index()+1 );
        carousel.scroll( movePosiccao );
        return false;
    });
	
	
    $('#galeria-next').click(function() {
        carousel.next();
        return false;
    });

    $('#galeria-prev').click(function() {
        carousel.prev();
        return false;
    });
};




function montaHoverCarousel( ano,  posicao ){
	
	if(ano == 0)
		ano = $(".tb_controle2 li").eq( posicao - 1 ).attr("id")
	
	
	$(".tb_controle2 li").html("");
	$(".tb_controle2 li").eq( posicao - 1 ).html('<div class="tb_hover_border_vermelha"></div><div class="tb_hover_ano">'+ ano +'</div>');		
}
