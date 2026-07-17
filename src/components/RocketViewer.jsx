import { useRef, useState, useEffect, Component } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Error boundary to catch WebGL crashes gracefully
class ViewerErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Three.js Viewer Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="rocket-viewer">
          <div className="rocket-viewer__fallback">
            <span className="rocket-viewer__fallback-text">3D Preview Unavailable</span>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function RocketModel({ url, autoPan }) {
  // useGLTF automatically handles DRACO decoding by default!
  const { scene } = useGLTF(url);
  const currentTarget = useRef(new THREE.Vector3(0, 0, 0));
  const ref = useRef();
  const { camera } = useThree();
  const time = useRef(0);

  // Position, auto-orient horizontally, scale and apply transparency to outer components
  useEffect(() => {
    if (scene) {
      // 1. Force horizontal-along-X orientation by detecting long axis
      scene.rotation.set(0, 0, 0);
      scene.updateMatrixWorld(true);
      
      const initialBox = new THREE.Box3().setFromObject(scene);
      const size = initialBox.getSize(new THREE.Vector3());

      if (size.y > size.x && size.y > size.z) {
        // Rocket is vertical along Y. Rotate -90 degrees around Z to lay horizontal along X.
        scene.rotation.z = -Math.PI / 2;
      } else if (size.z > size.x && size.z > size.y) {
        // Rocket is aligned along Z. Rotate -90 degrees around Y to align with X.
        scene.rotation.y = -Math.PI / 2;
      }
      
      scene.updateMatrixWorld(true);

      // 2. Traverse and apply transparency & colors
      scene.traverse((child) => {
        if (child.isMesh) {
          const name = child.name.toLowerCase();
          
          // Identify outer body tube/nose cone/fincan meshes to make them transparent
          if (
            name.includes('tube') || 
            name.includes('nose') || 
            name.includes('cone') || 
            name.includes('body') ||
            name.includes('transition') ||
            name.includes('payload') ||
            name.includes('fincan') ||
            name.includes('fin_can') ||
            name.includes('boattail') ||
            name.includes('shroud') ||
            name.includes('aft')
          ) {
            child.material = child.material.clone();
            child.material.transparent = true;
            child.material.depthWrite = false; // Prevents transparency sorting artifacts
            
            // Distinguish between Fiberglass Nose Cone and Carbon Fiber Body Tubes
            if (name.includes('nose') || name.includes('cone')) {
              child.material.opacity = 0.35; // Fiberglass glass (more visible)
              child.material.color.setHex(0xeaeae3); // Light fiberglass tint
            } else {
              child.material.opacity = 0.28; // Carbon Fiber glass (more visible)
              child.material.color.setHex(0x202020); // Smoked dark carbon tint
            }
          } else {
            // Keep internal components fully solid and make them pop
            child.material = child.material.clone();
            child.material.transparent = false;
            child.material.opacity = 1.0;
            
            // Set default/fallback color to Lime Green so E-Bay / internal masses turn green by default
            child.material.color.setHex(0x39ff14);
            
            // Highlight specific components
            if (name.includes('parachute') || name.includes('chute') || name.includes('drogue') || name.includes('recovery')) {
              child.material.color.setHex(0xff3b30); // Neon Red parachutes
            } else if (name.includes('tether') || name.includes('cord') || name.includes('shock') || name.includes('harness') || name.includes('line')) {
              child.material.color.setHex(0xd300ff); // Neon Violet/Purple tethers (high contrast)
            } else if (name.includes('fin') || name.includes('wing') || name.includes('stabilizer')) {
              child.material.color.setHex(0x00f5ff); // Electric Cyan fins
            } else if (name.includes('ring') || name.includes('centering') || name.includes('bulkhead')) {
              child.material.color.setHex(0x007aff); // Electric Blue bulkheads
            } else if (name.includes('motor') || name.includes('engine') || name.includes('fuel') || name.includes('propulsion')) {
              child.material.color.setHex(0xff9500); // Flame Copper propulsion
            }
          }
        }
      });

      // 3. Center and scale the horizontal model
      const box = new THREE.Box3().setFromObject(scene);
      const scaledSize = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      
      const maxDim = Math.max(scaledSize.x, scaledSize.y, scaledSize.z);
      // Target a fit scale
      const scale = maxDim > 0 ? 4.5 / maxDim : 1;

      scene.scale.setScalar(scale);
      scene.position.set(-center.x * scale, -center.y * scale, -center.z * scale);

      // Initial camera setup
      camera.position.set(0.0, 1.0, 4.5);
      camera.lookAt(0, 0, 0);
    }
  }, [scene, camera]);

  // Dynamic Camera Auto-Panning and Closeups
  useFrame((state, delta) => {
    if (autoPan) {
      time.current += delta * 0.65; // Orbit rotation speed
      
      // Calculate dynamic targets and distances based on time phase (every 4.0 seconds)
      const phase = Math.floor(time.current / 4.0) % 3;
      
      const desiredTarget = new THREE.Vector3(0, 0, 0);
      let desiredRadius = 4.8;
      let desiredYOffset = 0.5;
      
      if (phase === 0) {
        // Phase 0: Full rocket view
        desiredTarget.set(0, 0, 0);
        desiredRadius = 3.5;
        desiredYOffset = 0.5 + Math.sin(time.current * 0.4) * 0.3;
      } else if (phase === 1) {
        // Phase 1: Closeup of nose cone (focus left end at X = -1.5)
        desiredTarget.set(-1.5, 0, 0);
        desiredRadius = 2.0;
        desiredYOffset = 0.3 + Math.sin(time.current * 0.8) * 0.15;
      } else {
        // Phase 2: Closeup of fins/fincan (focus right end at X = 1.5)
        desiredTarget.set(1.5, 0, 0);
        desiredRadius = 2.0;
        desiredYOffset = 0.3 + Math.sin(time.current * 0.8) * 0.15;
      }
      
      // Smoothly LERP camera target along X-axis
      currentTarget.current.lerp(desiredTarget, delta * 3.5);
      
      // Calculate orbit position coordinates
      const angle = time.current * 0.35;
      const targetCamX = currentTarget.current.x + Math.sin(angle) * desiredRadius;
      const targetCamZ = currentTarget.current.z + Math.cos(angle) * desiredRadius;
      const targetCamY = desiredYOffset;
      
      // LERP camera position
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetCamX, delta * 3.5);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetCamY, delta * 3.5);
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetCamZ, delta * 3.5);
      
      camera.lookAt(currentTarget.current);
    } else if (ref.current) {
      // Very slow idle rotation of the model when user is not dragging
      ref.current.rotation.y += delta * 0.05;
    }
  });

  return <primitive ref={ref} object={scene} />;
}

