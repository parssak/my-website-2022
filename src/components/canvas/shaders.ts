import { useEffect } from "react";
import { extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

const FresnelShaderMaterial = shaderMaterial(
  {
    uBaseColor: new THREE.Color("#34D399"),
    uFresnelColor: new THREE.Color("#6FE7B7"),
    uFresnelPower: 1.5,
  },
  /*glsl*/ `
    varying vec3 vWorldNormal;
    varying vec3 vViewDirection;
    void main() {
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vWorldNormal = normalize(modelMatrix * vec4(normal, 0.0)).xyz;
        vViewDirection = normalize(cameraPosition - worldPosition.xyz);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
    `,
  /*glsl*/ `
    precision highp float;
    uniform vec3 uBaseColor;
    uniform vec3 uFresnelColor;
    uniform float uFresnelPower;
    varying vec3 vWorldNormal;
    varying vec3 vViewDirection;

    void main() {
        float fresnelFactor = abs(dot(vViewDirection, vWorldNormal));
        float inverseFresnelColor = 1.0 - fresnelFactor;

        // Shaping function
        fresnelFactor = pow(fresnelFactor, uFresnelPower);
        inverseFresnelColor = pow(inverseFresnelColor, uFresnelPower);

        // Mix the fresnel color and the base color
        vec3 color = mix(uFresnelColor, uBaseColor, inverseFresnelColor);
        gl_FragColor = vec4(fresnelFactor * uBaseColor + inverseFresnelColor * uFresnelColor, 1.0);
    }
  `
);

extend({ FresnelShaderMaterial });

const WaveShaderMaterial = shaderMaterial(
  // Uniform
  {
    uTime: 0,
    uColor: new THREE.Color(0.0, 0.0, 0.0),
  },
  // Vertex Shader
  `
    precision mediump float;
    varying vec2 vUv;
    varying float vWave;
    uniform float uTime;

    // snoise3
    vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}

    vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

    vec4 fade(vec4 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

    float snoise(vec3 v){
      const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
      const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
      // First corner
      vec3 i  = floor(v + dot(v, C.yyy) );
      vec3 x0 =   v - i + dot(i, C.xxx) ;
      // Other corners
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min( g.xyz, l.zxy );
      vec3 i2 = max( g.xyz, l.zxy );
      //   x0 = x0 - 0.0 + 0.0 * C.xxx;
      //   x1 = x0 - i1  + 1.0 * C.xxx;
      //   x2 = x0 - i2  + 2.0 * C.xxx;
      //   x3 = x0 - 1.0 + 3.0 * C.xxx;
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
      vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y
      // Permutations
      i = mod(i, 289.0 );
      vec4 p = permute( permute( permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
      // Gradients
      // ( N*N points uniformly over a square, mapped onto an octahedron.)
      float n_ = 1.0/7.0; // N=7
      vec3 ns = n_ * D.wyz - D.xzx;
      vec4 j = p - 49.0 * floor(p * ns.z *ns.z);  //  mod(p,N*N)
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)
      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      vec4 b0 = vec4( x.xy, y.xy );
      vec4 b1 = vec4( x.zw, y.zw );
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
      vec3 p0 = vec3(a0.xy,h.x);
      vec3 p1 = vec3(a0.zw,h.y);
      vec3 p2 = vec3(a1.xy,h.z);
      vec3 p3 = vec3(a1.zw,h.w);
      //Normalise gradients
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;
      // Mix final noise value
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                    dot(p2,x2), dot(p3,x3) ) ); 
    }



    void main() {
      vUv = uv;
      vec3 pos = position;
      float noiseFreq = 2.0;
      float noiseAmp = 0.4;
      vec3 noisePos = vec3(pos.x * noiseFreq + uTime, pos.y, pos.z);
      pos.z += snoise(noisePos) * noiseAmp;
      vWave = pos.z;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);  
    }
  `,
  // Fragment Shader
  `
    precision mediump float;
    uniform vec3 uColor;
    uniform float uTime;
    varying vec2 vUv;
    varying float vWave;
    void main() {
      float wave = vWave * 0.2;
      gl_FragColor = vec4(uColor, 1.0); 
    }
  `
);

extend({ WaveShaderMaterial });

export default function useShaders() {
  useEffect(() => {
    extend({ FresnelShaderMaterial });
    extend({ WaveShaderMaterial });
  }, []);
}
