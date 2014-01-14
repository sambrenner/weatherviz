THREE.EdgeDetectionShader = {

  uniforms: {
    "tDiffuse": { type: "t", value: null },
    "width": { type: "f", value: 100.0 },
    "height": { type: "f", value: 100.0 }
  },
  vertexShader: [
    "varying vec2 vUv;",
    "void main() {",
      "vUv = uv;",
      "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
    "}"
  ].join("\n"),
  fragmentShader: [
    "uniform sampler2D tDiffuse;",
    "uniform float width;",
    "uniform float height;",
    "varying vec2 vUv;",
    
    "float threshold(in float thr1, in float thr2, in float val) {",
      "if(val < thr1) { return 0.0; }",
      "if(val > thr2) { return 1.0; }",
      "return val;",
    "}",

    "float avg_intensity(in vec4 pix) {",
      "return (pix.r + pix.g + pix.b) / 3.0;",
    "}",

    "vec4 get_pixel(in vec2 coords, in float dx, in float dy) {",
      "return texture2D(tDiffuse, coords + vec2(dx, dy));",
    "}",

    "bool isEdge(in vec2 coords) {",
      "float dxtex = 1.0 / width;",
      "float dytex = 1.0 / height;",
      "float pix[9];",
      "int k = -1;",
      "float delta;",

      "pix[0] = avg_intensity(get_pixel(coords, float(-1)*dxtex, float(-1)*dytex));",
      "pix[1] = avg_intensity(get_pixel(coords, float(-1)*dxtex, float(0)*dytex));",
      "pix[2] = avg_intensity(get_pixel(coords, float(-1)*dxtex, float(1)*dytex));",
      "pix[3] = avg_intensity(get_pixel(coords, float(0)*dxtex, float(-1)*dytex));",
      "pix[4] = avg_intensity(get_pixel(coords, float(0)*dxtex, float(0)*dytex));",
      "pix[5] = avg_intensity(get_pixel(coords, float(0)*dxtex, float(1)*dytex));",
      "pix[6] = avg_intensity(get_pixel(coords, float(1)*dxtex, float(-1)*dytex));",
      "pix[7] = avg_intensity(get_pixel(coords, float(1)*dxtex, float(0)*dytex));",
      "pix[8] = avg_intensity(get_pixel(coords, float(1)*dxtex, float(1)*dytex));",

      "delta = (abs(pix[1]-pix[7]) + abs(pix[5]-pix[3]) + abs(pix[0]-pix[8]) + abs(pix[2]-pix[6])) / 4.0;",
      "return threshold(0.5, 0.5, clamp(1.8*delta,0.0,1.0)) == 1.0 ? true : false;",
    "}",

    "void main() {",
      "vec4 color = isEdge(vUv) ? vec4(0.0,0.0,0.0,1.0) : vec4(0.0,0.0,0.0,0.0);",
      "gl_FragColor = color;",
    "}"

  ].join("\n")

};
