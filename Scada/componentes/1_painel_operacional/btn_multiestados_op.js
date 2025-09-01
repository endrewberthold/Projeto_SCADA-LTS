var options = [
    {label: " ", value: 0}, // oculto
    {label: "OPERAÇÃO", value: 1},
    {label: "SETUP", value: 2},
    {label: "PAUSA", value: 3},
];

//
// NÃO ALTERAR ABAIXO
//

var s = "";

// Container dos botões em coluna
s += "<div style='display: flex; flex-direction: column; gap: 6px;'>";

for (var i in options) {
    var foo = options[i];

    // Ignora o botão com valor 0
    if (foo.value === 0) continue;

    var isSelected = value == foo.value;

    // Estilo condicional para botão selecionado ou não
    var selectedStyle = isSelected
        ? "background-color: #f8f8f8; color: black; border: none;"  // off-white
        : "background-color: #a0a0a0; color: black; border: none;"; // cinza

    s += "<button style='";
    s += "margin-bottom: 6px; ";
    s += "padding: 6px 18px; ";
    s += "border-radius: 8px; ";
    s += "box-shadow: 2px 2px 0 0; ";
    s += "font-weight: bold;";
    s += "cursor: pointer; ";
    s += "font-size: 14px; ";
    s += "transition: background-color 0.3s, color 0.3s; ";
    s += selectedStyle;
    s += "' ";

    // Hover (clareia levemente)
    s += "onmouseover=\"this.style.backgroundColor='#e6e6e6'; this.style.color='black'\" ";

    // Mouse out: volta ao estado conforme estiver selecionado ou não
    s += "onmouseout=\"";
    s += "if (" + value + "==" + foo.value + "){";
    s += "this.style.backgroundColor='#f8f8f8'; this.style.color='black';";
    s += "} else {";
    s += "this.style.backgroundColor='#a0a0a0'; this.style.color='black';";
    s += "}\" ";

    // Clique
    s += "onclick='mango.view.setPoint(" + point.id + ", " + pointComponent.id + ", " + foo.value + ")'>";

    s += foo.label + "</button>";
}

s += "</div>";

return s;