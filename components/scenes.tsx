"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  Environment,
  Sparkles
} from "@react-three/drei";
import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";

interface FloatingObjectProps {
  position: [number, number, number];
  scale?: number;
  color: string;
  speed?: number;
  distort?: number;
}

function FloatingObject({
  position,
  scale = 1,
  color,
  speed = 1,
  distort = 0.3
}: FloatingObjectProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * speed * 0.3) * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.2;
    }
    const pulse = 0.55 + Math.sin(state.clock.elapsedTime * speed * 1.5) * 0.35;
    if (materialRef.current) {
      materialRef.current.emissiveIntensity = pulse;
    }
    if (lightRef.current) {
      lightRef.current.intensity = pulse * 1.2;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          ref={materialRef}
          color={color}
          emissive={color}
          emissiveIntensity={0.6}
          distort={distort}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
        {/* soft glow halo bleeding from the object's own color */}
        <pointLight
          ref={lightRef}
          color={color}
          intensity={0.8}
          distance={4}
          decay={2}
        />
      </mesh>
    </Float>
  );
}

function TorusKnot({
  position,
  color,
  scale = 1
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
    if (materialRef.current) {
      materialRef.current.emissiveIntensity =
        0.4 + Math.sin(state.clock.elapsedTime * 1.2) * 0.25;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <torusKnotGeometry args={[1, 0.3, 128, 16]} />
        <meshStandardMaterial
          ref={materialRef}
          color={color}
          emissive={color}
          emissiveIntensity={0.4}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>
    </Float>
  );
}

function Desk() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[1.5, -0.5, 0]}>
      {/* Desk surface */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3, 0.1, 1.5]} />
        <meshStandardMaterial color="#f5f5f0" roughness={0.3} />
      </mesh>
      {/* Desk legs */}
      <mesh position={[-1.3, -0.5, 0.5]}>
        <boxGeometry args={[0.1, 1, 0.1]} />
        <meshStandardMaterial color="#8b7355" roughness={0.5} />
      </mesh>
      <mesh position={[1.3, -0.5, 0.5]}>
        <boxGeometry args={[0.1, 1, 0.1]} />
        <meshStandardMaterial color="#8b7355" roughness={0.5} />
      </mesh>
      <mesh position={[-1.3, -0.5, -0.5]}>
        <boxGeometry args={[0.1, 1, 0.1]} />
        <meshStandardMaterial color="#8b7355" roughness={0.5} />
      </mesh>
      <mesh position={[1.3, -0.5, -0.5]}>
        <boxGeometry args={[0.1, 1, 0.1]} />
        <meshStandardMaterial color="#8b7355" roughness={0.5} />
      </mesh>
      {/* Monitor */}
      <mesh position={[0, 0.7, 0]}>
        <boxGeometry args={[1.4, 0.9, 0.05]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.2} />
      </mesh>
      {/* Monitor screen */}
      <mesh position={[0, 0.7, 0.03]}>
        <boxGeometry args={[1.3, 0.8, 0.01]} />
        <meshStandardMaterial
          color="#2563eb"
          emissive="#2563eb"
          emissiveIntensity={0.3}
          roughness={0.1}
        />
      </mesh>
      {/* Monitor stand */}
      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[0.3, 0.2, 0.1]} />
        <meshStandardMaterial color="#333" roughness={0.3} />
      </mesh>
      {/* Keyboard */}
      <mesh position={[0, 0.08, 0.5]}>
        <boxGeometry args={[0.8, 0.03, 0.25]} />
        <meshStandardMaterial color="#333" roughness={0.4} />
      </mesh>
      {/* Coffee mug */}
      <mesh position={[1, 0.15, 0.3]}>
        <cylinderGeometry args={[0.08, 0.06, 0.15, 16]} />
        <meshStandardMaterial color="#f97316" roughness={0.3} />
      </mesh>
      {/* Plant pot */}
      <mesh position={[-1.2, 0.1, -0.3]}>
        <cylinderGeometry args={[0.12, 0.1, 0.2, 16]} />
        <meshStandardMaterial color="#92400e" roughness={0.6} />
      </mesh>
      {/* Plant */}
      <mesh position={[-1.2, 0.3, -0.3]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#22c55e" roughness={0.8} />
      </mesh>
    </group>
  );
}

function MouseFollower() {
  const { viewport } = useThree();
  const meshRef = useRef<THREE.Mesh>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.x +=
        (mouse.current.x * viewport.width * 0.3 - meshRef.current.position.x) *
        0.05;
      meshRef.current.position.y +=
        (mouse.current.y * viewport.height * 0.3 - meshRef.current.position.y) *
        0.05;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 2]}>
      <sphereGeometry args={[0.15, 32, 32]} />
      <meshStandardMaterial
        color="#f97316"
        emissive="#f97316"
        emissiveIntensity={1.2}
        transparent
        opacity={0.85}
      />
      <pointLight color="#f97316" intensity={1.5} distance={3} decay={2} />
    </mesh>
  );
}

