Questão 1 — Teste E2E (Cypress) — Amazon BR — Adicionar livro físico NOVO ao carrinho

História do usuário

Como cliente da Amazon Brasil, quero pesquisar pelo livro “AI Engineering: Building Applications with Foundation Models” e adicioná-lo ao carrinho como livro físico e novo, garantindo que é a edição em inglês e que o autor é Chip Huyen, para que eu realize a compra do item correto.

Critérios de aceite

Acessar https://www.amazon.com.br/

Pesquisar pelo texto: “AI Engineering: Building Applications with Foundation Models”

Adicionar o livro ao carrinho garantindo:

(i) Idioma: Inglês

(ii) Autor: Chip Huyen

(iii) Formato: livro físico (Capa Comum / Paperback)

(iv) Condição: Novo

Validar que a mensagem exibida é exatamente: “Adicionado ao carrinho”

Documentar história, critérios e casos de teste.

Estratégia e decisões de automação
Por que validar Autor/Idioma na página do produto (PDP) e não no carrinho

A Amazon BR nem sempre exibe no carrinho os metadados completos (idioma, autor e condição) com consistência. Esses dados ficam mais estáveis e rastreáveis na PDP, que é a fonte primária de informação do item.
Por isso, a automação:

abre o resultado do livro

valida título, autor e idioma diretamente na PDP

Isso reduz flakiness e melhora a rastreabilidade do requisito.

Por que o fluxo usa “Outros vendedores na Amazon” (painel lateral) para “Novo” + “Capa Comum”

Na Amazon, o estado “Novo/Usado” frequentemente aparece em:

lista de ofertas,

painel lateral (“Outros vendedores na Amazon”),

ou página de ofertas (offer listing)

O comportamento real observado na execução foi:

ao clicar em “Outros vendedores na Amazon”, a Amazon abre um painel lateral (side sheet / smart wagons / dynamic offers), e nem sempre um a-popover.

esse painel é o ponto onde o usuário escolhe a oferta e onde “Novo” e “Capa Comum” aparecem com consistência.

Decisão: ancorar a validação de “Novo” e “Capa Comum” no mesmo contexto onde o CTA (“Adicionar ao carrinho”) é acionado, garantindo que:

a oferta selecionada é Novo

o formato é físico (Capa Comum)

o clique em “Adicionar ao carrinho” está coerente com o requisito

Por que a pesquisa é submetida pelo botão e não por {enter}

O autocomplete/flyouts da Amazon pode interceptar Enter e gerar intermitência (foco roubado, sugestões, overlays). O submit pelo botão #nav-search-submit-button é o caminho mais estável e mais próximo do comportamento do usuário.

Como foi tratado erro de JavaScript do site

O site pode lançar exceções de front-end que não são do teste (ex.: markFeatureRenderForImageBlock is not defined).
Como isso não representa falha do fluxo funcional sob teste e derruba o Cypress, foi aplicado um filtro estrito via Cypress.on('uncaught:exception') somente para essa mensagem específica, preservando falhas reais.

Caso de teste (E2E)
CT01 — Adicionar livro físico NOVO ao carrinho e validar mensagem

Objetivo: garantir que o livro correto foi selecionado e adicionado ao carrinho como Novo e físico, validando a mensagem de confirmação.

Passos:

Acessar a página inicial da Amazon BR

Digitar o termo de busca e submeter pelo botão de busca

Abrir o primeiro resultado relevante do livro “AI Engineering…”

Validar na PDP:

Título contém “AI Engineering”

Autor contém “Chip Huyen”

Idioma contém “Inglês”

Abrir a área “Outros vendedores na Amazon” e acionar o painel lateral de ofertas

No painel:

validar presença de “Capa Comum”

validar presença de “Novo”

clicar em “Adicionar ao carrinho”

Validar que a mensagem exibida é exatamente: “Adicionado ao carrinho”

Resultado esperado:

Mensagem “Adicionado ao carrinho” exibida exatamente.

O fluxo de seleção confirma “Novo” e “Capa Comum” antes do clique no CTA.

Autor e idioma validados na PDP.

Observações de robustez (o que foi feito para reduzir flakiness)

Seletores priorizam:

id estáveis quando disponíveis (ex.: #twotabsearchtextbox, #productTitle)

e fallback por texto controlado quando necessário.

Uso de force: true apenas onde o site aplica overlays/animações (padrão em Amazon).

Submissão da busca por botão, reduzindo instabilidades do autocomplete.

Tratamento pontual (não genérico) para exceções JS do site que interrompem o Cypress.

Validações feitas em páginas/contextos onde o dado é mais confiável (PDP e painel de ofertas).