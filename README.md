# Prova Técnica – QA & Automação de Testes

Este repositório contém a implementação das questões propostas na prova técnica, demonstrando:

- Automação E2E Web com Cypress
- Testes de API com Python (requests)
- Estruturação de projeto e organização técnica
- Documentação formal de testes
- Preparação para CI/CD

O foco da implementação foi garantir robustez, clareza estrutural e aderência total aos critérios do enunciado.


Este repositório contém a implementação das questões propostas na prova técnica utilizando:

Cypress (Questão 1 – Teste E2E Web)

Python + Requests (Questão 2 – Teste de API)

Configuração de CI/CD com GitHub Actions (Questão 3 – descrita)

Estrutura do Projeto
cypress/
 └── e2e/
     └── amazon/
         └── add-to-cart.book.cy.js

api/
 └── posts_api_test.py

docs/
 └── questao1.md
 └── questao2.md
 └── questao3.md

Questão 1 – Teste E2E com Cypress

O teste automatiza o seguinte fluxo:

Acessa https://www.amazon.com.br/

Pesquisa pelo livro AI Engineering: Building Applications with Foundation Models

Valida:

Autor: Chip Huyen

Idioma: Inglês

Formato: Livro físico (Capa Comum)

Condição: Novo

Adiciona ao carrinho

Valida mensagem exata: “Adicionado ao carrinho”

📄 Documentação detalhada (história do usuário, critérios de aceite, decisões técnicas e casos de teste):
➡ Ver docs/questao1.md

Como executar os testes Cypress
1️⃣ Instalar dependências
npm install

2️⃣ Executar em modo interativo
npx cypress open

3️⃣ Executar em modo headless
npx cypress run

Questão 2 – Teste de API (Python)

Script implementado utilizando requests.

Executar:
pip install -r requirements.txt
python api/posts_api_test.py


📄 Documentação detalhada:
➡ Ver docs/questao2.md

Questão 3 – CI/CD

A execução automatizada dos testes é descrita em:

➡ Ver docs/questao3.md