/*

*/
(window.webpackJsonp = window.webpackJsonp || []).push([
  [5],
  {
    136: function (e, t, r) {
      "use strict";
      r.r(t),
        (t.default =
          "#define GLSLIFY 1\n//\n// Description : Array and textureless GLSL 2D/3D/4D simplex\n//               noise functions.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289(vec4 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute(vec4 x) {\n     return mod289(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nfloat snoise(vec3 v)\n  {\n  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);\n\n// First corner\n  vec3 i  = floor(v + dot(v, C.yyy) );\n  vec3 x0 =   v - i + dot(i, C.xxx) ;\n\n// Other corners\n  vec3 g = step(x0.yzx, x0.xyz);\n  vec3 l = 1.0 - g;\n  vec3 i1 = min( g.xyz, l.zxy );\n  vec3 i2 = max( g.xyz, l.zxy );\n\n  //   x0 = x0 - 0.0 + 0.0 * C.xxx;\n  //   x1 = x0 - i1  + 1.0 * C.xxx;\n  //   x2 = x0 - i2  + 2.0 * C.xxx;\n  //   x3 = x0 - 1.0 + 3.0 * C.xxx;\n  vec3 x1 = x0 - i1 + C.xxx;\n  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y\n  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y\n\n// Permutations\n  i = mod289(i);\n  vec4 p = permute( permute( permute(\n             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\n           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))\n           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n\n// Gradients: 7x7 points over a square, mapped onto an octahedron.\n// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)\n  float n_ = 0.142857142857; // 1.0/7.0\n  vec3  ns = n_ * D.wyz - D.xzx;\n\n  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)\n\n  vec4 x_ = floor(j * ns.z);\n  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)\n\n  vec4 x = x_ *ns.x + ns.yyyy;\n  vec4 y = y_ *ns.x + ns.yyyy;\n  vec4 h = 1.0 - abs(x) - abs(y);\n\n  vec4 b0 = vec4( x.xy, y.xy );\n  vec4 b1 = vec4( x.zw, y.zw );\n\n  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;\n  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;\n  vec4 s0 = floor(b0)*2.0 + 1.0;\n  vec4 s1 = floor(b1)*2.0 + 1.0;\n  vec4 sh = -step(h, vec4(0.0));\n\n  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;\n\n  vec3 p0 = vec3(a0.xy,h.x);\n  vec3 p1 = vec3(a0.zw,h.y);\n  vec3 p2 = vec3(a1.xy,h.z);\n  vec3 p3 = vec3(a1.zw,h.w);\n\n//Normalise gradients\n  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n  p0 *= norm.x;\n  p1 *= norm.y;\n  p2 *= norm.z;\n  p3 *= norm.w;\n\n// Mix final noise value\n  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n  m = m * m;\n  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),\n                                dot(p2,x2), dot(p3,x3) ) );\n  }\n\n");
    },
    153: function (e, t, r) {
      "use strict";
      r.r(t),
        (t.default =
          "#define GLSLIFY 1\nuniform sampler2D baseTexture;\nuniform sampler2D bloomTexture;\nvarying vec2 vUv;\nvoid main() {\n    gl_FragColor = ( texture2D( baseTexture, vUv ) + vec4( 1.0 ) * texture2D( bloomTexture, vUv ) );\n}");
    },
    154: function (e, t, r) {
      "use strict";
      r.r(t),
        (t.default =
          "#define GLSLIFY 1\nvarying vec2 vUv;\nvoid main() {\n    vUv = uv;\n    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}");
    },
    155: function (e, t, r) {
      "use strict";
      r.r(t),
        (t.default =
          "#define GLSLIFY 1\nvarying vec4 vUv;\nvarying vec3 pos;\n\nuniform vec3 color;\nuniform sampler2D tDiffuse;\nuniform float u_time;\nuniform sampler2D u_map;\nuniform float u_reflectionStrength;\nuniform float u_noiseSpread;\n\nfloat blendOverlay( float base, float blend ) {\n    return( base < 0.5 ? ( 2.0 * base * blend ) : ( 1.0 - 2.0 * ( 1.0 - base ) * ( 1.0 - blend ) ) );\n}\n\nvec3 blendOverlay( vec3 base, vec3 blend ) {\n    return vec3(\n        blendOverlay( base.r, blend.r ),\n        blendOverlay( base.g, blend.g ),\n        blendOverlay( base.b, blend.b )\n    );\n}\n\nvoid main() {\n    \n    vec4 base = texture2DProj( tDiffuse, vUv );\n    vec4 map = texture2D( u_map, vec2(pos.xy) );\n\n    vec4 reflectionColor = vec4(\n        blendOverlay( base.rgb, color ),\n        1.0\n    );\n    float noise = snoise(vec3(pos.xy, vec2(u_time)) * u_noiseSpread) * u_reflectionStrength;\n\n    vec4 color = reflectionColor * vec4(vec3(noise), 1.0);\n    if (color.r == 0.0 && color.g == 0.0 && color.b == 0.0) {\n        color = vec4(0.0, 0.0, 0.0, 0.0);\n    }\n\n    gl_FragColor = color;\n    \n}");
    },
    156: function (e, t, r) {
      "use strict";
      r.r(t),
        (t.default =
          "#define GLSLIFY 1\nuniform mat4 textureMatrix;\nvarying vec4 vUv;\nvarying vec3 pos;\nuniform float u_size;\nvoid main() {\n    vUv = textureMatrix * vec4( position, 1.0 );\n    pos = (position / u_size) + 0.5;\n    pos.y -= 0.025;\n    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}");
    },
    173: function (e, t, r) {
      "use strict";
      r.r(t),
        (t.default =
          "#define GLSLIFY 1\nvec3 transformed = vec3( position );\n\nfloat noiseDistortion = snoise(\n    vec3(\n        (transformed.xy) / (u_diameter * u_distortionSpread) + vec2(u_time),\n        0.\n    )\n) * u_distortionProgress;\ntransformed.z += noiseDistortion * u_diameter * u_distortionStrength;\n");
    },
    221: function (e, t, r) {
      "use strict";
      r.r(t);
      var n = r(3),
        o = r(8),
        i = r.n(o),
        a = r(17),
        s = r.n(a),
        l = r(1),
        u = r(0),
        c = r(12),
        f = r(129),
        p = r(45),
        d = r(5),
        h = r(38),
        v = r(2),
        m = r(81),
        y = r(13),
        b = r(26),
        g = r(4),
        _ = r(31),
        x = r(68),
        S = r(58),
        w = r(135),
        P = r(88),
        O = r(84),
        T = r(43);
      const j = {
        uniforms: {},
        vertexShader:
          "\n\n\t\tvoid main() {\n\n\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n\t\t}",
        fragmentShader:
          "\n\n\t\tvoid main() {\n\n\t\t\tgl_FragColor = vec4( 1.0, 0.0, 0.0, 0.5 );\n\n\t\t}",
      };
      var M = r(6),
        C = r.n(M),
        R = r(21),
        z = r(60);
      const D = {
        shaderID: "luminosityHighPass",
        uniforms: {
          tDiffuse: { value: null },
          luminosityThreshold: { value: 1 },
          smoothWidth: { value: 1 },
          defaultColor: { value: new v.i(0) },
          defaultOpacity: { value: 0 },
        },
        vertexShader:
          "\n\n\t\tvarying vec2 vUv;\n\n\t\tvoid main() {\n\n\t\t\tvUv = uv;\n\n\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n\t\t}",
        fragmentShader:
          "\n\n\t\tuniform sampler2D tDiffuse;\n\t\tuniform vec3 defaultColor;\n\t\tuniform float defaultOpacity;\n\t\tuniform float luminosityThreshold;\n\t\tuniform float smoothWidth;\n\n\t\tvarying vec2 vUv;\n\n\t\tvoid main() {\n\n\t\t\tvec4 texel = texture2D( tDiffuse, vUv );\n\n\t\t\tvec3 luma = vec3( 0.299, 0.587, 0.114 );\n\n\t\t\tfloat v = dot( texel.xyz, luma );\n\n\t\t\tvec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );\n\n\t\t\tfloat alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );\n\n\t\t\tgl_FragColor = mix( outputColor, texel, alpha );\n\n\t\t}",
      };
      function k(e) {
        return (
          (k =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    "function" == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? "symbol"
                    : typeof e;
                }),
          k(e)
        );
      }
      function F(e, t) {
        for (var r = 0; r < t.length; r++) {
          var n = t[r];
          (n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            "value" in n && (n.writable = !0),
            Object.defineProperty(e, n.key, n);
        }
      }
      function U(e, t) {
        return (
          (U =
            Object.setPrototypeOf ||
            function (e, t) {
              return (e.__proto__ = t), e;
            }),
          U(e, t)
        );
      }
      function B(e) {
        var t = (function () {
          if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ("function" == typeof Proxy) return !0;
          try {
            return (
              Boolean.prototype.valueOf.call(
                Reflect.construct(Boolean, [], function () {})
              ),
              !0
            );
          } catch (e) {
            return !1;
          }
        })();
        return function () {
          var r,
            n = I(e);
          if (t) {
            var o = I(this).constructor;
            r = Reflect.construct(n, arguments, o);
          } else r = n.apply(this, arguments);
          return E(this, r);
        };
      }
      function E(e, t) {
        if (t && ("object" === k(t) || "function" == typeof t)) return t;
        if (void 0 !== t)
          throw new TypeError(
            "Derived constructors may only return object or undefined"
          );
        return (function (e) {
          if (void 0 === e)
            throw new ReferenceError(
              "this hasn't been initialised - super() hasn't been called"
            );
          return e;
        })(e);
      }
      function I(e) {
        return (
          (I = Object.setPrototypeOf
            ? Object.getPrototypeOf
            : function (e) {
                return e.__proto__ || Object.getPrototypeOf(e);
              }),
          I(e)
        );
      }
      var L = (function (e) {
        !(function (e, t) {
          if ("function" != typeof t && null !== t)
            throw new TypeError(
              "Super expression must either be null or a function"
            );
          (e.prototype = Object.create(t && t.prototype, {
            constructor: { value: e, writable: !0, configurable: !0 },
          })),
            t && U(e, t);
        })(i, e);
        var t,
          r,
          n,
          o = B(i);
        function i(e, t, r, n) {
          var a;
          !(function (e, t) {
            if (!(e instanceof t))
              throw new TypeError("Cannot call a class as a function");
          })(this, i),
            ((a = o.call(this)).strength = void 0 !== t ? t : 1),
            (a.radius = r),
            (a.threshold = n),
            (a.resolution =
              void 0 !== e ? new v.mb(e.x, e.y) : new v.mb(256, 256)),
            (a.clearColor = new v.i(0, 0, 0));
          var s = { minFilter: v.z, magFilter: v.z, format: v.U };
          (a.renderTargetsHorizontal = []),
            (a.renderTargetsVertical = []),
            (a.nMips = 5);
          var l = Math.round(a.resolution.x / 2),
            u = Math.round(a.resolution.y / 2);
          (a.renderTargetBright = new v.qb(l, u, s)),
            (a.renderTargetBright.texture.name = "UnrealBloomPass.bright"),
            (a.renderTargetBright.texture.generateMipmaps = !1);
          for (var c = 0; c < a.nMips; c++) {
            var f = new v.qb(l, u, s);
            (f.texture.name = "UnrealBloomPass.h".concat(c)),
              (f.texture.generateMipmaps = !1),
              a.renderTargetsHorizontal.push(f);
            var p = new v.qb(l, u, s);
            (p.texture.name = "UnrealBloomPass.v".concat(c)),
              (p.texture.generateMipmaps = !1),
              a.renderTargetsVertical.push(p),
              (l = Math.round(l / 2)),
              (u = Math.round(u / 2));
          }
          void 0 === D &&
            console.error(
              "THREE.UnrealBloomPass relies on LuminosityHighPassShader"
            );
          var d = D;
          (a.highPassUniforms = v.kb.clone(d.uniforms)),
            (a.highPassUniforms.luminosityThreshold.value = n),
            (a.highPassUniforms.smoothWidth.value = 0.01),
            (a.materialHighPassFilter = new v.ab({
              uniforms: a.highPassUniforms,
              vertexShader: d.vertexShader,
              fragmentShader: d.fragmentShader,
              defines: {},
            })),
            (a.separableBlurMaterials = []);
          var h = [3, 5, 7, 9, 11];
          (l = Math.round(a.resolution.x / 2)),
            (u = Math.round(a.resolution.y / 2));
          for (var m = 0; m < a.nMips; m++)
            a.separableBlurMaterials.push(a.getSeperableBlurMaterial(h[m])),
              (a.separableBlurMaterials[m].uniforms.texSize.value = new v.mb(
                l,
                u
              )),
              (l = Math.round(l / 2)),
              (u = Math.round(u / 2));
          (a.compositeMaterial = a.getCompositeMaterial(a.nMips)),
            (a.compositeMaterial.uniforms.blurTexture1.value =
              a.renderTargetsVertical[0].texture),
            (a.compositeMaterial.uniforms.blurTexture2.value =
              a.renderTargetsVertical[1].texture),
            (a.compositeMaterial.uniforms.blurTexture3.value =
              a.renderTargetsVertical[2].texture),
            (a.compositeMaterial.uniforms.blurTexture4.value =
              a.renderTargetsVertical[3].texture),
            (a.compositeMaterial.uniforms.blurTexture5.value =
              a.renderTargetsVertical[4].texture),
            (a.compositeMaterial.uniforms.bloomStrength.value = t),
            (a.compositeMaterial.uniforms.bloomRadius.value = 0.1),
            (a.compositeMaterial.needsUpdate = !0);
          (a.compositeMaterial.uniforms.bloomFactors.value = [
            1, 0.8, 0.6, 0.4, 0.2,
          ]),
            (a.bloomTintColors = [
              new v.nb(1, 1, 1),
              new v.nb(1, 1, 1),
              new v.nb(1, 1, 1),
              new v.nb(1, 1, 1),
              new v.nb(1, 1, 1),
            ]),
            (a.compositeMaterial.uniforms.bloomTintColors.value =
              a.bloomTintColors),
            void 0 === z.a &&
              console.error("THREE.UnrealBloomPass relies on CopyShader");
          var y = z.a;
          return (
            (a.copyUniforms = v.kb.clone(y.uniforms)),
            (a.copyUniforms.opacity.value = 1),
            (a.materialCopy = new v.ab({
              uniforms: a.copyUniforms,
              vertexShader: y.vertexShader,
              fragmentShader: y.fragmentShader,
              blending: v.a,
              depthTest: !1,
              depthWrite: !1,
              transparent: !0,
            })),
            (a.enabled = !0),
            (a.needsSwap = !1),
            (a._oldClearColor = new v.i()),
            (a.oldClearAlpha = 1),
            (a.basic = new v.H()),
            (a.fsQuad = new R.a(null)),
            a
          );
        }
        return (
          (t = i),
          (r = [
            {
              key: "dispose",
              value: function () {
                for (var e = 0; e < this.renderTargetsHorizontal.length; e++)
                  this.renderTargetsHorizontal[e].dispose();
                for (var t = 0; t < this.renderTargetsVertical.length; t++)
                  this.renderTargetsVertical[t].dispose();
                this.renderTargetBright.dispose();
              },
            },
            {
              key: "setSize",
              value: function (e, t) {
                var r = Math.round(e / 2),
                  n = Math.round(t / 2);
                this.renderTargetBright.setSize(r, n);
                for (var o = 0; o < this.nMips; o++)
                  this.renderTargetsHorizontal[o].setSize(r, n),
                    this.renderTargetsVertical[o].setSize(r, n),
                    (this.separableBlurMaterials[o].uniforms.texSize.value =
                      new v.mb(r, n)),
                    (r = Math.round(r / 2)),
                    (n = Math.round(n / 2));
              },
            },
            {
              key: "render",
              value: function (e, t, r, n, o) {
                e.getClearColor(this._oldClearColor),
                  (this.oldClearAlpha = e.getClearAlpha());
                var a = e.autoClear;
                (e.autoClear = !1),
                  e.setClearColor(this.clearColor, 0),
                  o && e.state.buffers.stencil.setTest(!1),
                  this.renderToScreen &&
                    ((this.fsQuad.material = this.basic),
                    (this.basic.map = r.texture),
                    e.setRenderTarget(null),
                    e.clear(),
                    this.fsQuad.render(e)),
                  (this.highPassUniforms.tDiffuse.value = r.texture),
                  (this.highPassUniforms.luminosityThreshold.value =
                    this.threshold),
                  (this.fsQuad.material = this.materialHighPassFilter),
                  e.setRenderTarget(this.renderTargetBright),
                  e.clear(),
                  this.fsQuad.render(e);
                for (
                  var s = this.renderTargetBright, l = 0;
                  l < this.nMips;
                  l++
                )
                  (this.fsQuad.material = this.separableBlurMaterials[l]),
                    (this.separableBlurMaterials[
                      l
                    ].uniforms.colorTexture.value = s.texture),
                    (this.separableBlurMaterials[l].uniforms.direction.value =
                      i.BlurDirectionX),
                    e.setRenderTarget(this.renderTargetsHorizontal[l]),
                    e.clear(),
                    this.fsQuad.render(e),
                    (this.separableBlurMaterials[
                      l
                    ].uniforms.colorTexture.value =
                      this.renderTargetsHorizontal[l].texture),
                    (this.separableBlurMaterials[l].uniforms.direction.value =
                      i.BlurDirectionY),
                    e.setRenderTarget(this.renderTargetsVertical[l]),
                    e.clear(),
                    this.fsQuad.render(e),
                    (s = this.renderTargetsVertical[l]);
                (this.fsQuad.material = this.compositeMaterial),
                  (this.compositeMaterial.uniforms.bloomStrength.value =
                    this.strength),
                  (this.compositeMaterial.uniforms.bloomRadius.value =
                    this.radius),
                  (this.compositeMaterial.uniforms.bloomTintColors.value =
                    this.bloomTintColors),
                  e.setRenderTarget(this.renderTargetsHorizontal[0]),
                  e.clear(),
                  this.fsQuad.render(e),
                  (this.fsQuad.material = this.materialCopy),
                  (this.copyUniforms.tDiffuse.value =
                    this.renderTargetsHorizontal[0].texture),
                  o && e.state.buffers.stencil.setTest(!0),
                  this.renderToScreen
                    ? (e.setRenderTarget(null), this.fsQuad.render(e))
                    : (e.setRenderTarget(r), this.fsQuad.render(e)),
                  e.setClearColor(this._oldClearColor, this.oldClearAlpha),
                  (e.autoClear = a);
              },
            },
            {
              key: "getSeperableBlurMaterial",
              value: function (e) {
                return new v.ab({
                  defines: { KERNEL_RADIUS: e, SIGMA: e },
                  uniforms: {
                    colorTexture: { value: null },
                    texSize: { value: new v.mb(0.5, 0.5) },
                    direction: { value: new v.mb(0.5, 0.5) },
                  },
                  vertexShader:
                    "varying vec2 vUv;\n                  void main() {\n                      vUv = uv;\n                      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n                  }",
                  fragmentShader:
                    "#include <common>\n                  varying vec2 vUv;\n                  uniform sampler2D colorTexture;\n                  uniform vec2 texSize;\n                  uniform vec2 direction;\n                  float gaussianPdf(in float x, in float sigma) {\n                      return 0.39894 * exp( -0.5 * x * x/( sigma * sigma))/sigma;\n                  }\n                  void main() {\n            vec2 invSize = 1.0 / texSize;            float fSigma = float(SIGMA);            float weightSum = gaussianPdf(0.0, fSigma);            float alphaSum = 0.0;            vec3 diffuseSum = texture2D( colorTexture, vUv).rgb * weightSum;            for( int i = 1; i < KERNEL_RADIUS; i ++ ) {              float x = float(i);              float w = gaussianPdf(x, fSigma);              vec2 uvOffset = direction * invSize * x;              vec4 sample1 = texture2D( colorTexture, vUv + uvOffset);              vec4 sample2 = texture2D( colorTexture, vUv - uvOffset);              diffuseSum += (sample1.rgb + sample2.rgb) * w;              alphaSum += (sample1.a + sample2.a) * w;              weightSum += 2.0 * w;            }            gl_FragColor = vec4(diffuseSum/weightSum, alphaSum/weightSum);\n          }",
                });
              },
            },
            {
              key: "getCompositeMaterial",
              value: function (e) {
                return new v.ab({
                  defines: { NUM_MIPS: e },
                  uniforms: {
                    blurTexture1: { value: null },
                    blurTexture2: { value: null },
                    blurTexture3: { value: null },
                    blurTexture4: { value: null },
                    blurTexture5: { value: null },
                    dirtTexture: { value: null },
                    bloomStrength: { value: 1 },
                    bloomFactors: { value: null },
                    bloomTintColors: { value: null },
                    bloomRadius: { value: 0 },
                  },
                  vertexShader:
                    "varying vec2 vUv;\n                  void main() {\n                      vUv = uv;\n                      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n                  }",
                  fragmentShader:
                    "varying vec2 vUv;\n                  uniform sampler2D blurTexture1;\n                  uniform sampler2D blurTexture2;\n                  uniform sampler2D blurTexture3;\n                  uniform sampler2D blurTexture4;\n                  uniform sampler2D blurTexture5;\n                  uniform sampler2D dirtTexture;\n                  uniform float bloomStrength;\n                  uniform float bloomRadius;\n                  uniform float bloomFactors[NUM_MIPS];\n                  uniform vec3 bloomTintColors[NUM_MIPS];\n                  float lerpBloomFactor(const in float factor) {\n                      float mirrorFactor = 1.2 - factor;\n                      return mix(factor, mirrorFactor, bloomRadius);\n                  }\n                  void main() {\n                      gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +\n                          lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +\n                          lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +\n                          lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +\n                          lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );\n                  }",
                });
              },
            },
          ]) && F(t.prototype, r),
          n && F(t, n),
          i
        );
      })(R.b);
      (L.BlurDirectionX = new v.mb(1, 0)), (L.BlurDirectionY = new v.mb(0, 1));
      var A = r(65);
      function V(e) {
        return (
          (V =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    "function" == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? "symbol"
                    : typeof e;
                }),
          V(e)
        );
      }
      function H(e, t) {
        for (var r = 0; r < t.length; r++) {
          var n = t[r];
          (n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            "value" in n && (n.writable = !0),
            Object.defineProperty(e, n.key, n);
        }
      }
      function Q(e, t, r) {
        return (
          (Q =
            "undefined" != typeof Reflect && Reflect.get
              ? Reflect.get
              : function (e, t, r) {
                  var n = (function (e, t) {
                    for (
                      ;
                      !Object.prototype.hasOwnProperty.call(e, t) &&
                      null !== (e = q(e));

                    );
                    return e;
                  })(e, t);
                  if (n) {
                    var o = Object.getOwnPropertyDescriptor(n, t);
                    return o.get ? o.get.call(r) : o.value;
                  }
                }),
          Q(e, t, r || e)
        );
      }
      function N(e, t) {
        return (
          (N =
            Object.setPrototypeOf ||
            function (e, t) {
              return (e.__proto__ = t), e;
            }),
          N(e, t)
        );
      }
      function G(e) {
        var t = (function () {
          if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ("function" == typeof Proxy) return !0;
          try {
            return (
              Boolean.prototype.valueOf.call(
                Reflect.construct(Boolean, [], function () {})
              ),
              !0
            );
          } catch (e) {
            return !1;
          }
        })();
        return function () {
          var r,
            n = q(e);
          if (t) {
            var o = q(this).constructor;
            r = Reflect.construct(n, arguments, o);
          } else r = n.apply(this, arguments);
          return Y(this, r);
        };
      }
      function Y(e, t) {
        if (t && ("object" === V(t) || "function" == typeof t)) return t;
        if (void 0 !== t)
          throw new TypeError(
            "Derived constructors may only return object or undefined"
          );
        return (function (e) {
          if (void 0 === e)
            throw new ReferenceError(
              "this hasn't been initialised - super() hasn't been called"
            );
          return e;
        })(e);
      }
      function q(e) {
        return (
          (q = Object.setPrototypeOf
            ? Object.getPrototypeOf
            : function (e) {
                return e.__proto__ || Object.getPrototypeOf(e);
              }),
          q(e)
        );
      }
      var J = r(153).default,
        W = r(154).default,
        X = A.a.bloom,
        Z = new v.u();
      Z.set(X.layer);
      var K = new v.H({ color: new v.i(0) }),
        $ = {},
        ee = (function (e) {
          !(function (e, t) {
            if ("function" != typeof t && null !== t)
              throw new TypeError(
                "Super expression must either be null or a function"
              );
            (e.prototype = Object.create(t && t.prototype, {
              constructor: { value: e, writable: !0, configurable: !0 },
            })),
              t && N(e, t);
          })(i, e);
          var t,
            r,
            n,
            o = G(i);
          function i(e) {
            var t;
            return (
              (function (e, t) {
                if (!(e instanceof t))
                  throw new TypeError("Cannot call a class as a function");
              })(this, i),
              ((t = o.call(this, e))._passes = []),
              t
            );
          }
          return (
            (t = i),
            (r = [
              {
                key: "defaultProp",
                get: function () {
                  return C()(Q(q(i.prototype), "defaultProp", this), {
                    sceneParent: !1,
                  });
                },
              },
              {
                key: "prop",
                get: function () {
                  return this._prop;
                },
              },
              {
                key: "_extra",
                value: function () {
                  Q(q(i.prototype), "_extra", this).call(this),
                    (this._passes = []),
                    this._useComposer || this._createEffectComposer();
                },
              },
              {
                key: "_updateSizes",
                value: function () {
                  Q(q(i.prototype), "_updateSizes", this).call(this);
                  var e = this._getRenderSizes();
                  this._bloomComposer &&
                    this._bloomComposer.setSize(e.width, e.height),
                    this._finalComposer &&
                      this._finalComposer.setSize(e.width, e.height);
                },
              },
              {
                key: "_createEffectComposer",
                value: function () {
                  var e = this._prop.sceneParent.prop.letterScene.bloom,
                    t = new O.a(this._scene, this.camera),
                    r = new L(
                      new v.mb(d.a.width, d.a.height),
                      e.strength,
                      e.radius,
                      0
                    );
                  (this._bloomPass = r), this._passes.push(r);
                  var n = new P.a(this.prop.three.renderer, this._renderer);
                  (this._bloomComposer = n),
                    n.addPass(t),
                    n.addPass(r),
                    (n.renderToScreen = !1);
                  var o = new T.a(
                    new v.ab({
                      uniforms: {
                        baseTexture: { value: null },
                        bloomTexture: { value: n.renderTarget2.texture },
                      },
                      vertexShader: W,
                      fragmentShader: J,
                      defines: {},
                    }),
                    "baseTexture"
                  );
                  (o.needsSwap = !0), this._passes.push(o);
                  var i = new P.a(this.prop.three.renderer, this._renderer);
                  (i.renderToScreen = !1),
                    (this._finalComposer = i),
                    i.addPass(t),
                    i.addPass(o);
                  var a = new T.a(j);
                  this._passes.push(a), this._finalComposer.addPass(a);
                },
              },
              {
                key: "render",
                value: function () {
                  var e = this._prop.sceneParent.prop.letterScene.bloom;
                  this._scene.traverse(te),
                    this._bloomComposer.render(),
                    this._scene.traverse(re),
                    this._finalComposer.render(),
                    this._bloomPass &&
                      ((this._bloomPass.strength = e.strength),
                      (this._bloomPass.radius = e.radius));
                },
              },
              {
                key: "destroy",
                value: function () {
                  this._passes.forEach(function (e) {
                    e.enabled = !1;
                  }),
                    Q(q(i.prototype), "destroy", this).call(this);
                },
              },
            ]) && H(t.prototype, r),
            n && H(t, n),
            i
          );
        })(x.a);
      function te(e) {
        e.isMesh &&
          !1 === Z.test(e.layers) &&
          (($[e.uuid] = e.material), (e.material = K));
      }
      function re(e) {
        $[e.uuid] && ((e.material = $[e.uuid]), delete $[e.uuid]);
      }
      function ne(e) {
        return (
          (ne =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    "function" == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? "symbol"
                    : typeof e;
                }),
          ne(e)
        );
      }
      function oe(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      }
      function ie(e, t) {
        for (var r = 0; r < t.length; r++) {
          var n = t[r];
          (n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            "value" in n && (n.writable = !0),
            Object.defineProperty(e, n.key, n);
        }
      }
      function ae(e, t, r) {
        return (
          (ae =
            "undefined" != typeof Reflect && Reflect.get
              ? Reflect.get
              : function (e, t, r) {
                  var n = (function (e, t) {
                    for (
                      ;
                      !Object.prototype.hasOwnProperty.call(e, t) &&
                      null !== (e = ce(e));

                    );
                    return e;
                  })(e, t);
                  if (n) {
                    var o = Object.getOwnPropertyDescriptor(n, t);
                    return o.get ? o.get.call(r) : o.value;
                  }
                }),
          ae(e, t, r || e)
        );
      }
      function se(e, t) {
        return (
          (se =
            Object.setPrototypeOf ||
            function (e, t) {
              return (e.__proto__ = t), e;
            }),
          se(e, t)
        );
      }
      function le(e) {
        var t = (function () {
          if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ("function" == typeof Proxy) return !0;
          try {
            return (
              Boolean.prototype.valueOf.call(
                Reflect.construct(Boolean, [], function () {})
              ),
              !0
            );
          } catch (e) {
            return !1;
          }
        })();
        return function () {
          var r,
            n = ce(e);
          if (t) {
            var o = ce(this).constructor;
            r = Reflect.construct(n, arguments, o);
          } else r = n.apply(this, arguments);
          return ue(this, r);
        };
      }
      function ue(e, t) {
        if (t && ("object" === ne(t) || "function" == typeof t)) return t;
        if (void 0 !== t)
          throw new TypeError(
            "Derived constructors may only return object or undefined"
          );
        return (function (e) {
          if (void 0 === e)
            throw new ReferenceError(
              "this hasn't been initialised - super() hasn't been called"
            );
          return e;
        })(e);
      }
      function ce(e) {
        return (
          (ce = Object.setPrototypeOf
            ? Object.getPrototypeOf
            : function (e) {
                return e.__proto__ || Object.getPrototypeOf(e);
              }),
          ce(e)
        );
      }
      var fe = r(101).default,
        pe = r(136).default,
        de = r(155).default,
        he = r(156).default,
        ve = u.a.viewport,
        me = A.a.mirrorStartSize,
        ye = A.a.mirrorScaleMultiplier,
        be = A.a.useLightVersion,
        ge = A.a.bloom,
        _e = (function (e) {
          !(function (e, t) {
            if ("function" != typeof t && null !== t)
              throw new TypeError(
                "Super expression must either be null or a function"
              );
            (e.prototype = Object.create(t && t.prototype, {
              constructor: { value: e, writable: !0, configurable: !0 },
            })),
              t && se(e, t);
          })(a, e);
          var t,
            r,
            n,
            o = le(a);
          function a() {
            var e;
            return (
              oe(this, a),
              ((e = o.apply(this, arguments))._mirror = !1),
              (e._mirrorTexture = !1),
              (e._scaling = 0),
              (e._appearProgress = 0),
              (e._enabled = !1),
              e
            );
          }
          return (
            (t = a),
            (r = [
              {
                key: "scaling",
                get: function () {
                  return this._scaling;
                },
                set: function (e) {
                  this._scaling = e;
                },
              },
              {
                key: "_createGUI",
                value: function () {
                  ae(ce(a.prototype), "_createGUI", this).call(this);
                  var e = this._guiFolder;
                  if (e) {
                    var t = this._prop.letterScene,
                      r = t.reflection,
                      n = t.bloom,
                      o = t.bloomMaterial,
                      i = t.scene,
                      s = e.addFolder("scene settings"),
                      l = s.addFolder("reflection");
                    l.add(r, "speed", 0, 0.001, g.a),
                      l.add(r, "spread", 0, 100, 1),
                      l.add(r, "strength", 0, 1, g.a);
                    var u = s.addFolder("bloom");
                    u.add(n, "strength", 0, 2, g.a),
                      u.add(n, "radius", 0, 5, g.a);
                    var c = s.addFolder("bloom material");
                    c.addColor(o, "color"), c.add(o, "roughness", 0, 1, g.a);
                    var f = s.addFolder("scene");
                    f.add(i, "lookAtZ", 0, 0.25, g.a),
                      f.add(i, "startDisappearAt", 0.5, 1, g.a);
                  }
                },
              },
              {
                key: "_createRenderTarget",
                value: function () {
                  var e = this._prop,
                    t = e.renderSettings,
                    r = e.letterScene;
                  be || !r.useBloom
                    ? (this._renderTarget = new x.a({
                        el: !!t.useParentSize && e.parent,
                        autoRender: !1,
                        dpr: Object(S.a)(),
                        cameraSettings: { far: t.cameraFar },
                        renderSettings: { format: v.U },
                      }))
                    : (this._renderTarget = new ee({
                        el: !!t.useParentSize && e.parent,
                        autoRender: !1,
                        dpr: Object(S.a)(),
                        cameraSettings: { far: t.cameraFar },
                        renderSettings: { format: v.U },
                        sceneParent: this,
                      })),
                    (this._scene = this._renderTarget.scene),
                    (this._plane = new _.a({
                      el: !!t.useParentSize && e.parent,
                      scene: !1,
                      texture: this._renderTarget.renderer.texture,
                      materialProp: { transparent: !0, opacity: 0 },
                      zIndex: 1,
                      renderPosition: !1,
                    }));
                },
              },
              {
                key: "_createElements",
                value: function () {
                  ae(ce(a.prototype), "_createElements", this).call(this),
                    this._createMirror(),
                    this._processModel();
                },
              },
              {
                key: "_processModel",
                value: function () {
                  var e = this._model,
                    t = this._prop.letterScene.bloomMaterial;
                  if (e) {
                    var r = e.loadedObject;
                    if (r) {
                      var n = r.children;
                      if (n.length > ge.objIndex) {
                        var o = n[ge.objIndex];
                        o &&
                          ((o.material = new v.K({
                            color: new v.i(t.color),
                            roughness: t.roughness,
                          })),
                          o.layers.enable(ge.layer),
                          (this._highlightMaterial = o.material));
                      }
                    }
                  }
                },
              },
              {
                key: "_createMirror",
                value: function () {
                  var e = this,
                    t = this._prop.letterScene;
                  t.floorMap
                    ? Object(b.a)(t.floorMap, function (t) {
                        if (!e._destroyed) {
                          var r = new v.hb(t);
                          (r.magFilter = v.z),
                            (r.minFilter = v.z),
                            (e._mirrorTexture = r),
                            (e._mirrorTexture.needsUpdate = !0),
                            e._createFloorPlane(),
                            e._updateSizes();
                        }
                      })
                    : (this._createFloorPlane(), this._updateSizes());
                },
              },
              {
                key: "_createFloorPlane",
                value: function () {
                  var e = this,
                    t = new v.Q(me, me),
                    r = new m.a(t, {
                      clipBias: 0.003,
                      textureWidth: me,
                      textureHeight: me,
                    });
                  (this._mirror = r), r.layers.enable(ge.layer);
                  var n = r.material;
                  (n.onBeforeCompile = function (t) {
                    (n.userData = t.uniforms),
                      (t.uniforms.u_time = { value: 0 }),
                      (t.uniforms.u_reflectionStrength = { value: 0 }),
                      (t.uniforms.u_noiseSpread = { value: 0 }),
                      (t.uniforms.u_size = { value: me }),
                      (t.uniforms.u_map = { value: e._mirrorTexture }),
                      (t.vertexShader = he),
                      (t.fragmentShader = fe + pe + de);
                  }),
                    (r.rotation.x = 0.5 * -Math.PI),
                    this._scene.add(r);
                },
              },
              {
                key: "render",
                value: function () {
                  if (this._sceneIsEnabled()) {
                    ae(ce(a.prototype), "render", this).call(this, !0);
                    var e = this._prop.letterScene,
                      t = e.reflection,
                      r = e.bloomMaterial;
                    if (this._mirror) {
                      var n = this._mirror.material;
                      n.userData &&
                        (n.userData.u_time &&
                          (n.userData.u_time.value += t.speed),
                        n.userData.u_noiseSpread &&
                          (n.userData.u_noiseSpread.value = t.spread),
                        n.userData.u_reflectionStrength &&
                          (n.userData.u_reflectionStrength.value = t.strength));
                    }
                    var o = this._highlightMaterial;
                    o &&
                      ((o.color = new v.i(r.color)),
                      (o.roughness = r.roughness)),
                      this._renderPlane(),
                      this._renderTarget.render();
                  }
                },
              },
              {
                key: "_renderMouseCameraPosition",
                value: function () {
                  if (this._model) {
                    var e = this._prop,
                      t = this._targetMouse,
                      r = this._currentMouseCameraPosition,
                      n = this._scaling,
                      o = e.renderSettings.cameraFar,
                      i = e.letterScene.scene,
                      a = e.settings.scene.mouseCameraPosition,
                      s = ve.size[0],
                      l = ve.size[1],
                      u = 1 - n,
                      c = this._model.diameter,
                      f = this._renderTarget.camera,
                      p = i.lookAtZ * c;
                    f.lookAt(new v.nb(0, 0, -p)),
                      (r.x = a.on ? Object(y.a)(r.x, t.x, a.ease) : 0);
                    var d = r.x * Object(h.b)(u, h.a.easeInSine),
                      m = d * s * a.x,
                      b = d * l * a.y,
                      g = o + Math.abs(d) * o * 0 - n * (p + o);
                    (f.position.x = m), (f.position.y = b), (f.position.z = g);
                  }
                },
              },
              {
                key: "_renderPlane",
                value: function () {
                  var e = this._plane.material,
                    t = this._prop.letterScene.scene;
                  this._appearProgress = Object(y.a)(
                    this._appearProgress,
                    1,
                    0.1
                  );
                  var r =
                    (1 -
                      Object(y.b)(
                        i()(this._scaling, [t.startDisappearAt, 1])
                      )) *
                    this._appearProgress;
                  e.opacity = r;
                },
              },
              {
                key: "_sceneIsEnabled",
                value: function () {
                  if (this._destroyed) return !1;
                  var e = this._plane.mesh,
                    t = d.a.scene3d;
                  return this._scaling < 0 || this._scaling > 1
                    ? (this._enabled && ((this._enabled = !1), t.remove(e)), !1)
                    : (this._enabled || ((this._enabled = !0), t.add(e)), !0);
                },
              },
              {
                key: "_updateSizes",
                value: function () {
                  ae(ce(a.prototype), "_updateSizes", this).call(this);
                  var e = this._mirror,
                    t = this._model;
                  if (e && t) {
                    e.position.y = 0.343 * -t.diameter;
                    var r = Math.max(d.a.width, d.a.height) * (ye / me);
                    e.scale.set(r, r, r);
                  }
                },
              },
              {
                key: "destroy",
                value: function () {
                  ae(ce(a.prototype), "destroy", this).call(this),
                    this._mirror &&
                      (this._scene.remove(this._mirror), (this._mirror = !1));
                },
              },
            ]) && ie(t.prototype, r),
            n && ie(t, n),
            a
          );
        })(w.a);
      function xe(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      }
      function Se(e, t) {
        for (var r = 0; r < t.length; r++) {
          var n = t[r];
          (n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            "value" in n && (n.writable = !0),
            Object.defineProperty(e, n.key, n);
        }
      }
      function we(e, t, r) {
        return (
          (we =
            "undefined" != typeof Reflect && Reflect.get
              ? Reflect.get
              : function (e, t, r) {
                  var n = (function (e, t) {
                    for (
                      ;
                      !Object.prototype.hasOwnProperty.call(e, t) &&
                      null !== (e = je(e));

                    );
                    return e;
                  })(e, t);
                  if (n) {
                    var o = Object.getOwnPropertyDescriptor(n, t);
                    return o.get ? o.get.call(r) : o.value;
                  }
                }),
          we(e, t, r || e)
        );
      }
      function Pe(e, t) {
        return (
          (Pe =
            Object.setPrototypeOf ||
            function (e, t) {
              return (e.__proto__ = t), e;
            }),
          Pe(e, t)
        );
      }
      function Oe(e) {
        var t = (function () {
          if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ("function" == typeof Proxy) return !0;
          try {
            return (
              Boolean.prototype.valueOf.call(
                Reflect.construct(Boolean, [], function () {})
              ),
              !0
            );
          } catch (e) {
            return !1;
          }
        })();
        return function () {
          var r,
            n = je(e);
          if (t) {
            var o = je(this).constructor;
            r = Reflect.construct(n, arguments, o);
          } else r = n.apply(this, arguments);
          return Te(this, r);
        };
      }
      function Te(e, t) {
        if (t && ("object" === Me(t) || "function" == typeof t)) return t;
        if (void 0 !== t)
          throw new TypeError(
            "Derived constructors may only return object or undefined"
          );
        return (function (e) {
          if (void 0 === e)
            throw new ReferenceError(
              "this hasn't been initialised - super() hasn't been called"
            );
          return e;
        })(e);
      }
      function je(e) {
        return (
          (je = Object.setPrototypeOf
            ? Object.getPrototypeOf
            : function (e) {
                return e.__proto__ || Object.getPrototypeOf(e);
              }),
          je(e)
        );
      }
      function Me(e) {
        return (
          (Me =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    "function" == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? "symbol"
                    : typeof e;
                }),
          Me(e)
        );
      }
      var Ce = function (e, t, r, n) {
          var o,
            i = arguments.length,
            a =
              i < 3
                ? t
                : null === n
                ? (n = Object.getOwnPropertyDescriptor(t, r))
                : n;
          if (
            "object" ===
              ("undefined" == typeof Reflect ? "undefined" : Me(Reflect)) &&
            "function" == typeof Reflect.decorate
          )
            a = Reflect.decorate(e, t, r, n);
          else
            for (var s = e.length - 1; s >= 0; s--)
              (o = e[s]) &&
                (a = (i < 3 ? o(a) : i > 3 ? o(t, r, a) : o(t, r)) || a);
          return i > 3 && a && Object.defineProperty(t, r, a), a;
        },
        Re = A.a.tagName,
        ze = u.a.viewport,
        De = (function (e) {
          !(function (e, t) {
            if ("function" != typeof t && null !== t)
              throw new TypeError(
                "Super expression must either be null or a function"
              );
            (e.prototype = Object.create(t && t.prototype, {
              constructor: { value: e, writable: !0, configurable: !0 },
            })),
              t && Pe(e, t);
          })(a, e);
          var t,
            r,
            n,
            o = Oe(a);
          function a() {
            var e;
            return (
              xe(this, a),
              ((e = o.apply(this, arguments)).settings = "{}"),
              (e.scrollFrom = ".some-element"),
              (e._scene = !1),
              (e._boundingElement = !1),
              (e._threeEvents = []),
              (e._loadProgress = 0),
              e
            );
          }
          return (
            (t = a),
            (r = [
              {
                key: "loadProgress",
                get: function () {
                  return this._loadProgress;
                },
              },
              {
                key: "createRenderRoot",
                value: function () {
                  return this;
                },
              },
              {
                key: "firstUpdated",
                value: function () {
                  this.classList.add(Re);
                },
              },
              {
                key: "_connectedCallback",
                value: function () {
                  var e = this;
                  we(je(a.prototype), "_connectedCallback", this).call(this);
                  var t = JSON.parse(this.settings);
                  this._onPreloaderReady = Object(p.a)(function () {
                    e._disconnected ||
                      ((e._scene = new _e({
                        prop: Object.assign(
                          {
                            parent: e,
                            renderSettings: {
                              useOrbitControls: !1,
                              useRenderIntersection: !1,
                              autorender: !0,
                              autoShow: !1,
                            },
                          },
                          t
                        ),
                        onLoadedCallback: function () {
                          s()(function () {
                            e._disconnected || e._handleLoaded();
                          }, 100);
                        },
                      })),
                      (e._boundingElement = Object(l.g)(e.scrollFrom)),
                      e._threeEvents.push(
                        d.a.on("prerender", function () {
                          e._render();
                        })
                      ));
                  });
                },
              },
              {
                key: "disconnectedCallback",
                value: function () {
                  we(je(a.prototype), "disconnectedCallback", this).call(this),
                    (this._loadProgress = 0),
                    this._onPreloaderReady &&
                      (this._onPreloaderReady.destroy(),
                      (this._onPreloaderReady = !1)),
                    this._threeEvents.forEach(function (e) {
                      d.a.remove(e);
                    }),
                    this._scene && (this._scene.destroy(), (this._scene = !1));
                },
              },
              {
                key: "_handleLoaded",
                value: function () {
                  if (this._scene) {
                    this._loadProgress = 1;
                    var e = this._scene,
                      t = e.prop,
                      r = e.guiFolder;
                    if (r) {
                      var n = {
                        copyJSON: function () {
                          var e = Object.assign({}, t);
                          delete e.parent,
                            delete e.renderSettings,
                            Object(f.a)(JSON.stringify(e, null, "\t"));
                        },
                      };
                      r.add(n, "copyJSON");
                    }
                  }
                },
              },
              {
                key: "_render",
                value: function () {
                  var e = this._boundingElement;
                  if (e) {
                    var t = e.getBoundingClientRect(),
                      r = i()(t.top, [0, -t.height + ze.size[1]]);
                    this._scene && (this._scene.scaling = r);
                  }
                },
              },
            ]) && Se(t.prototype, r),
            n && Se(t, n),
            a
          );
        })(c.a);
      Ce(
        [Object(n.c)({ attribute: "settings" })],
        De.prototype,
        "settings",
        void 0
      ),
        Ce(
          [Object(n.c)({ attribute: "scroll-from" })],
          De.prototype,
          "scrollFrom",
          void 0
        ),
        (De = Ce([Object(n.b)(Re)], De));
      t.default = De;
    },
    224: function (e, t, r) {
      "use strict";
      r.r(t);
      var n = r(3),
        o = r(2),
        i = r(10),
        a = r.n(i),
        s = r(0),
        l = r(12),
        u = r(26),
        c = r(5),
        f = r(38),
        p = r(8),
        d = r.n(p),
        h = r(13),
        v = r(9),
        m = r(67),
        y = r(4),
        b = {
          ticker: 0.0065,
          distortionSpread: 0.5558,
          distortionStrength: 0.0518,
          zScale: 1.5,
          rotateX: -55,
          rotateY: -32,
          rotateZ: -55,
        },
        g = b;
      if (y.b) {
        var _ = y.b.addFolder("Project Image Scene");
        _.add(b, "ticker", 0, 0.05, y.a),
          _.add(b, "distortionSpread", 0, 1, y.a),
          _.add(b, "distortionStrength", 0, 0.5, y.a),
          _.add(b, "zScale", 0, 2, y.a),
          _.add(b, "rotateX", -180, 180, 1),
          _.add(b, "rotateY", -180, 180, 1),
          _.add(b, "rotateZ", -180, 180, 1);
      }
      function x(e) {
        return (
          (x =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    "function" == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? "symbol"
                    : typeof e;
                }),
          x(e)
        );
      }
      function S(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      }
      function w(e, t) {
        for (var r = 0; r < t.length; r++) {
          var n = t[r];
          (n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            "value" in n && (n.writable = !0),
            Object.defineProperty(e, n.key, n);
        }
      }
      function P(e, t, r) {
        return (
          (P =
            "undefined" != typeof Reflect && Reflect.get
              ? Reflect.get
              : function (e, t, r) {
                  var n = (function (e, t) {
                    for (
                      ;
                      !Object.prototype.hasOwnProperty.call(e, t) &&
                      null !== (e = M(e));

                    );
                    return e;
                  })(e, t);
                  if (n) {
                    var o = Object.getOwnPropertyDescriptor(n, t);
                    return o.get ? o.get.call(r) : o.value;
                  }
                }),
          P(e, t, r || e)
        );
      }
      function O(e, t) {
        return (
          (O =
            Object.setPrototypeOf ||
            function (e, t) {
              return (e.__proto__ = t), e;
            }),
          O(e, t)
        );
      }
      function T(e) {
        var t = (function () {
          if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ("function" == typeof Proxy) return !0;
          try {
            return (
              Boolean.prototype.valueOf.call(
                Reflect.construct(Boolean, [], function () {})
              ),
              !0
            );
          } catch (e) {
            return !1;
          }
        })();
        return function () {
          var r,
            n = M(e);
          if (t) {
            var o = M(this).constructor;
            r = Reflect.construct(n, arguments, o);
          } else r = n.apply(this, arguments);
          return j(this, r);
        };
      }
      function j(e, t) {
        if (t && ("object" === x(t) || "function" == typeof t)) return t;
        if (void 0 !== t)
          throw new TypeError(
            "Derived constructors may only return object or undefined"
          );
        return (function (e) {
          if (void 0 === e)
            throw new ReferenceError(
              "this hasn't been initialised - super() hasn't been called"
            );
          return e;
        })(e);
      }
      function M(e) {
        return (
          (M = Object.setPrototypeOf
            ? Object.getPrototypeOf
            : function (e) {
                return e.__proto__ || Object.getPrototypeOf(e);
              }),
          M(e)
        );
      }
      var C = r(136).default,
        R = r(173).default,
        z = s.a.viewport,
        D = (function (e) {
          !(function (e, t) {
            if ("function" != typeof t && null !== t)
              throw new TypeError(
                "Super expression must either be null or a function"
              );
            (e.prototype = Object.create(t && t.prototype, {
              constructor: { value: e, writable: !0, configurable: !0 },
            })),
              t && O(e, t);
          })(i, e);
          var t,
            r,
            n,
            o = T(i);
          function i() {
            var e;
            return (
              S(this, i),
              ((e = o.apply(this, arguments))._appearProgress = 0),
              e
            );
          }
          return (
            (t = i),
            (r = [
              {
                key: "appearProgress",
                get: function () {
                  return this._appearProgress;
                },
                set: function (e) {
                  this._appearProgress = e;
                },
              },
              {
                key: "_extra",
                value: function () {
                  (this._prop.uniformsData = [
                    { key: "u_time", type: "float", value: 0 },
                    { key: "u_diameter", type: "float", value: 1 },
                    { key: "u_distortionProgress", type: "float", value: 0 },
                    { key: "u_distortionSpread", type: "float", value: 0 },
                    { key: "u_distortionStrength", type: "float", value: 0 },
                  ]),
                    P(M(i.prototype), "_extra", this).call(this),
                    (this._prop.extendFragmentShader = "empty");
                },
              },
              {
                key: "_setMaterialOnBeforeCompile",
                value: function () {
                  var e = this;
                  this._material.onBeforeCompile = function (t) {
                    (window.r = "".concat(
                      Math.random(),
                      "project image plane"
                    )),
                      e._onMaterialBeforeCompileFragment(t);
                  };
                },
              },
              {
                key: "_onMaterialBeforeCompileFragment",
                value: function (e) {
                  this.prop.extendFragmentShader &&
                    (this._setShaderUniforms(e),
                    (e.vertexShader = C + e.vertexShader),
                    (e.vertexShader = e.vertexShader.replace(
                      "#include <begin_vertex>",
                      R
                    )));
                },
              },
              {
                key: "renderPosition",
                value: function () {
                  var e = this._getBounding(),
                    t = Object(v.c)(),
                    r = Math.sqrt(Math.pow(e.width, 2) + Math.pow(e.height, 2));
                  this._uniforms.u_diameter &&
                    (this._uniforms.u_diameter.value = r);
                  var n = t.scrollTop + e.top,
                    o = 0 * z.size[1],
                    i = Object(f.b)(
                      Object(h.b)(d()(e.top, [n, o])),
                      f.a.easeInOutSine
                    ),
                    a = this._getPosition(e).y * Math.pow(i, 3),
                    s = 1 - i,
                    l = 1 - Object(h.b)(d()(i, [0.15, 1])),
                    u = s * (-r * g.zScale),
                    c = a + 1.5 * z.size[1] * (1 - this.appearProgress),
                    p = 0 + 1.5 * z.size[0] * (1 - this.appearProgress),
                    m = u;
                  (this.mesh.position.x = p),
                    (this.mesh.position.y = c),
                    (this.mesh.position.z = m),
                    (this.mesh.rotation.x = g.rotateX * (Math.PI / 180) * l),
                    (this.mesh.rotation.y = g.rotateY * (Math.PI / 180) * l),
                    (this.mesh.rotation.z = g.rotateZ * (Math.PI / 180) * l),
                    this._uniforms.u_distortionProgress &&
                      (this._uniforms.u_distortionProgress.value = l);
                },
              },
              {
                key: "render",
                value: function () {
                  P(M(i.prototype), "render", this).call(this),
                    this._uniforms.u_time &&
                      (this._uniforms.u_time.value +=
                        g.ticker * (1 + 2 * (1 - this.appearProgress))),
                    this._uniforms.u_distortionStrength &&
                      (this._uniforms.u_distortionStrength.value =
                        g.distortionStrength),
                    this._uniforms.u_distortionSpread &&
                      (this._uniforms.u_distortionSpread.value =
                        g.distortionSpread);
                },
              },
            ]) && w(t.prototype, r),
            n && w(t, n),
            i
          );
        })(m.a);
      function k(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      }
      function F(e, t) {
        for (var r = 0; r < t.length; r++) {
          var n = t[r];
          (n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            "value" in n && (n.writable = !0),
            Object.defineProperty(e, n.key, n);
        }
      }
      function U(e, t, r) {
        return (
          (U =
            "undefined" != typeof Reflect && Reflect.get
              ? Reflect.get
              : function (e, t, r) {
                  var n = (function (e, t) {
                    for (
                      ;
                      !Object.prototype.hasOwnProperty.call(e, t) &&
                      null !== (e = L(e));

                    );
                    return e;
                  })(e, t);
                  if (n) {
                    var o = Object.getOwnPropertyDescriptor(n, t);
                    return o.get ? o.get.call(r) : o.value;
                  }
                }),
          U(e, t, r || e)
        );
      }
      function B(e, t) {
        return (
          (B =
            Object.setPrototypeOf ||
            function (e, t) {
              return (e.__proto__ = t), e;
            }),
          B(e, t)
        );
      }
      function E(e) {
        var t = (function () {
          if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ("function" == typeof Proxy) return !0;
          try {
            return (
              Boolean.prototype.valueOf.call(
                Reflect.construct(Boolean, [], function () {})
              ),
              !0
            );
          } catch (e) {
            return !1;
          }
        })();
        return function () {
          var r,
            n = L(e);
          if (t) {
            var o = L(this).constructor;
            r = Reflect.construct(n, arguments, o);
          } else r = n.apply(this, arguments);
          return I(this, r);
        };
      }
      function I(e, t) {
        if (t && ("object" === A(t) || "function" == typeof t)) return t;
        if (void 0 !== t)
          throw new TypeError(
            "Derived constructors may only return object or undefined"
          );
        return (function (e) {
          if (void 0 === e)
            throw new ReferenceError(
              "this hasn't been initialised - super() hasn't been called"
            );
          return e;
        })(e);
      }
      function L(e) {
        return (
          (L = Object.setPrototypeOf
            ? Object.getPrototypeOf
            : function (e) {
                return e.__proto__ || Object.getPrototypeOf(e);
              }),
          L(e)
        );
      }
      function A(e) {
        return (
          (A =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    "function" == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? "symbol"
                    : typeof e;
                }),
          A(e)
        );
      }
      var V = function (e, t, r, n) {
          var o,
            i = arguments.length,
            a =
              i < 3
                ? t
                : null === n
                ? (n = Object.getOwnPropertyDescriptor(t, r))
                : n;
          if (
            "object" ===
              ("undefined" == typeof Reflect ? "undefined" : A(Reflect)) &&
            "function" == typeof Reflect.decorate
          )
            a = Reflect.decorate(e, t, r, n);
          else
            for (var s = e.length - 1; s >= 0; s--)
              (o = e[s]) &&
                (a = (i < 3 ? o(a) : i > 3 ? o(t, r, a) : o(t, r)) || a);
          return i > 3 && a && Object.defineProperty(t, r, a), a;
        },
        H = "project-image-scene",
        Q = (function (e) {
          !(function (e, t) {
            if ("function" != typeof t && null !== t)
              throw new TypeError(
                "Super expression must either be null or a function"
              );
            (e.prototype = Object.create(t && t.prototype, {
              constructor: { value: e, writable: !0, configurable: !0 },
            })),
              t && B(e, t);
          })(l, e);
          var t,
            r,
            n,
            i = E(l);
          function l() {
            var e;
            return (
              k(this, l),
              ((e = i.apply(this, arguments))._plane = !1),
              (e._loadProgress = 0),
              e
            );
          }
          return (
            (t = l),
            (r = [
              {
                key: "loadProgress",
                get: function () {
                  return this._loadProgress;
                },
              },
              {
                key: "createRenderRoot",
                value: function () {
                  return this;
                },
              },
              {
                key: "firstUpdated",
                value: function () {
                  var e = this;
                  this.classList.add(H), (this._loadProgress = 0);
                  var t = s.a.vevetPage;
                  t &&
                    t.onPageShown(function () {
                      var t = new a.a();
                      t.on("progress", function (t) {
                        e._plane && (e._plane.appearProgress = t.e);
                      }),
                        t.play({ duration: 1500 });
                    });
                },
              },
              {
                key: "_connectedCallback",
                value: function () {
                  var e = this;
                  U(L(l.prototype), "_connectedCallback", this).call(this),
                    (this._loadProgress = 0);
                  var t = 1;
                  this.imageRatio && (t = parseFloat(this.imageRatio)),
                    (this.style.paddingTop = "".concat(100 * t, "%")),
                    this.imageSrc &&
                      (this._img
                        ? (this._create(), (this._loadProgress = 1))
                        : Object(u.a)(
                            this.imageSrc,
                            function (t) {
                              e._disconnected ||
                                ((e._img = t),
                                e._create(),
                                (e._loadProgress = 1));
                            },
                            function () {
                              e._create(), (e._loadProgress = 1);
                            }
                          ));
                },
              },
              {
                key: "_create",
                value: function () {
                  !this._plane &&
                    this._img &&
                    (this._plane = new D({
                      scene: c.a.scene3d,
                      el: this,
                      resource: this._img,
                      posRule: "cover",
                      materialProp: { side: o.n },
                    }));
                },
              },
              {
                key: "_disconnectedCallback",
                value: function () {
                  U(L(l.prototype), "_disconnectedCallback", this).call(this),
                    this._plane && (this._plane.destroy(), (this._plane = !1));
                },
              },
            ]) && F(t.prototype, r),
            n && F(t, n),
            l
          );
        })(l.a);
      V(
        [Object(n.c)({ attribute: "image-src" })],
        Q.prototype,
        "imageSrc",
        void 0
      ),
        V(
          [Object(n.c)({ attribute: "image-ratio" })],
          Q.prototype,
          "imageRatio",
          void 0
        ),
        (Q = V([Object(n.b)(H)], Q));
      t.default = Q;
    },
  },
]);
