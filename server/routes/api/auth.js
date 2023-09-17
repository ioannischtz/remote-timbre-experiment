const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const jwt = require('jsonwebtoken');
const JWTSECRET = process.env.JWTSECRET || 'shhhDontSayAword';
const auth = require('../../middleware/auth');
// const Experimenter = require('../../models/Experimenter');
// const Subject = require('../../models/Subject');
const Session = require('../../models/Session');

// @route   GET api/auth/experimenter
// @desc    Test route
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const session = await Session.findById(req.user.id);
    res.json(session);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/auth
// @desc    Authenticate experimenter & get token (for login)
// @access  Public
router.post(
  '/',
  [check('session_id', 'Session ID is required').exists()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { session_id } = req.body;

    try {
      // See if user exists
      let session = await Session.findOne({ session_id });

      if (!session) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'There is no session with this id' }] });
      }

      if (session.completed) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'This session has been completed!' }] });
      }

      const payload = {
        user: {
          id: session.id
        }
      };

      jwt.sign(payload, JWTSECRET, { expiresIn: 3600000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
