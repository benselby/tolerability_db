var Study = require('../models/study');
var async = require('async');

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Display list of all Study.
exports.study_list = function(req, res, next) {
    Study.find({}, 'name pi_name')
        .exec(function (err, studies){
            if (err) { return next(err); }
            res.render('study_list', {title: 'All Studies', study_list: studies});
        });
};

// Display detail page for a specific Study.
exports.study_detail = function(req, res) {
        res.send('NOT IMPLEMENTED: Study detail: ' + req.params.id);
};

// Display Study create form on GET.
exports.study_create_get = function(req, res) {
    res.render('study_form', {title: 'Create Study'});
};

// Handle Study create on POST.
exports.study_create_post = [
    // Validate that the name field isn't empty
    body('name', 'Study name required').isLength({min: 1}).trim(),

    // sanitize the name field
    sanitizeBody('name').trim().escape(),

    // process request after validation and sanitization
    (req, res, next) => {
        // extract validation errors from request
        const errors = validationResult(req);

        // Create a study object with escaped and trimmed data
        var study = new Study(
            {name: req.body.name}
        );

        if (!errors.isEmpty()) {
            res.render('study_form', {title: 'Create Study', study: study, errors: errors.array() } );
            return;
        }
        else {
            // Check if Study with same name already exists:
            Study.findOne({'name': req.body.name})
                .exec( function(err, found_study){
                       if (err) {return next(err); }

                       if (found_study) {
                           res.redirect(found_study.url);
                       }
                       else {
                            study.save(function(err) {
                                if (err) { return next(err); }
                                    res.redirect(study.url);
                            });
                        }
                });
        }
    }
];

// Display Study delete form on GET.
exports.study_delete_get = function(req, res) {
        res.send('NOT IMPLEMENTED: Study delete GET');
};

// Handle Study delete on POST.
exports.study_delete_post = function(req, res) {
        res.send('NOT IMPLEMENTED: Study delete POST');
};

// Display Study update form on GET.
exports.study_update_get = function(req, res) {
        res.send('NOT IMPLEMENTED: Study update GET');
};

// Handle Study update on POST.
exports.study_update_post = function(req, res) {
        res.send('NOT IMPLEMENTED: Study update POST');
};
