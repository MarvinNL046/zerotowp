#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${1:-http://127.0.0.1:3100}"

routes=(
  "/"
  "/wordpress-statistics-2026"
  "/favicon.ico"
)

failures=0

for route in "${routes[@]}"; do
  status="$(curl -sS -o /dev/null -w '%{http_code}' "${BASE_URL}${route}")"
  echo "${route} -> ${status}"

  if [[ "${status}" == "500" ]]; then
    failures=$((failures + 1))
  fi
done

if (( failures > 0 )); then
  echo "Public routes returned ${failures} server error(s)." >&2
  exit 1
fi
