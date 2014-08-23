var _                   = require('underscore'),
    backupCtrl          = require('./controllers/backupController')

var routes = [

    // Partials
    {
        path: '/partials/*',
        httpMethod: 'GET',
        middleware: [function (req, res) {
            var requestedView = path.join('./', req.url);
            res.render(requestedView);
        }]
    },

    // Backup
    {
        path: '/api/backup',
        httpMethod: 'POST',
        middleware: [backupCtrl.create]
    },

    {
        path: '/api/backup/:name',
        httpMethod: 'DELETE',
        middleware: [backupCtrl.delete]
    },

    {
        path: '/api/backup',
        httpMethod: 'GET',
        middleware: [backupCtrl.list]
    },

    {
        path: '/api/backup/:name',
        httpMethod: 'GET',
        middleware: [backupCtrl.get]
    },

    // All other get requests should be handled by AngularJS's client-side routing system
    {
        path: '/*',
        httpMethod: 'GET',
        middleware: [function(req, res) {
            res.render('index');
        }]
    }
];

module.exports = function(app) {

    _.each(routes, function(route) {

        switch(route.httpMethod.toUpperCase()) {
            case 'GET':
                app.get(route.path, route.middleware);
                break;
            case 'POST':
                app.post(route.path, route.middleware);
                break;
            case 'PUT':
                app.put(route.path, route.middleware);
                break;
            case 'DELETE':
                app.delete(route.path, route.middleware);
                break;
            default:
                throw new Error('Invalid HTTP method specified for route ' + route.path);
                break;
        }
    });
}