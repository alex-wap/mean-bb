console.log('Question Controller Loaded');
var mongoose = require('mongoose');

var Question = mongoose.model('Question');

module.exports = (function() {
    return {
        index: function(req, res) {
            console.log('Index Method of Question Controller');
            Question.find({}, function(err, data) {
                if (err) {
                    console.log(err);
                    res.json(err);
                } else {
                    res.json(data);
                }
            })
        },
        create: function(req, res) {
            console.log('Create method of Question Controller');
            console.log(req.body);
            var question = new Question(req.body);
            question.save(function(err, data) {
                if (err) {
                    console.log(err);
                    res.json(err);
                } else {
                    res.json({success:"Question was added successfully!"});
                }
            })
            
        },
    }
}())
