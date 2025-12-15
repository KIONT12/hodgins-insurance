# Deployment Guide - Hodgins.insure

## Pre-Deployment Checklist

### 1. Environment Configuration

Create production `.env` file:

```bash
# Production Environment
PORT=3001
NODE_ENV=production

# API Configuration
VITE_API_URL=https://api.hodgins.insure

# Lead Storage/CRM
LEADS_STORAGE=webhook
WEBHOOK_URL=https://your-crm.com/api/leads
CRM_API_KEY=your_api_key_here

# Email Notifications (Optional)
SENDGRID_API_KEY=your_sendgrid_key
NOTIFICATION_EMAIL=sales@hodgins.insure

# Security
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=5
```

### 2. Update Configuration Files

**index.html** - Update meta tags:
- Change URLs from localhost to production domain
- Add real Google Analytics ID
- Add Facebook Pixel ID
- Update canonical URLs

**vercel.json** - Verify settings:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

### 3. Security Checklist

- [ ] SSL certificate installed (HTTPS)
- [ ] Environment variables secured
- [ ] CORS origins updated to production domains
- [ ] Rate limiting configured
- [ ] Honeypot field implemented
- [ ] API endpoints secured
- [ ] No sensitive data in client-side code

### 4. Performance Optimization

- [ ] Images optimized (WebP format)
- [ ] Code minified
- [ ] Gzip/Brotli compression enabled
- [ ] CDN configured (optional)
- [ ] Lazy loading implemented
- [ ] Bundle size < 200KB

### 5. Legal & Compliance

- [ ] Privacy Policy page created
- [ ] Terms of Service page created
- [ ] TCPA consent language verified
- [ ] Cookie consent banner (if needed)
- [ ] License numbers updated
- [ ] Contact information accurate

## Deployment Options

### Option 1: Vercel (Recommended for Frontend)

#### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

#### Step 2: Login
```bash
vercel login
```

#### Step 3: Deploy
```bash
# Test deployment
vercel

# Production deployment
vercel --prod
```

#### Step 4: Configure Environment Variables

In Vercel Dashboard:
1. Go to Project Settings → Environment Variables
2. Add all variables from `.env`
3. Set for Production environment

#### Step 5: Configure Custom Domain

1. Go to Project Settings → Domains
2. Add `hodgins.insure` and `www.hodgins.insure`
3. Update DNS records as instructed

**DNS Records:**
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### Option 2: Netlify

#### Step 1: Build Settings

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/api/*"
  to = "https://your-api-server.com/api/:splat"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### Step 2: Deploy

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

### Option 3: AWS (Full Stack)

#### Frontend (S3 + CloudFront)

1. **Build the app:**
```bash
npm run build
```

2. **Create S3 bucket:**
```bash
aws s3 mb s3://hodgins-insure
aws s3 sync dist/ s3://hodgins-insure
```

3. **Configure CloudFront distribution**
4. **Set up SSL certificate with ACM**

#### Backend (EC2 or Lambda)

**Using EC2:**

1. **SSH into server:**
```bash
ssh -i key.pem ubuntu@your-server-ip
```

2. **Install dependencies:**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install -g pm2
```

3. **Clone and setup:**
```bash
git clone your-repo
cd your-repo
npm install
```

4. **Start with PM2:**
```bash
pm2 start server/index.js --name hodgins-api
pm2 startup
pm2 save
```

5. **Configure Nginx reverse proxy:**
```nginx
server {
    listen 80;
    server_name api.hodgins.insure;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Option 4: DigitalOcean App Platform

1. **Connect GitHub repository**
2. **Configure build settings:**
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. **Add environment variables**
4. **Deploy**

## Backend API Deployment

### Option A: Vercel Serverless Functions

Convert `server/index.js` to serverless:

```javascript
// api/quote.js
import { rateLimit } from './middleware/rateLimit'

export default async function handler(req, res) {
  // Rate limiting
  await rateLimit(req, res)
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }
  
  // Your existing logic here
}
```

### Option B: Heroku

```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create hodgins-api

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set PORT=3001

# Deploy
git push heroku main
```

### Option C: Railway

1. Go to railway.app
2. Connect GitHub repository
3. Configure environment variables
4. Deploy automatically

## Post-Deployment Tasks

### 1. DNS Configuration

Update DNS records:
```
Type: A
Name: @
Value: [Your server IP]

Type: CNAME
Name: www
Value: hodgins.insure

Type: CNAME
Name: api
Value: [Your API server]
```

### 2. SSL Certificate

**Using Let's Encrypt (Certbot):**
```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d hodgins.insure -d www.hodgins.insure
```

### 3. Monitoring Setup

**Uptime Monitoring:**
- UptimeRobot
- Pingdom
- StatusCake

**Error Tracking:**
- Sentry
- Rollbar
- LogRocket

**Analytics:**
- Google Analytics
- Hotjar
- Microsoft Clarity

### 4. Testing Production

```bash
# Test homepage
curl -I https://hodgins.insure

# Test API
curl -X POST https://api.hodgins.insure/api/quote \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User","email":"test@example.com","phone":"5551234567","zipCode":"33101"}'

# Test rate limiting
for i in {1..6}; do
  curl -X POST https://api.hodgins.insure/api/quote \
    -H "Content-Type: application/json" \
    -d '{"firstName":"Test","lastName":"User","email":"test@example.com","phone":"5551234567","zipCode":"33101"}'
done
```

### 5. Performance Testing

- **Google PageSpeed Insights**: https://pagespeed.web.dev/
- **GTmetrix**: https://gtmetrix.com/
- **WebPageTest**: https://www.webpagetest.org/

Target metrics:
- First Contentful Paint: < 1.8s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3.8s
- Cumulative Layout Shift: < 0.1

### 6. SEO Verification

- [ ] Submit sitemap to Google Search Console
- [ ] Verify structured data with Rich Results Test
- [ ] Check mobile-friendliness
- [ ] Verify canonical URLs
- [ ] Test social media previews

### 7. Backup Strategy

**Database/Leads:**
```bash
# Daily backup script
#!/bin/bash
DATE=$(date +%Y%m%d)
tar -czf leads-backup-$DATE.tar.gz leads/
aws s3 cp leads-backup-$DATE.tar.gz s3://hodgins-backups/
```

**Automated backups:**
- Set up cron job for daily backups
- Store in S3 or similar
- Test restore process monthly

## Troubleshooting

### Common Issues

**1. API not connecting:**
- Check CORS settings
- Verify API URL in environment variables
- Check firewall rules

**2. Form submissions failing:**
- Check rate limiting settings
- Verify API endpoint is accessible
- Check browser console for errors

**3. Slow load times:**
- Enable Gzip compression
- Optimize images
- Use CDN
- Check bundle size

**4. SSL certificate errors:**
- Verify certificate installation
- Check certificate expiration
- Ensure proper redirect from HTTP to HTTPS

## Maintenance

### Regular Tasks

**Daily:**
- Monitor error logs
- Check lead submissions
- Review uptime metrics

**Weekly:**
- Review analytics
- Check conversion rates
- Test form submissions

**Monthly:**
- Update dependencies
- Security audit
- Performance review
- Backup verification

### Updates

```bash
# Update dependencies
npm update

# Check for security vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix
```

## Support Contacts

- **Hosting**: support@vercel.com
- **DNS**: Your domain registrar
- **SSL**: Let's Encrypt community
- **Development**: Your development team

---

**Deployment completed! 🚀**

