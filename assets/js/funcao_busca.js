function validaFormBusca(form){
    //$("#formulario_pesquisa").attr("action",  "?pesquisa=" + pesquisa);
    return true;
}



function trataTextoPesquisa(palavra) {
    var varString = palavra;
    var stringAcentos = new String("ñ /+Ññ_");
    var stringSemAcento = new String("n---Nn-");
    var cString = new String();
    var varRes = "";

    for (i = 0; i < varString.length; i++) {
        cString = varString.substring(i, i + 1);
        for (j = 0; j < stringAcentos.length; j++)
            if (stringAcentos.substring(j, j + 1) == cString)
                cString = stringSemAcento.substring(j, j + 1);
        varRes += cString;
    }

    var array = {	":":'', ".":'', "!":'', "?":'', "/":'', ";":'', "---":'-', "@": "",
        "!":'',"@":'',"#":'',"%":'',"¨":'',"&":'',"*":'',"(":'',")":'', "º":'', "ª":''};

    for (var val in array) {
        varRes = varRes.split(val).join(array[val]);
    }

    //return varRes.toLowerCase();
    return varRes;
}

function trataMensagensDeMinimo() {
    html_msg_erro = $("div.compare_relogios_bloco div.compare_relogios").html();
    $("div.compare_relogios").html( html_msg_erro );
    $("div.compare_relogios ul").fadeIn(1400);
}


