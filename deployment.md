# Deploying Sybertnetics Website to Netlify

This guide will help you deploy your Sybertnetics website with the integrated contact form to Netlify.

## Prerequisites

- GitHub account (recommended for continuous deployment)
- Netlify account
- Gmail account for sending emails (or another email provider)

## Deployment Steps

### 1. Prepare your repository

1. Make sure all your files are organized as follows:
   ```
   /
   ├── index.html           # Your main HTML file
   ├── form-handler.js      # JavaScript for form handling
   ├── netlify.toml         # Netlify configuration
   ├── package.json         # Node.js dependencies
   ├── netlify/
   │   └── functions/
   │       └── api.js       # Your serverless function
   ```

2. If you're using Git, initialize a repository and commit your files:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

3. Push to GitHub (optional but recommended):
   ```bash
   git remote add origin https://github.com/yourusername/sybertnetics-website.git
   git push -u origin main
   ```

### 2. Deploy to Netlify

#### Option 1: Deploy from Git (Recommended)

1. Log in to your Netlify account
2. Click "New site from Git"
3. Choose your Git provider (GitHub, GitLab, or Bitbucket)
4. Select your repository
5. Configure build settings:
   - Build command: `npm install`
   - Publish directory: `.` (or your static files directory)
6. Click "Deploy site"

#### Option 2: Deploy manually with Netlify CLI

1. Install Netlify CLI globally:
   ```bash
   npm install -g netlify-cli
   ```

2. Log in to Netlify:
   ```bash
   netlify login
   ```

3. Initialize Netlify site:
   ```bash
   netlify init
   ```

4. Deploy your site:
   ```bash
   netlify deploy --prod
   ```

### 3. Configure Environment Variables

To enable email functionality for your contact form, you need to set up environment variables in Netlify:

1. Go to your site's dashboard in Netlify
2. Navigate to Site settings > Build & deploy > Environment variables
3. Add the following environment variables:
   - `EMAIL_USER`: Your Gmail address
   - `EMAIL_PASS`: Your Gmail app password (not your regular password)
   - `RECIPIENT_EMAIL`: Email where you want to receive form submissions

For Gmail, you'll need to create an App Password:
1. Go to your Google Account
2. Select Security
3. Under "Signing in to Google," select 2-Step Verification
4. At the bottom of the page, select App passwords
5. Select the app and device you want to generate the app password for
6. Select Generate
7. Use this generated password for the `EMAIL_PASS` environment variable

### 4. Test Your Deployment

1. Visit your deployed Netlify site (you'll get a URL like `https://your-site-name.netlify.app`)
2. Navigate to your contact form
3. Fill out the form and submit it
4. Check your email to verify that you received the submission

## Troubleshooting

If you encounter issues with your form submission:

1. Check Netlify's Function logs:
   - Go to your site's dashboard in Netlify
   - Navigate to Functions
   - Click on your function (api) to view logs

2. Make sure your environment variables are set correctly

3. Test locally before deploying:
   ```bash
   netlify dev
   ```

4. Verify that your form's JavaScript is correctly targeting the API endpoints

## Additional Resources

- [Netlify Functions Documentation](https://docs.netlify.com/functions/overview/)
- [Express.js on Netlify](https://docs.netlify.com/frameworks/express/)
- [Debugging Netlify Functions](https://docs.netlify.com/functions/debugging/)