/* @license MIT  */

var true_format = {
    color: "#00ff08" // verde
};

var false_format = {
    color: "#013D04FF" // verde escuro
};


//
// DON'T CHANGE THE CODE BELOW
//

// Verifica se é binário
if (getDataPointType(point.id) != "BINARY")
    return "The selected data point is not binary. Please select a binary data point.";

// Estilo do círculo
var color = value ? true_format.color : false_format.color;
var s = "";

s += "<div style='";
s += "width: 28px;";
s += "height: 28px;";
s += "border-radius: 50%;";
s += "background-color: " + color + ";";
s += "display: inline-block;";
s += "border: 2px solid #444444;";
s += "'></div>";

return s;

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
