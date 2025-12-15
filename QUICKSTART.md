# Quick Start Guide - Hodgins.insure

## 🚀 Get Started in 5 Minutes

### Step 1: View the Website

The development servers are running:

**Frontend (Website):** http://localhost:5176  
**Backend (API):** http://localhost:3001

Open http://localhost:5176 in your browser to see the landing page.

### Step 2: Test the Lead Capture Form

1. Scroll to the quote form (or click "Get Quote" button)
2. Fill out the form:
   - First Name: John
   - Last Name: Smith
   - Email: test@example.com
   - Phone: (555) 123-4567
   - Zip Code: 33101
3. Click "Get My Free Quote"
4. You'll see a success message

### Step 3: View Captured Leads

Leads are automatically saved to the `leads/` folder:

```bash
# View all leads
cat leads/leads-log.txt

# View individual lead JSON
ls leads/
```

## 🎯 Key Features to Test

### 1. Form Validation
Try submitting with invalid data:
- Invalid email: `test@test`
- Invalid phone: `123`
- Invalid zip: `abc`

You'll see error messages for each field.

### 2. Spam Prevention

**Honeypot Test:**
The form has a hidden field that catches bots (already implemented).

**Rate Limiting Test:**
Submit the form 6 times quickly - you'll be rate limited after 5 submissions.

### 3. Multiple CTAs
Scroll through the page and notice:
- Hero section CTA
- "Ready to Save" CTA
- "Compare. Save. Protect." CTA
- "Don't Overpay" CTA
- Floating mobile button (appears when scrolling)

### 4. Mobile Responsiveness
Resize your browser to mobile size (< 768px) to see:
- Responsive layout
- Mobile-optimized form
- Floating CTA button

### 5. Accessibility
Test keyboard navigation:
- Press `Tab` to navigate through elements
- Press `Enter` to activate buttons
- FAQ accordions are keyboard accessible

## 📊 What's Included

### Frontend Components
✅ Hero section with quote form  
✅ Trust badges and ratings  
✅ Savings comparison  
✅ How It Works (3 steps)  
✅ Benefits section (6 benefits)  
✅ Testimonials (6 reviews)  
✅ Educational content  
✅ FAQ accordion (8 questions)  
✅ Comprehensive footer  
✅ Floating CTA button  

### Backend Features
✅ Express API server  
✅ Form validation  
✅ Rate limiting (5 per 15 min)  
✅ Honeypot spam prevention  
✅ Lead storage (JSON + log file)  
✅ Error handling  
✅ CORS configuration  
✅ Security headers (Helmet)  

### Technical Features
✅ React 18 + Tailwind CSS  
✅ SEO optimized (meta tags, structured data)  
✅ Accessibility (WCAG compliant)  
✅ Mobile-first responsive design  
✅ Loading states  
✅ Success/error messaging  
✅ Environment configuration  
✅ Production-ready build  

## 🔧 Common Commands

```bash
# Start both frontend and backend
npm run dev

# Start frontend only
npm run dev:client

# Start backend only
npm run dev:server

# Build for production
npm run build

# Preview production build
npm run preview

# Test API endpoint
curl -X POST http://localhost:3001/api/quote \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User","email":"test@example.com","phone":"5551234567","zipCode":"33101"}'
```

## 📝 Next Steps

### 1. Customize Content
Edit these files to customize your content:
- `src/components/Hero.jsx` - Hero headline
- `src/components/Benefits.jsx` - Benefits list
- `src/components/Testimonials.jsx` - Customer reviews
- `src/components/FAQ.jsx` - FAQ questions

### 2. Update Branding
- Change colors in `tailwind.config.js`
- Update company name throughout components
- Add your logo

### 3. Integrate CRM/Email
Edit `server/index.js` to add:
- SendGrid for email notifications
- Webhook to your CRM
- Database integration
- SMS notifications

Example integrations are commented in the code.

### 4. Add Analytics
Uncomment and configure in `index.html`:
- Google Analytics
- Facebook Pixel
- Other tracking codes

### 5. Deploy to Production
Follow `DEPLOYMENT.md` for detailed deployment instructions.

Quick deploy to Vercel:
```bash
vercel --prod
```

## 🎨 Customization Examples

### Change Primary Color
Edit `tailwind.config.js`:
```javascript
primary: {
  500: '#10b981',  // Change to your brand color
  600: '#059669',
  700: '#047857',
}
```

### Update Phone Number
Search and replace throughout:
```bash
# Find: (555) 123-4567
# Replace with your actual number
```

### Modify Savings Amount
Edit `src/components/Hero.jsx`:
```javascript
<span className="text-3xl font-bold text-accent-400">$1,650/yr</span>
// Change to your average customer rate
```

## 🐛 Troubleshooting

**Port already in use:**
The app will automatically try the next available port. Check terminal output for the actual port.

**API not connecting:**
Make sure the backend is running on port 3001. Check `terminals/5.txt` for backend logs.

**Form not submitting:**
Check browser console (F12) for errors. Verify API URL in browser network tab.

**Leads not saving:**
Check that `leads/` directory is created and writable. View backend logs for errors.

## 📞 Support

Questions? Check:
- `README.md` - Full documentation
- `DEPLOYMENT.md` - Deployment guide
- Backend logs: `terminals/5.txt`
- Frontend logs: `terminals/6.txt`

---

**You're all set! Start customizing and deploying your landing page. 🎉**

