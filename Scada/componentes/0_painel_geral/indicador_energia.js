/* @license MIT */

var true_format = {
    color: "#00ff08" // verde claro energizado
};

var false_format = {
    color: "#013D04" // verde escuro não energizado
};

//
// DON'T CHANGE THE CODE BELOW
//

// Verifica se é binário
if (getDataPointType(point.id) != "BINARY")
    return "The selected data point is not binary. Please select a binary data point.";

// Define a cor com base no valor
var color = value ? true_format.color : false_format.color;

// CSS para animação de piscar
var animationStyle = value ? "animation: blink 1s infinite;" : "";

// Retorno do HTML com CSS inline e animação
var s = "";

s += "<style>";
s += "@keyframes blink {";
s += "  0% {opacity: 1;}";
s += "  50% {opacity: 0;}";
s += "  100% {opacity: 1;}";
s += "}";
s += "</style>";

s += "<div style='";
s += "width: 30px;";
s += "height: 40px;";
s += "display: flex;";
s += "justify-content: center;";
s += "align-items: center;";
s += animationStyle;
s += "'>";

s += "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='" + color + "' width='28px' height='28px'>";
s += "<path d='M13 2L3 14h7v8l10-12h-7z'/>";
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
