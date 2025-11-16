#!/bin/bash

# InshureIt Production Deployment Script
# This script automates the deployment process

set -e  # Exit on error

echo "================================================"
echo "InshureIt Production Deployment"
echo "================================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if .env.docker exists
if [ ! -f .env.docker ]; then
    echo -e "${RED}Error: .env.docker file not found!${NC}"
    echo "Please create .env.docker from .env.docker.example"
    exit 1
fi

echo -e "${GREEN}✓ Environment file found${NC}"
echo ""

# Load environment variables
source .env.docker

# Check if required variables are set
required_vars=("JWT_SECRET" "DB_PASSWORD" "DB_ROOT_PASSWORD")
for var in "${required_vars[@]}"; do
    if [ -z "${!var}" ]; then
        echo -e "${RED}Error: $var is not set in .env.docker${NC}"
        exit 1
    fi
done

echo -e "${GREEN}✓ Required environment variables are set${NC}"
echo ""

# Function to run database migrations
run_migrations() {
    echo "Running database migrations..."
    docker-compose --env-file .env.docker exec -T backend npx prisma db push
    echo -e "${GREEN}✓ Migrations completed${NC}"
}

# Function to seed database
seed_database() {
    echo "Seeding database..."
    docker-compose --env-file .env.docker exec -T backend npx prisma db seed
    echo -e "${GREEN}✓ Database seeded${NC}"
}

# Main deployment options
echo "Select deployment action:"
echo "1) Fresh deployment (build and start all services)"
echo "2) Update deployment (rebuild and restart services)"
echo "3) Stop services"
echo "4) View logs"
echo "5) Run database migrations only"
echo "6) Backup database"
echo ""
read -p "Enter choice [1-6]: " choice

case $choice in
    1)
        echo ""
        echo "Starting fresh deployment..."
        echo ""

        # Build images
        echo "Building Docker images..."
        docker-compose --env-file .env.docker build --no-cache
        echo -e "${GREEN}✓ Images built${NC}"
        echo ""

        # Start services
        echo "Starting services..."
        docker-compose --env-file .env.docker up -d
        echo -e "${GREEN}✓ Services started${NC}"
        echo ""

        # Wait for services to be healthy
        echo "Waiting for services to be healthy..."
        sleep 10

        # Run migrations
        run_migrations
        echo ""

        # Seed database (ask first)
        read -p "Do you want to seed the database with initial data? (y/n): " seed
        if [ "$seed" = "y" ]; then
            seed_database
        fi
        echo ""

        echo -e "${GREEN}✓ Deployment completed successfully!${NC}"
        echo ""
        echo "Services running:"
        docker-compose --env-file .env.docker ps
        echo ""
        echo "Access your application at: http://localhost:${FRONTEND_PORT}"
        echo "API available at: http://localhost:${API_PORT}"
        ;;

    2)
        echo ""
        echo "Updating deployment..."
        echo ""

        # Pull latest code (if in git repo)
        if [ -d .git ]; then
            echo "Pulling latest code..."
            git pull
            echo -e "${GREEN}✓ Code updated${NC}"
            echo ""
        fi

        # Rebuild and restart
        echo "Rebuilding images..."
        docker-compose --env-file .env.docker build
        echo -e "${GREEN}✓ Images rebuilt${NC}"
        echo ""

        echo "Restarting services..."
        docker-compose --env-file .env.docker up -d --force-recreate
        echo -e "${GREEN}✓ Services restarted${NC}"
        echo ""

        # Run migrations
        read -p "Do you want to run database migrations? (y/n): " migrate
        if [ "$migrate" = "y" ]; then
            run_migrations
        fi
        echo ""

        echo -e "${GREEN}✓ Update completed successfully!${NC}"
        ;;

    3)
        echo ""
        echo "Stopping services..."
        docker-compose --env-file .env.docker down
        echo -e "${GREEN}✓ Services stopped${NC}"
        ;;

    4)
        echo ""
        echo "Viewing logs (Ctrl+C to exit)..."
        docker-compose --env-file .env.docker logs -f
        ;;

    5)
        echo ""
        run_migrations
        echo -e "${GREEN}✓ Migrations completed${NC}"
        ;;

    6)
        echo ""
        echo "Creating database backup..."
        BACKUP_FILE="backup_$(date +%Y%m%d_%H%M%S).sql"
        docker-compose --env-file .env.docker exec -T database mysqldump -u root -p${DB_ROOT_PASSWORD} inshureit > $BACKUP_FILE
        echo -e "${GREEN}✓ Backup created: $BACKUP_FILE${NC}"
        ;;

    *)
        echo -e "${RED}Invalid choice${NC}"
        exit 1
        ;;
esac

echo ""
echo "================================================"
echo "Deployment script completed"
echo "================================================"
