import { useRef, useEffect } from 'react'
import {
  Clock,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  SRGBColorSpace,
  MathUtils,
  Vector2,
  Vector3,
  MeshPhysicalMaterial,
  ShaderChunk,
  Color,
  Object3D,
  InstancedMesh,
  PMREMGenerator,
  SphereGeometry,
  AmbientLight,
  PointLight,
  ACESFilmicToneMapping,
  Raycaster,
  Plane,
} from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

// ── ThreeApp ──────────────────────────────────────────────────────────────────
class ThreeApp {
  #opts: any
  canvas!: HTMLCanvasElement
  camera!: PerspectiveCamera
  cameraMinAspect?: number
  cameraMaxAspect?: number
  cameraFov!: number
  maxPixelRatio?: number
  minPixelRatio?: number
  scene!: Scene
  renderer!: WebGLRenderer
  #pp: any
  size = { width: 0, height: 0, wWidth: 0, wHeight: 0, ratio: 0, pixelRatio: 0 }
  render: () => void = this.#renderDefault.bind(this)
  onBeforeRender: (t: any) => void = () => {}
  onAfterRender: (t: any) => void = () => {}
  onAfterResize: (s: any) => void = () => {}
  #isIntersecting = false
  #isAnimating = false
  isDisposed = false
  #resizeTimeout?: ReturnType<typeof setTimeout>
  #resizeObserver?: ResizeObserver
  #intersectionObserver?: IntersectionObserver
  #clock = new Clock()
  #time = { elapsed: 0, delta: 0 }
  #animId = 0

  constructor(opts: any) {
    this.#opts = { ...opts }
    this.#initCamera()
    this.#initScene()
    this.#initRenderer()
    this.resize()
    this.#initObservers()
  }

