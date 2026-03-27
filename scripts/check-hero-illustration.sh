#!/usr/bin/env bash
set -euo pipefail

html="$(curl -fsS http://localhost:3000)"

echo "$html" | grep -F "/hero-wordpress.svg" >/dev/null
echo "$html" | grep -F "Illustrated WordPress workspace scene with a creator silhouette and editor screen." >/dev/null

if echo "$html" | grep -F "WordPress editor scene" >/dev/null; then
  echo "Old handcrafted hero illustration still present" >&2
  exit 1
fi

if echo "$html" | grep -F "wp-admin / page editor" >/dev/null; then
  echo "Old handcrafted editor panel still present" >&2
  exit 1
fi
