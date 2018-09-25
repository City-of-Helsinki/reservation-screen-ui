/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import H2 from 'components/H2';
import Clock from 'components/Clock';
import ReposList from 'components/ReposList';
import AreaStatus from 'components/AreaStatus';
import AreaBooking from 'components/AreaBooking';
import AtPrefix from './AtPrefix';
import Form from './Form';
import Input from './Input';
import Section from './Section';
import messages from './messages';
import { loadRepos } from '../App/actions';
import { changeUsername, loadReservations } from './actions';
import {
  makeSelectUsername,
  makeFreeSlots,
  makeUpcomingReservations,
} from './selectors';
import reducer from './reducer';
import saga from './saga';

import styled, { ThemeProvider } from 'styled-components';
import Booking from 'layouts/Booking';

/* eslint-disable react/prefer-stateless-function */

import BackgroundImage from './images/bg-wave-green.png';
import BackgroundImageSoon from './images/bg-wave-yellow.png';
import BackgroundImageTaken from './images/bg-wave-red.png';

const themeFree = {
  // vapaa
  primaryColor: '#63e080',
  secondaryColor: '#effbf2',
  bgImage: BackgroundImage,
};

const themeSoon = {
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

    this.state = {
      theme: themeSoon,
      theme: themeFree,
    };
  }
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
    const self = this;

    this.props.onLoadReservations();

    if (this.props.username && this.props.username.trim().length > 0) {
      this.props.onSubmitForm();
    }
  }

  render() {
    const { loading, error, repos } = this.props;
    const Article = styled.article`
      display: flex;
      height: 100%;
    `;

    const reposListProps = {
      loading,
      error,
      repos,
    };

    return (
      <ThemeProvider theme={this.state.theme}>
        <Article>
          <Helmet>
            <title>Home Page</title>
            <meta
              name="description"
              content="A React.js Boilerplate application homepage"
            />
          </Helmet>
          <Booking upcomingReservations={this.props.upcomingReservations} />
        </Article>
      </ThemeProvider>
    );
  }
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onSubmitForm: PropTypes.func,
  username: PropTypes.string,
  onChangeUsername: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
    },
    onLoadReservations: evt => dispatch(loadReservations()),
  };
}

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  username: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  upcomingReservations: makeUpcomingReservations(),
  freeSlots: makeFreeSlots(),
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
