# CRM Integration Guide

This guide shows how to integrate the Hodgins.insure landing page with popular CRM and email systems.

## 📋 Integration Points

The main integration point is in `server/index.js` in the `/api/quote` endpoint, after lead validation and storage.

## 🔌 Popular Integrations

### 1. Salesforce

```javascript
// Install Salesforce SDK
// npm install jsforce

import jsforce from 'jsforce';

// In server/index.js, after lead validation:
const conn = new jsforce.Connection({
  loginUrl: process.env.SALESFORCE_LOGIN_URL
});

await conn.login(
  process.env.SALESFORCE_USERNAME,
  process.env.SALESFORCE_PASSWORD + process.env.SALESFORCE_TOKEN
);

await conn.sobject('Lead').create({
  FirstName: leadData.firstName,
  LastName: leadData.lastName,
  Email: leadData.email,
  Phone: leadData.phone,
  PostalCode: leadData.zipCode,
  Company: 'Prospect',
  LeadSource: 'Website',
  Status: 'New'
});
```

**Environment Variables:**
```bash
SALESFORCE_LOGIN_URL=https://login.salesforce.com
SALESFORCE_USERNAME=your_username
SALESFORCE_PASSWORD=your_password
SALESFORCE_TOKEN=your_security_token
```

### 2. HubSpot

```javascript
// Install HubSpot SDK
// npm install @hubspot/api-client

import { Client } from '@hubspot/api-client';

// In server/index.js:
const hubspotClient = new Client({
  accessToken: process.env.HUBSPOT_ACCESS_TOKEN
});

await hubspotClient.crm.contacts.basicApi.create({
  properties: {
    firstname: leadData.firstName,
    lastname: leadData.lastName,
    email: leadData.email,
    phone: leadData.phone,
    zip: leadData.zipCode,
    lifecyclestage: 'lead'
  }
});
```

**Environment Variables:**
```bash
HUBSPOT_ACCESS_TOKEN=your_access_token
```

### 3. Mailchimp

```javascript
// Install Mailchimp SDK
// npm install @mailchimp/mailchimp_marketing

import mailchimp from '@mailchimp/mailchimp_marketing';

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX
});

await mailchimp.lists.addListMember(process.env.MAILCHIMP_LIST_ID, {
  email_address: leadData.email,
  status: 'subscribed',
  merge_fields: {
    FNAME: leadData.firstName,
    LNAME: leadData.lastName,
    PHONE: leadData.phone,
    ZIP: leadData.zipCode
  }
});
```

**Environment Variables:**
```bash
MAILCHIMP_API_KEY=your_api_key
MAILCHIMP_SERVER_PREFIX=us1
MAILCHIMP_LIST_ID=your_list_id
```

### 4. SendGrid (Email Notifications)

```javascript
// Install SendGrid SDK
// npm install @sendgrid/mail

import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Send to sales team
await sgMail.send({
  to: 'sales@hodgins.insure',
  from: 'leads@hodgins.insure',
  subject: `New Quote Request: ${leadData.firstName} ${leadData.lastName}`,
  html: `
    <h2>New Quote Request</h2>
    <p><strong>Name:</strong> ${leadData.firstName} ${leadData.lastName}</p>
    <p><strong>Email:</strong> ${leadData.email}</p>
    <p><strong>Phone:</strong> ${leadData.phone}</p>
    <p><strong>Zip Code:</strong> ${leadData.zipCode}</p>
    <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
  `
});

// Send confirmation to customer
await sgMail.send({
  to: leadData.email,
  from: 'noreply@hodgins.insure',
  subject: 'Your Quote Request - Hodgins.insure',
  html: `
    <h2>Thank you for your quote request!</h2>
    <p>Hi ${leadData.firstName},</p>
    <p>We've received your request for a home insurance quote. A licensed agent will contact you shortly at ${leadData.phone}.</p>
    <p>Average response time: Under 30 minutes during business hours.</p>
    <p>Best regards,<br>The Hodgins.insure Team</p>
  `
});
```

**Environment Variables:**
```bash
SENDGRID_API_KEY=your_api_key
```

### 5. Twilio (SMS Notifications)

