/* @license MIT */

var true_format = {
    color: "#FF0000" // vermelho com contorno branco
};

//
// DON'T CHANGE THE CODE BELOW
//

// Verifica se é binário
if (getDataPointType(point.id) != "BINARY")
    return "The selected data point is not binary. Please select a binary data point.";

// Se for falso, não exibe nada
if (!value) return "";

// CSS para animação de piscar
var animationStyle = "animation: blink 1s infinite;";

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
s += "width: 50px;";
s += "height: 60px;";
s += "display: flex;";
s += "justify-content: center;";
s += "align-items: center;";
s += animationStyle;
s += "'>";

s += "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='44px' height='44px'>";
s += "<path d='M1 21h22L12 2 1 21z' fill='" + true_format.color + "' stroke='white' stroke-width='1'/>";
s += "<path d='M13 16h-2v2h2v-2zm0-8h-2v6h2V8z' fill='white'/>";
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
