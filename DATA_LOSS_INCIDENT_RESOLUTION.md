# Production Data Loss Incident - Resolution Report
**Date:** November 30, 2025
**Status:** ✅ RESOLVED - Admin access restored

---

## Summary
Production database lost all user data during deployment on Nov 29, 2025. Admin account was successfully restored by re-seeding the database.

---

## Timeline of Events

### Before Nov 29
- ✅ Production database had users (admin successfully logged in last week)
- ✅ Application was functioning normally

### Nov 29, 2025 - Deployment Day
**What we deployed:** Password reset feature for backoffice users

**Deployment commands executed:**
```bash
cd ~/inshureit
git pull origin main
docker-compose -f docker-compose.ssl.yml down
docker-compose -f docker-compose.ssl.yml up -d --build
```

**Result:** Database structure remained intact, but all user data was lost.

### Nov 30, 2025 - Discovery & Resolution
- Discovered database had 0 users
- Investigated volume configuration and database files
- Found database files existed but tables were empty
- **Resolution:** Re-seeded database and reset admin password

---

## Root Cause Analysis

### What Happened
The database volume (`inshureit_mysql_data`) was properly configured and persistent, but the user data was lost during the container rebuild.

### Most Likely Cause
One of the following occurred during deployment:
1. **Prisma migration auto-run** - Though not explicitly configured, migrations may have been triggered
2. **Database initialization during first connection** - New Prisma client may have recreated schema
3. **Volume mounted to wrong path briefly** - Causing MySQL to initialize fresh database

### Evidence
- Database files dated **Nov 26 01:23** (original creation)
- `users.ibd` file was 176KB (suggesting it once had data)
- MySQL showed table with 0 rows and only 16KB data length
- Mismatch suggests table was recreated/truncated after Nov 26

---

## Resolution Steps Taken

### 1. Investigation (Nov 30 morning)
✅ Verified local repository structure (no duplicate files)
✅ Checked production environment configuration
✅ Inspected Docker volumes
✅ Connected to MySQL and verified tables exist but are empty
✅ Confirmed database files exist on disk but show as empty in MySQL

### 2. Recovery (Nov 30)
✅ Ran database seed script:
```bash
docker exec -it inshureit-api node prisma/seed.js
```

✅ Created admin user:
- Email: admin@inshureit.com
- Initial password: Admin@123

✅ Updated password to production password:
```bash
docker exec inshureit-api node -e "const { PrismaClient } = require('@prisma/client'); const bcrypt = require('bcryptjs'); const prisma = new PrismaClient(); (async () => { const hash = await bcrypt.hash('zifpuw-wyvpin-4toWqi', 12); await prisma.user.update({ where: { email: 'admin@inshureit.com' }, data: { password: hash, mustChangePassword: false } }); console.log('✓ Password updated'); await prisma.\$disconnect(); })()"
```

✅ Verified login works: https://inshureit.com/backoffice/login

---

## Prevention Strategy - How to Avoid This in Future

### 1. Database Backup Before Deployments

**Create backup script** (`scripts/backup-db.sh`):
```bash
#!/bin/bash
# Database backup script
BACKUP_DIR="/home/ubuntu/backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/inshureit_backup_$TIMESTAMP.sql"

mkdir -p $BACKUP_DIR

echo "Creating database backup..."
docker exec inshureit-db mysqldump -u root -p'$DB_ROOT_PASSWORD' inshureit > $BACKUP_FILE

if [ $? -eq 0 ]; then
    echo "✓ Backup created: $BACKUP_FILE"
    gzip $BACKUP_FILE
    echo "✓ Compressed: $BACKUP_FILE.gz"

    # Keep only last 7 backups
    ls -t $BACKUP_DIR/inshureit_backup_*.sql.gz | tail -n +8 | xargs rm -f
else
    echo "✗ Backup failed!"
    exit 1
fi
```

**Usage before deployment:**
```bash
./scripts/backup-db.sh
git pull origin main
docker-compose -f docker-compose.ssl.yml up -d --build
```

### 2. Safer Deployment Process

**New deployment procedure:**

```bash
# 1. SSH to production
ssh -i ~/.ssh/oracle_inshureit ubuntu@130.162.177.108
cd ~/inshureit

# 2. BACKUP DATABASE
./scripts/backup-db.sh

# 3. Pull latest code
git pull origin main

# 4. Update environment if needed
cp .env.docker .env  # Only if .env.docker changed

# 5. Rebuild containers (WITHOUT docker-compose down)
docker-compose -f docker-compose.ssl.yml up -d --build

# 6. Verify deployment
docker-compose ps
docker-compose logs --tail=20 backend
docker-compose logs --tail=20 frontend

# 7. Test login
# Visit https://inshureit.com/backoffice/login
```

