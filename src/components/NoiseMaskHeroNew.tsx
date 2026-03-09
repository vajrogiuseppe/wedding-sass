import { useEffect, useRef } from 'react'

// ── Vertex shader (verbatim from hero.html) ──────────────────────────────────
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

// ── Fragment shader (verbatim from hero.html) ─────────────────────────────────
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
const float PI_L90100 = 3.14159265359;
const float PI_L90101 = 3.14159265359;
const float PI_L0 = 3.14159265359;
const int MAX_LEVEL_L1 = 4;
const float TAU_L1 = 6.28318530718;
const float TAU_L2 = 6.28318530718;
const float PI_L2 = 3.1415926;
const float STEPS_L3 = 24.0;
const float PI_L3 = 3.1415926;
const float STEPS_L4 = 24.0;
const float PI_L4 = 3.1415926;

out vec4 fragColor;

vec2 rotate2D_L90100(vec2 p, float angle) {
  float s = sin(angle); float c = cos(angle);
  return vec2(p.x*c - p.y*s, p.x*s + p.y*c);
}
vec2 getAnchorOffsets_L90100() { return vec2(0.5,0.5); }
vec3 getFillColor_L90100(vec2 localPos,vec2 elementSize,float signedDist,float maxInset){
  return vec3(0.4666666666666667,0.4666666666666667,0.4666666666666667);
}
float sdBox_L90100(vec2 p,vec2 b){
  vec2 d=abs(p)-b; return length(max(d,0.0))+min(max(d.x,d.y),0.0);
}
float sdEllipse_L90100(vec2 p,vec2 ab){
  vec2 q=p/ab; return (length(q)-1.0)*min(ab.x,ab.y);
}
float sdShape_L90100(vec2 canvasPosPx,vec2 elementPosPx,vec2 elementSizePx,float rotationTurns){
  vec2 p=vec2(0.0); vec2 halfSize=vec2(0.0);
  elementSizePx=abs(elementSizePx);
  vec2 centerPx=elementPosPx+elementSizePx*0.5;
  vec2 rel=canvasPosPx-centerPx;
  vec2 local=rotate2D_L90100(rel,-rotationTurns*TAU_L90100)+elementSizePx*0.5;
  p=local-elementSizePx*0.5; halfSize=elementSizePx*0.5;
  return sdEllipse_L90100(p,vec2(max(halfSize.x,0.00001),max(halfSize.y,0.00001)));
}
vec4 sampleShape_L90100(vec2 canvasUV){
  vec2 canvasPosPx=vec2(canvasUV.x*uArtboardResolution.x,(1.0-canvasUV.y)*uArtboardResolution.y);
  float absWidth=uL90100_Width*uArtboardResolution.x;
  float absHeight=0.4323*uArtboardResolution.y;
  absHeight=absWidth/1.0000;
  vec2 elementSizePx=vec2(absWidth,absHeight);
  vec2 elementPosPx=vec2(0.5002,0.5025)*uArtboardResolution-getAnchorOffsets_L90100()*elementSizePx;
  float dist=sdShape_L90100(canvasPosPx,elementPosPx,elementSizePx,0.0000);
  float aa=max(length(vec2(dFdx(dist),dFdy(dist))),0.75);
  float uvGrad=max(length(dFdx(canvasUV)),length(dFdy(canvasUV)));
  float seamFactor=smoothstep(0.01,0.03,uvGrad);
  aa=mix(aa,0.75,seamFactor);
  float fillAlpha=1.0-smoothstep(mix(0.0,-150.,0.0000),mix(aa,150.,0.0000),dist);
  fillAlpha=mix(fillAlpha,step(dist,0.0),seamFactor);
  vec2 localPos=rotate2D_L90100(canvasPosPx-(elementPosPx+elementSizePx*0.5),0.0000*-TAU_L90100)+elementSizePx*0.5;
  vec2 localSize=elementSizePx;
  vec2 centerPx=elementPosPx+elementSizePx*0.5;
  float centerDist=sdShape_L90100(centerPx,elementPosPx,elementSizePx,0.0000);
  float maxInset=max(-centerDist,0.00001);
  vec3 fillRgb=getFillColor_L90100(localPos,localSize,dist,maxInset);
  float finalFillAlpha=fillAlpha*1.0000;
  vec4 fill=vec4(fillRgb*finalFillAlpha,finalFillAlpha);
  float strokeAlpha=0.0;
  vec4 stroke=vec4(vec3(0,0,0)*strokeAlpha,strokeAlpha);
  vec4 col=stroke+fill*(1.0-stroke.a);
  return col;
}
vec4 computeParentSrc_L900(vec2 uv){
  vec2 pos=(uL90100_MousePos-0.5)*uL90100_TrackMouse;
  uv-=pos;
  return sampleShape_L90100(uv);
}
float ease_L90101(int easingFunc,float t){ return t; }
mat2 rot_L90101(float a){ return mat2(cos(a),-sin(a),sin(a),cos(a)); }
vec3 hash3_L90101(vec2 p){
  vec3 q=vec3(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3)),dot(p,vec2(419.2,371.9)));
  return fract(sin(q)*43758.5453);
}
float voronoise_L90101(vec2 uv,vec2 textureCoord,float direction,float time,float phase){
  float u=1.; float v=1.;
  uv*=vec2(direction,1.0-direction); uv*=2.91;
  vec2 x=uv; vec2 p=floor(x); vec2 f=fract(x);
  float k=1.0+63.0*pow(1.0-v,4.0);
  float va=0.0; float wt=0.0;
  for(int j=-2;j<=2;j++) for(int i=-2;i<=2;i++){
    vec2 g=vec2(float(i),float(j));
    vec3 o=hash3_L90101(p+g)*vec3(u,u,1.0);
    o.xy+=0.5*vec2(sin(time*0.1+phase+o.x*6.28));
    vec2 r=g-f+o.xy;
    float dd=dot(r,r);
    float ww=pow(1.0-smoothstep(0.0,1.414,sqrt(dd)),k);
    va+=o.z*ww; wt+=ww;
  }
  return va/wt;
}
vec2 getVoronoiNoise_L90101(vec2 uv,vec2 textureCoord,float direction,float time,float phase,float turbulence){
  vec2 offset=vec2(
    voronoise_L90101(uv,textureCoord,direction,time,phase),
    voronoise_L90101(uv+vec2(9.2,1.2),textureCoord,direction,time,phase)
  );
  return mix(textureCoord,offset,turbulence);
}
vec2 getNoiseOffset_L90101(vec2 uv,vec2 textureCoord,float direction,float phase,float time,float turbulence){
  return getVoronoiNoise_L90101(uv,textureCoord,direction,time,phase,turbulence);
}
vec2 distortUV_L90101(vec2 uv){
  float aspectRatio=uResolution.x/uResolution.y;
  vec2 mPos=vec2(0.5,0.5016354529616724)+mix(vec2(0),(uL90101_MousePos-0.5),0.0000);
  float dist=ease_L90101(0,max(0.,1.-distance(uv*vec2(aspectRatio,1),mPos*vec2(aspectRatio,1))*4.*(1.-1.0000)));
  if(dist<=0.001){ return uv; }
  if(0.1500<=0.001){ return uv; }
  vec2 pos=mix(vec2(0.5,0.5016354529616724),mPos,floor(1.0000));
  vec2 drift=vec2(0,0.0000*uL90101_Time*0.0125);
  pos+=drift*rot_L90101(0.0216*-2.*PI_L90101);
  vec2 st=(uv-pos)*vec2(aspectRatio,1);
  st*=12.*1.1660;
  st=rot_L90101(0.0216*-2.*PI_L90101)*st;
  vec2 noise=getNoiseOffset_L90101(st,uv,0.5000,0.0000,uL90101_Time,0.1500);
  return mix(uv,noise,dist);
}
vec2 rotate_L0(vec2 coord,float angle){
  float s=sin(angle); float c=cos(angle);
  return vec2(coord.x*c-coord.y*s,coord.x*s+coord.y*c);
}
vec3 getBgColor_L0(vec2 uv){ return vec3(0.9333333333333333,0.9333333333333333,0.9333333333333333); }
uvec2 pcg2d_L1(uvec2 v){
  v=v*1664525u+1013904223u;
  v.x+=v.y*v.y*1664525u+1013904223u;
  v.y+=v.x*v.x*1664525u+1013904223u;
  v^=v>>16u;
  v.x+=v.y*v.y*1664525u+1013904223u;
  v.y+=v.x*v.x*1664525u+1013904223u;
  return v;
}
float randFibo_L1(vec2 p){
  uvec2 v=floatBitsToUint(p); v=pcg2d_L1(v);
  uint r=v.x^v.y;
  return float(r)/float(0xffffffffu);
}
float getRandNoise_L1(vec2 st,vec2 offset){ return randFibo_L1(st+offset)-0.005; }
vec3 dither_L1(vec3 color,vec2 st){
  float delta=floor(uL1_Time);
  vec2 offset=vec2(randFibo_L1(vec2(123,16)+delta),randFibo_L1(vec2(56,96)+delta));
  float noise=getRandNoise_L1(st,offset);
  float dither_threshold=max(0.0001,0.0700);
  float num_levels=1.0/dither_threshold;
  return floor(color*num_levels+noise)/num_levels;
}
vec4 sampleImage_L2(vec2 canvasUV,vec2 mouseOffset,vec2 mouseRotOffset){
  vec2 canvasPos=vec2(canvasUV.x*uArtboardResolution.x,(1.0-canvasUV.y)*uArtboardResolution.y);
  float imageAspect=vec2(1500,841).x/vec2(1500,841).y;
  float canvasAspect=uArtboardResolution.x/uArtboardResolution.y;
  vec2 fitSize=vec2(
    (canvasAspect<imageAspect)?uArtboardResolution.y*imageAspect:uArtboardResolution.x,
    (canvasAspect<imageAspect)?uArtboardResolution.y:uArtboardResolution.x/imageAspect
  );
  vec2 offset2=(uArtboardResolution-fitSize)*0.5;
  vec2 adjustedPos=canvasPos+mouseOffset;
  vec2 imageUV=(adjustedPos-offset2)/fitSize;
  vec2 flippedUV=vec2(imageUV.x,1.0-imageUV.y);
  vec4 color=textureLod(uL2_SourceImage,flippedUV,0.0);
  if(imageUV.x>=0.0&&imageUV.x<=1.0&&imageUV.y>=0.0&&imageUV.y<=1.0){ return color; }
  else { return vec4(0.0); }
}
vec4 applyImageAdjustments_L2(vec4 color){
  color.rgb=clamp(color.rgb,0.0,1.0); color.rgb*=color.a; return color;
}
vec4 computeLayer_L900(vec2 uv){
  vec2 suv_z1=distortUV_L90101(uv);
  vec4 stackResult=computeParentSrc_L900(suv_z1);
  return stackResult;
}
vec4 computeLayer_L0(vec2 uv){
  vec2 pos=vec2(0.5,0.5)+mix(vec2(0),(uMousePos-0.5),0.0000);
  uv-=pos; uv/=max(0.5000*2.,1e-5);
  uv=rotate_L0(uv,(0.0000-0.5)*2.*PI_L0);
  return vec4(getBgColor_L0(uv),1.0000);
}
vec4 computeLayer_L1(vec2 uv,vec4 prevLayerColor){
  vec4 color=prevLayerColor;
  color.rgb=mix(color.rgb,dither_L1(color.rgb,vTextureCoord),1.0000);
  return color;
}
vec4 computeLayer_L2(vec2 uv){
  vec2 mouseOffsetUV=(uMousePos-0.5)*0.0000;
  vec2 mouseOffsetPx=mouseOffsetUV;
  vec2 mouseRotOffset=(uMousePos-0.5)*0.0000*PI_L2*0.5;
  uv-=mouseOffsetUV;
  vec4 imgColor=sampleImage_L2(uv,mouseOffsetPx,mouseRotOffset);
  imgColor=applyImageAdjustments_L2(imgColor);
  return imgColor;
}
vec4 computeLayer_L3(vec2 uv){
  vec2 pos=vec2(0); pos=mix(vec2(0),(uMousePos-0.5),0.0000); uv-=pos;
  return texture(uL3_Texture,uv);
}
vec4 computeLayer_L4(vec2 uv){
  vec2 pos=vec2(0); pos=mix(vec2(0),(uMousePos-0.5),0.0000); uv-=pos;
  return texture(uL4_Texture,uv);
}

