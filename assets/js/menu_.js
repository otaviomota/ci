$(document).ready(function() {
	
	var posicao = new Array();
	posicao['0'] = new Array('-1px','-23px','-32px','-41px');
	posicao['1'] = new Array('-1px','-10px','-33px','-41px');
	posicao['2'] = new Array('-1px','-10px','-19px','-41px');
	// para voltar no menu completo
	//posicao['1'] = new Array('-1px','-10px','-39px','-48px');
	//posicao['2'] = new Array('-1px','-10px','-19px','-52px');
	
	
	// posicao['sub1'] = new Array('menu_1',	'menu_2',	'menu_3',	'menu_4', 	'subitens_2_1', 	'subitens_2_2', 'sub_subitens_3_1');
	posicao['sub0'] = new Array(	'-1px',		'-10px',	'-46px',	'-54px',	'-13px',			'-21px',		'-35px',		'-18px');
	posicao['sub1'] = new Array(	'-1px',		'-10px',	'-49px',	'-58px',	'-1px',				'-24px',		'-35px',		'-8px');
	posicao['sub2'] = new Array(	'-1px',		'-10px',	'-38px',	'-47px',	'-8px',				'-7px',			'-45px',		'-8px');
	posicao['sub3'] = new Array(	'-1px',		'-10px',	'-19px',	'-47px',	'-8px',				'-7px',			'-45px',		'-8px');
	
	// posicao['menu_1'] = new Array('sub_2_1',	'sub_2_2',	'menu_3',	'menu_4', 	'subitens_2_1' 	'subitens_2_2', 	'sub_3_1', 		'sub_3_2', 		'sub_3_3', 		'sub_3_3');
	posicao['menu_1'] = new Array(	'-12px',	'-0px',		'-39px',	'-48px',	'-11px',		'-18px',			'-45px',		'-31px',		'-38px',		'-35px');
	posicao['menu_2'] = new Array(	'-1px',		'-10px',	'-39px',	'-48px',	'-1px',			'-8px',				'-45px',		'-21px',		'-38px',		'-35px');
	posicao['menu_3'] = new Array(	'-1px',		'-0px',		'-39px',	'-48px',	'-1px',			'-8px',				'-35px',		'-10px',		'-17px',		'-28px');
	posicao['menu_4'] = new Array(	'-8px',		'-19px',	'-39px',	'-48px',	'-1px',			'-8px',				'-45px',		'-21px',		'-38px',		'-35px');
	
	//para voltar no menu completo
	//posicao['sub2'] = new Array(	'-1px',		'-10px',	'-45px',	'-54px',	'-8px',				'-7px',			'-45px',		'-9px');
	
	//posicao['menu_1'] = new Array(	'-12px',	'-0px',		'-39px',	'-48px',	'-8px',			'-15px',			'-45px',		'-31px',		'-38px',		'-35px');
	//posicao['menu_2'] = new Array(	'-1px',		'-10px',	'-39px',	'-48px',	'-8px',			'-15px',			'-45px',		'-31px',		'-38px',		'-35px');
	//posicao['menu_3'] = new Array(	'-1px',		'-0px',		'-39px',	'-48px',	'-8px',			'-15px',			'-35px',		'-21px',		'-28px',		'-28px');
		
	$(".subitens").click(function(){
		$(this).addClass("menu_ativo").next().slideDown();
		
		// remover cor de hover
		$(".subitens").parent().removeClass("menu_hover");
		bgPosicao = $(this).parent().css('backgroundPosition');
		$(this).parent().addClass("menu_hover").css("background-position", bgPosicao);
		
		arrayPos = $(this).parents().attr("id");
		$(".menu_sub_toggle").slideUp();
		
		
		$(".subitens_2_0").animate({backgroundPosition: '-' + posicao[arrayPos][0] +' 0px'});
		$(".subitens_2_1").animate({backgroundPosition: '-' + posicao[arrayPos][4] +' 0px'});
		$(".subitens_2_2").animate({backgroundPosition: '-' + posicao[arrayPos][5] +' 0px'});
		
		$(".sub_subitens_3_1").animate({backgroundPosition: '-' + posicao[arrayPos][6] +' 0px'});
		$(".sub_subitens_3_2").animate({backgroundPosition: '-' + posicao[arrayPos][7] +' 0px'});
		$(".sub_subitens_3_3").animate({backgroundPosition: '-' + posicao[arrayPos][8] +' 0px'});
		
		
		
		$(".subitens").not($(this)).removeClass("menu_ativo");		
		$(".menu_principal_toggle").not( $(this).next() ).slideUp();
		
		mnPos = $(this).parent().index();
		
		for(i=0; i<4; i++){
			$(".menu_" + (i +1)).animate({backgroundPosition: '-' + posicao[ mnPos ][i]+' 0px'});
		}
	});
		
		
	$(".subitem_branco").click(function(){
		if( ! $(this).next().is(':visible')){
			$(".menu_sub_toggle").slideUp();
			$(this).next().slideDown();
			
			
			mnPos = this.id;
			for(i=0; i<4; i++){
				$(".menu_" + (i +1)).animate({backgroundPosition: '-' + posicao[ mnPos ][i]+' 0px'});
			}
			
			if(mnPos == "sub0"){
				$(".subitens_2_1").animate({backgroundPosition: '-' + posicao[ mnPos ][4]+' 0px'});		
				$(".subitens_2_2").animate({backgroundPosition: '-' + posicao[ mnPos ][5]+' 0px'});				
				//$(".sub_subitens_3_1").animate({backgroundPosition: '-' + posicao[ mnPos ][5]+' 0px'});
			}else if(mnPos == "sub1"){
				$(".subitens_2_1").animate({backgroundPosition: '-' + posicao[ mnPos ][4]+' 0px'});
				$(".subitens_2_2").animate({backgroundPosition: '-' + posicao[ mnPos ][5]+' 0px'});				
				//$(".sub_subitens_3_1").animate({backgroundPosition: '-' + posicao[ mnPos ][5]+' 0px'});
			}else
			if(mnPos == "sub2"){
				$(".subitens_2_2").animate({backgroundPosition: '-' + posicao[ mnPos ][7]+' 0px'});
				$(".sub_subitens_3_1").animate({backgroundPosition: '-' + posicao[ mnPos ][6]+' 0px'});
			}else
			if(mnPos == "sub3"){
				$(".menu_").animate({backgroundPosition: '-' + posicao[ mnPos ][3]+' 0px'});
			}
		}
	});

});