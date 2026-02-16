/// <reference types="cypress" />

describe("Amazon BR - Adicionar livro físico NOVO ao carrinho", () => {
  const BOOK_QUERY = "AI Engineering: Building Applications with Foundation Models";
  const EXPECTED_AUTHOR = "Chip Huyen";
  const EXPECTED_LANGUAGE = "Inglês";
  const EXPECTED_ADD_MESSAGE = "Adicionado ao carrinho";

  // Seção "Outros vendedores na Amazon"
  const OTHER_SELLERS_SECTION = "div.a-section.a-spacing-none.daodi-content";

  // Ignora erro JS do site (Amazon) que derruba o Cypress
  Cypress.on("uncaught:exception", (err) => {
    if (err.message.includes("markFeatureRenderForImageBlock is not defined")) {
      return false;
    }
    return true;
  });

  beforeEach(() => {
    cy.visit("https://www.amazon.com.br/");

    // Cookies (varia por sessão)
    cy.get("body").then(($body) => {
      if ($body.find("#sp-cc-accept").length) {
        cy.get("#sp-cc-accept").click({ force: true });
      }
    });
  });

  it("Deve buscar o livro, abrir janela lateral, validar NOVO/físico e adicionar ao carrinho", () => {
    // 0) Fecha qualquer flyout que roube foco
    cy.get("body").type("{esc}", { force: true });

    // 1) Buscar (robusto: força foco no input e submete pelo botão)
    cy.get("#twotabsearchtextbox")
      .should("exist")
      .click({ force: true })
      .clear({ force: true })
      .type(BOOK_QUERY, { delay: 10, force: true });

    cy.get("#nav-search-submit-button")
      .should("exist")
      .click({ force: true });

    // 2) Abrir resultado
    cy.contains("a", "AI Engineering", { matchCase: false })
      .first()
      .click();

    // 3) Validar título (PDP)
    cy.get("#productTitle")
      .invoke("text")
      .then((t) => t.trim())
      .should("contain", "AI Engineering");

    // 4) Validar autor (PDP)
    cy.get("body").then(($body) => {
      if ($body.find("#bylineInfo").length) {
        cy.get("#bylineInfo").should("contain", EXPECTED_AUTHOR);
      } else {
        cy.contains(EXPECTED_AUTHOR);
      }
    });

    // 5) Validar idioma (PDP)
    cy.contains(/Idioma/i);
    cy.contains(EXPECTED_LANGUAGE);

    // 6) Abrir janela lateral pelo gatilho correto (seta)
    cy.get(OTHER_SELLERS_SECTION)
      .first()
      .within(() => {
        cy.get("i.daodi-arrow-icon")
          .first()
          .closest("a")
          .click({ force: true });
      });

    // 7) Painel lateral: ancorar pelo conteúdo que você mostrou no print
    //    (evita depender de IDs que mudam)
    cy.contains(/Capa\s*Comum/i, { timeout: 20000 }).should("exist");
    cy.contains(/\bNovo\b/i, { timeout: 20000 }).should("exist");

    // 8) Pegar um container pai comum e clicar no botão "Adicionar ao carrinho" dentro dele
    //    Usamos o primeiro pai com role=dialog se existir, senão subimos alguns níveis.
    cy.contains(/Capa\s*Comum/i)
      .then(($el) => {
        const $dialog = $el.closest('[role="dialog"]');
        if ($dialog.length) {
          cy.wrap($dialog).within(() => {
            cy.contains(/Adicionar ao carrinho/i).first().click({ force: true });
          });
        } else {
          // fallback: subir na árvore e procurar o botão na área do painel
          cy.wrap($el)
            .parents()
            .then(($parents) => {
              // tenta achar um ancestor que contenha também "Novo" e o botão
              const candidate = [...$parents].find((p) => {
                const txt = p.innerText || "";
                return /Novo/i.test(txt) && /Adicionar ao carrinho/i.test(txt);
              });

              if (candidate) {
                cy.wrap(candidate).within(() => {
                  cy.contains(/Adicionar ao carrinho/i).first().click({ force: true });
                });
              } else {
                // último fallback: clicar no primeiro botão "Adicionar ao carrinho" visível no painel
                cy.contains(/Adicionar ao carrinho/i).first().click({ force: true });
              }
            });
        }
      });

    // 9) Validar mensagem exata
    cy.contains(EXPECTED_ADD_MESSAGE, { matchCase: true }).then(($el) => {
      expect($el.text().trim()).to.eq(EXPECTED_ADD_MESSAGE);
    });
  });
});
