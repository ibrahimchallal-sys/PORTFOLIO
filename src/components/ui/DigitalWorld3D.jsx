import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

// Floating geometric shapes
function FloatingShape({ position, color, shape }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      {shape === 'box' && <boxGeometry args={[0.5, 0.5, 0.5]} />}
      {shape === 'tetra' && <tetrahedronGeometry args={[0.4]} />}
      {shape === 'octa' && <octahedronGeometry args={[0.4]} />}
      {shape === 'icosa' && <icosahedronGeometry args={[0.4]} />}
      <meshStandardMaterial 
        color={color} 
        emissive={color}
        emissiveIntensity={0.3}
        wireframe={false}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}

// Digital grid
function DigitalGrid() {
  const gridRef = useRef();
  
  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <gridHelper 
      ref={gridRef}
      args={[10, 20, '#9929fb', '#650fa0']} 
      position={[0, 0, -2]}
    />
  );
}

// Particle system
function Particles() {
  const particlesRef = useRef();
  const count = 200;
  
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array;
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        positions[i3 + 1] += Math.sin(state.clock.elapsedTime + i) * 0.01;
        if (positions[i3 + 1] > 5) positions[i3 + 1] = -5;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#9929fb" transparent opacity={0.6} sizeAttenuation={false} />
    </points>
  );
}

// Central rotating shape
function CentralShape() {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[0.6, 0.2, 100, 16]} />
      <meshStandardMaterial 
        color="#9929fb" 
        emissive="#9929fb"
        emissiveIntensity={0.5}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
}

// Main scene
function Scene() {
  const shapes = useMemo(() => {
    const shapes = [];
    const colors = ['#9929fb', '#650fa0', '#b366ff', '#d4a5ff'];
    const shapeTypes = ['box', 'tetra', 'octa', 'icosa'];
    
    for (let i = 0; i < 8; i++) {
      shapes.push({
        position: [
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 4
        ],
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: shapeTypes[Math.floor(Math.random() * shapeTypes.length)]
      });
    }
    return shapes;
  }, []);

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#9929fb" />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#650fa0" />
      <spotLight position={[0, 5, 0]} angle={0.3} penumbra={1} intensity={0.5} />
      
      <DigitalGrid />
      <Particles />
      <CentralShape />
      
      {shapes.map((shape, index) => (
        <FloatingShape
          key={index}
          position={shape.position}
          color={shape.color}
          shape={shape.shape}
        />
      ))}
    </>
  );
}

const DigitalWorld3D = () => {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
};

export default DigitalWorld3D;
