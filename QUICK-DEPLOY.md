# Quick Deployment Guide

This is a simplified guide to get InshureIt running in production quickly. For detailed information, see [DEPLOYMENT.md](DEPLOYMENT.md).

## 🚀 Fastest Method: Docker Deployment

### Prerequisites
- Docker & Docker Compose installed
- Domain name (optional for testing)
- 2GB+ RAM server

### Steps

#### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/inshureit.git
cd inshureit
```

#### 2. Configure Environment
```bash
# Copy the example environment file
cp .env.docker.example .env.docker

# Edit the file with your settings
nano .env.docker
```

**Minimum required changes:**
- `JWT_SECRET` - Generate with: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`
- `DB_PASSWORD` - Set a strong database password
- `DB_ROOT_PASSWORD` - Set a strong root password
- `VITE_API_URL` - Your API domain (e.g., https://api.yourdomain.com)
- `ALLOWED_ORIGINS` - Your frontend domain (e.g., https://yourdomain.com)

#### 3. Deploy
```bash
# Make the deploy script executable
chmod +x scripts/deploy.sh

# Run deployment
./scripts/deploy.sh
# Choose option 1 (Fresh deployment)
```

#### 4. Access Your Application
- Frontend: http://localhost (or your domain)
- API: http://localhost:5001
- Default admin: admin@inshureit.com / Admin@123

⚠️ **IMPORTANT**: Change the admin password immediately!

---

## 🌐 Production Hosting Options

### Option 1: DigitalOcean Droplet ($12/month)

**Best for**: Small to medium scale

1. **Create Droplet**
   - Choose Ubuntu 22.04
   - Select $12/month plan (2GB RAM)
   - Add SSH key

2. **Setup Domain**
   - Point A record to droplet IP
   - Configure DNS for www and api subdomains

3. **Deploy**
   ```bash
   ssh root@your-server-ip

   # Install Docker
   curl -fsSL https://get.docker.com -o get-docker.sh
   sh get-docker.sh

   # Clone and deploy
   git clone https://github.com/yourusername/inshureit.git
   cd inshureit
   cp .env.docker.example .env.docker
   nano .env.docker  # Configure your settings
   ./scripts/deploy.sh
   ```

4. **Setup SSL**
   ```bash
   # Install Certbot
   apt install certbot python3-certbot-nginx

   # Get certificate
   certbot --nginx -d yourdomain.com -d www.yourdomain.com -d api.yourdomain.com
   ```

### Option 2: Railway ($5-10/month)

**Best for**: Zero-config deployment

1. **Create Account** at [railway.app](https://railway.app)

2. **Deploy Database**
   - New Project → Add MySQL
   - Copy connection string

3. **Deploy Backend**
   - New Project → Deploy from GitHub
   - Select server folder
   - Add environment variables
   - Deploy

4. **Deploy Frontend**
   - New Project → Deploy from GitHub
   - Select client folder
   - Set VITE_API_URL to backend URL
   - Deploy

### Option 3: AWS Free Tier

**Best for**: Learning, testing, first year free

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed AWS setup.

---

## 📋 Quick Commands

### Docker Commands
```bash
# View logs
docker-compose logs -f

# Restart services
docker-compose restart

# Stop services
docker-compose down

# Backup database
docker-compose exec database mysqldump -u root -p inshureit > backup.sql

# Update application
git pull
docker-compose up -d --build
```

### Database Management
```bash
# Access database
docker-compose exec database mysql -u root -p inshureit

# Run migrations
docker-compose exec backend npx prisma db push

# Seed database
docker-compose exec backend npx prisma db seed
```

---

## 🔐 Security Checklist

Before going live:

- [ ] Change default admin password
- [ ] Set strong JWT_SECRET (64+ characters)
- [ ] Enable SSL/HTTPS
- [ ] Configure firewall (ports 80, 443 only)
- [ ] Set strong database passwords
- [ ] Configure SMTP for email notifications
- [ ] Enable database backups
- [ ] Review CORS settings
- [ ] Test all functionality

---

## 🆘 Common Issues

### Port Already in Use
```bash
# Stop conflicting services
sudo systemctl stop nginx
sudo systemctl stop apache2

# Or change ports in .env.docker
FRONTEND_PORT=8080
API_PORT=5002
```

### Database Connection Failed
```bash
# Check database is running
docker-compose ps

# View database logs
docker-compose logs database

# Restart database
docker-compose restart database
```

### Build Failures
```bash
# Clean rebuild
docker-compose down
docker system prune -a
docker-compose up -d --build
```

---

## 📞 Need Help?

- **Full Documentation**: [DEPLOYMENT.md](DEPLOYMENT.md)
- **Development Guide**: [DEVELOPMENT.md](DEVELOPMENT.md)
- **Issues**: Create an issue on GitHub

---

## 💰 Estimated Costs

| Provider | Monthly Cost | Notes |
|----------|-------------|-------|
| Railway | $5-10 | Easiest setup |
| DigitalOcean | $12 | Full control |
| AWS | $0-20 | Free tier first year |
| Heroku | $7 | Simple deployment |

**Recommended for starting**: Railway or DigitalOcean

---

## ✅ Post-Deployment

After deployment:

1. Test quote submission
2. Login to backoffice
3. Change admin password
4. Test download functionality
5. Verify email notifications
6. Setup monitoring (UptimeRobot)
7. Schedule database backups

---

**Ready to deploy? Start with Step 1 above! 🚀**

For production-grade deployment with advanced features, see [DEPLOYMENT.md](DEPLOYMENT.md).
