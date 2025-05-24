import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Float } from '@react-three/drei';
import * as THREE from 'three';

// Fallback component to show when Three.js fails to initialize
const FallbackHeroAnimation = () => {
  return (
    <div className="fallback-hero-animation">
      <div className="wp-hero-element"></div>
    </div>
  );
};

// Futuristic floating element
const FuturisticTorus = () => {
  const torusRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (torusRef.current) {
      // Dynamic rotation
      torusRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2;
      torusRef.current.rotation.y += 0.003;
      
      // Pulse effect
      const pulseScale = 1 + Math.sin(state.clock.getElapsedTime() * 2) * 0.03;
      torusRef.current.scale.set(pulseScale, pulseScale, pulseScale);
    }
  });

  // Create a gradient material
  const torusMaterial = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      color1: { value: new THREE.Color('#00c6ff') },
      color2: { value: new THREE.Color('#0072ff') }
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec3 color1;
      uniform vec3 color2;
      varying vec2 vUv;
      
      void main() {
        vec3 color = mix(color1, color2, vUv.x + sin(time * 0.5) * 0.2);
        gl_FragColor = vec4(color, 1.0);
      }
    `,
    transparent: true
  });
  
  // Update shader time
  useFrame(({ clock }) => {
    torusMaterial.uniforms.time.value = clock.getElapsedTime();
  });
  
  return (
    <Float 
      speed={1.5} 
      rotationIntensity={0.3} 
      floatIntensity={1}
      position={[0, 0, 0]}
    >
      <mesh
        ref={torusRef}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        scale={hovered ? 1.1 : 1}
      >
        <torusGeometry args={[1.2, 0.4, 32, 100]} />
        <primitive object={torusMaterial} attach="material" />
      </mesh>
    </Float>
  );
};

// Futuristic particles with connecting lines
const FuturisticParticles = () => {
  const groupRef = useRef<THREE.Group>(null);
  const particlesCount = 30;
  
  // Create particle positions
  const particlePositions = useMemo(() => {
    return Array.from({ length: particlesCount }, () => ({
      position: [
        (Math.random() - 0.5) * 8, 
        (Math.random() - 0.5) * 8, 
        (Math.random() - 0.5) * 8
      ] as [number, number, number],
      size: Math.random() * 0.08 + 0.02,
      speed: Math.random() * 0.01 + 0.002,
      offset: Math.random() * Math.PI * 2
    }));
  }, [particlesCount]);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
      
      // Animate particles
      groupRef.current.children.forEach((child, i) => {
        if (i < particlesCount) {
          const particle = particlePositions[i];
          const mesh = child as THREE.Mesh;
          
          // Oscillate position slightly
          const time = state.clock.getElapsedTime();
          mesh.position.y += Math.sin(time * particle.speed + particle.offset) * 0.01;
          mesh.position.x += Math.cos(time * particle.speed + particle.offset) * 0.01;
        }
      });
    }
  });
  
  // Check if particles are close enough to connect
  const shouldConnectParticles = (p1: [number, number, number], p2: [number, number, number]): boolean => {
    const distance = Math.sqrt(
      Math.pow(p1[0] - p2[0], 2) + 
      Math.pow(p1[1] - p2[1], 2) + 
      Math.pow(p1[2] - p2[2], 2)
    );
    return distance < 3;
  };

  // Generate connecting lines
  const connections = useMemo(() => {
    const lines: { start: THREE.Vector3, end: THREE.Vector3, key: string }[] = [];
    
    particlePositions.forEach((particle, i) => {
      particlePositions.slice(i + 1).forEach((otherParticle, j) => {
        const realIndex = i + j + 1;
        const shouldConnect = shouldConnectParticles(
          particle.position, 
          otherParticle.position
        );
        
        if (shouldConnect) {
          const start = new THREE.Vector3().fromArray(particle.position);
          const end = new THREE.Vector3().fromArray(otherParticle.position);
          lines.push({ start, end, key: `${i}-${realIndex}` });
        }
      });
    });
    
    return lines;
  }, [particlePositions]);

  return (
    <group ref={groupRef}>
      {/* Particles */}
      {particlePositions.map((particle, i) => (
        <mesh key={i} position={particle.position}>
          <sphereGeometry args={[particle.size, 16, 16]} />
          <meshStandardMaterial 
            color="#00c6ff" 
            emissive="#00c6ff"
            emissiveIntensity={0.5}
            transparent 
            opacity={0.8} 
          />
        </mesh>
      ))}
      
      {/* Connecting lines between close particles */}
      {connections.map(({ start, end, key }) => (
        <React.Fragment key={key}>
          <mesh position={[start.x, start.y, start.z]}>
            <meshBasicMaterial visible={false} />
            <cylinderGeometry 
              args={[
                0.01, 0.01, 
                start.distanceTo(end),
                8, 1
              ]} 
            />
          </mesh>
          <line>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                array={new Float32Array([start.x, start.y, start.z, end.x, end.y, end.z])}
                count={2}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#00c6ff" transparent opacity={0.3} />
          </line>
        </React.Fragment>
      ))}
    </group>
  );
};

// Simple error boundary component
interface ErrorBoundaryProps {
  fallback: React.ReactNode;
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class CustomErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error("Three.js error:", error, errorInfo);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

const HeroAnimation = () => {
  const [canRender3D, setCanRender3D] = useState(false);
  const [error, setError] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Check if we can safely render Three.js
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (gl) {
        setCanRender3D(true);
      }
    } catch (e) {
      setError(true);
      console.error("WebGL not supported", e);
    }
  }, []);

  if (error || !canRender3D) {
    return <FallbackHeroAnimation />;
  }

  return (
    <div className="hero-animation">
      <CustomErrorBoundary fallback={<FallbackHeroAnimation />}>
        <Canvas
          ref={canvasRef}
          camera={{ position: [0, 0, 5], fov: 60 }}
          style={{ width: '100%', height: '100%' }}
          gl={{ antialias: true }}
          dpr={[1, 2]}
        >
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 5, 5]} intensity={0.5} />
          <directionalLight position={[-5, -5, -5]} intensity={0.3} color="#00c6ff" />
          <FuturisticTorus />
          <FuturisticParticles />
        </Canvas>
      </CustomErrorBoundary>
    </div>
  );
};

export default HeroAnimation; 