  #initCamera() {
    this.camera = new PerspectiveCamera()
    this.cameraFov = this.camera.fov
  }
  #initScene() { this.scene = new Scene() }
  #initRenderer() {
    if (this.#opts.canvas) this.canvas = this.#opts.canvas
    else if (this.#opts.id) this.canvas = document.getElementById(this.#opts.id) as HTMLCanvasElement
    else { console.error('Three: Missing canvas or id parameter'); return }
    this.canvas.style.display = 'block'
    this.renderer = new WebGLRenderer({ canvas: this.canvas, powerPreference: 'high-performance', ...(this.#opts.rendererOptions ?? {}) })
    this.renderer.outputColorSpace = SRGBColorSpace
  }
  #initObservers() {
    if (!(this.#opts.size instanceof Object)) {
      window.addEventListener('resize', this.#onResize.bind(this))
      if (this.#opts.size === 'parent' && this.canvas.parentNode) {
        this.#resizeObserver = new ResizeObserver(this.#onResize.bind(this))
        this.#resizeObserver.observe(this.canvas.parentNode as Element)
      }
    }
    this.#intersectionObserver = new IntersectionObserver(([e]) => {
      this.#isIntersecting = e.isIntersecting
      this.#isIntersecting ? this.#startLoop() : this.#stopLoop()
    }, { root: null, rootMargin: '0px', threshold: 0 })
    this.#intersectionObserver.observe(this.canvas)
    document.addEventListener('visibilitychange', () => {
      if (this.#isIntersecting) document.hidden ? this.#stopLoop() : this.#startLoop()
    })
  }
  #onResize() {
    if (this.#resizeTimeout) clearTimeout(this.#resizeTimeout)
    this.#resizeTimeout = setTimeout(this.resize.bind(this), 100)
  }
  resize() {
    let w: number, h: number
    if (this.#opts.size instanceof Object) { w = this.#opts.size.width; h = this.#opts.size.height }
    else if (this.#opts.size === 'parent' && this.canvas.parentNode) {
      w = (this.canvas.parentNode as HTMLElement).offsetWidth
      h = (this.canvas.parentNode as HTMLElement).offsetHeight
    } else { w = window.innerWidth; h = window.innerHeight }
    this.size.width = w; this.size.height = h; this.size.ratio = w / h
    this.#updateCamera()
    this.#updateRenderer()
    this.onAfterResize(this.size)
  }
  #updateCamera() {
    this.camera.aspect = this.size.width / this.size.height
    if (this.cameraFov) {
      if (this.cameraMinAspect && this.camera.aspect < this.cameraMinAspect) this.#adjustFov(this.cameraMinAspect)
      else if (this.cameraMaxAspect && this.camera.aspect > this.cameraMaxAspect) this.#adjustFov(this.cameraMaxAspect)
      else this.camera.fov = this.cameraFov
    }
    this.camera.updateProjectionMatrix()
    this.updateWorldSize()
  }
  #adjustFov(targetAspect: number) {
    const t = Math.tan(MathUtils.degToRad(this.cameraFov / 2)) / (this.camera.aspect / targetAspect)
    this.camera.fov = 2 * MathUtils.radToDeg(Math.atan(t))
  }
  updateWorldSize() {
    if (this.camera.isPerspectiveCamera) {
      const fovRad = (this.camera.fov * Math.PI) / 180
      this.size.wHeight = 2 * Math.tan(fovRad / 2) * this.camera.position.length()
      this.size.wWidth = this.size.wHeight * this.camera.aspect
    }
  }
  #updateRenderer() {
    this.renderer.setSize(this.size.width, this.size.height)
    let dpr = window.devicePixelRatio
    if (this.maxPixelRatio && dpr > this.maxPixelRatio) dpr = this.maxPixelRatio
    else if (this.minPixelRatio && dpr < this.minPixelRatio) dpr = this.minPixelRatio
    this.renderer.setPixelRatio(dpr)
    this.size.pixelRatio = dpr
  }
  #startLoop() {
    if (this.#isAnimating) return
    const animate = () => {
      this.#animId = requestAnimationFrame(animate)
      this.#time.delta = this.#clock.getDelta()
      this.#time.elapsed += this.#time.delta
      this.onBeforeRender(this.#time)
      this.render()
      this.onAfterRender(this.#time)
    }
    this.#isAnimating = true
    this.#clock.start()
    animate()
  }
  #stopLoop() {
    if (this.#isAnimating) {
      cancelAnimationFrame(this.#animId)
      this.#isAnimating = false
      this.#clock.stop()
    }
  }
  #renderDefault() { this.renderer.render(this.scene, this.camera) }
  clear() {
    this.scene.traverse((obj: any) => {
      if (obj.isMesh) {
        if (obj.material) {
          Object.values(obj.material).forEach((v: any) => { if (v?.dispose) v.dispose() })
          obj.material.dispose()
        }
        if (obj.geometry) obj.geometry.dispose()
      }
    })
    this.scene.clear()
  }
  dispose() {
    this.#stopLoop()
    this.#resizeObserver?.disconnect()
    this.#intersectionObserver?.disconnect()
    this.clear()
    this.renderer.dispose()
    this.isDisposed = true
  }
}

// ── Pointer tracker ───────────────────────────────────────────────────────────
const _trackers = new Map<Element, any>()
const _pointer = new Vector2()
let _listening = false

function createPointerTracker(opts: any) {
  const t = { position: new Vector2(), nPosition: new Vector2(), hover: false, touching: false, onEnter() {}, onMove() {}, onClick() {}, onLeave() {}, ...opts }
  if (!_trackers.has(opts.domElement)) {
    _trackers.set(opts.domElement, t)
    if (!_listening) {
      document.body.addEventListener('pointermove', _onMove)
      document.body.addEventListener('pointerleave', _onLeave)
      document.body.addEventListener('click', _onClick)
      document.body.addEventListener('touchstart', _onTouchStart, { passive: true })
      document.body.addEventListener('touchmove', _onTouchMove, { passive: true })
      document.body.addEventListener('touchend', _onTouchEnd, { passive: true })
      document.body.addEventListener('touchcancel', _onTouchEnd, { passive: true })
      _listening = true
    }
  }
  t.dispose = () => {
    _trackers.delete(opts.domElement)
    if (_trackers.size === 0) {
      document.body.removeEventListener('pointermove', _onMove)
      document.body.removeEventListener('pointerleave', _onLeave)
      document.body.removeEventListener('click', _onClick)
      document.body.removeEventListener('touchstart', _onTouchStart)
      document.body.removeEventListener('touchmove', _onTouchMove)
      document.body.removeEventListener('touchend', _onTouchEnd)
      document.body.removeEventListener('touchcancel', _onTouchEnd)
      _listening = false
    }
  }
  return t
}
function _setPointerPos(t: any, rect: DOMRect) {
  t.position.x = _pointer.x - rect.left; t.position.y = _pointer.y - rect.top
  t.nPosition.x = (t.position.x / rect.width) * 2 - 1
  t.nPosition.y = (-t.position.y / rect.height) * 2 + 1
}
function _inRect(rect: DOMRect) {
  return _pointer.x >= rect.left && _pointer.x <= rect.left + rect.width && _pointer.y >= rect.top && _pointer.y <= rect.top + rect.height
}
function _onMove(e: PointerEvent) { _pointer.set(e.clientX, e.clientY); _processMove() }
function _processMove() {
  for (const [el, t] of _trackers) {
    const rect = el.getBoundingClientRect()
    if (_inRect(rect)) { _setPointerPos(t, rect); if (!t.hover) { t.hover = true; t.onEnter(t) } t.onMove(t) }
    else if (t.hover && !t.touching) { t.hover = false; t.onLeave(t) }
  }
}
function _onClick(e: MouseEvent) {
  _pointer.set(e.clientX, e.clientY)
  for (const [el, t] of _trackers) { const rect = el.getBoundingClientRect(); _setPointerPos(t, rect); if (_inRect(rect)) t.onClick(t) }
}
function _onLeave() { for (const t of _trackers.values()) { if (t.hover) { t.hover = false; t.onLeave(t) } } }
function _onTouchStart(e: TouchEvent) {
  if (!e.touches.length) return
  _pointer.set(e.touches[0].clientX, e.touches[0].clientY)
  for (const [el, t] of _trackers) {
    const rect = el.getBoundingClientRect()
    if (_inRect(rect)) { t.touching = true; _setPointerPos(t, rect); if (!t.hover) { t.hover = true; t.onEnter(t) } t.onMove(t) }
  }
}
function _onTouchMove(e: TouchEvent) {
  if (!e.touches.length) return
  _pointer.set(e.touches[0].clientX, e.touches[0].clientY)
  for (const [el, t] of _trackers) {
    const rect = el.getBoundingClientRect(); _setPointerPos(t, rect)
    if (_inRect(rect)) { if (!t.hover) { t.hover = true; t.touching = true; t.onEnter(t) } t.onMove(t) }
    else if (t.hover && t.touching) t.onMove(t)
  }
}
function _onTouchEnd() { for (const [, t] of _trackers) { if (t.touching) { t.touching = false; if (t.hover) { t.hover = false; t.onLeave(t) } } } }

// ── Physics ───────────────────────────────────────────────────────────────────
const { randFloat, randFloatSpread } = MathUtils
const _vA = new Vector3(), _vB = new Vector3(), _vC = new Vector3()
const _vD = new Vector3(), _vE = new Vector3(), _vF = new Vector3()
const _vG = new Vector3(), _vH = new Vector3(), _vI = new Vector3(), _vJ = new Vector3()

class Physics {
  config: any
  positionData: Float32Array
  velocityData: Float32Array
  sizeData: Float32Array
  center: Vector3

  constructor(config: any) {
    this.config = config
    this.positionData = new Float32Array(3 * config.count).fill(0)
    this.velocityData = new Float32Array(3 * config.count).fill(0)
    this.sizeData = new Float32Array(config.count).fill(1)
    this.center = new Vector3()
    this.#scatter()
    this.setSizes()
  }
  #scatter() {
    const { config: c, positionData: pd } = this
    this.center.toArray(pd, 0)
    for (let i = 1; i < c.count; i++) {
      const s = 3 * i
      pd[s] = randFloatSpread(2 * c.maxX)
      pd[s + 1] = randFloatSpread(2 * c.maxY)
      pd[s + 2] = randFloatSpread(2 * c.maxZ)
    }
  }
  setSizes() {
    const { config: c, sizeData: sd } = this
    sd[0] = c.size0
    for (let i = 1; i < c.count; i++) sd[i] = randFloat(c.minSize, c.maxSize)
  }
  update(e: any) {
    const { config: c, center, positionData: pd, sizeData: sd, velocityData: vd } = this
    let start = 0
    if (c.controlSphere0) {
      start = 1
      _vA.fromArray(pd, 0).lerp(center, 0.1).toArray(pd, 0)
      _vD.set(0, 0, 0).toArray(vd, 0)
    }
    for (let i = start; i < c.count; i++) {
      const b = 3 * i
      _vA.fromArray(pd, b); _vE.fromArray(vd, b)
      _vE.y -= e.delta * c.gravity * sd[i]
      _vE.multiplyScalar(c.friction).clampLength(0, c.maxVelocity)
      _vA.add(_vE).toArray(pd, b); _vE.toArray(vd, b)
    }
    for (let i = start; i < c.count; i++) {
      const b = 3 * i; const ri = sd[i]
      _vA.fromArray(pd, b); _vE.fromArray(vd, b)
      for (let j = i + 1; j < c.count; j++) {
        const ob = 3 * j; const rj = sd[j]
        _vC.fromArray(pd, ob); _vF.fromArray(vd, ob)
        _vG.copy(_vC).sub(_vA)
        const dist = _vG.length(); const sumR = ri + rj
        if (dist < sumR) {
          const overlap = sumR - dist
          _vH.copy(_vG).normalize().multiplyScalar(0.5 * overlap)
          _vI.copy(_vH).multiplyScalar(Math.max(_vE.length(), 1))
          _vJ.copy(_vH).multiplyScalar(Math.max(_vF.length(), 1))
          _vA.sub(_vH); _vE.sub(_vI); _vA.toArray(pd, b); _vE.toArray(vd, b)
          _vC.add(_vH); _vF.add(_vJ); _vC.toArray(pd, ob); _vF.toArray(vd, ob)
        }
      }
      if (c.controlSphere0) {
        _vB.fromArray(pd, 0)
        _vG.copy(_vB).sub(_vA)
        const d = _vG.length(); const sr0 = ri + sd[0]
        if (d < sr0) {
          const diff = sr0 - d
          _vH.copy(_vG.normalize()).multiplyScalar(diff)
          _vI.copy(_vH).multiplyScalar(Math.max(_vE.length(), 2))
          _vA.sub(_vH); _vE.sub(_vI)
        }
      }
      if (Math.abs(_vA.x) + ri > c.maxX) { _vA.x = Math.sign(_vA.x) * (c.maxX - ri); _vE.x = -_vE.x * c.wallBounce }
      if (c.gravity === 0) {
        if (Math.abs(_vA.y) + ri > c.maxY) { _vA.y = Math.sign(_vA.y) * (c.maxY - ri); _vE.y = -_vE.y * c.wallBounce }
      } else if (_vA.y - ri < -c.maxY) { _vA.y = -c.maxY + ri; _vE.y = -_vE.y * c.wallBounce }
      const maxB = Math.max(c.maxZ, c.maxSize)
      if (Math.abs(_vA.z) + ri > maxB) { _vA.z = Math.sign(_vA.z) * (c.maxZ - ri); _vE.z = -_vE.z * c.wallBounce }
      _vA.toArray(pd, b); _vE.toArray(vd, b)
    }
  }
}

// ── SSMaterial ────────────────────────────────────────────────────────────────
class SSMaterial extends MeshPhysicalMaterial {
  uniforms: Record<string, { value: number }>
  onBeforeCompile2?: (shader: any) => void

  constructor(params: any) {
    super(params)
    this.uniforms = {
      thicknessDistortion: { value: 0.1 },
      thicknessAmbient: { value: 0 },
      thicknessAttenuation: { value: 0.1 },
      thicknessPower: { value: 2 },
      thicknessScale: { value: 10 },
    }
    this.defines = { ...this.defines, USE_UV: '' }
    this.onBeforeCompile = (shader: any) => {
      Object.assign(shader.uniforms, this.uniforms)
      shader.fragmentShader = `
        uniform float thicknessPower;
        uniform float thicknessScale;
        uniform float thicknessDistortion;
        uniform float thicknessAmbient;
        uniform float thicknessAttenuation;
      ` + shader.fragmentShader
      shader.fragmentShader = shader.fragmentShader.replace(
        'void main() {',
        `void RE_Direct_Scattering(const in IncidentLight directLight, const in vec2 uv, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, inout ReflectedLight reflectedLight) {
          vec3 scatteringHalf = normalize(directLight.direction + (geometryNormal * thicknessDistortion));
          float scatteringDot = pow(saturate(dot(geometryViewDir, -scatteringHalf)), thicknessPower) * thicknessScale;
          #ifdef USE_COLOR
            vec3 scatteringIllu = (scatteringDot + thicknessAmbient) * vColor.rgb;
          #else
            vec3 scatteringIllu = (scatteringDot + thicknessAmbient) * diffuse;
          #endif
          reflectedLight.directDiffuse += scatteringIllu * thicknessAttenuation * directLight.color;
        }
        void main() {`
      )
      const patched = ShaderChunk.lights_fragment_begin.replaceAll(
        'RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );',
        `RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
          RE_Direct_Scattering(directLight, vUv, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, reflectedLight);`
      )
      shader.fragmentShader = shader.fragmentShader.replace('#include <lights_fragment_begin>', patched)
      this.onBeforeCompile2?.(shader)
    }
  }
}

// ── Default config ────────────────────────────────────────────────────────────
const DEFAULT_CONFIG = {
  count: 200,
  colors: [0, 0, 0] as number[],
  ambientColor: 0xffffff,
  ambientIntensity: 1,
  lightIntensity: 200,
  materialParams: { metalness: 0.15, roughness: 0.45, clearcoat: 0.35, clearcoatRoughness: 0.15 },
  minSize: 0.5, maxSize: 1, size0: 1,
  gravity: 0.5, friction: 0.9975, wallBounce: 0.95, maxVelocity: 0.15,
  maxX: 5, maxY: 5, maxZ: 2,
  controlSphere0: false, followCursor: true,
}

// ── SphereMesh ────────────────────────────────────────────────────────────────
const _dummy = new Object3D()

class SphereMesh extends InstancedMesh {
  config: any
  physics: Physics
  ambientLight!: AmbientLight
  light!: PointLight

  constructor(renderer: WebGLRenderer, opts: any = {}) {
    const config = { ...DEFAULT_CONFIG, ...opts }
    const pmrem = new PMREMGenerator(renderer)
    const envMap = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
    const geo = new SphereGeometry()
    const mat = new SSMaterial({ envMap, ...config.materialParams })
    mat.envMapRotation.x = -Math.PI / 2
    super(geo, mat, config.count)
    this.config = config
    this.physics = new Physics(config)
    this.#addLights()
    this.setColors(config.colors)
  }
  #addLights() {
    this.ambientLight = new AmbientLight(this.config.ambientColor, this.config.ambientIntensity)
    this.add(this.ambientLight)
    this.light = new PointLight(this.config.colors[0], this.config.lightIntensity)
    this.add(this.light)
  }
  setColors(colors: number[]) {
    if (!Array.isArray(colors) || colors.length <= 1) return
    const colorObjs = colors.map(c => new Color(c))
    const getAt = (ratio: number, out = new Color()) => {
      const scaled = Math.max(0, Math.min(1, ratio)) * (colors.length - 1)
      const idx = Math.floor(scaled)
      const a = colorObjs[idx]
      if (idx >= colors.length - 1) return a.clone()
      const t = scaled - idx; const b2 = colorObjs[idx + 1]
      out.r = a.r + t * (b2.r - a.r); out.g = a.g + t * (b2.g - a.g); out.b = a.b + t * (b2.b - a.b)
      return out
    }
    for (let i = 0; i < this.count; i++) {
      this.setColorAt(i, getAt(i / this.count))
      if (i === 0) this.light.color.copy(getAt(0))
    }
    this.instanceColor!.needsUpdate = true
  }
  update(e: any) {
    this.physics.update(e)
    for (let i = 0; i < this.count; i++) {
      _dummy.position.fromArray(this.physics.positionData, 3 * i)
      _dummy.scale.setScalar(i === 0 && !this.config.followCursor ? 0 : this.physics.sizeData[i])
      _dummy.updateMatrix()
      this.setMatrixAt(i, _dummy.matrix)
      if (i === 0) this.light.position.copy(_dummy.position)
    }
    this.instanceMatrix.needsUpdate = true
  }
}

// ── createBallpit ─────────────────────────────────────────────────────────────
function createBallpit(canvas: HTMLCanvasElement, opts: any = {}) {
  const app = new ThreeApp({ canvas, size: 'parent', rendererOptions: { antialias: true, alpha: true } })
  let spheres: SphereMesh

  app.renderer.toneMapping = ACESFilmicToneMapping
  app.camera.position.set(0, 0, 20)
  app.camera.lookAt(0, 0, 0)
  app.cameraMaxAspect = 1.5
  app.resize()

  init(opts)

  const raycaster = new Raycaster()
  const plane = new Plane(new Vector3(0, 0, 1), 0)
  const hit = new Vector3()
  let paused = false

  canvas.style.touchAction = 'pan-y'
  canvas.style.userSelect = 'none'
  ;(canvas.style as any).webkitUserSelect = 'none'

  // Il tracker viene sempre creato: followCursor controlla solo la visibilità
  // di sphere 0, non l'interattività (luce + fisica seguono sempre il cursore)
  const tracker = createPointerTracker({
    domElement: canvas,
    onMove() {
      raycaster.setFromCamera(tracker.nPosition, app.camera)
      app.camera.getWorldDirection(plane.normal)
      raycaster.ray.intersectPlane(plane, hit)
      spheres.physics.center.copy(hit)
      spheres.config.controlSphere0 = true
    },
    onLeave() { spheres.config.controlSphere0 = false },
  })

  function init(config: any) {
    if (spheres) { app.clear(); app.scene.remove(spheres) }
    spheres = new SphereMesh(app.renderer, config)
    app.scene.add(spheres)
  }

  app.onBeforeRender = (e: any) => { if (!paused) spheres.update(e) }
  app.onAfterResize = (s: any) => { spheres.config.maxX = s.wWidth / 2; spheres.config.maxY = s.wHeight / 2 }

  return {
    three: app,
    get spheres() { return spheres },
    setCount(n: number) { init({ ...spheres.config, count: n }) },
    togglePause() { paused = !paused },
    dispose() { tracker?.dispose(); app.dispose() },
  }
}

// ── React component ───────────────────────────────────────────────────────────
interface BallpitProps {
  className?: string
  followCursor?: boolean
  count?: number
  colors?: number[]
  gravity?: number
  friction?: number
  wallBounce?: number
  maxVelocity?: number
  minSize?: number
  maxSize?: number
  ambientColor?: number
  ambientIntensity?: number
  lightIntensity?: number
  materialParams?: { metalness?: number; roughness?: number; clearcoat?: number; clearcoatRoughness?: number }
}

const Ballpit = ({ className = '', followCursor = true, ...props }: BallpitProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const instanceRef = useRef<ReturnType<typeof createBallpit> | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    instanceRef.current = createBallpit(canvas, { followCursor, ...props })
    return () => { instanceRef.current?.dispose() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <canvas className={className} ref={canvasRef} style={{ width: '100%', height: '100%' }} />
}

export default Ballpit
