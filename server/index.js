import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { writeFile, appendFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://hodgins.insure', 'https://www.hodgins.insure']
    : ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:4173']
}));
app.use(express.json());

// Rate limiting - 5 submissions per 15 minutes per IP
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 5,
  message: { 
    success: false, 
    error: 'Too many quote requests. Please try again later.' 
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Validation helper
function validateQuoteRequest(data) {
  const errors = {};

  // Validate zip code (Florida zip codes)
  if (!data.zipCode || !/^\d{5}$/.test(data.zipCode)) {
    errors.zipCode = 'Please enter a valid 5-digit zip code';
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Validate phone
  const phoneRegex = /^[\d\s\-\(\)]+$/;
  const cleanPhone = data.phone?.replace(/\D/g, '');
  if (!data.phone || !phoneRegex.test(data.phone) || cleanPhone.length < 10) {
    errors.phone = 'Please enter a valid phone number';
  }

  // Validate name
  if (!data.firstName || data.firstName.trim().length < 2) {
    errors.firstName = 'Please enter your first name';
  }
  if (!data.lastName || data.lastName.trim().length < 2) {
    errors.lastName = 'Please enter your last name';
  }

  // Honeypot check - if filled, it's a bot
  if (data.website) {
    errors._bot = 'Bot detected';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

// Store lead to file (for development/demo purposes)
async function storeLead(leadData) {
  const leadsDir = path.join(__dirname, '..', 'leads');
  
  // Create leads directory if it doesn't exist
  if (!existsSync(leadsDir)) {
    await mkdir(leadsDir, { recursive: true });
  }

  const timestamp = new Date().toISOString();
  const lead = {
    ...leadData,
    timestamp,
    ip: leadData.ip,
    userAgent: leadData.userAgent
  };

  // Store individual lead
  const filename = path.join(leadsDir, `lead-${Date.now()}.json`);
  await writeFile(filename, JSON.stringify(lead, null, 2));

  // Also append to a CSV-style log for easy viewing
  const logFile = path.join(leadsDir, 'leads-log.txt');
  const logEntry = `${timestamp}|${lead.firstName}|${lead.lastName}|${lead.email}|${lead.phone}|${lead.zipCode}|${lead.squareFeet || 'N/A'}|${lead.yearBuilt || 'N/A'}|${lead.address || 'N/A'}\n`;
  await appendFile(logFile, logEntry);

  return lead;
}

// POST endpoint for quote requests
app.post('/api/quote', limiter, async (req, res) => {
  try {
    const { honeypot, ...leadData } = req.body;

    // Add metadata
    leadData.ip = req.ip;
    leadData.userAgent = req.get('user-agent');
    leadData.website = honeypot; // Honeypot field

    // Validate
    const validation = validateQuoteRequest(leadData);
    
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        errors: validation.errors
      });
    }

    // Store the lead
    const storedLead = await storeLead(leadData);

    // Here you would typically:
    // 1. Send to CRM (Salesforce, HubSpot, etc.)
    // 2. Send email notification
    // 3. Trigger webhook
    // 4. Store in database

    console.log('✅ New lead captured:', {
      name: `${leadData.firstName} ${leadData.lastName}`,
      email: leadData.email,
      phone: leadData.phone,
      squareFeet: leadData.squareFeet || 'Not specified',
      yearBuilt: leadData.yearBuilt || 'Not specified',
      zipCode: leadData.zipCode,
      timestamp: storedLead.timestamp
    });

    // Return success
    res.json({
      success: true,
      message: 'Quote request received successfully',
      leadId: storedLead.timestamp
    });

  } catch (error) {
    console.error('Error processing quote request:', error);
    res.status(500).json({
      success: false,
      error: 'An error occurred processing your request. Please try again.'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 API Server running on http://localhost:${PORT}`);
  console.log(`📊 Leads will be stored in: ${path.join(__dirname, '..', 'leads')}`);
});

