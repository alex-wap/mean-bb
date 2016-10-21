//Require the controller
var Questions = require('../controllers/questions.js');
var Answers = require('../controllers/answers.js');

//////////////////////////////////////////////////////////
//                        Routes                        //
//////////////////////////////////////////////////////////
module.exports = function(app) {
    app.get('/questions', function(req, res) {
        Questions.index(req, res);
    })
    app.post('/questions', function(req, res) {
        Questions.create(req, res);
    })
    app.get('/answers', function(req, res) {
        Answers.index(req, res);
    })
    app.post('/answers', function(req, res) {
        Answers.create(req, res);
    })
}
