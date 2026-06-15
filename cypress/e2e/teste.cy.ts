
import { toCyString } from "../helpers/kebab.helper";

describe('Atividade 2 - Fluxo de Submissão de Proposta (SIGFAP)', () => {

 
   context("Submissão da proposta", () => {
      it("Deve conseguir logar", () => {
        cy.fixture("criar-conta.json").then((dados) => {
        cy.typeLogin(dados.email, dados.senha); 
        cy.get('[data-cy="user-menu"]',{timeout:10000}).should("be.visible");

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


        cy.get('[data-cy="formularioPropostaInformacaoComplementar.pergunta-28-item-ods09-construir-infraestruturas"]').click();
        cy.get('[data-cy="formularioPropostaInformacaoComplementar.pergunta-28-item-ods13-adotar-medidas-urgentes-pa"]').click();
        cy.get('[data-cy="formularioPropostaInformacaoComplementar.pergunta-30-item-tecnologia"]').click();
      

        cy.get('[data-cy="formularioPropostaInformacaoComplementar.pergunta-31"]').clear().type(dados.pergunta31);
        cy.get('[data-cy="formularioPropostaInformacaoComplementar.pergunta-32"]').clear().type(dados.pergunta32);
       
        cy.contains('button', 'Salvar').click();
        cy.get('[data-cy="abrangencia"]').click();
        cy.get('[data-cy="add-button"]').click();


        cy.get('[data-cy="search-estado-id"]').clear().type(dados.estado1);
        cy.contains('.MuiAutocomplete-option, .pac-item, li, div', dados.estado1).click();

        
        cy.get('[data-cy="abrangencia-confirmar"]').click();


         });
      });

      beforeEach(() => {
        // Visita a base URL definida no cypress.config.js
        cy.visit("/edital/12/minhas");
      });
         it("Preenchimento dos dados de coordenação", () => {
            cy.fixture("submeter-proposta.json").then((dados) => {
            cy.typeLogin(dados.email, dados.senha);
            cy.get('[data-cy="propostas-edital-06-2026-teste"]').click();
            cy.get('[data-cy="apresentacao"]').click();
            cy.get('[data-cy="descricao"]').click();

            cy.get('[data-cy="formularioPropostaDescritiva.pergunta-33"]').clear().type(dados.pergunta33);
            cy.get('[data-cy="formularioPropostaDescritiva.pergunta-34"]').clear().type(dados.pergunta34);
            cy.get('[data-cy="formularioPropostaDescritiva.pergunta-36"]').clear().type(dados.pergunta36);
            cy.get('[data-cy="formularioPropostaDescritiva.pergunta-37-item-bb"]').click();
            cy.get('[data-cy="menu-salvar"]').click();
            cy.get('[data-cy="indicadores-de-producao"]').click();
            cy.get('.MuiInputBase-input.MuiOutlinedInput-input').eq(0).type(dados.pergunta38);
            cy.get('.MuiInputBase-input.MuiOutlinedInput-input').eq(1).type(dados.pergunta39);
            cy.get('.MuiInputBase-input.MuiOutlinedInput-input').eq(3).type(dados.pergunta40);
            cy.get('.MuiInputBase-input.MuiOutlinedInput-input').eq(6).type(dados.pergunta39);
            cy.get('.MuiInputBase-input.MuiOutlinedInput-input').eq(8).type(dados.pergunta39);
            cy.get('.MuiInputBase-input.MuiOutlinedInput-input').eq(9).type(dados.pergunta39);
            cy.get('.MuiInputBase-input.MuiOutlinedInput-input').eq(10).type(dados.pergunta39);
            cy.get('.MuiInputBase-input.MuiOutlinedInput-input').eq(14).type(dados.pergunta39);


            cy.get('.MuiInputBase-input.MuiOutlinedInput-input').eq(20).type(dados.pergunta39);
            cy.get('.MuiInputBase-input.MuiOutlinedInput-input').eq(24).type(dados.pergunta39);
            cy.get('.MuiInputBase-input.MuiOutlinedInput-input').eq(34).type(dados.pergunta39);
            cy.contains('button', 'Salvar').click();

            cy.get('[data-cy="atividades"]').click();
            cy.contains('button', 'Adicionar').click();

            cy.get('[data-cy="propostaAtividadeForm.titulo"]').clear().type(dados.ativividadeTitulo);
            cy.get('[data-cy="propostaAtividadeForm.descricao"]').clear().type(dados.descricao);
            
            cy.get('[data-cy="search-mes-inicio"]').clear().type(dados.mesInicio);
            cy.contains('.MuiAutocomplete-option, .pac-item, li, div', dados.mesInicio).click();

            cy.get('[data-cy="search-duracao"]').clear().type(dados.duracao);
            cy.contains('.MuiAutocomplete-option, .pac-item, li, div', dados.duracao).click();

            cy.get('[data-cy="search-carga-horaria-semanal"]').clear().type(dados.cargaHoraria);
            cy.contains('.MuiAutocomplete-option, .pac-item, li, div', dados.cargaHoraria).click();

            cy.contains('button', 'Confirmar').click();

          });
          });
          it("Deve preencher os dados de orçamento", () =>{
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
               
              

          });
        });
  });
  });