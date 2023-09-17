const express = require('express');

const router = express.Router();

// router.get('/', (req, res) =>
//   res.status(200).send({
//     message: 'The API is up and Running!'
//   })
// );

router.use('/auth', require('./auth'));
router.use('/sessions', require('./sessions'));
router.use('/audioStimuli', require('./audioStimuli'));
router.use('/responseImages', require('./responseImages'));

module.exports = router;
