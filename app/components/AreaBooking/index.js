import React, { useState, useLayoutEffect, useRef } from 'react';
import LocaleToggle from 'containers/LocaleToggle';
import PropTypes from 'prop-types';
import camelCaseKeys from 'camelcase-keys';

import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
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
  makeSelectSelectedSlot,
  makeSelectErrorMessage,
  makeSelectResourceId,
  makeSelectResource,
} from 'containers/HomePage/selectors';
import { changeScene, makeReservation } from 'containers/HomePage/actions';
import Calendar from 'components/Calendar';
import { Wrapper, Div } from './Wrapper';

function useElementSize(ref) {
  const [size, setSize] = useState([0, 0]);

  useLayoutEffect(() => {
    function updateSize() {
      const currentElement = ref.current;
      if (currentElement) {
        setSize([ref.current.clientWidth, ref.current.clientHeight]);
      }
    }

    window.addEventListener('resize', updateSize);
    updateSize();

    return () => {
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  return size;
}

const AreaBooking = ({
  resource,
  scene,
  selectedSlot,
  onChangeSceneToStart,
  onMakeReservation,
  onChangeSceneToCancel,
  onCalendarViewChange,
  errorMessage,
  resourceId,
}) => {
  const wrapperRef = useRef(null);
  const [, height] = useElementSize(wrapperRef);

  return (
    <Wrapper innerRef={wrapperRef}>
      <Div>
        <LocaleToggle />
        {resource &&
          height && (
            <Calendar
              // Approximately remove padding from wrapper height
              height={height - 2 * 84}
              // Transform immutable data structure into a JSON object,
              // and transform snake_case in that object into camelCase.
              resource={camelCaseKeys(resource.toJS())}
              onDateChange={() => {}}
              onTimeChange={() => {}}
              onViewTypeChange={onCalendarViewChange}
            />
          )}

        {scene === 'Loading' && <SceneLoading />}
        {scene === 'Setup' && <SceneSetup />}
        {scene === 'Action' && (
          <SceneAction
            onTimesUp={onChangeSceneToStart}
            selectedSlot={selectedSlot}
            onButtonClick={onMakeReservation}
            onCancelClick={onChangeSceneToCancel}
          />
        )}
        {scene === 'Cancel' && (
          <SceneCancel
            onTimesUp={onChangeSceneToStart}
            onButtonClick={onChangeSceneToStart}
          />
        )}
        {scene === 'Verify' && (
          <SceneVerify
            onTimesUp={onChangeSceneToStart}
            onButtonClick={onChangeSceneToStart}
          />
        )}
        {scene === 'Error' && (
          <SceneError
            errorMessage={errorMessage}
            onButtonClick={onChangeSceneToStart}
          />
        )}
        {scene === 'StrongAuth' && (
          <SceneStrongAuth
            resource={resource}
            resourceId={resourceId}
            errorMessage={errorMessage}
          />
        )}
      </Div>
    </Wrapper>
  );
};

AreaBooking.propTypes = {
  scene: PropTypes.any,
  selectedSlot: PropTypes.any,
  onChangeSceneToStart: PropTypes.any,
  onChangeSceneToCancel: PropTypes.any,
  onMakeReservation: PropTypes.any,
  onCalendarViewChange: PropTypes.func,
  errorMessage: PropTypes.any,
  resource: PropTypes.any,
  resourceId: PropTypes.any,
};

export function mapDispatchToProps(dispatch) {
  return {
    onMakeReservation: () => dispatch(makeReservation()),
    onChangeSceneToStart: () => dispatch(changeScene('Start')),
    onChangeSceneToCancel: () => dispatch(changeScene('Cancel')),
  };
}

const mapStateToProps = createStructuredSelector({
  scene: makeSelectScene(),
  selectedSlot: makeSelectSelectedSlot(),
  errorMessage: makeSelectErrorMessage(),
  resourceId: makeSelectResourceId(),
  resource: makeSelectResource(),
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
