// This component is integrated from Varaamo. It makes use of variables
// that are not configured for this project. Due to very strict time
// constraints I did not have time to find a more elegant way of
// integrating the necessary themes.

// Found from here
// https://github.com/City-of-Helsinki/varaamo/blob/23b6ba3aba9b6646a2aa344e69edd9d0e6bf20d0/app/assets/styles/_application-variables.scss
const WHITE = '#fff';
const BLACK = '#000';
const RED = '#ed2127';
const GRAY_LIGHT = '#ebedf1';
const HEL_COAT = '#0072c6';
const FONT_WEIGHT_BOLD = '600';
const SCREEN_SM_MIN_INT = 768;
const SCREEN_XS_MAX = `${SCREEN_SM_MIN_INT - 1}px !default`;
const SCREEN_XS_MIN = '480px !default';

const theme = Object.freeze({
  WHITE,
  BLACK,
  RED,
  GRAY_LIGHT,
  HEL_COAT,
  FONT_WEIGHT_BOLD,
  SCREEN_XS_MAX,
  SCREEN_XS_MIN,
});

export default theme;
