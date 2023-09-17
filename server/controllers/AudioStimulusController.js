const persistFileGridFS = require('../utils/persistFileGridFS');
const { connection, mongo } = require('../db');
const AudioStimulus = require('../models/AudioStimulus');

exports.upload = async (req, res, next) => {
  // console.log('AudioStimulus.upload');
  try {
    const audioStimuli = await (async () => {
      const { titles } = req.body;
      const { fileNames, filePaths, fileMimetypes } = res.locals;

      let audioStimuli = [];

      for (let index = 0; index < fileNames.length; index++) {
        await persistFileGridFS(fileNames[index], filePaths[index]);

        const audioStimulus = new AudioStimulus({
          mimetype: fileMimetypes[index],
          title: titles[index],
          fileName: fileNames[index]
        });

        audioStimuli[index] = audioStimulus;

        await audioStimulus.save();
      }

      return audioStimuli;
    })();
    return res.json(audioStimuli);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
    next(err);
  }
};

exports.download = async (req, res, next) => {
  try {
    const { id } = req.params;

    const audioStimulus = await AudioStimulus.findById(id);

    if (!audioStimulus) {
      return res.status(404).send({ message: 'audioStimulus not found.' });
    }

    res.set('content-type', audioStimulus.mimetype);
    res.set('accept-ranges', 'bytes');

    const bucket = new mongo.GridFSBucket(connection.db, {
      bucketName: 'audioFiles'
    });

    let downloadStream = bucket.openDownloadStreamByName(
      audioStimulus.fileName
    );

    downloadStream.on('data', (chunk) => {
      res.write(chunk);
    });

    downloadStream.on('error', () => {
      res.sendStatus(404);
    });

    downloadStream.on('end', () => {
      res.end();
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
    next(err);
  }
};

exports.readByID = async (req, res, next) => {
  try {
    const { id } = req.params;

    const audioStimulus = await AudioStimulus.findById(id);

    if (!audioStimulus) {
      return res.status(404).send({ message: 'audioStimulus not found.' });
    }

    return res.status(200).send({ audioStimulus });
  } catch (err) {
    next(err);
  }
};

exports.read = async (_req, res, next) => {
  try {
    const audioStimuli = await AudioStimulus.find();
    if (!audioStimuli) {
      return res.status(400).json({ msg: 'There are no audioStimuli' });
    }

    return res.json(audioStimuli);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
    next(err);
  }
};
