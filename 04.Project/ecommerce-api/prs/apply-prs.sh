#!/usr/bin/env bash
set -euo pipefail

if [ $# -lt 1 ]; then
  echo "Uso: $0 /ruta/a/tu/repo-local"
  exit 1
fi

REPO="$1"
echo "Aplicando features al repo: $REPO"

cd "$REPO"
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || { echo "No es un repo git"; exit 1; }

BASE_BRANCH=${BASE_BRANCH:-main}
git checkout "$BASE_BRANCH"

apply_feature () {
  local NAME="$1"
  local SRC_DIR="$2"
  local BRANCH="feature/${NAME}"
  git checkout -b "$BRANCH" || git checkout "$BRANCH"
  rsync -a --exclude '.git' "${SRC_DIR}/" "./"
  git add -A
  git commit -m "feat(${NAME}): aplica paquete de cambios ${NAME}"
  echo "Listo: rama $BRANCH. Para subir: git push origin $BRANCH"
  git checkout "$BASE_BRANCH"
}

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

apply_feature "auth-roles" "$SCRIPT_DIR/01-auth-roles"
apply_feature "categories-products" "$SCRIPT_DIR/02-categories-products"
apply_feature "cart" "$SCRIPT_DIR/03-cart"
apply_feature "orders" "$SCRIPT_DIR/04-orders"
apply_feature "health-tests" "$SCRIPT_DIR/05-health-tests"
apply_feature "seeds-env-docker" "$SCRIPT_DIR/06-seeds-env-docker"
apply_feature "pagination-common" "$SCRIPT_DIR/07-pagination-common"
apply_feature "docs-postman-ci" "$SCRIPT_DIR/08-docs-postman-ci"

echo "Sugerido para PRs (GitHub CLI):"
echo "  gh pr create -B $BASE_BRANCH -H feature/auth-roles -t "Auth & Roles" -b "Implementa JWT, bcrypt, guards y cambios en users.""
echo "  gh pr create -B $BASE_BRANCH -H feature/categories-products -t "Categories & Products" -b "CRUD con role admin y paginación en products.""
echo "  gh pr create -B $BASE_BRANCH -H feature/cart -t "Cart" -b "Carrito: add/update/remove/view.""
echo "  gh pr create -B $BASE_BRANCH -H feature/orders -t "Orders" -b "Orden desde carrito, stock, /orders/me.""
echo "  gh pr create -B $BASE_BRANCH -H feature/health-tests -t "Health & Tests" -b "Endpoint /health y e2e mínimo.""
echo "  gh pr create -B $BASE_BRANCH -H feature/seeds-env-docker -t "Seeds & Env" -b "Seeds ≥10 por entidad y .env.example + docker-compose.""
echo "  gh pr create -B $BASE_BRANCH -H feature/pagination-common -t "Pagination/Common" -b "Utilidades de paginación y ajustes varios.""
echo "  gh pr create -B $BASE_BRANCH -H feature/docs-postman-ci -t "Docs, Postman & CI" -b "README, compliance y workflow Newman.""
