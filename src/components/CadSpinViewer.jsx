import { useRef, useMemo, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import './CadSpinViewer.css';

// 3D GLB Model Mesh with continuous auto-rotation around its true geometric center
function LoadedGlbModel({ url }) {
  const { scene } = useGLTF(url);
  const pivotRef = useRef();

  // Clone scene to isolate modifications
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  // Compute exact bounding box, center offset, and scaling factor
  const { scale, offset } = useMemo(() => {
    clonedScene.position.set(0, 0, 0);
    clonedScene.rotation.set(0, 0, 0);
    clonedScene.scale.set(1, 1, 1);
    clonedScene.updateMatrixWorld(true);

    const box = new THREE.Box3().setFromObject(clonedScene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    const maxDim = Math.max(size.x, size.y, size.z);
    const targetScale = maxDim > 0 ? 3.0 / maxDim : 1;

    return {
      scale: targetScale,
      offset: [-center.x, -center.y, -center.z],
    };
  }, [clonedScene]);

  // Position inner cloned scene so its bounding center aligns with parent pivot (0,0,0)
  useEffect(() => {
    if (clonedScene) {
      clonedScene.position.set(offset[0], offset[1], offset[2]);
    }
  }, [clonedScene, offset]);

  // Smooth continuous auto-rotation around true center axis
  useFrame((_, delta) => {
    if (pivotRef.current) {
      pivotRef.current.rotation.y += delta * 0.7;
    }
  });

  return (
    <group ref={pivotRef} scale={scale}>
      <primitive object={clonedScene} />
    </group>
  );
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
      {/* CAD Canvas Container */}
      <div className="cad-spin-canvas-container">
        <Canvas
          camera={{ position: [0, 1.5, 4.0], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          style={{ pointerEvents: 'none', background: 'transparent' }}
        >
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 8, 5]} intensity={1.5} color="#ffffff" />
          <directionalLight position={[-5, -4, -5]} intensity={0.5} color="#4da6ff" />
          <pointLight position={[0, 4, 0]} intensity={1.0} color="#ff9800" />

          <ModelLoader url={modelUrl} />
        </Canvas>
      </div>

      <div className="cad-spin-badge">
        <span className="spin-dot" />
        <span>Auto-Rotating 3D CAD Model</span>
      </div>

      {fileLocationNote && (
        <div className="cad-spin-file-info">
          <span>📁 SolidWorks CAD file: <code>{fileLocationNote}</code></span>
        </div>
      )}
    </div>
  );
}
