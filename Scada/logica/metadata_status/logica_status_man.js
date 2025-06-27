if ((energ.value == 0 || energ.value == 1) && concluido.value == 1){
    return 0
} else {
    if (status_man.value == 1){
        return 1
    }  else if (status_man.value == 2) {
        return 2
    }  else if (status_man.value == 3) {
        return 3
    } else {
        return
    }
}

/*
energ
status_man
concluido

enquanto concluido for verdadeiro, retorna 0 no status

ao clicar em ciente o concluido se torna falso

quando concluido for falso, todos os estados, exceto ok(true),
serão limpos

o status 2 e 3 alteram o estado de concluido para falso
 */