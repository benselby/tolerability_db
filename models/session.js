var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SessionSchema = new Schema(
    {
        study: {type: Schema.ObjectId, ref: 'Study', required: true},
        participant: {type: String, required: true, max: 100},
        date: {type: Date},
        question_set: {type: Schema.ObjectId, ref: 'QuestionSet'}
    }        
); 

//Virtuals for Session properties:
SessionSchema
.virtual('url')
        .get(function () {
            return '/tolerability/sessions/' + this.participant + '_' + this.date;
            });


//Export module
module.exports = mongoose.model('Session', SessionSchema);
