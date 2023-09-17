const express = require('express');
const router = express.Router();

const setMetadataFileUploaded = require('../../middleware/setMetadataFileUploaded');
const checkMimetypeAudio = require('../../middleware/checkMimetypeAudio');
const checkObjectId = require('../../middleware/checkObjectId');
const { check, validationResult } = require('express-validator');

const AudioStimulusController = require('../../controllers/AudioStimulusController');

// @route    POST api/audioStimuli
// @desc     Upload multiple audioStimuli
// @access   Private
router.post(
  '/',
  [check('titles').isArray()],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  checkMimetypeAudio,
  setMetadataFileUploaded,
  AudioStimulusController.upload
);

// @route    GET api/audioStimuli/:id/download
// @desc     Download audioStimulus specified by id
// @access   Public
router.get(
  '/:id/download',
  checkObjectId('id'),
  AudioStimulusController.download
);

// @route    GET api/audioStimuli/:id/download
// @desc     Download audioStimulus specified by id
// @access   Public
router.get('/:id', checkObjectId('id'), AudioStimulusController.readByID);

// @route    GET api/audioStimuli
// @desc     Read all audioStimuli
// @access   Public
router.get('/', AudioStimulusController.read);

module.exports = router;
