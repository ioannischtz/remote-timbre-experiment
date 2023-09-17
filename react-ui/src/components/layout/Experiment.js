import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import axios from 'axios';

import api from '../../utils/api';
import { logout } from '../../actions/auth';

import randomizeArr from '../../utils/randomizeArr';

import useImagesAll from '../../hooks/useImagesAll';

import Player from '../Player';
import RenderedImage from './RenderedImage';
import ImagesGrid from './ImagesGrid';
import ControlledCarousel from './ControlledCarousel';
import ControlledSlider from './ControlledSlider';

import { Skeleton, Progress, Button, Spin, Radio, Tooltip   } from 'antd';
import { CloseCircleOutlined, CheckOutlined } from '@ant-design/icons';

import './Experiment.css';

const Experiment = ({ logout, session }) => {
  // Custom hooks

  const { images, imagesStatus } = useImagesAll();

  // local state
  const [experiment_step, setExperiment_step] = useState(0);
  const [current_sess_steps, setCurrent_sess_steps] = useState(0);
  const [stimuli_order, setStimuli_order] = useState([]);
  const [img_idxs, setImg_idxs] = useState([]);
  const [slideCount, setSlideCount] = useState(1);
  const [uiType, setUiType] = useState('1');
  const [audioUrl, setAudioUrl] = useState();
  const [playsCount, setPlaysCount] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);


  // effects

  // init state
  useEffect(() => {
    if (session) {

        setExperiment_step(session.experiment_step);
        if (session.experiment_step === 0) {
          const rand_order = randomizeArr();
          // init image category ids
          if (rand_order[0] < 24) {
            setImg_idxs([0, 1, 2, 3, 4, 5, 6, 7]);
          } else if (rand_order[0] < 48) {
            setImg_idxs([8, 9, 10, 11, 12, 13, 14, 15]);
          } else {
            setImg_idxs([16, 17, 18, 19, 20, 21, 22, 23]);
          }
          setStimuli_order([...rand_order]);
        } else {
          // init image category ids
          if (session.stimuli_order[session.experiment_step] < 24) {
            setImg_idxs([0, 1, 2, 3, 4, 5, 6, 7]);
          } else if (session.stimuli_order[session.experiment_step] < 48) {
            setImg_idxs([8, 9, 10, 11, 12, 13, 14, 15]);
          } else {
            setImg_idxs([16, 17, 18, 19, 20, 21, 22, 23]);
          }
          setStimuli_order((s) => session.stimuli_order);
        }
        const audio_index = session.stimuli_order[session.experiment_step];
  
        let audio_id = '';
        if (audio_index > 47) {
          audio_id = session.audio_ids[audio_index - 48];
          setAudioUrl(
            `/remote-psychophysics/api/audioStimuli/${audio_id}/download`
          );
        } else if (audio_index > 23) {
          audio_id = session.audio_ids[audio_index - 24];
          setAudioUrl(
            `/remote-psychophysics/api/audioStimuli/${audio_id}/download`
          );
        } else {
          audio_id = session.audio_ids[audio_index];
          setAudioUrl(
            `/remote-psychophysics/api/audioStimuli/${audio_id}/download`
          );
        }     
    } else {
      console.log('NO SESSION:', session);
    }
  }, [session]);

  // setAudioUrl

  const onFinalize = useCallback(async () => {
    logout();
  }, []);

  useEffect(() => {
    if (experiment_step === 72) onFinalize();

    if (experiment_step > 0 && stimuli_order) {
      if (stimuli_order[experiment_step] < 24) {
        setImg_idxs([0, 1, 2, 3, 4, 5, 6, 7]);
      } else if (stimuli_order[experiment_step] < 48) {
        setImg_idxs([8, 9, 10, 11, 12, 13, 14, 15]);
      } else {
        setImg_idxs([16, 17, 18, 19, 20, 21, 22, 23]);
      }
      const audio_index = stimuli_order[experiment_step];

      if (audio_index > 47) {
        const audio_id = session.audio_ids[audio_index - 48];
        setAudioUrl(
          `/remote-psychophysics/api/audioStimuli/${audio_id}/download`
        );
      } else if (audio_index > 23) {
        const audio_id = session.audio_ids[audio_index - 24];
        setAudioUrl(
          `/remote-psychophysics/api/audioStimuli/${audio_id}/download`
        );
      } else {
        const audio_id = session.audio_ids[audio_index];
        setAudioUrl(
          `/remote-psychophysics/api/audioStimuli/${audio_id}/download`
        );
      }
    }
    setSlideCount(1);
    setPlaysCount(0);
  }, [experiment_step, onFinalize, session, stimuli_order]);

  // ui-callbacks

  const onNext = async (e) => {
      const body = {
        response: slideCount,
        stimuli_order,
        experiment_step,
        responseMode: uiType,
        playsCount,
        timeElapsed: e.timeStamp - timeElapsed,
        completed: experiment_step === 71
      };
      setExperiment_step((s) => s + 1);
      setCurrent_sess_steps((s) => s + 1);
      try {
        const res = await api.patch('/sessions/single', body);
        // console.log('res.data', res.data);
        return res;
      } catch (err) {
        const error = {
          msg: err.response.statusText,
          status: err.response.status
        };
        return error;
      }
    // setTimeElapsed((t) => e.timeStamp - t);
  };

  const onSliderChange = (value) => {
    setSlideCount(value);
  };
  function handleImgSelect(newValue) {
    setSlideCount(newValue);
  }

  const abortText = 'ABORT and Continue at a later time';

  return (
    <div className="Experiment">
      <div className="Experiment-header"> 
        <Progress
          percent={Math.ceil(experiment_step * (100 / 72))}
          style={{ alignSelf: 'flex-end', padding: '1rem', width: '33vmax' }}
        />
        <Radio.Group defaultValue="1" 
            onChange={(e) => setUiType(e.target.value)}
            size="large" style={
            { alignSelf: 'flex-start',
              display: 'flex', flexDirection: 'column',
              padding: '1rem'
            }
          }>
            <Radio value="1" checked={true}>Slider</Radio>
            <Radio value="2">Arrows</Radio>
            <Radio value="3">Image</Radio>
        </Radio.Group>
        {imagesStatus === 'pending' ? (
          <Skeleton.Button
            active={true}
            size="large"
            style={{
              width: '9rem',
              height: '5rem',
              fontSize: '1.5rem',
              margin: '1rem'
            }}
          />
        ) : (
          <>
          <h1>Stimulus n: {stimuli_order[experiment_step]}</h1>
          <Player url={audioUrl} 
                  pending={imagesStatus === 'pending'}
                  playsCount={playsCount}
                  setPlaysCount={setPlaysCount}
                  timeElapsed={timeElapsed}
                  setTimeElapsed={setTimeElapsed}
          />
          <h2>Διαλέξτε την εικόνα που περιγράφει καλύτερα τον ήχο</h2>
          </>
        )}
      </div>
      <div className="Experiment-content">
        {imagesStatus === 'pending' ? (
          <Spin size="large" tip="Loading...">
            <Skeleton.Image
              style={{ height: '40vmin', width: '70vmin', maxWidth: '70vmin' }}
            />
          </Spin>
        ) : images === null ? (
          <></>
        ) : uiType === '1' ? (

          <RenderedImage
            img_idxs={img_idxs}
            slideCount={slideCount}
            images={images}
          />
        ) : uiType === '2' ? (
            <ControlledCarousel img_idxs={img_idxs} images={images} slideCount={slideCount} handleImgSelect={handleImgSelect}/>
        ) : <ImagesGrid img_idxs={img_idxs} images={images} slideCount={slideCount} handleImgSelect={handleImgSelect}/>}
        {uiType === '1' ?
          (<ControlledSlider
            sliderValue={slideCount}
            onSliderChange={onSliderChange}
            pending={imagesStatus === 'pending'}
          />) : <></>
        }
      </div>
      <div className="Experiment-footer">
          <Tooltip placement="top" title={abortText}>
            <span><Button
              type="primary"
              size="large"
              shape="circle"
              icon={<CloseCircleOutlined />}
              danger
              onClick={async () => {
                await onFinalize();
                logout();
              }}
              disabled={imagesStatus === 'pending'}
            />
            </span>
          </Tooltip>
        {/* </Popconfirm> */}
        <Button
          type="primary"
          size="large"
          icon={<CheckOutlined />}
          style={{ background: ' #149b5f' }}
          onClick={onNext}
          disabled={imagesStatus === 'pending'}
        >
          NEXT
        </Button>
      </div>
    </div>
  );
};

Experiment.propTypes = {
  logout: PropTypes.func.isRequired,
  session: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  session: state.auth.session
});

export default connect(mapStateToProps, { logout })(Experiment);
