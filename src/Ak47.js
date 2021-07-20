import React, { Suspense, useRef, useState, useEffect } from "react"
import { Canvas } from "react-three-fiber"
import { ContactShadows, Environment, useGLTF, OrbitControls } from "drei"
import { HexColorPicker } from "react-colorful"
import { proxy, useProxy } from "valtio"

const state = proxy({
  current: null,
  items: {
    clip: "#ffffff",
    default: "#ffffff",
    body_1: "#ffffff",
    body2_1: "#ffffff",
    body2_2: "#ffffff",
    trademarks: "#ffffff",
    body_3: "#ffffff"
  },
})


function Weapon() {
  const ref = useRef()
  const snap = useProxy(state)
  const { nodes, materials } = useGLTF("ak47.glb")

  useEffect(() => {
    ref.current.position.x = -0.2
    ref.current.position.y = 0
  }, [])

  const [hovered, set] = useState(null)
  useEffect(() => {
    const cursor = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><g filter="url(#filter0_d)"><path d="M29.5 47C39.165 47 47 39.165 47 29.5S39.165 12 29.5 12 12 19.835 12 29.5 19.835 47 29.5 47z" fill="${snap.items[hovered]}"/></g><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/><text fill="#000" style="white-space:pre" font-family="Inter var, sans-serif" font-size="10" letter-spacing="-.01em"><tspan x="35" y="63">${hovered}</tspan></text></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h64v64H0z"/></clipPath><filter id="filter0_d" x="6" y="8" width="47" height="47" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="3"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`
    const auto = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/></svg>`
    document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(hovered ? cursor : auto)}'), auto`
  }, [hovered])

  return (
    <group
      ref={ref}
      dispose={null}
      onPointerOver={(e) => (e.stopPropagation(), set(e.object.material.name))}
      onPointerOut={(e) => e.intersections.length === 0 && set(null)}
      onPointerMissed={() => (state.current = null)}
      onPointerDown={(e) => (e.stopPropagation(), (state.current = e.object.material.name))}>
      <mesh geometry={nodes.assaultrifle_mag.geometry} material={materials.clip} position={[0.11, 0.04, 0]} material-color={snap.items.clip} />
      <mesh geometry={nodes.assaultrifle_1.geometry} material={materials['default']} material-color={snap.items.default} />
      <mesh geometry={nodes.assaultrifle_2.geometry} material={materials.body_1} material-color={snap.items.body_1} />
      <mesh geometry={nodes.assaultrifle_3.geometry} material={materials.body2_1} material-color={snap.items.body2_1} />
      <mesh geometry={nodes.assaultrifle_4.geometry} material={materials.body2_2} material-color={snap.items.body2_2} />
      <mesh geometry={nodes.assaultrifle_5.geometry} material={materials.trademarks} material-color={snap.items.trademarks} />
      <mesh geometry={nodes.assaultrifle_6.geometry} material={materials.body_3} material-color={snap.items.body_3} />
    </group>
  )
}

function Picker() {
  const snap = useProxy(state)
  return (
    <div style={{ display: snap.current ? "block" : "none" }}>
      <HexColorPicker className="picker" color={snap.items[snap.current]} onChange={(color) => (state.items[snap.current] = color)} />
      <h1>{snap.current}</h1>
    </div>
  )
}

export default function Ak47() {
  return (
    <>
      <Canvas concurrent pixelRatio={[1, 1.5]} camera={{ position: [0, 0, 2.75], zoom: 5 }}>
        <ambientLight intensity={0.3} />
        <spotLight intensity={0.3} angle={0.1} penumbra={1} position={[5, 25, 20]} />
        <Suspense fallback={null}>
          <Weapon />
          <Environment files="royal_esplanade_1k.hdr" />
          <ContactShadows rotation-x={Math.PI / 2} position={[0, -0.8, 0]} opacity={0.25} width={10} height={10} blur={2} far={1} />
        </Suspense>
        <OrbitControls minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} enableZoom={true} enablePan={false} />
      </Canvas>
      <Picker />
    </>
  )
}