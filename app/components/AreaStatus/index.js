import React, { useState, useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Map } from 'immutable';

import injectReducer from 'utils/injectReducer';
import SceneVerify from 'components/SceneVerify';
import SceneError from 'components/SceneError';
import SceneSetup from 'components/SceneSetup';
import SceneLoading from 'components/SceneLoading';
import reducer from 'containers/HomePage/reducer';
import {
  makeSelectScene,
  makeSelectErrorMessage,
  makeSelectResource,
} from 'containers/HomePage/selectors';
import { changeScene } from 'containers/HomePage/actions';
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
  onCalendarViewChange,
  resource: resourceWithoutDefault,
  reservationBeingCreated,
  scene,
}) => {
  const wrapperRef = useRef(null);
  const [, height] = useElementSize(wrapperRef);

  const resource = resourceWithoutDefault || new Map();
  const currentDate = new Date().toISOString();

  return (
    <Wrapper innerRef={wrapperRef}>
      <Div>
        {/* View displaying calendar */}
        {scene === 'Start' &&
          resource &&
          height && (
            <Calendar
              date={currentDate}
              // Approximately remove padding from wrapper height
              height={height - 2 * 84}
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
        {/* Loading indicator */}
        {scene === 'Loading' && <SceneLoading />}
        {/* Instructions for giving all the required parameters */}
        {scene === 'Setup' && <SceneSetup />}
        {/* A notice of reservation success */}
        {scene === 'Verify' && (
          <SceneVerify
            onTimesUp={onChangeSceneToStart}
            onButtonClick={onChangeSceneToStart}
          />
        )}
        {/* Shows possible error */}
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
  onCalendarViewChange: PropTypes.func,
  resource: PropTypes.any,
  reservationBeingCreated: PropTypes.object,
  scene: PropTypes.any,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeSceneToStart: () => dispatch(changeScene('Start')),
  };
}

const mapStateToProps = createStructuredSelector({
  errorMessage: makeSelectErrorMessage(),
  resource: makeSelectResource(),
  scene: makeSelectScene(),
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
