
import { GoogleGenAI, Type } from "@google/genai";
import { withRetry } from "./apiUtils";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export interface WeatherData {
  temp: number;
  condition: string;
  humidity: number;
  wind: number;
  sunrise: string;
  sunset: string;
  forecast: { day: string; temp: number; condition: string }[];
}

export interface MarketPrice {
  commodity: string;
  price: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  color: string;
  history: { date: string; price: number; volume: number }[];
}

const fetchWeatherFromAPI = async (location: string): Promise<WeatherData> => {
  if (!WEATHER_API_KEY) throw new Error("Weather API key not found");

  const city = location.split(',')[0].trim();
  
  // Fetch current weather and 5-day forecast in one call using forecast.json
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${city}&days=5&aqi=no&alerts=no`
  );
  
  if (!response.ok) throw new Error("Failed to fetch weather from WeatherAPI");
  const data = await response.json();

  // Process forecast
  const dailyForecast = data.forecast.forecastday.map((day: any) => ({
    day: new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }),
    temp: Math.round(day.day.avgtemp_c),
    condition: day.day.condition.text
  }));

  return {
    temp: Math.round(data.current.temp_c),
    condition: data.current.condition.text,
    humidity: data.current.humidity,
    wind: Math.round(data.current.wind_kph),
    sunrise: data.forecast.forecastday[0].astro.sunrise,
    sunset: data.forecast.forecastday[0].astro.sunset,
    forecast: dailyForecast
  };
};

export const getInstantMarketData = (location: string): MarketPrice[] => {
  const region = location.toLowerCase();
  const isPunjab = region.includes('punjab') || region.includes('bathinda') || region.includes('ludhiana');
  const isHaryana = region.includes('haryana') || region.includes('hisar') || region.includes('karnal');
  const isMaharashtra = region.includes('maharashtra') || region.includes('pune') || region.includes('nagpur');

  // Base data for common crops
  const crops = [
    { name: 'Wheat', basePrice: 2275, unit: 'Quintal', color: '#10b981', weight: isPunjab || isHaryana ? 1.2 : 1.0 },
    { name: 'Paddy', basePrice: 2183, unit: 'Quintal', color: '#3b82f6', weight: isPunjab ? 1.3 : 1.0 },
    { name: 'Cotton', basePrice: 7120, unit: 'Quintal', color: '#6366f1', weight: isMaharashtra || isHaryana ? 1.4 : 1.0 },
    { name: 'Soybean', basePrice: 4600, unit: 'Quintal', color: '#f59e0b', weight: isMaharashtra ? 1.5 : 0.8 },
    { name: 'Mustard', basePrice: 5450, unit: 'Quintal', color: '#eab308', weight: isHaryana ? 1.4 : 0.9 },
  ];

  // Sort by weight to show most relevant crops for the region first
  const selectedCrops = crops
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 3);

  return selectedCrops.map(crop => {
    const history = Array.from({ length: 6 }).map((_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (5 - i) * 3);
      const randomVar = (Math.random() - 0.5) * 100;
      return {
        date: date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' }),
        price: Math.round(crop.basePrice + randomVar),
        volume: Math.round(300 + Math.random() * 500)
      };
    });

    const currentPrice = history[history.length - 1].price;
    const prevPrice = history[history.length - 2].price;
    const trend = currentPrice > prevPrice ? 'up' : currentPrice < prevPrice ? 'down' : 'stable';

    return {
      commodity: crop.name,
      price: currentPrice,
      unit: crop.unit,
      trend: trend as 'up' | 'down' | 'stable',
      color: crop.color,
      history
    };
  });
};

export const fetchRealTimeData = async (location: string): Promise<{ weather: WeatherData; market: MarketPrice[] }> => {
  try {
    // 1. Fetch Weather (Parallel if possible, but we need both for the return)
    let weather: WeatherData;
    try {
      if (WEATHER_API_KEY) {
        weather = await fetchWeatherFromAPI(location);
      } else {
        throw new Error("No weather API key");
      }
    } catch (e) {
      console.warn("Falling back to Gemini for weather due to error:", e);
      // Fallback to Gemini for weather if dedicated API fails
      const weatherResponse = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Fetch current real-time weather for ${location}. 
        Return as JSON with fields: temp, condition, humidity, wind, sunrise, sunset, forecast (5 days with day, temp, condition).`,
        config: {
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              temp: { type: Type.NUMBER },
              condition: { type: Type.STRING },
              humidity: { type: Type.NUMBER },
              wind: { type: Type.NUMBER },
              sunrise: { type: Type.STRING },
              sunset: { type: Type.STRING },
              forecast: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    day: { type: Type.STRING },
                    temp: { type: Type.NUMBER },
                    condition: { type: Type.STRING }
                  },
                  required: ["day", "temp", "condition"]
                }
              }
            },
            required: ["temp", "condition", "humidity", "wind", "sunrise", "sunset", "forecast"]
          }
        }
      });
      weather = JSON.parse(weatherResponse.text || '{}');
    }

    // 2. Fetch Market Data (Always use Gemini as it's specialized)
    const marketResponse = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Fetch current real-time agricultural market prices for ${location}. 
      Include at least 3 major commodities relevant to ${location}. For history, provide 4 data points.
      Return as JSON array of objects with fields: commodity, price, unit, trend, color, history (date, price, volume).`,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              commodity: { type: Type.STRING },
              price: { type: Type.NUMBER },
              unit: { type: Type.STRING },
              trend: { type: Type.STRING },
              color: { type: Type.STRING },
              history: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    date: { type: Type.STRING },
                    price: { type: Type.NUMBER },
                    volume: { type: Type.NUMBER }
                  },
                  required: ["date", "price", "volume"]
                }
              }
            },
            required: ["commodity", "price", "unit", "trend", "color", "history"]
          }
        }
      }
    });
    const market = JSON.parse(marketResponse.text || '[]');

    return { weather, market };
  } catch (error) {
    console.error("Error fetching real-time data:", error);
    // Fallback to mock data if all else fails
    return {
      weather: {
        temp: 28,
        condition: "Clear Skies",
        humidity: 45,
        wind: 12,
        sunrise: "06:12 AM",
        sunset: "06:45 PM",
        forecast: [
          { day: 'Mon', temp: 26, condition: 'Sunny' },
          { day: 'Tue', temp: 27, condition: 'Sunny' },
          { day: 'Wed', temp: 28, condition: 'Light Rain' },
          { day: 'Thu', temp: 29, condition: 'Sunny' },
          { day: 'Fri', temp: 30, condition: 'Sunny' },
        ]
      },
      market: [
        { commodity: 'Wheat', price: 2275, unit: 'Quintal', trend: 'up', color: '#10b981', history: [
          { date: '1 Mar', price: 2150, volume: 450 }, { date: '5 Mar', price: 2200, volume: 520 }, { date: '10 Mar', price: 2250, volume: 480 }, { date: '15 Mar', price: 2275, volume: 600 }
        ]},
        { commodity: 'Paddy', price: 2183, unit: 'Quintal', trend: 'down', color: '#ef4444', history: [
          { date: '1 Mar', price: 2250, volume: 300 }, { date: '5 Mar', price: 2220, volume: 350 }, { date: '10 Mar', price: 2200, volume: 320 }, { date: '15 Mar', price: 2183, volume: 290 }
        ]},
        { commodity: 'Cotton', price: 7120, unit: 'Quintal', trend: 'stable', color: '#6366f1', history: [
          { date: '1 Mar', price: 7100, volume: 120 }, { date: '5 Mar', price: 7110, volume: 150 }, { date: '10 Mar', price: 7120, volume: 140 }, { date: '15 Mar', price: 7120, volume: 160 }
        ]},
      ]
    };
  }
};
