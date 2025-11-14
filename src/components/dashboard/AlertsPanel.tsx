import React from 'react';
import { motion } from 'framer-motion';
import { 
  AlertTriangle, 
  Bug, 
  Cloud, 
  Droplets, 
  CheckCircle,
  X
} from 'lucide-react';
import { useFarmStore } from '../../store/farmStore';

const AlertsPanel: React.FC = () => {
  const { plots, resolveAlert } = useFarmStore();

  // Get all alerts from all plots
  const allAlerts = plots.flatMap(plot => 
    plot.alerts.map(alert => ({ ...alert, plotName: plot.name, plotId: plot.id }))
  );

  const activeAlerts = allAlerts.filter(alert => !alert.resolved);
  const resolvedAlerts = allAlerts.filter(alert => alert.resolved);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'pest': return <Bug className="w-5 h-5" />;
      case 'weather': return <Cloud className="w-5 h-5" />;
      case 'irrigation': return <Droplets className="w-5 h-5" />;
      default: return <AlertTriangle className="w-5 h-5" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'border-l-red-500 bg-red-50';
      case 'warning': return 'border-l-yellow-500 bg-yellow-50';
      default: return 'border-l-blue-500 bg-blue-50';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-3">
        <AlertTriangle className="w-8 h-8 text-orange-600" />
        <h2 className="text-3xl font-bold text-gray-800">Alerts & Notifications</h2>
      </div>

      {/* Alert Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6 border border-red-100"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">Critical</h3>
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <div className="text-3xl font-bold text-red-600">
            {activeAlerts.filter(alert => alert.severity === 'critical').length}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 border border-yellow-100"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">Warnings</h3>
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
          </div>
          <div className="text-3xl font-bold text-yellow-600">
            {activeAlerts.filter(alert => alert.severity === 'warning').length}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6 border border-green-100"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">Resolved</h3>
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-3xl font-bold text-green-600">{resolvedAlerts.length}</div>
        </motion.div>
      </div>

      {/* Active Alerts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl shadow-lg p-6 border border-green-100"
      >
        <h3 className="text-xl font-bold text-gray-800 mb-6">Active Alerts</h3>
        
        {activeAlerts.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <CheckCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>No active alerts. Your farm is healthy!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activeAlerts.map((alert) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`border-l-4 p-4 rounded-r-xl ${getSeverityColor(alert.severity)}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-gray-600">
                      {getAlertIcon(alert.type)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 capitalize">
                        {alert.type} Alert - {alert.plotName}
                      </h4>
                      <p className="text-sm text-gray-600">{alert.message}</p>
                      <p className="text-xs text-gray-500">
                        {alert.createdAt.toLocaleDateString()} at {alert.createdAt.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => resolveAlert(alert.plotId, alert.id)}
                    className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-all"
                  >
                    <CheckCircle className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Recent Resolved Alerts */}
      {resolvedAlerts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-6 border border-green-100"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-6">Recently Resolved</h3>
          
          <div className="space-y-3">
            {resolvedAlerts.slice(0, 3).map((alert) => (
              <div
                key={alert.id}
                className="flex items-center space-x-3 p-3 bg-green-50 rounded-xl border border-green-100"
              >
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">
                    {alert.type} issue resolved in {alert.plotName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {alert.createdAt.toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AlertsPanel;