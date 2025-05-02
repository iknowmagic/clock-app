#!/usr/bin/env zsh
# scripts/bump.zsh   usage: npm run bump:patch | bump:minor | bump:major

set -e
level=$1
[[ $level =~ ^(patch|minor|major)$ ]] || { echo "level must be patch|minor|major"; exit 1; }

# Safeguards
[[ $(git rev-parse --abbrev-ref HEAD) == "main" ]] || { echo "Switch to main first"; exit 1; }
git diff --quiet || { echo "Uncommitted changes found"; exit 1; }

# Bump version without auto-tag
npm version $level --no-git-tag-version

# Capture new version string from package.json
ver=$(node -p "require('./package.json').version")
tag="v$ver"

# Create tag & push
git tag -a $tag -m "$tag"
git push origin main tag $tag
echo "✅  Bumped to $tag and pushed."
