import React, { createContext, useContext, useState, useEffect } from 'react';
import { WeatherService } from '../utils/weatherService';

interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  visibility: number;
  pressure: number;
  uvIndex: number;
}

interface SoilData {
  ph: number;
  moisture: number;
  temperature: number;
  nutrients: number;
}

interface WeatherContextType {
  weather: WeatherData;
  soilData: SoilData;
  updateWeather: () => void;
  isLoading: boolean;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [weather, setWeather] = useState<WeatherData>({
    temperature: 24,
    humidity: 65,
    windSpeed: 12,
    condition: 'Partly Cloudy',
    visibility: 10,
    pressure: 1013,
    uvIndex: 6
  });

  const [soilData, setSoilData] = useState<SoilData>({
    ph: 6.8,
    moisture: 70,
    temperature: 22,
    nutrients: 85
  });

  const [isLoading, setIsLoading] = useState(false);

  const updateWeather = async () => {
    setIsLoading(true);
    try {
      const newWeather = await WeatherService.getCurrentWeather();
      setWeather(newWeather);
      
      // Update soil data based on weather
      setSoilData(prev => ({
        ...prev,
        moisture: Math.max(30, Math.min(90, prev.moisture + (newWeather.condition.includes('Rain') ? 10 : -2))),
        temperature: Math.round(newWeather.temperature * 0.8 + prev.temperature * 0.2)
      }));
    } catch (error) {
      console.error('Weather update failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    updateWeather();
    const interval = setInterval(updateWeather, 300000); // Update every 5 minutes
    return () => clearInterval(interval);
  }, []);

  return (
    <WeatherContext.Provider value={{ weather, soilData, updateWeather, isLoading }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};