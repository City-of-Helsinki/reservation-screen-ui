import { injectGlobal } from 'styled-components';
import Woff from './fonts/HelsinkiGrotesk-Regular.woff';
import WoffBold from './fonts/HelsinkiGrotesk-Bold.woff';
/* eslint no-unused-expressions: 0 */
injectGlobal`

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
  }

  body {
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

  .fontLoaded h2 {
    
  }

  p,
  label {
    line-height: 1.5em;
  }
`;
