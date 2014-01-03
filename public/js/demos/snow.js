var demo = demo || {};
demo.snow = (function(window,document) {
  var _pGroups = [];
  var _textures = [];
  var _numEmitters = 20;
  var _spacing = 80;

  var self = {
    init: function() {
      for (var i = 1; i <= 7; i++) {
        _textures[i] = THREE.ImageUtils.loadTexture('/img/snowparticle_0' + i + '.png');
      }

      self.buildLayer(32, 0.7, 0);
      self.buildLayer(32, 0.1, 300);
    },
    animate: function(dt) {
      for(var i=0; i<_pGroups.length; i++) {
        _pGroups[i].tick(dt);
      }
    },
    buildLayer: function(size, alpha, z) {
      for(var i=0; i<_numEmitters; i++) {
        for(var j=0; j<_textures.length; j++) {
          var emitter = new ShaderParticleEmitter({
            type: 'cube',
            position: new THREE.Vector3((i*_spacing)-((_numEmitters*_spacing)/2),800 + Math.random() * 600 - 300,z),
            acceleration: new THREE.Vector3(0,0,0),
            velocity: new THREE.Vector3(0,-50,0),
            velocitySpread: new THREE.Vector3(50,0,0),
            particlesPerSecond: 0.1,
            size: size,
            colorEnd: new THREE.Color('white'),
            opacityStart: alpha
          });

          var pos = _pGroups.push(new ShaderParticleGroup({
            texture: _textures[j],
            colorize: 1,
            maxAge: 40
          })) - 1;

          _pGroups[pos].addEmitter(emitter);
          demo.threesetup.add(_pGroups[pos].mesh);
        }
      }
    }
    
  }

  return self;
})(this,this.document);

$(document).ready(function() {
  $('body').css('background-color', '#444');
  demo.threesetup.init();
  demo.snow.init();
  demo.threesetup.animationFunction = demo.snow.animate;
});