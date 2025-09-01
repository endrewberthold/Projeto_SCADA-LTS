/* @license MIT */

// ID único para o componente
var div_id = "data-point" + pointComponent.id;

// Retorno HTML (invisível)
var s = "";

// Div invisível
s += "<div id='" + div_id + "' style='display:none;'></div>";

// Se o valor do ponto for 8, injeta um script que exibe alerta
if (value == 8) {
    s += "<script>alert('ERRO: Motor ligado sem estado OK ou ATENÇÃO selecionado');</script>";
}

return s;
