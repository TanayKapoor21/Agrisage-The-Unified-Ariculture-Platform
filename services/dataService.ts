
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

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

export const fetchRealTimeData = async (location: string): Promise<{ weather: WeatherData; market: MarketPrice[] }> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Fetch current real-time weather and agricultural market prices for ${location}. 
      Include at least 3 major commodities relevant to ${location}. For history, provide 4 data points.`,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            weather: {
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
            },
            market: {
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
          },
          required: ["weather", "market"]
        }
      },
    });

    const text = response.text;
    if (!text) throw new Error("Empty response from AI");
    
    const data = JSON.parse(text);
    return data;
  } catch (error) {
    console.error("Error fetching real-time data:", error);
    // Fallback to mock data if API fails
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
