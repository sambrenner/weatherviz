var demos = {
  'clouds': {name: 'Clouds', src: '/js/demos/clouds.js', engine: 'three'},
  'rain': {name: 'Rain', src: '/js/demos/rain.js', engine: 'three'},
  'snow': {name: 'Snow', src: '/js/demos/snow.js', engine: 'three'}
};

exports.findAll = function(req,res) {
	res.render('demos', {demos: demos});
};

exports.findByScene = function(req,res) {
  var demo = demos[req.params.name];

  if(demo)
    res.render('demo', demo);
  else
    res.render('404', {status: 404, url: req.url});
};