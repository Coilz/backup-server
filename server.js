var express = require('express');
var app = express();

var routes = require('./routes')
var router = new routes(app);

// Though not mandatory, error-handling middleware are typically defined very last, below any other app.use()
app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.status(500).send('Something broke!');
});

var server = app.listen(8080, function() {
    console.log('Listening on port %d', server.address().port);
});