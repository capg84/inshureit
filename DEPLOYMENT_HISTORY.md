# InshureIt Deployment History

## November 29, 2025 - Password Reset Feature Deployment

### What Was Implemented

#### Backend Changes
- **New Controller**: `server/src/controllers/passwordReset.controller.ts`
  - `requestPasswordReset()` - Sends password reset email with token
  - `verifyResetToken()` - Validates reset token before showing form
  - `resetPassword()` - Updates password and invalidates token
  
- **New Routes**: `server/src/routes/passwordReset.routes.ts`
  - `POST /api/password-reset/request` - Request reset email
  - `GET /api/password-reset/verify/:token` - Verify token
  - `POST /api/password-reset/reset` - Reset password with token

- **Email Service Updates**: `server/src/utils/email.ts`
  - Added password reset email templates (HTML + text)
  - Professional styling matching existing emails
  - 1-hour expiration notice in emails

- **Environment Variables**: Added to `server/.env`
  - `FRONTEND_URL=https://inshureit.com` (for reset link generation)

#### Frontend Changes
- **New Pages**: `client/src/pages/backoffice/`
  - `ForgotPasswordPage.tsx` - Email submission form
  - `ResetPasswordPage.tsx` - New password form with token verification

- **Updated Pages**:
  - `LoginPage.tsx` - Added "Forgot password?" link
  
- **Updated Services**: `client/src/services/auth.service.ts`
  - `requestPasswordReset()` - API call to request reset
  - `verifyResetToken()` - API call to verify token
  - `resetPassword()` - API call to reset password

- **Updated Routes**: `client/src/App.tsx`
  - Added routes for `/backoffice/forgot-password` and `/backoffice/reset-password`

#### Security Features
- SHA-256 token hashing before database storage
- 1-hour token expiration
- Single-use tokens (marked as used after reset)
- All sessions invalidated on password reset
- Email enumeration prevention
- Password policy enforcement maintained

### Production Deployment Process

#### Server Information
- **IP**: 130.162.177.108
- **Domain**: inshureit.com
- **Platform**: Oracle Cloud (Ubuntu 22.04 LTS)
- **Container Platform**: Docker + Docker Compose

#### Deployment Steps Completed

1. **Local Development**
   - Admin password reset to `Admin@123` using `server/prisma/reset-admin-password.ts`
   - Code committed to GitHub: `c46bde9d3d98e7d2b30056a5eca8909466155da8`
   - Author: Cyprian Gomes <cyprian.gomes@live.co.uk>

2. **Production Server Access**
   - SSH: `ssh -i ~/.ssh/oracle_inshureit ubuntu@130.162.177.108`
   - Project directory: `/home/ubuntu/inshureit`

3. **Code Deployment**
   ```bash
   git pull origin main
   ```

4. **Environment Configuration**
   - Created `.env` from `.env.docker` (Docker Compose requires `.env` not `.env.docker`)
   - Added `FRONTEND_URL=https://inshureit.com` to environment

5. **Container Rebuild**
   - Initial attempt with `docker-compose.yml` - worked but no SSL
   - Final deployment with SSL version:
   ```bash
   docker-compose -f docker-compose.ssl.yml down
   docker-compose -f docker-compose.ssl.yml up -d --build
   ```

### Issues Encountered & Solutions

#### Issue 1: JWT_SECRET Error
**Problem**: Backend crashing with "JWT_SECRET must be set in production environment"

**Cause**: Docker Compose wasn't reading `.env.docker` file

**Solution**: Copied `.env.docker` to `.env`
```bash
cp .env.docker .env
```

#### Issue 2: Site Not Accessible Externally
**Problem**: Site worked on localhost but not from internet

**Investigation**:
- Verified containers running: ✅
- Verified port 80 listening: `ss -tlnp | grep :80` showed `0.0.0.0:80` ✅
- Verified firewall: `sudo iptables -L -n | grep 80` showed ACCEPT rules ✅
- Verified Oracle Cloud ingress rules: Ports 80, 443, 22, 5001 all open ✅
- Verified locally: `curl -I http://localhost:80` returned 200 OK ✅

