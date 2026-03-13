import { Suspense, lazy } from 'react'

const Ballpit = lazy(() => import('@/components/ui/Ballpit'))

export function BallpitSection() {
  return (
   
      <Suspense fallback={null}>
        <div style={{ width: '100%', height: '100svh', position: 'relative' }}>
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
