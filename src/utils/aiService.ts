// Static AI service that works without external APIs

interface PredictionInput {
  landSize: number;
  cropType: string;
  soilType: string;
  location?: string;
}

interface PredictionResult {
  expectedYield: number;
  fertilizer: string;
  schedule: Array<{ week: number; action: string }>;
  confidence: number;
  recommendations: string[];
  costEstimate: number;
  waterRequirement: number;
}

interface TranslationResult {
  translatedText: string;
  confidence: number;
  detectedLanguage: string;
}

// Mock crop data for predictions
const cropData = {
  wheat: {
    baseYield: 4.5,
    fertilizer: 'NPK 20-10-10',
    growthWeeks: 16,
    waterNeed: 'medium'
  },
  rice: {
    baseYield: 6.2,
    fertilizer: 'NPK 15-15-15',
    growthWeeks: 20,
    waterNeed: 'high'
  },
  maize: {
    baseYield: 8.1,
    fertilizer: 'NPK 18-12-8',
    growthWeeks: 14,
    waterNeed: 'medium'
  },
  soybean: {
    baseYield: 3.8,
    fertilizer: 'NPK 10-20-20',
    growthWeeks: 18,
    waterNeed: 'low'
  },
  potato: {
    baseYield: 25.0,
    fertilizer: 'NPK 12-12-17',
    growthWeeks: 12,
    waterNeed: 'medium'
  }
};

// Soil type multipliers
const soilMultipliers = {
  loamy: 1.0,
  clay: 0.85,
  sandy: 0.75,
  silt: 0.9
};

export class AIService {
  static async generateCropPrediction(input: PredictionInput): Promise<PredictionResult> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const crop = cropData[input.cropType as keyof typeof cropData];
    const soilMultiplier = soilMultipliers[input.soilType as keyof typeof soilMultipliers];
    
    if (!crop) {
      throw new Error('Unsupported crop type');
    }

    // Calculate yield with some randomness
    const baseYield = crop.baseYield * soilMultiplier;
    const randomFactor = 0.8 + Math.random() * 0.4; // 0.8 to 1.2
    const expectedYield = parseFloat((baseYield * randomFactor).toFixed(1));

    // Generate schedule
    const schedule = [
      { week: 1, action: 'Prepare soil and apply base fertilizer' },
      { week: Math.floor(crop.growthWeeks * 0.25), action: 'First top dressing application' },
      { week: Math.floor(crop.growthWeeks * 0.5), action: 'Second fertilizer application' },
      { week: Math.floor(crop.growthWeeks * 0.75), action: 'Final nutrient boost' },
      { week: crop.growthWeeks, action: 'Harvest preparation' }
    ];

    // Generate recommendations
    const recommendations = [
      `Maintain soil moisture at ${crop.waterNeed === 'high' ? '70-80%' : crop.waterNeed === 'medium' ? '60-70%' : '50-60%'}`,
      'Monitor for pest activity weekly during growing season',
      'Apply organic compost 2 weeks before planting',
      `Expected harvest in ${crop.growthWeeks} weeks`,
      'Test soil pH monthly and adjust if needed'
    ];

