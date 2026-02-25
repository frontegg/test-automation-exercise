#!/bin/bash
set -e

REPO_URL="https://github.com/frontegg/test-automation-exercise.git"
DIR_NAME="test-automation-exercise"

echo "==> Cloning repository..."
git clone "$REPO_URL" "$DIR_NAME"

echo ""
echo "==> Done! Repository cloned to $DIR_NAME"
echo "    cd $DIR_NAME to get started"