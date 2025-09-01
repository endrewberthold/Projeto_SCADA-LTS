/* @license MIT  */

// Array de rótulos para os valores do point
var estados = ["Máquina desligada", "Máquina ligada",
    "Em espera", "Produzindo",
    "Produzindo em Atenção", "Máquina Parada", "Emergência", "Manutenção",
    "ERRO: Estado não implementado", "Parar produção", "Aguardando contagem",
    "Produzindo sem estado ativo", "Retrabalho", "Em setup", "Retrabalho em Atenção"];

// Data point text format
var font_size = 16;

// Data point style
var border_color = "#88888800";
var background_color = "#FFFFFF00";
var label_color = "#FFFFFF00";
var values_color = "#000000";

// Minimum size of data point
var min_width = 70;
var min_height = 8;

// Show label and value in a single line
var single_line_mode = false;


//
// DON'T CHANGE THE CODE BELOW
//

// Validação para evitar erro se o índice não existir
var texto = estados[value] !== undefined ? estados[value] : "Estado não implementado";
var display_value = texto;
var flex_direction = single_line_mode ? "row" : "column";
var font_weight = "bold";
var div_id = "data-point" + pointComponent.id;

if(estados[value] == 'Produzindo em Atenção') {
    border_color = "#ffffff00";
    background_color = "#ffd500";
    values_color = "#000000";
} else if(estados[value] == 'Máquina Parada') {
    border_color = "#ffffff00";
    background_color = "#ffd500";
    values_color = "#000000";
} else if (estados[value] == 'Emergência' || estados[value] == 'Parar produção') {
    border_color = "#ffffff00";
    background_color = "#FF0000";
    values_color = "#FFFFFF";
} else {
    border_color = "#88888800";
    background_color = "#FFFFFF00";
    label_color = "#FFFFFF00";
    values_color = "#000000";
}

// Return variable
var s = "";

// Create HTML
s += "<div id='" + div_id + "'>";
s += 	"<span style='color: " + values_color + "'>" + display_value + "</span>";
s += "</div>";

// Create CSS style
s += "<style>";
s += 	"#" + div_id + " {";
s += 		"min-height: " + min_height + "px;";
s +=	 	"min-width: " + min_width + "px;";
s += 		"background: " + background_color + ";";
s += 		"border: 1px solid " + border_color + ";";
s += 		"border-radius: 8px;";
s += 		"font-family: Arial, Helvetica, sans-serif;";
s += 		"font-weight: " + font_weight + ";";
s += 		"font-size: " + font_size + "px;";
s += 		"display: flex;";
s += 		"flex-direction: " +  flex_direction + ";";
s += 		"justify-content: center;";
s += 		"align-items: center;";
s += 		"padding: 5px;";
s += 	"}";
s += 	"#" + div_id + " span {";
s += 		"margin: 0px 2px;";
s += 	"}";
s += "</style>";

return s;