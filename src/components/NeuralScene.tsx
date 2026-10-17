import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const NAVY = "#24395e";
const STEEL = "#4d6385";
const WARM = "#a89c8c";

function Network({ count, still }: { count: number; still: boolean }) {
  const group = useRef<THREE.Group>(null);
  const pulses = useRef<THREE.InstancedMesh>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);

  const { nodes, edges, lineGeo } = useMemo(() => {
    let seed = 7;
    const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    const nodes: THREE.Vector3[] = [];
    for (let i = 0; i < count; i++) {
      const layer = (i % 5) - 2;
      nodes.push(new THREE.Vector3(layer * 2.4 + (rand() - 0.5), (rand() - 0.5) * 6, (rand() - 0.5) * 4));
    }
    const edges: [number, number][] = [];
    nodes.forEach((a, i) =>
      nodes.forEach((b, j) => {
        if (j > i && a.distanceTo(b) < 2.9) edges.push([i, j]);
      }),
    );
    const pos = new Float32Array(edges.length * 6);
    edges.forEach(([i, j], k) => {
      nodes[i]!.toArray(pos, k * 6);
      nodes[j]!.toArray(pos, k * 6 + 3);
    });
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return { nodes, edges, lineGeo };
  }, [count]);

  const nodeRef = useRef<THREE.InstancedMesh>(null);
  useEffect(() => {
    const m = new THREE.Matrix4();
    nodes.forEach((p, i) => {
      const s = 0.06 + ((i * 37) % 10) / 110;
      m.makeScale(s, s, s).setPosition(p);
      nodeRef.current?.setMatrixAt(i, m);
      nodeRef.current?.setColorAt(i, new THREE.Color(i % 3 === 0 ? WARM : i % 2 ? NAVY : STEEL));
    });
    if (nodeRef.current) {
      nodeRef.current.instanceMatrix.needsUpdate = true;
      if (nodeRef.current.instanceColor) nodeRef.current.instanceColor.needsUpdate = true;
    }
    const move = (e: PointerEvent) => {
      pointer.current = { x: e.clientX / window.innerWidth - 0.5, y: e.clientY / window.innerHeight - 0.5 };
    };
    const onScroll = () => (scroll.current = Math.min(window.scrollY / window.innerHeight, 1.5));
    window.addEventListener("pointermove", move);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", onScroll);
    };
  }, [nodes]);

  const PULSES = Math.min(24, edges.length);
  const tmp = useMemo(() => new THREE.Matrix4(), []);
  const v = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, raw) => {
    const dt = Math.min(raw, 0.05);
    const g = group.current;
    if (!g) return;
    if (!still) g.rotation.y += dt * 0.08;
    const k = 1 - Math.exp(-3 * dt);
    g.rotation.x += (pointer.current.y * 0.35 - g.rotation.x) * k;
    g.position.x += (pointer.current.x * 0.8 - g.position.x) * k;
    g.position.z += (-scroll.current * 4 - g.position.z) * k;
    const t = still ? 0 : state.clock.elapsedTime;
    for (let p = 0; p < PULSES; p++) {
      const [i, j] = edges[(p * 7) % edges.length]!;
      const f = (t * 0.45 + p * 0.37) % 1;
      v.lerpVectors(nodes[i]!, nodes[j]!, f);
      tmp.makeScale(0.06, 0.06, 0.06).setPosition(v);
      pulses.current?.setMatrixAt(p, tmp);
    }
    if (pulses.current) pulses.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group ref={group}>
      <instancedMesh ref={nodeRef} args={[undefined, undefined, nodes.length]}>
        <sphereGeometry args={[1, 20, 20]} />
        <meshStandardMaterial roughness={0.55} metalness={0.15} />
      </instancedMesh>
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial color={STEEL} transparent opacity={0.28} />
      </lineSegments>
      <instancedMesh ref={pulses} args={[undefined, undefined, PULSES]}>
        <sphereGeometry args={[1, 10, 10]} />
        <meshStandardMaterial color={WARM} roughness={0.4} />
      </instancedMesh>
    </group>
  );
}

export default function NeuralScene() {
  const mobile = typeof window !== "undefined" && window.innerWidth < 768;
  const still = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return (
    <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0, 14], fov: 50 }} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={0.9} />
      <directionalLight position={[5, 6, 8]} intensity={1.6} />
      <directionalLight position={[-6, -2, 3]} intensity={0.5} color="#e8dccb" />
      <Network count={mobile ? 34 : 60} still={still} />
    </Canvas>
  );
}
