
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const getFarmingExpertResponse = async (query: string, language: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: `User language: ${language}. Role: Senior Agricultural Scientist. Answer this query: ${query}`,
      config: {
        systemInstruction: "You are AgriSage, a helpful agricultural expert assisting farmers with crops, pests, market trends, and modern farming techniques. Be concise and practical.",
        temperature: 0.7,
      }
    });
    return response.text || "I'm sorry, I couldn't process that right now.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The expert is currently offline. Please try again in a moment.";
  }
};

export const getCropSuggestions = async (soilType: string, location: string, month: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: `Suggest 3 crops for soil: ${soilType}, location: ${location}, month: ${month}. Return as JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              crop: { type: Type.STRING },
              variety: { type: Type.STRING },
              waterLevel: { type: Type.STRING },
              soilSuitability: { type: Type.STRING },
              expectedYield: { type: Type.STRING }
            },
            required: ["crop", "variety", "waterLevel", "soilSuitability", "expectedYield"]
          }
        }
      }
    });
    return JSON.parse(response.text || '[]');
  } catch (error) {
    console.error("Gemini Suggestion Error:", error);
    return [];
  }
};

export const getPlantingGuide = async (cropName: string, language: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: `Provide a planting guide for ${cropName} in ${language}. Include: Sowing time, Soil depth, Water frequency, and Harvesting tips.`,
      config: {
        systemInstruction: "You are a specialized agricultural guide. Provide structured, bulleted farming advice.",
        temperature: 0.3,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Guide Error:", error);
    return "Could not load guide. Please check your internet connection.";
  }
};

export const analyzeCropImage = async (base64Image: string, location: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: base64Image,
            },
          },
          {
            text: `Analyze this crop image. Location: ${location}. Identify the crop, growth stage, and health. Also provide soil suitability (type, pH, nutrients) and regional suitability (climate, season). Return as JSON.`,
          },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            cropName: { type: Type.STRING },
            growthStage: { type: Type.STRING },
            healthStatus: { type: Type.STRING },
            healthDetails: { type: Type.STRING },
            soilSuitability: {
              type: Type.OBJECT,
              properties: {
                idealType: { type: Type.STRING },
                pH: { type: Type.STRING },
                nutrients: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ["idealType", "pH", "nutrients"]
            },
            regionSuitability: {
              type: Type.OBJECT,
              properties: {
                bestRegions: { type: Type.ARRAY, items: { type: Type.STRING } },
                climateCompatibility: { type: Type.STRING },
                seasonalAdvice: { type: Type.STRING }
              },
              required: ["bestRegions", "climateCompatibility", "seasonalAdvice"]
            }
          },
          required: ["cropName", "growthStage", "healthStatus", "healthDetails", "soilSuitability", "regionSuitability"]
        }
      }
    });
    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini Vision Error:", error);
    return null;
  }
};
