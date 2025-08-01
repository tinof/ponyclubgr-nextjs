import { NextResponse } from 'next/server';

// Weather API configuration
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const WEATHER_API_BASE_URL = 'https://api.weatherapi.com/v1';

// Glyki, Greece coordinates (approximate)
const GLYKI_COORDINATES = {
  lat: 39.2394,
  lon: 20.4906,
  name: 'Glyki, Greece',
};

// Cache duration in seconds (3 hours for aggressive caching)
const CACHE_DURATION = 3 * 60 * 60; // 3 hours
const CDN_CACHE_DURATION = 6 * 60 * 60; // 6 hours for CDN
const STALE_WHILE_REVALIDATE = 24 * 60 * 60; // 24 hours

// WeatherAPI.com response interface (matching their documentation)
interface WeatherAPIResponse {
  location: {
    name: string;
    country: string;
    localtime: string;
  };
  current: {
    last_updated: string;
    temp_c: number;
    temp_f: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    wind_kph: number;
    wind_dir: string;
    humidity: number;
    feelslike_c: number;
    feelslike_f: number;
    uv: number;
    is_day: number;
    cloud: number;
    pressure_mb: number;
    precip_mm: number;
    wind_mph: number;
    gust_kph: number;
  };
}

interface WeatherResponse {
  success: boolean;
  data?: {
    temperature: number;
    temperatureF: number;
    condition: string;
    icon: string;
    humidity: number;
    windSpeed: number;
    windDirection: string;
    feelsLike: number;
    feelsLikeF: number;
    uvIndex: number;
    location: string;
    lastUpdated: string;
    isDay: number;
    cloudCover: number;
    pressure: number;
    precipitation: number;
  };
  error?: string;
  cached?: boolean;
  cacheExpiry?: string;
}

// In-memory cache (for development - in production, use Redis or similar)
const cache = new Map<string, { data: WeatherResponse; expiry: number }>();

function getCacheKey(): string {
  return `weather_${GLYKI_COORDINATES.lat}_${GLYKI_COORDINATES.lon}`;
}

function isValidWeatherData(data: unknown): data is WeatherAPIResponse {
  const weatherData = data as WeatherAPIResponse;
  return (
    weatherData &&
    weatherData.location &&
    weatherData.current &&
    typeof weatherData.current.temp_c === 'number' &&
    weatherData.current.condition &&
    typeof weatherData.current.condition.text === 'string' &&
    typeof weatherData.current.last_updated === 'string'
  );
}

async function fetchWeatherData(): Promise<WeatherResponse> {
  if (!WEATHER_API_KEY) {
    return {
      success: false,
      error: 'Weather API key not configured',
    };
  }

  try {
    const url = `${WEATHER_API_BASE_URL}/current.json?key=${WEATHER_API_KEY}&q=${GLYKI_COORDINATES.lat},${GLYKI_COORDINATES.lon}&aqi=no`;

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'PonyClub-Weather-Widget/1.0',
      },
      // Cache the external API call for 2 hours on the server
      next: { revalidate: 2 * 60 * 60 },
    });

    if (!response.ok) {
      throw new Error(`Weather API responded with status: ${response.status}`);
    }

    const data = await response.json();

    if (!isValidWeatherData(data)) {
      throw new Error('Invalid weather data format received');
    }

    return {
      success: true,
      data: {
        temperature: Math.round(data.current.temp_c),
        temperatureF: Math.round(data.current.temp_f),
        condition: data.current.condition.text,
        icon: data.current.condition.icon,
        humidity: data.current.humidity,
        windSpeed: Math.round(data.current.wind_kph),
        windDirection: data.current.wind_dir,
        feelsLike: Math.round(data.current.feelslike_c),
        feelsLikeF: Math.round(data.current.feelslike_f),
        uvIndex: data.current.uv,
        location: GLYKI_COORDINATES.name,
        lastUpdated: data.current.last_updated,
        isDay: data.current.is_day,
        cloudCover: data.current.cloud,
        pressure: data.current.pressure_mb,
        precipitation: data.current.precip_mm,
      },
    };
  } catch (error) {
    console.error('Weather API error:', error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Failed to fetch weather data',
    };
  }
}

export async function GET(): Promise<NextResponse> {
  try {
    const cacheKey = getCacheKey();
    const now = Date.now();

    // Check cache first
    const cached = cache.get(cacheKey);
    if (cached && cached.expiry > now) {
      const remainingCacheTime = Math.floor((cached.expiry - now) / 1000);
      return NextResponse.json(
        {
          ...cached.data,
          cached: true,
          cacheExpiry: new Date(cached.expiry).toISOString(),
        },
        {
          status: 200,
          headers: {
            'Cache-Control': `public, max-age=${remainingCacheTime}, s-maxage=${CDN_CACHE_DURATION}, stale-while-revalidate=${STALE_WHILE_REVALIDATE}`,
            'Content-Type': 'application/json',
            ETag: `"weather-cached-${cached.expiry}"`,
          },
        },
      );
    }

    // Fetch fresh data
    const weatherData = await fetchWeatherData();

    if (weatherData.success) {
      // Cache the successful response
      const expiry = now + CACHE_DURATION * 1000;
      cache.set(cacheKey, { data: weatherData, expiry });

      return NextResponse.json(
        {
          ...weatherData,
          cached: false,
          cacheExpiry: new Date(expiry).toISOString(),
          timestamp: new Date().toISOString(),
        },
        {
          status: 200,
          headers: {
            'Cache-Control': `public, max-age=${CACHE_DURATION}, s-maxage=${CDN_CACHE_DURATION}, stale-while-revalidate=${STALE_WHILE_REVALIDATE}`,
            'Content-Type': 'application/json',
            ETag: `"weather-${Date.now()}"`,
          },
        },
      );
    } else {
      // Return error response with short cache to avoid hitting API limits
      return NextResponse.json(
        {
          ...weatherData,
          timestamp: new Date().toISOString(),
        },
        {
          status: 503,
          headers: {
            'Cache-Control': 'public, max-age=600, s-maxage=600', // Cache errors for 10 minutes
            'Content-Type': 'application/json',
          },
        },
      );
    }
  } catch (error) {
    console.error('Weather route error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        timestamp: new Date().toISOString(),
      },
      {
        status: 500,
        headers: {
          'Cache-Control': 'public, max-age=300, s-maxage=300', // Cache server errors for 5 minutes
          'Content-Type': 'application/json',
        },
      },
    );
  }
}

// Enable static generation with revalidation (3 hours to match cache strategy)
export const revalidate = 10800; // 3 hours in seconds
