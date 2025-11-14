import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Box } from '@react-three/drei';
import * as THREE from 'three';

const RotatingCrop: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <cylinderGeometry args={[0.1, 0.3, 1.5, 8]} />
      <meshStandardMaterial color="#4CAF50" />
      {/* Leaves */}
      <mesh position={[0, 0.8, 0]}>
        <sphereGeometry args={[0.4, 8, 6]} />
        <meshStandardMaterial color="#66BB6A" />
      </mesh>
    </mesh>
  );
};

const Ground: React.FC = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color="#8D6E63" />
    </mesh>
  );
};

const Hero3DScene: React.FC = () => {
  return (
    <div className="w-full h-full rounded-2xl overflow-hidden bg-gradient-to-b from-blue-200 to-green-200">
      <Canvas camera={{ position: [5, 5, 5], fov: 60 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.3} />
        
        <Ground />
        
        {/* Multiple crops in a grid */}
        {Array.from({ length: 9 }, (_, i) => {
          const x = (i % 3 - 1) * 2;
          const z = (Math.floor(i / 3) - 1) * 2;
          return <RotatingCrop key={i} position={[x, 0, z]} />;
        })}
        
        <Text
          position={[0, 3, 0]}
          fontSize={0.5}
          color="#4CAF50"
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
        >
          Smart Farming
        </Text>
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate
          autoRotateSpeed={1}
        />
      </Canvas>
    </div>
  );
};

export default Hero3DScene;