function FloatingParticles({ count = 50 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10 - 3
        ],
        scale: Math.random() * 0.05 + 0.02,
        speed: Math.random() * 0.5 + 0.2
      });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      const tempMatrix = new THREE.Matrix4();
      const tempVector = new THREE.Vector3();

      particles.forEach((particle, i) => {
        tempVector.set(
          particle.position[0] + Math.sin(time * particle.speed) * 0.5,
          particle.position[1] + Math.cos(time * particle.speed * 0.8) * 0.3,
          particle.position[2]
        );
        tempMatrix.makeTranslation(tempVector.x, tempVector.y, tempVector.z);
        tempMatrix.scale(
          new THREE.Vector3(particle.scale, particle.scale, particle.scale)
        );
        meshRef.current!.setMatrixAt(i, tempMatrix);
      });
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial color="#f97316" transparent opacity={0.6} />
    </instancedMesh>
  );
}

export function HomeScene() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
      <Environment preset="sunset" />
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#fff" />
      <pointLight position={[-10, -5, 5]} intensity={0.5} color="#f97316" />

      <Desk />
      <FloatingObject
        position={[-3, 2, -2]}
        scale={0.4}
        color="#f97316"
        speed={1.2}
        distort={0.4}
      />
      <FloatingObject
        position={[4, 1, -3]}
        scale={0.3}
        color="#3b82f6"
        speed={0.8}
        distort={0.3}
      />
      <FloatingObject
        position={[-2, -1.5, -1]}
        scale={0.25}
        color="#22c55e"
        speed={1.5}
        distort={0.5}
      />
      <MouseFollower />
      <Sparkles
        count={60}
        scale={[10, 6, 6]}
        size={2.5}
        speed={0.4}
        color="#f97316"
        opacity={0.7}
      />
    </Canvas>
  );
}

export function AboutScene() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
      <color attach="background" args={["#1e40af"]} />
      <Environment preset="night" />
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 5, 5]} intensity={1} color="#60a5fa" />
      <pointLight position={[0, -3, 0]} intensity={0.8} color="#3b82f6" />

      {/* Holographic platform */}
      <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.5, 2, 64]} />
        <meshStandardMaterial
          color="#60a5fa"
          transparent
          opacity={0.3}
          emissive="#3b82f6"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Grid lines */}
      <gridHelper
        args={[20, 40, "#3b82f6", "#1e3a8a"]}
        position={[0, -2.5, 0]}
      />

      <TorusKnot position={[0, 0, 0]} color="#60a5fa" scale={0.6} />
      <FloatingObject
        position={[-3, 1, -2]}
        scale={0.3}
        color="#f97316"
        speed={1}
        distort={0.4}
      />
      <FloatingObject
        position={[3, -1, -2]}
        scale={0.25}
        color="#22c55e"
        speed={1.3}
        distort={0.3}
      />
      <FloatingParticles count={30} />
      <Sparkles
        count={80}
        scale={[8, 6, 6]}
        size={3}
        speed={0.3}
        color="#60a5fa"
        opacity={0.8}
      />
    </Canvas>
  );
}

export function ProjectsScene() {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
      <Environment preset="warehouse" />
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, -5, 5]} intensity={0.5} color="#f97316" />

      {/* Floating code blocks / cards */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh position={[-2.5, 1, 0]}>
          <boxGeometry args={[1.5, 1, 0.1]} />
          <meshStandardMaterial color="#fff" roughness={0.2} />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
        <mesh position={[0, 0, -1]}>
          <boxGeometry args={[1.5, 1, 0.1]} />
          <meshStandardMaterial color="#fff" roughness={0.2} />
        </mesh>
      </Float>

      <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.4}>
        <mesh position={[2.5, -0.5, 0]}>
          <boxGeometry args={[1.5, 1, 0.1]} />
          <meshStandardMaterial color="#fff" roughness={0.2} />
        </mesh>
      </Float>

      <FloatingObject
        position={[-4, 2, -3]}
        scale={0.3}
        color="#f97316"
        speed={1}
      />
      <FloatingObject
        position={[4, -2, -3]}
        scale={0.25}
        color="#3b82f6"
        speed={1.2}
      />
      <Sparkles
        count={70}
        scale={[10, 6, 6]}
        size={2.5}
        speed={0.35}
        color="#ffffff"
        opacity={0.6}
      />
    </Canvas>
  );
}

export function ContactScene() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
      <Environment preset="sunset" />
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#fff" />
      <pointLight position={[-5, 0, 5]} intensity={0.5} color="#f97316" />

      {/* Envelope / mail representation */}
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
        <group position={[2, 0, 0]} rotation={[0.2, -0.3, 0]}>
          <mesh>
            <boxGeometry args={[2, 1.4, 0.1]} />
            <meshStandardMaterial color="#fff" roughness={0.3} />
          </mesh>
          {/* Envelope flap */}
          <mesh position={[0, 0.7, 0.05]} rotation={[0.5, 0, 0]}>
            <boxGeometry args={[2, 0.8, 0.02]} />
            <meshStandardMaterial color="#f5f5f0" roughness={0.3} />
          </mesh>
        </group>
      </Float>

      <FloatingObject
        position={[-3, 1, -2]}
        scale={0.4}
        color="#f97316"
        speed={1}
        distort={0.3}
      />
      <FloatingObject
        position={[-2, -1.5, -1]}
        scale={0.3}
        color="#3b82f6"
        speed={1.3}
        distort={0.4}
      />
      <FloatingObject
        position={[3, 2, -3]}
        scale={0.25}
        color="#22c55e"
        speed={0.9}
        distort={0.35}
      />
      <Sparkles
        count={60}
        scale={[10, 6, 6]}
        size={2.5}
        speed={0.4}
        color="#f97316"
        opacity={0.7}
      />
    </Canvas>
  );
}
