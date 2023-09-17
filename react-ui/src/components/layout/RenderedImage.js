import React from 'react';
import { Image } from 'antd';
import arrayBufferToBase64 from '../../utils/arrayBufferToBase64';

function RenderedImage({ img_idxs, slideCount, images }) {
  const base64Flag = 'data:image/jpeg;base64,';
  // console.log('img_idxs', img_idxs);
  // console.log('slideCount', slideCount);
  // console.log('images', images);
  const img_idx = img_idxs[slideCount - 1];
  // console.log('img_idx: ', img_idx);
  const imageStr =
    base64Flag + arrayBufferToBase64(images.data[img_idx].img.data.data);
  return (
    <>
      <Image
        src={imageStr}
        preview={false}
        style={{ width: '100%', maxWidth: '70vmin', height: 'auto' }}
      />
    </>
  );
}

export default RenderedImage;
