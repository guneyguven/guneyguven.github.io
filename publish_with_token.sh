#!/usr/bin/env bash
set -euo pipefail
# Usage: GITHUB_TOKEN=ghp_xxx ./publish_with_token.sh
# This script sets the origin to use the token and pushes main branch.
if [ -z "${GITHUB_TOKEN:-}" ]; then
  echo "Set GITHUB_TOKEN environment variable with a personal access token (repo scope)."
  exit 2
fi
REPO_OWNER="guneyguven"
REPO_NAME="guneyguven.github.io"
REMOTE_URL="https://${GITHUB_TOKEN}@github.com/${REPO_OWNER}/${REPO_NAME}.git"
# update remote and push
git remote set-url origin "$REMOTE_URL"
# Push main branch
git push origin main:main
echo "Push completed (remote used token)."
