import {
  AlertCircle,
  Cloud,
  CloudRain,
  CloudSnow,
  Droplets,
  Sun,
  Thermometer,
  Wind,
} from 'lucide-react';
import React, { useState } from 'react';
import useSWR from 'swr';
import type { Dictionary } from '../lib/dictionaries';

// Weather data interface matching our API response
interface WeatherData {
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
}

interface WeatherResponse {
  success: boolean;
  data?: WeatherData;
  error?: string;
  cached?: boolean;
}

// SWR fetcher function
const fetcher = async (url: string): Promise<WeatherData> => {
  const response = await fetch(url);
  const result: WeatherResponse = await response.json();

  if (!result.success || !result.data) {
    throw new Error(result.error || 'Failed to fetch weather data');
  }

  return result.data;
};

// Weather condition to icon mapping
const getWeatherIcon = (condition: string, isDay: number) => {
  const conditionLower = condition.toLowerCase();

  if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
    return <CloudRain className="h-6 w-6" />;
  }
  if (conditionLower.includes('snow') || conditionLower.includes('blizzard')) {
    return <CloudSnow className="h-6 w-6" />;
  }
  if (conditionLower.includes('cloud') || conditionLower.includes('overcast')) {
    return <Cloud className="h-6 w-6" />;
  }
  if (
    conditionLower.includes('sun') ||
    conditionLower.includes('clear') ||
    conditionLower.includes('fair')
  ) {
    // Use sun icon for day, cloud for night clear conditions
    return isDay === 1 ? (
      <Sun className="h-6 w-6" />
    ) : (
      <Cloud className="h-6 w-6" />
    );
  }

  // Default to cloud icon
  return <Cloud className="h-6 w-6" />;
};

// Loading skeleton component
const WeatherSkeleton = () => (
  <div className="bg-white/90 backdrop-blur-sm p-3 rounded-2xl shadow-soft border border-white/40 animate-pulse">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <div className="h-6 w-6 bg-gray-200 rounded"></div>
        <div className="h-4 w-8 bg-gray-200 rounded"></div>
      </div>
      <div className="h-3 w-12 bg-gray-200 rounded"></div>
    </div>
  </div>
);

// Error state component
const WeatherError = ({
  onRetry,
  dictionary,
}: {
  onRetry: () => void;
  dictionary: Dictionary;
}) => (
  <div className="bg-white/90 backdrop-blur-sm p-3 rounded-2xl shadow-soft border border-red-100">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <AlertCircle className="h-5 w-5 text-red-500" />
        <span className="text-xs text-red-600 font-medium">
          {dictionary.weather.unavailable}
        </span>
      </div>
      <button
        onClick={onRetry}
        className="text-xs text-red-600 hover:text-red-700 font-medium underline"
      >
        {dictionary.common.retry}
      </button>
    </div>
  </div>
);

// Detailed weather tooltip component
const WeatherTooltip = ({
  data,
  isVisible,
  dictionary,
}: {
  data: WeatherData;
  isVisible: boolean;
  dictionary: Dictionary;
}) => {
  if (!isVisible) return null;

  return (
    <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl shadow-premium border border-white/40 p-4 z-50">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-800">{data.location}</h3>
          <div className="text-xs text-gray-500">
            {new Date(data.lastUpdated).toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center space-x-2">
            <Thermometer className="h-4 w-4 text-[#5a6f5a]" />
            <div>
              <div className="text-sm font-medium">{data.temperature}°C</div>
              <div className="text-xs text-gray-500">
                {dictionary.weather.details.feelsLike} {data.feelsLike}°C
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Wind className="h-4 w-4 text-[#5a6f5a]" />
            <div>
              <div className="text-sm font-medium">{data.windSpeed} km/h</div>
              <div className="text-xs text-gray-500">{data.windDirection}</div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Droplets className="h-4 w-4 text-[#5a6f5a]" />
            <div>
              <div className="text-sm font-medium">{data.humidity}%</div>
              <div className="text-xs text-gray-500">
                {dictionary.weather.details.humidity}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Sun className="h-4 w-4 text-[#5a6f5a]" />
            <div>
              <div className="text-sm font-medium">UV {data.uvIndex}</div>
              <div className="text-xs text-gray-500">
                {dictionary.weather.details.index}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Cloud className="h-4 w-4 text-[#5a6f5a]" />
            <div>
              <div className="text-sm font-medium">{data.cloudCover}%</div>
              <div className="text-xs text-gray-500">
                {dictionary.weather.details.cloudCover}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="h-4 w-4 flex items-center justify-center text-[#5a6f5a] text-xs font-bold">
              P
            </div>
            <div>
              <div className="text-sm font-medium">{data.pressure} mb</div>
              <div className="text-xs text-gray-500">
                {dictionary.weather.details.pressure}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-gray-100">
          <div className="text-sm text-gray-700 font-medium">
            {data.condition}
          </div>
        </div>
      </div>
    </div>
  );
};

interface WeatherWidgetProps {
  dictionary: Dictionary;
}

export function WeatherWidget({ dictionary }: WeatherWidgetProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  // SWR configuration for weather data with aggressive caching
  const {
    data: weatherData,
    error,
    isLoading,
    mutate,
  } = useSWR('/api/weather', fetcher, {
    refreshInterval: 3 * 60 * 60 * 1000, // Refresh every 3 hours (matches server cache)
    revalidateOnFocus: false, // Don't revalidate on window focus (rely on server cache)
    revalidateOnReconnect: true, // Revalidate when connection is restored
    dedupingInterval: 30 * 60 * 1000, // Dedupe requests within 30 minutes
    errorRetryCount: 2, // Retry failed requests 2 times (reduced to avoid API limits)
    errorRetryInterval: 10000, // Wait 10 seconds between retries
    revalidateIfStale: false, // Don't revalidate stale data automatically (rely on server cache)
    onError: (error) => {
      console.error('Weather fetch error:', error);
    },
  });

  const handleRetry = () => {
    mutate(); // Trigger a revalidation
  };

  // Loading state
  if (isLoading && !weatherData) {
    return <WeatherSkeleton />;
  }

  // Error state
  if (error || !weatherData) {
    return <WeatherError onRetry={handleRetry} dictionary={dictionary} />;
  }

  return (
    <div className="relative">
      <div
        className="bg-white/90 backdrop-blur-sm p-3 rounded-2xl shadow-soft border border-white/40 cursor-pointer hover:shadow-premium transition-all duration-200"
        onClick={() => setShowTooltip(!showTooltip)}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="text-[#5a6f5a]">
              {getWeatherIcon(weatherData.condition, weatherData.isDay)}
            </div>
            <span className="text-lg font-semibold text-gray-800">
              {weatherData.temperature}°
            </span>
          </div>
          <div className="text-xs text-gray-500 font-medium">
            {dictionary.weather.location}
          </div>
        </div>
      </div>

      <WeatherTooltip
        data={weatherData}
        isVisible={showTooltip}
        dictionary={dictionary}
      />
    </div>
  );
}
