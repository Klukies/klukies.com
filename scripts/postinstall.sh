#!/usr/bin/env sh
set -e

precommit() {
  if command -v pre-commit >/dev/null; then
    if ! grep -q "https://pre-commit.com" "$(dirname "$0")/../.git/hooks/pre-commit"; then
      echo "[postinstall-local.sh] Installing git hooks (pre-commit)"
      pre-commit install
      pre-commit install --hook-type pre-push
      pre-commit install --hook-type commit-msg
    fi
  else
    read -rp "Install pre-commit and its hooks? " installPreCommit
    case "$installPreCommit" in
    y | Y | yes | YES)
      brew install pre-commit
      echo "[postinstall-local.sh] Installing git hooks (pre-commit)"
      pre-commit install
      pre-commit install --hook-type pre-push
      pre-commit install --hook-type commit-msg
      ;;
    *) ;;
    esac
  fi
}

main() {
  if [ "$NODE_ENV" = "production" ] || [ "$CI" = "true" ]; then
    echo ""
    echo "[postinstall-local.sh] CI detected. Skipping..."
    echo ""
    exit 0
  fi

  precommit
}

main
