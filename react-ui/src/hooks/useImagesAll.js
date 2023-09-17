import axios from 'axios';
import useAsync from '../hooks/useAsync';
// import arrayBufferToBase64 from '../utils/arrayBufferToBase64';

import { IMG_ERROR } from '../actions/types';

// Get all images
async function getImages() {
  try {
    const res = await axios.get('/remote-psychophysics/api/responseImages');
    // console.log('res.data', res.data);
    return res;
  } catch (err) {
    const error = {
      type: IMG_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    };
    return error;
  }
}

const useImagesAll = (tOrF = true) => {
  // Get all images with useAsync
  const { execute, status, value, error } = useAsync(getImages, tOrF);

  return {
    imagesExecute: execute,
    images: value,
    imagesStatus: status,
    imagesError: error
  };
};

export default useImagesAll;
