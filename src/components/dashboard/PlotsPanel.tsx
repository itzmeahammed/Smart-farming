import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Map, 
  Plus, 
  Edit, 
  Trash2, 
  Sprout, 
  Droplets,
  Thermometer,
  AlertTriangle
} from 'lucide-react';
import { useFarmStore } from '../../store/farmStore';

const PlotsPanel: React.FC = () => {
  const { plots, addPlot, updatePlot, selectPlot, selectedPlot } = useFarmStore();
  const [showAddPlot, setShowAddPlot] = useState(false);

  const handleAddPlot = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    addPlot({
      name: formData.get('name') as string,
      area: parseFloat(formData.get('area') as string),
      soilType: formData.get('soilType') as any,
      cropType: formData.get('cropType') as string,
      growthStage: 0,
      health: 100
    });

    setShowAddPlot(false);
  };

  const getHealthColor = (health: number) => {
    if (health >= 80) return 'text-green-600';
    if (health >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStageLabel = (stage: number) => {
    const stages = ['Seed', 'Sprout', 'Growing', 'Flowering', 'Mature'];
    return stages[stage] || 'Unknown';
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Map className="w-8 h-8 text-green-600" />
          <h2 className="text-3xl font-bold text-gray-800">Farm Plots</h2>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddPlot(true)}
          className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-yellow-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-yellow-600 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <Plus className="w-5 h-5" />
          <span>Add Plot</span>
        </motion.button>
      </div>

      {/* Plots Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plots.map((plot, index) => (
          <motion.div
            key={plot.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            onClick={() => selectPlot(plot.id)}
            className={`bg-white rounded-2xl shadow-lg p-6 border cursor-pointer hover:shadow-xl transition-all duration-300 ${
              selectedPlot === plot.id ? 'border-green-500 ring-2 ring-green-200' : 'border-green-100'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">{plot.name}</h3>
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 text-gray-600 hover:text-green-600 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Area:</span>
                <span className="font-semibold">{plot.area} hectares</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Crop:</span>
                <span className="font-semibold capitalize">{plot.cropType || 'None'}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Stage:</span>
                <span className="font-semibold">{getStageLabel(plot.growthStage)}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Health:</span>
                <span className={`font-semibold ${getHealthColor(plot.health)}`}>
                  {plot.health}%
                </span>
              </div>

              {plot.yieldPrediction && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Predicted Yield:</span>
                  <span className="font-semibold text-green-600">
                    {plot.yieldPrediction} tons/ha
                  </span>
                </div>
              )}
            </div>

            {/* Alerts */}
            {plot.alerts.filter(alert => !alert.resolved).length > 0 && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl">
                <div className="flex items-center space-x-2 text-red-600">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {plot.alerts.filter(alert => !alert.resolved).length} active alert(s)
                  </span>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="mt-4 flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 bg-blue-50 text-blue-600 py-2 rounded-lg hover:bg-blue-100 transition-all text-sm font-medium"
              >
                <Droplets className="w-4 h-4 mx-auto" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 bg-green-50 text-green-600 py-2 rounded-lg hover:bg-green-100 transition-all text-sm font-medium"
              >
                <Sprout className="w-4 h-4 mx-auto" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 bg-orange-50 text-orange-600 py-2 rounded-lg hover:bg-orange-100 transition-all text-sm font-medium"
              >
                <Thermometer className="w-4 h-4 mx-auto" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Plot Modal */}
      {showAddPlot && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowAddPlot(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Add New Plot</h3>
            
            <form onSubmit={handleAddPlot} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Plot Name
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="e.g., North Field"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Area (Hectares)
                </label>
                <input
                  name="area"
                  type="number"
                  step="0.1"
                  min="0.1"
                  required
                  placeholder="2.5"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Soil Type
                </label>
                <select
                  name="soilType"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="loamy">Loamy</option>
                  <option value="clay">Clay</option>
                  <option value="sandy">Sandy</option>
                  <option value="silt">Silt</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Crop Type (Optional)
                </label>
                <select
                  name="cropType"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select later...</option>
                  <option value="wheat">Wheat</option>
                  <option value="rice">Rice</option>
                  <option value="maize">Maize</option>
                  <option value="soybean">Soybean</option>
                  <option value="potato">Potato</option>
                </select>
              </div>

              <div className="flex space-x-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => setShowAddPlot(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-green-500 to-yellow-500 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-yellow-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Add Plot
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default PlotsPanel;