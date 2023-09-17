module.exports = (req, res, next) => {
  try {
    if (!req.files) {
      return res.status(400).send({ message: 'File is required' });
    }

    req.files.forEach((fl, id) => {
      if (
        !(
          fl.mimetype == 'image/bmp' ||
          fl.mimetype == 'image/gif' ||
          fl.mimetype == 'image/jpeg' ||
          fl.mimetype == 'image/png'
        )
      ) {
        throw new Error(
          `File ${id} doesn't have an acceptable image extension`
        );
      }
    });
    next();
  } catch (error) {
    next(err);
  }
};
