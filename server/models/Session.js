const mongoose = require('../db');

const Schema = mongoose.Schema;
const SessionSchema = new Schema({
  session_id: { type: String, required: true },
  completed: { type: Boolean, required: true },
  experiment_step: { type: Number, required: true },
  stimuli_order: [{ type: Number, required: true }],
  audio_ids: [
    { type: Schema.Types.ObjectId, required: true, ref: 'AudioStimulus' }
  ],
  lastModified: { type: Date, default: Date.now }
});

// stimuli_N = N of audio stimuli , probably 10
// total N of stimuli = stimuli_N x 3 (texture, luminance, mass)
// stimuli_order = [randomized IDs] 1 - 3xN ,
//  1 - N --> texture, N+1 - 2N --> lumincance, 2N+1 - 3N --> mass

module.exports = mongoose.model('Session', SessionSchema);
