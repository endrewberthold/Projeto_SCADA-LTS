// /* @license MIT */
//
// var options = [
//     { label: " ", value: 0 }, // oculto
//     { label: "Ciente", value: 1 },
//     { label: "Man. Não Programada", value: 2 },
//     { label: "Man. Preventiva", value: 3 },
// ];
//
// //
// // NÃO ALTERAR ABAIXO
// //
//
// var s = "";
//
// // Estilo dos botões (container em coluna)
// s += "<div style='display: flex; flex-direction: column; gap: 6px;'>";
//
// // Gera os botões, exceto o de valor 0
// for (var i in options) {
//     var foo = options[i];
//
//     // Pula o botão de valor 0 (não exibir nem criar)
//     if (foo.value === 0) continue;
//
//     // Estilo do botão selecionado
//     var selectedStyle = (value == foo.value)
//         ? "background-color: #007BFF; color: white; border: 2px solid #0056b3;"
//         : "background-color: #f0f0f0; color: black; border: 1px solid #ccc;";
//
//     // Cria o botão
//     s += "<button style='";
//     s += "padding: 6px 10px; ";
//     s += "border-radius: 8px; ";
//     s += "  font-weight: bold;";
//     s += "cursor: pointer; ";
//     s += "font-size: 12px; ";
//     s += "transition: background-color 0.3s, color 0.3s; "; // Suaviza o hover
//     s += selectedStyle;
//     s += "' ";
//
//     s += "onmouseover=\"this.style.backgroundColor='#0056b3'; this.style.color='white'\" ";
//     s += "onmouseout=\"if (" + value + "==" + foo.value + "){this.style.backgroundColor='#007BFF'; this.style.color='white';} else {this.style.backgroundColor='#f0f0f0'; this.style.color='black';}\" ";
//
//     s += "onclick='mango.view.setPoint(" + point.id + ", " + pointComponent.id + ", " + foo.value + ")'>";
//
//     s += foo.label + "</button>";
// }
//
// s += "</div>";
//
// return s;


/* @license MIT */

var options = [
    { label: " ", value: 0 }, // oculto
    { label: "CONFIRMAR CHAMADO", value: 1 },
    { label: "MAN. NÃO PROGRAMADA", value: 2 },
    { label: "MAN. PREVENTIVA", value: 3 },
];

var s = "";

// Container principal
s += "<div style='display: flex; flex-direction: column; gap: 6px;'>";

// === BOTÃO 1 ("Ciente") ===
var foo = options[1];
var isDisabled1 = (value == 3); // Desabilita se o botão 3 estiver ativo
var selectedStyle = (value == foo.value)
    ? "background-color: #007BFF; color: white; border: none;"
    : "background-color: #f0f0f0; color: black; border: none;";

s += "<button " + (isDisabled1 ? "disabled " : "") + "style='margin-bottom: 10px; padding: 6px 10px; box-shadow: 2px 2px 0 0; border-radius: 8px; font-weight: bold; font-size: 12px; transition: background-color 0.3s, color 0.3s; ";
s += isDisabled1 ? "background-color: #ddd; color: #888; border: none; cursor: not-allowed;" : selectedStyle + " cursor: pointer;";
s += "' ";

if (!isDisabled1) {
    s += "onmouseover=\"this.style.backgroundColor='#0056b3'; this.style.color='white'\" ";
    s += "onmouseout=\"if (" + value + "==" + foo.value + "){this.style.backgroundColor='#007BFF'; this.style.color='white';} else {this.style.backgroundColor='#f0f0f0'; this.style.color='black';}\" ";
    s += "onclick='mango.view.setPoint(" + point.id + ", " + pointComponent.id + ", " + foo.value + ")'";
}

s += ">" + foo.label + "</button>";

// === LINHA COM BOTÃO 2 E 3 ===
s += "<div style='display: flex; gap: 6px;'>";

// === BOTÃO 2 ("Man. Não Programada") ===
foo = options[2];
var isDisabled2 = !(value == 1 || value == 2);
selectedStyle = (value == foo.value)
    ? "background-color: #007BFF; color: white; border: none;"
    : "background-color: #f0f0f0; color: black; border: none;";

s += "<button " + (isDisabled2 ? "disabled " : "") + "style='flex: 1; padding: 6px 10px; box-shadow: 2px 2px 0 0; border-radius: 8px; font-weight: bold; font-size: 12px; transition: background-color 0.3s, color 0.3s; ";
s += isDisabled2 ? "background-color: #ddd; color: #888; border: none; cursor: not-allowed;" : selectedStyle + " cursor: pointer;";
s += "' ";

if (!isDisabled2) {
    s += "onmouseover=\"this.style.backgroundColor='#0056b3'; this.style.color='white'\" ";
    s += "onmouseout=\"if (" + value + "==" + foo.value + "){this.style.backgroundColor='#007BFF'; this.style.color='white';} else {this.style.backgroundColor='#f0f0f0'; this.style.color='black';}\" ";
    s += "onclick='mango.view.setPoint(" + point.id + ", " + pointComponent.id + ", " + foo.value + ")'";
}

s += ">" + foo.label + "</button>";

// === BOTÃO 3 ("Man. Preventiva") ===
foo = options[3];
var isDisabled3 = (value == 1 || value == 2); // Desabilita se 1 ou 2 estiverem ativos
selectedStyle = (value == foo.value)
    ? "background-color: #007BFF; color: white; border: none;"
    : "background-color: #f0f0f0; color: black; border: none;";

s += "<button " + (isDisabled3 ? "disabled " : "") + "style='flex: 1; padding: 6px 10px; box-shadow: 2px 2px 0 0; border-radius: 8px; font-weight: bold; font-size: 12px; transition: background-color 0.3s, color 0.3s; ";
s += isDisabled3 ? "background-color: #ddd; color: #888; border: none; cursor: not-allowed;" : selectedStyle + " cursor: pointer;";
s += "' ";

if (!isDisabled3) {
    s += "onmouseover=\"this.style.backgroundColor='#0056b3'; this.style.color='white'\" ";
    s += "onmouseout=\"if (" + value + "==" + foo.value + "){this.style.backgroundColor='#007BFF'; this.style.color='white';} else {this.style.backgroundColor='#f0f0f0'; this.style.color='black';}\" ";
    s += "onclick='mango.view.setPoint(" + point.id + ", " + pointComponent.id + ", " + foo.value + ")'";
}

s += ">" + foo.label + "</button>";

s += "</div>"; // fim da linha
s += "</div>"; // fim do container

return s;