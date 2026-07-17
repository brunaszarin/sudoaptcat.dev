#!/usr/bin/env python3
"""
Publica um post do blog a partir de um arquivo Markdown com frontmatter.

Uso:
    API_KEY=sua-chave python3 scripts/publish_post.py posts/nome-do-arquivo.md
    API_KEY=sua-chave python3 scripts/publish_post.py posts/nome-do-arquivo.md --local

Por padrão publica em produção. Use --local pra testar no backend rodando
na sua máquina (localhost:8080) antes de ir pra produção.
"""
import sys
import os
import re
import json
import urllib.request
import urllib.error

PROD_URL = "https://portfolio-backend-so6ybluhna-uc.a.run.app/api/posts"
LOCAL_URL = "http://localhost:8080/api/posts"


def parse_frontmatter(text):
    match = re.match(r"^---\s*\n(.*?)\n---\s*\n(.*)$", text, re.DOTALL)
    if not match:
        raise ValueError("Arquivo precisa começar com um bloco --- de frontmatter")

    raw_meta, body = match.groups()
    meta = {}
    for line in raw_meta.splitlines():
        if not line.strip() or ":" not in line:
            continue
        key, _, value = line.partition(":")
        key = key.strip()
        value = value.strip()

        if key == "tags":
            value = [t.strip() for t in value.strip("[]").split(",") if t.strip()]
        elif key == "published":
            value = value.lower() == "true"
        elif value == "":
            value = None

        meta[key] = value

    return meta, body.strip()


def main():
    if len(sys.argv) < 2:
        print("Uso: python3 scripts/publish_post.py posts/arquivo.md [--local]")
        sys.exit(1)

    filepath = sys.argv[1]
    use_local = "--local" in sys.argv
    url = LOCAL_URL if use_local else PROD_URL

    api_key = os.environ.get("API_KEY")
    if not api_key:
        print("Faltou a variável de ambiente API_KEY. Roda assim:")
        print("  API_KEY=sua-chave python3 scripts/publish_post.py posts/arquivo.md")
        sys.exit(1)

    with open(filepath, encoding="utf-8") as f:
        text = f.read()

    meta, content = parse_frontmatter(text)

    required = ["title", "slug", "excerpt"]
    missing = [k for k in required if not meta.get(k)]
    if missing:
        print(f"Faltam campos obrigatórios no frontmatter: {', '.join(missing)}")
        sys.exit(1)

    payload = {
        "title": meta["title"],
        "slug": meta["slug"],
        "excerpt": meta["excerpt"],
        "content": content,
        "coverImage": meta.get("coverImage"),
        "tags": meta.get("tags", []),
        "published": meta.get("published", False),
    }

    print(f"Publicando '{payload['title']}' em {'LOCAL' if use_local else 'PRODUÇÃO'}...")
    print(f"  slug: {payload['slug']}")
    print(f"  published: {payload['published']}")

    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=data,
        method="POST",
        headers={
            "Content-Type": "application/json",
            "X-API-Key": api_key,
        },
    )

    try:
        with urllib.request.urlopen(req) as response:
            result = json.loads(response.read())
            print(f"\n✓ Post criado com sucesso! id={result['id']}, slug={result['slug']}")
    except urllib.error.HTTPError as e:
        body = e.read().decode()
        print(f"\n✗ Erro {e.code}: {body}")
        sys.exit(1)


if __name__ == "__main__":
    main()
