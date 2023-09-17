import React from 'react';

import useAudio from '../hooks/useAudio';
import { Button } from 'antd';
import { PlayCircleOutlined, ReloadOutlined } from '@ant-design/icons';

const Player = ({ url, pending, playsCount,setPlaysCount,timeElapsed,setTimeElapsed }) => {
  const [playing, toggle] = useAudio(url);
  const handleClick = (e) => {
    if(playsCount === 0) setTimeElapsed((c) => e.timeStamp);
    toggle();
    if(!playing) setPlaysCount((c)=>c+1);   
  };

  return (
    <Button
      type="primary"
      size="large"
      style={{
        width: '9rem',
        height: '5rem',
        fontSize: '1.5rem',
        margin: '1rem'
      }}
      icon={playing ? <ReloadOutlined /> : <PlayCircleOutlined />}
      disabled={pending}
      onClick={handleClick}
    >
      {playing ? 'Reload' : 'Play'}
    </Button>
  );
};

export default Player;
