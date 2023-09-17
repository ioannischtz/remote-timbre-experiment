import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { login } from '../../actions/auth';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';
import { Input, Button, Card } from 'antd';
import { KeyOutlined, SendOutlined } from '@ant-design/icons';

import './Login.css';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    session_id: ''
  });

  const { session_id } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!session_id) {
      setAlert('Please provide a session id', 'warning');
    } else {
      login(session_id);
    }
  };
  if (isAuthenticated) {
    return <Redirect to="/experiment" />;
  }

  return (
    <div className="Login">
      <Card title="Type your session ID below">
        <form className="Login-form" onSubmit={onSubmit}>
          <div className="Login-form-input">
            <label htmlFor="session_id">SESSION_ID:</label>
            <Input
              name="session_id"
              prefix={<KeyOutlined size="large" />}
              onChange={onChange}
              onPressEnter={onSubmit}
              required
              style={{
                margin: '2vh 0',
                padding: '0.8rem',
                fontSize: '1.5rem'
              }}
            />
          </div>
          <Button
            type="primary"
            size="large"
            icon={<SendOutlined />}
            onClick={onSubmit}
          >
            LOGIN
          </Button>
        </form>
      </Card>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
