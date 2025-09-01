/* @license MIT */
//alterar label
var label = "ENCERRAR OP";
var height = 50;
var width = 130;
var value_on_click = false;

// força a confirmação
var confirm_message = "ENCERRAR Ordem de Produção, confirmar operação?";

if (getDataPointType(point.id) != "BINARY")
    return "The selected data point is not binary. Please select a binary data point."

var pc_id = pointComponent.id;
var command = "";

// primeiro verifica confirmação
command += "if(window.confirm('" + confirm_message + "')){";

command += "var setPoint = ViewDwr.setViewPoint;";
command += "if (window.location.pathname.includes('views.shtm')) {";
command +=      "show(c" + pc_id + "Changing);";
command +=      "setPoint(" + pc_id + ", " + value_on_click + ", mango.longPoll.pollRequest.viewId, function() {";
command +=          "setPoint(" + pc_id + ", " + !value_on_click + ", mango.longPoll.pollRequest.viewId, function() {";
command +=              "hide(c" + pc_id + "Changing);";
command +=          "});";
command +=      "});";
command += "}";
command += "else if (window.location.pathname.includes('public_view.htm')) {";
command +=      "setPoint = ViewDwr.setViewPointAnon;";
command +=      "show(c" + pc_id + "Changing);";
command +=      "setPoint(mango.view.anon.viewId, " + pc_id + ", " + value_on_click + ", function() {";
command +=          "setPoint(mango.view.anon.viewId, " + pc_id + ", " + !value_on_click + ", function() {";
command +=              "hide(c" + pc_id + "Changing);";
command +=          "});";
command +=      "});";
command += "}";
command += "}"; // fecha o if confirm

var s = "";
//alterar classe .flatBtn para os demais buttons
s += "<style>";
s += ".flatBtnConc {";
s += "  background-color: rgb(50,50,50);";
s += "  color: white;";
s += "  border: none;";
s += "  box-shadow: 2px 2px 0 0;";
s += "  transition: background-color 0.3s ease;";
s += "  font-weight: bold;";
s += "  font-size: 14px;";
s += "  border-radius: 8px;";
s += "  cursor: pointer;";
s += "}";
s += ".flatBtnConc:hover {";
s += "  background-color: rgb(97,97,97);";
s += "  color: orange;";
s += "  box-shadow: 2px 2px 0 0;";
s += "}";
s += "</style>";
//alterar classe .flatBtn para os demais buttons
s += "<input type='button' ";
s +=     "onclick=\"" + command + "\" ";
s +=     "class='flatBtnConc' ";
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
