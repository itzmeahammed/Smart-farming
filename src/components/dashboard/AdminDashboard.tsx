import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Package, 
  BarChart3, 
  Settings,
  TrendingUp,
  AlertCircle,
  DollarSign,
  Activity
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const userStats = [
    { month: 'Jan', farmers: 120, buyers: 45, agronomists: 8 },
    { month: 'Feb', farmers: 135, buyers: 52, agronomists: 10 },
    { month: 'Mar', farmers: 158, buyers: 61, agronomists: 12 },
    { month: 'Apr', farmers: 172, buyers: 68, agronomists: 14 },
    { month: 'May', farmers: 189, buyers: 75, agronomists: 15 },
    { month: 'Jun', farmers: 205, buyers: 82, agronomists: 17 }
  ];

  const revenueData = [
    { month: 'Jan', revenue: 12500, transactions: 89 },
    { month: 'Feb', revenue: 15200, transactions: 102 },
    { month: 'Mar', revenue: 18900, transactions: 125 },
    { month: 'Apr', revenue: 22100, transactions: 143 },
    { month: 'May', revenue: 25800, transactions: 167 },
    { month: 'Jun', revenue: 28900, transactions: 189 }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'users', label: 'Users', icon: <Users className="w-5 h-5" /> },
    { id: 'inventory', label: 'Inventory', icon: <Package className="w-5 h-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-3">
        <Settings className="w-8 h-8 text-purple-600" />
        <h2 className="text-3xl font-bold text-gray-800">Admin Dashboard</h2>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-2 bg-white rounded-2xl p-2 shadow-lg border border-purple-100">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'text-gray-600 hover:bg-purple-50'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </motion.button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Key Metrics */}
          <div className="grid md:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-800">Total Users</h3>
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-purple-600">1,247</div>
              <div className="text-sm text-green-600">↗ +12% this month</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-green-100"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-800">Active Farms</h3>
                <Activity className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-green-600">892</div>
              <div className="text-sm text-green-600">↗ +8% this month</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-yellow-100"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-800">Revenue</h3>
                <DollarSign className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="text-3xl font-bold text-yellow-600">$28,900</div>
              <div className="text-sm text-green-600">↗ +15% this month</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-red-100"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-800">Active Alerts</h3>
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <div className="text-3xl font-bold text-red-600">23</div>
              <div className="text-sm text-red-600">↗ +3 today</div>
            </motion.div>
          </div>

          {/* Charts */}
          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-6">User Growth</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={userStats}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip />
                  <Bar dataKey="farmers" fill="#4CAF50" />
                  <Bar dataKey="buyers" fill="#29B6F6" />
                  <Bar dataKey="agronomists" fill="#FBC02D" />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-green-100"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-6">Revenue Trends</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip />
                  <Line type="monotone" dataKey="revenue" stroke="#4CAF50" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-6">User Management</h3>
          <div className="space-y-4">
            {[
              { name: 'Ahammed Farmer', email: 'farmer@demo.com', role: 'farmer', status: 'active' },
              { name: 'Sarah Buyer', email: 'buyer@demo.com', role: 'buyer', status: 'active' },
              { name: 'Dr. Lisa Expert', email: 'agronomist@demo.com', role: 'agronomist', status: 'active' },
              { name: 'Mike Admin', email: 'admin@demo.com', role: 'admin', status: 'active' }
            ].map((user, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <h4 className="font-semibold text-gray-800">{user.name}</h4>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                    user.role === 'farmer' ? 'bg-green-100 text-green-800' :
                    user.role === 'buyer' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {user.role}
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                    {user.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === 'inventory' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-6">Seed & Fertilizer Inventory</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Wheat Seeds', stock: 1250, unit: 'kg', status: 'in-stock' },
              { name: 'Rice Seeds', stock: 890, unit: 'kg', status: 'in-stock' },
              { name: 'NPK 20-10-10', stock: 45, unit: 'bags', status: 'low' },
              { name: 'Organic Compost', stock: 230, unit: 'kg', status: 'in-stock' },
              { name: 'Maize Seeds', stock: 15, unit: 'kg', status: 'critical' },
              { name: 'Pesticide Spray', stock: 78, unit: 'liters', status: 'in-stock' }
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-800">{item.name}</h4>
                <p className="text-2xl font-bold text-gray-700">{item.stock} {item.unit}</p>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                  item.status === 'critical' ? 'bg-red-100 text-red-800' :
                  item.status === 'low' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AdminDashboard;