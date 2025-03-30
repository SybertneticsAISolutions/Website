# Website# Sybertnetics Website

## Overview

The Sybertnetics website showcases our revolutionary autonomous AI ecosystem, focusing on Hermod - our flagship AI architect system. This responsive website provides information about our company vision, solutions, and leadership team, while enabling visitors to connect with us through an integrated contact form.

## Project Structure

```
/
├── index.html                # Main website HTML
├── form-handler.js           # Contact form functionality
├── netlify.toml              # Netlify configuration
├── package.json              # Project dependencies
└── netlify/
    └── functions/
        └── api.js            # Serverless backend for email handling
```

## Features

- **Responsive Design**: Optimized for all devices from mobile to desktop
- **Modern UI**: Clean, professional aesthetic with a color scheme featuring blue and green accents
- **Key Sections**:
  - Hero Banner with company tagline
  - About/Vision section
  - Solutions overview highlighting the 22-AI ecosystem
  - Leadership team profiles
  - Contact form with serverless email functionality
- **Contact Form**: Fully functional form that sends emails without requiring a dedicated server

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: Serverless Node.js with Express (via Netlify Functions)
- **Email Service**: Nodemailer configured with SMTP
- **Deployment**: Netlify for both static site and serverless functions

## Setup & Installation

### Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/sybertnetics-website.git
   cd sybertnetics-website
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the local development server**:
   ```bash
   npm run dev
   ```
   This will start the Netlify development server, which emulates both the static site and serverless functions.

4. **View the site**:
   Open your browser and navigate to `http://localhost:8888`

### Environment Variables

For the contact form to work, you'll need to set up the following environment variables:

- `EMAIL_USER`: Email address used to send form submissions
- `EMAIL_PASS`: Password or app password for the email account
- `RECIPIENT_EMAIL`: Email address where form submissions will be sent (defaults to KaynenBPellegrino@Sybertnetics.com)

During development, create a `.env` file in the root directory with these variables.

## Deployment

### Deploying to Netlify

1. **Push your code to a Git repository** (GitHub, GitLab, or Bitbucket)

2. **Connect to Netlify**:
   - Sign in to your Netlify account
   - Click "New site from Git"
   - Choose your repository and configure build settings:
     - Build command: `npm install`
     - Publish directory: `.`

3. **Configure environment variables**:
   - In the Netlify dashboard, go to Site settings > Build & deploy > Environment variables
   - Add the same environment variables as listed above

For more detailed deployment instructions, see the [DEPLOYMENT.md](DEPLOYMENT.md) file.

## Customization

### Website Content

To update website content, edit the `index.html` file:
- Modify text in the relevant sections
- Update images by replacing the placeholder URLs with your actual image URLs
- Add or remove sections as needed

### Styling

All styling is contained within the `<style>` tag in the `index.html` file:
- Update colors by changing the hex codes
- Modify spacing, typography, and layout as needed
- Add new styles for additional content

### Contact Form

The contact form functionality is handled by:
1. The HTML form in `index.html`
2. Frontend JavaScript in `form-handler.js`
3. Backend serverless function in `netlify/functions/api.js`

## Maintenance

### Adding New Leadership Team Members

To add a new team member, add a new `team-member` div to the leadership section:

```html
<div class="team-member">
    <img src="/path/to/photo.jpg" alt="Team Member Name">
    <div class="team-member-info">
        <h3>Team Member Name</h3>
        <p>Position Title</p>
    </div>
</div>
```

### Updating Solutions

To add or update solution offerings, modify the `solution-card` divs in the solutions section:

```html
<div class="solution-card">
    <h3>Solution Name</h3>
    <p>Description of the solution and its benefits.</p>
</div>
```

## Support

For questions or issues with the website, contact:
- Email: KaynenBPellegrino@Sybertnetics.com
- Phone: 248-602-1232

## License

Proprietary - All rights reserved by Sybertnetics Artificial Intelligence Solutions, Inc.