**Cause**: Using `docker-compose.yml` instead of `docker-compose.ssl.yml`

**Solution**: Site was previously running with SSL, browser had HSTS enabled (auto-redirect HTTP→HTTPS). Needed to use SSL-enabled compose file:
```bash
docker-compose -f docker-compose.ssl.yml up -d --build
```

### Important Notes for Future Deployments

#### Always Use SSL Compose File
```bash
# ❌ DON'T USE (no SSL)
docker-compose up -d

# ✅ USE THIS (with SSL)
docker-compose -f docker-compose.ssl.yml up -d --build
```

#### Environment Files
- Production uses `.env` (Docker Compose default)
- Keep `.env.docker` as template
- After updating `.env.docker`, copy to `.env`:
  ```bash
  cp .env.docker .env
  ```

#### Deployment Checklist
1. SSH into server: `ssh -i ~/.ssh/oracle_inshureit ubuntu@130.162.177.108`
2. Navigate to project: `cd inshureit`
3. Pull latest code: `git pull origin main`
4. Update environment if needed: `nano .env` (or `cp .env.docker .env`)
5. Rebuild containers: `docker-compose -f docker-compose.ssl.yml down && docker-compose -f docker-compose.ssl.yml up -d --build`
6. Verify status: `docker-compose ps`
7. Check logs if needed: `docker-compose logs --tail=50`

### Testing Password Reset Feature

**Prerequisites**: Access to admin@inshureit.com email

**Test Steps**:
1. Navigate to: https://inshureit.com/backoffice/login
2. Click "Forgot password?" link
3. Enter email address (e.g., admin@inshureit.com)
4. Click "Send Reset Link"
5. Check email inbox for reset link
6. Click reset link (valid for 1 hour)
7. Enter new password (must meet policy requirements)
8. Confirm password
9. Click "Reset Password"
10. Login with new password

### Files Modified/Created

**Backend** (10 files):
- ✅ `server/src/controllers/passwordReset.controller.ts` (new)
- ✅ `server/src/routes/passwordReset.routes.ts` (new)
- ✅ `server/src/index.ts` (modified - registered routes)
- ✅ `server/src/utils/email.ts` (modified - added reset templates)
- ✅ `server/.env` (modified - added FRONTEND_URL)

**Frontend** (5 files):
- ✅ `client/src/pages/backoffice/ForgotPasswordPage.tsx` (new)
- ✅ `client/src/pages/backoffice/ResetPasswordPage.tsx` (new)
- ✅ `client/src/pages/backoffice/LoginPage.tsx` (modified - added link)
- ✅ `client/src/services/auth.service.ts` (modified - added methods)
- ✅ `client/src/App.tsx` (modified - added routes)

**Documentation**:
- ✅ `PASSWORD_RESET_IMPLEMENTATION.md` (new)

### Container Status (Post-Deployment)

```
NAME                 STATUS
inshureit-db        Up (healthy)
inshureit-api       Up (healthy)  
inshureit-frontend  Up (healthy with SSL)
```

### Verification Commands

```bash
# Check containers
docker-compose ps

# Check backend logs
docker-compose logs backend | tail -20

# Check frontend logs  
docker-compose logs frontend | tail -20

# Test locally
curl -I http://localhost:80

# Check port binding
ss -tlnp | grep :80
```

### Commit Information

**Commit Hash**: c46bde9d3d98e7d2b30056a5eca8909466155da8

**Commit Message**: 
```
Add self-service password reset functionality

Implements complete forgot password flow for backoffice users with email-based token verification

[Full message in git log]
```

**Author**: Cyprian Gomes <cyprian.gomes@live.co.uk>

**Date**: Fri Nov 28 16:25:38 2025 +0000

**Stats**: 10 files changed, 1,022 insertions(+), 2 deletions(-)

---

**Deployment completed successfully**: November 29, 2025
**Deployed by**: Claude Code + Cyprian Gomes
