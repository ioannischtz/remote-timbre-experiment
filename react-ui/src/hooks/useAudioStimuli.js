import axios from 'axios';
import useAsync from '../hooks/useAsync';

import { AUDIO_ERROR } from '../actions/types';

// Get all audio
async function getAudioStimuli() {
  try {
    const res = await axios.get('/remote-psychophysics/api/audioStimuli');
    // console.log('res.data', res.data);
    return res;
  } catch (err) {
    const error = {
      type: AUDIO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    };
    return error;
  }
}

const useAudioStimuli = (tOrF = true) => {
  // Get all audio with useAsync
  const { execute, status, value, error } = useAsync(getAudioStimuli, tOrF);
  return {
    audioStimuliExecute: execute,
    audioStimuli: value,
    audioStimuliStatus: status,
    audioStimuliError: error
  };
};

export default useAudioStimuli;
