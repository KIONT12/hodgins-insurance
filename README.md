# Hodgins.insure - Production-Ready Insurance Landing Page

A fully functional, high-converting landing page for home insurance lead generation with complete backend integration, form validation, spam prevention, and CRM-ready architecture.

## 🚀 Features

### Lead Capture & Processing
- ✅ **Full Form Validation** - Client and server-side validation
- ✅ **Spam Prevention** - Honeypot fields + rate limiting (5 requests per 15 min)
- ✅ **API Integration** - RESTful backend with Express.js
- ✅ **Error Handling** - Comprehensive error states and user feedback
- ✅ **Success States** - Confirmation messaging and thank you screens
- ✅ **Loading Indicators** - Real-time submission feedback

### Conversion Optimization
- ✅ **Multiple Strategic CTAs** - 4+ conversion points throughout page
- ✅ **Trust Badges** - Ratings, reviews, certifications
- ✅ **Social Proof** - 6 customer testimonials with 4.9/5 rating
- ✅ **Savings Calculator** - Market average vs. customer savings
- ✅ **Floating CTA Button** - Mobile-optimized sticky button
- ✅ **Minimal Navigation** - Focused on conversion

### Technical Excellence
- ✅ **React 18** - Modern component architecture
- ✅ **Tailwind CSS** - Utility-first responsive design
- ✅ **Express Backend** - Secure API with rate limiting
- ✅ **Environment Config** - Proper .env setup
- ✅ **SEO Optimized** - Meta tags, structured data, semantic HTML
- ✅ **Accessibility** - WCAG compliant, keyboard navigation, screen reader friendly
- ✅ **Mobile-First** - Fully responsive design
- ✅ **Performance** - Optimized builds, code splitting

### Legal & Compliance
- ✅ **Consent Language** - TCPA compliant disclosure
- ✅ **Privacy Policy Links** - Footer compliance
- ✅ **Terms of Service** - Legal documentation links
- ✅ **Opt-out Information** - Clear communication preferences

## 📋 Project Structure

```
├── server/
│   └── index.js              # Express API server
├── src/
│   ├── components/
│   │   ├── QuoteForm.jsx     # Main lead capture form
│   │   ├── Hero.jsx          # Hero section with form
│   │   ├── HowItWorks.jsx    # Process explanation
│   │   ├── Benefits.jsx      # Value propositions
│   │   ├── Testimonials.jsx  # Social proof
│   │   ├── Education.jsx     # Insurance education
│   │   ├── FAQ.jsx           # Accordion FAQ
│   │   ├── Footer.jsx        # Footer with compliance
│   │   └── FloatingCTA.jsx   # Mobile sticky button
│   ├── App.jsx               # Main app component
│   ├── main.jsx              # React entry point
│   └── index.css             # Tailwind + custom styles
├── leads/                    # Lead storage (gitignored)
├── index.html                # SEO-optimized HTML
├── package.json              # Dependencies
├── vite.config.js            # Vite configuration
├── tailwind.config.js        # Tailwind configuration
└── vercel.json               # Vercel deployment config
```

## 🛠️ Installation

### Prerequisites
- Node.js 18+ and npm

### Setup

1. **Clone and install dependencies:**
```bash
npm install
```

2. **Configure environment variables:**
```bash
# Copy example config
cp .env.example .env

# Edit .env with your settings
# - API URL
# - CRM/Email service credentials (optional)
# - Rate limiting settings
```

## 🚀 Development

### Start Development Server (Frontend + Backend)
```bash
npm run dev
```

This starts:
- **Frontend**: http://localhost:5174
- **Backend API**: http://localhost:3001

### Start Frontend Only
```bash
npm run dev:client
```

### Start Backend Only
```bash
npm run dev:server
```

## 📊 Lead Management

Leads are automatically captured and stored in the `leads/` directory:

- **Individual JSON files**: `leads/lead-{timestamp}.json`
- **Aggregated log**: `leads/leads-log.txt`

### Lead Data Structure
```json
{
  "firstName": "John",
  "lastName": "Smith",
  "email": "john@example.com",
  "phone": "(555) 123-4567",
  "zipCode": "33101",
  "timestamp": "2024-12-15T10:30:00.000Z",
  "ip": "192.168.1.1",
  "userAgent": "Mozilla/5.0..."
}
```

### Integrating with CRM/Email Services

Edit `server/index.js` to add your integrations:

```javascript
// Example: SendGrid email notification
import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// In the /api/quote endpoint:
await sgMail.send({
  to: 'sales@hodgins.insure',
  from: 'leads@hodgins.insure',
  subject: 'New Quote Request',
  text: `New lead: ${leadData.firstName} ${leadData.lastName}`
});

// Example: Webhook to CRM
await fetch(process.env.WEBHOOK_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(leadData)
});
```

## 🏗️ Production Build

### Build for Production
```bash
npm run build
```

Output in `dist/` directory.

### Preview Production Build
```bash
npm run preview
```

## 🌐 Deployment

### Vercel (Recommended)

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Deploy:**
```bash
vercel --prod
```

3. **Set environment variables in Vercel dashboard:**
   - `VITE_API_URL` - Your production API URL
   - `PORT` - API server port
   - Add CRM/email service keys as needed

### Alternative Deployment Options

**Netlify:**
- Build command: `npm run build`
- Publish directory: `dist`
- Functions: Deploy `server/` as serverless functions

**AWS/DigitalOcean:**
- Build frontend: `npm run build`
- Serve `dist/` with nginx/Apache
- Run backend: `npm start` with PM2 or systemd

## 🔒 Security Features

- **Rate Limiting**: 5 requests per 15 minutes per IP
- **Honeypot Field**: Hidden field to catch bots
- **Helmet.js**: Security headers
- **CORS**: Configured for specific origins
- **Input Validation**: Client and server-side
- **SSL/HTTPS**: Required for production

## 📈 Analytics Integration

Add your tracking codes in `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>

<!-- Facebook Pixel -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'YOUR_PIXEL_ID');
  fbq('track', 'PageView');
</script>
```

Conversion tracking is already implemented in `QuoteForm.jsx`.

## 🎨 Customization

### Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: {
    500: '#0ea5e9',  // Main brand color
    600: '#0284c7',
    700: '#0369a1',
  }
}
```

### Content
- **Hero headline**: `src/components/Hero.jsx`
- **Benefits**: `src/components/Benefits.jsx`
- **Testimonials**: `src/components/Testimonials.jsx`
- **FAQ**: `src/components/FAQ.jsx`

## 📱 Mobile Optimization

- Mobile-first responsive design
- Touch-friendly buttons (min 44x44px)
- Floating CTA button on scroll
- Optimized form layout for mobile
- Fast load times (<3s on 3G)

## ♿ Accessibility

- Semantic HTML5
- ARIA labels and roles
- Keyboard navigation support
- Focus visible indicators
- Screen reader friendly
- Color contrast WCAG AA compliant
- Reduced motion support

## 🧪 Testing

### Test Form Submission
```bash
curl -X POST http://localhost:3001/api/quote \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "phone": "5551234567",
    "zipCode": "33101"
  }'
```

### Test Rate Limiting
Submit form 6 times quickly to trigger rate limit.

### Test Honeypot
Fill the hidden `honeypot` field to trigger bot detection.

## 📞 Support

For questions or issues:
- Email: info@hodgins.insure
- Phone: (555) 123-4567

## 📄 License

Proprietary - All rights reserved by Hodgins.insure

---

**Built with ❤️ for maximum conversions and lead quality**
