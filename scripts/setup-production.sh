#!/bin/bash

# Simple Production Setup Script
# This script will set up everything automatically

set -e

echo "=========================================="
echo "InshureIt Production Setup"
echo "=========================================="
echo ""

# Generate JWT secret
echo "Generating secure JWT secret..."
JWT_SECRET=$(openssl rand -hex 64)

# Get server IP
echo "Detecting server IP..."
SERVER_IP=$(curl -s ifconfig.me)
echo "Server IP: $SERVER_IP"
echo ""

# Create .env.docker file
echo "Creating environment configuration..."
cat > .env.docker <<EOF
NODE_ENV=production
DB_ROOT_PASSWORD=InshureDB2024!Root
DB_USER=inshureit
DB_PASSWORD=InshureDB2024!Password
DB_PORT=3306
API_PORT=5001
FRONTEND_PORT=80
VITE_API_URL=http://${SERVER_IP}:5001
JWT_SECRET=${JWT_SECRET}
JWT_EXPIRATION=7d
ALLOWED_ORIGINS=http://${SERVER_IP},http://localhost
SMTP_HOST=
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=
SMTP_PASS=
EMAIL_FROM=info@inshureit.com
BCRYPT_ROUNDS=12
EOF

echo "✓ Environment file created"
echo ""

# Stop and remove existing containers
echo "Cleaning up existing containers..."
docker-compose down -v 2>/dev/null || true
echo "✓ Cleanup complete"
echo ""

# Build and start services
echo "Building and starting services (this may take a few minutes)..."
docker-compose --env-file .env.docker build --no-cache
docker-compose --env-file .env.docker up -d
echo "✓ Services started"
echo ""

# Wait for services to be ready
echo "Waiting for services to be ready..."
sleep 30

# Check if backend is running
echo "Checking backend status..."
for i in {1..10}; do
    if docker exec inshureit-api node -e "console.log('OK')" 2>/dev/null; then
        echo "✓ Backend is running"
        break
    fi
    if [ $i -eq 10 ]; then
        echo "ERROR: Backend is not starting properly"
        echo "Checking logs..."
        docker logs inshureit-api --tail=20
        exit 1
    fi
    echo "  Waiting... ($i/10)"
    sleep 5
done
echo ""

# Run database migrations
echo "Running database migrations..."
docker exec inshureit-api npx prisma db push
echo "✓ Migrations complete"
echo ""

# Seed database
echo "Creating admin user..."
docker exec inshureit-api node prisma/seed.js
echo "✓ Admin user created"
echo ""

echo "=========================================="
echo "Setup Complete!"
echo "=========================================="
echo ""
echo "Your application is ready:"
echo "  Frontend: http://${SERVER_IP}"
echo "  API:      http://${SERVER_IP}:5001"
echo ""
echo "Admin Login:"
echo "  Email:    admin@inshureit.com"
echo "  Password: Admin@123"
echo ""
echo "IMPORTANT: Change the admin password after first login!"
echo ""
echo "To view logs: docker-compose logs -f"
echo "To stop:      docker-compose down"
echo ""
