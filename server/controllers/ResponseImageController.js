const fs = require('fs');

const ResponseImage = require('../models/ResponseImage');

exports.upload = async (req, res, next) => {
  // console.log('AudioStimulus.upload');
  try {
    const responseImgs = await (async () => {
      const { titles, categories } = req.body;
      const { fileNames, filePaths, fileMimetypes } = res.locals;

      let responseImgs = [];

      for (let index = 0; index < fileNames.length; index++) {
        const responseImage = new ResponseImage({
          mimetype: fileMimetypes[index],
          title: titles[index],
          categories: categories[index],
          img: {
            data: fs.readFileSync(filePaths[index]),
            contentType: fileMimetypes[index]
          }
        });

        responseImgs[index] = responseImage;

        await responseImage.save();
      }

      return responseImgs;
    })();
    // return res.json(responseImgs);
    return res.json('msg Images uploaded');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
    next(err);
  }
};

exports.read = async (_req, res, next) => {
  try {
    const responseImgs = await ResponseImage.find();
    if (!responseImgs) {
      return res.status(400).json({ msg: 'There are no images' });
    }

    res.contentType('json');
    return res.send(responseImgs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
    next(err);
  }
};

exports.readByID = async (req, res, next) => {
  try {
    const { id } = req.params;

    const responseImg = await ResponseImage.findById(id);

    if (!responseImg) {
      return res.status(404).send({ message: 'responseImg not found.' });
    }
    res.contentType('json');
    return res.status(200).send({ responseImg });
  } catch (err) {
    next(err);
  }
};

exports.filterByCategory = async (req, res, next) => {
  const { category } = req.params;
  const matchFilter = { categories: { $in: [category] } };

  try {
    const imagesFilteredByCategory = await ResponseImage.aggregate()
      .unwind('$categories')
      .match(matchFilter)
      .project({ __v: 0 })
      .group({ _id: '$_id', related: { $first: '$$ROOT' } });

    // console.log(imagesFilteredByCategory);

    if (imagesFilteredByCategory.length < 1) {
      return res
        .status(404)
        .send({ message: 'No images found with this category' });
    }

    imagesFilteredByCategory.map((responseImg) => ({
      ...responseImg.related,
      id: responseImg.related._id
    }));

    return res.status(200).send({ imagesFilteredByCategory });
  } catch (err) {
    throw err;
  }
};
