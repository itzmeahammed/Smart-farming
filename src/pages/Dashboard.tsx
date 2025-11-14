import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';
import PredictionPanel from '../components/dashboard/PredictionPanel';
import WeatherPanel from '../components/dashboard/WeatherPanel';
import Farm3DView from '../components/3d/Farm3DView';
import AnalyticsPanel from '../components/dashboard/AnalyticsPanel';
import TranslatorPanel from '../components/dashboard/TranslatorPanel';
import PlotsPanel from '../components/dashboard/PlotsPanel';
import TasksPanel from '../components/dashboard/TasksPanel';
import MarketplacePanel from '../components/dashboard/MarketplacePanel';
import AlertsPanel from '../components/dashboard/AlertsPanel';
import AdminDashboard from '../components/dashboard/AdminDashboard';
import BuyerDashboard from '../components/dashboard/BuyerDashboard';
import AgronomistDashboard from '../components/dashboard/AgronomistDashboard';
import { useAuthStore } from '../store/authStore';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();
  const [activePanel, setActivePanel] = useState('dashboard');

  // Redirect to landing if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  const renderRoleBasedDashboard = () => {
    switch (user?.role) {
      case 'admin':
        return <AdminDashboard />;
      case 'buyer':
        return <BuyerDashboard />;
      case 'agronomist':
        return <AgronomistDashboard />;
      default:
        return renderFarmerPanel();
    }
  };

  const renderFarmerPanel = () => {
    switch (activePanel) {
      case 'dashboard':
      case 'predictions':
        return <PredictionPanel />;
      case 'plots':
        return <PlotsPanel />;
      case 'weather':
        return <WeatherPanel />;
      case 'farm':
        return <Farm3DView />;
      case 'tasks':
        return <TasksPanel />;
      case 'marketplace':
        return <MarketplacePanel />;
      case 'alerts':
        return <AlertsPanel />;
      case 'analytics':
        return <AnalyticsPanel />;
      case 'translator':
        return <TranslatorPanel />;
      default:
        return <PredictionPanel />;
    }
  };

  const renderActivePanel = () => {
    // For non-farmer roles, show their specific dashboard
    if (user?.role !== 'farmer') {
      return renderRoleBasedDashboard();
    }
    
    // For farmers, show the selected panel
    return renderFarmerPanel();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50">
      <Sidebar activePanel={activePanel} setActivePanel={setActivePanel} />
      
      <div className="lg:ml-64">
        <Header />
        
        <main className="p-6">
          <motion.div
            key={`${user?.role}-${activePanel}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {renderActivePanel()}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;