export default function RocketViewer() {
  const modelUrl = `${import.meta.env.BASE_URL}rocket_openrocket.glb`;
  const [autoPan, setAutoPan] = useState(true);

  const stopAutoPan = () => {
    setAutoPan(false);
  };

  return (
    <ViewerErrorBoundary>
      <div className="rocket-viewer" onPointerDown={stopAutoPan}>
        {/* Floating HUD Information Overlay */}
        <div className="rocket-viewer__hud">
          <div className="rocket-viewer__hud-left">
            <h3 className="rocket-viewer__model-title">TRINITY</h3>
            <span className="rocket-viewer__model-subtitle">OpenRocket Layout Specification</span>
          </div>
          
          <div className="rocket-viewer__hud-right">
            <div className="rocket-viewer__legend">
              <span className="rocket-viewer__legend-title">X-RAY SCHEMA</span>
              <div className="rocket-viewer__legend-grid">
                <div className="rocket-viewer__legend-item">
                  <span className="rocket-viewer__dot rocket-viewer__dot--carbon" />
                  <span>Airframe (Carbon Fiber)</span>
                </div>
                <div className="rocket-viewer__legend-item">
                  <span className="rocket-viewer__dot rocket-viewer__dot--fiberglass" />
                  <span>Nose Cone (Fiberglass)</span>
                </div>
                <div className="rocket-viewer__legend-item">
                  <span className="rocket-viewer__dot rocket-viewer__dot--recovery" />
                  <span>Parachutes (Recovery)</span>
                </div>
                <div className="rocket-viewer__legend-item">
                  <span className="rocket-viewer__dot rocket-viewer__dot--tethers" />
                  <span>Tethers (Shock Cords)</span>
                </div>
                <div className="rocket-viewer__legend-item">
                  <span className="rocket-viewer__dot rocket-viewer__dot--electronics" />
                  <span>Electronics (E-Bay)</span>
                </div>
                <div className="rocket-viewer__legend-item">
                  <span className="rocket-viewer__dot rocket-viewer__dot--structure" />
                  <span>Bulkheads</span>
                </div>
                <div className="rocket-viewer__legend-item">
                  <span className="rocket-viewer__dot rocket-viewer__dot--fins" />
                  <span>Fins</span>
                </div>
                <div className="rocket-viewer__legend-item">
                  <span className="rocket-viewer__dot rocket-viewer__dot--propulsion" />
                  <span>Propulsion (Motor)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Canvas
          camera={{ position: [5, 2, 6], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            failIfMajorPerformanceCaveat: false,
          }}
          style={{ background: 'transparent' }}
          onCreated={({ gl }) => {
            gl.toneMapping = THREE.ACESFilmicToneMapping;
            gl.toneMappingExposure = 1.2;
            
            gl.domElement.addEventListener('webglcontextlost', (e) => {
              e.preventDefault();
              console.warn('WebGL context lost - reloading model state...');
            });
          }}
        >
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
          <directionalLight position={[-5, 5, -5]} intensity={0.4} color="#6688cc" />

          <RocketModel url={modelUrl} autoPan={autoPan} />

          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={2}
            maxDistance={12}
            enableDamping={true}
            dampingFactor={0.05}
            onStart={stopAutoPan}
          />
        </Canvas>

        <span className="rocket-viewer__hint">
          {autoPan ? "Drag or click to take control" : "Drag to rotate · Scroll to zoom"}
        </span>
      </div>
    </ViewerErrorBoundary>
  );
}

// Pre-load model to prevent loading lag
useGLTF.preload(`${import.meta.env.BASE_URL}rocket_openrocket.glb`);
