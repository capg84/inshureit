# SSL/HTTPS Setup Guide for InshureIt

Complete guide for setting up SSL/HTTPS certificates using Let's Encrypt for the InshureIt production environment.

## Prerequisites

- Domain names configured and pointing to server IP
- Docker and Docker Compose installed
- Server accessible on ports 80 and 443
- Root or sudo access to the server

## Overview

This setup configures:
- Let's Encrypt SSL certificates for all domains
- Nginx reverse proxy with HTTPS
- Automatic certificate renewal
- HTTP to HTTPS redirect
- Secure headers configuration

## Domains Covered

- `inshureit.com` (main frontend)
- `www.inshureit.com` (www frontend)
- `api.inshureit.com` (backend API)

## Step-by-Step Setup

### 1. DNS Configuration

Ensure all domains point to your production server IP:

```bash
# Verify DNS records
nslookup inshureit.com
nslookup www.inshureit.com
nslookup api.inshureit.com
```

All should resolve to: `130.162.177.108`

### 2. Prepare Environment File

Create `.env.docker` with HTTPS configuration:

```bash
NODE_ENV=production
DB_ROOT_PASSWORD=<secure-password>
DB_USER=inshureit
DB_PASSWORD=<secure-password>
DB_PORT=3306
API_PORT=5001
FRONTEND_PORT=80
VITE_API_URL=https://api.inshureit.com
JWT_SECRET=<64-character-hex-string>
JWT_EXPIRATION=7d
ALLOWED_ORIGINS=https://inshureit.com,https://www.inshureit.com
SMTP_HOST=smtpout.secureserver.net
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=info@inshureit.com
SMTP_PASS=<email-password>
EMAIL_FROM=info@inshureit.com
BCRYPT_ROUNDS=12
```

**Generate secure values:**

```bash
# Generate JWT secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Generate database passwords
openssl rand -base64 32 | tr -d "=+/" | cut -c1-32
```

### 3. Create Certbot Directories

```bash
mkdir -p certbot/conf certbot/www
```

### 4. Run SSL Setup Script

The automated setup script handles certificate acquisition:

```bash
chmod +x scripts/setup-ssl.sh
./scripts/setup-ssl.sh
```

When prompted, enter your email address for Let's Encrypt notifications.

The script will:
1. Update environment for HTTPS
2. Create necessary directories
3. Start nginx for domain validation
4. Request SSL certificates from Let's Encrypt
5. Rebuild frontend with HTTPS API URL
6. Start all services with SSL enabled

### 5. Manual Setup (Alternative)

If you prefer manual setup or troubleshooting:

#### Stop Existing Containers

```bash
docker compose --env-file .env.docker down
```

#### Start Nginx for Certificate Validation

```bash
docker compose -f docker-compose.ssl.yml --env-file .env.docker up -d nginx
```

#### Request Certificates

```bash
docker compose -f docker-compose.ssl.yml --env-file .env.docker run --rm certbot certonly \
  --webroot \
  --webroot-path /var/www/certbot \
  --email your@email.com \
  --agree-tos \
  --no-eff-email \
  -d inshureit.com \
  -d www.inshureit.com \
  -d api.inshureit.com
```

#### Copy Certificates to Docker Volume

If certificates exist in system location:

```bash
sudo cp -r /etc/letsencrypt/* ~/inshureit/certbot/conf/
sudo chown -R ubuntu:docker ~/inshureit/certbot/conf/
```

#### Rebuild Frontend with HTTPS

```bash
docker compose -f docker-compose.ssl.yml --env-file .env.docker build --no-cache frontend
```

#### Start All Services

```bash
docker compose -f docker-compose.ssl.yml --env-file .env.docker up -d
```

### 6. Verify Setup

#### Check Container Status

```bash
docker ps
```

Should show:
- `inshureit-nginx` (running on ports 80, 443)
- `inshureit-frontend`
- `inshureit-api`
- `inshureit-db`
- `inshureit-certbot`

#### Check Certificates

```bash
# Verify certificates are accessible
docker exec inshureit-nginx ls -la /etc/letsencrypt/live/inshureit.com/

# Check certificate expiration
docker exec inshureit-nginx openssl x509 -in /etc/letsencrypt/live/inshureit.com/fullchain.pem -text -noout | grep "Not After"
```

#### Test HTTPS Endpoints

```bash
# Test frontend
curl -I https://inshureit.com

# Test www redirect
curl -I https://www.inshureit.com

# Test API
curl -I https://api.inshureit.com/health
```

#### Browser Testing

Open in browser:
- https://inshureit.com
- https://www.inshureit.com
- https://api.inshureit.com

Verify:
- Green padlock icon appears
- Certificate is valid
- No security warnings
- HTTP redirects to HTTPS

### 7. Monitor Services

```bash
# View all logs
docker compose -f docker-compose.ssl.yml logs -f

# View specific service logs
docker logs inshureit-nginx
docker logs inshureit-certbot
docker logs inshureit-api
docker logs inshureit-frontend
```

## SSL Configuration Details

### Nginx Configuration

Located at `nginx/nginx.conf`:

**HTTP → HTTPS Redirect:**
- Listens on port 80
- Serves Let's Encrypt challenge files
- Redirects all other traffic to HTTPS

