$(document).ready(function(){		
	$(".frm_ordem").uniform();
	if ( !($.browser.msie && $.browser.version == 7.0) ){
		$("select").uniform();
	}
});