package org.plataform.requisicao.controllers;

import org.plataform.requisicao.service.RequisicaoService;
import org.plataform.requisicao.models.RequisicaoModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/requisicoes")
public class RequisicaoController {

    private final RequisicaoService service;

    public RequisicaoController(RequisicaoService service) {
        this.service = service;
    }

    // Retorna todos os registros do nroReq
    @GetMapping("/{nroReq}")
    public List<RequisicaoModel> getByNroReq(@PathVariable BigDecimal nroReq) {
        return service.getByNroReq(nroReq);
    }
}