    return {
      expectedYield,
      fertilizer: crop.fertilizer,
      schedule,
      confidence: Math.floor(Math.random() * 15 + 85), // 85-100%
      recommendations,
      costEstimate: input.landSize * 150 + Math.random() * 100,
      waterRequirement: input.landSize * (crop.waterNeed === 'high' ? 800 : crop.waterNeed === 'medium' ? 600 : 400)
    };
  }

  static async translateText(text: string, fromLanguage: string, toLanguage: string = 'en'): Promise<TranslationResult> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock translations for common farming questions
    const translations: Record<string, Record<string, string>> = {
      spanish: {
        '¿Cuándo debo plantar maíz?': 'When should I plant corn?',
        '¿Qué fertilizante es mejor?': 'What fertilizer is better?',
        'Mi cultivo tiene problemas': 'My crop has problems'
      },
      hindi: {
        'मेरी फसल की देखभाल कैसे करूं?': 'How should I take care of my crop?',
        'कब बुआई करनी चाहिए?': 'When should I sow?',
        'मिट्टी की जांच कैसे करें?': 'How to test the soil?'
      },
      portuguese: {
        'Qual é o melhor fertilizante para trigo?': 'What is the best fertilizer for wheat?',
        'Como cuidar da plantação?': 'How to take care of the plantation?',
        'Quando colher?': 'When to harvest?'
      }
    };

    const languageTranslations = translations[fromLanguage] || {};
    const translatedText = languageTranslations[text] || `Translated: ${text}`;

    // Generate farming advice based on the question
    let response = '';
    if (text.toLowerCase().includes('plant') || text.toLowerCase().includes('plantar') || text.toLowerCase().includes('बुआई')) {
      response = 'Based on current soil and weather conditions, the optimal planting time is in the next 2-3 weeks. Ensure soil temperature is above 15°C and moisture is at 60-70%. Use recommended fertilizer for best results.';
    } else if (text.toLowerCase().includes('fertilizer') || text.toLowerCase().includes('fertilizante')) {
      response = 'For your soil type and crop, I recommend NPK 20-10-10 fertilizer. Apply 150kg per hectare at planting, then 75kg per hectare at 4 weeks and 8 weeks after planting.';
    } else if (text.toLowerCase().includes('harvest') || text.toLowerCase().includes('colher')) {
      response = 'Harvest when crops reach full maturity. Look for golden color in grains and 18-20% moisture content. Early morning harvest provides best quality.';
    } else {
      response = 'Thank you for your question. Based on current conditions and best practices, I recommend monitoring your crops daily and following the suggested fertilizer schedule. Contact an agronomist for specific concerns.';
    }

    // Translate response back to original language
    const responseTranslations: Record<string, string> = {
      spanish: 'Basado en las condiciones actuales del suelo y el clima, el momento óptimo de siembra es en las próximas 2-3 semanas. Asegúrese de que la temperatura del suelo esté por encima de 15°C y la humedad esté al 60-70%. Use el fertilizante recomendado para obtener mejores resultados.',
      hindi: 'वर्तमान मिट्टी और मौसम की स्थिति के आधार पर, अगले 2-3 सप्ताह में रोपण का सबसे अच्छा समय है। सुनिश्चित करें कि मिट्टी का तापमान 15°C से ऊपर है और नमी 60-70% है। सर्वोत्तम परिणामों के लिए अनुशंसित उर्वरक का उपयोग करें।',
      portuguese: 'Com base nas condições atuais do solo e clima, o momento ideal de plantio é nas próximas 2-3 semanas. Certifique-se de que a temperatura do solo esteja acima de 15°C e a umidade esteja em 60-70%. Use fertilizante recomendado para melhores resultados.'
    };

    const finalResponse = fromLanguage !== 'en' ? (responseTranslations[fromLanguage] || response) : response;

    return {
      translatedText: finalResponse,
      confidence: Math.floor(Math.random() * 10 + 90),
      detectedLanguage: fromLanguage
    };
  }

  static async generatePestAnalysis(symptoms: string[], cropType: string): Promise<any> {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const pestDatabase = {
      wheat: ['Aphids', 'Rust', 'Armyworm'],
      rice: ['Brown planthopper', 'Blast', 'Stem borer'],
      maize: ['Corn borer', 'Fall armyworm', 'Leaf blight'],
      soybean: ['Soybean aphid', 'White mold', 'Bean leaf beetle'],
      potato: ['Colorado potato beetle', 'Late blight', 'Wireworm']
    };

    const pests = pestDatabase[cropType as keyof typeof pestDatabase] || ['General pest'];
    const selectedPest = pests[Math.floor(Math.random() * pests.length)];

    return {
      likelyPest: selectedPest,
      confidence: Math.floor(Math.random() * 20 + 75),
      treatment: `Apply organic pesticide treatment. Monitor closely for 7 days. Consider beneficial insects for natural control.`,
      severity: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low'
    };
  }
}