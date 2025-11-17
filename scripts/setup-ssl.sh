#!/bin/bash

# SSL Setup Script for InshureIt Production
# This script sets up Let's Encrypt SSL certificates and configures HTTPS

set -e

echo "=========================================="
echo "InshureIt SSL Setup"
echo "=========================================="
echo ""

# Check if .env.docker exists
if [ ! -f .env.docker ]; then
    echo "Error: .env.docker file not found!"
    exit 1
fi

# Update environment file for HTTPS
echo "Updating environment configuration for HTTPS..."
sed -i 's|VITE_API_URL=http://.*|VITE_API_URL=https://api.inshureit.com|g' .env.docker
sed -i 's|ALLOWED_ORIGINS=.*|ALLOWED_ORIGINS=https://inshureit.com,https://www.inshureit.com|g' .env.docker

echo "✓ Environment updated"
echo ""

# Create directories for certbot
echo "Creating SSL certificate directories..."
mkdir -p certbot/conf
mkdir -p certbot/www

echo "✓ Directories created"
echo ""

# Get email for Let's Encrypt
read -p "Enter your email address for Let's Encrypt notifications: " EMAIL

if [ -z "$EMAIL" ]; then
    echo "Error: Email is required"
    exit 1
fi

echo ""
echo "=========================================="
echo "Step 1: Obtaining SSL Certificates"
echo "=========================================="
echo ""

# Stop existing containers
echo "Stopping existing containers..."
docker-compose --env-file .env.docker down 2>/dev/null || true

# Start nginx and certbot temporarily for certificate generation
echo "Starting nginx for certificate validation..."
docker-compose -f docker-compose.ssl.yml --env-file .env.docker up -d nginx

# Wait for nginx to start
sleep 5

# Get certificates
echo "Requesting SSL certificates from Let's Encrypt..."
docker-compose -f docker-compose.ssl.yml --env-file .env.docker run --rm certbot certonly \
    --webroot \
    --webroot-path /var/www/certbot \
    --email $EMAIL \
    --agree-tos \
    --no-eff-email \
    -d inshureit.com \
    -d www.inshureit.com \
    -d api.inshureit.com

echo "✓ SSL certificates obtained"
echo ""

echo "=========================================="
echo "Step 2: Rebuilding Frontend with HTTPS"
echo "=========================================="
echo ""

# Rebuild frontend with HTTPS API URL
docker-compose -f docker-compose.ssl.yml --env-file .env.docker build --no-cache frontend

echo "✓ Frontend rebuilt"
echo ""

echo "=========================================="
echo "Step 3: Starting All Services with SSL"
echo "=========================================="
echo ""

# Stop temporary nginx
docker-compose -f docker-compose.ssl.yml --env-file .env.docker down

# Start all services
docker-compose -f docker-compose.ssl.yml --env-file .env.docker up -d

echo "✓ All services started"
echo ""

echo "=========================================="
echo "SSL Setup Complete!"
echo "=========================================="
echo ""
echo "Your application is now secured with HTTPS:"
echo "  Frontend: https://inshureit.com"
echo "  Frontend: https://www.inshureit.com"
echo "  API:      https://api.inshureit.com"
echo ""
echo "SSL certificates will auto-renew every 12 hours."
echo ""
echo "IMPORTANT: Make sure DNS is configured:"
echo "  inshureit.com     → 130.162.177.108"
echo "  www.inshureit.com → 130.162.177.108"
echo "  api.inshureit.com → 130.162.177.108"
echo ""
echo "To view logs: docker-compose -f docker-compose.ssl.yml logs -f"
echo ""
