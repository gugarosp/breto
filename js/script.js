// Menu Mobile
$(document).ready(function() {
    $("#menu-mobile span").click(function(){
		$("header nav").slideToggle("slow");
	});
});



// Função para enviar Mensagem
function enviaMensagem() {

	// Pega valor dos campos do formulário
	var pegaNome = document.getElementById("form-nome").value;
	var pegaEmail = document.getElementById("form-email").value;
	var pegaTelefone = document.getElementById("form-telefone").value;
	var pegaDepartamento = document.getElementById("form-departamento").value;
	var pegaMensagem = document.getElementById("form-mensagem").value;

	// Função para verificar se os campos dos formulários estão vazios
	function validaCampos(campoVariavel, idTag, valorCampo) {
		if (campoVariavel == valorCampo) {
			$("#" + idTag + "").next().children().show();
			$("#" + idTag + "").addClass("form-campo-alerta");
			$("#" + idTag + "").next().children().addClass("form-alerta-ativo-texto");
		} else {
			$("#" + idTag + "").next().children().hide();
			$("#" + idTag + "").removeClass("form-campo-alerta");
			$("#" + idTag + "").next().children().removeClass("form-alerta-ativo-texto");
		}
	}

	// Verifica se os campos do formulário estão vazios
	validaCampos(pegaNome, "form-nome", "");
	validaCampos(pegaEmail, "form-email", "");
	validaCampos(pegaTelefone, "form-telefone", "");
	validaCampos(pegaDepartamento, "form-departamento", "Departamento");
	validaCampos(pegaMensagem, "form-mensagem", "");

	// Verifica se o telefone tem o formato aceitável
	validaTelefone = Number.isInteger(parseInt(pegaTelefone));
	if (validaTelefone == true) {
		$("#form-telefone").next().children().hide();
		$("#form-telefone").removeClass("form-campo-alerta");
		$("#form-telefone").next().children().removeClass("form-alerta-ativo-texto");
	} else {
		$("#form-telefone").next().children().show();
		$("#form-telefone").addClass("form-campo-alerta");
		$("#form-telefone").next().children().addClass("form-alerta-ativo-texto");
	}

	// Verifica se o email está no formato correto
	if ((pegaEmail.indexOf('@') > -1) && (pegaEmail.indexOf('.') > -1) && (pegaEmail != "@.")) {
		$("#form-email").next().children().hide();
		$("#form-email").removeClass("form-campo-alerta");
		$("#form-email").next().children().removeClass("form-alerta-ativo-texto");
		validaEmail = true;
	} else {
		$("#form-email").next().children().show();
		$("#form-email").addClass("form-campo-alerta");
		$("#form-email").next().children().addClass("form-alerta-ativo-texto");
		validaEmail = false;
	}

	// Acessa o JSON se todas as condições forem aceitas
	if (pegaNome !== "" && pegaEmail !== "" && pegaDepartamento !== "Departamento" && pegaMensagem !== "" && pegaMensagem !== "" && validaTelefone !== false && validaEmail !== false) {
		$("#fale-conosco .form-resultado span").show();
		$("#fale-conosco .form-resultado span").html("Enviando...");
		$("#fale-conosco #form-enviar").prop('disabled', true);

		fetch("https://clients.up.rocks/desafio/formContact")
		.then(function(response) {
			return response.json();
		}).then(function(data) {
			$("#fale-conosco .form-resultado span").html(data.message);
			$("#fale-conosco #form-enviar").prop('disabled', false);
		})
	}
	
	// Previne a ação padrão do formulário ao ser submetido
	event.preventDefault();

}

// função para enviar Newsletter
function enviaNewsletter() {
	// Pega valor dos campos do formulário newsletter
	var pegaNewsletter = document.getElementById("form-newsletter").value;

	if (pegaNewsletter == "") {
		$("#footer-newsletter .form-alerta span").show();
		$("#footer-newsletter .form-alerta span").addClass("form-alerta-ativo-texto");
	} else {
		// Verifica se o email está no formato correto
		if ((pegaNewsletter.indexOf('@') > -1) && (pegaNewsletter.indexOf('.') > -1) && (pegaNewsletter != "@.")) {
			$("#footer-newsletter .form-alerta span").hide();
			$("#footer-newsletter .form-alerta span").removeClass("form-alerta-ativo-texto");
		} else {
			$("#footer-newsletter .form-alerta span").show();
			$("#footer-newsletter .form-alerta span").addClass("form-alerta-ativo-texto");
		}

	}

	// Previne a ação padrão do formulário ao ser submetido
	event.preventDefault();
}