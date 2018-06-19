var express = require('express');
var router = express.Router();

// Require controller modules.
var session_controller = require('../controllers/sessionController');
var study_controller = require('../controllers/studyController');
var question_controller = require('../controllers/questionSetController');

/// SESSION ROUTES ///

// GET Tolerability home page.
router.get('/', session_controller.index);

// GET request for creating a Session. NOTE This must come before routes that display Session (uses id).
router.get('/session/create', session_controller.session_create_get);

// POST request for creating Session.
router.post('/session/create', session_controller.session_create_post);

// GET request to delete Session.
router.get('/session/:id/delete', session_controller.session_delete_get);

// POST request to delete Session.
router.post('/session/:id/delete', session_controller.session_delete_post);

// GET request to update Session.
router.get('/session/:id/update', session_controller.session_update_get);

// POST request to update Session.
router.post('/session/:id/update', session_controller.session_update_post);

// GET request for one Session.
router.get('/session/:id', session_controller.session_detail);

/// STUDY ROUTES ///

// GET request for list of all Study items.
router.get('/studies', study_controller.study_list); 
/*
// GET Tolerability home page.
router.get('/', session_controller.index);

// GET request for creating a Session. NOTE This must come before routes that display Session (uses id).
router.get('/session/create', session_controller.session_create_get);

// POST request for creating Session.
router.post('/session/create', session_controller.session_create_post);

// GET request to delete Session.
router.get('/session/:id/delete', session_controller.session_delete_get);

// POST request to delete Session.
router.post('/session/:id/delete', session_controller.session_delete_post);

// GET request to update Session.
router.get('/session/:id/update', session_controller.session_update_get);

// POST request to update Session.
router.post('/session/:id/update', session_controller.session_update_post);

// GET request for one Session.
router.get('/session/:id', session_controller.session_detail);

// GET request for list of all Session items.
router.get('/sessions', session_controller.session_list); 
*/

/// QUESTION SET ROUTES ///

// GET request for list of all question sets
router.get('/question_sets', question_controller.question_set_list);

// GET request for one Question Set.
router.get('/question_set/:id', question_controller.question_set_detail);

/// CONTACT PAGE ///
router.get('/contact/', function(req, res){
    res.render('contact');
});

module.exports = router;
