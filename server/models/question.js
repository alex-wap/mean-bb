console.log('Question Model Loaded');
var mongoose = require('mongoose');

var QuestionSchema = mongoose.Schema({
    question: {type: String, required: true, minlength: 15},
    answer: {type: String, required: true},
    fake_answer1: {type: String, required: true},
    fake_answer2: {type: String, required: true}
}, {timestamps: true});

mongoose.model('Question', QuestionSchema);
