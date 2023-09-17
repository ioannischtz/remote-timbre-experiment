import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert } from 'antd';

const Alerts = ({ alerts }) => {
  const alertMap = alerts.map((alert) => (
    <Alert
      key={alert.id}
      message={alert.alertType}
      description={alert.msg}
      type={alert.alertType}
      showIcon
    />
  ));
  return <Fragment>{alertMap}</Fragment>;
};
Alerts.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alerts);
