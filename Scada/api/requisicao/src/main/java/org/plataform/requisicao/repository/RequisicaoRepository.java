package org.plataform.requisicao.repository;

import org.plataform.requisicao.models.RequisicaoModel;
import org.plataform.requisicao.models.RequisicaoModelId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.math.BigDecimal;
import java.util.List;

@Repository
public interface RequisicaoRepository extends JpaRepository<RequisicaoModel, RequisicaoModelId> {
    @Query("SELECT r FROM RequisicaoModel r WHERE r.id.nroReq = :nroReq")
    List<RequisicaoModel> findByNroReq(@Param("nroReq") BigDecimal nroReq);
}