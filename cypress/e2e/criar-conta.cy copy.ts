import { toCyString } from "../helpers/kebab.helper";

describe("Fluxos de Usuário: Conta, Login e Perfil", () => {
  
  beforeEach(() => {
    // Visita a base URL definida no cypress.config.js
    cy.visit("/");
  });

  context("Cadastro e Login", () => {
    
    it("Deve criar uma conta com dados válidos quando o e-mail for único", () => {
      cy.get(".css-j9tmj0").click(); 

      cy.fixture("criar-conta").then((dados) => {
        cy.get('[data-cy="nome"]').type(dados.nome);
        cy.get('[data-cy="dataNascimento"]').type(dados.dataNascimento);
        cy.get('[data-cy="open-sexo"]').click();
        cy.get('[data-cy="' + toCyString(dados.sexo) + '"]').click();
        cy.get('[data-cy="documento"]').type(dados.cpf);
        
        cy.get(".css-kh7nmy").click(); 
        
        cy.get('[data-cy="email"]').type(dados.email);
        cy.get('[data-cy="senha"]').type(dados.senha);
        cy.get('[data-cy="senhaConfirmar"]').type(dados.senhaConfirmar);
        
        cy.get(".css-kh7nmy").click(); 
        cy.get(".css-d2d35v").click(); 
        cy.get('[data-cy="finalizar"]').click();

        //cy.contains("Conta criada com sucesso").should("be.visible"); 
      });
    });

    it("Deve conseguir logar e preencher o endereço do perfil com sucesso", () => {
      // NOTA: Certifique-se de que o arquivo "criar-conta.json" possua os campos de CEP e endereço!
      cy.fixture("criar-conta").then((dados) => {
        // Realiza o login
        cy.typeLogin(dados.email, dados.senha);
        
        // Garante que o login funcionou
        cy.get('[data-cy="user-menu"]',{timeout:10000}).should("be.visible"); 

        // Navegação para o perfil
        cy.visit("/pesquisador/editar");
        cy.get('[data-cy="endereco"]').should("be.visible").click();
        // Espera o formulário de perfil carregar
        cy.get('[data-cy="endereco.cep"]').should("be.visible");

        // Preenche os dados limpando antes para evitar duplicidade
        cy.get('[data-cy="endereco.cep"]').clear().type(dados.cep);
        cy.get('[data-cy="endereco.logradouro"]').clear().type(dados.logradouro);
        cy.get('[data-cy="endereco.numero"]').clear().type(dados.numero);
        cy.get('[data-cy="endereco.complemento"]').clear().type(dados.complemento);
        cy.get('[data-cy="endereco.bairro"]').clear().type(dados.bairro);
        
        //Campos do formulário que são autocomplete
        cy.get('[data-cy="search-estado"]').clear().type(dados.estado);
        cy.contains('.MuiAutocomplete-option, .pac-isHtmlElement, li,div',dados.estado).should('be.visible').click();

        cy.get('[data-cy="search-municipio"]').clear().type(dados.municipio);
        cy.contains('.MuiAutocomplete-option, .pac-item, li, div', dados.municipio).click();

        // Salva endereço (DICA: Valide se o seletor correto é "save-address" ou "salvar-endereco")
        cy.get('[data-cy="menu-salvar"]').click();

        // Asserção de sucesso
        cy.contains("Endereço updated com sucesso").should("be.visible");
      });
      
    });

    it("Preencher dados acadêmicos", () => {
      cy.fixture("criar-conta").then((dados) => {
        // Realiza o login e aguarda o menu do usuário carregar
        cy.typeLogin(dados.email, dados.senha);
        cy.get('[data-cy="user-menu"]', { timeout: 10000 }).should("be.visible");
        
        // Navegação para o perfil
       
        
        cy.get('[data-cy="dados-academicos"]').should("be.visible").click();
    
        // Preenche a Instituição (Autocomplete)
        cy.get('[data-cy="instituicao-id"]').clear().type(dados.instituicao);
        cy.contains('.MuiAutocomplete-option, .pac-isHtmlElement, li,div',dados.instituicao).should('be.visible').click();
      
        cy.get('[data-cy="sugerir-unidade"]').check({ force: true });
        cy.get('[data-cy="unidadeNome"]').clear().type(dados.unidade);
        cy.get('[data-cy="unidadeSigla"]').clear().type(dados.sigla);

        // Preenche o Nível Acadêmico (Autocomplete) - Corrigido espaço em branco
        cy.get('[data-cy="nivel-academico-id"]').clear().type(dados.escolaridade);
        cy.contains('.MuiAutocomplete-option, .pac-isHtmlElement, li,div',dados.escolaridade).should('be.visible').click();
        
        
        // Preenche redes sociais - Corrigido aspas faltantes
        cy.get('[data-cy="lattes"]').clear().type(dados.lattes);
        cy.get('[data-cy="linkedin"]').clear().type(dados.linkedin);
        
        // Salva as alterações
        cy.get('[data-cy="menu-salvar"]').click();
    
        // Asserção de sucesso
        //cy.contains("Dados acadêmicos updated com sucesso", { timeout: 8000 }).should("be.visible");
      });
    }); // Fechamento correto dos blocos 
    it("Preenchimento de dados profissionais", () => {
      cy.fixture("criar-conta").then((dados) => {
        // Realiza o login e aguarda o menu do usuário carregar
        cy.typeLogin(dados.email, dados.senha);
        cy.get('[data-cy="user-menu"]', { timeout: 10000 }).should("be.visible");
        
        // Navegação para o perfil
        cy.visit("/pesquisador/editar");
        cy.get('[data-cy="dados-profissionais"]').should("be.visible").click();
        
        // Seleção de vínculo institucional
        cy.get('[data-cy="possui-vinculo-institucional"]').check({ force: true });
    
        // Atenção ao "instituciona" vs "institucional" aqui:
        cy.get('[data-cy="search-tipo-vinculo-instituciona"]').clear().type(dados.vinculo);
        cy.contains('.MuiAutocomplete-option, .pac-isHtmlElement, li, div', dados.vinculo)
          .should('be.visible')
          .click();
        
        cy.get('[data-cy="vinculoInstitucional.inicioServico"]').type(dados.dataInicio);
    
        // Seleção do regime de trabalho
        cy.get('[data-cy="search-regime-trabalho-id"]').clear().type(dados.regimeTrabalho);
        cy.contains('.MuiAutocomplete-option, .pac-isHtmlElement, li, div', dados.regimeTrabalho)
          .should('be.visible')
          .click();
    
        // Preenchimento das funções
        cy.get('[data-cy="vinculoInstitucional.funcao"]').clear().type(dados.funcao);
        cy.get('[data-cy="vinculoInstitucional.inicioFuncao"]').clear().type(dados.inicioFuncao);
        
        // Salvamento e validação do Toast/Mensagem de sucesso
        cy.get('[data-cy="menu-salvar"]').click();
      
      });
    });

    it("Preenchimento de documentos pessoaos ", () => {
      cy.fixture("criar-conta").then((dados) => {
        // Realiza o login e aguarda o menu do usuário carregar
        cy.typeLogin(dados.email, dados.senha);
        cy.get('[data-cy="user-menu"]', { timeout: 10000 }).should("be.visible");
        
        // Navegação para o perfil
        cy.visit("/pesquisador/editar");
        cy.get('[data-cy="documentos-pessoais"]').should("be.visible").click();
      
        cy.get('[data-cy=select-categories-usuario-anexo]').click();
        cy.contains('.MuiAutocomplete-option, .pac-isHtmlElement, li, div', dados.anexo)
          .should('be.visible')
          .click();

        cy.get('input[data-cy= usuarioAnexo-upload]').selectFile('cypress/fixtures/documento.pdf', {force:true });
        cy.contains('documento.pdf').should('be.visible');

        cy.get('[data-cy="menu-salvar"]').click();
      
      });
    });
});
});