import React, { PropTypes } from 'react';
import LocaleToggle from 'containers/LocaleToggle';

import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import SceneStart from 'components/SceneStart';
import SceneCancel from 'components/SceneCancel';
import SceneAction from 'components/SceneAction';
import SceneVerify from 'components/SceneVerify';
import SceneError from 'components/SceneError';
import SceneSetup from 'components/SceneSetup';
import SceneLoading from 'components/SceneLoading';
import SceneStrongAuth from 'components/SceneStrongAuth';
import reducer from 'containers/HomePage/reducer';

import {
  makeSelectScene,
  makeSelectFreeSlots,
  makeSelectSelectedSlot,
  makeSelectErrorMessage,
  makeSelectResourceId,
} from 'containers/HomePage/selectors';
import {
  changeScene,
  changeSlot,
  makeReservation,
} from 'containers/HomePage/actions';
/* eslint-disable react/prefer-stateless-function */

import { Wrapper, Div } from './Wrapper';

class AreaBooking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Wrapper>
        <Div>
          <LocaleToggle />

          {this.props.scene === 'Loading' && <SceneLoading />}
          {this.props.scene === 'Setup' && <SceneSetup />}
          {this.props.scene === 'Start' && (
            <SceneStart
              onSubmit={this.props.onChangeSceneToAction}
              onSelectSlot={this.props.onSelectSlot}
              freeSlots={this.props.freeSlots}
              selectedSlot={this.props.selectedSlot}
            />
          )}
          {this.props.scene === 'Action' && (
            <SceneAction
              onTimesUp={this.props.onChangeSceneToStart}
              selectedSlot={this.props.selectedSlot}
              onButtonClick={this.props.onMakeReservation}
              onCancelClick={this.props.onChangeSceneToCancel}
            />
          )}
          {this.props.scene === 'Cancel' && (
            <SceneCancel
              onTimesUp={this.props.onChangeSceneToStart}
              onButtonClick={this.props.onChangeSceneToStart}
            />
          )}
          {this.props.scene === 'Verify' && (
            <SceneVerify
              onTimesUp={this.props.onChangeSceneToStart}
              onButtonClick={this.props.onChangeSceneToStart}
            />
          )}
          {this.props.scene === 'Error' && (
            <SceneError
              errorMessage={this.props.errorMessage}
              onButtonClick={this.props.onChangeSceneToStart}
            />
          )}
          {this.props.scene === 'StrongAuth' && (
            <SceneStrongAuth
              resource={this.props.resource}
              resourceId={this.props.resourceId}
              errorMessage={this.props.errorMessage}
            />
          )}
        </Div>
      </Wrapper>
    );
  }
}

AreaBooking.propTypes = {
  scene: PropTypes.any,
  onChangeSceneToAction: PropTypes.any,
  onSelectSlot: PropTypes.any,
  freeSlots: PropTypes.any,
  selectedSlot: PropTypes.any,
  onChangeSceneToStart: PropTypes.any,
  onMakeReservation: PropTypes.any,
  onChangeSceneToCancel: PropTypes.any,
  errorMessage: PropTypes.any,
  resource: PropTypes.any,
  resourceId: PropTypes.any,
};

export function mapDispatchToProps(dispatch) {
  return {
    onSelectSlot: slot => dispatch(changeSlot(slot)),
    onMakeReservation: () => dispatch(makeReservation()),
    onChangeSceneToStart: () => dispatch(changeScene('Start')),
    onChangeSceneToAction: () => dispatch(changeScene('Action')),
    onChangeSceneToCancel: () => dispatch(changeScene('Cancel')),
    onChangeSceneToVerify: () => dispatch(changeScene('Verify')),
  };
}

const mapStateToProps = createStructuredSelector({
  scene: makeSelectScene(),
  freeSlots: makeSelectFreeSlots(4),
  selectedSlot: makeSelectSelectedSlot(),
  errorMessage: makeSelectErrorMessage(),
  resourceId: makeSelectResourceId(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'home', reducer });

export default compose(
  withReducer,
  withConnect,
)(AreaBooking);
