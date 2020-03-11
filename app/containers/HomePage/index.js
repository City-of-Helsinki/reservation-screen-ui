/* eslint-disable react/prop-types */
/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import styled, { ThemeProvider } from 'styled-components';

import Booking from 'components/Booking';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import { loadRepos } from '../App/actions';
import { loadReservations, updateClock } from './actions';
import {
  makeSelectResourceId,
  makeSelectResourceName,
  makeSelectResourceDescription,
  makeSelectResourcePeopleCapacity,
  makeSelectResourceMaxPeriod,
  makeSelectIsResourceAvailable,
} from './selectors';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */

import BackgroundImage from './images/bg-wave-green.png';
import BackgroundImageSoon from './images/bg-wave-yellow.png';
import BackgroundImageTaken from './images/bg-wave-red.png';

const themeAvailableNow = {
  // vapaa
  primaryColor: '#63e080',
  secondaryColor: '#effbf2',
  bgImage: BackgroundImage,
};
const themeAvailableSoon = {
  // vapautuu kohta
  primaryColor: '#f7d366',
  secondaryColor: '#fefaef',
  bgImage: BackgroundImageSoon,
};

const themeTaken = {
  // varattu
  primaryColor: '#f15f6d',
  secondaryColor: '#fdeff0',
  bgImage: BackgroundImageTaken,
};

export class HomePage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.clockInterval = false;
    this.resourceInterval = false;
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      theme: themeAvailableSoon,
      // theme: themeAvailableNow,
      // theme: themeTaken,
    };
  }

  componentDidMount() {
    this.props.onLoadReservations();
    this.resourceInterval = setInterval(() => {
      this.props.onLoadReservations();
    }, 60 * 1000);

    // Get clock parameter from address line. For debugging.
    // Do not update clock.
    if (window.location.toString().match(/date=/)) {
      const forceDate = window.location
        .toString()
        .replace(/.*date=/, '')
        .replace(/&.*/, '');
      this.props.onUpdateClock(new Date(forceDate));
    }
    // Init clock and update every minute.
    else {
      this.props.onUpdateClock(new Date());
      this.clockInterval = setInterval(() => {
        this.props.onUpdateClock(new Date());
      }, 60 * 1000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.clockInterval);
    clearInterval(this.resourceInterval);
  }

  render() {
    const { loading, error, repos } = this.props;
    const Article = styled.article`
      display: flex;
      height: 100%;
    `;

    // eslint-disable-next-line no-unused-vars
    const reposListProps = {
      loading,
      error,
      repos,
    };

    // Choose theme based on availability.
    let theme = themeAvailableNow;
    if (!this.props.isResourceAvailable) {
      theme = themeTaken;
    }

    return (
      <ThemeProvider theme={theme}>
        <Article>
          <Helmet>
            <title>Home</title>
            <meta name="description" content="Reservation status" />
          </Helmet>
          <Booking
            resourceId={this.props.resourceId}
            resourceName={this.props.resourceName}
            resourceDescription={this.props.resourceDescription}
            resourcePeopleCount={this.props.resourcePeopleCount}
            resourceMaxReservationTime={this.props.resourceMaxReservationTime}
            isResourceAvailable={this.props.isResourceAvailable}
          />
        </Article>
      </ThemeProvider>
    );
  }
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  // eslint-disable-next-line react/no-unused-prop-types
  onSubmitForm: PropTypes.func,
  // eslint-disable-next-line react/no-unused-prop-types
  onChangeUsername: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    // eslint-disable-next-line no-undef
    onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
    },
    onUpdateClock: date => dispatch(updateClock(date)),
    onLoadReservations: () => dispatch(loadReservations()),
  };
}

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  isResourceAvailable: makeSelectIsResourceAvailable(),
  resourceId: makeSelectResourceId(),
  resourceName: makeSelectResourceName(),
  resourceDescription: makeSelectResourceDescription(),
  resourcePeopleCount: makeSelectResourcePeopleCapacity(),
  resourceMaxReservationTime: makeSelectResourceMaxPeriod(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
