package org.plataform.requisicao.models;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.Hibernate;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;

@Getter
@Setter
@Embeddable
public class RequisicaoModelId implements Serializable {
    private static final long serialVersionUID = -8564837615213221624L;
    @Column(name = "emp", nullable = false, precision = 4)
    private BigDecimal emp;

    @Column(name = "fil", nullable = false, precision = 4)
    private BigDecimal fil;

    @Column(name = "nro_req", nullable = false, precision = 6)
    private BigDecimal nroReq;

    @Column(name = "tipo_cadastro", nullable = false, length = 1)
    private String tipoCadastro;

    @Column(name = "cod_produto", nullable = false, precision = 6)
    private BigDecimal codProduto;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        RequisicaoModelId entity = (RequisicaoModelId) o;
        return Objects.equals(this.fil, entity.fil) &&
                Objects.equals(this.emp, entity.emp) &&
                Objects.equals(this.tipoCadastro, entity.tipoCadastro) &&
                Objects.equals(this.nroReq, entity.nroReq) &&
                Objects.equals(this.codProduto, entity.codProduto);
    }

    @Override
    public int hashCode() {
        return Objects.hash(fil, emp, tipoCadastro, nroReq, codProduto);
    }

}