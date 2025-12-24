git push origin main:main
echo "Push completed (remote used token)."
#!/usr/bin/env bash
set -euo pipefail
# Usage: GITHUB_TOKEN=ghp_xxx ./publish_with_token.sh
# This script finds the git repository root (walking up from the script
# location), temporarily sets the `origin` URL to include the provided
# token, pushes the `main` branch, and restores the original remote URL.
if [ -z "${GITHUB_TOKEN:-}" ]; then
  echo "Set GITHUB_TOKEN environment variable with a personal access token (repo scope)."
  exit 2
fi

REPO_OWNER="guneyguven"
REPO_NAME="guneyguven.github.io"

# find repository root by walking up from script location
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CUR="$SCRIPT_DIR"
while [ ! -d "$CUR/.git" ] && [ "$CUR" != "/" ]; do
  CUR="$(dirname "$CUR")"
done
if [ ! -d "$CUR/.git" ]; then
  echo "Could not find git repository root (no .git directory found). Run from inside the repo."
  exit 3
fi
REPO_ROOT="$CUR"

REMOTE_URL="https://${GITHUB_TOKEN}@github.com/${REPO_OWNER}/${REPO_NAME}.git"

# backup original remote url
ORIG_URL="$(git -C "$REPO_ROOT" config --get remote.origin.url || true)"

echo "Using repository root: $REPO_ROOT"
echo "Temporarily updating remote origin to use provided token and pushing main branch..."

git -C "$REPO_ROOT" remote set-url origin "$REMOTE_URL"
git -C "$REPO_ROOT" push origin main:main

# restore remote
if [ -n "$ORIG_URL" ]; then
  git -C "$REPO_ROOT" remote set-url origin "$ORIG_URL"
else
  git -C "$REPO_ROOT" remote remove origin || true
fi

echo "Push completed and remote restored."
