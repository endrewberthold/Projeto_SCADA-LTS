/* @license MIT  */

// Label describing data point
var point_label = "";

var estados = [" ", "Equipe ciente da ocorrência",
    "Executando reparo não programado", "Reparo preventivo"];

var font_size = 14;

var border_color = "#88888800";
var background_color = "#FFFFFF00";
var label_color = "#FFFFFF00";
var values_color = "#000000";

var min_width = 200;
var min_height = 8;

var single_line_mode = true;


//
// DON'T CHANGE THE CODE BELOW
//

var texto = estados[value] !== undefined ? estados[value] : "Valor inválido";
var display_value = texto;
var flex_direction = single_line_mode ? "row" : "column";
var font_weight = "bold";
var div_id = "data-point" + pointComponent.id;

var s = "";

s += "<div id='" + div_id + "'>";
s += 	"<span style='color: " + label_color + "'>" + point_label + "</span>";
s += 	"<span style='color: " + values_color + "'>" + display_value + "</span>";
s += "</div>";

s += "<style>";
s += 	"#" + div_id + " {";
s += 		"min-height: " + min_height + "px;";
s +=	 	"min-width: " + min_width + "px;";
s += 		"background: " + background_color + ";";
s += 		"border: 1px solid " + border_color + ";";
s += 		"font-family: Arial, Helvetica, sans-serif;";
s += 		"font-weight: " + font_weight + ";";
s += 		"font-size: " + font_size + "px;";
s += 		"display: flex;";
s += 		"flex-direction: " +  flex_direction + ";";
s += 		"justify-content: left;";
s += 		"align-items: left;";
s += 		"padding: 5px;";
s += 	"}";
s += 	"#" + div_id + " span {";
s += 		"margin: 0px 2px;";
s += 	"}";
s += "</style>";

return s;