void main(){
  vec2 uv=vTextureCoord;
  float maskAlpha=computeLayer_L900(uv).a;
  vec4 result=vec4(0.0);
  vec4 c0=computeLayer_L0(uv); c0*=uL0_ElemOpacity;
  result=c0+result*(1.0-c0.a);
  vec4 c1=computeLayer_L1(uv,result); c1*=uL1_ElemOpacity;
  result=c1+result*(1.0-c1.a);
  vec4 maskBase=result;
  if(maskAlpha>=0.004){
    vec4 c2=computeLayer_L2(uv); c2*=uL2_ElemOpacity;
    result=c2+result*(1.0-c2.a);
  }
  result=mix(maskBase,result,maskAlpha);
  vec4 c3=computeLayer_L3(uv); c3*=uL3_ElemOpacity;
  result=c3+result*(1.0-c3.a);
  vec4 c4=computeLayer_L4(uv); c4*=uL4_ElemOpacity;
  result=c4+result*(1.0-c4.a);
  fragColor=result;
}`

// ── Easing (verbatim from hero.html) ─────────────────────────────────────────
function easeInOutExpo(t: number): number {
  if (t <= 0) return 0
  if (t >= 1) return 1
  return t < 0.5 ? Math.pow(2, 20 * t - 10) / 2 : (2 - Math.pow(2, -20 * t + 10)) / 2
}
function easeInOutQuart(t: number): number {
  return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2
}

// ── Props ─────────────────────────────────────────────────────────────────────
export interface NoiseMaskHeroNewProps {
  imageUrl?: string
  titleLines?: string[]
  subtitle?: string
  className?: string
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function NoiseMaskHeroNew({
  imageUrl = 'https://assets.unicorn.studio/images/d86YggFJjQTQnc3f9iBINHmvAMJ3/remix_16453%20(1).jpg',
  titleLines = ['Where Purpose', 'Gathers.'],
  subtitle = 'Asterisk Digital is a lifelong learning community for people who are changing the face of venture capital.',
  className,
}: NoiseMaskHeroNewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const glOrNull = canvas.getContext('webgl2')
    if (!glOrNull) { console.error('WebGL2 not supported'); return }
    const gl: WebGL2RenderingContext = glOrNull

    // ── resize (verbatim from hero.html) ──────────────────────────────────────
    function resize() {
      canvas!.width  = Math.round(window.innerWidth  * window.devicePixelRatio)
      canvas!.height = Math.round(window.innerHeight * window.devicePixelRatio)
      canvas!.style.width  = window.innerWidth  + 'px'
      canvas!.style.height = window.innerHeight + 'px'
    }
    resize()

    // ── makeProgram (verbatim from hero.html) ─────────────────────────────────
    function makeProgram(vsSrc: string, fsSrc: string): WebGLProgram {
      function compile(type: number, src: string): WebGLShader {
        const s = gl!.createShader(type)!
        gl!.shaderSource(s, src)
        gl!.compileShader(s)
        if (!gl!.getShaderParameter(s, gl!.COMPILE_STATUS))
          console.error('Shader error:', gl!.getShaderInfoLog(s))
        return s
      }
      const p = gl!.createProgram()!
      gl!.attachShader(p, compile(gl!.VERTEX_SHADER, vsSrc))
      gl!.attachShader(p, compile(gl!.FRAGMENT_SHADER, fsSrc))
      gl!.linkProgram(p)
      if (!gl!.getProgramParameter(p, gl!.LINK_STATUS))
        console.error('Program error:', gl!.getProgramInfoLog(p))
      return p
    }

    const prog = makeProgram(VS, FS)
    gl.useProgram(prog)

    // ── Geometry ──────────────────────────────────────────────────────────────
    const verts = new Float32Array([
      -1,-1,0, 0,0,
       1,-1,0, 1,0,
      -1, 1,0, 0,1,
       1,-1,0, 1,0,
       1, 1,0, 1,1,
      -1, 1,0, 0,1,
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

    // ── Uniform locations ─────────────────────────────────────────────────────
    const U: Record<string, WebGLUniformLocation | null> = {}
    ;[
      'uArtboardResolution','uL90100_Width','uL90100_MousePos','uL90100_TrackMouse',
      'uL90101_Time','uL90101_MousePos','uResolution','uMousePos',
      'uL0_ElemOpacity','uL1_Time','uL1_ElemOpacity',
      'uL2_SourceImage','uL2_ElemOpacity',
      'uL3_Texture','uL3_ElemOpacity',
      'uL4_Texture','uL4_ElemOpacity',
    ].forEach(n => { U[n] = gl.getUniformLocation(prog, n) })

    // ── loadTex (verbatim from hero.html) ─────────────────────────────────────
    function loadTex(url: string): WebGLTexture {
      const t = gl!.createTexture()!
      gl!.bindTexture(gl!.TEXTURE_2D, t)
      gl!.texImage2D(gl!.TEXTURE_2D,0,gl!.RGBA,1,1,0,gl!.RGBA,gl!.UNSIGNED_BYTE,new Uint8Array([200,200,200,255]))
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        gl!.bindTexture(gl!.TEXTURE_2D, t)
        gl!.texImage2D(gl!.TEXTURE_2D,0,gl!.RGBA,gl!.RGBA,gl!.UNSIGNED_BYTE,img)
        gl!.generateMipmap(gl!.TEXTURE_2D)
        gl!.texParameteri(gl!.TEXTURE_2D,gl!.TEXTURE_MIN_FILTER,gl!.LINEAR_MIPMAP_LINEAR)
        gl!.texParameteri(gl!.TEXTURE_2D,gl!.TEXTURE_MAG_FILTER,gl!.LINEAR)
        gl!.texParameteri(gl!.TEXTURE_2D,gl!.TEXTURE_WRAP_S,gl!.CLAMP_TO_EDGE)
        gl!.texParameteri(gl!.TEXTURE_2D,gl!.TEXTURE_WRAP_T,gl!.CLAMP_TO_EDGE)
      }
      img.src = url
      return t
    }

    // ── makeCanvasTex (verbatim from hero.html) ───────────────────────────────
    const AW = 1440, AH = 900
    function makeCanvasTex(drawFn: (ctx: CanvasRenderingContext2D) => void): WebGLTexture {
      const cv = document.createElement('canvas')
      cv.width = AW; cv.height = AH
      const ctx = cv.getContext('2d')!
      drawFn(ctx)
      const t = gl!.createTexture()!
      gl!.bindTexture(gl!.TEXTURE_2D, t)
      gl!.texImage2D(gl!.TEXTURE_2D,0,gl!.RGBA,gl!.RGBA,gl!.UNSIGNED_BYTE,cv)
      gl!.texParameteri(gl!.TEXTURE_2D,gl!.TEXTURE_MIN_FILTER,gl!.LINEAR)
      gl!.texParameteri(gl!.TEXTURE_2D,gl!.TEXTURE_MAG_FILTER,gl!.LINEAR)
      gl!.texParameteri(gl!.TEXTURE_2D,gl!.TEXTURE_WRAP_S,gl!.CLAMP_TO_EDGE)
      gl!.texParameteri(gl!.TEXTURE_2D,gl!.TEXTURE_WRAP_T,gl!.CLAMP_TO_EDGE)
      return t
    }

    // ── drawSubtitle / drawTitle (verbatim from hero.html, props as text) ─────
    function drawSubtitle(ctx: CanvasRenderingContext2D) {
      ctx.clearRect(0, 0, AW, AH)
      const x = 0.2782 * AW
      const y = 0.93 * AH
      const w = 0.4436 * AW
      ctx.font = '400 18px Manrope, sans-serif'
      ctx.fillStyle = '#464646'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'top'
      const words = subtitle.split(' ')
      let line = ''
      const lines: string[] = []
      for (const word of words) {
        const test = line + (line ? ' ' : '') + word
        if (ctx.measureText(test).width > w && line) { lines.push(line); line = word }
        else line = test
      }
      lines.push(line)
      const totalH = lines.length * 30
      const startY = y - totalH
      lines.forEach((l, i) => ctx.fillText(l, x + w / 2, startY + i * 30))
    }

    function drawTitle(ctx: CanvasRenderingContext2D) {
      ctx.clearRect(0, 0, AW, AH)
      const x = 0.1879 * AW
      const y = 0.66 * AH
      const w = 0.6242 * AW
      ctx.font = '400 149px "Instrument Serif", Georgia, serif'
      ctx.fillStyle = '#292929'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'alphabetic'
      ;(ctx as CanvasRenderingContext2D & { letterSpacing?: string }).letterSpacing = '-3px'
      const lh = 144
      const totalH = titleLines.length * lh
      const startY = y
      titleLines.forEach((l, i) => {
        ctx.fillText(l, x + w / 2, startY - totalH + lh * (i + 1))
      })
    }

    const texPhoto = loadTex(imageUrl)
    let texL3: WebGLTexture | null = null
    let texL4: WebGLTexture | null = null

    // ── updateTexCanvases (verbatim from hero.html) ───────────────────────────
    function updateTexCanvases() {
      texL3 = makeCanvasTex(drawSubtitle)
      texL4 = makeCanvasTex(drawTitle)
    }

    // Load fonts via FontFace with unicorn.studio CDN (verbatim from hero.html)
    Promise.all([
      new FontFace('Manrope', 'url(https://assets.unicorn.studio/fonts/google_fonts/remix_xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk79FO_F87jxeN7B.ttf)').load(),
      new FontFace('Instrument Serif', 'url(https://assets.unicorn.studio/fonts/google_fonts/jizBRFtNs2ka5fXjeivQ4LroWlx-2zIZj1bIkNo.ttf)').load(),
    ]).then(fonts => {
      fonts.forEach(f => document.fonts.add(f))
      updateTexCanvases()
    }).catch(() => { updateTexCanvases() })

    // immediate fallback so something renders before fonts load
    updateTexCanvases()

    // ── Mouse (verbatim from hero.html) ───────────────────────────────────────
    const mouse = { x: 0.5, y: 0.5 }
    const sm    = { x: 0.5, y: 0.5 }
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX / window.innerWidth
      mouse.y = 1.0 - e.clientY / window.innerHeight
    }
    document.addEventListener('mousemove', onMouseMove)

    // ── Resize listener (verbatim from hero.html) ─────────────────────────────
    const onResize = () => { resize(); updateTexCanvases() }
    window.addEventListener('resize', onResize)

    // ── Render loop (verbatim from hero.html) ─────────────────────────────────
    const START = performance.now()
    const t0    = performance.now()
    let animId  = 0

    function render(now: number) {
      animId = requestAnimationFrame(render)
      if (!texL3 || !texL4) return

      const elapsed = now - START
      const time    = (now - t0) * 0.001

      sm.x += (mouse.x - sm.x) * 0.08
      sm.y += (mouse.y - sm.y) * 0.08

      const wT    = Math.min(Math.max((elapsed - 100) / 2000, 0), 1)
      const width = 1.0 + (0.2698296930873341 - 1.0) * easeInOutExpo(wT)

      const mT         = Math.min(Math.max((elapsed - 150) / 2000, 0), 1)
      const trackMouse = 0.87 * easeInOutQuart(mT)

      const W = canvas!.width
      const H = canvas!.height
      gl.viewport(0, 0, W, H)
      gl.clearColor(0, 0, 0, 1)
      gl.clear(gl.COLOR_BUFFER_BIT)

      gl.useProgram(prog)

      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, texPhoto)
      gl.uniform1i(U['uL2_SourceImage'], 0)
      gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, texL3)
      gl.uniform1i(U['uL3_Texture'], 1)
      gl.activeTexture(gl.TEXTURE2); gl.bindTexture(gl.TEXTURE_2D, texL4)
      gl.uniform1i(U['uL4_Texture'], 2)

      gl.uniform2f(U['uArtboardResolution'], AW, AH)
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
      document.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      gl.deleteProgram(prog)
      gl.deleteBuffer(vbo)
    }
  }, [imageUrl, titleLines, subtitle])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: 'block', background: '#eeeeee' }}
    />
  )
}
