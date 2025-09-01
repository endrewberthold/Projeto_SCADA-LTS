// Se não está em manutenção e está sem energia e motor desligado
if (!(status_man.value == 2 || status_man.value == 3) &&
    energ.value == 0 && on_off.value == 0) {
    return 0; // Máquina desligada
}
if (status_op.value == 1) {
    // Condição de operação normal
    if ((energ.value == 0 || energ.value == 1) &&
        btn_ok.value == 1 &&
        (on_off.value == 0 || on_off.value == 1)) {

        if (status_man.value == 2 || status_man.value == 3) {
            return 3; // Pausa devido à manutenção
        }

        return 1; // Em operação
    }

    // Condição de atenção durante produção
    else if (energ.value == 1 &&
        btn_atencao.value == 1 &&
        on_off.value == 1) {
        return 1; // Produzindo, mas com atenção
    }

    // Máquina parada ou atenção sem produção
    else if ((energ.value == 1 || energ.value == 0) &&
        btn_atencao.value == 1) {

        if (status_man.value == 2 || status_man.value == 3) {
            return 3; // Pausa
        }

        return 3; // Parada
    }

    // Condição de emergência
    else if ((energ.value == 1 || energ.value == 0) &&
        btn_emerg.value == 1 &&
        (on_off.value == 0 || on_off.value == 1)) {

        if (status_man.value == 2 || status_man.value == 3) {
            return 3; // Pausa
        }

        return 3; // Emergência
    }

    // Fallback padrão
    else {
        return 1;
    }
}

else if (status_op.value == 2) {
    // Setup com botão OK
    if ((energ.value == 0 || energ.value == 1) &&
        btn_ok.value == 1 &&
        (on_off.value == 0 || on_off.value == 1)) {

        if (status_man.value == 2 || status_man.value == 3) {
            return 3; // Pausa
        }

        return 2; // Setup ativo
    }

    // Setup com botão Atenção
    else if ((energ.value == 0 || energ.value == 1) &&
        btn_atencao.value == 1 &&
        (on_off.value == 0 || on_off.value == 1)) {

        if (status_man.value == 2 || status_man.value == 3) {
            return 3; // Pausa
        }

        return 2; // Setup em atenção
    }

    // Fallback
    else {
        return 1; // Assume operação normal como fallback
    }
}

else if (status_op.value == 3) {
    if (btn_ok.value == 1){
        return 1
    }
    return 3; // Retorna pausa
}

else {
    return 1; // Default para status indefinido
}