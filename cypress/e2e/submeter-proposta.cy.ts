describe('Atividade 2 - Fluxo de Submissão de Proposta (SIGFAP)', () => {

  // Carrega os dados da fixture antes de iniciar os testes
  beforeEach(() => {
    cy.fixture('submeter-proposta.json').as('dadosProposta');
    cy.visit('/');
    
    // O usuário faz login no sistema (Passo 1 do fluxo)
    cy.get('@dadosProposta').then((dados: any) => {
      cy.get('[data-cy="input-login"]').type(dados.usuario.login);
      cy.get('[data-cy="input-password"]').type(dados.usuario.senha);
      cy.get('[data-cy="btn-entrar"]').click();
    });
  });

  it('Seção Caracterização - Deve acessar o edital e iniciar a proposta', () => {
    // Navega até os editais abertos (Passo 2)
    cy.get('[data-cy="btn-ver-mais-editais"]').click();

    // Procura o edital alvo e visualiza (Passo 3)
    cy.get('@dadosProposta').then((dados: any) => {
      cy.contains(dados.editalAlvo).scrollIntoView();
      cy.get(`[data-cy="btn-visualizar-${dados.editalAlvo}"]`).click();
    });

    // Confirma o edital e cria a proposta (Passo 4)
    cy.get('[data-cy="btn-criar-proposta"]').click();

    // Preenche e salva a sub-seção Caracterização (Passo 5)
    cy.get('@dadosProposta').then((dados: any) => {
      cy.get('[data-cy="input-titulo-projeto"]').type(dados.caracterizacao.titulo);
      cy.get('[data-cy="textarea-resumo"]').type(dados.caracterizacao.resumo);
      cy.get('[data-cy="input-palavras-chave"]').type(dados.caracterizacao.palavrasChave);
      cy.get('[data-cy="btn-salvar-caracterizacao"]').click();
    });
  });

  it('Seção Coordenação - Deve editar a proposta e preencher dados do coordenador', () => {
    // Recomendação do grupo: Acessa a área de propostas e clica em Editar
    cy.get('[data-cy="menu-minhas-propostas"]').click();
    cy.get('[data-cy="btn-editar-proposta-recente"]').click();

    // Vai para a seção Coordenação e salva (Passo 6)
    cy.get('[data-cy="aba-coordenacao"]').click();
    cy.get('@dadosProposta').then((dados: any) => {
      cy.get('[data-cy="input-nome-coordenador"]').clear().type(dados.coordenacao.nome);
      cy.get('[data-cy="input-siape"]').clear().type(dados.coordenacao.siape);
      cy.get('[data-cy="select-regime"]').select(dados.coordenacao.regime);
      cy.get('[data-cy="btn-salvar-coordenacao"]').click();
    });
  });

  it('Seção Apresentação - Deve preencher a proposta pedagógica/científica', () => {
    cy.get('[data-cy="menu-minhas-propostas"]').click();
    cy.get('[data-cy="btn-editar-proposta-recente"]').click();

    // Vai para a seção Apresentação e salva (Passo 7)
    cy.get('[data-cy="aba-apresentacao"]').click();
    cy.get('@dadosProposta').then((dados: any) => {
      cy.get('[data-cy="textarea-introducao"]').type(dados.apresentacao.introducao);
      cy.get('[data-cy="textarea-objetivos"]').type(dados.apresentacao.objetivos);
      cy.get('[data-cy="textarea-metodologia"]').type(dados.apresentacao.metodologia);
      cy.get('[data-cy="btn-salvar-apresentacao"]').click();
    });
  });

  it('Seção Anexos - Deve realizar o upload dos documentos obrigatórios', () => {
    cy.get('[data-cy="menu-minhas-propostas"]').click();
    cy.get('[data-cy="btn-editar-proposta-recente"]').click();

    // Vai para a seção Anexos (Passo 8)
    cy.get('[data-cy="aba-anexos"]').click();
    
    // Simula o upload do arquivo PDF que está na pasta fixtures de forma estática
    cy.get('[data-cy="input-upload-projeto"]').selectFile('cypress/fixtures/submeter-proposta.json'); 
    cy.get('[data-cy="btn-salvar-anexos"]').click();
  });

  it('Seção Finalização - Deve verificar pendências e submeter a proposta', () => {
    cy.get('[data-cy="menu-minhas-propostas"]').click();
    cy.get('[data-cy="btn-editar-proposta-recente"]').click();

    // Vai para a seção Finalização (Passo 9)
    cy.get('[data-cy="aba-finalizacao"]').click();

    // Verifica Pendências (Passo 10)
    cy.get('[data-cy="btn-verificar-pendencias"]').click();
    cy.get('[data-cy="lista-pendencias"]').should('not.exist'); 

    // Submete a Proposta (Passo 11 e Resultado Esperado)
    cy.get('[data-cy="btn-submeter-proposta"]').click();
    
    // Validação de sucesso no envio
    cy.get('[data-cy="mensagem-sucesso"]')
      .should('be.visible')
      .and('contain.text', 'Proposta submetida com sucesso');
  });
});