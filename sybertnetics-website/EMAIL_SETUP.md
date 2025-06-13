# Email Configuration Setup

To enable the contact form email functionality, you need to configure SMTP settings in your environment variables.

## 1. Create Environment File

Create a `.env.local` file in the root of your project with the following variables:

```env
# Company Information
NEXT_PUBLIC_COMPANY_NAME="Sybertnetics AI Solutions"
NEXT_PUBLIC_CONTACT_EMAIL="support@sybertnetics.com"
NEXT_PUBLIC_COMPANY_LINKEDIN="https://linkedin.com/company/sybertnetics"

# SMTP Configuration for sending emails
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
EMAIL_USER="noreply@sybertnetics.com"
EMAIL_PASS="your-app-password"
RECIPIENT_EMAIL="support@sybertnetics.com"
```

## 2. For Existing Google Workspace Setup

If you already have Google Workspace configured (like Sybertnetics does), you just need:

```env
EMAIL_USER=noreply@sybertnetics.com
EMAIL_PASS=your-16-character-app-password
RECIPIENT_EMAIL=support@sybertnetics.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
```

**Your existing Google Workspace app password will work perfectly!**

## 3. Getting Your App Password

1. **Sign in** to your Google Workspace account (`noreply@sybertnetics.com`)
2. **Go to**: [myaccount.google.com](https://myaccount.google.com)
3. **Security → 2-Step Verification**: Must be enabled
4. **Security → App passwords**: Generate new password
5. **Select**: "Mail" and "Other (custom name)"
6. **Name it**: "Sybertnetics Website"
7. **Copy the 16-character app password** (like: `sraq bhco pspz cgqe`)

## 4. Alternative SMTP Providers

### SendGrid (for high-volume production)
```env
SMTP_HOST="smtp.sendgrid.net"
SMTP_PORT="587"
EMAIL_USER="apikey"
EMAIL_PASS="your-sendgrid-api-key"
RECIPIENT_EMAIL="support@sybertnetics.com"
```

### Mailgun
```env
SMTP_HOST="smtp.mailgun.org"
SMTP_PORT="587"
EMAIL_USER="your-mailgun-smtp-username"
EMAIL_PASS="your-mailgun-smtp-password"
RECIPIENT_EMAIL="support@sybertnetics.com"
```

## 5. Development Mode

If no SMTP configuration is provided, the contact form will:
- Still work and show success messages
- Log all form submissions to the console
- Skip actual email sending

This allows you to test the form functionality without setting up email initially.

## 6. Production Deployment

For production on Netlify:
1. Go to your Netlify site dashboard
2. Navigate to Site settings > Environment variables
3. Add all the environment variables listed above
4. Redeploy your site

The contact form will automatically detect when SMTP is configured and start sending emails.

## 7. Email Flow

The system sends two emails:
1. **Thank you email** to the user who submitted the form (from `EMAIL_USER`)
2. **Notification email** to `RECIPIENT_EMAIL` with the form details

Both emails are professionally formatted with your company branding and sent from your `noreply@sybertnetics.com` address. 