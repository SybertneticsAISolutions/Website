# DNS Configuration Guide

## Issue: www.sybertnetics.com Not Working

**Current Status:**
- ✅ `https://sybertnetics.com` - Working
- ❌ `https://www.sybertnetics.com` - Not working

## Root Cause Analysis

The `www` subdomain is not properly configured in your DNS settings. This is a common issue when only the apex domain (`sybertnetics.com`) is configured but the `www` subdomain is missing.

## Solution: Configure www Subdomain

### Option 1: CNAME Record (Recommended)

Add a CNAME record in your DNS provider:

```
Type: CNAME
Name: www
Value: sybertnetics.com
TTL: 3600 (or default)
```

### Option 2: A Record (Alternative)

If CNAME doesn't work, add an A record:

```
Type: A
Name: www
Value: [Your hosting IP address]
TTL: 3600 (or default)
```

## Step-by-Step Instructions

### For Netlify (Current Hosting)

1. **Get Netlify DNS Information**
   - Go to your Netlify dashboard
   - Navigate to Site Settings > Domain management
   - Look for the nameservers or IP addresses

2. **Configure DNS Records**
   - Log into your domain registrar (where you bought sybertnetics.com)
   - Go to DNS management
   - Add the CNAME record as shown above

3. **Verify Configuration**
   ```bash
   # Check DNS propagation
   nslookup www.sybertnetics.com
   dig www.sybertnetics.com
   ```

### For Cloudflare (If Using)

1. **Add DNS Record**
   - Go to Cloudflare dashboard
   - Select your domain
   - Go to DNS > Records
   - Add CNAME record:
     - Type: CNAME
     - Name: www
     - Target: sybertnetics.com
     - Proxy status: Proxied (orange cloud)

2. **Page Rules (Optional)**
   - Create page rule to redirect www to non-www
   - Or vice versa for consistency

### For Other DNS Providers

The process is similar across providers:

1. **GoDaddy**
   - DNS Management > Add Record
   - Type: CNAME, Name: www, Value: sybertnetics.com

2. **Namecheap**
   - Domain List > Manage > Advanced DNS
   - Add CNAME record

3. **Google Domains**
   - DNS > Manage Custom Records
   - Add CNAME record

## Testing DNS Configuration

### 1. DNS Propagation Check

```bash
# Check if DNS is resolving
nslookup www.sybertnetics.com

# Expected output:
# www.sybertnetics.com canonical name = sybertnetics.com
# sybertnetics.com has address [IP_ADDRESS]
```

### 2. Online DNS Checkers

- [whatsmydns.net](https://whatsmydns.net)
- [dnschecker.org](https://dnschecker.org)
- [mxtoolbox.com](https://mxtoolbox.com)

### 3. Browser Testing

- Test in different browsers
- Test in incognito/private mode
- Clear DNS cache if needed

## DNS Propagation Time

- **Typical**: 15 minutes to 24 hours
- **Most cases**: 1-2 hours
- **Factors**: TTL settings, DNS provider, geographic location

## Troubleshooting

### If CNAME Doesn't Work

1. **Check for A Record Conflicts**
   - Remove any existing A records for www
   - CNAME and A records cannot coexist

2. **Use A Record Instead**
   ```
   Type: A
   Name: www
   Value: [Your hosting IP]
   ```

3. **Check TTL Settings**
   - Lower TTL for faster propagation
   - Higher TTL for better performance

### Common Issues

1. **CNAME at Apex Domain**
   - CNAME cannot be used at apex domain (sybertnetics.com)
   - Only use CNAME for subdomains (www.sybertnetics.com)

2. **Multiple A Records**
   - Ensure only one A record for www
   - Remove conflicting records

3. **DNS Provider Limitations**
   - Some providers have restrictions
   - Contact support if needed

## Best Practices

### 1. Redirect Strategy

Choose one approach and stick to it:

**Option A: Redirect www to non-www**
```
www.sybertnetics.com → sybertnetics.com
```

**Option B: Redirect non-www to www**
```
sybertnetics.com → www.sybertnetics.com
```

### 2. SSL Certificate

Ensure SSL certificate covers both:
- `sybertnetics.com`
- `www.sybertnetics.com`

### 3. SEO Considerations

- Use 301 redirects (permanent)
- Update canonical URLs
- Update sitemap.xml
- Update Google Search Console

## Monitoring

### 1. Set Up Monitoring

```bash
# Simple monitoring script
#!/bin/bash
if curl -s -o /dev/null -w "%{http_code}" https://www.sybertnetics.com | grep -q "200"; then
    echo "www.sybertnetics.com is working"
else
    echo "www.sybertnetics.com is down"
fi
```

### 2. Uptime Monitoring

- [UptimeRobot](https://uptimerobot.com)
- [Pingdom](https://pingdom.com)
- [StatusCake](https://statuscake.com)

## Verification Checklist

- [ ] DNS record added correctly
- [ ] DNS propagation completed
- [ ] Website loads on www subdomain
- [ ] SSL certificate working
- [ ] Redirects working (if configured)
- [ ] SEO elements updated
- [ ] Monitoring set up

## Support Resources

- **DNS Provider Support**: Contact your domain registrar
- **Netlify Support**: [netlify.com/support](https://netlify.com/support)
- **Online Tools**: DNS checkers and propagation tools
- **Community**: Web hosting forums and communities 