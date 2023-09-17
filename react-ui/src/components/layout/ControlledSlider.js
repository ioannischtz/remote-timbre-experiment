import React from 'react';
import PropTypes from 'prop-types';
import { Slider } from 'antd';

function ControlledSlider({ sliderValue, onSliderChange, pending }) {
  return (
    <>
      <Slider
        min={1}
        max={8}
        step={1}
        style={{ width: '50vmin' }}
        value={sliderValue}
        onChange={onSliderChange}
        disabled={pending}
      />
    </>
  );
}

ControlledSlider.propTypes = {
  sliderValue: PropTypes.number.isRequired,
  onSliderChange: PropTypes.func.isRequired,
  imagesStatus: PropTypes.bool.isRequired
};

export default ControlledSlider;
