var home = require('../controllers/home'),
    test = require('../controllers/test');
    comments = require('../controllers/comments');

module.exports.initialize = function(app) {
    app.get('/', home.index);
    app.get('/test', test.test);
    app.post('/comments', comments.sendEmail);
};
