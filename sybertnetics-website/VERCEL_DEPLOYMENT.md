# Vercel Deployment Guide

## Overview
This guide will help you deploy your Sybertnetics website to Vercel, a free hosting platform that's perfect for Next.js applications.

## Prerequisites
- GitHub account
- Vercel account (free)
- Supabase project set up (already done)

## Step 1: Prepare Your Repository

### 1.1 Push to GitHub
```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit with Supabase integration"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/yourusername/sybertnetics-website.git
git push -u origin main
```

### 1.2 Verify Clean Repository
Make sure these files are NOT committed:
- `.env.local` (contains your secrets)
- `.vercel/` (Vercel cache)
- `node_modules/`
- `.next/`

## Step 2: Deploy to Vercel

### 2.1 Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Sign up with your GitHub account
3. Complete the setup process

### 2.2 Import Your Project
1. Click "New Project"
2. Select "Import Git Repository"
3. Choose your `sybertnetics-website` repository
4. Click "Import"

### 2.3 Configure Project Settings
- **Framework Preset**: Next.js (should auto-detect)
- **Root Directory**: `./` (leave as default)
- **Build Command**: `npm run build` (should auto-detect)
- **Output Directory**: `.next` (should auto-detect)
- **Install Command**: `npm install` (should auto-detect)

### 2.4 Set Environment Variables
Before deploying, add these environment variables in Vercel:

1. Go to your project settings
2. Click "Environment Variables"
3. Add each variable:

```
NEXT_PUBLIC_SUPABASE_URL=https://dyhwjgxabhdfezuvytru.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5aHdqZ3hhYmhkZmV6dXZ5dHJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzMjQwNDgsImV4cCI6MjA2OTkwMDA0OH0.aWy-dBLrQsmH6SDJFBhwqD5TKExmgnDYq93yPxun2GA
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5aHdqZ3hhYmhkZmV6dXZ5dHJ1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NDMyNDA0OCwiZXhwIjoyMDY5OTAwMDQ4fQ.Q3pm6bRuVH_Trpc_-yzzPfD-q8fg6dJwyTdiGahn5jY

# SMTP Configuration
SMTP_USER=noreply@sybertnetics.com
SMTP_PASS=sraq bhco pspz cgqe
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
RECIPIENT_EMAIL=support@sybertnetics.com

# Company Information
NEXT_PUBLIC_COMPANY_NAME=Sybertnetics AI Solutions
NEXT_PUBLIC_CONTACT_EMAIL=support@sybertnetics.com
CONTACT_EMAIL=support@sybertnetics.com
COMPANY_LINKEDIN=https://linkedin.com/company/sybertnetics
LINKEDIN_URL=https://linkedin.com/company/sybertnetics

# Admin credentials
ADMIN_EMAIL=kaynenbpellegrino@sybertnetics.com
ADMIN_PASSWORD=KcMsLbMnAs2024!!

# Discord Bot Configuration
DISCORD_GUILD_ID=1386616507668365312
DISCORD_BOT_TOKEN=MTM5MTE1ODAxOTIxNTE5NjI2MA.GjwfyE.MvEATevfmz9KSmUxBTvGLGbbjUR3ao3mS-RP2k
```

### 2.5 Deploy
1. Click "Deploy"
2. Wait for the build to complete (usually 2-3 minutes)
3. Your site will be available at `https://your-project-name.vercel.app`

## Step 3: Custom Domain Setup

### 3.1 Add Custom Domain
1. Go to your project settings
2. Click "Domains"
3. Add your domain: `sybertnetics.com`
4. Follow the DNS configuration instructions

### 3.2 DNS Configuration
Add these records to your DNS provider:

**For Vercel:**
- **Type**: CNAME
- **Name**: @
- **Value**: cname.vercel-dns.com

**For www subdomain:**
- **Type**: CNAME  
- **Name**: www
- **Value**: cname.vercel-dns.com

### 3.3 SSL Certificate
Vercel will automatically provision SSL certificates for your domain.

## Step 4: Post-Deployment Verification

### 4.1 Test Your Site
- Visit your deployed site
- Test the contact form
- Test the Sybercraft page
- Verify all links work

### 4.2 Check Environment Variables
- Visit `/api/test-supabase` to verify Supabase connection
- Test contact form submission
- Check admin panel functionality

### 4.3 Monitor Performance
- Use Vercel Analytics (free tier)
- Monitor build logs for any issues
- Check function execution times

## Step 5: Continuous Deployment

### 5.1 Automatic Deployments
- Every push to `main` branch will trigger a new deployment
- Preview deployments are created for pull requests
- You can rollback to previous deployments if needed

### 5.2 Environment Management
- Production: `main` branch
- Preview: Pull requests
- Development: Local development

## Troubleshooting

### Common Issues

**Build Failures:**
- Check build logs in Vercel dashboard
- Verify all dependencies are in `package.json`
- Ensure environment variables are set correctly

**Environment Variables:**
- Make sure all variables are added to Vercel
- Check for typos in variable names
- Verify Supabase credentials are correct

**Domain Issues:**
- DNS propagation can take up to 48 hours
- Verify DNS records are correct
- Check domain verification in Vercel

### Support
- Vercel Documentation: [vercel.com/docs](https://vercel.com/docs)
- Vercel Community: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)

## Cost Breakdown (Free Tier)

**Vercel Free Tier:**
- 100GB bandwidth/month
- Unlimited personal projects
- Automatic HTTPS
- Global CDN
- Serverless functions (10 second timeout)

**Supabase Free Tier:**
- 500MB database
- 2GB bandwidth
- 50,000 monthly active users
- Real-time subscriptions

**Total Cost: $0/month** for your current usage level.

## Next Steps

1. **Monitor Performance**: Use Vercel Analytics
2. **Set Up Monitoring**: Consider adding error tracking (Sentry free tier)
3. **Backup Strategy**: Set up database backups in Supabase
4. **Security**: Review and update security policies
5. **Scaling**: Monitor usage and upgrade when needed

---

**Deployment Status**: ✅ Ready for Vercel deployment
**Estimated Time**: 15-30 minutes
**Difficulty**: Easy 