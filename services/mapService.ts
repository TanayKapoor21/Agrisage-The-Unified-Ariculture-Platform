
import { GoogleGenAI } from "@google/genai";
import { withRetry } from "./apiUtils";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export interface WasteCenter {
  name: string;
  address: string;
  contact?: string;
  wasteTypes: string[];
  location: { lat: number; lng: number };
  mapsUri?: string;
}

export const STATIC_CENTERS: WasteCenter[] = [
  {
    name: "Punjab Biomass Power Ltd.",
    address: "Village Channu, Tehsil Malout, Muktsar, Punjab",
    contact: "+91 1637 264500",
    wasteTypes: ["Paddy Stubble", "Biomass", "Crop Residue"],
    location: { lat: 30.1545, lng: 74.6521 },
    mapsUri: "https://www.google.com/maps/search/Punjab+Biomass+Power+Ltd"
  },
  {
    name: "Sampurn Agri Ventures",
    address: "Village Fazilka, Punjab - 152123",
    contact: "+91 98765 43210",
    wasteTypes: ["Stubble", "Organic Waste", "Bio-Fertilizer"],
    location: { lat: 30.4033, lng: 74.0300 },
    mapsUri: "https://www.google.com/maps/search/Sampurn+Agri+Ventures"
  },
  {
    name: "Eco-Wise Waste Management",
    address: "Sector 34, Gurugram, Haryana",
    contact: "+91 124 4001234",
    wasteTypes: ["Organic Waste", "Composting", "General Waste"],
    location: { lat: 28.4595, lng: 77.0266 },
    mapsUri: "https://www.google.com/maps/search/Eco-Wise+Waste+Management+Gurugram"
  },
  {
    name: "KVK Bathinda Vermicompost Unit",
    address: "Mansa Road, Bathinda, Punjab",
    contact: "+91 164 2212159",
    wasteTypes: ["Crop Residue", "Cow Dung", "Vermicompost"],
    location: { lat: 30.2110, lng: 74.9455 },
    mapsUri: "https://www.google.com/maps/search/KVK+Bathinda"
  },
  {
    name: "IARI Pusa Composting Facility",
    address: "Pusa Campus, New Delhi",
    contact: "+91 11 25841428",
    wasteTypes: ["Agri-Waste", "Green Waste", "Research"],
    location: { lat: 28.6365, lng: 77.1584 },
    mapsUri: "https://www.google.com/maps/search/IARI+Pusa+New+Delhi"
  },
  {
    name: "Swaraj Green Power & Fuel",
    address: "Phaltan, Satara, Maharashtra",
    contact: "+91 2166 222333",
    wasteTypes: ["Sugarcane Trash", "Biomass", "Bio-Ethanol"],
    location: { lat: 17.9833, lng: 74.4333 },
    mapsUri: "https://www.google.com/maps/search/Swaraj+Green+Power+Phaltan"
  },
  {
    name: "Namo E-Waste Management",
    address: "Faridabad, Haryana",
    contact: "+91 88000 12345",
    wasteTypes: ["Agri-Machinery Scrap", "E-Waste", "Metal"],
    location: { lat: 28.4089, lng: 77.3178 },
    mapsUri: "https://www.google.com/maps/search/Namo+E-Waste+Faridabad"
  }
];

export const findWasteCenters = async (userLocation: string, lat?: number, lng?: number): Promise<WasteCenter[]> => {
  // Return static centers immediately for speed as requested by user
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(STATIC_CENTERS);
    }, 500); // Small artificial delay for UI feel
  });
};
