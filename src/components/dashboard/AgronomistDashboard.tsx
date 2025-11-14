import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  MessageCircle, 
  Video,
  FileText,
  Calendar,
  Award,
  TrendingUp,
  Clock
} from 'lucide-react';

const AgronomistDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('consultations');

  const consultations = [
    {
      id: '1',
      farmerName: 'Ahammed Farmer',
      cropType: 'wheat',
      issue: 'Pest control advice needed',
      scheduledAt: new Date(Date.now() + 86400000),
      status: 'scheduled',
      priority: 'high'
    },
    {
      id: '2',
      farmerName: 'Maria Rodriguez',
      cropType: 'rice',
      issue: 'Soil pH optimization',
      scheduledAt: new Date(Date.now() + 172800000),
      status: 'scheduled',
      priority: 'medium'
    },
    {
      id: '3',
      farmerName: 'David Chen',
      cropType: 'maize',
      issue: 'Fertilizer schedule review',
      scheduledAt: new Date(Date.now() - 86400000),
      status: 'completed',
      priority: 'low'
    }
  ];

  const messages = [
    {
      id: '1',
      farmerName: 'Ahammed Farmer',
      message: 'My wheat crops are showing yellow spots on leaves. What could be the cause?',
      timestamp: new Date(Date.now() - 3600000),
      replied: false
    },
    {
      id: '2',
      farmerName: 'Sarah Ahammedson',
      message: 'Thank you for the fertilizer advice! The crops are looking much better.',
      timestamp: new Date(Date.now() - 7200000),
      replied: true
    }
  ];

  const tabs = [
    { id: 'consultations', label: 'Consultations', icon: <Video className="w-5 h-5" /> },
    { id: 'messages', label: 'Messages', icon: <MessageCircle className="w-5 h-5" /> },
    { id: 'reports', label: 'Reports', icon: <FileText className="w-5 h-5" /> },
    { id: 'schedule', label: 'Schedule', icon: <Calendar className="w-5 h-5" /> }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-3">
        <Award className="w-8 h-8 text-green-600" />
        <h2 className="text-3xl font-bold text-gray-800">Agronomist Console</h2>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6 border border-green-100"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">Active Clients</h3>
            <Users className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-3xl font-bold text-green-600">47</div>
          <div className="text-sm text-green-600">↗ +5 this week</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">Consultations</h3>
            <Video className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-3xl font-bold text-blue-600">
            {consultations.filter(c => c.status === 'scheduled').length}
          </div>
          <div className="text-sm text-blue-600">scheduled</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6 border border-yellow-100"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">Success Rate</h3>
            <TrendingUp className="w-5 h-5 text-yellow-600" />
          </div>
          <div className="text-3xl font-bold text-yellow-600">94.2%</div>
          <div className="text-sm text-green-600">↗ +2.1%</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">Avg Response</h3>
            <Clock className="w-5 h-5 text-purple-600" />
          </div>
          <div className="text-3xl font-bold text-purple-600">2.4h</div>
          <div className="text-sm text-green-600">↗ improved</div>
        </motion.div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-2 bg-white rounded-2xl p-2 shadow-lg border border-green-100">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg'
                : 'text-gray-600 hover:bg-green-50'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'consultations' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6 border border-green-100"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-6">Upcoming Consultations</h3>
          
          <div className="space-y-4">
            {consultations.map((consultation) => (
              <div
                key={consultation.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-semibold text-gray-800">{consultation.farmerName}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPriorityColor(consultation.priority)}`}>
                      {consultation.priority}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(consultation.status)}`}>
                      {consultation.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    Crop: <span className="capitalize font-medium">{consultation.cropType}</span>
                  </p>
                  <p className="text-sm text-gray-600 mb-2">{consultation.issue}</p>
                  <p className="text-xs text-gray-500">
                    {consultation.scheduledAt.toLocaleDateString()} at {consultation.scheduledAt.toLocaleTimeString()}
                  </p>
                </div>
                
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
                  >
                    <Video className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === 'messages' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6 border border-green-100"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-6">Farmer Messages</h3>
          
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`p-4 rounded-xl border-l-4 ${
                  message.replied ? 'border-l-green-500 bg-green-50' : 'border-l-yellow-500 bg-yellow-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-800">{message.farmerName}</h4>
                  <span className="text-xs text-gray-500">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-gray-700 mb-3">{message.message}</p>
                {!message.replied && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all text-sm"
                  >
                    Reply
                  </motion.button>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AgronomistDashboard;