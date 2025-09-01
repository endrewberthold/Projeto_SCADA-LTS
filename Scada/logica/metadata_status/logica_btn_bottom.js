if (btn_emerg.value == 1) {
    if (motor.value == 1) {
        return 9; // Parar produção em emergência
    }
    if (status_man.value == 2 || status_man.value == 3) {
        return 7; // Manutenção em vez de emergência
    }
    return 6; // Emergência geral
}

if (status_man.value == 2 || status_man.value == 3) {
    return 7; // Manutenção
}

if (btn_atencao.value == 1) {
    if (motor.value == 1) {
        return 4; // Produzindo em atenção
    }
    return 5; //Máquina parada
}

if (energ.value == 0 &&
    btn_ok.value == 0 &&
    btn_atencao.value == 0 &&
    btn_emerg.value == 0 &&
    motor.value == 0
) {
    return 0; // Máquina desligada
}

if (energ.value == 1 &&
    btn_ok.value == 0 &&
    btn_atencao.value == 0 &&
    btn_emerg.value == 0 &&
    motor.value == 0 &&
    (status_aside.value == 3 || status_aside.value == 1)
) {
    return 1; // Máquina ligada
}

if (energ.value == 1 &&
    btn_ok.value == 1 &&
    motor.value == 0 &&
    (status_aside.value == 3 || status_aside.value == 1)
) {
    return 2; // Em espera
}

if (energ.value == 1 &&
    btn_ok.value == 1 &&
    motor.value == 1 &&
    status_aside.value == 1
) {
    if (prod.value == 0) {
        return 10; //Aguardando contagem
    }
    return 3; // Produzindo
}

if (status_aside.value == 2 &&
    btn_emerg.value == 0
) {
    return 13; // Em setup
}

if (status_aside.value == 4 &&
    btn_emerg.value == 0
) {
    return 12; // Retrabalho
}

if (energ.value == 0 &&
    btn_ok.value == 1
) {
    return 0; // Máquina desligada
}