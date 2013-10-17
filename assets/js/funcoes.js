$(document).ready(function () {
   /* $("body").queryLoader2({
        barColor: "#FFFFFF",
        backgroundColor: "#000000",
        percentage: true,
        barHeight: 1,
        completeAnimation: "grow"
    });*/
});


$(document).ready(function(){
	$('a[href="#"]').click(function(e){
	  e.preventDefault();
	});

    $('a[href="#"]').live('click', function(e){
        e.preventDefault();
    });
	
	
	// menu icone superior
	$(".icons_header li").mouseover(function() {
		$(this).children('.descricao').fadeIn("slow");
	});
	$(".icons_header li").mouseleave(function() {
		$(this).children('.descricao').stop().fadeOut("fast");
	});
	
	
	$(".box_outros_produtos li:first").css("border-left","none");
	
	$(".logo_nucleo").fadeTo('slow', 0.3);
	
	$(".logo_nucleo").hover(function(){
		$(".logo_nucleo").fadeTo(500, 1);
	},function() {
		$(".logo_nucleo").fadeTo(500, 0.3);
	});



    $(".busca_relogio_tamanho > div").hover(function(){
        $(this).parent().addClass( $(this).attr("class") + "_hover");
    },function() {
        $(this).parent().removeClass("busca_rel_func_grande_hover busca_rel_func_medio_hover busca_rel_func_pequeno_hover");
    });
	
	
	
	
	$('.produto_categoria').find(".box_categoria_fechado").each(function(){
		tamanho = $(this).find(".box_categoria").size();
		
		if(tamanho <= 3)
			$(this).find(".ver_todos").hide();		
	});
	
	
	
	
	$(".ver_todos").click(function(){
		
		if( $(this).parent().attr("class").indexOf("box_categoria_aberto") < 0){
			$(this).addClass("ver_todos_fechar").parent().addClass("box_categoria_aberto");
			
			boxheight = 317 + 20;
			total_box = $(this).parent().children("div.box_categoria").length;
			total_box = boxheight * Math.ceil((total_box / 3)) ;			
		}else
		{
			$(this).removeClass("ver_todos_fechar").parent().removeClass("box_categoria_aberto");
			total_box = 317 + 20;
		}
		
		 $(this).parent().animate({'height': total_box});
		
	});
	
	
	//FAQ
	$(".box_faq > li> a").click(function(){
		if( $(this).next().is(":hidden")){
			$(".box_faq > li> a").removeClass("icon_menos").addClass("icon_plus");
			$(this).removeClass("icon_plus").addClass("icon_menos");
			$(".detail_faq").slideUp();
			$(this).next().slideDown();
		}
	});


	// fale conosco
	$('#fale_com').change(function(e){
		fale_com = $('#fale_com').val();
		
		if(fale_com == 1 )
			$(".assunto").slideDown();
		else{
			$(".assunto").slideUp();
		
			$(".assunto_avancado").slideUp();			
			$('.box_resposta').fadeOut("slow");
			
			$(".resposta").html("");
			$("#referencia, #cpf_cnpj").val("");
			
			$('#assunto option[value="0"]').attr('selected',true);
			$('.assunto div span').html("");
		}
	});
	
		
	$('#assunto').change(function(e){
		assunto = $('#assunto').val();
		
		if( assunto != 5 && assunto != 6 && assunto != 0 ){
			$(".assunto_avancado").slideUp();
			opcao_resposta = $('#opcao' + assunto).html();
			$(".resposta").html( opcao_resposta );
			$('.box_resposta').fadeIn("slow");
		}else{
			if( assunto == 5 || assunto == 6 )
				$(".assunto_avancado").slideDown();
			else
				$(".assunto_avancado").slideUp();
			
			$(".resposta").html("");
			$('.box_resposta').fadeOut("slow");
		}
		
	});
	
	$(".box_resposta_fechar > a").click(function(){
		$(".box_resposta").fadeOut("slow");
	});
	
	
	/* Intelligent Quartz */
	$(".menu_tab_iq li").mouseover(function() {
		$(this).stop(true, true).addClass("menu_tab_iq_hover");
	});
	
	$(".menu_tab_iq li").mouseleave(function() {
		$(this).stop(true, true).removeClass("menu_tab_iq_hover");
	});
	
	$(".menu_tab_iq li").click(function() {
		index = $(this).index() + 1;
		
		$(".menu_tab_iq li").removeClass("menu_tab_iq_ativo");
		$(this).addClass("menu_tab_iq_ativo");
		
		$(".menu_tab_iq_cont:not(.menu_tab_iq_cont_" + index +")").hide();
		$(".menu_tab_iq_cont_" + index ).show();
	});

});	


