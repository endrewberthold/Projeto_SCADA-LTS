// verificação dos status
if (energ.value == 0){
    return status = 0
} else {
    if (btn_ok.value == 0 && btn_atencao.value == 0 && btn_emerg.value == 0 && on_off.value == 0) {
        return status = 1 // Máquina ligada
    } else if (btn_ok.value == 1 && on_off.value == 0) {
        return status = 2 // Em espera
    } else if (on_off.value == 1 && btn_ok.value == 1) {
        return status = 3 // Produzindo
    } else if (on_off.value == 1 && btn_atencao.value == 1) {
        return status = 4 // Produzindo em Atenção
    } else if (on_off.value == 0 && btn_atencao.value == 1) {
        return status = 5 // Máquina parada
    } else if ((on_off.value == 1 || on_off.value == 0) && btn_emerg.value == 1) {
        return status = 6 // Emergencia
    } else if (btn_man.value == 1){
        return status = 7 // Manutenção
    } else {
        return status = 8 // ERRO
    }
}

// if(on_off.value == 1 && prod.value == 0){
//     return status = 5
// } else if(on_off.value == 1 && btn_ok.value == 1 && prod.value > 0){
//     return status = 1
// } else if(on_off.value == 1 && btn_atencao.value == 1 && prod.value > 0){
//     return status = 2
// } else if(on_off.value == 1 && btn_emerg.value == 1){
//     return status = 3
// } else if(on_off.value == 1 && btn_man.value == 1){
//     return status = 4
// } else if(on_off.value == 0){
//     return status = 0
// } else {
//     return status = 6
// }
