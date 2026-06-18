import { toCyString } from "../helpers/kebab.helper";

describe('Atividade 2 - Fluxo de Submissão de Proposta (SIGFAP)', () => {

  beforeEach(() => {
    cy.visit("/edital/12/minhas");
  });

  context("Submissão da proposta", () => {

  
    it("Deve conseguir logar e iniciar proposta", () => {
      cy.fixture("criar-conta.json").then((dados) => {
        cy.typeLogin(dados.email, dados.senha);

        cy.get('[data-cy="user-menu"]', { timeout: 10000 })
          .should("be.visible");

        cy.get('[data-cy="editais-ver-mais"]').click();
        cy.contains('button', 'Visualizar edital').click();
        cy.get('[data-cy="criar-proposta"]').click();

        cy.get('[data-cy="titulo"]').clear().type(dados.editalNome);
        cy.contains('button', 'Adicionar').click();

        cy.get('[data-cy="search-grande-area-id"]').clear().type(dados.grandeArea);
        cy.contains('.MuiAutocomplete-option, .pac-item, li, div', dados.grandeArea).click();

        cy.get('[data-cy="search-area-id"]').clear().type(dados.areaId);
        cy.contains('.MuiAutocomplete-option, .pac-item, li, div', dados.areaId).click();

        cy.get('[data-cy="search-sub-area-id"]').clear().type(dados.subArea);
        cy.contains('.MuiAutocomplete-option, .pac-item, li, div', dados.subArea).click();

        cy.get('[data-cy="search-especialidade-id"]').clear().type(dados.especialidade);
        cy.contains('.MuiAutocomplete-option, .pac-item, li, div', dados.especialidade).click();

        cy.contains('button', 'Confirmar').click();

        cy.get('[data-cy="informacoes-complementares"]').click();

        cy.get('[data-cy="formularioPropostaInformacaoComplementar.pergunta-28-item-ods03-garantir-o-acesso-a-saude"]').click();
        cy.get('[data-cy="formularioPropostaInformacaoComplementar.pergunta-29-item-media-faturamento-ano-de-r-4-800"]').click();
        cy.get('[data-cy="formularioPropostaInformacaoComplementar.pergunta-30-item-tecnologia"]').click();

        cy.get('[data-cy="formularioPropostaInformacaoComplementar.pergunta-31"]')
          .clear().type(dados.pergunta31);
          
        cy.get('[data-cy="formularioPropostaInformacaoComplementar.pergunta-32"]').clear().type(dados.pergunta32);

        cy.get('[data-cy="formularioPropostaInformacaoComplementar.pergunta-224-item-teste-3"]').click({ force: true });

        cy.contains('button', 'Salvar').click();

        cy.get('[data-cy="abrangencia"]').click();
        cy.get('[data-cy="add-button"]').click();

        cy.get('[data-cy="search-estado-id"]').clear().type(dados.estado1);
        cy.contains('.MuiAutocomplete-option, .pac-item, li, div', dados.estado1).click();

        cy.get('[data-cy="abrangencia-confirmar"]').click();
      });
    });

    
    it("Preenchimento dos dados de coordenação", () => {
      cy.fixture("submeter-proposta.json").then((dados) => {
        cy.typeLogin(dados.email, dados.senha);

        cy.get('[data-cy="propostas-edital-06-2026-teste"]').click();
        cy.get('[data-cy="apresentacao"]').click();
        cy.get('[data-cy="descricao"]').click();

        cy.get('[data-cy="formularioPropostaDescritiva.pergunta-33"]')
          .clear().type(dados.pergunta33);

        cy.get('[data-cy="formularioPropostaDescritiva.pergunta-34"]')
          .clear().type(dados.pergunta34);

        cy.get('[data-cy="formularioPropostaDescritiva.pergunta-36"]')
          .clear().type(dados.pergunta36);

        cy.get('[data-cy="formularioPropostaDescritiva.pergunta-37-item-bb"]')
          .click();

        cy.get('[data-cy="formularioPropostaDescritiva.pergunta-38-item-aa"]').click({force: true});

        cy.get('[data-cy="menu-salvar"]').click();

        cy.get('[data-cy="indicadores-de-producao"]').click();

        cy.contains('button', 'Salvar').click();

        cy.get('[data-cy="atividades"]').click();
        cy.contains('button', 'Adicionar').click();

        cy.get('[data-cy="propostaAtividadeForm.titulo"]')
          .clear().type(dados.ativividadeTitulo);

        cy.get('[data-cy="propostaAtividadeForm.descricao"]')
          .clear().type(dados.descricao);

        cy.get('[data-cy="search-mes-inicio"]').clear().type(dados.mesInicio);
        cy.contains('.MuiAutocomplete-option, .pac-item, li, div', dados.mesInicio).click();

        cy.get('[data-cy="search-duracao"]').clear().type(dados.duracao);
        cy.contains('.MuiAutocomplete-option, .pac-item, li, div', dados.duracao).click();

        cy.get('[data-cy="search-carga-horaria-semanal"]').clear().type(dados.cargaHoraria);
        cy.contains('.MuiAutocomplete-option, .pac-item, li, div', dados.cargaHoraria).click();

        cy.contains('button', 'Confirmar').click();
      });
    });

  
    it("Deve preencher os dados de orçamento", () => {
      cy.fixture("submeter-proposta.json").then((dados) => {
        cy.typeLogin(dados.email, dados.senha);

        cy.get('[data-cy="propostas-edital-06-2026-teste"]').click();
        cy.get('[data-cy="apresentacao"]').click();
        cy.get('[data-cy="orcamento"]').click();

        
        cy.get('[data-cy="diarias"]').click();
        cy.get('[data-cy="add-button"]').click();

        cy.get('[data-cy="search-pais-id"]').clear().type(dados.pais);
        cy.contains('.MuiAutocomplete-option, .pac-item, li, div', dados.pais).click();

        cy.get('[data-cy="search-estado-id"]').clear().type(dados.estadoDiaria);
        cy.contains('.MuiAutocomplete-option, .pac-item, li, div', dados.estadoDiaria).click();

        cy.get('[data-cy="search-municipio"]').clear().type(dados.municipioDiaria);
        cy.contains('.MuiAutocomplete-option, .pac-item, li, div', dados.municipioDiaria).click();

        cy.get('[data-cy="search-mes-previsto"]').clear().type(dados.mes);
        cy.contains('.MuiAutocomplete-option, .pac-item, li, div', dados.mes).click();

        cy.get('[data-cy="rubricaDiariaForm.numeroDiaria"]').clear().type(dados.numeroDiaria);
        cy.get('[data-cy="rubricaDiariaForm.custoUnitario"]').clear().type(dados.custoDiaria);
        cy.get('[data-cy="rubricaDiariaForm.justificativa"]').clear().type(dados.justificativa);

        cy.contains('button', 'Confirmar').click();

        
        cy.get('[data-cy="material-de-consumo"]').click();
        cy.get('[data-cy="add-button"]').click();

        cy.get('[data-cy="rubricaMaterialConsumoForm.especificacao"]')
          .clear().type(dados.materialConsumoEspecificacao);

        cy.get('[data-cy="search-unidade-medida"]')
          .clear().type(dados.materialConsumoUnidadeMedida);

        cy.contains('.MuiAutocomplete-option, .pac-item, li, div', dados.materialConsumoUnidadeMedida)
          .click();

        cy.get('[data-cy="search-mes-previsto"]')
          .clear().type(dados.materialConsumoMesPrevisto);

        cy.contains('.MuiAutocomplete-option, .pac-item, li, div', dados.materialConsumoMesPrevisto)
          .click();

        cy.get('[data-cy="rubricaMaterialConsumoForm.quantidade"]')
          .clear().type(dados.materialConsumoQuantidade);

        cy.get('[data-cy="rubricaMaterialConsumoForm.custoUnitario"]')
          .clear().type(dados.materialConsumoCustoUnitario);

        cy.get('[data-cy="rubricaMaterialConsumoForm.justificativa"]')
          .clear().type(dados.materialConsumoJustificativa);

        cy.get('[data-cy="rubricaMaterialConsumo-confirmar"]').click();

       
        cy.get('[data-cy="material-permanente"]').click();
        cy.get('[data-cy="add-button"]').click();

        cy.get('[data-cy="rubricaMaterialPermanenteForm.especificacao"]')
          .clear().type(dados.materialPermanenteEspecificacao);

        cy.get('[data-cy="search-tipo-origem"]')
          .clear().type(dados.materialPermanenteTipoOrigem);

        cy.contains('.MuiAutocomplete-option, .pac-item, li, div', dados.materialPermanenteTipoOrigem)
          .click();

        cy.get('[data-cy="search-mes-previsto"]')
          .clear().type(dados.materialPermanenteMesPrevisto);

        cy.contains('.MuiAutocomplete-option, .pac-item, li, div', dados.materialPermanenteMesPrevisto)
          .click();

        cy.get('[data-cy="rubricaMaterialPermanenteForm.quantidade"]')
          .clear().type(dados.materialPermanenteQuantidade);

        cy.get('[data-cy="rubricaMaterialPermanenteForm.custoUnitario"]')
          .clear().type(dados.materialPermanenteCustoUnitario);

        cy.get('[data-cy="rubricaMaterialPermanenteForm.justificativa"]')
          .clear().type(dados.materialPermanenteJustificativa);

        cy.get('[data-cy="rubricaMaterialPermanente-confirmar"]').click();

        
        cy.get('[data-cy="pessoal"]').click();
        cy.get('[data-cy="add-button"]').click();

        cy.get('[data-cy="rubricaPessoalForm.funcao"]')
          .clear().type(dados.pessoalFuncao);

        cy.get('[data-cy="rubricaPessoalForm.formacaoProfissional"]')
          .clear().type(dados.pessoalFormacaoProfissional);

        cy.get('[data-cy="rubricaPessoalForm.perfilDesejado"]')
          .clear().type(dados.pessoalPerfilDesejado);

        cy.get('[data-cy="search-carga-horaria-semanal"]')
          .clear().type(dados.pessoalCargaHorariaSemanal);

        cy.contains('.MuiAutocomplete-option, .pac-item, li, div', dados.pessoalCargaHorariaSemanal).click();

        cy.get('[data-cy="search-mes-inicio"]')
          .clear().type(dados.pessoalMesInicio);

        cy.contains('.MuiAutocomplete-option, .pac-item, li, div', dados.pessoalMesInicio).click();

        cy.get('[data-cy="search-duracao"]')
          .clear().type(dados.pessoalDuracao);

        cy.contains('.MuiAutocomplete-option, .pac-item, li, div', dados.pessoalDuracao).click();

        cy.get('[data-cy="rubricaPessoalForm.custoHoraCustoMes"]')
          .clear().type(dados.pessoalCustoHoraMes);
        
        cy.get('[data-cy="rubricaPessoalForm.valorTotal"]').clear().type(dados.pessoaValorTotal);

        cy.get('[data-cy="rubricaPessoalForm.justificativa"]')
          .clear().type(dados.pessoalJustificativa);

        cy.get('[data-cy="rubricaPessoal-confirmar"]').click();

        
        cy.get('[data-cy="encargos"]').click();
        cy.get('[data-cy="add-button"]').click();

        cy.get('[data-cy="rubricaEncargoForm.especificacao"]')
          .clear().type(dados.encargoEspecificacao);

        cy.get('[data-cy="rubricaEncargoForm.valorTotal"]')
          .clear().type(dados.encargoValorTotal);

        cy.get('[data-cy="search-mes-previsto"]')
          .clear().type(dados.encargoMesPrevisto);

        cy.contains('.MuiAutocomplete-option, .pac-item, li, div', dados.encargoMesPrevisto).click();

        cy.get('[data-cy="rubricaEncargoForm.justificativa"]')
          .clear().type(dados.encargoJustificativa);

        cy.get('[data-cy="rubricaEncargo-confirmar"]').click();

        cy.contains('button', 'Salvar').click();
      });
    });
  
    it("Preencher finalização da proposta", () => {
       cy.fixture("submeter-proposta.json").then((dados) => {
        cy.typeLogin(dados.email, dados.senha);

        cy.get('[data-cy="propostas-edital-06-2026-teste"]').click();
        cy.get('[data-cy="finalizacao"]').click();
        cy.get('[data-cy="termo-de-aceite"]').click();
        
        cy.get('[data-cy="termo-de-aceite-aceito"]').check({ force: true });
        cy.contains('button', 'Salvar').click();
        cy.get('[data-cy="menu-verificar-pendencias"]').click();
        cy.contains('button', 'Submeter proposta').click();
        cy.get('[data-cy="sim-continuar-button"]').click();



      });
    });
  });

});