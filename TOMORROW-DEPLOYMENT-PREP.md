# Tomorrow's Deployment - Preparation Checklist

Everything you need to prepare TODAY for tomorrow's Oracle Cloud deployment.

## ⏰ Time Estimate
- **Preparation (Today):** 30 minutes
- **Deployment (Tomorrow):** 1-2 hours
- **Total:** ~2.5 hours

---

## ✅ What to Prepare TONIGHT (30 minutes)

### 1. Account Information (5 minutes)

Gather these details:

- [ ] **Credit/Debit Card**
  - Have physical card ready
  - Note: Won't be charged, only for verification
  - Keep handy during signup

- [ ] **Email Address**
  - Use a professional email
  - You'll receive verification emails
  - Have access during deployment

- [ ] **Phone Number**
  - For SMS verification
  - Must be able to receive SMS tomorrow

- [ ] **Company Details** (Optional)
  - Company name (or use personal name)
  - Address (use real address)

### 2. Domain Name (Optional - 10 minutes)

**If you have a domain:**
- [ ] Login to your domain registrar (GoDaddy, Namecheap, etc.)
- [ ] Make sure you can access DNS settings
- [ ] Have credentials ready

**If you DON'T have a domain:**
- [ ] No problem! You can use IP address initially
- [ ] Can add domain later (takes 5 minutes)
- [ ] Recommended registrars: Namecheap, Google Domains
- [ ] Cost: £8-12/year

### 3. Generate Secrets (5 minutes)

Generate these NOW and save in a secure place:

```bash
# Generate JWT Secret (run this command)
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Copy the output and save it as: **JWT_SECRET**

Example output:
```
a1b2c3d4e5f6... (128 characters)
```

**Create these passwords:**
- [ ] **Database Root Password** (12+ characters, mix of letters/numbers/symbols)
  - Example: `MyDb@Root2024!Secure`

- [ ] **Database User Password** (12+ characters)
  - Example: `InshureDB#2024Pass`

- [ ] **New Admin Password** (for changing default password)
  - Example: `Admin@Secure2024!InshureIt`

**Save all these in a text file:**

```
JWT_SECRET=<your-128-char-secret>
DB_ROOT_PASSWORD=MyDb@Root2024!Secure
DB_PASSWORD=InshureDB#2024Pass
NEW_ADMIN_PASSWORD=Admin@Secure2024!InshureIt
```

⚠️ **IMPORTANT:** Save this file securely, you'll need it tomorrow!

### 4. Email Configuration (Optional - 5 minutes)

If you want email notifications (quote confirmations):

**Option A: Gmail** (Recommended)
- [ ] Have Gmail account ready
- [ ] Enable 2-factor authentication
- [ ] Generate App Password:
  1. Go to: https://myaccount.google.com/apppasswords
  2. Create password for "Mail"
  3. Copy the 16-character password
  4. Save as: `SMTP_PASS`

**Option B: Skip for now**
- [ ] Can configure email later
- [ ] App works without email (just no confirmations sent)

### 5. Code Repository (5 minutes)

Make sure your code is on GitHub:

```bash
# Check if code is pushed
cd /Users/cyprian/Documents/claude-projects/inshureit
git status

# If you have uncommitted changes:
git add .
git commit -m "Prepare for production deployment"
git push origin main

# Note your repository URL
git remote -v
```

**Save your GitHub repo URL:**
```
https://github.com/YOUR_USERNAME/inshureit.git
```

### 6. Download Required Files

Print or save these for reference tomorrow:

- [ ] **DEPLOY-ORACLE-CLOUD.md** (The main guide)
- [ ] **TOMORROW-DEPLOYMENT-PREP.md** (This file)
- [ ] **PRODUCTION-CHECKLIST.md** (For testing after deployment)

---

## 📝 Create Your Deployment Worksheet

Copy this template and fill in the values:

