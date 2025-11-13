# Oracle Cloud Deployment - Quick Reference Card

Print this page and keep it handy during deployment tomorrow.

---

## 📋 Before You Start

**Have Ready:**
- [ ] Credit card
- [ ] Email access
- [ ] Phone (for SMS)
- [ ] Generated secrets (JWT_SECRET, passwords)
- [ ] GitHub repo URL
- [ ] 2 hours of time

---

## 🚀 Deployment Steps (Quick Version)

### 1. Create Account (10 min)
→ https://www.oracle.com/cloud/free/
- Sign up with email
- Add payment (won't charge)
- Wait for email confirmation

### 2. Create VM (15 min)
**Console → Compute → Instances → Create**
- Name: `inshureit-prod`
- Image: Ubuntu 22.04
- Shape: VM.Standard.A1.Flex (2 OCPU, 12GB RAM)
- ✅ Generate SSH key pair
- ⚠️ **SAVE the private key file!**
- Note the Public IP: `___.___.___.___ `

### 3. Open Ports (5 min)
**Console → Networking → VCN → Security Lists**
- Add ingress rule: Port 80 (HTTP)
- Add ingress rule: Port 443 (HTTPS)

### 4. SSH Connect
```bash
chmod 400 ~/Downloads/ssh-key-*.key
ssh -i ~/Downloads/ssh-key-*.key ubuntu@YOUR_IP
```

### 5. Install Software (10 min)
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Configure firewall
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable

# Install Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker ubuntu

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Log out and back in
exit
ssh -i ~/Downloads/ssh-key-*.key ubuntu@YOUR_IP
```

### 6. Deploy App (15 min)
```bash
# Clone repo
sudo mkdir -p /opt/inshureit
sudo chown ubuntu:ubuntu /opt/inshureit
cd /opt/inshureit
git clone YOUR_GITHUB_REPO_URL .

# Configure environment
cp .env.docker.example .env.docker
nano .env.docker
# Fill in your secrets (use your worksheet)
# Save: Ctrl+X, Y, Enter

# Deploy
chmod +x scripts/deploy.sh
./scripts/deploy.sh
# Choose: 1 (Fresh deployment)
# When asked to seed: y
```

### 7. Test (5 min)
```bash
# Check services
docker-compose ps

# All should show "Up"
```

**Visit:** `http://YOUR_PUBLIC_IP`

**Login:** admin@inshureit.com / Admin@123

**Change password immediately!**

---

## 🌐 Add Domain (Optional)

### DNS Records (at your registrar):
```
Type    Name    Value
A       @       YOUR_PUBLIC_IP
A       www     YOUR_PUBLIC_IP
A       api     YOUR_PUBLIC_IP
```

### Install SSL:
```bash
# Stop frontend
docker-compose stop frontend

# Install Certbot
sudo apt install -y certbot python3-certbot-nginx nginx

# Configure Nginx
sudo nano /etc/nginx/sites-available/inshureit
```

*Copy config from DEPLOY-ORACLE-CLOUD.md Step 13*

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/inshureit /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl start nginx

# Get SSL
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Update .env.docker
nano .env.docker
# FRONTEND_PORT=3000
# VITE_API_URL=https://api.yourdomain.com
# ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

# Restart
docker-compose down && docker-compose up -d
```

---

## 🆘 Quick Troubleshooting

### Can't SSH
```bash
chmod 400 ~/path/to/key.key
```

### Website not accessible
```bash
# Check services
docker-compose ps

# Check Oracle security list (port 80/443 open?)
# Check server firewall
sudo ufw status
```

### Services won't start
```bash
docker-compose logs
docker-compose down
docker-compose up -d
```

---

## 📱 Important Commands

```bash
# View logs
docker-compose logs -f

# Restart services
docker-compose restart

# Stop all
docker-compose down

# Start all
docker-compose up -d

# Update app
git pull origin main
docker-compose up -d --build
```

---

## ✅ Final Checklist

- [ ] Account created
- [ ] VM running
- [ ] Ports open (80, 443)
- [ ] Docker installed
- [ ] App deployed
- [ ] Services running
- [ ] Website accessible
- [ ] Admin password changed
- [ ] Domain configured (optional)
- [ ] SSL installed (optional)
- [ ] All pages tested

---

## 🎯 Your Live URLs

**With IP only:**
- Frontend: http://YOUR_IP
- API: http://YOUR_IP:5001
- Backoffice: http://YOUR_IP/backoffice/login

**With Domain:**
- Frontend: https://yourdomain.com
- API: https://api.yourdomain.com
- Backoffice: https://yourdomain.com/backoffice/login

---

## 📞 If Stuck

1. Check DEPLOY-ORACLE-CLOUD.md (detailed guide)
2. Check logs: `docker-compose logs`
3. Oracle Chat Support (in console)

---

**You've got this! 🚀**

*See full guide: DEPLOY-ORACLE-CLOUD.md*
