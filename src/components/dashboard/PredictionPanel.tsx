import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Sprout, Target, Calendar, DollarSign, Droplets } from 'lucide-react';
import { AIService } from '../../utils/aiService';

const PredictionPanel: React.FC = () => {
  const [formData, setFormData] = useState({
    landSize: '',
    cropType: 'wheat',
    soilType: 'loamy'
  });
  const [prediction, setPrediction] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const cropTypes = [
    { value: 'wheat', label: '🌾 Wheat' },
    { value: 'rice', label: '🌾 Rice' },
    { value: 'maize', label: '🌽 Maize' },
    { value: 'soybean', label: '🫘 Soybean' },
    { value: 'potato', label: '🥔 Potato' }
  ];

  const soilTypes = [
    { value: 'loamy', label: '🌱 Loamy (Best)' },
    { value: 'clay', label: '🧱 Clay' },
    { value: 'sandy', label: '🏖️ Sandy' },
    { value: 'silt', label: '🌊 Silt' }
  ];

  const handlePredict = async () => {
    if (!formData.landSize) return;
    
    setLoading(true);
    try {
      const result = await AIService.generateCropPrediction({
        landSize: parseFloat(formData.landSize),
        cropType: formData.cropType,
        soilType: formData.soilType
      });
      setPrediction(result);
    } catch (error) {
      console.error('Prediction failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-8">
        <Brain className="w-8 h-8 text-green-600" />
        <h2 className="text-3xl font-bold text-gray-800">AI Crop Predictions</h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8 border border-green-100"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <Target className="w-5 h-5 text-green-600 mr-2" />
            Farm Details
          </h3>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Land Size (Hectares)
              </label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                value={formData.landSize}
                onChange={(e) => setFormData({...formData, landSize: e.target.value})}
                placeholder="Enter land size"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Crop Type
              </label>
              <select
                value={formData.cropType}
                onChange={(e) => setFormData({...formData, cropType: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              >
                {cropTypes.map(crop => (
                  <option key={crop.value} value={crop.value}>
                    {crop.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Soil Type
              </label>
              <select
                value={formData.soilType}
                onChange={(e) => setFormData({...formData, soilType: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              >
                {soilTypes.map(soil => (
                  <option key={soil.value} value={soil.value}>
                    {soil.label}
                  </option>
                ))}
              </select>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePredict}
              disabled={loading || !formData.landSize}
              className="w-full bg-gradient-to-r from-green-500 to-yellow-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-yellow-600 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Analyzing...</span>
                </div>
              ) : (
                'Generate AI Prediction'
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Prediction Results */}
        {prediction && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-lg p-8 border border-green-100"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <Sprout className="w-5 h-5 text-green-600 mr-2" />
              Prediction Results
            </h3>

            <div className="space-y-6">
              {/* Yield Prediction */}
              <div className="bg-gradient-to-r from-green-50 to-yellow-50 p-6 rounded-xl border border-green-100">
                <h4 className="font-bold text-gray-800 mb-2">Expected Yield</h4>
                <div className="text-3xl font-bold text-green-600">
                  {prediction.expectedYield} tons/hectare
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Confidence: {prediction.confidence}%
                </div>
              </div>

              {/* Cost & Water Estimates */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-xl border border-blue-100">
                  <div className="flex items-center space-x-2 mb-2">
                    <DollarSign className="w-5 h-5 text-blue-600" />
                    <h4 className="font-bold text-gray-800">Cost Estimate</h4>
                  </div>
                  <div className="text-xl font-semibold text-blue-600">
                    ${prediction.costEstimate.toFixed(0)}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-4 rounded-xl border border-cyan-100">
                  <div className="flex items-center space-x-2 mb-2">
                    <Droplets className="w-5 h-5 text-cyan-600" />
                    <h4 className="font-bold text-gray-800">Water Need</h4>
                  </div>
                  <div className="text-xl font-semibold text-cyan-600">
                    {prediction.waterRequirement}L
                  </div>
                </div>
              </div>

              {/* Fertilizer Recommendation */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-100">
                <h4 className="font-bold text-gray-800 mb-2">Recommended Fertilizer</h4>
                <div className="text-xl font-semibold text-purple-600">
                  {prediction.fertilizer}
                </div>
              </div>

              {/* Schedule */}
              <div>
                <h4 className="font-bold text-gray-800 mb-4 flex items-center">
                  <Calendar className="w-5 h-5 text-green-600 mr-2" />
                  Fertilizer Schedule
                </h4>
                <div className="space-y-3">
                  {prediction.schedule.map((item: any, index: number) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {item.week}
                      </div>
                      <span className="text-gray-700">{item.action}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div>
                <h4 className="font-bold text-gray-800 mb-4">Additional Recommendations</h4>
                <ul className="space-y-2">
                  {prediction.recommendations.map((rec: string, index: number) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <span className="text-gray-700">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PredictionPanel;