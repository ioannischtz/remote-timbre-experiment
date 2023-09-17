import { useState, useEffect } from 'react';

const useAudio = (url) => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    audio.src = url;
    audio.load();
  }, [audio, url]);

  useEffect(() => {
    // playing ? audio.play() : audio.pause();
    if (playing) {
      audio.play();
    } else {
      audio.pause();
      audio.currentTime = 0;
      audio.load();
    }
  }, [audio, playing]);

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, [audio]);

  return [playing, toggle];
};

export default useAudio;