**Key difference:** Use `docker-compose up -d --build` instead of `down && up`. This rebuilds containers without stopping the database, preserving data.

### 3. Database Restore Procedure

If data loss occurs, restore from backup:
```bash
# Extract backup
gunzip /home/ubuntu/backups/inshureit_backup_YYYYMMDD_HHMMSS.sql.gz

# Restore to database
docker exec -i inshureit-db mysql -u root -p'$DB_ROOT_PASSWORD' inshureit < /home/ubuntu/backups/inshureit_backup_YYYYMMDD_HHMMSS.sql

# Verify
docker exec -it inshureit-db mysql -u inshureit -p'$DB_PASSWORD' -e "USE inshureit; SELECT COUNT(*) FROM users;"
```

### 4. Automated Daily Backups

Add to crontab on production server:
```bash
# Edit crontab
crontab -e

# Add daily backup at 2 AM
0 2 * * * /home/ubuntu/inshureit/scripts/backup-db.sh >> /home/ubuntu/backups/backup.log 2>&1
```

### 5. Volume Backup

Additionally backup the entire volume:
```bash
# Backup volume data
sudo tar -czf /home/ubuntu/backups/mysql_volume_$(date +%Y%m%d).tar.gz -C /var/lib/docker/volumes/inshureit_mysql_data/_data .
```

---

## Updated Deployment Checklist

**Before Every Deployment:**
- [ ] Create database backup
- [ ] Test changes in local/staging environment
- [ ] Review what migrations (if any) will run
- [ ] Ensure `.env` file has all required variables

**During Deployment:**
- [ ] Use `docker-compose up -d --build` (NOT `down && up`)
- [ ] Monitor logs during deployment
- [ ] Check container health status

**After Deployment:**
- [ ] Verify all containers are healthy
- [ ] Test critical functionality (login, key features)
- [ ] Check database has data
- [ ] Monitor logs for errors

---

## Lessons Learned

1. ✅ **Always backup before deployments** - Database backups are critical
2. ✅ **Don't use `docker-compose down` unless necessary** - It can cause data loss
3. ✅ **Verify data after deployments** - Check that database still has records
4. ✅ **Have a recovery plan** - Know how to restore from backups or re-seed
5. ✅ **Monitor volume configuration** - Ensure volumes are persistent

---

## Current Production Status

**Database:**
- ✅ MySQL container: `inshureit-db` (healthy)
- ✅ Volume: `inshureit_mysql_data` (persistent)
- ✅ Admin user exists and is accessible
- ⚠️ **Only admin user exists** - previous user data was lost

**Admin Credentials:**
- Email: `admin@inshureit.com`
- Password: `zifpuw-wyvpin-4toWqi`
- Login URL: https://inshureit.com/backoffice/login

**What Was Lost:**
- Any additional users created after initial deployment
- Any quotes, downloads, or other data created by users
- Historical data (if any existed)

**What Was Preserved:**
- Application code and features
- Docker volume configuration
- SSL certificates
- Environment configuration

---

## Action Items

### Immediate (Today)
- [x] Restore admin access ✅ DONE
- [ ] Create backup script
- [ ] Run first manual backup
- [ ] Update deployment documentation

### This Week
- [ ] Set up automated daily backups (cron job)
- [ ] Test backup and restore procedure
- [ ] Document any other users that need to be recreated
- [ ] Consider implementing database replication for high availability

### Future Improvements
- [ ] Set up monitoring/alerts for database issues
- [ ] Implement staging environment for testing deployments
- [ ] Consider managed database service (AWS RDS, etc.) for automatic backups
- [ ] Add database health checks to deployment process

---

## Contact Information

**If Data Loss Occurs Again:**
1. Don't panic
2. Stop all deployments immediately
3. Check if backup exists: `ls -lh /home/ubuntu/backups/`
4. Restore from most recent backup
5. If no backup: re-run seed script as documented above

**Documentation Files:**
- This file: `DATA_LOSS_INCIDENT_RESOLUTION.md`
- Investigation: `PASSWORD_RESET_PRODUCTION_ISSUE.md`
- Deployment guide: `DEPLOYMENT_QUICK_REFERENCE.md`

---

**Incident closed:** Nov 30, 2025
**Resolution time:** ~2 hours
**Data recovered:** Partial (admin user recreated, historical data lost)
**Prevention measures:** Documented and ready to implement
