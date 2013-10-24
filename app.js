/**
 * Module dependencies.
 */

var express = require('express'),
  routes = require('./routes'),
  demos = require('./routes/demos'),
  http = require('http'),
  path = require('path'),
  app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
  app.locals.pretty = true;
}

app.get('/', routes.index);
app.get('/demos/', demos.findAll);
app.get('/demos/:name', demos.findByScene);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