$(document).ready(function() {	
	var posicao_anterior = 0;
	var li_total = $(".tb_controle2 li").length;
	var li_larg  = $(".tb_controle2 li").width();
	var ul_larg  = li_larg * li_total + ( li_total * 3 + 9) ;
	var div_larg = ul_larg - $(".tb_controle2").width();
	
	$(".tb_controle2 ul").css({"width": ul_larg });
	
	$(".tb_controle2 li").hover(
	  function () {
		ano = this.id;
		$(this).html('<div class="tb_hover_border_vermelha"></div><div class="tb_hover_ano">'+ ano +'</div>');
	  }, 
	  function () {
		$(this).html("");
	  }
	);	
});

/**-- assistência técnica --**/
$(document).ready(function() {
	
	$('#cod_cidades option[value="0"]').attr('selected',true);
	$('#uniform-cod_cidades span').html("");
	$('#cod_cidades').change(function(){
		if( $(this).val() ) {
			//$('#lista_lojas').fadeOut().html('');
			$('.carregando_lojas').show();
			$('.mapContent').hide().html('');
			
			//console.log('id da cidade = '+$(this).val());
						
			$.getJSON('assitencia-tecnica.ajax.php?search=',{cod_cidades: $(this).val(), ajax: 'true'}, function(dados){				
				if(dados.length >= 1){
					var options = '';	
					for (var i = 0; i < dados.length; i++) {
						options += '<li>';
						
						email = dados[i].email;
						
						if(email.indexOf('@technos.com') > -1  || email.indexOf('@grupotechnos.com.br') > -1  ){
							options += '<div class="nome endereco_autorizada">';
						}else{
							options += '<div class="nome  endereco_filial">';
						}
						
						options += dados[i].assistencia + '</div>';
						options += '<p class="endereco">';
						options += dados[i].endereco + '<br>';
						options += '('+ dados[i].ddd +')'+ dados[i].telefone;
						options += '</p>';
						options += '<a href="javascript:void(0);" onclick="GetMapa('+"'mapa_"+ i + "'"+', '+"'"+ dados[i].localizacao + "'"+');" class="bt_vermapa">ver mapa</a>';
						options += '<div class="mapContent"><div  id="mapa_'+ i +'" class="mapa_carregado"></div></div>';
						options += '</li>';
					}
					$('.carregando_lojas').fadeOut('fast');
					$('#lista_lojas').html(options).fadeIn('slow');
					$('.mapContent').hide();
					
					$('#lista_lojas > li > a').click(function(e){
						$('.mapContent').not($(this).next()).slideUp()
						$(this).next().slideDown();						
					});
					
				}else{
					$('.carregando_lojas').fadeOut('fast');
					$('#lista_lojas').html('<p class="error_loja">Nenhuma loja encontrada!</p>').fadeIn('fast');
				}
			});
		} else {
			$('#cod_cidades').html('<option value="">-- Escolha uma cidade --</option>');
		}
	});
	
	$('#cod_estados').change(function(){
		
		$('#uniform-cod_cidades_revendedores span').html("");
		$('#lista_lojas').html("<li></li>");
		
		if( $(this).val() ) {
			$('#uniform-cod_cidades').fadeOut('fast');
			$('.carregando').fadeIn('slow');
			
			//console.log('id do estado = '+$(this).val());
						
			$.getJSON('cidades.ajax.php?search=',{id_estado: $(this).val(), ajax: 'true'}, function(j){
				var options = '<option value=""></option>';	
				for (var i = 0; i < j.length; i++) {
					options += '<option value="' + j[i].cod_cidades + '">' + j[i].nome + '</option>';
				}	
				$('#cod_cidades_revendedores').html(options);
				$('#uniform-cod_cidades').fadeIn();
				$('.carregando').delay(1000).fadeOut();
			});
		} else {
			$('#cod_cidades_revendedores').html('<option value="">– Escolha um estado –</option>');
		}
	});	
	
	
	$('#cod_cidades_revendedores').change(function(){
		if( $(this).val() ) {
			//$('#lista_lojas').fadeOut().html('');
			$('.carregando_lojas').show();
			$('.mapContent').hide().html('');
			
			//console.log('id da cidade = '+$(this).val());
						
			$.getJSON('revendedores-tecnica.ajax.php?search=',{cod_cidades: $(this).val(), ajax: 'true'}, function(dados){				
				if(dados.length >= 1){
					var options = '';	
					for (var i = 0; i < dados.length; i++) {
						options += '<li>';
						options += '<div class="nome">' + dados[i].revendedor + '</div>';
						options += '<p class="endereco">';
						options += dados[i].endereco + '<br>';
						options += '('+ dados[i].ddd +')'+ dados[i].telefone;
						options += '</p>';
						/*
						options += '<a href="javascript:void(0);" onclick="GetMapa('+"'mapa_"+ i + "'"+', '+"'"+ dados[i].localizacao + "'"+');" class="bt_vermapa">ver mapa</a>';
						options += '<div class="mapContent"><div  id="mapa_'+ i +'" class="mapa_carregado"></div></div>';
						*/
						options += '</li>';
					}
					$('.carregando_lojas').fadeOut('fast');
					$('#lista_lojas').html(options).fadeIn('slow');
					$('.mapContent').hide();
					
					$('#lista_lojas > li > a').click(function(e){
						$('.mapContent').not($(this).next()).slideUp()
						$(this).next().slideDown();						
					});
					
				}else{
					$('.carregando_lojas').fadeOut('fast');
					$('#lista_lojas').html('<p class="error_loja">Nenhuma loja encontrada!</p>').fadeIn('fast');
				}
			});
		} else {
			$('#cod_cidades_revendedores').html('<option value="">-- Escolha uma cidade --</option>');
		}
	});
	
	
	$("#btn_buscar_ordem_servico").click(function(){
			cod_filial			= $("#cod_filial").val();
			cod_ordem_servico	= $("#cod_ordem_servico").val();
			cod_cpf_cnpj		= $("#cod_cpf_cnpj").val();
			
			msg = "";
			
			if(cod_filial=="1"){
				msg = "Selecione uma Filial.";
				$("#cod_filial").focus();
			}else
			if(cod_ordem_servico==""){
				msg = "Informe sua Ordem de Serviço.";
				$("#cod_ordem_servico").focus();
			}else
			if(cod_cpf_cnpj==""){
				msg = "Informe seu CPF/CNPJ.";
				$("#cod_cpf_cnpj").focus();
				
			}
			
			if(msg != ""){
				$(".resposta").html( msg );
				$('.box_resposta').fadeIn("slow");
				return false;
			}
		
		
			$.ajax({
			  type: "POST",
			  url: "ordem-de-servico.ajax.php",
			  cache: false,
			  data: {fil: cod_filial, par1: cod_ordem_servico, par2: cod_cpf_cnpj },
			  
				success: function(retorno){
					$(".resposta").html( retorno );
					$('.box_resposta').fadeIn("slow");
				},

				error: function(erro){
					$('#resposta').html(erro);
				}
			});
			
			/*
			$.getJSON('ordem-de-servico.ajax.php',, function(dados){
				if(dados.length >= 1){					
					$(".resposta").html( dados[0].resposta );
					$('.box_resposta').fadeIn("slow");
				}
			});	*/	
		
	
	});//btn_buscar_ordem_servico
	
	

	

	
	
});





