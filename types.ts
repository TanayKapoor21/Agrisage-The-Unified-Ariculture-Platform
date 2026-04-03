
export type Language = 'en' | 'hi' | 'ta' | 'pa' | 'mr';

export interface User {
  id: string;
  name: string;
  email: string;
  location: string;
  farmSize?: string;
  primaryCrops?: string[];
  password?: string; // Only used for simulated storage
}

export interface Translation {
  title: string;
  tagline: string;
  cropSuggestion: string;
  marketplace: string;
  marketPrices: string;
  climateAlerts: string;
  stubbleManagement: string;
  carbonCredits: string;
  plantingDetails: string;
  askAi: string;
  intelligenceLayer: string;
}

export interface CropSuggestion {
  crop: string;
  variety: string;
  waterLevel: string;
  soilSuitability: string;
  expectedYield: string;
}

export interface MarketRate {
  commodity: string;
  price: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  history: { date: string; price: number }[];
}

export enum AccessibilityMode {
  NORMAL = 'NORMAL',
  HIGH_CONTRAST = 'HIGH_CONTRAST',
  ICON_ONLY = 'ICON_ONLY'
}

declare global {
  interface Window {
    aistudio: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

export interface AppState {
  language: Language;
  accessibility: AccessibilityMode;
  user: User | null;
}
