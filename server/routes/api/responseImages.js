const express = require('express');
const router = express.Router();

const setMetadataFileUploaded = require('../../middleware/setMetadataFileUploaded');
const checkMimetypeImg = require('../../middleware/checkMimeTypeImg');
const checkObjectId = require('../../middleware/checkObjectId');
const { check, validationResult } = require('express-validator');

const ResponseImageController = require('../../controllers/ResponseImageController');

// @route    POST api/responseImages
// @desc     Upload multiple responseImages
// @access   Private
router.post(
  '/',
  [check('titles').isArray(), check('categories').isArray()],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  checkMimetypeImg,
  setMetadataFileUploaded,
  ResponseImageController.upload
);

// @route    GET api/responseImages/categories/:category
// @desc     Filter by category
// @access   Public
router.get('/categories/:category', ResponseImageController.filterByCategory);

// @route    GET api/responseImages/:id
// @desc     Download responseImage specified by id
// @access   Public
router.get('/:id', checkObjectId('id'), ResponseImageController.readByID);
// router.get('/:id', auth, ResponseImageController.readByID);

// @route    GET api/responseImages
// @desc     Read all responseImage
// @access   Public
router.get('/', ResponseImageController.read);

module.exports = router;
