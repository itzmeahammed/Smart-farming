# 🌱 AgriSmart - AI Farming Dashboard

A comprehensive, production-ready web application for smart farming with AI-powered predictions, 3D farm simulation, weather monitoring, and marketplace integration. **Now works completely offline with static data - no external APIs required!**

## 🚀 Features

### Core Functionality
- **AI Crop & Fertilizer Predictions** - Get intelligent yield forecasts and fertilizer recommendations (static AI models)
- **3D Farm Simulation** - Interactive farm visualization with crop growth stages and weather effects
- **Weather & Soil Monitoring** - Simulated weather data and soil condition tracking
- **Multi-language AI Translator** - Communicate in your local language (offline translation)
- **Role-Based Dashboards** - Different interfaces for farmers, buyers, agronomists, and admins
- **Task Management** - Schedule and track farming activities
- **Marketplace** - Buy and sell agricultural produce
- **Alert System** - Real-time notifications for pest, weather, and irrigation alerts

### User Roles & Dashboards

#### 🌾 **Farmer Dashboard**
- AI crop predictions and fertilizer recommendations
- 3D farm visualization with interactive plots
- Weather and soil monitoring
- Task scheduling and management
- Marketplace for selling produce
- Multi-language translator for farming advice

#### 🛒 **Buyer Dashboard**
- Browse and purchase agricultural products
- Advanced search and filtering
- Order tracking and management
- Purchase analytics and history

#### 🔬 **Agronomist Dashboard**
- Client consultation management
- Video call scheduling
- Farmer message responses
- Expert advice and reports

#### 👑 **Admin Dashboard**
- User management and analytics
- Platform statistics and revenue tracking
- Inventory management (seeds, fertilizers)
- System settings and configuration

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for development and building
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Three.js** with React Three Fiber for 3D visualization
- **Recharts** for analytics charts
- **Zustand** for state management
- **React Hook Form** with Zod validation
- **i18next** for internationalization

### Static Services
- **Mock AI Service** - Simulates OpenAI predictions locally
- **Weather Service** - Provides realistic weather simulation
- **Role-Based Authentication** - Complete auth system with demo accounts

## 🎨 Design System

### Color Palette
- **Primary Green**: `#4CAF50` (Healthy Crops)
- **Golden Yellow**: `#FBC02D` (Harvest/Energy)
- **Sky Blue**: `#29B6F6` (Weather/Water)
- **Earth Brown**: `#8D6E63` (Soil/Farm Base)
- **Neutral White**: `#FAFAFA` (Clean Dashboard UI)

### Role-Specific Colors
- **Farmer**: Green to Yellow gradient
- **Buyer**: Blue to Cyan gradient
- **Agronomist**: Green to Teal gradient
- **Admin**: Purple to Pink gradient

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone and install dependencies:**
```bash
git clone <repository-url>
cd agrismart
npm install
```

2. **Start Development Server:**
```bash
npm run dev
```

3. **Access the Application:**
- Frontend: http://localhost:5173

## 🔐 Demo Credentials

**Farmer Account:**
- Email: `farmer@demo.com`
- Password: `demo123`
- Features: Full farming dashboard with AI predictions, 3D simulation, tasks, marketplace

**Buyer Account:**
- Email: `buyer@demo.com`
- Password: `demo123`
- Features: Product browsing, purchasing, order management

**Agronomist Account:**
- Email: `agronomist@demo.com`
- Password: `demo123`
- Features: Client consultations, expert advice, scheduling

**Admin Account:**
- Email: `admin@demo.com`
- Password: `demo123`
- Features: User management, analytics, inventory, system settings

## 📱 User Flow by Role

### 🌾 Farmer Flow
1. **Login** → Farmer Dashboard
2. **Farm Management** → Create and manage farm plots
3. **AI Predictions** → Get crop yield and fertilizer recommendations
4. **3D Simulation** → Interactive farm visualization with growth stages
5. **Task Management** → Schedule and track farming activities
6. **Marketplace** → List produce for sale
7. **Analytics** → View comprehensive farming insights

### 🛒 Buyer Flow
1. **Login** → Buyer Marketplace
2. **Browse Products** → Search and filter available produce
3. **Purchase** → Buy products from farmers
4. **Order Tracking** → Monitor delivery status
5. **Analytics** → View purchase history and trends

### 🔬 Agronomist Flow
1. **Login** → Consultation Hub
2. **Client Management** → View assigned farmers
3. **Consultations** → Schedule and conduct video calls
4. **Messages** → Respond to farmer queries
5. **Reports** → Generate expert recommendations

### 👑 Admin Flow
1. **Login** → Admin Dashboard
2. **User Management** → Manage all platform users
3. **Analytics** → View platform statistics and revenue
4. **Inventory** → Manage seeds and fertilizer stock
5. **Settings** → Configure platform settings

## 🎮 3D Farm Simulation

### Features
- **Interactive 3D Environment** - Navigate and explore your farm
- **Crop Growth Stages** - Watch crops grow from seed to harvest
- **Weather Effects** - Visual weather conditions (rain, sun, clouds)
- **Clickable Objects** - Interact with farm equipment and infrastructure
- **Performance Optimized** - LOD system and quality settings for all devices

### Controls
- **Mouse/Touch** - Rotate and zoom camera
- **Click Objects** - Interact with plots, equipment, and crops
- **Growth Controls** - Play/pause/reset crop growth simulation
- **Weather Toggle** - Change weather conditions

## 📊 Analytics & Insights

- **Yield Performance** - Track actual vs predicted yields
- **Crop Distribution** - Visualize crop allocation across plots
- **Soil Health Trends** - Monitor pH, moisture, and nutrient levels
- **Financial Analytics** - Revenue, costs, and profitability tracking
- **Role-Specific Metrics** - Customized analytics for each user type

## 🌐 Internationalization

Supported languages:
- English (default)
- Spanish
- Hindi
- Portuguese
- Chinese
- Arabic

The AI translator allows farmers to communicate in their native language while receiving intelligent farming advice.

## 🔧 Development

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication components
│   ├── dashboard/      # Role-specific dashboard panels
│   └── 3d/            # Three.js 3D components
├── pages/              # Main application pages
├── store/              # Zustand state management
├── contexts/           # React contexts
├── utils/              # Utility functions and services
└── types/              # TypeScript type definitions
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Static Services
- **AIService** - Provides crop predictions and translations without external APIs
- **WeatherService** - Simulates realistic weather data
- **Authentication** - Complete role-based auth system with demo accounts

## 🎯 Key Differences from Original

### ✅ What's Working Statically
- **AI Predictions** - Smart algorithms using crop databases and soil multipliers
- **Weather Data** - Realistic weather simulation with dynamic updates
- **Translation** - Pre-built translation database for common farming questions
- **All User Roles** - Complete dashboards for farmer, buyer, agronomist, admin
- **3D Simulation** - Full Three.js farm visualization
- **Marketplace** - Complete buying/selling system with mock data

### 🚫 Removed Dependencies
- **OpenAI API** - Replaced with intelligent static prediction algorithms
- **MongoDB** - All data stored in Zustand with localStorage persistence
- **External Weather API** - Realistic weather simulation built-in
- **Backend Server** - Everything runs client-side

## 🚀 Deployment

The application is optimized for deployment on:
- **Vercel** (recommended)
- **Netlify** 
- **GitHub Pages**
- **Any static hosting service**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Email: support@agrismart.com

---

**AgriSmart** - Transforming agriculture through AI and technology 🌾✨

*Now completely self-contained and ready to run anywhere!*