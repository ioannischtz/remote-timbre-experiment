const mongoose = require('../db');

const Schema = mongoose.Schema;
const ResponseSchema = new Schema({
  session_id: { type: Schema.Types.ObjectId, required: true, ref: 'Session' },
  stimulus_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'AudioStimulus'
  },
  stimulus_title: { type: String, required: true },
  category: { type: String, required: true },
  trial_N: { type: Number, required: true },
  responseMode: {type: String, required: true},         // 1=Slider, 2=Carousel, 3=Image
  playsCount: {type: Number, required: true},
  timeElapsed: {type: Number, required: true},
  response: { type: Number, required: true },
  lastModified: { type: Date, default: Date.now }
});

// timbre_attribute = [texture, luminance, mass]

module.exports = mongoose.model('Response', ResponseSchema);
