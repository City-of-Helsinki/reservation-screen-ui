import { createGlobalStyle } from 'styled-components';
import Woff from './fonts/HelsinkiGrotesk-Regular.woff';
import WoffBold from './fonts/HelsinkiGrotesk-Bold.woff';

export default createGlobalStyle`

  @font-face {
    font-family: "HelsinkiGroteskRegular";
    src: url(${Woff}) format("woff");
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: "HelsinkiGroteskRegular";
    src: url(${WoffBold}) format("woff");
    font-weight: 700;
    font-style: normal;
  }

  html,
  body {
    height: 100%;
    width: 100%;
    color: #191919;
  }

  body {
    /* stylelint-disable-next-line */
    font-family: HelsinkiGroteskRegular, 'Helvetica Neue', Helvetica, Arial;
  }

  body.fontLoaded {
    font-family: HelsinkiGroteskRegular, Times, 'Open Sans', sans-serif;
  }

  .bg-green {
    background-color: #63e080;
  }

  .color-green {
    background-color: #63e080; 
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  .toggable {
    overflow: hidden;
    transform: translateY(0);
    opacity: 1;
    transition: all 0.5s ease-in-out;
    max-height: 300px;
    &.slide-out {
      opacity: 0;
      max-height: 0;
      transform: translateY(-100%);
    }
  }

  

  p,
  label {
    line-height: 1.5em;
  }
`;
