import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Sky } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface CropProps {
  position: [number, number, number];
  stage: number;
  type: string;
}

const Crop: React.FC<CropProps> = ({ position, stage, type }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  const getStageSize = () => {
    switch (stage) {
      case 0: return 0.1; // Seed
      case 1: return 0.3; // Sprout
      case 2: return 0.6; // Growing
      case 3: return 1.0; // Mature
      default: return 0.1;
    }
  };

  const getColor = () => {
    switch (type) {
      case 'wheat': return '#FBC02D';
      case 'rice': return '#4CAF50';
      case 'maize': return '#FF9800';
      default: return '#4CAF50';
    }
  };

  const size = getStageSize();

  if (stage === 0) {
    return (
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.05, 8, 6]} />
        <meshStandardMaterial color="#8D6E63" />
      </mesh>
    );
  }

  return (
    <group ref={meshRef} position={position}>
      {/* Stem */}
      <mesh position={[0, size / 2, 0]}>
        <cylinderGeometry args={[0.02, 0.05, size * 1.5, 8]} />
        <meshStandardMaterial color="#4CAF50" />
      </mesh>
      
      {/* Top part */}
      <mesh position={[0, size * 1.2, 0]}>
        <sphereGeometry args={[size * 0.3, 8, 6]} />
        <meshStandardMaterial color={getColor()} />
      </mesh>

      {/* Leaves */}
      {stage >= 2 && (
        <>
          <mesh position={[size * 0.3, size * 0.8, 0]} rotation={[0, 0, Math.PI / 6]}>
            <planeGeometry args={[size * 0.4, size * 0.8]} />
            <meshStandardMaterial color="#66BB6A" side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[-size * 0.3, size * 0.8, 0]} rotation={[0, 0, -Math.PI / 6]}>
            <planeGeometry args={[size * 0.4, size * 0.8]} />
            <meshStandardMaterial color="#66BB6A" side={THREE.DoubleSide} />
          </mesh>
        </>
      )}
    </group>
  );
};

const WeatherEffect: React.FC<{ type: string }> = ({ type }) => {
  const particlesRef = useRef<THREE.Points>(null);
  
  useFrame((state) => {
    if (particlesRef.current && type === 'rain') {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  if (type === 'rain') {
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(1000 * 3);
    
    for (let i = 0; i < 1000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = Math.random() * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    
    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    return (
      <points ref={particlesRef}>
        <bufferGeometry attach="geometry" {...particles} />
        <pointsMaterial attach="material" color="#29B6F6" size={0.05} />
      </points>
    );
  }

  return null;
};

const Farm3DView: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [growthStage, setGrowthStage] = useState(0);
  const [weather, setWeather] = useState('sunny');

  const startGrowthAnimation = () => {
    setIsPlaying(true);
    const interval = setInterval(() => {
      setGrowthStage(prev => {
        if (prev >= 3) {
          setIsPlaying(false);
          clearInterval(interval);
          return 3;
        }
        return prev + 1;
      });
    }, 2000);
  };

  const resetAnimation = () => {
    setGrowthStage(0);
    setIsPlaying(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-yellow-500 rounded-lg flex items-center justify-center">
          <span className="text-white text-lg">🌱</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-800">3D Farm Simulation</h2>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={isPlaying ? () => setIsPlaying(false) : startGrowthAnimation}
          className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-yellow-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-yellow-600 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          <span>{isPlaying ? 'Pause Growth' : 'Start Growth'}</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={resetAnimation}
          className="flex items-center space-x-2 bg-white text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl border border-gray-200"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Reset</span>
        </motion.button>

        <select
          value={weather}
          onChange={(e) => setWeather(e.target.value)}
          className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="sunny">☀️ Sunny</option>
          <option value="rain">🌧️ Rainy</option>
          <option value="cloudy">☁️ Cloudy</option>
        </select>
      </div>

      {/* Growth Stage Indicator */}
      <div className="bg-white rounded-xl p-4 shadow-lg border border-green-100">
        <div className="flex items-center justify-between mb-3">
          <span className="font-semibold text-gray-800">Growth Stage</span>
          <span className="text-sm text-gray-600">
            Stage {growthStage + 1} of 4
          </span>
        </div>
        <div className="flex space-x-2">
          {[0, 1, 2, 3].map((stage) => (
            <div
              key={stage}
              className={`flex-1 h-2 rounded-full transition-all duration-500 ${
                stage <= growthStage 
                  ? 'bg-gradient-to-r from-green-500 to-yellow-500' 
                  : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-600 mt-2">
          <span>Seed</span>
          <span>Sprout</span>
          <span>Growing</span>
          <span>Mature</span>
        </div>
      </div>

      {/* 3D Canvas */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="h-96 lg:h-[500px] bg-gradient-to-b from-blue-200 to-green-200 rounded-2xl overflow-hidden shadow-lg"
      >
        <Canvas camera={{ position: [8, 6, 8], fov: 60 }}>
          <Sky sunPosition={[100, 20, 100]} />
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          
          {/* Ground */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
            <planeGeometry args={[20, 20]} />
            <meshStandardMaterial color="#8D6E63" />
          </mesh>
          
          {/* Crops Grid */}
          {Array.from({ length: 16 }, (_, i) => {
            const x = (i % 4 - 1.5) * 2;
            const z = (Math.floor(i / 4) - 1.5) * 2;
            const cropType = ['wheat', 'rice', 'maize'][i % 3];
            return (
              <Crop 
                key={i} 
                position={[x, 0, z]} 
                stage={growthStage} 
                type={cropType}
              />
            );
          })}
          
          {/* Weather Effects */}
          <WeatherEffect type={weather} />
          
          <OrbitControls 
            enableZoom={true} 
            enablePan={true}
            maxDistance={15}
            minDistance={5}
          />
        </Canvas>
      </motion.div>
    </div>
  );
};

export default Farm3DView;