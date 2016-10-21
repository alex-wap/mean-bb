console.log('Answer Controller Loaded');
var mongoose = require('mongoose');

var Answer = mongoose.model('Answer');

module.exports = (function() {
    return {
        index: function(req, res) {
            console.log('Index Method of Answer Controller');
            Answer.find({}, function(err, data) {
                if (err) {
                    console.log(err);
                    res.json(err);
                } else {
                    res.json(data);
                }
            })
        },
        create: function(req, res) {
            console.log('Create method of Answer Controller');
            console.log(req.body);
            var answer = new Answer(req.body);
            answer.save(function(err, data) {
                if (err) {
                    console.log(err);
                    res.json(err);
                } else {
                    console.log(data);
                    res.json({success:"That was great, USERNAME! Your Score is SCORE/3 (PERCENT%)."});
                }
            })
            
        },
    }
}())
