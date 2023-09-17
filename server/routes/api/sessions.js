const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const checkObjectId = require('../../middleware/checkObjectId');

const SessionController = require('../../controllers/SessionController');

// @route   POST api/sessions/
// @desc    Create new session_id 's
// @access  Public
router.post('/', SessionController.createSession);

// @route    GET api/sessions/responses
// @desc     Get session by specified id in auth
// @access   Public
router.get('/responses', SessionController.getResponses);

// @route   PATCH api/sessions/randomize_stims
// @desc    Randomize the order of the stimuli of session_id
// @access  Public
router.patch('/randomize_stims', auth, SessionController.randomize_stims);

// @route   PATCH api/sessions/single
// @desc    Finish: post responses and update session.completed, session.experiment_step
// @access  Public
router.patch('/single', auth, SessionController.singleResponse);

// @route   PATCH api/sessions
// @desc    Finish: post responses and update session.completed, session.experiment_step
// @access  Public
router.patch('/', auth, SessionController.finalize);


// @route    GET api/sessions/responses/:session_id
// @desc     Get responses by specified id in auth
// @access   Public
router.get(
  '/responses/:session_id',
  checkObjectId('session_id'),
  auth,
  SessionController.getResponsesByID
);

// @route    GET api/sessions
// @desc     Get session by specified id in auth
// @access   Public
router.get('/authedUser', auth, SessionController.readByID);

module.exports = router;
