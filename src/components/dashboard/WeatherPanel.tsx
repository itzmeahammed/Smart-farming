import React from 'react';
import { motion } from 'framer-motion';
import { 
  Cloud, 
  Thermometer, 
  Droplets, 
  Wind, 
  Eye, 
  Gauge,
  MapPin 
} from 'lucide-react';
import { useWeather } from '../../contexts/WeatherContext';

const WeatherPanel: React.FC = () => {
  const { weather, soilData } = useWeather();

  const weatherCards = [
    {
      title: 'Temperature',
      value: `${weather.temperature}°C`,
      icon: <Thermometer className="w-6 h-6" />,
      color: 'from-red-500 to-orange-500',
      bgColor: 'from-red-50 to-orange-50'
    },
    {
      title: 'Humidity',
      value: `${weather.humidity}%`,
      icon: <Droplets className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50'
    },
    {
      title: 'Wind Speed',
      value: `${weather.windSpeed} km/h`,
      icon: <Wind className="w-6 h-6" />,
      color: 'from-gray-500 to-slate-500',
      bgColor: 'from-gray-50 to-slate-50'
    },
    {
      title: 'Visibility',
      value: `${weather.visibility} km`,
      icon: <Eye className="w-6 h-6" />,
      color: 'from-purple-500 to-indigo-500',
      bgColor: 'from-purple-50 to-indigo-50'
    }
  ];

  const soilCards = [
    {
      title: 'Soil pH',
      value: soilData.ph.toFixed(1),
      icon: <Gauge className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50',
      status: soilData.ph >= 6.0 && soilData.ph <= 7.5 ? 'Optimal' : 'Needs Adjustment'
    },
    {
      title: 'Moisture',
      value: `${soilData.moisture}%`,
      icon: <Droplets className="w-6 h-6" />,
      color: 'from-blue-500 to-teal-500',
      bgColor: 'from-blue-50 to-teal-50',
      status: soilData.moisture >= 40 ? 'Good' : 'Low'
    },
    {
      title: 'Temperature',
      value: `${soilData.temperature}°C`,
      icon: <Thermometer className="w-6 h-6" />,
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-50 to-red-50',
      status: soilData.temperature >= 15 && soilData.temperature <= 25 ? 'Optimal' : 'Monitor'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-3 mb-8">
        <Cloud className="w-8 h-8 text-blue-600" />
        <h2 className="text-3xl font-bold text-gray-800">Weather & Soil Monitoring</h2>
      </div>

      {/* Location */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg p-6 border border-green-100"
      >
        <div className="flex items-center space-x-2 text-gray-600">
          <MapPin className="w-5 h-5" />
          <span className="font-medium">Current Location: Farm Valley, CA</span>
        </div>
      </motion.div>

      {/* Weather Cards */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">Current Weather</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {weatherCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`bg-gradient-to-br ${card.bgColor} p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${card.color} text-white`}>
                  {card.icon}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-600 font-medium">{card.title}</p>
                <p className="text-2xl font-bold text-gray-800">{card.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Soil Data */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">Soil Conditions</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {soilCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.4 }}
              whileHover={{ y: -5 }}
              className={`bg-gradient-to-br ${card.bgColor} p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${card.color} text-white`}>
                  {card.icon}
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  card.status === 'Optimal' || card.status === 'Good' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {card.status}
                </span>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-600 font-medium">{card.title}</p>
                <p className="text-2xl font-bold text-gray-800">{card.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Alerts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-6"
      >
        <h4 className="font-bold text-gray-800 mb-3">Weather Alerts</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span className="text-gray-700">Light rain expected tomorrow - ideal for watering</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-gray-700">Temperature perfect for crop growth this week</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default WeatherPanel;