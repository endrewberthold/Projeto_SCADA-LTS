/* @license MIT */

// Points to be included in chart (ID or XID)
var reading_points = [ point.id ];


// Color description for each group state
var series_colors = ['#99999900', '#12CE00', '#FFD700', '#0044FF', '#FF0000'];
var descriptions = ['', '', '', '', ''];

// Time unit adopted in chart:
// 0 -> Seconds
// 1 -> Minutes
// 2 -> Hours
var time_unit = 2; // 2 = hours
var time_value = 24; // last 24 hours

// Chart size
var height = 270;
var width = 420;

// Chart title
var show_title = false;
var title = 'Estado da Máquina';

// Start Y-axis always at 0
// Enable chart animations
var begin_Y_at_zero = true;
var enable_animations = true;

//
// NÃO ALTERAR ABAIXO
//

var invalid_message = "is not a numeric, multistate or binary datapoint";
var invalid_html = "";


// Get datapoints identifiers (ID/XID)
function getDataPointIds(identifier) {
    var dpDAO = new org.scada_lts.mango.service.DataPointService();
    var dp = dpDAO.getDataPoint(identifier);
    return { id: dp.getId(), xid: String(dp.getXid()) };
}

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

function readPoints(id) {
    var unit_values = [1000, 60000, 3600000]; // ms
    var index = (time_unit > 2) ? 0 : time_unit;
    var since = new Date().getTime() - (time_value * unit_values[index]);
    var val = new com.serotonin.mango.db.dao.PointValueDao();
    return val.getPointValues(id, since);
}

// Processa os dados, colocando 0 para estados não ativos e o valor para o estado ativo
function createDataArrays(obj, state_groups) {
    var datasets = [];
    var size = obj.size();

    function mapState(value) {
        for (var i = 0; i < state_groups.length; i++) {
            if (state_groups[i].states.indexOf(value) !== -1) {
                return i;
            }
        }
        return null;
    }

    // Inicializa arrays vazios
    for (var i = 0; i < state_groups.length; i++) {
        datasets.push('[');
    }

    // Percorre os dados do mais antigo para o mais recente (para facilitar)
    for (var i = size - 1; i > 0; i--) {
        var time_current = obj.get(i).time;
        var value_current = parseInt(obj.get(i).value);
        var time_next = obj.get(i - 1).time;

        var activeGroup = mapState(value_current);

        for (var j = 0; j < state_groups.length; j++) {
            var y = (j === activeGroup) ? state_groups[j].value : 0;
            if (datasets[j] !== '[') datasets[j] += ',';

            // Adiciona ponto no tempo atual
            datasets[j] += '{"x":' + time_current + ',"y":' + y + '}';

            // Adiciona ponto estendido até o próximo timestamp
            datasets[j] += ',{"x":' + time_next + ',"y":' + y + '}';
        }
    }

    // Para o último ponto (mais antigo), coloque um ponto final com y=0 para fechar
    var oldestTime = obj.get(0).time;
    for (var j = 0; j < state_groups.length; j++) {
        datasets[j] += ',{"x":' + oldestTime + ',"y":0}]';
    }

    return datasets;
}

function createJSONDatasets() {
    var foo = '[';

    var dp_id = getDataPointIds(reading_points[0]).id;
    var dp_type = getDataPointType(dp_id);
    var point_values = readPoints(dp_id);

    if (dp_type != "NUMERIC" && dp_type != "MULTISTATE") {
        invalid_html += descriptions[0] + ": " + invalid_message + "<br>";
        return '[]';
    }

    // Define o tempo inicial (since)
    var unit_values = [1000, 60000, 3600000];
    var index = (time_unit > 2) ? 0 : time_unit;
    var since = new Date().getTime() - (time_value * unit_values[index]);

    // Definir os grupos de estados e seus respectivos valores no eixo Y
    var state_groups = [
        { states: [0], value: 1 },        // Desligado
        { states: [1, 2, 3, 10], value: 2 },  // Operando
        { states: [4, 5], value: 3 },     // Atenção
        { states: [6, 9], value: 4 },        // Emergência
        { states: [7], value: 5 }        // Manutenção
    ];

    // Cria os datasets (um por grupo)
    var datasets = createDataArrays(point_values, state_groups, since);

    for (var i = 0; i < state_groups.length; i++) {
        if (foo != '[') foo += ',';

        foo += '{';
        foo += '"label":"' + descriptions[i] + '",';
        foo += '"data":' + datasets[i] + ',';
        foo += '"borderColor":"' + series_colors[i] + '",';
        foo += '"backgroundColor":"' + series_colors[i] + '",';
        foo += '"fill":false,';
        foo += '"stepped":true';
        foo += '}';
    }

    foo += ']';
    return foo;
}

function createFinalJSON() {
    var foo = '';

    foo += '{';
    foo += '"height":"' + height + '",';
    foo += '"width":"' + width + '",';
    foo += '"beginAtZero":' + begin_Y_at_zero + ',';
    foo += '"timeBased":true,';
    foo += '"animations":' + enable_animations + ',';
    foo += '"showTitle":' + show_title + ',';
    foo += '"title":"' + title + '",';
    foo += '"type":"line",';
    foo += '"data":{"datasets":' + createJSONDatasets() + '},';
    foo += '"options": {';
    foo +=   '"scales": {';
    foo +=     '"y": {';
    foo +=       '"beginAtZero": true,';
    foo +=       '"ticks": {';
    foo +=         '"stepSize": 1,';
    foo +=         '"callback": "function(value) { return Number.isInteger(value) ? value : null; }"';
    foo +=       '}';
    foo +=     '}';
    foo +=   '}';
    foo += '}';

    foo += '}';

    return foo;
}

var s = "<input class='fuscabr-chart-data' type='hidden' value='" + createFinalJSON() + "' >";
if (invalid_html.length) s += invalid_html;

/* Debug do JSON */
//s += "<div style='width: 600px; background-color: #eee; overflow:auto;'>" + createFinalJSON() + "</div>";

return s;