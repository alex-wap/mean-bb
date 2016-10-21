console.log('Answer Model Loaded');
var mongoose = require('mongoose');

var AnswerSchema = mongoose.Schema({
    name: {type: String},
    score: {type: Number, max:3},
    percentage: {type: Number}
}, {timestamps: true});

mongoose.model('Answer', AnswerSchema);
