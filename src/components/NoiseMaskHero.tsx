import { useEffect, useRef } from 'react'

// ── Shaders ───────────────────────────────────────────────────────────────────

const VS = `#version 300 es
precision highp float;
in vec3 aVertexPosition;
in vec2 aTextureCoord;
uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
out vec2 vTextureCoord;
out vec3 vVertexPosition;
void main() {
  gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
  vVertexPosition = aVertexPosition;
  vTextureCoord = vec2(aTextureCoord.x, 1.0 - aTextureCoord.y);
}`

const FS = `#version 300 es
precision highp float;
in vec2 vTextureCoord;
in vec3 vVertexPosition;

uniform vec2 uArtboardResolution;
uniform float uL90100_Width;
uniform vec2 uL90100_MousePos;
uniform float uL90100_TrackMouse;
uniform float uL90101_Time;
uniform vec2 uL90101_MousePos;
uniform vec2 uResolution;
uniform vec2 uMousePos;
uniform float uL0_ElemOpacity;
uniform float uL1_Time;
uniform float uL1_ElemOpacity;
uniform sampler2D uL2_SourceImage;
uniform float uL2_ElemOpacity;
uniform sampler2D uL3_Texture;
uniform float uL3_ElemOpacity;
uniform sampler2D uL4_Texture;
uniform float uL4_ElemOpacity;

const float TAU_L90100 = 6.28318530718;
const float PI_L90100  = 3.14159265359;
const float PI_L90101  = 3.14159265359;
const float PI_L0      = 3.14159265359;
const float PI_L2      = 3.1415926;

out vec4 fragColor;

vec2 rotate2D_L90100(vec2 p, float angle) {
  float s = sin(angle); float c = cos(angle);
  return vec2(p.x*c - p.y*s, p.x*s + p.y*c);
}
vec2 getAnchorOffsets_L90100() { return vec2(0.5, 0.5); }
vec3 getFillColor_L90100(vec2 localPos, vec2 elementSize, float signedDist, float maxInset) {
  return vec3(0.4666666666666667);
}
float sdEllipse_L90100(vec2 p, vec2 ab) {
  vec2 q = p / ab; return (length(q) - 1.0) * min(ab.x, ab.y);
}
float sdShape_L90100(vec2 canvasPosPx, vec2 elementPosPx, vec2 elementSizePx, float rotationTurns) {
  elementSizePx = abs(elementSizePx);
  vec2 centerPx = elementPosPx + elementSizePx * 0.5;
  vec2 rel = canvasPosPx - centerPx;
  vec2 local = rotate2D_L90100(rel, -rotationTurns * TAU_L90100) + elementSizePx * 0.5;
  vec2 p = local - elementSizePx * 0.5;
  vec2 halfSize = elementSizePx * 0.5;
  return sdEllipse_L90100(p, vec2(max(halfSize.x, 0.00001), max(halfSize.y, 0.00001)));
}
vec4 sampleShape_L90100(vec2 canvasUV) {
  vec2 canvasPosPx = vec2(canvasUV.x * uArtboardResolution.x, (1.0 - canvasUV.y) * uArtboardResolution.y);
  float absWidth = uL90100_Width * uArtboardResolution.x;
  float absHeight = absWidth / 1.0;
  vec2 elementSizePx = vec2(absWidth, absHeight);
  vec2 elementPosPx = vec2(0.5002, 0.5025) * uArtboardResolution - getAnchorOffsets_L90100() * elementSizePx;
  float dist = sdShape_L90100(canvasPosPx, elementPosPx, elementSizePx, 0.0);
  float aa = max(length(vec2(dFdx(dist), dFdy(dist))), 0.75);
  float uvGrad = max(length(dFdx(canvasUV)), length(dFdy(canvasUV)));
  float seamFactor = smoothstep(0.01, 0.03, uvGrad);
  aa = mix(aa, 0.75, seamFactor);
  float fillAlpha = 1.0 - smoothstep(mix(0.0, -150.0, 0.0), mix(aa, 150.0, 0.0), dist);
  fillAlpha = mix(fillAlpha, step(dist, 0.0), seamFactor);
  vec2 localPos = rotate2D_L90100(canvasPosPx - (elementPosPx + elementSizePx * 0.5), 0.0) + elementSizePx * 0.5;
  float centerDist = sdShape_L90100(elementPosPx + elementSizePx * 0.5, elementPosPx, elementSizePx, 0.0);
  float maxInset = max(-centerDist, 0.00001);
  vec3 fillRgb = getFillColor_L90100(localPos, elementSizePx, dist, maxInset);
  vec4 fill = vec4(fillRgb * fillAlpha, fillAlpha);
  return fill;
}
vec4 computeParentSrc_L900(vec2 uv) {
  vec2 pos = (uL90100_MousePos - 0.5) * uL90100_TrackMouse;
  uv -= pos;
  return sampleShape_L90100(uv);
}
mat2 rot_L90101(float a) { return mat2(cos(a), -sin(a), sin(a), cos(a)); }
vec3 hash3_L90101(vec2 p) {
  vec3 q = vec3(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)), dot(p, vec2(419.2, 371.9)));
  return fract(sin(q) * 43758.5453);
}
float voronoise_L90101(vec2 uv, float time, float phase) {
  uv *= vec2(0.5, 0.5); uv *= 2.91;
  vec2 p = floor(uv); vec2 f = fract(uv);
  float va = 0.0; float wt = 0.0;
  for (int j = -2; j <= 2; j++) for (int i = -2; i <= 2; i++) {
    vec2 g = vec2(float(i), float(j));
    vec3 o = hash3_L90101(p + g);
    o.xy += 0.5 * vec2(sin(time * 0.1 + phase + o.x * 6.28));
    vec2 r = g - f + o.xy;
    float dd = dot(r, r);
    float ww = pow(1.0 - smoothstep(0.0, 1.414, sqrt(dd)), 1.0);
    va += o.z * ww; wt += ww;
  }
  return va / wt;
}
vec2 distortUV_L90101(vec2 uv) {
  float aspectRatio = uResolution.x / uResolution.y;
  vec2 mPos = vec2(0.5, 0.5016354529616724);
  float dist = max(0.0, 1.0 - distance(uv * vec2(aspectRatio, 1.0), mPos * vec2(aspectRatio, 1.0)) * 4.0);
  if (dist <= 0.001) return uv;
  vec2 st = (uv - mPos) * vec2(aspectRatio, 1.0);
  st *= 12.0 * 1.1660;
  st = rot_L90101(0.0216 * -2.0 * PI_L90101) * st;
  vec2 noise = vec2(
    voronoise_L90101(st, uL90101_Time, 0.0),
    voronoise_L90101(st + vec2(9.2, 1.2), uL90101_Time, 0.0)
  );
  return mix(uv, noise, dist * 0.15);
}
uvec2 pcg2d_L1(uvec2 v) {
  v = v * 1664525u + 1013904223u;
  v.x += v.y * v.y * 1664525u + 1013904223u;
  v.y += v.x * v.x * 1664525u + 1013904223u;
  v ^= v >> 16u;
  v.x += v.y * v.y * 1664525u + 1013904223u;
  v.y += v.x * v.x * 1664525u + 1013904223u;
  return v;
}
float randFibo_L1(vec2 p) {
  uvec2 v = floatBitsToUint(p); v = pcg2d_L1(v);
  uint r = v.x ^ v.y;
  return float(r) / float(0xffffffffu);
}
vec3 dither_L1(vec3 color, vec2 st) {
  float delta = floor(uL1_Time);
  vec2 offset = vec2(randFibo_L1(vec2(123.0, 16.0) + delta), randFibo_L1(vec2(56.0, 96.0) + delta));
  float noise = randFibo_L1(st + offset) - 0.005;
  float num_levels = 1.0 / max(0.0001, 0.07);
  return floor(color * num_levels + noise) / num_levels;
}
vec4 sampleImage_L2(vec2 canvasUV) {
  vec2 canvasPos = vec2(canvasUV.x * uArtboardResolution.x, (1.0 - canvasUV.y) * uArtboardResolution.y);
  float imageAspect = 1500.0 / 841.0;
  float canvasAspect = uArtboardResolution.x / uArtboardResolution.y;
  vec2 fitSize = vec2(
    (canvasAspect < imageAspect) ? uArtboardResolution.y * imageAspect : uArtboardResolution.x,
    (canvasAspect < imageAspect) ? uArtboardResolution.y : uArtboardResolution.x / imageAspect
  );
  vec2 offset2 = (uArtboardResolution - fitSize) * 0.5;
  vec2 imageUV = (canvasPos - offset2) / fitSize;
  vec2 flippedUV = vec2(imageUV.x, 1.0 - imageUV.y);
  vec4 color = textureLod(uL2_SourceImage, flippedUV, 0.0);
  if (imageUV.x >= 0.0 && imageUV.x <= 1.0 && imageUV.y >= 0.0 && imageUV.y <= 1.0) return color;
  return vec4(0.0);
}
vec4 computeLayer_L900(vec2 uv) { return computeParentSrc_L900(distortUV_L90101(uv)); }
vec4 computeLayer_L0(vec2 uv) {
  uv -= vec2(0.5); uv /= max(1.0, 1e-5);
  return vec4(vec3(0.9333333333333333), 1.0);
}
vec4 computeLayer_L1(vec2 uv, vec4 prev) {
  vec4 color = prev;
  color.rgb = mix(color.rgb, dither_L1(color.rgb, vTextureCoord), 1.0);
  return color;
}
vec4 computeLayer_L2(vec2 uv) {
  vec4 imgColor = sampleImage_L2(uv);
  imgColor.rgb = clamp(imgColor.rgb, 0.0, 1.0);
  imgColor.rgb *= imgColor.a;
  return imgColor;
}
vec4 computeLayer_L3(vec2 uv) { return texture(uL3_Texture, uv); }
vec4 computeLayer_L4(vec2 uv) { return texture(uL4_Texture, uv); }

void main() {
  vec2 uv = vTextureCoord;
  float maskAlpha = computeLayer_L900(uv).a;
  vec4 result = vec4(0.0);
  vec4 c0 = computeLayer_L0(uv) * uL0_ElemOpacity;
  result = c0 + result * (1.0 - c0.a);
  vec4 c1 = computeLayer_L1(uv, result) * uL1_ElemOpacity;
  result = c1 + result * (1.0 - c1.a);
  vec4 maskBase = result;
  if (maskAlpha >= 0.004) {
    vec4 c2 = computeLayer_L2(uv) * uL2_ElemOpacity;
    result = c2 + result * (1.0 - c2.a);
  }
  result = mix(maskBase, result, maskAlpha);
  vec4 c3 = computeLayer_L3(uv) * uL3_ElemOpacity;
  result = c3 + result * (1.0 - c3.a);
  vec4 c4 = computeLayer_L4(uv) * uL4_ElemOpacity;
  result = c4 + result * (1.0 - c4.a);
  fragColor = result;
}`

