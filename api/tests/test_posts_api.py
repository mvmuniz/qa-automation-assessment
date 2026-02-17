"""
Questão 2 — Testes de API (Python + requests + pytest)

Alvo: https://jsonplaceholder.typicode.com/posts

Objetivos:
1) GET: validar status code e contrato mínimo do payload
2) POST: criar massa aleatória e validar resposta
3) Validar que o retorno do POST contém um ID (gerado pela API)
"""

from __future__ import annotations

import requests
from faker import Faker


BASE_URL = "https://jsonplaceholder.typicode.com"
POSTS_ENDPOINT = f"{BASE_URL}/posts"

fake = Faker()


def _assert_post_shape(item: dict) -> None:
    """
    Valida o contrato mínimo esperado para um 'post'.
    """
    assert isinstance(item, dict), "Item retornado não é um dict"
    required_keys = {"userId", "id", "title", "body"}
    assert required_keys.issubset(item.keys()), (
        f"Contrato inválido. Esperado conter {required_keys}, "
        f"mas retornou {set(item.keys())}"
    )


def test_get_posts_should_return_200_and_valid_structure() -> None:
    """
    GET /posts
    Validações:
    - status code 200
    - resposta é uma lista não vazia
    - primeiro item contém chaves mínimas (userId, id, title, body)
    - tipos básicos
    """
    resp = requests.get(POSTS_ENDPOINT, timeout=15)

    assert resp.status_code == 200, f"Esperado 200, obtido {resp.status_code}"

    data = resp.json()
    assert isinstance(data, list), "Resposta do GET não é uma lista"
    assert len(data) > 0, "Lista retornada está vazia"

    first = data[0]
    _assert_post_shape(first)

    # Checagens adicionais úteis (sem exagero)
    assert isinstance(first["id"], int), "Campo 'id' deveria ser int"
    assert isinstance(first["userId"], int), "Campo 'userId' deveria ser int"
    assert isinstance(first["title"], str) and first["title"].strip(), "Campo 'title' inválido"
    assert isinstance(first["body"], str) and first["body"].strip(), "Campo 'body' inválido"


def test_post_should_create_post_and_return_unique_id() -> None:
    """
    POST /posts
    Validações:
    - status code 201 (criado)
    - retorno contém 'id' gerado pela API
    - id é inteiro
    - campos enviados são refletidos na resposta
    """
    payload = {
        "userId": fake.random_int(min=1, max=10),
        "title": fake.sentence(nb_words=6),
        "body": fake.paragraph(nb_sentences=3),
    }

    resp = requests.post(POSTS_ENDPOINT, json=payload, timeout=15)

    assert resp.status_code == 201, f"Esperado 201, obtido {resp.status_code}"

    body = resp.json()
    assert isinstance(body, dict), "Resposta do POST não é um dict"

    # Validar ID "único" gerado pela API (no JSONPlaceholder normalmente retorna 101)
    assert "id" in body, "Resposta do POST não contém campo 'id'"
    assert isinstance(body["id"], int), "Campo 'id' retornado não é int"

    # Validar eco dos dados enviados (contrato típico dessa API)
    assert body.get("userId") == payload["userId"], "userId retornado difere do enviado"
    assert body.get("title") == payload["title"], "title retornado difere do enviado"
    assert body.get("body") == payload["body"], "body retornado difere do enviado"
