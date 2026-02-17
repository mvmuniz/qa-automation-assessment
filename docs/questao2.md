# Questão 2 – Testes de API (Python + pytest + requests)

## Objetivo

Testar a API pública https://jsonplaceholder.typicode.com/posts validando comportamento funcional, estrutura de resposta e contrato mínimo da API.

Foram implementados testes automatizados para:

- Realizar requisição GET no endpoint /posts
- Realizar requisição POST no endpoint /posts com massa de dados dinâmica
- Validar status codes
- Validar estrutura e tipos dos campos retornados
- Confirmar que o POST retorna um ID gerado pela API

---

## Stack Utilizada

- Python 3.11+
- pytest
- requests
- faker

O pytest foi escolhido por ser padrão de mercado, permitir organização adequada dos testes e facilitar integração com pipelines CI/CD. O requests foi utilizado como cliente HTTP direto, mantendo o teste simples e objetivo. O faker foi utilizado para geração de massa dinâmica, evitando dados fixos e aumentando robustez.

---

## Estratégia de Teste

Mesmo sendo uma API pública mock (JSONPlaceholder), os testes foram estruturados como se estivessem validando uma API real em produção.

A estratégia adotada inclui:

- Validação explícita de status code
- Validação de estrutura mínima (contrato)
- Validação de tipagem básica dos campos
- Testes independentes
- Timeout explícito nas requisições
- Massa de dados dinâmica no POST

---

## Cenário 1 – GET /posts

Validações aplicadas:

- Status code 200
- Resposta é do tipo lista
- Lista não está vazia
- Cada item contém as chaves obrigatórias:
  - userId
  - id
  - title
  - body
- id é inteiro
- userId é inteiro
- title é string não vazia
- body é string não vazia

Objetivo: garantir contrato mínimo e consistência estrutural do endpoint.

---

## Cenário 2 – POST /posts

Validações aplicadas:

- Status code 201
- Resposta contém campo id
- id retornado é inteiro
- userId retornado corresponde ao enviado
- title retornado corresponde ao enviado
- body retornado corresponde ao enviado

A massa de dados é gerada dinamicamente com Faker, garantindo maior realismo e evitando dependência de valores estáticos.

---

## Estrutura do Projeto

api/
  tests/
    test_posts_api.py

requirements.txt

---

## Como Executar Localmente

1. Criar ambiente virtual na raiz do projeto:

py -3.11 -m venv .venv

2. Ativar o ambiente (PowerShell):

.\.venv\Scripts\Activate.ps1

Caso necessário liberar execução:

Set-ExecutionPolicy -Scope CurrentUser RemoteSigned

3. Instalar dependências:

python -m pip install --upgrade pip
python -m pip install -r requirements.txt

4. Executar os testes:

python -m pytest -v

---

## Observação Técnica

A API JSONPlaceholder simula persistência de dados. O ID retornado no POST é mockado pela própria API, porém o teste valida corretamente:

- Existência do campo id
- Tipo inteiro do id
- Integridade do contrato de retorno

---

## Resultado Esperado

Execução com dois testes:

- test_get_posts_should_return_200_and_valid_structure
- test_post_should_create_post_and_return_unique_id

Saída esperada:

2 passed
