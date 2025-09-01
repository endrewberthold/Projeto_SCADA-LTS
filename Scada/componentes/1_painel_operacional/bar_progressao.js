/* @license MIT */

// ===============================
// CONFIGURAÇÕES =================
// ===============================

// ID do datapoint
var quantidade_point = "DP_421892";

// ID do datapoint atual
var atual_point = point.id;

// Aparência da barra
var bar_height = 200;
var bar_width = 50;

var background_color = "#FFFFFF00";
var foreground_color = "#12CE00";
var excesso_color = "#ffcc00";
var border_color = "#555555";

var border_radius = 8;

// ===============================
// FUNÇÕES DE BUSCA DE VALORES ====
// ===============================

// Buscar valor atual do datapoint
function getCurrentValue(identifier) {
    var dpDAO = new org.scada_lts.mango.service.DataPointService();
    var dp = dpDAO.getDataPoint(identifier);
    var pvDAO = new com.serotonin.mango.db.dao.PointValueDao();
    var pv = pvDAO.getLatestPointValue(dp.getId());
    return pv == null ? 0 : pv.value;
}

// ===============================
// OBTENDO OS VALORES ============
// ===============================

var quantidade = getCurrentValue(quantidade_point);
var atual = getCurrentValue(atual_point);

// Proteção contra divisão por zero
if (quantidade <= 0) {
    quantidade = 1;
}

// ===============================
// LÓGICA DE PORCENTAGEM ==========
// ===============================

// Se 100% é a metade da barra, o cálculo fica:
var percentual = (atual / quantidade) * 100;

if(percentual < 50){
    foreground_color = "#ff0000";
} else if(percentual < 70) {
    foreground_color = "#ff4c00";
} else if(percentual < 100) {
    foreground_color = "#ffcc00";
} else {
    foreground_color = "#12ce00";
}

// Limita a 200% (barra cheia com excesso)
if (percentual > 200) {
    percentual = 200;
}

var preenchimento_base = percentual <= 100 ? percentual : 100;
var excesso = percentual > 100 ? percentual - 100 : 0;

var base_height = (preenchimento_base / 100) * (bar_height / 2); // Até metade
var excesso_height = (excesso / 100) * (bar_height / 2);         // Acima da metade

// ===============================
// CONSTRUÇÃO DA BARRA ============
// ===============================

var s = "";

s += "<div style='";
s += 	"border: 1px solid " + border_color + "; ";
s += 	"position: relative; ";
s += 	"background-color: " + background_color + "; ";
s +=	"width: " + bar_width + "px; ";
s +=	"height: " + bar_height + "px; ";
s +=   "border-radius: " + border_radius + "px; ";
s +=   "overflow: hidden; ";
s += "' >";

// Parte base (até 100%)
s += 	"<div style='";
s +=		"background-color: " + foreground_color + "; ";
s +=		"width: 100%; ";
s +=		"height: " + base_height + "px; ";
s +=		"position: absolute; bottom: 0px; left: 0px; ";
s +=	"' ></div>";

// Parte do excesso (acima de 100%)
if (excesso > 0) {
    s += "<div style='";
    s +=     "background-color: " + excesso_color + "; ";
    s +=     "width: 100%; ";
    s +=     "height: " + excesso_height + "px; ";
    s +=     "position: absolute; ";
    s +=     "bottom: " + (bar_height/2) + "px; "; // Começa da metade pra cima
    s +=     "left: 0px; ";
    s += "' ></div>";
}

s += "</div>";

return s;
