const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AudioStimulusSchema = new Schema({
  mimetype: { type: String, required: true },
  title: { type: String, required: true },
  fileName: { type: String, required: true }
});

module.exports = AudioStimulus = mongoose.model(
  'AudioStimulus',
  AudioStimulusSchema
);
