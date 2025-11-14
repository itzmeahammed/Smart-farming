import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Languages, Send, Volume2, Copy } from 'lucide-react';
import { AIService } from '../../utils/aiService';

const TranslatorPanel: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('spanish');
  const [loading, setLoading] = useState(false);

  const languages = [
    { code: 'spanish', name: 'Spanish', flag: '🇪🇸' },
    { code: 'hindi', name: 'Hindi', flag: '🇮🇳' },
    { code: 'portuguese', name: 'Portuguese', flag: '🇧🇷' },
    { code: 'chinese', name: 'Chinese', flag: '🇨🇳' },
    { code: 'arabic', name: 'Arabic', flag: '🇸🇦' },
  ];

  const sampleQuestions = [
    "¿Cuándo debo plantar maíz?",
    "मेरी फसल की देखभाल कैसे करूं?",
    "Qual é o melhor fertilizante para trigo?",
    "我的土壤需要什么营养？",
    "متى يجب أن أحصد القمح؟"
  ];

  const handleTranslate = async () => {
    if (!inputText.trim()) return;
    
    setLoading(true);
    try {
      const result = await AIService.translateText(inputText, sourceLanguage, 'en');
      setTranslatedText(result.translatedText);
    } catch (error) {
      console.error('Translation failed:', error);
      setTranslatedText('Translation service temporarily unavailable. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(translatedText);
  };

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(translatedText);
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-3 mb-8">
        <Languages className="w-8 h-8 text-blue-600" />
        <h2 className="text-3xl font-bold text-gray-800">AI Language Translator</h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8 border border-green-100"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-6">Ask in Your Language</h3>
          
          {/* Language Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Your Language
            </label>
            <div className="grid grid-cols-2 gap-2">
              {languages.map((lang) => (
                <motion.button
                  key={lang.code}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSourceLanguage(lang.code)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    sourceLanguage === lang.code
                      ? 'bg-gradient-to-r from-green-500 to-yellow-500 text-white'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="space-y-4">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your farming question in your language..."
              rows={6}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            />
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleTranslate}
              disabled={loading || !inputText.trim()}
              className="w-full bg-gradient-to-r from-green-500 to-yellow-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-yellow-600 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Translating...</span>
                </div>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Get AI Response</span>
                </>
              )}
            </motion.button>
          </div>

          {/* Sample Questions */}
          <div className="mt-6">
            <p className="text-sm font-medium text-gray-700 mb-3">Try these sample questions:</p>
            <div className="space-y-2">
              {sampleQuestions.slice(0, 3).map((question, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.01 }}
                  onClick={() => setInputText(question)}
                  className="block w-full text-left px-3 py-2 text-sm text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all"
                >
                  {question}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Response Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-8 border border-green-100"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-6">AI Response</h3>
          
          {translatedText ? (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-green-50 to-yellow-50 p-6 rounded-xl border border-green-100">
                <p className="text-gray-800 leading-relaxed">
                  {translatedText}
                </p>
              </div>
              
              <div className="flex space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSpeak}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-all"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Listen</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCopy}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-50 text-gray-600 rounded-xl hover:bg-gray-100 transition-all"
                >
                  <Copy className="w-4 h-4" />
                  <span>Copy</span>
                </motion.button>
              </div>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <Languages className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>AI response will appear here</p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default TranslatorPanel;