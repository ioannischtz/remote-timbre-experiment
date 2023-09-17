import React, {useState} from 'react';
import { Image } from 'antd';
import arrayBufferToBase64 from '../../utils/arrayBufferToBase64';

import './ImagesGrid.css'

function ImagesGrid({ img_idxs, images, slideCount, handleImgSelect }) {

  const [img1active, setImg1Active] = useState(false);
  const [img2active, setImg2Active] = useState(false);
  const [img3active, setImg3Active] = useState(false);
  const [img4active, setImg4Active] = useState(false);
  const [img5active, setImg5Active] = useState(false);
  const base64Flag = 'data:image/jpeg;base64,';

  const img_idx1 = img_idxs[0];
  const img_idx2 = img_idxs[1];
  const img_idx3 = img_idxs[3];
  const img_idx4 = img_idxs[5];
  const img_idx5 = img_idxs[7];

  const imageStr1 =
    base64Flag + arrayBufferToBase64(images.data[img_idx1].img.data.data);
  const imageStr2 =
    base64Flag + arrayBufferToBase64(images.data[img_idx2].img.data.data);
  const imageStr3 =
    base64Flag + arrayBufferToBase64(images.data[img_idx3].img.data.data);
  const imageStr4 =
    base64Flag + arrayBufferToBase64(images.data[img_idx4].img.data.data);
  const imageStr5 =
    base64Flag + arrayBufferToBase64(images.data[img_idx5].img.data.data);
  const imgStyles = {
    width: '100%', maxWidth: '15vmax', height: 'auto'
  };
  return (
    <ul className='ImagesGrid'>
       <li key={1} onClick={(e) => {
            handleImgSelect((c) => 1);
            setImg1Active(true);
            setImg2Active(false);
            setImg3Active(false);
            setImg4Active(false);
            setImg5Active(false);}}>
        <Image
            src={imageStr1}
            preview={false}
            style={imgStyles}
            className={`ImagesGrid-img ${img1active ? 'ImagesGrid-img-Selected' : ''}`}
        />
      </li>
      <li key={2} onClick={(e) => {
            handleImgSelect((c) => 2);
            setImg1Active(false);
            setImg2Active(true);
            setImg3Active(false);
            setImg4Active(false);
            setImg5Active(false);}}>
        <Image
            src={imageStr2}
            preview={false}
            style={imgStyles}
            className={`ImagesGrid-img ${img2active ? 'ImagesGrid-img-Selected' : ''}`}
        />
      </li>
      <li key={3} onClick={(e) => {
            handleImgSelect((c) => 3);
            setImg1Active(false);
            setImg2Active(false);
            setImg3Active(true);
            setImg4Active(false);
            setImg5Active(false);}}>
        <Image
            src={imageStr3}
            preview={false}
            style={imgStyles}
            className={`ImagesGrid-img ${img3active ? 'ImagesGrid-img-Selected' : ''}`}
        />
      </li>
      <li key={4} onClick={(e) => {
            handleImgSelect((c) => 4);
            setImg1Active(false);
            setImg2Active(false);
            setImg3Active(false);
            setImg4Active(true);
            setImg5Active(false);}}>
        <Image
            src={imageStr4}
            preview={false}
            style={imgStyles}
            className={`ImagesGrid-img ${img4active ? 'ImagesGrid-img-Selected' : ''}`}
        />
      </li>
      <li key={5} onClick={(e) => {
            handleImgSelect((c) => 5);
            setImg1Active(false);
            setImg2Active(false);
            setImg3Active(false);
            setImg4Active(false);
            setImg5Active(true);}}>
        <Image
            src={imageStr5}
            preview={false}           
            style={imgStyles}
            className={`ImagesGrid-img ${img5active ? 'ImagesGrid-img-Selected' : ''}`}
        />
      </li>
    </ul>
  );
}

export default ImagesGrid;
