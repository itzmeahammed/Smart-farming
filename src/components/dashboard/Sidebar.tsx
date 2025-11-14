import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Sprout, 
  Brain, 
  Cloud, 
  BarChart3, 
  Languages, 
  Map,
  CheckSquare,
  ShoppingCart,
  AlertTriangle,
  Home,
  LogOut,
  Users,
  Settings,
  Award,
  Package
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

interface SidebarProps {
  activePanel: string;
  setActivePanel: (panel: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePanel, setActivePanel }) => {
  const navigate = useNavigate();
  const { logout, user } = useAuthStore();

  const getMenuItems = () => {
    switch (user?.role) {
      case 'admin':
        return [
          { id: 'dashboard', icon: <BarChart3 className="w-5 h-5" />, label: 'Admin Dashboard' },
          { id: 'users', icon: <Users className="w-5 h-5" />, label: 'User Management' },
          { id: 'inventory', icon: <Package className="w-5 h-5" />, label: 'Inventory' },
          { id: 'analytics', icon: <BarChart3 className="w-5 h-5" />, label: 'Analytics' },
          { id: 'settings', icon: <Settings className="w-5 h-5" />, label: 'Settings' }
        ];
      
      case 'buyer':
        return [
          { id: 'dashboard', icon: <ShoppingCart className="w-5 h-5" />, label: 'Marketplace' },
          { id: 'orders', icon: <Package className="w-5 h-5" />, label: 'My Orders' },
          { id: 'favorites', icon: <Award className="w-5 h-5" />, label: 'Favorites' },
          { id: 'analytics', icon: <BarChart3 className="w-5 h-5" />, label: 'Purchase Analytics' }
        ];
      
      case 'agronomist':
        return [
          { id: 'dashboard', icon: <Award className="w-5 h-5" />, label: 'Consultation Hub' },
          { id: 'clients', icon: <Users className="w-5 h-5" />, label: 'My Clients' },
          { id: 'schedule', icon: <CheckSquare className="w-5 h-5" />, label: 'Schedule' },
          { id: 'reports', icon: <BarChart3 className="w-5 h-5" />, label: 'Reports' }
        ];
      
      default: // farmer
        return [
          { id: 'predictions', icon: <Brain className="w-5 h-5" />, label: 'AI Predictions' },
          { id: 'plots', icon: <Map className="w-5 h-5" />, label: 'Farm Plots' },
          { id: 'weather', icon: <Cloud className="w-5 h-5" />, label: 'Weather & Soil' },
          { id: 'farm', icon: <Sprout className="w-5 h-5" />, label: '3D Farm View' },
          { id: 'tasks', icon: <CheckSquare className="w-5 h-5" />, label: 'Tasks' },
          { id: 'marketplace', icon: <ShoppingCart className="w-5 h-5" />, label: 'Marketplace' },
          { id: 'alerts', icon: <AlertTriangle className="w-5 h-5" />, label: 'Alerts' },
          { id: 'analytics', icon: <BarChart3 className="w-5 h-5" />, label: 'Analytics' },
          { id: 'translator', icon: <Languages className="w-5 h-5" />, label: 'AI Translator' }
        ];
    }
  };

  const menuItems = getMenuItems();

  const getRoleColor = () => {
    switch (user?.role) {
      case 'admin': return 'from-purple-500 to-pink-500';
      case 'buyer': return 'from-blue-500 to-cyan-500';
      case 'agronomist': return 'from-green-500 to-teal-500';
      default: return 'from-green-500 to-yellow-500';
    }
  };

  const getRoleIcon = () => {
    switch (user?.role) {
      case 'admin': return '👑';
      case 'buyer': return '🛒';
      case 'agronomist': return '🔬';
      default: return '🌾';
    }
  };

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed left-0 top-0 h-full w-64 bg-white shadow-xl border-r border-green-100 z-40"
    >
      {/* Logo */}
      <div className="p-6 border-b border-green-100">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 bg-gradient-to-br ${getRoleColor()} rounded-lg flex items-center justify-center`}>
            <span className="text-white text-lg">{getRoleIcon()}</span>
          </div>
          <div>
            <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-yellow-600 bg-clip-text text-transparent">
              AgriSmart
            </span>
            <div className="text-xs text-gray-500 capitalize">{user?.role} Portal</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <motion.button
            key={item.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActivePanel(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              activePanel === item.id
                ? `bg-gradient-to-r ${getRoleColor()} text-white shadow-lg`
                : 'text-gray-600 hover:bg-green-50 hover:text-green-700'
            }`}
          >
            {item.icon}
            <span className="font-medium">{item.label}</span>
          </motion.button>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="absolute bottom-6 left-4 right-4 space-y-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/')}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 transition-all duration-200"
        >
          <Home className="w-5 h-5" />
          <span className="font-medium">Home</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            logout();
            navigate('/');
          }}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Sidebar;