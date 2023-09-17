module.exports = (req, res, next) => {
  try {
    const fPaths = [];
    const fNames = [];
    const fMimetypes = [];

    req.files.forEach((fl, id) => {
      fPaths[id] = `${global.__multerDestPath}/${fl.filename}`;
      fNames[id] = fl.filename;
      fMimetypes[id] = fl.mimetype;
    });

    res.locals.filePaths = fPaths;
    res.locals.fileNames = fNames;
    res.locals.fileMimetypes = fMimetypes;

    next();
  } catch (err) {
    next(err);
  }
};
