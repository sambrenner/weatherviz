var demo = demo || {};
demo.threesetup = (function(window,document) {
  var _scene, _camera, _renderer, _clock, _light, _controls, _composer;

  var _render = function() {
    //_renderer.render(_scene, _camera);
    
    requestAnimationFrame(_render);
    _controls.update();

    if(_composer) _composer.render();
    if(self.animationFunction) self.animationFunction(_clock.getDelta());
  };

  var self = {
    init: function() {
      _clock = new THREE.Clock();

      // set the scene size
      var WIDTH = window.innerWidth,
        HEIGHT = window.innerHeight;

      // set some camera attributes
      var VIEW_ANGLE = 75,
        ASPECT = WIDTH / HEIGHT,
        NEAR = 0.1,
        FAR = 1000;

      // get the DOM element to attach to
      // - assume we've got jQuery to hand
      var $container = $('#container');

      // create a WebGL renderer, camera
      // and a scene
      _renderer = new THREE.WebGLRenderer({
        alpha: true
      });
      
      _camera =
        new THREE.PerspectiveCamera(
          VIEW_ANGLE,
          ASPECT,
          NEAR,
          FAR);

      _scene = new THREE.Scene();

      // add the camera to the scene
      _scene.add(_camera);

      // the camera starts at 0,0,0
      // so pull it back
      _camera.position.z = 500;
      _camera.lookAt(new THREE.Vector3(0,0,0));

      // start the renderer
      _renderer.setSize(WIDTH, HEIGHT);

      _controls = new THREE.OrbitControls(_camera);

      // attach the render-supplied DOM element
      $container.append(_renderer.domElement);

      _render();
    },

    add: function(obj) {
      _scene.add(obj);
    },

    addComposer: function() {
      var renderTargetParameters = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBAFormat, stencilBufer: false };
      var renderTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, renderTargetParameters );

      _composer = new THREE.EffectComposer(_renderer, renderTarget);
      _composer.addPass( new THREE.RenderPass(_scene, _camera));

      var mosaic = new THREE.ShaderPass(THREE.MosaicShader);
      //mosaic.uniforms[ 'amount' ].value = 0.015;
      //mosaic.renderToScreen = true;
      _composer.addPass(mosaic);
      
      var edge = new THREE.ShaderPass(THREE.EdgeDetectionShader);
      edge.uniforms['width'].value = window.innerWidth,
      edge.uniforms['height'].value = window.innerHeight,
      edge.renderToScreen = true;
      _composer.addPass(edge);
    },

    animationFunction: null
  };

  return self;
})(this,this.document);