function getLatLong($opcao) {
var $geo = new google.maps.Geocoder();

$geo.geocode({
	address: $opcao.endereco
},
	function($resultado, $status){
		if($status == google.maps.GeocoderStatus.OK) {
			// Criamos nossas latitude e longitude
			var $coords = $resultado[0].geometry.location;

			// Opcoes do mapa
			var $opcoes = {
				zoom: $opcao.zoom,
				center: $coords,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			}

			// Criamos o mapa
			var $mapDom = document.getElementById($opcao.dom);
			var $map = new google.maps.Map($mapDom, $opcoes);

			// Adicionamos o "marker" aquele ponto vermelho
			var $mark = new google.maps.Marker({
				position: $coords,
				map: $map
			});
		}
	});

} 

function GetMapa(mapa, endereco){
getLatLong({
	endereco: endereco,
	zoom: 15,
	dom: mapa
});

console.log('endereco ' +endereco);	

//console.log('chamei o mapa');	
}
/**-- assistência técnica --**/






/*FALE CONOSCO*/

function isEmail(v) {
	var objRE = /^[\w-\.\']{1,}\@([\da-zA-Z-]{1,}\.){1,}[\da-zA-Z-]{2,}$/;
	return (v != '' && objRE.test(v));
}

function validaForm(form){
	
	var nome = $('#nome').val();
	if(nome == ''){
		alert('Informe seu nome.');
		return false;
	}
	
	
	var telefone = $('#telefone').val();
	if(telefone == ''){
		alert('Informe seu telefone.');
		return false;
	}
			
	var email = $('#email').val();
	if(email == ''){
		alert('Informe seu e-mail.');
		return false;
	}
	
	if(isEmail(email) == false){
		alert('O e-mail informado não é válido.');
		return false;
	}
		
	var cidade = $('#cidade').val();
	if(cidade == ''){
		alert('Informe sua cidade');
		return false;
	}
				
	/*
	var assunto = document.getElementById('assunto').value;
	if(assunto == ''){
		alert('Informe um assunto');
		return false;
	}*/

	var mensagem = $('#mensagem').val();
	if(mensagem == ''){
		alert('Digite sua mensagem.');
		return false;
	}
	
	
	return true;
}





