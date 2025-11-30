# Production Password Reset Issue - Investigation Log
**Date:** November 30, 2025
**Status:** ⚠️ CRITICAL - Production database has NO users

## Summary
Attempted to reset admin password on production but discovered the production database is **completely empty** - zero users exist despite the application working until yesterday.

---

## What We Were Trying to Do
1. Reset admin password locally to: `zifpuw-wyvpin-4toWqi` ✅ (completed)
2. Update admin password on production to: `zifpuw-wyvpin-4toWqi` ❌ (blocked by empty database)

---

## Critical Discovery

### Production Database is Empty
```sql
mysql> SELECT COUNT(*) FROM users;
+----------+
| COUNT(*) |
+----------+
|        0 |
+----------+
```

**This is NOT normal** - the user confirmed the admin user was working before yesterday's deployment.

### Database Structure Exists But No Data
- ✅ Database `inshureit` exists
- ✅ All tables exist: `users`, `quotes`, `downloads`, `password_reset_tokens`, etc.
- ❌ **All tables are EMPTY** - no user data

### Timeline
- **Before Nov 29**: Admin user existed and was working
- **Nov 29**: Deployed password reset feature with `docker-compose -f docker-compose.ssl.yml up -d --build`
- **Nov 30**: Discovered database is empty

---

## Investigation Steps Completed

### 1. Verified Local Repository Structure ✅
- ✅ No duplicate files
- ✅ No `server/client/` directory (cleaned up from earlier mistake)
- ✅ Password reset files in correct locations:
  - `client/src/pages/backoffice/ForgotPasswordPage.tsx`
  - `client/src/pages/backoffice/ResetPasswordPage.tsx`
  - `server/prisma/reset-admin-password.ts`

### 2. Checked Production Environment Configuration ✅
**Production .env file** (`/home/ubuntu/inshureit/.env`):
```bash
NODE_ENV=production
DB_ROOT_PASSWORD=Oxe4pamr87jkHaAiq5ZJWQSMsp5RL7vK
DB_USER=inshureit
DB_PASSWORD=QBPnkctHpCYsMrPPWKqyZMZWycfpQiOk
DB_PORT=3306
# ... other vars
```

**Backend DATABASE_URL**:
```
mysql://inshureit:QBPnkctHpCYsMrPPWKqyZMZWycfpQiOk@database:3306/inshureit
```

### 3. Docker Volumes on Production
```
DRIVER    VOLUME NAME
local     5a8cd0eb85eeb3f464d891fa716e7a5c3f7897841ad424cac7b33bda06fb9c5c
local     551ac945f79a09949aed7b3fde82f2fcf5a8ca53472e2483f59ba0295ea1d8ed5
local     inshureit_backend_exports
local     inshureit_mysql_data  ← This is the database volume
```

**Key Finding**: The volume is named `inshureit_mysql_data` (with project prefix), not just `mysql_data`

---

## Possible Causes

### Theory 1: Volume Mismatch During Rebuild
The `docker-compose.ssl.yml` defines volume as `mysql_data` but Docker Compose creates it as `inshureit_mysql_data`. If the old data was in a different volume, the rebuild might have created a fresh empty volume.

### Theory 2: Database Was Accidentally Wiped
The `docker-compose down` command might have removed volumes if run with certain flags (though unlikely without `--volumes` or `-v` flag).

### Theory 3: Volume Contains Old Data But Not Mounted Correctly
The `inshureit_mysql_data` volume might contain the old data, but the current container might be using a different/new volume.

---

## Next Steps for Tomorrow

### Step 1: Inspect the Database Volume
```bash
docker volume inspect inshureit_mysql_data
```
Check if this volume has data and when it was created.

### Step 2: Check for Other MySQL Volumes
Look at the anonymous volumes (the ones with long hashes):
```bash
docker volume inspect 5a8cd0eb85eeb3f464d891fa716e7a5c3f7897841ad424cac7b33bda06fb9c5c
docker volume inspect 551ac945f79a09949aed7b3fde82f2fcf5a8ca53472e2483f59ba0295ea1d8ed5
```
One of these might contain the old database data.

### Step 3: Check What Volume the Database Container is Actually Using
```bash
docker inspect inshureit-db | grep -A 10 Mounts
```
This will show exactly which volume is mounted to `/var/lib/mysql`

### Step 4A: If Old Data Found in Different Volume
Restore the old volume:
1. Stop containers
2. Update docker-compose to use the correct volume
3. Restart containers

### Step 4B: If No Old Data Exists Anywhere
We'll need to recreate the admin user:
```bash
docker exec inshureit-api node -e "const { PrismaClient } = require('@prisma/client'); const bcrypt = require('bcryptjs'); const prisma = new PrismaClient(); (async () => { const hash = await bcrypt.hash('zifpuw-wyvpin-4toWqi', 12); await prisma.user.create({ data: { email: 'admin@inshureit.com', password: hash, firstName: 'Admin', lastName: 'User', mustChangePassword: false } }); console.log('Admin created'); await prisma.\$disconnect(); })()"
```

---

## Production Server Details
- **IP**: 130.162.177.108
- **SSH**: `ssh -i ~/.ssh/oracle_inshureit ubuntu@130.162.177.108`
- **Project Path**: `/home/ubuntu/inshureit`
- **Database Container**: `inshureit-db`
- **Backend Container**: `inshureit-api`

---

## Important Notes
1. ⚠️ **Do NOT run `docker-compose down -v`** - this will delete volumes permanently
2. ⚠️ The production site is still running but nobody can log in (no users exist)
3. ✅ Local development environment is unaffected
4. ✅ Code repository is clean and correct

---

## Commands Ready for Tomorrow

### Connect to Production
```bash
ssh -i ~/.ssh/oracle_inshureit ubuntu@130.162.177.108
cd inshureit
```

### MySQL Access
```bash
docker exec -it inshureit-db mysql -u inshureit -p'QBPnkctHpCYsMrPPWKqyZMZWycfpQiOk'
```

### Create Admin User (if data recovery fails)
```bash
docker exec inshureit-api node -e "const { PrismaClient } = require('@prisma/client'); const bcrypt = require('bcryptjs'); const prisma = new PrismaClient(); (async () => { const hash = await bcrypt.hash('zifpuw-wyvpin-4toWqi', 12); await prisma.user.create({ data: { email: 'admin@inshureit.com', password: hash, firstName: 'Admin', lastName: 'User', mustChangePassword: false } }); console.log('Admin user created!'); await prisma.\$disconnect(); })()"
```

---

## Questions to Answer Tomorrow
1. Does `inshureit_mysql_data` volume contain any data?
2. Are the anonymous volumes the old database data?
3. Which volume is currently mounted to the database container?
4. Was there a database backup before the deployment?

---

**Investigation Status**: PAUSED - Resume tomorrow morning
**Priority**: HIGH - Production login is broken
