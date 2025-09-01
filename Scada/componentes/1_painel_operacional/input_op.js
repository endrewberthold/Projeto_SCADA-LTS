/* @license MIT  */

// Appearance settings
var height = 47;
var width = 143;

var background_color = "#f2f2f2ff";
var text_color = "#000000";

// Restrict insertion of values
var restrict_values = false;
var step = 1;
var minimum = 0;
var maximum = 100;
var font = 18;

//
// DON'T CHANGE THE CODE BELOW
//

// Check if data point type is compatible
if (getDataPointType(point.id) != "MULTISTATE" && getDataPointType(point.id) != "NUMERIC")
    return "Invalid data point type. Please select a numeric or multistate data point."

var padding = 2;
var border = 1;
height = height - 2 * (border + padding);
width = width - 2 * (border + padding);

// Função de validação em string concatenada
var command = ""
    + "var val = this.value;"
    + "if(val.length !== 6){"
    + "  if(!window.confirm('O número da requisição precisa conter 6 dígitos.')){"
    + "    this.focus();"
    + "    return;"
    + "  }"
    + "}"
    + "mango.view.setPoint(" + point.id + ", " + pointComponent.id + ", val);";


// Return variable
var s = "";

s += "<input type='number' value='" + value + "' ";

s += "style='";
s +=     "height:" + height + "px; ";
s +=     "width:" + width + "px; ";
s +=     "background-color:" + background_color + "; ";
s +=     "color:" + text_color + "; ";
s +=     "border-radius: 8px; ";
s +=     "font-size:" + font + "px; ";
s +=     "padding:" + padding + "px; ";
s +=     "border:" + border + "px solid;'";

// sempre valida antes de enviar
s += " onchange=\"" + command + "\" ";

s += ">";

// Disable unwanted validations in View Edit page
s += "<script>try {document.getElementsByName('view')[0].noValidate = true;} catch(e) {};</script>"

return s;

function getDataPointType(identifier) {
    var types = {
        0: "UNKNOWN",
        1: "BINARY",
        2: "MULTISTATE",
        3: "NUMERIC",
        4: "ALPHANUMERIC",
        5: "IMAGE"
    }

    var dpDAO = new org.scada_lts.mango.service.DataPointService();
    var dp = dpDAO.getDataPoint(identifier);
    var locator = dp.getPointLocator();
    return types[locator.getDataTypeId()];
}
