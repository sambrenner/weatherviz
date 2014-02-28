var demo = demo || {};
demo.clouds = (function(window,document) {
var _clouds = [];

  var _material = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    color: 0xFFFFFF
    //opacity: 0.7,
    //transparent: true
  });

  var _drawEllipseCloud = function(eccentricity, xJaggedness, yJaggedness, multiplier, segments, velocity, position) {
    
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

  var _drawSemiCircleCloud = function(baseXJaggedness, baseYJaggedness, baseMultiplier, arcXJaggedness, arcYJaggedness, arcMultiplier, arcEccentricity, segments, width, offset, velocity, position) {
    var geometry = new THREE.Geometry();

    //origin point
    geometry.vertices.push(new THREE.Vector3(0,0,0));

    var baseStart = new THREE.Vector3(-width/2, offset/2, 0);
    var pixelSpacing = width / segments;

    //base
    for (var i = 0; i < segments; i++) {
      var segment = new THREE.Vector3((i * pixelSpacing) + (Math.random() * baseXJaggedness * baseMultiplier), Math.random() * baseYJaggedness * baseMultiplier, 0);
      segment.add(baseStart);

      geometry.vertices.push(segment);

      if(i>=1) {
        //we have at least three vertices
        geometry.faces.push(new THREE.Face3(0,i+1,i));
      }
    };

    var arcStart = new THREE.Vector3(-width/2, -offset/2, 0);
    var arcSpacing = Math.PI / segments;

    //arc
    for (var j = 0; j < segments; j++) {
      var segment = new THREE.Vector3((j * pixelSpacing) + (Math.random() * arcXJaggedness * arcMultiplier), (Math.sin(j * arcSpacing) * arcEccentricity) + (Math.random() * arcYJaggedness * arcMultiplier), 0);
      segment.add(arcStart);

      geometry.vertices.push(segment);

      if(j>=1) {
        geometry.faces.push(new THREE.Face3(0,j+segments+1,j+segments));
      }

      geometry.faces.push(new THREE.Face3(0, 1, 1 + segments)); //left cap
      geometry.faces.push(new THREE.Face3(0, segments * 2, segments)); //right cap
    };

    var holder = new THREE.Object3D();
    holder.add(new THREE.Mesh(geometry,_material));
    holder.position.set(position.x, position.y, position.z);
    
    demo.threesetup.add(holder);

    _clouds.push({
      object: holder,
      velocity: velocity
    });
  }

  var _clearClouds = function() {
    for (var i = 0; i < _clouds.length; i++) {
      demo.threesetup.remove(_clouds[i].object);
    };

    _clouds = [];
  };

  var _initCloudPicker = function() {
    $('#cloud_type_picker li a').on('click', function(e) {
      e.preventDefault();

      _clearClouds();

      var velocity = new THREE.Vector3(Math.random() * 2 - 1, 0, 0);
      //var velocity = new THREE.Vector3(10, 0, 0);
      
      var $this = $(this);

      //eccentricity, xJaggedness, yJaggedness, multiplier, segments, velocity, position

      $('#cloud_type_picker li .active').removeClass('active');
      $this.addClass('active');

      switch($this.attr('href').substr(1)) {
        case 'cumulus':
          for (var i = 0; i < 15; i++) _drawEllipseCloud(6, 1, 1, 70, 18, velocity, new THREE.Vector3(Math.random() * 6000 - 3000, Math.random() * 200 + 200, Math.random() * -500));
          break;
        case 'cumulonimbus':
        //baseXJaggedness, baseYJaggedness, baseMultiplier, arcXJaggedness, arcYJaggedness, arcMultiplier, arcEccentricity, segments, width, offset, velocity, position
          for (var i = 0; i < 10; i++) _drawSemiCircleCloud(0, 5, 10, 0, 10, 20, 100, 10, 1000, 20, velocity, new THREE.Vector3(Math.random() * 6000 - 3000, Math.random() * 200, Math.random() * -500));
          break;
        case 'stratocumulus':
          for (var i = 0; i < 20; i++) _drawEllipseCloud(12, 10, 1, 30, 24, velocity, new THREE.Vector3(Math.random() * 6000 - 3000, Math.random() * 200 + 200, Math.random() * -500));
          break;
        case 'altostratus':
          for (var i = 0; i < 100; i++) _drawEllipseCloud(12, 10, 5, 50, 24, velocity, new THREE.Vector3(Math.random() * 6000 - 3000, Math.random() * 200 + 200, Math.random() * -500));
          break;
        case 'altocumulus':
        for (var i = 0; i < 200; i++) _drawEllipseCloud(2, 1, 1, 30, 24, velocity, new THREE.Vector3(Math.random() * 6000 - 3000, Math.random() * 200 + 200, Math.random() * -500));
          break;
        case 'cirrocumulus':
          for (var i = 0; i < 100; i++) _drawEllipseCloud(10, 20, 1, 10, 24, velocity, new THREE.Vector3(Math.random() * 6000 - 3000, Math.random() * 200 + 200, Math.random() * -500));
          break;
        case 'cirrus':
          for (var i = 0; i < 30; i++) _drawEllipseCloud(50, 20, 1, 10, 24, velocity, new THREE.Vector3(Math.random() * 6000 - 3000, Math.random() * 200 + 200, Math.random() * -500));
          break;
      }
    });
  };

  var self = {
    init: function(wind) {
      _initCloudPicker();

      $('#cloud_type_picker li a').first().click();
    },

    createCloudLayer: function(base,oktas) {

    },

    animate: function(dt) {
      for (var i = 0; i < _clouds.length; i++) {
        var cloud = _clouds[i];
        cloud.object.position.add(cloud.velocity);

        if(cloud.object.position.x < -3000) cloud.object.position.x = 3000;
        if(cloud.object.position.x > 3000) cloud.object.position.x = -3000;
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