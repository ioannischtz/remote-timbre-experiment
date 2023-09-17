import {
  GET_AUDIOSTIMULI,
  GET_AUDIOSTIMULUS,
  AUDIO_ERROR
} from '../actions/types';

const initialState = {
  audioStimuli: [],
  audioStimulus: null,
  loading: true,
  error: {}
};

export default function audio(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_AUDIOSTIMULI:
      return {
        ...state,
        audioStimuli: payload,
        loading: false
      };
    case GET_AUDIOSTIMULUS:
      return {
        ...state,
        audioStimulus: payload,
        loading: false
      };
    case AUDIO_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
