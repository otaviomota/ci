$(document).ready(function() {			
			
	larg_Win = $(window).width();
	larg_Dest = $(".banner_destaque").width();
	
	bnnDestaque = $(".banner_destaque").offset()
	posLeft = bnnDestaque.left;
	$(".header_faixa").css("width", posLeft + 101);
	
	posLeft = -787 + posLeft;
	
	
	$("#banner").animate({backgroundPosition: '-' + posLeft+' 0px'}, 10);
	
	$(".list_produtos>div").hover(function(){
		//console.log($(".list_produtos>div").not($(this)));
		$(".list_produtos>div").not($(this)).stop().fadeTo(300, 0.2)
	},function () {
		$(".list_produtos>div").not($(this)).stop().fadeTo(300, 1);
	  }
	);
	
	$(window).resize(function() {
		//$(".destaque_principal").fadeOut();		
		
		bnnDestaque = $(".banner_destaque").offset()
		posLeft = bnnDestaque.left;
		
		$(".header_faixa").css("width", posLeft + 101);
		
	});
	
	
	
	var contador 	= 1;
	var img_length 	= 4;
	var img_size  	= 787;
	
	var fotodestaque = new Array();
	fotodestaque = new Array( 'timex_ironman_novo_home','timex_ironman_shock', 'timex_ironman_gps');
	
	
	function moveBannerHome(){
		
		$(".destaque_principal").fadeOut();
		$(".timex_produtos").delay(500).fadeOut();
		$(".box_destaque").delay(1000).fadeOut();
		
		bnnDestaque = $(".banner_destaque").offset()
		posLeft = bnnDestaque.left;
		
		$(".header_faixa").css("width", posLeft + 101);
		
		contador++;
		posLeft = (- img_size * contador) + posLeft;
        
        if( contador == 2 ){
            posLeft = posLeft  -1;
        }
		
		$("#banner").delay(200).animate({backgroundPosition: '-' + posLeft+' 0px'}, 1300, function(){
			if(contador == img_length){
				contador = 1;
				
				bnnDestaque = $(".banner_destaque").offset();
				posLeft = bnnDestaque.left;				
				posLeft = (- img_size * contador) + posLeft;				
				
				$("#banner").css("background", "url(img/destaque/foto4.jpg) repeat-x " + posLeft +"px top");
				$("#banner").animate({backgroundPosition: '-' + posLeft+' 0px'}, 1);
			}
			
			
			
			if(contador ==3){
				$(".destaque_principal").css("background", "url(img/destaque/foto1.png) no-repeat");
			}else{
				$(".destaque_principal").css("background", "url(img/destaque/foto"+ (contador+1) +".png) no-repeat");
			}

            if( contador - 1 ==0){
                $(".timex_produtos_link_relogio").show();
            }else{
                $(".timex_produtos_link_relogio").hide();
            }

			$(".timex_produtos").css("background", "url(img/"+ fotodestaque[ contador - 1 ]+".png) no-repeat").delay(500).fadeIn(1200);
			$(".destaque_principal").fadeIn(1200);			
			$(".destaque"+ contador).delay(1000).fadeIn(1200);
			
		});
		
	}//end
	
	var intervalo = window.setInterval(function() { moveBannerHome(); }, 14000);

			
});