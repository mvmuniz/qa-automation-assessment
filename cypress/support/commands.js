// Comandos customizados para a Amazon

Cypress.Commands.add('amazonSearch', (query) => {
  cy.get('#twotabsearchtextbox', { timeout: 20000 })
    .should('be.visible')
    .clear()
    .type(query)

  cy.get('#nav-search-submit-button', { timeout: 20000 })
    .should('be.visible')
    .click()
})

Cypress.Commands.add('openSearchResultByTitle', (title) => {
  const key = title.split(':')[0].trim() // "AI Engineering"

  // Espera resultados existirem
  cy.get('[data-component-type="s-search-result"]', { timeout: 30000 })
    .should('exist')

  // Seleciona o primeiro card que contenha a chave
  cy.contains('[data-component-type="s-search-result"]', key, { timeout: 30000 })
    .first()
    .within(() => {
      // Pega o primeiro link que leva ao detalhe do produto (/dp/)
      cy.get('a[href*="/dp/"]', { timeout: 30000 })
        .first()
        // Evita abrir nova aba (target=_blank)
        .invoke('removeAttr', 'target')
        .click()
    })
})
