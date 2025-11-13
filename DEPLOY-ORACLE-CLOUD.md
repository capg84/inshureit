# Deploy InshureIt on Oracle Cloud (FREE Forever)

Complete guide to deploy your InshureIt application on Oracle Cloud's Always Free tier.

## ✨ What You Get FREE (Forever)

- ✅ 2 ARM-based VMs (Ampere A1)
  - 4 OCPUs (cores) total
  - 24 GB RAM total
  - Can split or use as one VM
- ✅ 200 GB total block storage
- ✅ 10 TB outbound data transfer per month
- ✅ Load Balancer (10 Mbps bandwidth)
- ✅ Public IP addresses
- ✅ **No time limit - Forever FREE!**

**Perfect for InshureIt - Run 24/7 at no cost!**

---

## 📋 What You Need Before Starting

### Required (Have Ready):
- [ ] Credit/debit card (for identity verification - won't be charged)
- [ ] Valid email address
- [ ] Phone number (for verification)
- [ ] Your domain name (optional but recommended)
- [ ] 1-2 hours of uninterrupted time

### Prepare These Values:
- [ ] Strong JWT_SECRET (64+ characters) - Generate: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`
- [ ] Database password (strong, 12+ characters)
- [ ] Admin email address
- [ ] SMTP credentials (for email notifications)

---

## 🚀 Step-by-Step Deployment

## Part 1: Create Oracle Cloud Account (10 minutes)

### Step 1: Sign Up

1. **Go to:** https://www.oracle.com/cloud/free/
2. Click **"Start for free"**
3. Select your **Country/Territory**: United Kingdom
4. Fill in details:
   - Email address
   - Name
   - Company name (can use your name)
5. Click **"Verify my email"**
6. Check email and click verification link

### Step 2: Complete Registration

1. Fill in additional information:
   - Address (use real address)
   - Phone number

2. **Add Payment Method**
   - Credit/debit card required
   - ⚠️ **Important:** You will NOT be charged
   - Used only for identity verification
   - Oracle states: "You won't be charged unless you upgrade"

3. **Review and Accept**
   - Accept terms
   - Click **"Start my free trial"**

4. **Wait for Provisioning**
   - Takes 5-30 minutes
   - You'll receive email when ready
   - Sets up your tenancy (cloud environment)

---

## Part 2: Create Virtual Machine (15 minutes)

### Step 3: Login to Oracle Cloud

1. Go to: https://cloud.oracle.com
2. Enter your **Cloud Account Name** (provided in email)
3. Login with credentials

### Step 4: Create Compute Instance

1. **Navigate to Compute**
   - Click hamburger menu (☰) top left
   - Compute → Instances
   - Click **"Create Instance"**

2. **Configure Instance**

   **Name:** `inshureit-prod`

   **Placement:**
   - Availability domain: Choose any (usually first one)

   **Image and Shape:**
   - Click **"Change Image"**
   - Select: **Ubuntu 22.04**
   - Click **"Select Image"**

   - Click **"Change Shape"**
   - Select: **Ampere (ARM-based processor)**
   - Choose: **VM.Standard.A1.Flex**
   - Set:
     - **OCPUs:** 2 (or 4 if you want to use all free credits)
     - **Memory:** 12 GB (or 24 GB)
   - Click **"Select Shape"**

3. **Networking**
   - Keep default VCN (Virtual Cloud Network)
   - Keep default subnet
   - ✅ **Assign a public IPv4 address** (should be checked)

4. **Add SSH Keys**

   **Option A: Generate new keys (Recommended)**
   - Select **"Generate a key pair for me"**
   - Click **"Save Private Key"** (saves as `.key` file)
   - Click **"Save Public Key"** (optional)
   - ⚠️ **Important:** Save the private key securely!

   **Option B: Use existing SSH key**
   - If you have SSH keys: Select **"Upload public key files"**
   - Upload your `~/.ssh/id_rsa.pub`

5. **Boot Volume**
   - Keep default size (47 GB minimum)
   - Or increase to 100-200 GB (still free)

6. **Create Instance**
   - Review settings
   - Click **"Create"**
   - Wait 2-3 minutes for provisioning
   - Status will change from "Provisioning" to "Running"

7. **Note Your Public IP**
   - Once running, copy the **Public IP address**
   - Example: `123.45.67.89`
   - You'll need this to SSH in

---

## Part 3: Configure Networking (10 minutes)

### Step 5: Open Required Ports

Oracle Cloud blocks most ports by default. We need to open:
- Port 80 (HTTP)
- Port 443 (HTTPS)
- Port 22 (SSH - already open)

**Configure Security List:**

1. **Navigate to VCN**
   - Hamburger menu → Networking → Virtual Cloud Networks
   - Click on your VCN (usually "vcn-[date]")

2. **Edit Security List**
   - Click **"Security Lists"** on left
   - Click on **"Default Security List"**
   - Click **"Add Ingress Rules"**

3. **Add Rule for HTTP (Port 80)**
   - Source CIDR: `0.0.0.0/0`
   - IP Protocol: `TCP`
   - Destination Port Range: `80`
   - Description: `HTTP`
   - Click **"Add Ingress Rules"**

4. **Add Rule for HTTPS (Port 443)**
   - Click **"Add Ingress Rules"** again
   - Source CIDR: `0.0.0.0/0`
   - IP Protocol: `TCP`
   - Destination Port Range: `443`
   - Description: `HTTPS`
   - Click **"Add Ingress Rules"**

---

## Part 4: SSH into Server & Initial Setup (10 minutes)

### Step 6: Connect to Your Server

**On Mac/Linux:**

```bash
# Change permission on private key
chmod 400 ~/Downloads/ssh-key-*.key

# SSH into server (replace with your IP and key path)
ssh -i ~/Downloads/ssh-key-*.key ubuntu@YOUR_PUBLIC_IP
```

**On Windows (using PowerShell):**

```powershell
# Navigate to key location
cd Downloads

# SSH into server
ssh -i ssh-key-*.key ubuntu@YOUR_PUBLIC_IP
```

**First time connecting:**
- You'll see: "Are you sure you want to continue connecting?"
- Type: `yes`

### Step 7: Initial Server Setup

Once connected, run these commands:

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Configure Ubuntu firewall (allow ports)
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable

# Install required software
sudo apt install -y git curl

# Install Docker (one command)
curl -fsSL https://get.docker.com | sh

# Add ubuntu user to docker group
sudo usermod -aG docker ubuntu

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verify installations
docker --version
docker-compose --version

# Log out and back in for docker group to take effect
exit
```

**SSH back in:**
```bash
ssh -i ~/Downloads/ssh-key-*.key ubuntu@YOUR_PUBLIC_IP
```

---

## Part 5: Deploy Your Application (15 minutes)

### Step 8: Clone Your Repository

```bash
# Create application directory
sudo mkdir -p /opt/inshureit
sudo chown ubuntu:ubuntu /opt/inshureit
cd /opt/inshureit

# Clone your repository
git clone https://github.com/yourusername/inshureit.git .

# Verify files
ls -la
```

### Step 9: Configure Environment Variables

```bash
# Copy environment template
cp .env.docker.example .env.docker

# Edit with nano
nano .env.docker
```

**Fill in these values:**

```bash
# Node Environment
NODE_ENV=production

# Database Configuration
DB_ROOT_PASSWORD=YourStrongRootPassword123!
DB_USER=inshureit
DB_PASSWORD=YourStrongDBPassword456!
DB_PORT=3306

# Backend Configuration
API_PORT=5001

# Frontend Configuration
FRONTEND_PORT=80
VITE_API_URL=http://YOUR_PUBLIC_IP:5001

# JWT Configuration (VERY IMPORTANT - Generate a strong secret)
JWT_SECRET=paste-your-64-character-random-string-here
JWT_EXPIRATION=7d

# CORS Configuration (update after you get your domain)
ALLOWED_ORIGINS=http://YOUR_PUBLIC_IP,http://www.yourdomain.com

# Email Configuration (Optional - can configure later)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_FROM=noreply@yourdomain.com

# Security
BCRYPT_ROUNDS=12
```

**Save and exit:**
- Press `Ctrl + X`
- Press `Y` to confirm
- Press `Enter`

### Step 10: Deploy with Docker

```bash
# Make deploy script executable
chmod +x scripts/deploy.sh

# Deploy (choose option 1 - Fresh deployment)
./scripts/deploy.sh
```

**What happens:**
1. Builds Docker images (takes 5-10 minutes first time)
2. Starts MySQL database
3. Starts backend API
4. Starts frontend
5. Runs database migrations
6. Seeds database with admin user

**When prompted "seed database?"** → Type `y`

**Wait for completion** - You'll see:
```
✓ Deployment completed successfully!

Services running:
NAME                    STATUS
inshureit-frontend      Up
inshureit-api          Up
inshureit-db           Up

Access your application at: http://localhost:80
API available at: http://localhost:5001
```

### Step 11: Verify Deployment

```bash
# Check all services are running
docker-compose ps

# Check logs
docker-compose logs -f
# Press Ctrl+C to exit logs
```

---

## Part 6: Setup Domain & SSL (Optional but Recommended)

### Step 12: Configure Domain (If you have one)

**Update DNS Records:**

1. Go to your domain registrar (GoDaddy, Namecheap, etc.)
2. Add these DNS records:

```
Type    Name    Value               TTL
A       @       YOUR_PUBLIC_IP      3600
A       www     YOUR_PUBLIC_IP      3600
A       api     YOUR_PUBLIC_IP      3600
```

3. Wait 5-10 minutes for DNS propagation

**Verify DNS:**
```bash
# On your local computer
ping yourdomain.com
# Should show your Oracle Cloud IP
```

### Step 13: Install SSL Certificate (HTTPS)

**On your server (SSH):**

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx nginx

# Stop Docker frontend temporarily
docker-compose stop frontend

# Configure Nginx as reverse proxy
sudo nano /etc/nginx/sites-available/inshureit
```

**Paste this configuration:**

```nginx
# Frontend
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# API Backend
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:5001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

**Save and enable:**

```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/inshureit /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# Start Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com -d api.yourdomain.com

# Follow prompts:
# - Enter email
# - Agree to terms
# - Choose redirect HTTP to HTTPS (option 2)

# Update Docker frontend port
cd /opt/inshureit
nano .env.docker
# Change FRONTEND_PORT=3000 (since Nginx uses 80)

# Update API URL
# Change VITE_API_URL=https://api.yourdomain.com

# Restart services
docker-compose down
docker-compose up -d
```

**Test SSL:**
- Visit: https://yourdomain.com
- Should show secure padlock 🔒

---

## Part 7: Final Configuration & Testing (10 minutes)

### Step 14: Update CORS Settings

```bash
cd /opt/inshureit
nano .env.docker

# Update ALLOWED_ORIGINS with your actual domain
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

# Restart backend
docker-compose restart backend
```

### Step 15: Test Everything

**Test Checklist:**
- [ ] Visit https://yourdomain.com - Homepage loads
- [ ] Submit a quote (Solo) - Form works
- [ ] Submit a quote (Joint) - Form works
- [ ] Login to backoffice: admin@inshureit.com / Admin@123
- [ ] Download quotes - Excel file downloads
- [ ] Change admin password
- [ ] Test all navigation links
- [ ] Test on mobile device

### Step 16: Security Hardening

```bash
# Change default admin password (via website)
# Login → Change Password → Use strong password

# Setup automatic security updates
sudo apt install -y unattended-upgrades
sudo dpkg-reconfigure --priority=low unattended-upgrades

# Configure database backups
cd /opt/inshureit

# Create backup script
nano backup.sh
```

**Paste:**

```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
docker-compose exec -T database mysqldump -u root -p${DB_ROOT_PASSWORD} inshureit > /opt/backups/backup_$DATE.sql
find /opt/backups -name "backup_*.sql" -mtime +7 -delete
```

**Setup cron:**

```bash
# Make executable
chmod +x backup.sh

# Create backup directory
sudo mkdir -p /opt/backups
sudo chown ubuntu:ubuntu /opt/backups

# Add to crontab (daily at 2am)
crontab -e
# Choose nano (option 1)
# Add this line at the bottom:
0 2 * * * /opt/inshureit/backup.sh
```

---

## 🎉 You're Live!

Your InshureIt application is now running on Oracle Cloud FREE tier!

### Your URLs:
- **Frontend:** https://yourdomain.com
- **API:** https://api.yourdomain.com
- **Admin:** https://yourdomain.com/backoffice/login

### Default Credentials:
- **Email:** admin@inshureit.com
- **Password:** Admin@123
- ⚠️ **CHANGE IMMEDIATELY!**

---

## 📊 Monitoring & Maintenance

### Daily Commands

```bash
# SSH into server
ssh -i ~/path/to/key ubuntu@YOUR_IP

# Check services status
docker-compose ps

# View logs
docker-compose logs -f

# Check disk space
df -h

# Check memory usage
free -h
```

### Weekly Tasks

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Restart services (if needed)
docker-compose restart

# Verify backups exist
ls -lh /opt/backups/
```

### Updating Your Application

```bash
# SSH into server
ssh -i ~/path/to/key ubuntu@YOUR_IP

# Navigate to app directory
cd /opt/inshureit

# Pull latest code
git pull origin main

# Rebuild and restart
docker-compose up -d --build

# Run migrations (if needed)
docker-compose exec backend npx prisma db push
```

---

## 🆘 Troubleshooting

### Can't SSH into server
```bash
# Check instance is running in Oracle Console
# Verify you're using correct IP
# Check key permissions: chmod 400 key-file.key
```

### Services won't start
```bash
# Check logs
docker-compose logs

# Restart all services
docker-compose down
docker-compose up -d

# Check disk space
df -h
```

### Database connection errors
```bash
# Check database is running
docker-compose ps

# Restart database
docker-compose restart database

# Check environment variables
cat .env.docker
```

### Website not accessible
```bash
# Check firewall
sudo ufw status

# Check Oracle Cloud security list (in console)
# Check Nginx status
sudo systemctl status nginx

# Check Docker services
docker-compose ps
```

---

## 💰 Cost Monitoring

Oracle Cloud Always Free resources:

**What you're using:**
- ✅ 1 VM (2-4 OCPU, 12-24GB RAM) - FREE
- ✅ 100-200 GB storage - FREE
- ✅ Network egress (10TB/month) - FREE

**Monitor usage:**
1. Oracle Cloud Console → Governance → Limits, Quotas and Usage
2. Check you're within Always Free limits
3. Set up budget alerts (optional)

**Important:**
- You WON'T be charged as long as you stay in Free Tier
- Oracle will email if you approach limits
- No surprise charges!

---

## 📞 Support Resources

- **Oracle Cloud Docs:** https://docs.oracle.com/en-us/iaas/
- **Oracle Support:** https://www.oracle.com/support/
- **Community:** https://community.oracle.com/

---

## ✅ Deployment Checklist

Before you finish:

- [ ] Instance running
- [ ] Docker installed
- [ ] Application deployed
- [ ] Database seeded
- [ ] Domain configured
- [ ] SSL certificate installed
- [ ] Admin password changed
- [ ] All pages tested
- [ ] Backups configured
- [ ] Monitoring setup

---

**Congratulations! You're live on Oracle Cloud for FREE! 🚀**

**Estimated total cost:** £0/month forever
**Total setup time:** 1-2 hours
**Uptime:** 24/7

Your InshureIt application is now production-ready!
