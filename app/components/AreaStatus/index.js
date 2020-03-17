import React, { useState, useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Map } from 'immutable';

import injectReducer from 'utils/injectReducer';
import SceneCancel from 'components/SceneCancel';
import SceneAction from 'components/SceneAction';
import SceneVerify from 'components/SceneVerify';
import SceneError from 'components/SceneError';
import SceneSetup from 'components/SceneSetup';
import SceneLoading from 'components/SceneLoading';
import reducer from 'containers/HomePage/reducer';
import {
  makeSelectScene,
  makeSelectSelectedSlot,
  makeSelectErrorMessage,
  makeSelectResource,
} from 'containers/HomePage/selectors';
import { changeScene, makeReservation } from 'containers/HomePage/actions';
import Calendar from 'components/Calendar';
import { Wrapper, Div } from './Wrapper';

function useElementSize(ref) {
  const [size, setSize] = useState([0, 0]);

  useLayoutEffect(
    () => {
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
    },
    [ref],
  );

  return size;
}

const AreaStatus = ({
  errorMessage,
  onChangeSceneToStart,
  onMakeReservation,
  onChangeSceneToCancel,
  onCalendarViewChange,
  resource: resourceWithoutDefault,
  reservationBeingCreated,
  scene,
  selectedSlot,
}) => {
  const wrapperRef = useRef(null);
  const [, height] = useElementSize(wrapperRef);

  const resource = resourceWithoutDefault || new Map();
  const currentDate = new Date().toISOString();

  return (
    <Wrapper innerRef={wrapperRef}>
      <Div>
        {resource &&
          height &&
          scene === 'Start' && (
            <Calendar
              date={currentDate}
              // Approximately remove padding from wrapper height
              height={height - 2 * 84}
              onDateChange={() => {}}
              onTimeChange={() => {}}
              onViewTypeChange={onCalendarViewChange}
              // We pulled the calendar component from a different
              // project using a different data structure, so we need
              // to do some integration work here to avoid refactoring
              // the Calendar.
              resource={resource && resource.toJS()}
              reservationBeingCreated={
                reservationBeingCreated && reservationBeingCreated.toJS()
              }
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
      </Div>
    </Wrapper>
  );
};

AreaStatus.propTypes = {
  errorMessage: PropTypes.any,
  onChangeSceneToStart: PropTypes.any,
  onChangeSceneToCancel: PropTypes.any,
  onMakeReservation: PropTypes.any,
  onCalendarViewChange: PropTypes.func,
  resource: PropTypes.any,
  reservationBeingCreated: PropTypes.object,
  scene: PropTypes.any,
  selectedSlot: PropTypes.any,
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
)(AreaStatus);
