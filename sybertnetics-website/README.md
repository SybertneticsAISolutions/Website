# Sybertnetics AI Solutions - Official Website

A modern, professional website for Sybertnetics AI Solutions built with Next.js 14, TypeScript, and Tailwind CSS. This enterprise-grade website showcases our AI capabilities while maintaining the highest standards of design and performance.

## 🚀 Features

- **Modern Tech Stack**: Next.js 14 with App Router, TypeScript, and Tailwind CSS
- **Responsive Design**: Fully responsive across all devices and screen sizes
- **Professional UI/UX**: Clean, modern design with smooth animations and transitions
- **SEO Optimized**: Built-in SEO optimization with proper meta tags and structure
- **Contact Form**: Functional contact form with email integration
- **Performance Focused**: Optimized for speed and Core Web Vitals
- **Accessibility**: WCAG compliant with proper semantic HTML

## 🏗️ Architecture

### Pages Structure
- **Landing Page** (`/`): Hero section with company introduction and key features
- **Home Page** (`/home`): Comprehensive company overview and capabilities
- **Solutions Page** (`/solutions`): Our AI solutions and industry applications
- **About Page** (`/about`): Company story, values, and team information
- **Contact Page** (`/contact`): Contact form and company information
- **Careers Page** (`/careers`): Job opportunities and company culture
- **Blog Page** (`/blog`): Coming soon - Future blog functionality
- **News Page** (`/news`): Coming soon - Company news and updates

### Company Values (NEXUS Framework)
Our core values that drive our mission:
- **Next-generation**: Leading the frontier of AI innovation
- **Excellence**: Building AI that thinks deeply and ethically
- **eXploration**: Creating transformative solutions that advance science
- **Unity**: Fostering partnerships that amplify innovation
- **Solutions**: Continuously adapting to meet tomorrow's challenges

### Mission Statements
- **Moving Science Forward**: Advancing scientific understanding through AI innovation
- **Empowering the Future**: Creating tools that enable tomorrow's breakthroughs
- **Advancing AI**: Developing intelligent systems that reason, learn, and adapt responsibly

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: Netlify
- **Email**: Nodemailer integration
- **Environment**: Node.js

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd Website/sybertnetics-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the sybertnetics-website directory:
   ```env
   # Gmail account that will send the emails
   EMAIL_USER=your-email@gmail.com
   
   # Gmail App Password (generate at: https://myaccount.google.com/apppasswords)
   EMAIL_PASS=your-16-character-app-password
   
   # Email address where contact form submissions will be sent
   RECIPIENT_EMAIL=support@sybertnetics.com
   
   # Company LinkedIn URL
   LINKEDIN_URL=https://linkedin.com/company/sybertnetics
   ```
   
   **Important:** Use a Gmail App Password, not your regular password. Generate one at:
   https://myaccount.google.com/apppasswords

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🚀 Deployment

### Netlify Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Connect your repository to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `out`
   - Add environment variables in Netlify dashboard

3. **Configure custom domain** (optional)
   - Add your custom domain in Netlify settings
   - Configure DNS records as instructed

### Environment Variables for Production
Ensure these environment variables are set in your Netlify dashboard:
- `EMAIL_USER`: Gmail account for sending emails
- `EMAIL_PASS`: Gmail app password
- `RECIPIENT_EMAIL`: Email address to receive contact form submissions
- `LINKEDIN_URL`: Company LinkedIn profile URL

## 📁 Project Structure

```
sybertnetics-website/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── about/             # About page
│   │   ├── api/               # API routes
│   │   ├── blog/              # Blog page (coming soon)
│   │   ├── careers/           # Careers page
│   │   ├── contact/           # Contact page
│   │   ├── home/              # Home page
│   │   ├── news/              # News page (coming soon)
│   │   ├── solutions/         # Solutions page
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Landing page
│   └── components/            # Reusable components (future)
├── public/                    # Static assets
├── .env.local                 # Environment variables (local)
├── .gitignore                # Git ignore rules
├── next.config.js            # Next.js configuration
├── package.json              # Dependencies and scripts
├── tailwind.config.js        # Tailwind CSS configuration
└── tsconfig.json             # TypeScript configuration
```

## 🎨 Design System

### Color Palette
- **Primary**: Emerald (emerald-500, emerald-600)
- **Secondary**: Blue (blue-500, blue-600)
- **Accent**: Purple, Indigo, Orange
- **Neutral**: Gray scale (gray-50 to gray-900)
- **Background**: White with subtle gradients

### Typography
- **Headings**: Bold, modern sans-serif
- **Body**: Clean, readable sans-serif
- **Hierarchy**: Clear size and weight distinctions

### Components
- **Cards**: Rounded corners with subtle shadows
- **Buttons**: Gradient backgrounds with hover effects
- **Forms**: Clean inputs with proper validation
- **Navigation**: Fixed header with smooth scrolling

## 📧 Contact Form Integration

The contact form uses Next.js API routes with nodemailer to handle email sending:
- **Real Email Delivery**: Forms are sent to your configured email address
- **Auto-Responder**: Users receive a professional confirmation email
- **Form Validation**: Both client and server-side validation
- **Error Handling**: Clear success/error messages for users
- **Professional Formatting**: HTML emails with your branding

### Email Setup Requirements:
1. **Gmail Account**: Use a Gmail account for sending emails
2. **App Password**: Generate a Gmail App Password (not your regular password)
3. **Environment Variables**: Configure EMAIL_USER, EMAIL_PASS, and RECIPIENT_EMAIL
4. **Two-Factor Authentication**: Must be enabled on your Gmail account to use App Passwords

## 🔒 Security Features

- **Input Validation**: All form inputs are validated and sanitized
- **Environment Variables**: Sensitive data stored securely
- **HTTPS**: Enforced secure connections
- **CORS**: Proper cross-origin resource sharing configuration

## 🚀 Performance Optimizations

- **Static Generation**: Pages pre-rendered for optimal performance
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic code splitting for faster loading
- **Caching**: Proper caching headers for static assets

## 📱 Responsive Design

- **Mobile First**: Designed for mobile devices first
- **Breakpoints**: Tailored for all screen sizes
- **Touch Friendly**: Optimized for touch interactions
- **Performance**: Fast loading on all devices

## 🔄 Future Enhancements

### Blog System
- Content management for blog posts
- Category and tag system
- Search functionality
- RSS feed generation

### News Management
- News article management
- Media inquiry handling
- Press release distribution
- Social media integration

### Advanced Features
- User authentication system
- Client portal functionality
- Advanced analytics integration
- Multi-language support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary to Sybertnetics AI Solutions. All rights reserved.

## 📞 Support

For technical support or questions about this website:
- Email: support@sybertnetics.com
- LinkedIn: [Sybertnetics AI Solutions](https://linkedin.com/company/sybertnetics)

---

**Built with ❤️ by the Sybertnetics Team**

*Moving Science Forward • Empowering the Future • Advancing AI*
