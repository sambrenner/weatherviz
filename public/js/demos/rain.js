var demo = demo || {};
demo.rain = (function(window,document) {
  var _pGroup;

  var self = {
    init: function() {
      _pGroup = new ShaderParticleGroup({
        texture: THREE.ImageUtils.loadTexture('/img/rainparticle.png'),
        maxAge: 40
      });

      for(var i=-20; i<20; i++) {
        var emitter = new ShaderParticleEmitter({
          type: 'cube',
          position: new THREE.Vector3(i*20,450 + Math.random() * 100 - 50,0),
          acceleration: new THREE.Vector3(0,-10,0),
          velocity: new THREE.Vector3(40,-300,0),
          velocitySpread: new THREE.Vector3(20,0,10),
          particlesPerSecond: Math.floor(Math.random() * 8 + 10),
          colorStart: new THREE.Color('black'),
          colorEnd: new THREE.Color('black'),
          size: 8
        });

        _pGroup.addEmitter(emitter);
      }

      demo.threesetup.add(_pGroup.mesh);
    },
    animate: function(dt) {
      _pGroup.tick(dt);
    }
    
  }

  return self;
})(this,this.document);

$(document).ready(function() {
  demo.threesetup.init();
  demo.threesetup.addComposer();
  demo.rain.init();
  demo.threesetup.animationFunction = demo.rain.animate;
});