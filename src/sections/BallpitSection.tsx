import { Suspense, lazy } from 'react'

const Ballpit = lazy(() => import('@/components/ui/Ballpit'))

// Palette elegante: oro antico, champagne, avorio, perla, sabbia
const COLORS = [
  0xd4b896, // oro antico
  0xe8d5b0, // champagne chiaro
  0xc9a96e, // oro caldo
  0xf0e6d3, // avorio
  0xddd0b8, // sabbia dorata
  0xb89a6e, // oro brunito
  0xf5efe6, // perla
]

export function BallpitSection() {
  return (
   
      <Suspense fallback={null}>
        <div style={{ width: '1080px', height: '1080px', position: 'relative' }}>
  <Ballpit
    count={100}
    gravity={0.6}
    friction={0.998}
    wallBounce={1}
    followCursor={true}
    colors={[0xeccd04, 0xdddfdd, 0x858585]}
  />
</div>
      </Suspense>
  )
}
