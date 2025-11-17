#!/bin/bash

# Update production configuration for domain access

set -e

echo "=========================================="
echo "Updating Domain Configuration"
echo "=========================================="
echo ""

# Update .env.docker to include domain names
echo "Updating environment configuration..."

# Backup existing file
cp .env.docker .env.docker.backup

# Update VITE_API_URL to use domain instead of IP
sed -i 's|VITE_API_URL=http://.*:5001|VITE_API_URL=http://inshureit.com:5001|g' .env.docker

# Update ALLOWED_ORIGINS to include all domain variations
sed -i 's|ALLOWED_ORIGINS=.*|ALLOWED_ORIGINS=http://inshureit.com,http://www.inshureit.com,http://130.162.177.108,http://localhost|g' .env.docker

echo "✓ Configuration updated"
echo ""

# Show what changed
echo "New configuration:"
cat .env.docker | grep -E "VITE_API_URL|ALLOWED_ORIGINS"
echo ""

# Rebuild frontend with new API URL
echo "Rebuilding frontend with domain configuration..."
docker-compose --env-file .env.docker build frontend
echo "✓ Frontend rebuilt"
echo ""

# Restart services
echo "Restarting services..."
docker-compose --env-file .env.docker up -d
echo "✓ Services restarted"
echo ""

echo "=========================================="
echo "Update Complete!"
echo "=========================================="
echo ""
echo "You can now access your application at:"
echo "  http://inshureit.com"
echo "  http://www.inshureit.com"
echo ""
echo "API available at:"
echo "  http://inshureit.com:5001"
echo ""
echo "Note: Clear your browser cache if needed (Ctrl+Shift+R)"
echo ""
