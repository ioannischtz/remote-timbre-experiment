import React from 'react';
import { Image, Progress } from 'antd';
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';
import arrayBufferToBase64 from '../../utils/arrayBufferToBase64';
import './ControlledCarousel.css';

function ControlledCarousel({ img_idxs, images, slideCount, handleImgSelect }) {

  const next = () => {
    if(slideCount === 8) {
      handleImgSelect(8);
    } else {
      handleImgSelect((c) => c + 1);
    }
  }
  const prev = () => {slideCount === 1 ? handleImgSelect(1) : handleImgSelect((c) => c - 1)};
  const base64Flag = 'data:image/jpeg;base64,';
  // console.log('img_idxs', img_idxs);
  // console.log('imgCount', slideCount);
  // console.log('images', images);
  const img_idx = img_idxs[slideCount - 1];
  // console.log('img_idx: ', img_idx);
  const imageStr =
    base64Flag + arrayBufferToBase64(images.data[img_idx].img.data.data);
  return (
    <div className='ControlledCarousel'>
      <LeftCircleOutlined onClick={prev} style={{fontSize: '2rem', marginRight: '1rem'}}/>  
      <div className="ControlledCarousel-content">
        <Image
            src={imageStr}
            preview={false}
            style={{ width: '100%', maxWidth: '70vmin', height: 'auto', userSelect: 'none' }}
        />
        <Progress
            showInfo={false}
            steps={8}
            percent={Math.ceil(slideCount * (100 / 8))}
          style={{ alignSelf: 'center', padding: '1rem' }}
        />
      </div>  
      <RightCircleOutlined onClick={next} style={{fontSize: '2rem', marginLeft: '1rem'}}/>
    </div>
  );
}

export default ControlledCarousel;
