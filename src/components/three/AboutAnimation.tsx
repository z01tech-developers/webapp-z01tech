import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';

interface PointData {
  position: THREE.Vector3;
  color: string;
}

// Futuristic flowing grid
const FlowingGrid = () => {
  const gridRef = useRef<THREE.Group>(null);
  
  // Create grid points
  const gridSize = 10;
  const gridGap = 0.8;
  
  // Generate grid points
  const gridPoints = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i = -gridSize / 2; i <= gridSize / 2; i += gridGap) {
      for (let j = -gridSize / 2; j <= gridSize / 2; j += gridGap) {
        points.push(new THREE.Vector3(i, j, 0));
      }
    }
    return points;
  }, []);
  
  useFrame((state) => {
    if (gridRef.current) {
      const time = state.clock.getElapsedTime();
      
      // Animate grid points with wave effect
      gridRef.current.children.forEach((child, index) => {
        const mesh = child as THREE.Mesh;
        
        // Calculate wave pattern
        const x = mesh.position.x;
        const y = mesh.position.y;
        const distance = Math.sqrt(x * x + y * y);
        
        // Z position is based on a wave function
        mesh.position.z = Math.sin(distance * 0.5 + time * 0.5) * 0.2;
        
        // Scale based on wave height
        const scale = 0.04 + Math.abs(mesh.position.z) * 0.1;
        mesh.scale.set(scale, scale, scale);
      });
    }
  });
  
  return (
    <group ref={gridRef} position={[0, 0, -2]} rotation={[Math.PI / 6, 0, 0]}>
      {gridPoints.map((point, i) => (
        <mesh key={i} position={point}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial
            color="#3498db"
            emissive="#3498db"
            emissiveIntensity={0.5}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
};

// Floating Z01 Logo
const FloatingLogo = () => {
  // Create a shiny material using ShaderMaterial
  const logoMaterial = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      color1: { value: new THREE.Color('#3498db') },
      color2: { value: new THREE.Color('#9b59b6') }
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vPosition;
      
      void main() {
        vUv = uv;
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec3 color1;
      uniform vec3 color2;
      varying vec2 vUv;
      varying vec3 vPosition;
      
      void main() {
        vec3 color = mix(color1, color2, vUv.x + sin(vUv.y * 10.0 + time) * 0.1);
        
        // Add shimmer effect
        float shimmer = pow(sin(vUv.x * 20.0 + time * 2.0) * sin(vUv.y * 20.0 + time * 2.0), 2.0) * 0.5;
        color += shimmer;
        
        gl_FragColor = vec4(color, 1.0);
      }
    `,
    transparent: true
  });
  
  // Update shader time
  useFrame(({ clock }) => {
    logoMaterial.uniforms.time.value = clock.getElapsedTime();
  });
  
  return (
    <Float
      speed={1.5}
      rotationIntensity={0.2}
      floatIntensity={0.5}
      position={[0, 0, 0]}
    >
      <group>
        <mesh>
          <circleGeometry args={[1.2, 32]} />
          <primitive object={logoMaterial} attach="material" />
        </mesh>
        <Text
          position={[0, 0, 0.05]}
          fontSize={0.6}
          color="#ffffff"
          font="/fonts/Poppins-Bold.ttf"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.1}
        >
          Z01
        </Text>
      </group>
    </Float>
  );
};

// Holographic rings
const HolographicRings = () => {
  const ringsRef = useRef<THREE.Group>(null);
  const ringCount = 4;
  
  useFrame((state) => {
    if (ringsRef.current) {
      ringsRef.current.children.forEach((child, i) => {
        // Animate rings
        const mesh = child as THREE.Mesh;
        const time = state.clock.getElapsedTime();
        mesh.rotation.z = time * (0.1 + i * 0.05);
        
        // Pulse scale
        const scale = 1 + Math.sin(time * 0.5 + i * 0.5) * 0.05;
        mesh.scale.set(scale, scale, 1);
      });
    }
  });
  
  return (
    <group ref={ringsRef} position={[0, 0, -1]}>
      {Array.from({ length: ringCount }).map((_, i) => {
        const size = 1.5 + i * 0.5;
        const thickness = 0.03 - i * 0.005;
        const color = i % 2 === 0 ? "#3498db" : "#9b59b6";
        
        return (
          <mesh key={i} rotation={[Math.PI / 2, 0, Math.PI * i / ringCount]}>
            <torusGeometry args={[size, thickness, 16, 64]} />
            <meshStandardMaterial 
              color={color} 
              emissive={color}
              emissiveIntensity={0.8}
              transparent
              opacity={0.7 - i * 0.1}
            />
          </mesh>
        );
      })}
    </group>
  );
};

// Fallback component to show when Three.js fails to initialize
const FallbackAboutAnimation = () => {
  return (
    <div className="fallback-about-animation">
      <div className="wp-about-element"></div>
    </div>
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

const AboutAnimation = () => {
  const [canRender3D, setCanRender3D] = useState(false);
  const [error, setError] = useState(false);

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
    return <FallbackAboutAnimation />;
  }

  return (
    <div className="about-animation">
      <CustomErrorBoundary fallback={<FallbackAboutAnimation />}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 60 }}
          style={{ width: '100%', height: '100%' }}
          gl={{ antialias: true }}
          dpr={[1, 2]}
        >
          <ambientLight intensity={0.8} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <directionalLight position={[-5, -5, -5]} intensity={0.3} color="#3498db" />
          <HolographicRings />
          <FlowingGrid />
          <FloatingLogo />
        </Canvas>
      </CustomErrorBoundary>
    </div>
  );
};

export default AboutAnimation; 