# Prova Técnica – QA & Automação de Testes

Este repositório contém a implementação das questões propostas na prova técnica, demonstrando:

- Automação E2E Web com Cypress  
- Testes de API com Python (requests)  
- Estruturação de projeto e organização técnica  
- Documentação formal de testes  
- Preparação para integração com CI/CD  

O foco da implementação foi garantir robustez, clareza estrutural e aderência total aos critérios do enunciado.

---

## Tecnologias Utilizadas

- **Cypress** – Automação E2E (Questão 1)  
- **Python + requests** – Testes de API (Questão 2)  
- **GitHub Actions** – Pipeline CI/CD (Questão 3 – descrita em documentação)

---

## Estrutura do Projeto

```text
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
```

---

## Questão 1 – Teste E2E com Cypress

O teste automatiza o seguinte fluxo:

1. Acessa https://www.amazon.com.br/  
2. Pesquisa pelo livro  
   **"AI Engineering: Building Applications with Foundation Models"**  
3. Valida:
   - Autor: **Chip Huyen**
   - Idioma: **Inglês**
   - Formato: **Livro físico (Capa Comum)**
   - Condição: **Novo**
4. Adiciona o livro ao carrinho  
5. Valida a mensagem exibida:  
   **"Adicionado ao carrinho"**

Documentação detalhada:  
➡ `docs/questao1.md`

---

## Como Executar os Testes E2E (Cypress)

### Instalar dependências

```bash
npm install
```

### Execução modo interativo

```bash
npx cypress open
```

### Execução modo headless

```bash
npx cypress run
```

---

## Questão 2 – Teste de API (Python)

Script implementado utilizando a biblioteca `requests`.

### Executar

```bash
pip install -r requirements.txt
python api/posts_api_test.py
```

Documentação detalhada:  
➡ `docs/questao2.md`

---

## Questão 3 – CI/CD

A estratégia de integração contínua inclui:

- Execução automática via GitHub Actions  
- Disparo automático em push/pull request  
- Falha do pipeline em caso de erro  
- Possibilidade de paralelismo  

Detalhamento completo:  
➡ `docs/questao3.md`

---
---

# Questão 4 — Inteligência Artificial

A resposta completa da Questão 4 está disponível em:
➡ `docs/questao4.md`

## Resumo da Abordagem

### 1. Aspectos Avaliados em uma Aplicação Similar ao ChatGPT

Ao testar uma aplicação baseada em Large Language Models (LLMs), foram considerados os seguintes critérios:

- Coerência lógica das respostas
- Manutenção de contexto conversacional
- Aderência às instruções do prompt
- Tratamento de ambiguidades
- Ausência de alucinações factuais
- Resistência a prompt injection
- Segurança e proteção de dados
- Performance e estabilidade sob carga
- Observabilidade (logs, métricas e monitoramento)

### 2. Uso de IA em QA

Foi utilizado o ChatGPT como assistente técnico para:

- Geração inicial de casos de teste
- Criação de cenários edge case
- Sugestão de estrutura para testes automatizados (Cypress e pytest)
- Revisão e melhoria de scripts

A IA foi aplicada para acelerar a elaboração de cenários, apoiar análise de requisitos e melhorar organização da documentação.

A validação final foi sempre conduzida com análise crítica manual.

### Conclusão

A IA foi utilizada como ferramenta de apoio estratégico no processo de QA, aumentando produtividade e cobertura de testes, sem substituir responsabilidade técnica e pensamento crítico.


## Requisitos

- Node.js 18+  
- Python 3.10+  
- npm ou yarn  
- pip  

---

## Considerações Finais

A implementação foi estruturada visando:

- Clareza e organização  
- Robustez na execução  
- Manutenibilidade  
- Separação adequada entre testes E2E e API  
- Documentação formal alinhada a contexto corporativo  