**HTTPS Frontend:**
- Listens on port 443
- Serves inshureit.com and www.inshureit.com
- Proxies to frontend container
- Applies security headers

**HTTPS API:**
- Listens on port 443
- Serves api.inshureit.com
- Proxies to backend container
- Configures CORS headers

### Security Headers

Applied to all HTTPS responses:

```nginx
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
```

### SSL Protocols

```nginx
ssl_protocols TLSv1.2 TLSv1.3;
ssl_ciphers HIGH:!aNULL:!MD5;
ssl_prefer_server_ciphers on;
```

## Certificate Renewal

Certificates automatically renew via the certbot container.

### Auto-Renewal

The certbot container:
- Runs `certbot renew` every 12 hours
- Automatically renews certificates within 30 days of expiration
- Nginx reloads every 6 hours to pick up new certificates

### Manual Renewal

To manually trigger renewal:

```bash
docker compose -f docker-compose.ssl.yml --env-file .env.docker run --rm certbot renew

# Restart nginx to load new certificates
docker compose -f docker-compose.ssl.yml --env-file .env.docker restart nginx
```

### Check Renewal Status

```bash
# View certbot logs
docker logs inshureit-certbot

# Check certificate expiration dates
docker exec inshureit-certbot certbot certificates
```

## Troubleshooting

### Certificate Validation Fails

**Problem:** Let's Encrypt cannot validate domain ownership

**Solutions:**
1. Verify DNS points to correct IP
2. Ensure ports 80 and 443 are open
3. Check nginx is running: `docker ps | grep nginx`
4. Verify webroot path: `docker exec inshureit-nginx ls /var/www/certbot`

### Browser Shows "Not Secure"

**Problem:** Browser doesn't trust certificate

**Solutions:**
1. Clear browser cache (Ctrl+Shift+Del)
2. Hard refresh (Ctrl+Shift+R)
3. Try incognito/private window
4. Verify certificate is valid:
   ```bash
   curl -I https://inshureit.com
   ```

### Certificates Not Found in Container

**Problem:** Nginx cannot find SSL certificates

**Solutions:**
1. Check certificates exist:
   ```bash
   ls -la certbot/conf/live/inshureit.com/
   ```
2. Copy from system location:
   ```bash
   sudo cp -r /etc/letsencrypt/* ~/inshureit/certbot/conf/
   ```
3. Restart nginx:
   ```bash
   docker compose -f docker-compose.ssl.yml restart nginx
   ```

### Mixed Content Warnings

**Problem:** Page loads but some resources over HTTP

**Solutions:**
1. Check VITE_API_URL uses https://
2. Rebuild frontend:
   ```bash
   docker compose -f docker-compose.ssl.yml build --no-cache frontend
   ```
3. Clear browser cache

### Certificate Renewal Fails

**Problem:** Auto-renewal not working

**Solutions:**
1. Check certbot container is running:
   ```bash
   docker ps | grep certbot
   ```
2. View certbot logs:
   ```bash
   docker logs inshureit-certbot
   ```
3. Manually renew:
   ```bash
   docker compose -f docker-compose.ssl.yml run --rm certbot renew
   ```

## Maintenance

### Update SSL Configuration

1. Edit `nginx/nginx.conf`
2. Restart nginx:
   ```bash
   docker compose -f docker-compose.ssl.yml restart nginx
   ```

### Replace Certificates

To use different certificates:

1. Place new certificates in `certbot/conf/live/inshureit.com/`
2. Ensure files are named: `fullchain.pem`, `privkey.pem`
3. Restart nginx

### Backup Certificates

```bash
# Backup certificates
tar -czf ssl-backup-$(date +%Y%m%d).tar.gz certbot/conf/

# Restore from backup
tar -xzf ssl-backup-YYYYMMDD.tar.gz
```

## Security Best Practices

1. **Keep Certificates Secure**
   - Protect private keys
   - Limit access to certbot/conf directory
   - Use proper file permissions

2. **Monitor Expiration**
   - Set up alerts for expiration
   - Test auto-renewal regularly
   - Keep logs of renewals

3. **Regular Updates**
   - Update nginx regularly
   - Update certbot image
   - Review security headers

4. **HTTPS Everywhere**
   - Redirect all HTTP to HTTPS
   - Use HSTS headers
   - Update external links to HTTPS

## Support

For SSL/certificate issues:
1. Check nginx logs: `docker logs inshureit-nginx`
2. Check certbot logs: `docker logs inshureit-certbot`
3. Verify DNS configuration
4. Test with SSL checker: https://www.ssllabs.com/ssltest/

## Certificate Information

- **Issuer:** Let's Encrypt
- **Validation:** HTTP-01 challenge
- **Key Type:** RSA
- **Validity:** 90 days
- **Renewal:** Automatic every 12 hours (renews at 30 days before expiry)
- **Expiration Check:** Every 12 hours by certbot

## Production Checklist

- [ ] DNS records configured correctly
- [ ] Environment file created with HTTPS URLs
- [ ] Certbot directories created
- [ ] SSL certificates obtained
- [ ] Frontend rebuilt with HTTPS API URL
- [ ] All services running
- [ ] HTTPS working for all domains
- [ ] HTTP redirects to HTTPS
- [ ] Security headers present
- [ ] Certificate expiration monitored
- [ ] Auto-renewal tested
