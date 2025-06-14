# Sistema de Gestão e Automação com SCADA-LTS

Este repositório reúne os códigos, scripts e recursos desenvolvidos para a construção de um sistema de gestão e automação interna, utilizando o SCADA-LTS como plataforma de supervisão e controle.

## Sobre o Projeto

O objetivo deste projeto é implementar uma solução personalizada de automação e gestão de processos operacionais da empresa. Utilizando os recursos do SCADA-LTS, foram desenvolvidos componentes, dashboards e scripts que facilitam:

- A supervisão dos processos
- A gestão operacional
- A automação de rotinas internas
- A melhoria da interface para os usuários da operação

## Funcionalidades Implementadas

- Componentes visuais personalizados
- Botões de navegação entre visualizações
- Indicadores visuais de status com alteração de cores dinâmicas
- Scripts que interpretam dados dos data points em rótulos ou indicadores gráficos
- Painéis operacionais organizados para fácil leitura e controle
- Interface limpa e funcional, otimizada para operação em tempo real

## Tecnologias Utilizadas

- SCADA-LTS (como plataforma base)
- HTML
- CSS Inline
- JavaScript (Client-side scripting)
- Integração direta com data points e view components do SCADA-LTS

## Estrutura do Repositório

```
tree $
.
Projeto_Gestão_Operacional
┣ 0_desenho_logico
┣ 1_dir_testes
┣ assets
┃ ┗ elementos_svg
┣ componentes
┃ ┣ 0_painel_geral
┃ ┣ 1_painel_operacional
┃ ┗ 2_painel_manutenção
┗ logica
  ┗ metadata_status
```


## Diretório `desenho_logico`

Este diretório contém os **diagramas atualizados em formato PNG**, que representam a **estrutura lógica dos painéis** desenvolvidos no SCADA-LTS. A documentação dos fluxos, conexões e funcionamento interno dos painéis será feita e atualizada regularmente utilizando o **Excalidraw**, garantindo a rastreabilidade e organização do projeto.

---

## Funcionalidades Futuras (Backlog)

- Criação de um template padrão para novas views
- Dashboards com gráficos dinâmicos
- Integração com alarmes, logs e indicadores de performance
- Animações visuais para status críticos
- Otimização para dispositivos móveis e tablets operacionais

## Contribuições

Este projeto é interno e voltado exclusivamente para a melhoria dos processos operacionais da empresa. Atualizações e melhorias serão realizadas de acordo com as demandas internas.

## Licença

Projeto de uso interno, licenciado sob a Licença MIT.

---

Desenvolvimento contínuo focado na gestão, automação e supervisão dos processos operacionais da empresa utilizando SCADA-LTS.
