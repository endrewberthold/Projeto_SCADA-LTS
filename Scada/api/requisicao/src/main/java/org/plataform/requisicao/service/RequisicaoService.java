package org.plataform.requisicao.service;

import org.plataform.requisicao.models.RequisicaoModel;
import org.plataform.requisicao.repository.RequisicaoRepository;
import org.springframework.stereotype.Service;
import java.util.List;

import java.math.BigDecimal;

@Service
public class RequisicaoService {

    public final RequisicaoRepository repository;

    public RequisicaoService(RequisicaoRepository repository) {
        this.repository = repository;
    }

    public List<RequisicaoModel> getByNroReq(BigDecimal nroReq) {
        return repository.findByNroReq(nroReq);
    }
}
