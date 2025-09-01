/* @license MIT  */

// Array de rótulos para os valores do point
var estados = ["DESLIGADO", "PRODUÇÃO",
    "EM SETUP", "PAUSA",
    "RETRABALHO"];

// Data point text format
var font_size = 12;

// Data point style
var background_color = "#FFFFFF00";
var values_color = "#000000";

// Minimum size of data point
var min_width = 70;
var min_height = 8;

//
// DON'T CHANGE THE CODE BELOW
//

// Validação para evitar erro se o índice não existir
var texto = estados[value] !== undefined ? estados[value] : "Valor inválido";
var display_value = texto;
var font_weight = "bold";
var div_id = "data-point" + pointComponent.id;

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
s += 		"font-family: Arial, Helvetica, sans-serif;";
s += 		"font-weight: " + font_weight + ";";
s += 		"font-size: " + font_size + "px;";
s += 		"display: flex;";
s += 		"padding: 5px;";
s += 	"}";
s += 	"#" + div_id + " span {";
s += 		"margin: 0px 2px;";
s += 	"}";
s += "</style>";

return s;