```javascript
// Install Twilio SDK
// npm install twilio

import twilio from 'twilio';

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Send SMS to sales team
await client.messages.create({
  body: `New quote request from ${leadData.firstName} ${leadData.lastName}. Phone: ${leadData.phone}`,
  from: process.env.TWILIO_PHONE_NUMBER,
  to: process.env.SALES_TEAM_PHONE
});

// Send SMS confirmation to customer
await client.messages.create({
  body: `Thank you for your quote request! A Hodgins.insure agent will call you shortly. Reply STOP to opt out.`,
  from: process.env.TWILIO_PHONE_NUMBER,
  to: leadData.phone
});
```

**Environment Variables:**
```bash
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+15551234567
SALES_TEAM_PHONE=+15559876543
```

### 6. Zapier (Webhook)

```javascript
// No SDK needed - just HTTP POST

await fetch(process.env.ZAPIER_WEBHOOK_URL, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    firstName: leadData.firstName,
    lastName: leadData.lastName,
    email: leadData.email,
    phone: leadData.phone,
    zipCode: leadData.zipCode,
    timestamp: new Date().toISOString(),
    source: 'Website'
  })
});
```

**Environment Variables:**
```bash
ZAPIER_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/xxxxx/xxxxx/
```

### 7. ActiveCampaign

```javascript
// Install node-fetch if not already installed
// npm install node-fetch

await fetch(`${process.env.ACTIVECAMPAIGN_URL}/api/3/contacts`, {
  method: 'POST',
  headers: {
    'Api-Token': process.env.ACTIVECAMPAIGN_API_KEY,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    contact: {
      email: leadData.email,
      firstName: leadData.firstName,
      lastName: leadData.lastName,
      phone: leadData.phone,
      fieldValues: [
        {
          field: '1',
          value: leadData.zipCode
        }
      ]
    }
  })
});
```

**Environment Variables:**
```bash
ACTIVECAMPAIGN_URL=https://youraccountname.api-us1.com
ACTIVECAMPAIGN_API_KEY=your_api_key
```

### 8. Google Sheets

```javascript
// Install Google Sheets API
// npm install googleapis

import { google } from 'googleapis';

const auth = new google.auth.GoogleAuth({
  keyFile: 'credentials.json',
  scopes: ['https://www.googleapis.com/auth/spreadsheets']
});

const sheets = google.sheets({ version: 'v4', auth });

await sheets.spreadsheets.values.append({
  spreadsheetId: process.env.GOOGLE_SHEET_ID,
  range: 'Leads!A:F',
  valueInputOption: 'USER_ENTERED',
  resource: {
    values: [[
      new Date().toISOString(),
      leadData.firstName,
      leadData.lastName,
      leadData.email,
      leadData.phone,
      leadData.zipCode
    ]]
  }
});
```

**Environment Variables:**
```bash
GOOGLE_SHEET_ID=your_sheet_id
```

### 9. Slack Notifications

```javascript
// Install Slack SDK
// npm install @slack/webhook

import { IncomingWebhook } from '@slack/webhook';

const webhook = new IncomingWebhook(process.env.SLACK_WEBHOOK_URL);

await webhook.send({
  text: '🎉 New Quote Request!',
  blocks: [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '*New Quote Request*'
      }
    },
    {
      type: 'section',
      fields: [
        {
          type: 'mrkdwn',
          text: `*Name:*\n${leadData.firstName} ${leadData.lastName}`
        },
        {
          type: 'mrkdwn',
          text: `*Email:*\n${leadData.email}`
        },
        {
          type: 'mrkdwn',
          text: `*Phone:*\n${leadData.phone}`
        },
        {
          type: 'mrkdwn',
          text: `*Zip:*\n${leadData.zipCode}`
        }
      ]
    }
  ]
});
```

**Environment Variables:**
```bash
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/xxxxx/xxxxx/xxxxx
```

### 10. MongoDB (Database Storage)

```javascript
// Install MongoDB driver
// npm install mongodb

import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);
await client.connect();

const database = client.db('hodgins');
const leads = database.collection('leads');

await leads.insertOne({
  ...leadData,
  timestamp: new Date(),
  status: 'new'
});

await client.close();
```

**Environment Variables:**
```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/
```

## 🔄 Complete Integration Example

Here's a complete example combining multiple integrations:

