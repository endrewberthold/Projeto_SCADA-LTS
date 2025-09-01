/* @license MIT */

var true_format = {
    color: "#00ff08" // verde claro energizado
};

var false_format = {
    color: "#797979" // cinza não energizado
};

//
// DON'T CHANGE THE CODE BELOW
//

if (getDataPointType(point.id) != "BINARY")
    return "The selected data point is not binary. Please select a binary data point.";

var color = value ? true_format.color : false_format.color;

var s = "";

s += "<div style='";
s += "width: 40px;";
s += "height: 40px;";
s += "display: flex;";
s += "justify-content: center;";
s += "align-items: center;";
s += "'>";

s += "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 80' width='48px' height='48px'>";

// Corpo principal arredondado
s += "<rect x='10' y='20' width='60' height='40' rx='10' ry='10' fill='" + color + "' stroke='" + color + "' stroke-width='3'/>";

// Tampa frontal
s += "<polygon points='70,20 90,30 90,50 70,60' fill='" + color + "' stroke='" + color + "' stroke-width='3'/>";

// Linhas de ventilação
s += "<line x1='15' y1='28' x2='65' y2='28' stroke='black' stroke-width='2'/>";
s += "<line x1='15' y1='35' x2='65' y2='35' stroke='black' stroke-width='2'/>";
s += "<line x1='15' y1='42' x2='65' y2='42' stroke='black' stroke-width='2'/>";
s += "<line x1='15' y1='49' x2='65' y2='49' stroke='black' stroke-width='2'/>";

// Base inferior
s += "<rect x='25' y='60' width='40' height='8' fill='black'/>";

// Pés da base
s += "<rect x='20' y='68' width='10' height='5' fill='black'/>";
s += "<rect x='60' y='68' width='10' height='5' fill='black'/>";

// Eixo do motor (lado direito)
s += "<rect x='90' y='35' width='10' height='10' fill='black'/>";

s += "</svg>";

s += "</div>";

return s;


// Função para checar tipo do datapoint
function getDataPointType(identifier) {
    var types = {
        0: "UNKNOWN",
        1: "BINARY",
        2: "MULTISTATE",
        3: "NUMERIC",
        4: "ALPHANUMERIC",
        5: "IMAGE"
    };

    var dpDAO = new org.scada_lts.mango.service.DataPointService();
    var dp = dpDAO.getDataPoint(identifier);
    var locator = dp.getPointLocator();
    return types[locator.getDataTypeId()];
}

//
// /* Display redondo  */
//
// var true_format = {
//     color: "#00ff08" // verde
// };
//
// var false_format = {
//     color: "#013D04FF" // verde escuro
// };
//
//
// //
// // DON'T CHANGE THE CODE BELOW
// //
//
// // Verifica se é binário
// if (getDataPointType(point.id) != "BINARY")
//     return "The selected data point is not binary. Please select a binary data point.";
//
// // Estilo do círculo
// var color = value ? true_format.color : false_format.color;
// var s = "";
//
// s += "<div style='";
// s += "width: 28px;";
// s += "height: 28px;";
// s += "border-radius: 50%;";
// s += "background-color: " + color + ";";
// s += "display: inline-block;";
// s += "border: 2px solid #444444;";
// s += "'></div>";
//
// return s;
//
// function getDataPointType(identifier) {
//     var types = {
//         0: "UNKNOWN",
//         1: "BINARY",
//         2: "MULTISTATE",
//         3: "NUMERIC",
//         4: "ALPHANUMERIC",
//         5: "IMAGE"
//     };
//
//     var dpDAO = new org.scada_lts.mango.service.DataPointService();
//     var dp = dpDAO.getDataPoint(identifier);
//     var locator = dp.getPointLocator();
//     return types[locator.getDataTypeId()];
// }
