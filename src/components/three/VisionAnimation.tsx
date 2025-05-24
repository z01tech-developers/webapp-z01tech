import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// Futuristic hologram icon
const HologramIcon = () => {
  const iconRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (iconRef.current) {
      // Gentle rotation
      iconRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
      
      // Pulse effect
      const time = state.clock.getElapsedTime();
      const pulseScale = 1 + Math.sin(time * 1.5) * 0.05;
      iconRef.current.scale.set(pulseScale, pulseScale, pulseScale);
    }
  });
  
  // Create holographic material
  const hologramMaterial = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      baseColor: { value: new THREE.Color(hovered ? '#00c6ff' : '#3498db') }
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vPosition;
      varying vec3 vNormal;
      
      void main() {
        vUv = uv;
        vPosition = position;
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec3 baseColor;
      varying vec2 vUv;
      varying vec3 vPosition;
      varying vec3 vNormal;
      
      void main() {
        // Holographic scanlines
        float scanLine = sin(vUv.y * 30.0 + time * 2.0) * 0.05 + 0.95;
        
        // Edge glow
        float edgeGlow = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.0);
        
        // Combine effects
        vec3 color = baseColor * scanLine + edgeGlow * 0.5;
        
        // Transparency based on scanlines
        float alpha = 0.7 + sin(vUv.y * 50.0 + time * 3.0) * 0.1;
        
        gl_FragColor = vec4(color, alpha);
      }
    `,
    transparent: true,
    side: THREE.DoubleSide
  });
  
  // Update shader time
  useFrame(({ clock }) => {
    hologramMaterial.uniforms.time.value = clock.getElapsedTime();
  });
  
  return (
    <group 
      ref={iconRef}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* Main icon body */}
      <mesh>
        <octahedronGeometry args={[1, 1]} />
        <primitive object={hologramMaterial} attach="material" />
      </mesh>
      
      {/* Inner core */}
      <mesh scale={0.6}>
        <icosahedronGeometry args={[0.6, 0]} />
        <meshStandardMaterial 
          color="#ffffff" 
          emissive="#00c6ff"
          emissiveIntensity={0.8}
          transparent
          opacity={0.9}
        />
      </mesh>
    </group>
  );
};

// Data energy streams
const DataStreams = () => {
  const streamsRef = useRef<THREE.Group>(null);
  const streamCount = 12;
  
  // Generate stream paths
  const streamPaths = Array.from({ length: streamCount }, (_, i) => {
    const angle = (i / streamCount) * Math.PI * 2;
    const radius = 3;
    const startX = Math.cos(angle) * radius;
    const startY = Math.sin(angle) * radius;
    
    return {
      start: new THREE.Vector3(startX, startY, -5),
      end: new THREE.Vector3(0, 0, 0),
      speed: 0.2 + Math.random() * 0.3,
      offset: Math.random() * Math.PI * 2,
      color: i % 3 === 0 ? '#3498db' : i % 3 === 1 ? '#9b59b6' : '#00c6ff'
    };
  });
  
  useFrame((state) => {
    if (streamsRef.current) {
      const time = state.clock.getElapsedTime();
      
      // Animate each particle stream
      streamsRef.current.children.forEach((child, i) => {
        if (i < streamCount) {
          const stream = streamPaths[i];
          const t = (Math.sin(time * stream.speed + stream.offset) + 1) / 2; // 0 to 1 value
          
          // Move particles along path
          const position = new THREE.Vector3().lerpVectors(stream.start, stream.end, t);
          const mesh = child as THREE.Mesh;
          mesh.position.copy(position);
          
          // Scale based on position (smaller as they approach center)
          const scale = 0.1 + (1 - t) * 0.2;
          mesh.scale.set(scale, scale, scale);
        }
      });
    }
  });
  
  return (
    <group ref={streamsRef}>
      {streamPaths.map((stream, i) => (
        <mesh key={i} position={stream.start}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial 
            color={stream.color} 
            emissive={stream.color}
            emissiveIntensity={0.8}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
};

// Rotating grid background
const GridBackground = () => {
  const gridRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (gridRef.current) {
      // Slow rotation
      gridRef.current.rotation.z = state.clock.getElapsedTime() * 0.05;
    }
  });
  
  // Create a grid material
  const gridMaterial = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      color: { value: new THREE.Color('#3498db') }
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
      uniform vec3 color;
      varying vec2 vUv;
      
      float grid(vec2 uv, float size) {
        vec2 g = abs(fract(uv * size - 0.5) - 0.5) / fwidth(uv * size);
        return min(g.x, g.y);
      }
      
      void main() {
        float g = min(grid(vUv, 10.0), grid(vUv, 50.0));
        float mask = 1.0 - min(g, 1.0);
        
        // Pulse effect
        float pulse = sin(time * 0.5) * 0.5 + 0.5;
        vec3 finalColor = color * (mask * 0.8 + 0.2) * (pulse * 0.3 + 0.7);
        
        gl_FragColor = vec4(finalColor, mask * 0.3);
      }
    `,
    transparent: true,
    side: THREE.DoubleSide
  });
  
  // Update shader time
  useFrame(({ clock }) => {
    gridMaterial.uniforms.time.value = clock.getElapsedTime();
  });
  
  return (
    <mesh ref={gridRef} position={[0, 0, -3]} rotation={[Math.PI / 2, 0, 0]}>
      <planeGeometry args={[20, 20]} />
      <primitive object={gridMaterial} attach="material" />
    </mesh>
  );
};

// Fallback component to show when Three.js fails to initialize
const FallbackVisionAnimation = () => {
  return (
    <div className="fallback-vision-animation">
      <div className="wp-vision-element"></div>
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

const VisionAnimation = () => {
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
    return <FallbackVisionAnimation />;
  }

  return (
    <div className="vision-animation">
      <CustomErrorBoundary fallback={<FallbackVisionAnimation />}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 60 }}
          style={{ width: '100%', height: '100%' }}
          gl={{ antialias: true }}
          dpr={[1, 2]}
        >
          <ambientLight intensity={0.4} />
          <pointLight position={[0, 0, 3]} intensity={0.5} color="#ffffff" />
          <pointLight position={[5, 5, 5]} intensity={0.3} color="#3498db" />
          <pointLight position={[-5, -5, 5]} intensity={0.3} color="#9b59b6" />
          
          <GridBackground />
          <DataStreams />
          <Float 
            speed={1.5} 
            rotationIntensity={0.2} 
            floatIntensity={0.5}
          >
            <HologramIcon />
          </Float>
        </Canvas>
      </CustomErrorBoundary>
    </div>
  );
};

export default VisionAnimation; 