/* eslint-disable react/prop-types */
/*
 *
 * LanguageToggle
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import Toggle from 'components/Toggle';
import Wrapper from './Wrapper';
import messages from './messages';
import { appLocales } from '../../i18n';
import { changeLocale } from '../LanguageProvider/actions';
import { makeSelectLocale } from '../LanguageProvider/selectors';

export const LocaleToggle = ({ locale, onLocaleClick }) => (
  <Wrapper>
    <Toggle
      value={locale} // default lang
      values={appLocales} // fi en se
      messages={messages} //
      onLangClick={onLocaleClick}
    />
  </Wrapper>
);

LocaleToggle.propTypes = {
  onLocaleClick: PropTypes.func,
  locale: PropTypes.string,
};

const mapStateToProps = createSelector(makeSelectLocale(), locale => ({
  locale,
}));

export function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onLocaleClick: evt => dispatch(changeLocale(evt.target.lang)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LocaleToggle);
