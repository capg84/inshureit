# Oracle Cloud Deployment Setup for InshureIt

## Pre-Deployment Checklist

### ✓ Completed
- [x] Application code ready and pushed to GitHub
- [x] All deployment files present (docker-compose.yml, Dockerfiles, deploy.sh)
- [x] Email integration configured (GoDaddy SMTP)
- [x] Company information updated (address, DPR number)
- [x] Domain name available

### 📋 Pending Oracle Cloud Setup

#### 1. Oracle Cloud Instance Requirements
- **Compute Shape**: VM.Standard.E2.1.Micro (Free Tier) or higher
- **OS**: Ubuntu 22.04 LTS (recommended)
- **Memory**: Minimum 2GB RAM (4GB+ recommended)
- **Storage**: 50GB+ boot volume
- **Ports to Open**:
  - 80 (HTTP)
  - 443 (HTTPS)
  - 5001 (API - can be closed after SSL setup)
  - 22 (SSH - for management)

#### 2. Domain Configuration
**Domain Name**: [Your domain - to be configured]

**DNS Records to Set**:
```
Type    Name              Value                       TTL
A       @                 [Oracle Cloud IP]           3600
A       www               [Oracle Cloud IP]           3600
A       api               [Oracle Cloud IP]           3600
```

#### 3. Environment Variables to Configure

Create `.env.docker` file with these values:

```bash
# Node Environment
NODE_ENV=production

# Database Configuration
DB_ROOT_PASSWORD=[GENERATE-STRONG-PASSWORD]
DB_USER=inshureit
DB_PASSWORD=[GENERATE-STRONG-PASSWORD]
DB_PORT=3306

# Backend Configuration
API_PORT=5001

# Frontend Configuration
FRONTEND_PORT=80
VITE_API_URL=https://api.[yourdomain.com]

# JWT Configuration (Generate with: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))")
JWT_SECRET=[GENERATE-64-CHAR-HEX-STRING]
JWT_EXPIRATION=7d

# CORS Configuration
ALLOWED_ORIGINS=https://[yourdomain.com],https://www.[yourdomain.com]

# Email Configuration (GoDaddy SMTP - Already Configured)
SMTP_HOST=smtpout.secureserver.net
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=info@inshureit.com
SMTP_PASS=w@tEr6oorLigh7
EMAIL_FROM=info@inshureit.com

# Security
BCRYPT_ROUNDS=12
```

## Deployment Steps (Once Oracle Cloud is Ready)

### Step 1: Set Up Oracle Cloud Instance

1. **Create Compute Instance**
   - Log in to Oracle Cloud Console
   - Navigate to Compute > Instances
   - Click "Create Instance"
   - Choose Ubuntu 22.04 LTS
   - Select shape (VM.Standard.E2.1.Micro for free tier)
   - Configure networking (use default VCN or create new)
   - Add SSH key for access
   - Create instance

2. **Configure Firewall Rules**
   ```bash
   # On Oracle Cloud Console
   # Navigate to: Networking > Virtual Cloud Networks > [Your VCN] > Security Lists

   # Add Ingress Rules:
   - Port 80 (HTTP) - Source: 0.0.0.0/0
   - Port 443 (HTTPS) - Source: 0.0.0.0/0
   - Port 22 (SSH) - Source: [Your IP]/32 (for security)
   ```

3. **Configure Ubuntu Firewall**
   ```bash
   # SSH into your instance
   ssh ubuntu@[ORACLE_CLOUD_IP]

   # Update system
   sudo apt update && sudo apt upgrade -y

   # Configure UFW firewall
   sudo ufw allow 22/tcp
   sudo ufw allow 80/tcp
   sudo ufw allow 443/tcp
   sudo ufw enable
   ```

### Step 2: Install Docker and Docker Compose

```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker ubuntu
newgrp docker

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verify installation
docker --version
docker-compose --version
```

### Step 3: Clone Repository and Configure

```bash
# Clone the repository
git clone https://github.com/capg84/inshureit.git
cd inshureit

# Create environment file
cp .env.docker.example .env.docker

# Edit with production values
nano .env.docker
# (Update all values as per the configuration above)
```

### Step 4: Deploy Application

```bash
# Make deploy script executable
chmod +x scripts/deploy.sh

# Run deployment
./scripts/deploy.sh

# Choose option 1 (Fresh deployment)
```

### Step 5: Set Up SSL Certificate (Let's Encrypt)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Stop Docker containers temporarily
docker-compose down

# Get SSL certificate
sudo certbot certonly --standalone -d [yourdomain.com] -d www.[yourdomain.com] -d api.[yourdomain.com]

# Update docker-compose.yml to use SSL certificates
# (Add volume mounts for certificates)

# Restart containers
docker-compose up -d
```

### Step 6: Verify Deployment

1. **Check Application**
   - Frontend: https://[yourdomain.com]
   - API: https://api.[yourdomain.com]

2. **Test Login**
   - Email: admin@inshureit.com
   - Password: Admin@123
   - **IMPORTANT**: Change admin password immediately after first login!

3. **Test Quote Form**
   - Submit a test quote
   - Verify email is sent to info@inshureit.com

4. **Check All Pages**
   - About, Contact, Careers, Help
   - Privacy Policy, Terms, Cookie Policy
   - Admin panel, Downloads

## Post-Deployment Tasks

### Security Hardening

1. **Change Default Admin Password**
   ```bash
   # Access the application and change admin password via UI
   ```

2. **Set Up Automatic Backups**
   ```bash
   # Create backup script
   nano ~/backup-inshureit.sh

   # Add cron job for daily backups
   crontab -e
   # 0 2 * * * /home/ubuntu/backup-inshureit.sh
   ```

3. **Configure Monitoring**
   ```bash
   # Set up uptime monitoring (UptimeRobot, Pingdom, etc.)
   # Monitor: https://[yourdomain.com]
   ```

4. **Enable Auto-Updates**
   ```bash
   # For security patches
   sudo apt install unattended-upgrades -y
   sudo dpkg-reconfigure -plow unattended-upgrades
   ```

## Maintenance Commands

```bash
# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Restart services
docker-compose restart

# Update application
git pull origin main
./scripts/deploy.sh  # Choose option 2 (Update)

# Database backup
docker exec inshureit-db mysqldump -u root -p inshureit > backup.sql

# Database restore
docker exec -i inshureit-db mysql -u root -p inshureit < backup.sql
```

## Troubleshooting

### Application Not Accessible
```bash
# Check if containers are running
docker ps

# Check container logs
docker-compose logs

# Restart all services
docker-compose restart
```

### Database Connection Issues
```bash
# Check database container
docker logs inshureit-db

# Access database directly
docker exec -it inshureit-db mysql -u root -p
```

### Email Not Sending
- Verify SMTP credentials in .env.docker
- Check GoDaddy email settings
- Review application logs: `docker-compose logs backend`

## Support

For deployment assistance:
- Email: info@inshureit.com
- GitHub: https://github.com/capg84/inshureit

---

**Status**: Ready for deployment once Oracle Cloud instance is provisioned
**Last Updated**: 14 November 2025
