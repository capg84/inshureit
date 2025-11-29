# Quick Reference: Password Reset Deployment (Nov 29, 2025)

## What Was Done
✅ Password reset feature implemented (forgot password flow)
✅ Deployed to production: https://inshureit.com
✅ Commits: c46bde9 (code), 8af091c (docs)

## Key Files Changed
**Backend**: passwordReset.controller.ts, passwordReset.routes.ts, email.ts, index.ts
**Frontend**: ForgotPasswordPage.tsx, ResetPasswordPage.tsx, LoginPage.tsx, auth.service.ts

## Production Deployment Commands
```bash
# SSH
ssh -i ~/.ssh/oracle_inshureit ubuntu@130.162.177.108

# Deploy
cd inshureit
git pull origin main
cp .env.docker .env  # If env changes
docker-compose -f docker-compose.ssl.yml down
docker-compose -f docker-compose.ssl.yml up -d --build
```

## Critical Notes
⚠️ **Always use** `docker-compose.ssl.yml` (NOT docker-compose.yml)
⚠️ Environment file must be named `.env` (copy from .env.docker)
⚠️ Added `FRONTEND_URL=https://inshureit.com` to .env

## Issues Fixed
1. JWT_SECRET error → Created .env from .env.docker
2. Site not accessible → Used docker-compose.ssl.yml for HTTPS

## Test Password Reset
https://inshureit.com/backoffice/login → Click "Forgot password?"
(Requires access to admin@inshureit.com email)

## Server Info
IP: 130.162.177.108 | Domain: inshureit.com | Platform: Oracle Cloud/Docker
