import { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import './CadSpinViewer.css';

// 3D GLB Model Mesh with continuous auto-rotation and auto-centering
function LoadedGlbModel({ url }) {
  const { scene } = useGLTF(url);
  const modelRef = useRef();

  useEffect(() => {
    if (scene) {
      // Center and scale model
      const box = new THREE.Box3().setFromObject(scene);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = maxDim > 0 ? 3.0 / maxDim : 1;

      scene.scale.setScalar(scale);
      scene.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
    }
  }, [scene]);

  useFrame((_, delta) => {
    if (modelRef.current) {
      // Continuous smooth auto-spin (No user interaction allowed)
      modelRef.current.rotation.y += delta * 0.8;
    }
  });

  return <primitive ref={modelRef} object={scene} />;
}

// Procedural 3D TVC Gimbal CAD Model fallback (spinning 3D wireframe + metallic assembly)
function ProceduralTvcGimbal() {
  const groupRef = useRef();

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.85;
      groupRef.current.rotation.x = Math.sin(Date.now() * 0.001) * 0.08; // Subtle pitch rocking
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer Airframe Ring */}
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[1.5, 0.08, 16, 48]} />
        <meshStandardMaterial color="#4da6ff" wireframe />
      </mesh>

      {/* Inner Pitch Gimbal Ring */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
        <torusGeometry args={[1.2, 0.06, 16, 40]} />
        <meshStandardMaterial color="#ff4d4d" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Core Rocket Motor Mount Tube */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.7, 0.7, 1.8, 32]} />
        <meshStandardMaterial color="#ffffff" opacity={0.6} transparent wireframe />
      </mesh>

      {/* Servo Mount Linkage Blocks */}
      <mesh position={[1.35, 0, 0]}>
        <boxGeometry args={[0.2, 0.25, 0.25]} />
        <meshStandardMaterial color="#ff9800" />
      </mesh>
      <mesh position={[-1.35, 0, 0]}>
        <boxGeometry args={[0.2, 0.25, 0.25]} />
        <meshStandardMaterial color="#ff9800" />
      </mesh>
      <mesh position={[0, 1.35, 0]}>
        <boxGeometry args={[0.25, 0.2, 0.25]} />
        <meshStandardMaterial color="#ff9800" />
      </mesh>
      <mesh position={[0, -1.35, 0]}>
        <boxGeometry args={[0.25, 0.2, 0.25]} />
        <meshStandardMaterial color="#ff9800" />
      </mesh>
    </group>
  );
}

function ModelLoader({ url }) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [url]);

  if (hasError || !url) {
    return <ProceduralTvcGimbal />;
  }

  return (
    <Suspense fallback={<ProceduralTvcGimbal />}>
      <LoadedGlbModel url={url} />
    </Suspense>
  );
}

export default function CadSpinViewer({ modelUrl, fileLocationNote }) {
  return (
    <div className="cad-spin-wrapper">
      {/* CAD Canvas Container with pointer-events: none to prevent ANY user interaction */}
      <div className="cad-spin-canvas-container">
        <Canvas
          camera={{ position: [0, 1.5, 4.0], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          style={{ pointerEvents: 'none', background: 'transparent' }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 8, 5]} intensity={1.5} color="#ffffff" />
          <directionalLight position={[-5, -4, -5]} intensity={0.4} color="#4da6ff" />
          <pointLight position={[0, 3, 0]} intensity={0.8} color="#ff9800" />

          <ModelLoader url={modelUrl} />
        </Canvas>
      </div>

      <div className="cad-spin-badge">
        <span className="spin-dot" />
        <span>Auto-Rotating 3D CAD Turntable (Non-Interactive)</span>
      </div>

      {fileLocationNote && (
        <div className="cad-spin-file-info">
          <span>📁 To load your SolidWorks 3D file (.glb / .gltf), place it in: <code>{fileLocationNote}</code></span>
        </div>
      )}
    </div>
  );
}
