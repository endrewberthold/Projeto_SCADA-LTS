if(on_off.value == 1 && prod.value == 0){
    return status = 5
} else if(on_off.value == 1 && btn_ok.value == 1 && prod.value > 0){
    return status = 1
} else if(on_off.value == 1 && btn_atencao.value == 1 && prod.value > 0){
    return status = 2
} else if(on_off.value == 1 && btn_emerg.value == 1){
    return status = 3
} else if(on_off.value == 1 && btn_man.value == 1){
    return status = 4
} else if(on_off.value == 0){
    return status = 0
} else {
    return status = 6
}