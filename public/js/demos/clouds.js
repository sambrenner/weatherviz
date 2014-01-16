var demo = demo || {};
demo.clouds = (function(window,document) {
var _clouds = [];

  var _material = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    color: 0xFFFFFF,
    //opacity: 0.7,
    //transparent: true
  });

  var _drawCloud = function(eccentricity, xJaggedness, yJaggedness, multiplier, segments, velocity, position) {
    
    var geometry = new THREE.Geometry();
    var angleIncrement = (2 * Math.PI) / segments;

    //origin point
    geometry.vertices.push(new THREE.Vector3(0,0,0));

    for(var i=0;i<segments;i++) {
      var angle = angleIncrement * i;
      var x = (Math.random() * xJaggedness * multiplier) + eccentricity * Math.cos(angle) * multiplier;
      var y = (Math.random() * yJaggedness * multiplier) + Math.sin(angle) * multiplier;
      geometry.vertices.push(new THREE.Vector3(x,y,0));

      if(i>=1) {
        //we have at least three vertices
        geometry.faces.push(new THREE.Face3(0,i+1,i));
      }
    }

    geometry.faces.push(new THREE.Face3(0,1,segments));
    
    var holder = new THREE.Object3D();
    holder.add(new THREE.Mesh(geometry,_material));
    holder.position.set(position.x, position.y, position.z);
    
    demo.threesetup.add(holder);

    _clouds.push({
      object: holder,
      velocity: velocity
    });
  };

  var self = {
    init: function(wind) {
      var velocity = new THREE.Vector3(Math.random() * 1 - .5, 0, 0);

      for (var i = 0; i < 1; i++) {
        _drawCloud(12, 10, 1, 30, 24, velocity, new THREE.Vector3(Math.random() * 3000 - 1500, 400, Math.random() * -500));
      };
    },

    createCloudLayer: function(base,oktas) {

    },

    animate: function(dt) {
      for (var i = 0; i < _clouds.length; i++) {
        var cloud = _clouds[i];
        cloud.object.position.add(cloud.velocity);
      };
    },
  }

  return self;
})(this,this.document);

$(document).ready(function() {
  demo.threesetup.init();
  demo.threesetup.addComposer();
  demo.clouds.init();
  demo.threesetup.animationFunction = demo.clouds.animate;
});