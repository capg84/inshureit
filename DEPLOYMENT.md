# InshureIt - Production Deployment Guide

This guide covers deploying the InshureIt application to production environments.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Deployment Options](#deployment-options)
3. [Production Build](#production-build)
4. [Environment Configuration](#environment-configuration)
5. [Database Setup](#database-setup)
6. [Deployment Methods](#deployment-methods)
7. [Post-Deployment](#post-deployment)
8. [Monitoring & Maintenance](#monitoring--maintenance)

---

## Prerequisites

Before deploying to production, ensure you have:

- [x] Node.js 18+ installed
- [x] MySQL 8.0+ database (or managed database service)
- [x] Domain name configured
- [x] SSL certificate (for HTTPS)
- [x] Email service credentials (SMTP) for notifications
- [x] Production environment variables configured
- [x] Git repository access

---

## Deployment Options

### Option 1: Traditional VPS/Server (Recommended for Full Control)
- **Best for**: Complete control, custom configurations
- **Examples**: AWS EC2, DigitalOcean Droplets, Linode, Vultr
- **Complexity**: Medium
- **Cost**: ~$10-50/month

### Option 2: Platform-as-a-Service (PaaS)
- **Best for**: Quick deployment, managed infrastructure
- **Examples**: Heroku, Railway, Render, Fly.io
- **Complexity**: Low
- **Cost**: ~$7-25/month

### Option 3: Containerized Deployment
- **Best for**: Scalability, consistency across environments
- **Examples**: AWS ECS, Google Cloud Run, Azure Container Instances
- **Complexity**: Medium-High
- **Cost**: Variable based on usage

### Option 4: Serverless
- **Best for**: Cost optimization, auto-scaling
- **Examples**: Vercel (frontend) + AWS Lambda (backend)
- **Complexity**: Medium
- **Cost**: Pay-per-use (can be very low)

---

## Production Build

### 1. Build the Application

```bash
# From the root directory

# Install all dependencies
npm install

# Build the frontend
cd client
npm run build
# This creates a 'dist' folder with optimized static files

# Build the backend
cd ../server
npm run build
# This creates a 'dist' folder with compiled TypeScript
```

### 2. Test Production Build Locally

```bash
# Start the production server
cd server
NODE_ENV=production npm start

# Serve frontend build (using a static file server)
cd ../client
npx serve -s dist -p 3000
```

---

## Environment Configuration

### Backend Environment Variables (`server/.env.production`)

```bash
# Node Environment
NODE_ENV=production

# Server Configuration
PORT=5001
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

# Database
DATABASE_URL="mysql://username:password@hostname:3306/inshureit"

# Authentication
JWT_SECRET=your-very-long-and-secure-random-string-min-32-chars
JWT_EXPIRATION=7d

# Email Configuration (for quote confirmations)
SMTP_HOST=smtp.yourprovider.com
SMTP_PORT=587
SMTP_SECURE=true
SMTP_USER=your-email@yourdomain.com
SMTP_PASS=your-smtp-password
EMAIL_FROM=noreply@yourdomain.com

# Security
BCRYPT_ROUNDS=12

# Session Management
SESSION_TIMEOUT=7d
```

### Frontend Environment Variables (`client/.env.production`)

```bash
VITE_API_URL=https://api.yourdomain.com
```

### Important Security Notes

⚠️ **NEVER** commit production `.env` files to Git!
⚠️ Use strong, randomly generated values for `JWT_SECRET`
⚠️ Ensure database passwords are complex and unique
⚠️ Enable SSL/TLS for all connections

---

## Database Setup

### 1. Create Production Database

```sql
CREATE DATABASE inshureit CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 2. Run Migrations

```bash
cd server
npx prisma db push
```

### 3. Create Initial Admin User

```bash
npx prisma db seed
```

This creates the default admin account:
- Email: `admin@inshureit.com`
- Password: `Admin@123`

⚠️ **IMPORTANT**: Change this password immediately after first login!

### 4. Database Backup Strategy

Set up automated backups:

```bash
# Daily backup script example
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
mysqldump -u username -p password inshureit > backup_$DATE.sql
# Upload to S3 or backup service
```

---

## Deployment Methods

## Method 1: Traditional VPS (Ubuntu Server)

### Step 1: Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install MySQL
sudo apt install -y mysql-server

# Install Nginx (web server/reverse proxy)
sudo apt install -y nginx

# Install PM2 (process manager)
sudo npm install -g pm2

# Install Git
sudo apt install -y git
```

### Step 2: Clone and Setup Application

```bash
# Create application directory
sudo mkdir -p /var/www/inshureit
sudo chown $USER:$USER /var/www/inshureit

# Clone repository
cd /var/www/inshureit
git clone https://github.com/yourusername/inshureit.git .

# Install dependencies and build
npm install
cd client && npm run build
cd ../server && npm run build
```

### Step 3: Configure Environment Variables

```bash
# Create production environment files
cd /var/www/inshureit/server
nano .env.production
# Paste your production environment variables

cd ../client
nano .env.production
# Paste your frontend environment variables
```

### Step 4: Configure Nginx

```bash
sudo nano /etc/nginx/sites-available/inshureit
```

Paste the following configuration:

```nginx
# Frontend server
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    root /var/www/inshureit/client/dist;
    index index.html;

    # Serve static files
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}

# API server
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:5001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/inshureit /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 5: Setup SSL with Let's Encrypt

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com -d api.yourdomain.com

# Auto-renewal is configured automatically
# Test renewal
sudo certbot renew --dry-run
```

### Step 6: Start Application with PM2

```bash
cd /var/www/inshureit/server

# Start the server
pm2 start dist/index.js --name inshureit-api --env production

# Save PM2 process list
pm2 save

# Setup PM2 to start on system boot
pm2 startup
# Follow the instructions provided by the command
```

### Step 7: Configure Firewall

```bash
# Allow SSH, HTTP, and HTTPS
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

---

## Method 2: Docker Deployment

### Step 1: Create Dockerfile for Backend

Create `server/Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm ci --only=production

# Copy application files
COPY dist ./dist

# Generate Prisma client
RUN npx prisma generate

EXPOSE 5001

CMD ["node", "dist/index.js"]
```

### Step 2: Create Dockerfile for Frontend

Create `client/Dockerfile`:

```dockerfile
FROM node:18-alpine as builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source files
COPY . .

# Build application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built files
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### Step 3: Create docker-compose.yml

Create `docker-compose.yml` in root:

```yaml
version: '3.8'

services:
  database:
    image: mysql:8.0
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: ${DB_ROOT_PASSWORD}
      MYSQL_DATABASE: inshureit
      MYSQL_USER: ${DB_USER}
      MYSQL_PASSWORD: ${DB_PASSWORD}
    volumes:
      - mysql_data:/var/lib/mysql
    ports:
      - "3306:3306"

  backend:
    build:
      context: ./server
      dockerfile: Dockerfile
    restart: always
    environment:
      NODE_ENV: production
      DATABASE_URL: mysql://${DB_USER}:${DB_PASSWORD}@database:3306/inshureit
      JWT_SECRET: ${JWT_SECRET}
      SMTP_HOST: ${SMTP_HOST}
      SMTP_USER: ${SMTP_USER}
      SMTP_PASS: ${SMTP_PASS}
    depends_on:
      - database
    ports:
      - "5001:5001"

  frontend:
    build:
      context: ./client
      dockerfile: Dockerfile
    restart: always
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  mysql_data:
```

### Step 4: Deploy with Docker

```bash
# Build and start services
docker-compose up -d

# Run database migrations
docker-compose exec backend npx prisma db push

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

---

## Method 3: Platform-as-a-Service (Railway)

### Step 1: Install Railway CLI

```bash
npm install -g @railway/cli
```

### Step 2: Login and Initialize

```bash
railway login
railway init
```

### Step 3: Add Services

```bash
# Add MySQL database
railway add

# Deploy backend
cd server
railway up

# Deploy frontend
cd ../client
railway up
```

### Step 4: Configure Environment Variables

```bash
# Set variables through Railway dashboard or CLI
railway variables set JWT_SECRET=your-secret-key
railway variables set SMTP_HOST=smtp.yourprovider.com
```

---

## Post-Deployment

### 1. Verify Deployment

- [ ] Visit your domain and verify the homepage loads
- [ ] Test quote form submission
- [ ] Login to backoffice with admin credentials
- [ ] Check all navigation links work
- [ ] Verify SSL certificate is active (green padlock)
- [ ] Test on mobile devices

### 2. Security Checklist

- [ ] Change default admin password
- [ ] Enable database firewall rules (allow only application server)
- [ ] Setup regular database backups
- [ ] Configure fail2ban (to prevent brute force attacks)
- [ ] Enable application logging
- [ ] Setup monitoring alerts

### 3. Performance Optimization

```bash
# Enable gzip compression in Nginx
sudo nano /etc/nginx/nginx.conf

# Add inside http block:
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
gzip_min_length 256;
```

### 4. Setup Monitoring

Consider using:
- **Uptime Monitoring**: UptimeRobot, Pingdom
- **Error Tracking**: Sentry
- **Performance Monitoring**: New Relic, DataDog
- **Log Management**: Papertrail, Loggly

---

## Monitoring & Maintenance

### Application Logs

```bash
# PM2 logs
pm2 logs inshureit-api

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# Docker logs
docker-compose logs -f backend
```

### Regular Maintenance Tasks

**Daily:**
- Monitor error logs
- Check disk space usage

**Weekly:**
- Review database backups
- Check application performance metrics

**Monthly:**
- Update dependencies (security patches)
- Review and rotate logs
- Database optimization

### Updating the Application

```bash
# Pull latest changes
cd /var/www/inshureit
git pull origin main

# Install dependencies
npm install

# Build applications
cd client && npm run build
cd ../server && npm run build

# Restart backend
pm2 restart inshureit-api

# Nginx will serve new frontend files automatically
```

---

## Troubleshooting

### Common Issues

**Issue: Application won't start**
```bash
# Check PM2 status
pm2 status

# Check logs
pm2 logs inshureit-api --lines 100
```

**Issue: Database connection fails**
```bash
# Test database connection
mysql -u username -p -h hostname inshureit

# Check DATABASE_URL in .env
cat /var/www/inshureit/server/.env.production
```

**Issue: Frontend shows 404 errors**
```bash
# Check Nginx configuration
sudo nginx -t

# Check frontend build exists
ls -la /var/www/inshureit/client/dist
```

---

## Support & Resources

- **Documentation**: See [DEVELOPMENT.md](DEVELOPMENT.md) for development setup
- **Database Schema**: See [server/prisma/schema.prisma](server/prisma/schema.prisma)
- **API Documentation**: See [DEVELOPMENT.md#api-endpoints](DEVELOPMENT.md#api-endpoints)

---

## Estimated Costs

### Small Scale (< 1000 users/month)
- **VPS**: DigitalOcean Droplet $12/month
- **Database**: Managed MySQL $15/month
- **Domain**: $10-15/year
- **SSL**: Free (Let's Encrypt)
- **Total**: ~$27/month + $15/year

### Medium Scale (1000-10000 users/month)
- **VPS**: AWS EC2 t3.medium $30/month
- **Database**: AWS RDS $50/month
- **CDN**: CloudFlare (Free) or AWS CloudFront $10/month
- **Total**: ~$90/month

---

## License

Proprietary - Limit Unlimited Technologies Ltd

For deployment assistance, contact: support@inshureit.com
