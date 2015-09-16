var express = require('express'),
    http = require('http'),
    path = require('path'),
    routes = require('./app/routes'),
    exphbs = require('express3-handlebars'),
    // mongoose = require('mongoose'),
    // seeder = require('./app/seeder'),
    app = express();

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 3300;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.set('port', server_port);
app.set('views', __dirname + '/views');
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    layoutsDir: app.get('views') + '/layouts'
}));
app.set('view engine', 'handlebars');

app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('some-secret-value-here'));
app.use(app.router);
// intended for sourceMap of less, not working though
// app.use('/client/styles/less', express.static('client/styles/less/'));

// different mode
if ('development' == app.get('env')) {
    app.use('/', express.static(path.join(__dirname, 'public')));
    app.use(express.errorHandler());
    console.log('development mode');
}else{
    app.use('/', express.static(path.join(__dirname, 'dist')));
}

// //connect to the db server:
// mongoose.connect('mongodb://localhost/MyApp');
// mongoose.connection.on('open', function() {
//     console.log("Connected to Mongoose...");

//     // check if the db is empty, if so seed it with some contacts:
//     seeder.check();
// });

//routes list:
routes.initialize(app);


//finally boot up the server:
http.createServer(app).listen(app.get('port'), server_ip_address, function() {
    console.log( "Listening on " + server_ip_address + ", server_port " + app.get('port') );
});
