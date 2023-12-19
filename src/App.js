import * as THREE from 'three'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { useGLTF, Edges } from '@react-three/drei'
import { Physics, useCompoundBody, useCylinder } from '@react-three/cannon'
import { LayerMaterial, Depth, Fresnel } from 'lamina'

const vec = new THREE.Vector3()
const white = new THREE.MeshBasicMaterial({ color: '#fefefe', toneMapped: false })
const black = new THREE.MeshBasicMaterial({ color: 'black', toneMapped: false })
const cylinder = new THREE.CylinderGeometry(0.6, 0.6, 0.5, 3)

export const App = ({ amount = 12 }) => (
  <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 50 }}>
    <Physics gravity={[0, 1, 0]}>
      {Array.from({ length: amount }, (_, i) => {
        const El = i % 2 ? Pmndrs : Vercel
        return <El key={i} mass={4} angularDamping={0.4} linearDamping={0.8} position={[Math.random(), Math.random(), Math.random()]} />
      })}
      <Cursor mass={15} angularDamping={0.5} linearDamping={0.5} position={[0, 0, 10]} />
    </Physics>
  </Canvas>
)

function Vercel(props) {
  const { nodes } = useGLTF('/Pill.glb')
  const [ref, api] = useCompoundBody(() => ({
    ...props,
    shapes: [
      { type: 'Box', args: [0.65, 0.65, 0.5], position: [0.18, 0.18, 0] },
      { type: 'Box', args: [0.3, 0.3, 0.5], position: [-0.35, 0, 0] },
      { type: 'Box', args: [0.3, 0.3, 0.5], position: [0, -0.35, 0] }
    ]
  }))
  useFrame(() => api.applyForce(vec.setFromMatrixPosition(ref.current.matrix).normalize().multiplyScalar(-40).toArray(), [0, 0, 0]))
  return (
    <group ref={ref}>
      <mesh scale={[0.5, 0.5, 0.5]} position={[-0.02, -0.5, 0.022]} geometry={nodes.Capsule.geometry} material={white}>
        <Edges scale={1.005} material={black} />
      </mesh>
    </group>
  )
}

function Pmndrs(props) {
  const { nodes } = useGLTF('/Pill.glb')
  const [ref, api] = useCompoundBody(() => ({
    ...props,
    shapes: [
      { type: 'Box', args: [0.65, 0.65, 0.5], position: [0.18, 0.18, 0] },
      { type: 'Box', args: [0.3, 0.3, 0.5], position: [-0.35, 0, 0] },
      { type: 'Box', args: [0.3, 0.3, 0.5], position: [0, -0.35, 0] }
    ]
  }))
  useFrame(() => api.applyForce(vec.setFromMatrixPosition(ref.current.matrix).normalize().multiplyScalar(-40).toArray(), [0, 0, 0]))
  return (
    <group ref={ref}>
      <mesh scale={[0.5, 0.5, 0.5]} position={[-0.02, -0.5, 0.022]} geometry={nodes.Capsule.geometry} material={white}>
        <Edges scale={1.005} material={black} />
      </mesh>
    </group>
  )
}

function Cursor({ speed = 10, gradient = 0.7, ...props }) {
  const { nodes } = useGLTF('/Pill.glb')
  const viewport = useThree((state) => state.viewport)
  const [ref, api] = useCompoundBody(() => ({
    ...props,
    shapes: [
      { type: 'Cylinder', args: [0.6, 0.6, 0.5, 3], position: [0, 0.2, 0], rotation: [Math.PI / 2, Math.PI, 0] },
      { type: 'Box', args: [0.25, 1, 0.3], position: [0, -0.45, 0] }
    ]
  }))
  useFrame((state) => {
    vec.setFromMatrixPosition(ref.current.matrix)
    api.velocity.set(((state.mouse.x * viewport.width) / 2 - vec.x) * speed, ((state.mouse.y * viewport.height) / 2 - vec.y) * speed, -vec.z)
  })
  return (
    <group ref={ref}>
      <mesh scale={[0.5, 0.5, 0.5]} rotation={[0, Math.PI / 2, 0]} geometry={nodes.Capsule.geometry} material={black}>
        <Edges scale={1.003} color="white" />
      </mesh>
    </group>
  )
}
