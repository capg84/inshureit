#!/bin/bash
# Database backup script for InshureIt production
# Usage: ./scripts/backup-db.sh

set -e  # Exit on error

BACKUP_DIR="/home/ubuntu/backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/inshureit_backup_$TIMESTAMP.sql"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo "======================================="
echo "InshureIt Database Backup"
echo "======================================="
echo "Timestamp: $TIMESTAMP"
echo ""

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

# Get database password from .env file
if [ -f .env ]; then
    export $(cat .env | grep DB_ROOT_PASSWORD | xargs)
else
    echo -e "${RED}✗ Error: .env file not found${NC}"
    exit 1
fi

if [ -z "$DB_ROOT_PASSWORD" ]; then
    echo -e "${RED}✗ Error: DB_ROOT_PASSWORD not set in .env${NC}"
    exit 1
fi

# Create backup
echo "Creating database backup..."
docker exec inshureit-db mysqldump -u root -p"$DB_ROOT_PASSWORD" inshureit > $BACKUP_FILE

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Backup created: $BACKUP_FILE${NC}"

    # Compress backup
    gzip $BACKUP_FILE
    echo -e "${GREEN}✓ Compressed: $BACKUP_FILE.gz${NC}"

    # Show backup size
    BACKUP_SIZE=$(du -h "$BACKUP_FILE.gz" | cut -f1)
    echo "  Size: $BACKUP_SIZE"

    # Keep only last 7 backups
    echo ""
    echo "Cleaning up old backups (keeping last 7)..."
    ls -t $BACKUP_DIR/inshureit_backup_*.sql.gz 2>/dev/null | tail -n +8 | xargs rm -f 2>/dev/null || true

    # List current backups
    echo ""
    echo "Current backups:"
    ls -lh $BACKUP_DIR/inshureit_backup_*.sql.gz 2>/dev/null | tail -7 || echo "  (none found)"

    echo ""
    echo -e "${GREEN}=======================================${NC}"
    echo -e "${GREEN}Backup completed successfully!${NC}"
    echo -e "${GREEN}=======================================${NC}"
    exit 0
else
    echo -e "${RED}✗ Backup failed!${NC}"
    exit 1
fi
