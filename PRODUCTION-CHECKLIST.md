# Production Deployment Checklist

Use this checklist to ensure your InshureIt deployment is production-ready.

## Pre-Deployment

### Environment Configuration
- [ ] All environment variables set in production environment
- [ ] `NODE_ENV` set to `production`
- [ ] Strong `JWT_SECRET` configured (64+ random characters)
- [ ] Database credentials secure and different from development
- [ ] SMTP credentials configured for email notifications
- [ ] `ALLOWED_ORIGINS` restricted to your production domains only
- [ ] API URL in frontend points to production backend

### Security
- [ ] Default admin password will be changed after first deployment
- [ ] Database access restricted to application server only
- [ ] Firewall configured (only ports 80, 443, and SSH open)
- [ ] SSL/TLS certificates obtained and configured
- [ ] Security headers configured (CSP, HSTS, X-Frame-Options)
- [ ] Rate limiting enabled on API endpoints
- [ ] CORS properly configured for production domains
- [ ] Sensitive files excluded from version control (.env, keys)

### Database
- [ ] Production database created
- [ ] Database backups configured (automated daily)
- [ ] Database connection pooling configured
- [ ] Database user has appropriate permissions (not root)
- [ ] Database indexes reviewed for performance
- [ ] Backup restoration tested

### Infrastructure
- [ ] Domain name purchased and configured
- [ ] DNS records configured (A, CNAME for www and api)
- [ ] Server/hosting environment provisioned
- [ ] Sufficient resources allocated (CPU, RAM, Disk)
- [ ] Monitoring tools configured
- [ ] Log aggregation setup

## Deployment

### Build Process
- [ ] Frontend built successfully (`npm run build` in client/)
- [ ] Backend built successfully (`npm run build` in server/)
- [ ] No build warnings or errors
- [ ] Build artifacts tested locally
- [ ] Dependencies installed (production only)

### Database Migration
- [ ] Database migrations run successfully
- [ ] Database seeded with initial admin user
- [ ] Database connection verified from application

### Application Deployment
- [ ] Backend deployed and running
- [ ] Frontend deployed and serving
- [ ] Environment variables loaded correctly
- [ ] Application accessible via domain name
- [ ] Health check endpoints responding

### SSL/HTTPS
- [ ] SSL certificate installed
- [ ] HTTPS working for all domains
- [ ] HTTP to HTTPS redirect configured
- [ ] Certificate auto-renewal configured
- [ ] SSL rating A or higher (check at ssllabs.com)

## Post-Deployment

### Testing
- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] Quote form submission works (Solo)
- [ ] Quote form submission works (Joint)
- [ ] Email confirmation sent after quote submission
- [ ] Backoffice login works
- [ ] Dashboard displays correctly
- [ ] Download functionality works (Excel export)
- [ ] Password change functionality works
- [ ] Admin features work (if admin user)
- [ ] All footer links work (Privacy Policy, Terms, etc.)
- [ ] Mobile responsiveness verified

### Security
- [ ] Default admin password changed
- [ ] Test with various user roles (admin, backoffice)
- [ ] Failed login attempts handled correctly
- [ ] Session timeout working
- [ ] Logout functionality working
- [ ] SQL injection prevention tested
- [ ] XSS prevention verified
- [ ] CSRF protection working

### Performance
- [ ] Page load times acceptable (< 3 seconds)
- [ ] Static assets cached properly
- [ ] Images optimized
- [ ] API response times acceptable
- [ ] Database queries optimized
- [ ] Gzip compression enabled

### Monitoring
- [ ] Uptime monitoring configured (e.g., UptimeRobot)
- [ ] Error tracking configured (e.g., Sentry)
- [ ] Application logs accessible
- [ ] Database monitoring setup
- [ ] Disk space monitoring
- [ ] Alert notifications configured
- [ ] Performance monitoring (optional)

### Documentation
- [ ] Production environment documented
- [ ] Access credentials stored securely (password manager)
- [ ] Deployment process documented
- [ ] Rollback procedure documented
- [ ] Emergency contacts listed
- [ ] Server/hosting account details recorded

## Ongoing Maintenance

### Daily
- [ ] Monitor error logs
- [ ] Check application uptime
- [ ] Review any alerts

### Weekly
- [ ] Verify database backups completed
- [ ] Check disk space usage
- [ ] Review performance metrics
- [ ] Check SSL certificate expiry (should be months away)

### Monthly
- [ ] Update dependencies (security patches)
- [ ] Review and rotate logs
- [ ] Database optimization (if needed)
- [ ] Security audit
- [ ] Performance review

### Quarterly
- [ ] Full security audit
- [ ] Disaster recovery test
- [ ] Backup restoration test
- [ ] Review hosting costs and optimization
- [ ] Update documentation

## Emergency Procedures

### Application Down
1. Check server status
2. Check application logs: `docker-compose logs` or `pm2 logs`
3. Check database connectivity
4. Restart services: `docker-compose restart` or `pm2 restart all`
5. If issue persists, restore from backup

### Database Issues
1. Check database logs
2. Verify database is running
3. Check disk space
4. Review recent migrations
5. Restore from backup if necessary

### Security Breach
1. Immediately take application offline
2. Change all passwords and secrets
3. Review logs for unauthorized access
4. Restore from clean backup
5. Contact security professional
6. Notify affected users if required

## Rollback Procedure

If deployment fails or issues are discovered:

### Docker Deployment
```bash
# Stop current deployment
docker-compose down

# Revert code
git checkout <previous-commit>

# Rebuild and deploy
docker-compose up -d --build

# Restore database if needed
docker-compose exec database mysql -u root -p inshureit < backup.sql
```

### Traditional Deployment
```bash
# Stop application
pm2 stop all

# Revert code
git checkout <previous-commit>

# Rebuild
npm run build

# Restart
pm2 restart all
```

## Support Contacts

**Hosting Provider**: [Provider Name]
- Support: [Phone/Email]
- Account: [Account ID]

**Domain Registrar**: [Registrar Name]
- Support: [Phone/Email]

**Database Host**: [Host Name]
- Support: [Phone/Email]

**Email Service**: [Service Name]
- Support: [Phone/Email]

**Emergency Contact**: [Your Contact]
- Phone: [Number]
- Email: [Email]

## Resources

- [DEPLOYMENT.md](DEPLOYMENT.md) - Full deployment guide
- [QUICK-DEPLOY.md](QUICK-DEPLOY.md) - Quick start guide
- [DEVELOPMENT.md](DEVELOPMENT.md) - Development documentation

---

**Status**: Ready for Production ✅

Deployment Date: __________

Deployed By: __________

Sign-off: __________
