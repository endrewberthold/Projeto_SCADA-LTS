package org.plataform.requisicao.models;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "ftreqenv")
@Setter
@Getter
public class RequisicaoModel {
    @EmbeddedId
    private RequisicaoModelId id;

    @Column(name = "qtde", precision = 14, scale = 3)
    private BigDecimal qtde;

}
