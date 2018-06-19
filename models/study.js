var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var StudySchema = new Schema(
    {
        name: {type: String, required: true, max: 100},
        question_set: {type: Schema.ObjectId, ref: 'QuestionSet'},
        pi_name: String 
    }        
); 


//Export module
module.exports = mongoose.model('Study', StudySchema);