```javascript
// server/index.js

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import sgMail from '@sendgrid/mail';
import { IncomingWebhook } from '@slack/webhook';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5
});

// Configure integrations
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const slackWebhook = new IncomingWebhook(process.env.SLACK_WEBHOOK_URL);

// Quote endpoint
app.post('/api/quote', limiter, async (req, res) => {
  try {
    const leadData = req.body;
    
    // Validate (your existing validation code)
    
    // 1. Store locally
    await storeLead(leadData);
    
    // 2. Send to CRM (Zapier webhook)
    await fetch(process.env.ZAPIER_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(leadData)
    });
    
    // 3. Email notification to sales team
    await sgMail.send({
      to: 'sales@hodgins.insure',
      from: 'leads@hodgins.insure',
      subject: `New Quote: ${leadData.firstName} ${leadData.lastName}`,
      html: `
        <h2>New Quote Request</h2>
        <p><strong>Name:</strong> ${leadData.firstName} ${leadData.lastName}</p>
        <p><strong>Email:</strong> ${leadData.email}</p>
        <p><strong>Phone:</strong> ${leadData.phone}</p>
        <p><strong>Zip:</strong> ${leadData.zipCode}</p>
      `
    });
    
    // 4. Email confirmation to customer
    await sgMail.send({
      to: leadData.email,
      from: 'noreply@hodgins.insure',
      subject: 'Your Quote Request Received',
      html: `
        <h2>Thank you, ${leadData.firstName}!</h2>
        <p>We've received your quote request and will contact you shortly.</p>
      `
    });
    
    // 5. Slack notification
    await slackWebhook.send({
      text: `🎉 New lead: ${leadData.firstName} ${leadData.lastName} - ${leadData.phone}`
    });
    
    // 6. Log success
    console.log('✅ Lead processed:', leadData.email);
    
    res.json({ success: true, message: 'Quote request received' });
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
```

## 📝 Environment Variables Template

Create a `.env` file with all your integration credentials:

```bash
# Server
PORT=3001
NODE_ENV=production

# Frontend
VITE_API_URL=https://api.hodgins.insure

# Salesforce
SALESFORCE_LOGIN_URL=https://login.salesforce.com
SALESFORCE_USERNAME=your_username
SALESFORCE_PASSWORD=your_password
SALESFORCE_TOKEN=your_token

# HubSpot
HUBSPOT_ACCESS_TOKEN=your_token

# Mailchimp
MAILCHIMP_API_KEY=your_key
MAILCHIMP_SERVER_PREFIX=us1
MAILCHIMP_LIST_ID=your_list_id

# SendGrid
SENDGRID_API_KEY=your_key

# Twilio
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
TWILIO_PHONE_NUMBER=+15551234567
SALES_TEAM_PHONE=+15559876543

# Zapier
ZAPIER_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/xxxxx/xxxxx/

# ActiveCampaign
ACTIVECAMPAIGN_URL=https://youraccountname.api-us1.com
ACTIVECAMPAIGN_API_KEY=your_key

# Google Sheets
GOOGLE_SHEET_ID=your_sheet_id

# Slack
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/xxxxx/xxxxx/xxxxx

# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=5
```

## 🧪 Testing Integrations

Test each integration individually:

```bash
# Test with curl
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

Check:
- ✅ CRM receives lead
- ✅ Email sent to sales team
- ✅ Email sent to customer
- ✅ SMS sent (if configured)
- ✅ Slack notification appears
- ✅ Database record created
- ✅ Local file created

## 🔒 Security Best Practices

1. **Never commit `.env` file** - Add to `.gitignore`
2. **Use environment variables** - Never hardcode credentials
3. **Rotate API keys** - Regularly update credentials
4. **Limit API permissions** - Use least privilege principle
5. **Monitor API usage** - Set up alerts for unusual activity
6. **Validate all inputs** - Never trust client data
7. **Use HTTPS** - Always encrypt in transit
8. **Log errors securely** - Don't log sensitive data

## 📊 Monitoring

Set up monitoring for:
- API response times
- Integration failures
- Rate limit hits
- Error rates
- Lead volume

Use services like:
- Sentry (error tracking)
- Datadog (monitoring)
- New Relic (APM)
- LogRocket (session replay)

---

**Choose the integrations that fit your workflow and add them to `server/index.js`!**

