# Weather Widget Setup Guide

This guide explains how to set up the weather widget for the Pony Club application.

## Overview

The weather widget displays current weather information for Glyki, Greece, using the WeatherAPI.com service. It includes:

- Real-time temperature and weather conditions
- Interactive tooltip with detailed information (humidity, wind, UV index)
- Automatic data refresh every 30 minutes
- Error handling and retry functionality
- Optimized caching for performance

## API Setup

### 1. Get a WeatherAPI.com Account

1. Visit [WeatherAPI.com](https://www.weatherapi.com/signup.aspx)
2. Sign up for a free account
3. Verify your email address
4. Log in to your dashboard

### 2. Get Your API Key

1. In your WeatherAPI.com dashboard, go to the "API Keys" section
2. Copy your API key (it should look like: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`)

### 3. Configure Environment Variables

#### For Local Development:

1. Copy the example environment file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and add your API key:
   ```
   WEATHER_API_KEY=your_actual_api_key_here
   ```

3. Restart your development server:
   ```bash
   npm run dev
   ```

#### For Vercel Deployment:

1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add a new environment variable:
   - **Name**: `WEATHER_API_KEY`
   - **Value**: Your WeatherAPI.com API key
   - **Environment**: Production (and Preview if desired)
4. Redeploy your application

## API Limits and Usage

### Free Tier Limits:
- **1 million API calls per month** (approximately 1,370 calls per day)
- **Real-time weather data** updated every 10-15 minutes
- **3-day forecast** included
- **Commercial use allowed**
- **95.5% uptime guarantee**

### Our Usage Pattern (Aggressive Caching):
- Weather data is cached for **3 hours** on the server
- CDN caching for **6 hours** with Vercel Edge Network
- Stale-while-revalidate for **24 hours** (serves stale content while updating)
- Client-side requests are deduped for **30 minutes**
- Automatic refresh every **3 hours** when widget is active
- Estimated usage: **~240 calls per month** (extremely conservative usage)

## Technical Implementation

### Aggressive Caching Strategy:
1. **Server-side caching**: 3-hour cache with Next.js revalidation
2. **CDN caching**: 6-hour cache on Vercel Edge Network
3. **Stale-while-revalidate**: 24-hour stale content serving
4. **Client-side caching**: SWR with 3-hour refresh interval
5. **Request deduplication**: 30-minute deduplication window
6. **Error caching**: 10-minute cache for API errors, 5-minute for server errors

### Performance Optimizations:
- Lazy loading of weather data
- Optimistic UI updates
- Graceful error handling
- Minimal bundle size impact

## Troubleshooting

### Common Issues:

1. **"Weather API key not configured" error**
   - Ensure `WEATHER_API_KEY` is set in your environment variables
   - Restart your development server after adding the key

2. **"Weather API responded with status: 401" error**
   - Your API key is invalid or expired
   - Check your API key in the WeatherAPI.com dashboard

3. **"Weather API responded with status: 403" error**
   - You've exceeded your API quota
   - Check your usage in the WeatherAPI.com dashboard

4. **Weather widget shows "Weather unavailable"**
   - Check your internet connection
   - Verify the API key is correctly configured
   - Check browser console for detailed error messages

### Testing the Setup:

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open your browser to `http://localhost:3000`

3. Look for the weather widget in the top-right corner of the header

4. The widget should show:
   - Weather icon and temperature
   - "Glyki" location label
   - Detailed tooltip on hover/click

5. Check the browser console for any error messages

## Monitoring and Maintenance

### Regular Checks:
- Monitor API usage in WeatherAPI.com dashboard
- Check application logs for weather-related errors
- Verify widget functionality after deployments

### Upgrading:
If you need more API calls or features, WeatherAPI.com offers paid plans starting at $7/month for 3 million calls.

## Support

For issues related to:
- **WeatherAPI.com service**: Contact their support team
- **Widget implementation**: Check the browser console and application logs
- **Vercel deployment**: Verify environment variables are correctly set
