// Static weather service with mock data

interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  visibility: number;
  pressure: number;
  uvIndex: number;
}

interface WeatherForecast {
  date: Date;
  high: number;
  low: number;
  condition: string;
  precipitation: number;
}

export class WeatherService {
  private static mockWeatherData: WeatherData = {
    temperature: 24,
    humidity: 65,
    windSpeed: 12,
    condition: 'Partly Cloudy',
    visibility: 10,
    pressure: 1013,
    uvIndex: 6
  };

  private static mockForecast: WeatherForecast[] = [
    { date: new Date(), high: 26, low: 18, condition: 'Sunny', precipitation: 0 },
    { date: new Date(Date.now() + 86400000), high: 24, low: 16, condition: 'Partly Cloudy', precipitation: 10 },
    { date: new Date(Date.now() + 172800000), high: 22, low: 14, condition: 'Rainy', precipitation: 80 },
    { date: new Date(Date.now() + 259200000), high: 25, low: 17, condition: 'Sunny', precipitation: 0 },
    { date: new Date(Date.now() + 345600000), high: 27, low: 19, condition: 'Partly Cloudy', precipitation: 5 }
  ];

  static async getCurrentWeather(lat?: number, lng?: number): Promise<WeatherData> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    // Add some randomness to make it feel dynamic
    const variation = () => (Math.random() - 0.5) * 0.2;
    
    return {
      ...this.mockWeatherData,
      temperature: Math.round(this.mockWeatherData.temperature + variation() * 10),
      humidity: Math.max(30, Math.min(90, Math.round(this.mockWeatherData.humidity + variation() * 20))),
      windSpeed: Math.max(0, Math.round(this.mockWeatherData.windSpeed + variation() * 10))
    };
  }

  static async getWeatherForecast(lat?: number, lng?: number): Promise<WeatherForecast[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return this.mockForecast;
  }

  static updateMockWeather(): void {
    // Simulate weather changes
    this.mockWeatherData = {
      temperature: Math.floor(Math.random() * 15 + 15),
      humidity: Math.floor(Math.random() * 30 + 50),
      windSpeed: Math.floor(Math.random() * 20 + 5),
      condition: ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain'][Math.floor(Math.random() * 4)],
      visibility: Math.floor(Math.random() * 10 + 5),
      pressure: Math.floor(Math.random() * 50 + 990),
      uvIndex: Math.floor(Math.random() * 10 + 1)
    };
  }
}