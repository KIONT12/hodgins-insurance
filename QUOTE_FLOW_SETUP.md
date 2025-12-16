# Multi-Step Quote Flow Setup Guide

## Overview

The quote flow has been enhanced with a multi-step process that includes:
1. **Address Search** - Users enter their Florida address
2. **Property Map** - Satellite/aerial view of the property using Google Maps
3. **Property Details** - Square feet and year built
4. **Contact Information** - Full name, email, and phone
5. **Success** - Confirmation screen

## Features

✅ **Address Autocomplete** - Pre-populated Florida locations with zip codes
✅ **Google Maps Satellite View** - Interactive aerial view of the property
✅ **Multi-Step Form** - Progressive data collection with validation
✅ **Data Persistence** - All form data persists throughout the flow
✅ **Mobile-Friendly** - Responsive design for all screen sizes
✅ **No Page Reloads** - Smooth transitions between steps
✅ **Error Handling** - Graceful error messages and retry logic
✅ **Step Indicators** - Visual progress tracking

## Setup Instructions

### 1. Google Maps API Key

To enable the satellite map view, you need a Google Maps API key:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - **Maps JavaScript API**
   - **Places API**
   - **Geocoding API**
4. Create credentials (API Key)
5. Restrict the API key to your domain (recommended for production)

### 2. Environment Configuration

Create a `.env` file in the root directory:

```bash
# Google Maps API Key
VITE_GOOGLE_MAPS_API_KEY=your_api_key_here

# API Configuration
VITE_API_URL=http://localhost:3001
```

### 3. Component Structure

```
src/components/
├── QuoteFlow.jsx          # Main flow controller
├── PropertyMap.jsx        # Google Maps satellite view
├── QuoteDetailsForm.jsx   # Property details step
├── AddressSearch.jsx      # Address search (existing)
└── Hero.jsx              # Updated to integrate flow
```

## Flow Details

### Step 1: Address Search
- User enters address, city, or zip code
- Autocomplete suggestions appear
- Address is validated and selected

### Step 2: Property Map
- Google Maps loads with satellite view
- Property location is marked with a custom marker
- User can zoom and explore the map
- "Continue" button advances to next step

### Step 3: Property Details
- Square feet selection (dropdown)
- Year built selection (dropdown)
- Address summary displayed
- Previous/Next navigation

### Step 4: Contact Information
- Full name input
- Email input (validated)
- Phone number input (validated)
- Address summary displayed
- Previous/Submit buttons

### Step 5: Success
- Confirmation message
- Property address summary
- Contact information displayed
- "Get Another Quote" button

## Data Flow

All form data is stored in the `QuoteFlow` component state:

```javascript
{
  address: string,
  city: string,
  zipCode: string,
  state: 'FL',
  squareFeet: string,
  yearBuilt: string,
  fullName: string,
  phone: string,
  email: string,
  honeypot: string
}
```

On final submission, data is formatted and sent to `/api/quote`:

```javascript
{
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  zipCode: string,
  address: string,
  squareFeet: string,
  yearBuilt: string,
  honeypot: string
}
```

## API Integration

The flow uses the existing `/api/quote` endpoint. All validation, error handling, and retry logic are built-in.

## Mobile Optimization

- Touch-friendly buttons (minimum 44px height)
- Responsive text sizing
- Optimized map container heights
- Smooth scrolling between steps
- Mobile-optimized step indicators

## Error Handling

- **Address not found**: User can continue or go back
- **Map load failure**: Graceful error message, user can continue
- **Form validation**: Real-time error messages
- **API errors**: Retry logic with helpful error messages
- **Network issues**: Automatic retry with exponential backoff

## Customization

### Map Settings
Edit `src/components/PropertyMap.jsx`:
- Initial zoom level (default: 20)
- Map type (default: SATELLITE)
- Marker icon and style

### Form Fields
Edit `src/components/QuoteDetailsForm.jsx`:
- Square feet options
- Year built ranges

### Styling
All components use Tailwind CSS classes and can be customized in:
- `src/components/QuoteFlow.jsx`
- `src/components/PropertyMap.jsx`
- `src/components/QuoteDetailsForm.jsx`

## Testing

1. Start the development server:
   ```bash
   npm run dev:client
   ```

2. Test the flow:
   - Enter an address
   - Verify map loads (requires API key)
   - Complete all form steps
   - Submit and verify API call

3. Test error scenarios:
   - Invalid address
   - Missing API key
   - Network errors
   - Form validation

## Troubleshooting

### Map Not Loading
- Check Google Maps API key is set in `.env`
- Verify API key has correct APIs enabled
- Check browser console for errors
- Ensure API key restrictions allow your domain

### Form Not Submitting
- Check API server is running (`npm run dev:server`)
- Verify API URL in `.env`
- Check browser console for errors
- Verify CORS settings in `server/index.js`

### Address Not Found
- Verify address is in Florida
- Check autocomplete suggestions
- Try entering zip code directly

## Next Steps

1. Add Google Maps API key to production environment
2. Test on mobile devices
3. Add analytics tracking for each step
4. Consider adding property type selection
5. Add more property details (roof type, etc.)

