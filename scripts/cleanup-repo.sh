#!/bin/bash

# Repository Cleanup Script
# Removes unnecessary files from git tracking

set -e

echo "=========================================="
echo "Repository Cleanup"
echo "=========================================="
echo ""

# Remove build artifacts from git
echo "Removing build artifacts from git..."
git rm -r --cached server/dist/ 2>/dev/null || echo "server/dist/ already removed"

# Update .gitignore to ensure dist is ignored everywhere
echo "Updating .gitignore..."
if ! grep -q "dist/" .gitignore; then
    echo "dist/" >> .gitignore
fi

if ! grep -q "**/dist/" .gitignore; then
    echo "**/dist/" >> .gitignore
fi

# Add certbot to gitignore if not already there
if ! grep -q "certbot/" .gitignore; then
    echo "" >> .gitignore
    echo "# Certbot SSL certificates" >> .gitignore
    echo "certbot/" >> .gitignore
fi

echo "✓ Cleanup complete"
echo ""
echo "Files removed from tracking:"
echo "- server/dist/ (build artifacts)"
echo ""
echo "Updated .gitignore to ignore:"
echo "- dist/ directories"
echo "- certbot/ directory"
echo ""
echo "Next steps:"
echo "1. Review changes: git status"
echo "2. Commit cleanup: git commit -m 'Remove build artifacts and update gitignore'"
echo "3. Push changes: git push"
echo ""