```
=== INSHUREIT DEPLOYMENT WORKSHEET ===

ACCOUNT INFO:
Email: _______________________
Phone: _______________________

GITHUB:
Repository URL: _______________________

SECRETS (Keep secure!):
JWT_SECRET: _______________________
DB_ROOT_PASSWORD: _______________________
DB_PASSWORD: _______________________
NEW_ADMIN_PASSWORD: _______________________

DOMAIN (Optional):
Domain name: _______________________
Registrar login: _______________________

EMAIL (Optional):
SMTP_HOST: smtp.gmail.com
SMTP_USER: _______________________
SMTP_PASS: _______________________

ORACLE CLOUD (Fill in tomorrow):
Public IP: _______________________
SSH Key Location: _______________________
Cloud Account Name: _______________________
```

---

## 📱 Tomorrow's Timeline

### Morning (1-2 hours block recommended)

**08:00 - 08:30** ☕ Get coffee, review guide

**08:30 - 08:40** Create Oracle Cloud account

**08:40 - 08:55** Create VM instance

**08:55 - 09:05** Configure networking/firewall

**09:05 - 09:15** SSH and install software

**09:15 - 09:30** Deploy application

**09:30 - 09:45** Configure domain & SSL (if applicable)

**09:45 - 10:00** Testing and verification

**10:00+** ✅ **LIVE!**

---

## 🎯 Pre-Deployment Test (Do This Now - 5 min)

Make sure your app works locally:

```bash
# Start development server
cd /Users/cyprian/Documents/claude-projects/inshureit
npm run dev
```

**Test:**
- [ ] Homepage loads (http://localhost:5173)
- [ ] Submit a quote
- [ ] Login to backoffice
- [ ] Download works

If everything works → **Ready for deployment!**

---

## 🚨 Common Pitfalls to Avoid

### 1. Don't Panic During Account Creation
- Oracle takes 5-30 minutes to provision account
- You'll receive email when ready
- Normal wait time!

### 2. Save Your SSH Key!
- When creating VM, Oracle generates SSH key
- **Download and save it immediately**
- You can't download it again later
- Save to: `~/Documents/inshureit-ssh-key.key`

### 3. Write Down Your Public IP
- Oracle assigns public IP to your VM
- Copy it immediately
- You need it for:
  - SSH access
  - Environment configuration
  - DNS configuration

### 4. Don't Skip Security Groups
- Ports 80 and 443 must be opened in Oracle
- Both in Oracle Console AND on server (ufw)
- If skipped, website won't be accessible

### 5. Test Before Adding Domain
- First deploy with IP address
- Make sure everything works
- Then add domain/SSL
- Easier to troubleshoot!

---

## 🆘 Emergency Contacts

If you get stuck tomorrow:

**Oracle Support:**
- Chat: In Oracle Cloud Console (bottom right)
- Docs: https://docs.oracle.com

**Community Help:**
- Oracle Community: https://community.oracle.com
- Stack Overflow: https://stackoverflow.com

**InshureIt Documentation:**
- Main guide: DEPLOY-ORACLE-CLOUD.md
- Troubleshooting: See guide section "Troubleshooting"

---

## ✅ Tonight's Checklist Summary

Before you go to bed:

- [ ] Credit card accessible
- [ ] Email/phone verified
- [ ] Secrets generated and saved
- [ ] GitHub repo URL noted
- [ ] Deployment worksheet filled
- [ ] Local app tested and working
- [ ] Guide downloaded/printed
- [ ] 2 hours blocked in calendar tomorrow
- [ ] Coffee/tea ready for tomorrow ☕

---

## 💤 Rest Well!

You're prepared! Tomorrow will be smooth.

**What to expect:**
- ✅ Account creation: Easy
- ✅ VM setup: Straightforward (follow guide)
- ✅ Deployment: Automated (one script)
- ✅ Testing: Quick checklist
- ✅ Result: Live production app!

**Estimated success rate:** 95%+ (if you follow the guide)

---

## 🌅 Tomorrow Morning

1. ☕ Get coffee
2. 📖 Open DEPLOY-ORACLE-CLOUD.md
3. 📝 Have your worksheet ready
4. 🚀 Start at "Part 1: Create Oracle Cloud Account"

**Good luck! You've got this! 🎉**

---

**Questions before tomorrow?**
- Review DEPLOY-ORACLE-CLOUD.md tonight
- Check the Troubleshooting section
- Everything you need is documented

**See you in production tomorrow! 🚀**
