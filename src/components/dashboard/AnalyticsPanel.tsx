import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  AreaChart,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { BarChart3, TrendingUp, Download, Calendar } from 'lucide-react';

const AnalyticsPanel: React.FC = () => {
  const yieldData = [
    { month: 'Jan', yield: 4.2, target: 4.5 },
    { month: 'Feb', yield: 4.8, target: 4.5 },
    { month: 'Mar', yield: 5.1, target: 4.5 },
    { month: 'Apr', yield: 4.9, target: 4.5 },
    { month: 'May', yield: 5.3, target: 4.5 },
    { month: 'Jun', yield: 5.7, target: 4.5 },
  ];

  const cropDistribution = [
    { name: 'Wheat', value: 40, color: '#FBC02D' },
    { name: 'Rice', value: 30, color: '#4CAF50' },
    { name: 'Maize', value: 20, color: '#29B6F6' },
    { name: 'Soybean', value: 10, color: '#8D6E63' },
  ];

  const soilHealth = [
    { week: 'Week 1', ph: 6.8, moisture: 65, nutrients: 78 },
    { week: 'Week 2', ph: 6.9, moisture: 70, nutrients: 82 },
    { week: 'Week 3', ph: 7.0, moisture: 68, nutrients: 85 },
    { week: 'Week 4', ph: 6.8, moisture: 72, nutrients: 88 },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <BarChart3 className="w-8 h-8 text-green-600" />
          <h2 className="text-3xl font-bold text-gray-800">Analytics & Insights</h2>
        </div>
        
        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 bg-white px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all border border-green-100"
          >
            <Calendar className="w-5 h-5 text-gray-600" />
            <span className="text-gray-700">Last 30 days</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-yellow-500 text-white px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            <Download className="w-5 h-5" />
            <span>Export Report</span>
          </motion.button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6 border border-green-100"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">Total Yield</h3>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-3xl font-bold text-green-600 mb-2">32.4 tons</div>
          <div className="flex items-center space-x-1 text-sm">
            <span className="text-green-600">↗ +12%</span>
            <span className="text-gray-600">vs last season</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 border border-green-100"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">Efficiency</h3>
            <BarChart3 className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-3xl font-bold text-blue-600 mb-2">94.2%</div>
          <div className="flex items-center space-x-1 text-sm">
            <span className="text-green-600">↗ +5%</span>
            <span className="text-gray-600">optimization</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6 border border-green-100"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">Cost Savings</h3>
            <TrendingUp className="w-5 h-5 text-yellow-600" />
          </div>
          <div className="text-3xl font-bold text-yellow-600 mb-2">$2,340</div>
          <div className="flex items-center space-x-1 text-sm">
            <span className="text-green-600">↗ +18%</span>
            <span className="text-gray-600">this month</span>
          </div>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Yield Trends */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-6 border border-green-100"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-6">Yield Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={yieldData}>
              <defs>
                <linearGradient id="yieldGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#4CAF50" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="yield" 
                stroke="#4CAF50" 
                fillOpacity={1} 
                fill="url(#yieldGradient)"
                strokeWidth={3}
              />
              <Line 
                type="monotone" 
                dataKey="target" 
                stroke="#FBC02D" 
                strokeWidth={2}
                strokeDasharray="5 5"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Crop Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-6 border border-green-100"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-6">Crop Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={cropDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {cropDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap justify-center space-x-4 mt-4">
            {cropDistribution.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-gray-600">{item.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Soil Health Trends */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-2xl shadow-lg p-6 border border-green-100"
      >
        <h3 className="text-xl font-bold text-gray-800 mb-6">Soil Health Trends</h3>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={soilHealth}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="week" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="ph" 
              stroke="#4CAF50" 
              strokeWidth={3}
              dot={{ fill: '#4CAF50', strokeWidth: 2, r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="moisture" 
              stroke="#29B6F6" 
              strokeWidth={3}
              dot={{ fill: '#29B6F6', strokeWidth: 2, r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="nutrients" 
              stroke="#FBC02D" 
              strokeWidth={3}
              dot={{ fill: '#FBC02D', strokeWidth: 2, r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="flex justify-center space-x-6 mt-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">pH Level</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Moisture %</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Nutrients %</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AnalyticsPanel;