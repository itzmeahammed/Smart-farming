import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Search, User } from 'lucide-react';
import { useWeather } from '../../contexts/WeatherContext';
import { useAuthStore } from '../../store/authStore';
import { useFarmStore } from '../../store/farmStore';

const Header: React.FC = () => {
  const { weather } = useWeather();
  const { user } = useAuthStore();
  const { plots } = useFarmStore();

  // Count active alerts
  const activeAlerts = plots.flatMap(plot => plot.alerts).filter(alert => !alert.resolved);

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-green-100 sticky top-0 z-30">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Good morning, {user?.name || 'Farmer'}! 🌅
            </h1>
            <p className="text-gray-600">
              Today's weather: {weather.temperature}°C, {weather.condition}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Notifications */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative p-2 text-gray-600 hover:text-green-600 transition-colors"
            >
              <Bell className="w-6 h-6" />
              {activeAlerts.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {activeAlerts.length}
                </span>
              )}
            </motion.button>

            {/* Profile */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3 bg-gradient-to-r from-green-50 to-yellow-50 px-4 py-2 rounded-full cursor-pointer"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-yellow-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <span className="font-medium text-gray-700">{user?.name || 'User'}</span>
            </motion.div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;