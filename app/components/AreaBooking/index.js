import React, { PropTypes } from 'react';
import Wrapper from './Wrapper';
import { ThemeProvider } from 'styled-components';
import LocaleToggle from 'containers/LocaleToggle';
import Confirm from 'components/Confirm';
import Timer from 'components/Timer';
import { createStructuredSelector } from 'reselect';

import { connect } from 'react-redux';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import SceneStart from 'components/SceneStart';
import SceneCancel from 'components/SceneCancel';
import SceneAction from 'components/SceneAction';
import SceneVerify from 'components/SceneVerify';

import reducer from 'containers/HomePage/reducer';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import messages from './messages';

import {
  makeSelectScene,
  makeSelectFreeSlots,
} from 'containers/HomePage/selectors';
import { changeScene } from 'containers/HomePage/actions';
/* eslint-disable react/prefer-stateless-function */

class AreaBooking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
    };
  }

  render() {
    return (
      <Wrapper>
        <div>
          <LocaleToggle />
          {this.props.scene == 'Start' && (
            <SceneStart
              onButtonClick={this.props.onChangeSceneToAction}
              freeSlots={this.props.freeSlots}
            />
          )}
          {this.props.scene == 'Action' && (
            <SceneAction
              onTimesUp={this.props.onChangeSceneToStart}
              onButtonClick={this.props.onChangeSceneToVerify}
              onCancelClick={this.props.onChangeSceneToCancel}
            />
          )}
          {this.props.scene == 'Cancel' && (
            <SceneCancel onButtonClick={this.props.onChangeSceneToStart} />
          )}
          {this.props.scene == 'Verify' && (
            <SceneVerify onButtonClick={this.props.onChangeSceneToStart} />
          )}
        </div>
      </Wrapper>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    onChangeSceneToStart: scene => dispatch(changeScene('Start')),
    onChangeSceneToAction: scene => dispatch(changeScene('Action')),
    onChangeSceneToCancel: scene => dispatch(changeScene('Cancel')),
    onChangeSceneToVerify: scene => dispatch(changeScene('Verify')),
  };
}

const mapStateToProps = createStructuredSelector({
  scene: makeSelectScene(),
  freeSlots: makeSelectFreeSlots(),
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