$(document).ready(function(){
	
	$(".bus_filtro_funcionalidade li").click(function(){
		$(".bus_filtro_funcionalidade li").removeClass("bus_filtro_funcionalidade_ativo");
		
		valorTexto	= $(this).text();
		
		if(valorTexto != $("#material").val()){
			$("#material").val(valorTexto);
			$(this).parent().addClass("bus_filtro_funcionalidade_ativo");
		}else
			$("#material").val("");		
		
		submitFormBusca();
	});//bus_filtro_funcionalidade
	
	
	$(".bus_filtro_cores td dt").bind('click', function(e) {
		$(".bus_filtro_cores td").removeClass("icon_ativo");
		
		valorTexto	=  this.id.replace("icon_", "");
		if(valorTexto != $("#cores").val()){
			$("#cores").val(valorTexto);
			$(this).parent().addClass("icon_ativo");			
		}else
			$("#cores").val("");
			
		submitFormBusca();		
	});//bus_filtro_cores td dt
	
	
	
	//bus_filtro_func_adicional
	$(".bus_filtro_func_adicional li a").bind('click', function(e) {
		valorS 			= $(this).attr("id");
		func_adicional 	= $("#func_adicional").val();		
		
		$(".bus_filtro_func_adicional li").removeClass("bus_filtro_func_adicional_ativo");
			
		if( valorS != func_adicional){
			$(this).parent().addClass("bus_filtro_func_adicional_ativo");			
			$("#func_adicional").val( valorS );
		}else
			$("#func_adicional").val("");	
		
		submitFormBusca();		
	});//bus_filtro_func_adicional
	
	
	
	
	$(".busca_relogio_tamanho div").click(function(){
		//remove todas as classes ativa
		$(".busca_relogio_tamanho").removeClass("busca_rel_func_grande_ativo busca_rel_func_medio_ativo busca_rel_func_pequeno_ativo");


        if( this.id != $("#tamanho").val().toLowerCase()){
            if($(this).index() != "Grande" || $(this).index() != "Medio"  || $(this).index() != $("#tamanho").val("Pequeno")){

                $("#tamanho").val("");

                switch($(this).index())
                {
                    case 0:
                        $("#tamanho").val("Grande");
                        $(this).parent().addClass("busca_rel_func_grande_ativo");
                      break;
                    case 1:
                        $("#tamanho").val("Medio");
                        $(this).parent().addClass("busca_rel_func_medio_ativo");
                      break;
                    case 2:
                        $("#tamanho").val("Pequeno");
                        $(this).parent().addClass("busca_rel_func_pequeno_ativo");
                      break;
                }//switch
            }
        }else
            $("#tamanho").val("");

		submitFormBusca();					
	});//bus_filtro_funcionalidade
	
	
	
	$("#formulario_pesquisa").submit(function(){
		submitFormBusca();		
		return false;	
	});
	
	function submitFormBusca(){
		var pesquisa = $('#pesquisa').val();
		/*
		if(pesquisa == ''){
			alert('Informe sua pesquisa.');
			return false;
		}*/
		pesquisa = trataTextoPesquisa(pesquisa);
		
		buscaResultado(pesquisa);
	}
	
	
	
	function buscaResultado(pesquisa, resulta_pagina){
		
		posicionaPaginaBusca()
		
		busca		= "";
		tamanho 	= $("#tamanho").val();
		material 	= $("#material").val();
		func_adi	= $("#func_adicional").val();
		cores		= $("#cores").val();
		
		
		if( pesquisa != "")
			busca = 'pesquisa=' + pesquisa ;
		else if(  resulta_pagina != null )
				busca = resulta_pagina;
				
		if(tamanho 	!= ""){ busca += "&tamanho=" + tamanho;}
		if(material != ""){ busca += "&material=" + material;}
        if(func_adi != ""){ busca += "&func_adi=" + func_adi;}
        if(cores 	!= ""){ busca += "&cores=" + cores;}
		
		$(".box_busca_sombra").show();
		
		$.getJSON('busca_resultado.php?' + busca , function(data){
            $("ul#busca_compare_box_erro").fadeOut(800);

			this.qtd = data.produtos.length;
			if(this.qtd >= 1){
				
				html = ""
				for (i = 0; i < this.qtd; i++){
					html += "<div class='box_busca_categoria'>\n";
					html += "	<div class='prod_monitor'>\n";
					html += "		<a href='"+ data.produtos[i].id + "/" + data.produtos[i].url + ".html'><img src='" + data.produtos[i].foto_categoria + "' title='" + data.produtos[i].nome + "' /></a>\n";

					html += "	</div>\n";
					html += "	<div class='all_busca_prod'>\n";
					html += "		<p class='busca_prod_refer'>" + data.produtos[i].referencia + "</p>\n";
					html += "		<div class='prod_nome'>" + data.produtos[i].nome + "</div>\n";
					html += "       	<ul>\n";

					if( data.produtos[i].compare)
                    	html += "       	    <li class='btn_compare btn_compare_ativo' id='compare_" + data.produtos[i].id + "'></li>\n";
					else
						html += "       	    <li class='btn_compare' id='compare_" + data.produtos[i].id + "'></li>\n";
                    html += "       	    <li class='btn_detalhe'><a href='"+ data.produtos[i].id + "/" + data.produtos[i].url + ".html'><img src='img/busca_btn_detalhe.png'></a></li>";
                    html += "       	</ul>";
					html += "    </div>\n";
					html += "</div>\n";
				}
				
				$("#busca_resultado").html(html);				
			}
			
			if( data.exibicao[0].total_pagina > 0){

				this.num_pagina		= data.exibicao[0].num_pagina;
				this.num_linha		= data.exibicao[0].num_linha;
				this.total_pagina	= data.exibicao[0].total_pagina;
				this.compare_total	= data.exibicao[0].compare_total;
				
				this.total_res = ( 9 * this.num_pagina);
				
				if(this.total_pagina > this.total_res)
					$("#busca_total_resultado").html("Exibindo <span> " + ( this.total_res  - 8)  + " a " + ( this.total_res) + "</span> de <span>" + this.total_pagina + "</span> relógios");
				else
					$("#busca_total_resultado").html("Exibindo <span> " + ( this.total_res  - 8)  + " a " + ( this.total_res  - 9 + this.num_linha) + "</span> de <span>" + this.total_pagina + "</span> relógios");
				
				
				$("#busca_paginacao").html(data.paginacao[0].cod_pagina);
				
				$("#busca_paginacao a").click(function(){
					buscaResultado( "",  $(this).attr("href").substr(1));
				});
				
				
				if( this.compare_total < 4){
					limpaBotaoCompare();
				}else{
					marcaBotaoCompare();
				}
			}else{
				$("#busca_resultado, #busca_paginacao, #busca_total_resultado").html("");
                if( pesquisa == "")
				    $("#busca_resultado").html("<div class='busca_total_zero'>Não foram encontrados produtos com esta especificação.</div>");
                else
                    $("#busca_resultado").html("<div class='busca_total_zero'>Não foram encontrados produtos com esta palavra-chave.</div>");

			}
			
			$(".box_busca_sombra").width($("#box_busca_geral_sombra").width());
			$(".box_busca_sombra").height($("#box_busca_geral_sombra").height());
			$(".box_busca_sombra").show();
			
		}).always(function() {  $(".box_busca_sombra").fadeOut(); });	
	}
	
	function posicionaPaginaBusca(){	
		pos = $(".box_busca_func_filto").offset();
        $('html, body').animate({ scrollTop: pos.top }, 1500, 'easeOutCirc');
	}
	
	function posicionaPaginaBuscaCompare(){	
		pos = $(".busca_contador_compare").offset();
        $('html, body').animate({ scrollTop: pos.top }, 1500, 'easeOutCirc', function(){
			loadBoxCompare();
		});
	}
	
	// @TODO: limpa Botão Compare com a opacity
	function limpaBotaoCompare(){
		$("li.btn_compare").fadeTo(100, 1);
	}
	
	// @TODO: marca Botão Compare com a opacity
	function marcaBotaoCompare(){
		$("li.btn_compare").fadeTo(100, 0.6);
	}
	
	
	
	
	
	//loadBoxCompare();
	
	function loadBoxCompare(){
		$.getJSON('compare-ajax.php?acao=total' , function(data){
            html_minimo = "";
            html_minimo += "<ul id='busca_compare_lightbox'>\n";
            html_minimo += "    <li class='busca_compare_lightbox_topo'></li>\n";
            html_minimo += "    <li class='busca_compare_lightbox_meio'>\n";
            html_minimo += "        <div class='bcc_conteudo'>Você precisa marcar<br />pelo menos <strong>2 relógios</strong><br />para fazer a comparação.</div>\n";
            html_minimo += "    </li>\n";
            html_minimo += "    <li class='busca_compare_lightbox_fim'></li>\n";
            html_minimo += "</ul>\n";

            try{
                this.qtd = data.produtos.length;
            }catch(ex){
                this.qtd = 0;
            }


            if(this.qtd >= 1){

                html = ""
                for (i = 0; i < this.qtd; i++){
                    html += "<ul>\n";
                    html += "    <li><a href='"+ data.produtos[i].id + "/" + data.produtos[i].url + ".html'><img src='" + data.produtos[i].foto_categoria + "' title='" + data.produtos[i].nome + "' width='150' height='195' /></a></li>\n";
                    html += "    <li class='all_prod'>\n";
                    html += "        <p class='prod_refer'>" + data.produtos[i].referencia + "</p>\n";
                    html += "        <div class='prod_nome'>" + data.produtos[i].nome + "</div>\n";
                    html += "        <a href='#' id='compare_remove_" + ( i+1 ) + "' class='compare_remover' rel='compare_prod_" + data.produtos[i].id  + "'><img src='img/compare_remover.png'></a>\n";
                    html += "    </li>\n";
                    html += "</ul>\n";
                }

                $(".busca_contador_compare div").html(this.qtd);
                $(".b_compare_meio").html(html);


				if(this.qtd == 1 ){
					// $(".b_compare_meio").css({"width": 150 });
                    $(".b_compare_meio").css({"width": 341 });

                    $(".b_compare_meio").append(html_minimo).find("#busca_compare_lightbox").css("left","50%");
                    $(".b_compare_agora a img").fadeOut();
                }
				else {
					if( this.qtd < 4)
						limpaBotaoCompare();
					else
						marcaBotaoCompare();


					$(".b_compare_meio").css({"width": (this.qtd * 150 + (80 * (this.qtd-1)) / this.qtd )+1 });
					$(".b_compare_meio ul").not(":first-child").css({paddingLeft: 80 / this.qtd });
                    $(".b_compare_agora a img").fadeIn();
				}
            }else{
                $(".b_compare_meio").html(html_minimo).find("#busca_compare_lightbox").css("left",255);
                $(".b_compare_agora a img").fadeOut();
            }
		});
	}
	
	$('li.btn_compare').live('click', function() {
		
		cont = $(".busca_contador_compare div").html();
		
		if(cont <= 3){
			geraEventoBotaoCompare( $(this) );
		}else{
			$(".btn_compare").fadeTo(10, 0.6);
			
			//se for um relógio selecionado no compare
			if( ! $(this).hasClass("btn_compare_ativo")){
				pos = $(this).offset();
				posm = $(".busca_meio").offset();
				
				$("ul#busca_compare_box_erro").animate({"top":( pos.top - posm.top), "left": ( pos.left - posm.left +235)}).fadeIn();
			}
		}
	});//li.btn_compare
	
	function geraEventoBotaoCompare( obj ){
		//$( obj ).addClass("btn_compare_ativo");
		id = $( obj ).attr("id").replace("compare_", "");
		
		$.get('compare-ajax.php?acao=add&id=' + id, function(data) {
			if(data != "maximo"){
				$( obj ).addClass("btn_compare_ativo");
				
				$('.result').html(data);
				posicionaPaginaBuscaCompare();
			}
		});
	
	}
	
	
	$('.busca_contador_compare').live('click', function() {
		posicionaPaginaBuscaCompare();
		
		container_w = $('#container').width();
		container_h = $('#container').height();
		
		$('#box_compare_ligthbox').css({"width": container_w, "height": container_h});
		$('#box_compare_ligthbox').fadeTo(800, 0.6, function() {		
		
				pos = $(".busca_contador_compare").offset();
				$('#box_compare_ligthbox_relogios').css({"top":17});
				
				$('#box_compare_ligthbox_relogios').fadeTo(500, 1);
		});
	});//busca_contador_compare

    // @TODO: Fecha o box do compare
	$('.compare_fechar').live('click', function() {
		$('#box_compare_ligthbox_relogios').fadeOut();
		$('#box_compare_ligthbox').fadeOut();
	});

    // @TODO: Remove todos os produtos do compare
    $('li.b_compare_remove').live('click', function() {
        $.get('compare-ajax.php?acao=remover_todos', function(data) {
            $("div.b_compare_meio ul").fadeOut();
            $(".busca_contador_compare div").html("0");
            $("li.btn_compare").removeClass("btn_compare_ativo");

            loadBoxCompare();
			limpaBotaoCompare();
        });
    });//btn b_compare_remove


    // @TODO: Remove o produtos Selecionado do compare
	// CODIGO comum para pagina de busca e compare
    $('a.compare_remover').live('click', function() {

		var obj = $(this);
		
        $.get('compare-ajax.php?acao=remover_produto&posicao=' + ( this.id ) , function(data) {
			nome_pagina = window.location.toString().split("/");
			total_page  = nome_pagina.length;
		
			if(nome_pagina[total_page-1] == "compare.html"){
				table_posicao = obj.attr("id").replace("compare_remove_", "");
				$(".compare_box table tr").each(function(index, element) {
					$(this).find("td").eq( table_posicao ).remove();
				});
				
				$(".compare_lista td").removeClass("compare_busca_odd");
				$("tr.compare_lista_relogio ul.compare_relogios a.compare_remover").each(function(index, element) {
					$(this).attr("id",  "compare_remove_" + (index+1) );
					$(this).attr("rel", "compare_prod_" + (index+1) );
				});
								
				$(".compare_lista").each(function(index, element) {
					$(this).find("td:odd").addClass("compare_busca_odd");
				});


                switch( $("ul.compare_relogios").size())
                {
                    case 0:
                        $(".compare_box").hide();
                        $(".compare_relogios_bloco").show();
                        break;
                    case 1:
                        $(".compare_box").show();
                        $(".compare_minimo").show();
                        trataMensagensDeMinimo()
                        break;
                }//switch

			}else{
				$("#compare_" + obj.attr('rel').replace("compare_prod_" , "")).removeClass("btn_compare_ativo");
				
				$("div.b_compare_meio ul").fadeOut();
				$(".busca_contador_compare div").html("0");
				
				$("ul#busca_compare_box_erro").fadeOut(800);
				loadBoxCompare();
			}
        });
    });//btn b_compare_remove


	$(".compare_lista").each(function(index, element) {
		$(this).find("td:odd").addClass("compare_busca_odd");
	});
	
	$("ul#busca_compare_box_erro div.bcc_fechar").live('click', function() {
		$("ul#busca_compare_box_erro").fadeOut(800);
	});
	
});
	