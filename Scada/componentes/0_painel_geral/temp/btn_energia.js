/* @license MIT */

// The button label
var label = "Energia";

// Appearance settings
var height = 20;
var width = 80;

// The pulse value on click (binary)
var value_on_click = true;

// Display a confirmation prompt before change value
var enable_confirm_prompt = false;
var confirm_message = "Change value?";




//
// DON'T CHANGE THE CODE BELOW
//




// Check if data point type is compatible
if (getDataPointType(point.id) != "BINARY")
    return "The selected data point is not binary. Please select a binary data point."

var confirm = "if (window.confirm(&quot;" + confirm_message + "&quot;)) ";
var pc_id = pointComponent.id;
var command = "";

// This command sets the point to the "value on click" and after re-sets
// to the "value on click" logically inverted
command += "var setPoint = ViewDwr.setViewPoint;"
command += "if (window.location.pathname.includes(&quot;views.shtm&quot;)) {";
command +=      "show(c" + pc_id + "Changing);";
command +=      "setPoint(" + pc_id + ", " + value_on_click + ", mango.longPoll.pollRequest.viewId, function() {";
command +=          "setPoint(" + pc_id + ", " + !value_on_click + ", mango.longPoll.pollRequest.viewId, function() {";
command +=              "hide(c" + pc_id + "Changing);";
command +=          "});";
command +=      "});";
command += "}";
command += "else if (window.location.pathname.includes(&quot;public_view.htm&quot;)) {";
command +=      "setPoint = ViewDwr.setViewPointAnon;";
command +=      "show(c" + pc_id + "Changing);";
command +=      "setPoint(mango.view.anon.viewId, " + pc_id + ", " + value_on_click + ", function() {";
command +=          "setPoint(mango.view.anon.viewId, " + pc_id + ", " + !value_on_click + ", function() {";
command +=              "hide(c" + pc_id + "Changing);";
command +=          "});";
command +=      "});";
command += "}";


if (enable_confirm_prompt)
    command = confirm + "{" + command + "}";

// Return variable
var s = "";

s += "<style>";
s += ".flatBtnEnerg {";
s += "  background-color: #fff;";
s += "  color: black;";
s += "  border: 1px solid black;";
s += "  transition: background-color 0.3s ease;";
s += "  font-weight: bold;";
s += "  border-radius: 4px;";
s += "  cursor: pointer;";
s += "</style>";
s += "<input type='button' ";
s +=     "onclick='" + command + "' ";
s +=     "class='flatBtnEnerg'";
s +=     "style='height:" + height + "px; width:"+ width + "px;' ";
s +=     "value='" + label + "' ";
s += ">";

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
