#!/bin/bash

# Clean Git History Script
# Removes Claude Code references from commit messages

set -e

echo "=========================================="
echo "Git History Cleanup"
echo "=========================================="
echo ""
echo "WARNING: This will rewrite git history!"
echo "Only proceed if you haven't shared this repository with others."
echo ""
read -p "Do you want to continue? (yes/no): " CONFIRM

if [ "$CONFIRM" != "yes" ]; then
    echo "Aborted."
    exit 1
fi

echo ""
echo "Creating backup branch..."
git branch backup-before-cleanup 2>/dev/null || echo "Backup branch already exists"

echo "Cleaning commit messages..."

# Use filter-branch to remove Claude references
git filter-branch --msg-filter '
    sed -e "/🤖 Generated with/d" \
        -e "/Co-Authored-By: Claude/d" \
        -e "/claude.com\/claude-code/d"
' --force -- --all

echo ""
echo "✓ Commit messages cleaned"
echo ""
echo "Cleaning refs..."
rm -rf .git/refs/original/

echo "Garbage collection..."
git reflog expire --expire=now --all
git gc --prune=now --aggressive

echo ""
echo "=========================================="
echo "Cleanup Complete!"
echo "=========================================="
echo ""
echo "Backup created at branch: backup-before-cleanup"
echo ""
echo "Next steps:"
echo "1. Review git log to verify changes"
echo "2. Force push to remote: git push origin main --force"
echo ""
echo "IMPORTANT: If others have cloned this repo, they will need to re-clone"
echo ""
