# Questão 3 – CI/CD com GitHub Actions

## Objetivo

Implementar integração contínua para execução automática dos testes de API (pytest) e testes E2E Web (Cypress) a cada push na branch main, garantindo validação contínua do projeto.

## Estratégia

Foi configurado um workflow no GitHub Actions com dois jobs independentes executados em paralelo:

- API – pytest
- Web – Cypress

O pipeline é disparado automaticamente nos seguintes eventos:

- Push na branch main
- Pull Request para a branch main

Ambiente de execução:

- ubuntu-latest

## Localização do Workflow

.github/workflows/ci.yml

## Conteúdo do Arquivo ci.yml

```yaml
name: CI

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

jobs:
  api-tests:
    name: API - pytest
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-python@v5
        with:
          python-version: "3.11"

      - name: Install dependencies
        run: |
          python -m pip install --upgrade pip
          pip install -r requirements.txt

      - name: Run pytest
        run: pytest api/tests -v

  web-tests:
    name: Web - Cypress
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: npm install

      - name: Run Cypress
        run: npx cypress run


## Job 1 – API (pytest)

### Ambiente

Python 3.11

Dependências instaladas via requirements.txt

### Execução

pytest api/tests -v

### Critério de Falha

Exit code 0 → sucesso

Exit code diferente de 0 → falha

O GitHub Actions interpreta automaticamente códigos diferentes de zero como falha do job.

## Job 2 – Web (Cypress)

### Ambiente

Node 20

Dependências instaladas via npm install

### Execução

npx cypress run

O Cypress executa em modo headless no ambiente Linux do runner.

### Critério de Falha

Qualquer falha nos testes retorna código diferente de 0, interrompendo o pipeline.

## Fluxo de Execução

Push / Pull Request  
↓  
GitHub Actions  
↓  
Execução Paralela  
├── API - pytest  
└── Web - Cypress  
↓  
Pipeline Success ou Failure  

## Benefícios Técnicos

Execução automática a cada alteração  

Prevenção de regressões  

Ambiente isolado e reproduzível  

Separação clara entre testes de API e E2E  

Aderência às boas práticas modernas de CI/CD  

## Conclusão

A integração contínua foi implementada com execução automatizada dos testes de API e E2E Web, garantindo validação contínua do projeto e alinhamento com padrões profissionais de engenharia de software.