// ── Easing ────────────────────────────────────────────────────────────────────

function easeInOutExpo(t: number): number {
  if (t <= 0) return 0
  if (t >= 1) return 1
  return t < 0.5 ? Math.pow(2, 20 * t - 10) / 2 : (2 - Math.pow(2, -20 * t + 10)) / 2
}

function easeInOutQuart(t: number): number {
  return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2
}

// ── Props ─────────────────────────────────────────────────────────────────────

export interface NoiseMaskHeroProps {
  imageUrl?: string
  titleLine1?: string
  titleLine2?: string
  subtitle?: string
  titleFontSize?: number
  artboardW?: number
  artboardH?: number
  className?: string
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function NoiseMaskHero({
  imageUrl = 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1500&q=90',
  titleLine1 = 'Il vostro amore,',
  titleLine2 = 'raccontato.',
  subtitle = 'Inviti digitali eleganti con RSVP integrato e gestione ospiti. Pronti in meno di 10 minuti.',
  titleFontSize = 149,
  artboardW = 1440,
  artboardH = 900,
  className,
}: NoiseMaskHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const glOrNull = canvas.getContext('webgl2')
    if (!glOrNull) { console.error('WebGL2 not supported'); return }
    const gl: WebGL2RenderingContext = glOrNull

    function resize() {
      if (!canvas) return
      canvas.width  = Math.round(canvas.offsetWidth  * window.devicePixelRatio)
      canvas.height = Math.round(canvas.offsetHeight * window.devicePixelRatio)
    }
    resize()

    function compileShader(type: number, src: string) {
      const s = gl!.createShader(type)!
      gl!.shaderSource(s, src)
      gl!.compileShader(s)
      if (!gl!.getShaderParameter(s, gl!.COMPILE_STATUS))
        console.error('Shader error:', gl!.getShaderInfoLog(s))
      return s
    }

    const prog = gl.createProgram()!
    gl.attachShader(prog, compileShader(gl.VERTEX_SHADER, VS))
    gl.attachShader(prog, compileShader(gl.FRAGMENT_SHADER, FS))
    gl.linkProgram(prog)
    gl.useProgram(prog)

    const verts = new Float32Array([
      -1, -1, 0,  0, 0,
       1, -1, 0,  1, 0,
      -1,  1, 0,  0, 1,
       1, -1, 0,  1, 0,
       1,  1, 0,  1, 1,
      -1,  1, 0,  0, 1,
    ])
    const vbo = gl.createBuffer()!
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo)
    gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW)

    const aVP = gl.getAttribLocation(prog, 'aVertexPosition')
    const aTC = gl.getAttribLocation(prog, 'aTextureCoord')
    gl.enableVertexAttribArray(aVP)
    gl.enableVertexAttribArray(aTC)
    gl.vertexAttribPointer(aVP, 3, gl.FLOAT, false, 20, 0)
    gl.vertexAttribPointer(aTC, 2, gl.FLOAT, false, 20, 12)

    const identity = new Float32Array([1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1])
    gl.uniformMatrix4fv(gl.getUniformLocation(prog, 'uMVMatrix'), false, identity)
    gl.uniformMatrix4fv(gl.getUniformLocation(prog, 'uPMatrix'),  false, identity)

    const U: Record<string, WebGLUniformLocation | null> = {}
    ;[
      'uArtboardResolution','uL90100_Width','uL90100_MousePos','uL90100_TrackMouse',
      'uL90101_Time','uL90101_MousePos','uResolution','uMousePos',
      'uL0_ElemOpacity','uL1_Time','uL1_ElemOpacity',
      'uL2_SourceImage','uL2_ElemOpacity',
      'uL3_Texture','uL3_ElemOpacity',
      'uL4_Texture','uL4_ElemOpacity',
    ].forEach(n => { U[n] = gl.getUniformLocation(prog, n) })

    function loadTex(url: string): WebGLTexture {
      const t = gl!.createTexture()!
      gl!.bindTexture(gl!.TEXTURE_2D, t)
      gl!.texImage2D(gl!.TEXTURE_2D, 0, gl!.RGBA, 1, 1, 0, gl!.RGBA, gl!.UNSIGNED_BYTE, new Uint8Array([200,200,200,255]))
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        gl!.bindTexture(gl!.TEXTURE_2D, t)
        gl!.texImage2D(gl!.TEXTURE_2D, 0, gl!.RGBA, gl!.RGBA, gl!.UNSIGNED_BYTE, img)
        gl!.generateMipmap(gl!.TEXTURE_2D)
        gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, gl!.LINEAR_MIPMAP_LINEAR)
        gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, gl!.LINEAR)
        gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, gl!.CLAMP_TO_EDGE)
        gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, gl!.CLAMP_TO_EDGE)
      }
      img.src = url
      return t
    }

    function canvasToTex(cv: HTMLCanvasElement): WebGLTexture {
      const t = gl!.createTexture()!
      gl!.bindTexture(gl!.TEXTURE_2D, t)
      gl!.texImage2D(gl!.TEXTURE_2D, 0, gl!.RGBA, gl!.RGBA, gl!.UNSIGNED_BYTE, cv)
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, gl!.LINEAR)
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, gl!.LINEAR)
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, gl!.CLAMP_TO_EDGE)
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, gl!.CLAMP_TO_EDGE)
      return t
    }

    function makeSubtitleTex(): WebGLTexture {
      const cv = document.createElement('canvas')
      cv.width = artboardW; cv.height = artboardH
      const ctx = cv.getContext('2d')!
      ctx.clearRect(0, 0, artboardW, artboardH)
      const x = 0.2782 * artboardW
      const y = 0.93 * artboardH
      const w = 0.4436 * artboardW
      ;(ctx as CanvasRenderingContext2D & { letterSpacing?: string }).letterSpacing = '-0.5px'
      ctx.font = '400 18px Manrope, sans-serif'
      ctx.fillStyle = '#464646'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'top'
      const words = subtitle.split(' ')
      let line = ''; const lines: string[] = []
      for (const word of words) {
        const test = line + (line ? ' ' : '') + word
        if (ctx.measureText(test).width > w && line) { lines.push(line); line = word }
        else line = test
      }
      lines.push(line)
      lines.forEach((l, i) => ctx.fillText(l, x + w / 2, y - lines.length * 30 + i * 30))
      return canvasToTex(cv)
    }

    function makeTitleTex(): WebGLTexture {
      const cv = document.createElement('canvas')
      cv.width = artboardW; cv.height = artboardH
      const ctx = cv.getContext('2d')!
      ctx.clearRect(0, 0, artboardW, artboardH)
      const x = 0.1879 * artboardW
      const y = 0.66 * artboardH
      const w = 0.6242 * artboardW
      ;(ctx as CanvasRenderingContext2D & { letterSpacing?: string }).letterSpacing = '-3px'
      ctx.font = `400 ${titleFontSize}px "Instrument Serif", Georgia, serif`
      ctx.fillStyle = '#292929'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'alphabetic'
      const lines = [titleLine1, titleLine2].filter(l => l.trim() !== '')
      const lh = 144
      lines.forEach((l, i) => ctx.fillText(l, x + w / 2, y - lines.length * lh + lh * (i + 1)))
      return canvasToTex(cv)
    }

    const texPhoto = loadTex(imageUrl)
    let texL3: WebGLTexture | null = null
    let texL4: WebGLTexture | null = null

    function buildTextTextures() {
      texL3 = makeSubtitleTex()
      texL4 = makeTitleTex()
    }

    // Load fonts via FontFace API (works even if CSS @font-face hasn't settled yet)
    const faceSerif = new FontFace(
      'Instrument Serif',
      'url(https://fonts.gstatic.com/s/instrumentserif/v6/Qw3BZQNAs0TOZLtGp7o14WRTY5Ty.woff2)'
    )
    const faceManrope = new FontFace(
      'Manrope',
      'url(https://fonts.gstatic.com/s/manrope/v15/xn7gYHE41ni1AdIRggexSg.woff2)'
    )
    document.fonts.add(faceSerif)
    document.fonts.add(faceManrope)

    buildTextTextures() // immediate fallback (system fonts)
    Promise.all([faceSerif.load(), faceManrope.load()])
      .then(() => buildTextTextures())
      .catch(() => buildTextTextures())

    const mouse = { x: 0.5, y: 0.5 }
    const sm    = { x: 0.5, y: 0.5 }
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX / window.innerWidth
      mouse.y = 1.0 - e.clientY / window.innerHeight
    }
    window.addEventListener('mousemove', onMouseMove)

    const ro = new ResizeObserver(() => { resize(); buildTextTextures() })
    ro.observe(canvas)

    const START = performance.now()
    const t0    = performance.now()
    let animId  = 0

    function render(now: number) {
      animId = requestAnimationFrame(render)
      if (!texL3 || !texL4) return

      const elapsed = now - START
      const time    = (now - t0) * 0.001
      const W = canvas!.width
      const H = canvas!.height

      sm.x += (mouse.x - sm.x) * 0.08
      sm.y += (mouse.y - sm.y) * 0.08

      const wT    = Math.min(Math.max((elapsed - 100) / 2000, 0), 1)
      const width = 1.0 + (0.2698296930873341 - 1.0) * easeInOutExpo(wT)

      const mT         = Math.min(Math.max((elapsed - 150) / 2000, 0), 1)
      const trackMouse = 0.87 * easeInOutQuart(mT)

      gl.viewport(0, 0, W, H)
      gl.clearColor(0.933, 0.933, 0.933, 1)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.useProgram(prog)

      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, texPhoto)
      gl.uniform1i(U['uL2_SourceImage'], 0)
      gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, texL3)
      gl.uniform1i(U['uL3_Texture'], 1)
      gl.activeTexture(gl.TEXTURE2); gl.bindTexture(gl.TEXTURE_2D, texL4)
      gl.uniform1i(U['uL4_Texture'], 2)

      gl.uniform2f(U['uArtboardResolution'], artboardW, artboardH)
      gl.uniform2f(U['uResolution'], W, H)
      gl.uniform2f(U['uMousePos'], sm.x, sm.y)
      gl.uniform1f(U['uL0_ElemOpacity'], 1.0)
      gl.uniform1f(U['uL1_Time'], time * 60.0)
      gl.uniform1f(U['uL1_ElemOpacity'], 1.0)
      gl.uniform1f(U['uL2_ElemOpacity'], 1.0)
      gl.uniform1f(U['uL3_ElemOpacity'], 1.0)
      gl.uniform1f(U['uL4_ElemOpacity'], 1.0)
      gl.uniform1f(U['uL90100_Width'], width)
      gl.uniform1f(U['uL90100_TrackMouse'], trackMouse)
      gl.uniform2f(U['uL90100_MousePos'], sm.x, sm.y)
      gl.uniform1f(U['uL90101_Time'], time * 0.5)
      gl.uniform2f(U['uL90101_MousePos'], sm.x, sm.y)

      gl.bindBuffer(gl.ARRAY_BUFFER, vbo)
      gl.vertexAttribPointer(aVP, 3, gl.FLOAT, false, 20, 0)
      gl.vertexAttribPointer(aTC, 2, gl.FLOAT, false, 20, 12)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
    }

    animId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      ro.disconnect()
      gl.deleteProgram(prog)
      gl.deleteBuffer(vbo)
    }
  }, [imageUrl, titleLine1, titleLine2, subtitle, titleFontSize, artboardW, artboardH])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%', background: '#eeeeee' }}
    />
  )
}
