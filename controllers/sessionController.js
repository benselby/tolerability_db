const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

var Session = require('../models/session');
var Study = require('../models/study');
var QuestionSet = require('../models/question_set');

var async = require('async');

exports.index = function(req, res) {
    async.parallel({
        session_count: function(callback) {
            Session.count({}, callback);  // Pass an empty object as match condition to find all documents of this collection 
        },
        
        study_count: function(callback) {
            Study.count({}, callback); 
        }, 
    }, function(err, results) {
            res.render('index', {title: 'TMS Tolerability Home', error: err, data:results });
       });
};

// Display a list of all sessions
exports.session_list = function(req, res) {
    res.send('NOT IMPLEMENTED: Session list');
};

// Display detail page for a specific session
exports.session_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Session detail: ' + req.params.id);
};

// Display Session create form on GET.
exports.session_create_get = function(req, res, next) {
    Study.find({}, 'name question_set')
        .populate('question_set')
        .exec(function(err, studies){
                if (err) {return next(err); }
                    res.render('session_form', {title: 'Add new session', study_list: studies});
                });
/*    res.render('session_form', {title: 'Add new session', study_list: [
            {name: 'TBS-MDD',
            question_set: {
                name: 'Basic tolerability',
                questions: ['r u sad', 'r u ok']
                }
            }, 
            {name: 'D-cycloserine',
            question_set: {
                name: 'Adv tolerability',
                questions: ['r u sad', 'r u ok']
                }
            } 
    ]});*/
};

// Handle Session create on POST.
exports.session_create_post = [
    // Validate fields
    body('participant').isLength({min: 1}).trim().withMessage('Participant ID must be specified.'), 

    body('study').isLength({min: 1}).trim().withMessage('Study name must be specified.'),
    // Sanitize fields
    sanitizeBody('participant').trim().escape(),
    sanitizeBody('study').trim().escape(),

    // Process request after validation and sanitization
    (req, res, next) => {
        // extract validation errors from a request
        const errors = validationResult(req);

        if (!errors.isEmpty()){
            // Render form again with sanitized values/error messages
            res.render('session_form', {title: 'Add new session', participant: req.body, errors: errors.array() });
            return;
        }
        else {
            // Data in form is valid

            // Create Session object with escaped and trimmed data
            var session = new Session(
                {
                    participant: req.body.participant,
                    study: req.body.study
                });
        
            session.save(function (err) {
                if (err) {return next(err); }
                res.redirect(session.url);
            });
        }
    }
];

// Display Session delete form on GET.
exports.session_delete_get = function(req, res) {
        res.send('NOT IMPLEMENTED: Session delete GET');
};

// Handle Session delete on POST.
exports.session_delete_post = function(req, res) {
        res.send('NOT IMPLEMENTED: Session delete POST');
};

// Display Session update form on GET.
exports.session_update_get = function(req, res) {
        res.send('NOT IMPLEMENTED: Session update GET');
};

// Handle Session update on POST.
exports.session_update_post = function(req, res) {
        res.send('NOT IMPLEMENTED: Session update POST');
};
