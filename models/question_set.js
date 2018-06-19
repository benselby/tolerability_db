var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var QuestionSetSchema = new Schema(
    {
//        questions: {type: Array, 'default': []}
        name: String,
        author: String,
        last_revised: Date,
        questions: [{
            question_name: String, 
            is_required: Boolean,
            description: String,
            response: Number
        }]
    }        
); 

//Virtuals for QuestionSet properties:
QuestionSetSchema.virtual('url')
.get(function() {
        return '/tolerability/question_set/' + this._id;
});

//Export module
module.exports = mongoose.model('QuestionSet', QuestionSetSchema);
