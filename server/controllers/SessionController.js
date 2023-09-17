const Session = require('../models/Session');
const Response = require('../models/Response');
const AudioStimulus = require('../models/AudioStimulus');
const genRandKey = require('../utils/genRandKey');



exports.createSession = async (req, res, next) => {
  const randSessionIDs = new Array(30);
  const stimuli_order = new Array(72);
  for (let i = 0; i < 30; i += 1) {
    randSessionIDs[i] = genRandKey(8);
  }
  for (let i = 0; i < 72; i += 1) {
    stimuli_order[i] = i;
  }

  try {

    const audioStimuli = await AudioStimulus.find();
    if (!audioStimuli) {
      return res.status(400).json({ msg: 'There are no audioStimuli' });
    }
    const audio_ids = audioStimuli.map(audio => audio._id);

    let sessions_arr = [];

    for (let i = 0; i < 30; i += 1) {
      let session = new Session({
        session_id: randSessionIDs[i],
        completed: false,
        experiment_step: 0,
        stimuli_order: [...stimuli_order],
        audio_ids: [...audio_ids]
      });
      await session.save();
      sessions_arr.push(session.session_id);
    }
    return res.json(sessions_arr);
  } catch (err) {
    console.error('SubjectController catch error: ', err.message);
    res.status(500).send('Server error');
    next(err);
  }
};

exports.randomize_stims = async (req, res, next) => {
  try {
    // const totalN_stims = 72;
    const stimuli_order = new Array(72);
    for (let i = 0; i < stimuli_order.length; i += 1) {
      stimuli_order[i] = i;
    }

    for (let i = stimuli_order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [stimuli_order[i], stimuli_order[j]] = [
        stimuli_order[j],
        stimuli_order[i]
      ];
    }

    const data = { stimuli_order };
    // Encrypt password

    const session = await Session.findByIdAndUpdate(
      req.user.id,
      { $set: data },
      { new: true }
    );

    if (!session) {
      return res
        .status(400)
        .json({ msg: 'There is no experimenter with this id' });
    }

    res.json(session);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
    next(err);
  }
};

exports.singleResponse = async (req, res, next) => {
  try {
    // const totalN_stims = 72;
    const {
      response,
      stimuli_order,
      experiment_step,
      responseMode,
      playsCount,
      timeElapsed,
      completed
    } = {
      ...req.body
    };

    const session_data = { stimuli_order, experiment_step: experiment_step + 1, completed };

    const session = await Session.findByIdAndUpdate(
      req.user.id,
      { $set: session_data },
      { new: true }
    );

    if (!session) {
      return res.status(400).json({ msg: 'There is no session with this id' });
    }

    const audioStimuli = await AudioStimulus.find();
    if (!audioStimuli) {
      return res.status(400).json({ msg: 'There are no audioStimuli' });
    }

    let audioStimIDs = [];
    let audioStimTitles = [];
    let categories = [];
    stimuli_order.forEach((stim_id, i) => {
      if (stim_id < 24) {
        audioStimIDs[i] = audioStimuli[stim_id].id;
        audioStimTitles[i] = audioStimuli[stim_id].title;
      } else if (stim_id < 48) {
        audioStimIDs[i] = audioStimuli[stim_id - 24].id;
        audioStimTitles[i] = audioStimuli[stim_id - 24].title;
      } else {
        audioStimIDs[i] = audioStimuli[stim_id - 48].id;
        audioStimTitles[i] = audioStimuli[stim_id - 48].title;
      }

      if (stim_id < 24) {
        categories[i] = 'texture';
      } else if (stim_id < 48) {
        categories[i] = 'mass';
      } else {
        categories[i] = 'brightness';
      }
    });

    const response_ = new Response({
      session_id: req.user.id,
      stimulus_id: audioStimIDs[experiment_step],
      stimulus_title: audioStimTitles[experiment_step],
      category: categories[experiment_step],
      trial_N: experiment_step,
      responseMode,
      playsCount,
      timeElapsed,
      response,
      lastModified: new Date()
    });

    await response_.save();


    return res.json(response_);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
    next(err);
  }
};

exports.finalize = async (req, res, next) => {
  try {
    // const totalN_stims = 30;
    const {
      responses_arr,
      stimuli_order,
      experiment_step,
      current_sess_steps,
      responseMode,
      playsCount,
      timeElapsed,
      completed
    } = {
      ...req.body
    };

    // console.log('On server responses_arr', responses_arr);
    // console.log('On server experiment_step', experiment_step);

    const session_data = { stimuli_order, experiment_step, completed };
    // Encrypt password
    const session = await Session.findByIdAndUpdate(
      req.user.id,
      { $set: session_data },
      { new: true }
    );

    if (!session) {
      return res.status(400).json({ msg: 'There is no session with this id' });
    }

    const audioStimuli = await AudioStimulus.find();
    if (!audioStimuli) {
      return res.status(400).json({ msg: 'There are no audioStimuli' });
    }

    let audioStimIDs = [];
    let audioStimTitles = [];
    let categories = [];
    stimuli_order.forEach((stim_id, i) => {
      if (stim_id < 24) {
        audioStimIDs[i] = audioStimuli[stim_id].id;
        audioStimTitles[i] = audioStimuli[stim_id].title;
      } else if (stim_id < 48) {
        audioStimIDs[i] = audioStimuli[stim_id - 24].id;
        audioStimTitles[i] = audioStimuli[stim_id - 24].title;
      } else {
        audioStimIDs[i] = audioStimuli[stim_id - 48].id;
        audioStimTitles[i] = audioStimuli[stim_id - 48].title;
      }

      if (stim_id < 24) {
        categories[i] = 'texture';
      } else if (stim_id < 48) {
        categories[i] = 'mass';
      } else {
        categories[i] = 'brightness';
      }
    });

    let responses = [];
    for (let i = 0; i < current_sess_steps; i += 1) {
      const response = new Response({
        session_id: req.user.id,
        stimulus_id: audioStimIDs[i],
        stimulus_title: audioStimTitles[i],
        category: categories[i],
        trial_N: experiment_step - current_sess_steps + i,
        responseMode: responseMode[i],
        playsCount: playsCount[i],
        timeElapsed: timeElapsed[i],
        response: responses_arr[i],
        lastModified: new Date()
      });

      responses[i] = response;

      await response.save();
    }

    return res.json(responses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
    next(err);
  }
};

exports.getResponses = async (_req, res, next) => {
  try {
    const responses = await Response.find();
    if (!responses) {
      return res.status(400).json({ msg: 'There are no responses' });
    }

    res.contentType('json');
    return res.send(responses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
    next(err);
  }
};

exports.getResponsesByID = async (req, res, next) => {
  try {
    const { session_id } = req.params;

    const responses = await Response.find({ session_id: session_id });

    if (!responses) {
      return res
        .status(404)
        .send({ message: 'responses not found for this session id' });
    }
    res.contentType('json');
    return res.status(200).send({ responses });
  } catch (err) {
    next(err);
  }
};

exports.readByID = async (req, res, next) => {
  try {
    const session = await Session.findOne({
      _id: req.user.id
    });

    if (!session) {
      return res.status(400).json({ msg: 'There is no session with this id' });
    }

    return res.json(session);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
    next(err);
  }
};
