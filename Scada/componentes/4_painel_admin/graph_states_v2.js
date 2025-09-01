/* @license MIT */

// Estilo
var line_color = "#cf0000";
var background_color = "transparent";

// Time unit: 0=seg,1=min,2=horas
var time_unit = 2;
var time_value = 24;

// Get datapoints identifiers (ID/XID)
function getDataPointIds(identifier) {
    var dpDAO = new org.scada_lts.mango.service.DataPointService();
    var dp = dpDAO.getDataPoint(identifier);
    return { id: dp.getId(), xid: String(dp.getXid()) };
}

function readPoints(id) {
    var unit_values = [1000, 60000, 3600000]; // ms
    var index = (time_unit > 2) ? 0 : time_unit;
    var since = new Date().getTime() - (time_value * unit_values[index]);
    var val = new com.serotonin.mango.db.dao.PointValueDao();
    return val.getPointValues(id, since);
}

// Pega histórico real
var dp_id = getDataPointIds(point.id).id;
var point_values = readPoints(dp_id);

// Constrói arrays
var values = [];
var labels = [];
var seen = {}; // evita duplicados

for (var i = 0; i < point_values.size(); i++) {
    var ts = point_values.get(i).time;
    var v = parseInt(point_values.get(i).value);

    // Corrige UTC → local (-3h Brasil)
    var d = new Date(ts - (3 * 60 * 60 * 1000));
    var hh = String(d.getHours()).padStart(2,"0");
    var mm = String(d.getMinutes()).padStart(2,"0");
    var label = hh + ":" + mm;

    if (!seen[label]) {
        labels.push(label);
        values.push(v === 4 ? 4 : 0);
        seen[label] = true;
    }
}

labels.reverse();
values.reverse();

var div_id = "spark" + pointComponent.id;
var s = "";

// Injeta Chart.js se não estiver carregado
s += "<script>";
s += "if (typeof Chart === 'undefined') {";
s += "  var script = document.createElement('script');";
s += "  script.src = 'https://cdn.jsdelivr.net/npm/chart.js';";
s += "  document.head.appendChild(script);";
s += "}";
s += "</script>";

// Container do gráfico
s += "<div style='width:500px; height:160px; background:"+background_color+"'><canvas id='" + div_id + "' style='width:100%; height:100%'></canvas></div>";

// Criação do gráfico
s += "<script>";
s += "function initSpark(){";
s += " if (typeof Chart==='undefined') { setTimeout(initSpark,200); return; }";
s += " new Chart(document.getElementById('" + div_id + "'), {";
s += "   type: 'line',";
s += "   data: { labels:" + JSON.stringify(labels) + ", datasets: [{";
s += "     data:" + JSON.stringify(values) + ",";
s += "     borderColor:'" + line_color + "', stepped:true, fill:false, borderWidth:3, pointRadius:1";
s += "   }]},";

// Opções
s += "   options:{";
s += "     responsive:true,";
s += "     maintainAspectRatio:false,";
s += "     plugins:{legend:{display:false}},";

// Escalas fixas
s += "     scales:{";
s += "       x:{ type:'category', ticks:{ autoSkip:true, maxTicksLimit:12 } },";
s += "       y:{ beginAtZero:true, ticks:{ stepSize:1 }, min:0, max:4 }";
s += "     }";
s += "   }";
s += " });";
s += "}";
s += "initSpark();";
s += "</script>";

return s;
