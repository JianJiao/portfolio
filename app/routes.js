var home = require('../controllers/home'),
    test = require('../controllers/test');

module.exports.initialize = function(app) {
    app.get('/', home.index);
    app.get('/test', test.test);
};
