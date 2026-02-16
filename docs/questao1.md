# Questão 1 — Teste E2E (Cypress)  
## Amazon BR — Adicionar livro físico NOVO ao carrinho

---

## História do Usuário

Como cliente da Amazon Brasil,  
quero pesquisar pelo livro:

AI Engineering: Building Applications with Foundation Models

e adicioná-lo ao carrinho como livro físico e novo, garantindo que:

- É a edição em inglês
- O autor é Chip Huyen

para que eu realize a compra do item correto.

---

## Critérios de Aceite

1. Acessar a URL:
   https://www.amazon.com.br/

2. No campo de busca (#twotabsearchtextbox), digitar EXATAMENTE o texto:

   AI Engineering: Building Applications with Foundation Models

3. Submeter a busca clicando no botão:
   #nav-search-submit-button

4. Abrir o resultado correspondente ao livro:

   AI Engineering: Building Applications with Foundation Models

5. Validar na PDP (Product Detail Page):

   - Título contém:
     AI Engineering

   - Autor contém:
     Chip Huyen

   - Idioma contém:
     Inglês

6. Acessar a seção:
   Outros vendedores na Amazon

7. No painel lateral de ofertas (side sheet):

   - Validar presença de:
     Capa Comum

   - Validar presença de:
     Novo

   - Clicar em:
     Adicionar ao carrinho

8. Validar que a mensagem exibida é EXATAMENTE:

   Adicionado ao carrinho

---

# Estratégia e Decisões de Automação

## Validação de Autor e Idioma na PDP

A validação de:

- Autor
- Idioma

é feita diretamente na PDP porque:

- O carrinho não exibe metadados completos com consistência.
- A PDP é a fonte primária de informação do produto.
- Reduz flakiness e aumenta rastreabilidade do requisito.

---

## Uso do Painel "Outros vendedores na Amazon"

A condição (Novo/Usado) e o formato (Capa Comum) aparecem de forma consistente no painel lateral de ofertas.

Decisão:

Validar "Novo" e "Capa Comum" no mesmo contexto onde o botão "Adicionar ao carrinho" é acionado.

Isso garante coerência entre:

- Oferta selecionada
- Condição do produto
- Formato físico
- Ação executada

---

## Submissão da Busca pelo Botão

A busca é submetida pelo botão:

#nav-search-submit-button

Motivo:

O Enter pode ser interceptado pelo autocomplete da Amazon, gerando instabilidade (overlays, foco roubado, sugestões dinâmicas).

---

## Tratamento de Exceção JavaScript do Site

Erro identificado:

markFeatureRenderForImageBlock is not defined

Esse erro é interno do site e não representa falha funcional do fluxo.

Foi aplicado filtro específico via:

Cypress.on('uncaught:exception')

Apenas para essa mensagem exata, preservando falhas reais.

---

# Caso de Teste E2E

## CT01 — Adicionar livro físico NOVO ao carrinho e validar mensagem

### Objetivo

Garantir que o livro correto foi:

- Identificado
- Validado
- Selecionado como Novo
- Selecionado como Capa Comum
- Adicionado ao carrinho

com validação da mensagem final.

---

## Passos

1. Acessar Amazon BR  
2. Buscar pelo texto completo do livro  
3. Abrir resultado correspondente  
4. Validar título, autor e idioma na PDP  
5. Abrir painel "Outros vendedores na Amazon"  
6. Validar "Novo" e "Capa Comum"  
7. Clicar em "Adicionar ao carrinho"  
8. Validar mensagem exata:  
   Adicionado ao carrinho

---

## Resultado Esperado

- Mensagem exibida exatamente:
  Adicionado ao carrinho

- Autor validado: Chip Huyen  
- Idioma validado: Inglês  
- Formato validado: Capa Comum  
- Condição validada: Novo  

---

## Medidas de Robustez

- Priorização de IDs estáveis:
  - #twotabsearchtextbox
  - #productTitle

- Uso de force: true apenas quando necessário (overlays)

- Submissão via botão (evita interferência do autocomplete)

- Tratamento pontual de exceção JS

- Validações feitas na PDP e no painel de ofertas (contextos mais confiáveis)
