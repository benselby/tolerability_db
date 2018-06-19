#! /usr/bin/env node

console.log('This script populates some test studies and sessions in the database specified as argument - e.g. poulate_db mongodb://yourusername:yourpassword@db_url');

basic_questions = [
    {
        question_name: 'Local Pain',
        is_required: true,
        description: 'Describe any pain at the site of stimulation'
    },
    {
        question_name: 'Headache',
        is_required: true,
        description: 'Describe any headache present after stimulation'
    },
    {
        question_name: 'Toothache',
        is_required: true,
        description: 'Describe any toothache present after stimulation'
    },
    {
        question_name: 'Muscle twitches or contractions',
        is_required: true,
        description: 'Describe the level of discomfort during stimulation'
    },
    {
        question_name: 'Changes in hearing, including tinnitus (ringing in the ears)',
        is_required: true,
        description: 'Describe the level of change after stimulation'
    },
    {
        question_name: 'Fatigue/Excessive Tiredness',
        is_required: true,
        description: 'Indicate the level of fatigue after stimulation'
    },
    {
        question_name: 'Dizziness, presyncope, or fainting',
        is_required: true,
        description: 'Indicate the level of dizziness after stimulation'
    },
    {
        question_name: 'Changes in memory or concentration',
        is_required: true,
        description: 'Indicate the level of change experienced'
    }
];
    
// get args passed on cmd line:
var userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb://')){
    console.log('ERROR: you need to specify a valid mongodb URL as the first argument.');
    return;
}

var async = require('async');
var Study = require('./models/study');
var Session = require('./models/session');
var QuestionSet = require('./models/question_set');

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

var studies = [];
var sessions = [];
var question_sets = [];

function questionSetCreate(name, author, date, questions, cb){
    details = {name: name, questions: questions};
    if (date != false) details.date = date;
    if (author != false) details.author = author;
    
    var question_set = new QuestionSet(details);
    question_set.save( function(err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New question set: ' + question_set);
        question_sets.push(question_set);
        cb(null, question_set);
    });
};

function studyCreate(name, PI, question_set, cb){
    study_details = {name: name, pi_name : PI, question_set: question_set};

    var study = new Study(study_details);
    study.save( function(err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New study: ' + study);
        studies.push(study);
        cb(null, study);
    });
};

function sessionCreate(study, participant, date, question_set, cb){
    details = {study: study,
              participant: participant,
              date: date, 
              question_set: question_set};

    var session = new Session(details);
    session.save( function(err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New session: ' + session);
        sessions.push(session);
        cb(null, session);
    });
};

function createQuestionSets(cb) {
    async.parallel([
        function(callback) {
            questionSetCreate('Basic Tolerability', 'Unknown', false, basic_questions, callback);    
        }
        ],
        // Optional callback
        cb
    );
};

function createStudies(cb) {
    async.parallel([
        function(callback) {
            studyCreate('Theta-burst for Depression', 'Raj Ramasubbu', question_sets[0], callback);    
        }
        ],
        // Optional callback
        cb
    );
};

function createSessions(cb) {
    async.parallel([
        function(callback) {
            sessionCreate(studies[0], 'Test_TBSXXX', '2018-05-31', question_sets[0], callback);    
        }
        ],
        // Optional callback
        cb
    );        
};

console.log('Gonna try to create some data for da base...');

async.series([createQuestionSets, createStudies, createSessions],
            // Optional callback:
            function(err, results) {
                if (err)
                    console.log('Final Error: ' + err);
                else
                    console.log('Done creating question sets!');
                mongoose.connection.close();
            }
);



