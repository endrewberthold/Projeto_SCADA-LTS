/* @license MIT */

// Configurações
var series_colors = ['#99999900','#12CE00','#FFD700','#FF0000','#0044FF'];
var background_color = "transparent";
var time_unit = 2; // horas
var time_value = 24;
var height = 200;
var width = 500;
var show_title = false;
var title = 'Estado da Máquina';

// Grupos de estados
var state_groups = [
    { states: [0], value: 1, label: "Desligado" },
    { states: [1,2,3,10], value: 2, label: "Produção" },
    { states: [4,5], value: 3, label: "Atenção" },
    { states: [6,9], value: 4, label: "Emergência" },
    { states: [7], value: 5, label: "Manutenção" }
];

// IDs do datapoint
function getDataPointIds(identifier) {
    var dpDAO = new org.scada_lts.mango.service.DataPointService();
    var dp = dpDAO.getDataPoint(identifier);
    return { id: dp.getId(), xid: String(dp.getXid()) };
}

// Ler histórico
function readPoints(id) {
    var unit_values = [1000, 60000, 3600000];
    var index = (time_unit>2)?0:time_unit;
    var since = new Date().getTime() - (time_value*unit_values[index]);
    var val = new com.serotonin.mango.db.dao.PointValueDao();
    return val.getPointValues(id, since);
}

// Pega histórico real
var dp_id = getDataPointIds(point.id).id;
var point_values = readPoints(dp_id);

// Inicializa arrays
var datasets = [];

// Inicializa datasets
for(var g=0; g<state_groups.length; g++){
    datasets.push({
        label: state_groups[g].label,
        data: [],
        borderColor: series_colors[g],
        backgroundColor: series_colors[g],
        stepped: 'after',
        fill: false,
        borderWidth: 4,
        borderRadius: 0,
        pointRadius: [],
        pointBackgroundColor: []
    });
}

// Preenche dados mantendo ordem cronológica
for(var i = point_values.size()-1; i >= 0; i--){
    var ts = point_values.get(i).time; // timestamp original
    var v = parseInt(point_values.get(i).value);

    for(var g=0; g<state_groups.length; g++){
        var y = state_groups[g].states.includes(v) ? state_groups[g].value : 0;
        datasets[g].data.unshift({ x: ts, y: y });
        datasets[g].pointRadius.unshift(1); // raio inicial
        datasets[g].pointBackgroundColor.unshift(series_colors[g]); // cor padrão
    }
}

// Container
var div_id = "chart"+pointComponent.id;

// Adiciona a linha de bolinhas coloridas acima do gráfico
var s = "<div style='width:"+width+"px; background:"+background_color+"; text-align:center; margin-bottom:4px;'>";
for(var g=0; g<series_colors.length; g++){
    s += "<span style='display:inline-block; width:14px; height:14px; border-radius:50%; margin:0 3px; background:"+series_colors[g]+";'></span>";
}
s += "</div>";

// Canvas do gráfico
s += "<div style='width:"+width+"px; height:"+height+"px; background:"+background_color+"'><canvas id='"+div_id+"' style='width:100%; height:100%'></canvas></div>";

// Injeta Chart.js se necessário
s += "<script>";
s += "if(typeof Chart==='undefined'){ " +
    "var script=document.createElement('script'); " +
    "script.src='https://cdn.jsdelivr.net/npm/chart.js'; document.head.appendChild(script); }";
s += "</script>";

// Criação do gráfico
s += "<script>";
s += "function initChart(){";
s += " if(typeof Chart==='undefined'){ setTimeout(initChart,200); return; }";
s += " var chart = new Chart(document.getElementById('"+div_id+"'), {";
s += "   type:'line',";
s += "   data:{ datasets:"+JSON.stringify(datasets)+" },";
s += "   options:{";
s += "     responsive:true, maintainAspectRatio:false,";
s += "     plugins:{ ";
s += "       legend:{display:false}, ";
s += "       title:{display:"+show_title+", text:'"+title+"'},";
s += "       tooltip:{ callbacks:{ label:function(context){ var d=new Date(context.parsed.x); var hh=d.getHours().toString().padStart(2,'0'); var mm=d.getMinutes().toString().padStart(2,'0'); return context.dataset.label+': '+context.parsed.y+' ('+hh+':'+mm+')'; } } }";
s += "     },";
s += "     scales:{";
s += "       x:{ type:'linear', ticks:{ callback:function(val){ var d=new Date(val); return d.getHours().toString().padStart(2,'0')+':'+d.getMinutes().toString().padStart(2,'0'); }, maxTicksLimit:24 }, offset:false },";
s += "       y:{ beginAtZero:true, min:0, max:5, ticks:{ stepSize:1, precision:0 } }";
s += "     },";
s += "     onClick:(evt,activeEls)=>{";
s += "       if(activeEls.length > 0){";
s += "         var el = activeEls[0];";
s += "         var dsIndex = el.datasetIndex;";
s += "         var i = el.index;";
s += "         chart.data.datasets.forEach(function(ds, dsi){";
s += "           ds.pointRadius = ds.data.map(()=>1);";
s += "           ds.pointBackgroundColor = ds.data.map(()=> ds.borderColor);";
s += "         });";
s += "         chart.data.datasets[dsIndex].pointRadius[i] = 1;";
s += "         chart.data.datasets[dsIndex].pointBackgroundColor[i] = '#000000';";
s += "         chart.update();";
s += "       }";
s += "     }";
s += "   }";
s += " });";
s += "}";
s += "initChart();";
s += "</script>";

return s;
