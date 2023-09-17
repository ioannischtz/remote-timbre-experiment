module.exports = (req, res, next) => {
  try {
    if (!req.files) {
      return res.status(400).send({ message: 'File is required' });
    }

    req.files.forEach((fl, id) => {
      if (
        !(
          fl.mimetype == 'audio/mpeg' ||
          fl.mimetype == 'audio/ogg' ||
          fl.mimetype == 'audio/wave'
        )
      ) {
        throw new Error(
          `File ${id} doesn't have an acceptable audiofile extension`
        );
      }
    });
    next();
  } catch (error) {
    next(err);
  }
};
