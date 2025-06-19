/* @license MIT */
//alterar label
var label = "OK";
var height = 40;
var width = 90;
var value_on_click = false;
var enable_confirm_prompt = false;
var confirm_message = "Change value?";

if (getDataPointType(point.id) != "BINARY")
    return "The selected data point is not binary. Please select a binary data point."

var confirm = "if (window.confirm(&quot;" + confirm_message + "&quot;)) ";
var pc_id = pointComponent.id;
var command = "";

command += "var setPoint = ViewDwr.setViewPoint;";
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

var s = "";
//alterar classe .flatBtn para os demais buttons
s += "<style>";
s += ".flatBtn {";
s += "  background-color: rgba(0, 0, 0, 0.4);";
s += "  color: black;";
s += "  border: none;";
s += "  transition: background-color 0.3s ease;";
s += "  font-weight: bold;";
s += "  border-radius: 4px;";
s += "  cursor: pointer;";
s += "}";
s += ".flatBtn:hover {";
s += "  background-color: green;";
s += "  color: white;";
s += "}";
s += "</style>";
//alterar classe .flatBtn para os demais buttons
s += "<input type='button' ";
s +=     "onclick='" + command + "' ";
s +=     "class='flatBtn' ";
s +=     "style='height:" + height + "px; width:" + width + "px;' ";
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
