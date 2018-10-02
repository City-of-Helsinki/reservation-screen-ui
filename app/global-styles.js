import { injectGlobal } from 'styled-components';
import { HelsinkiGroteskRegularWoff } from './fonts/HelsinkiGrotesk-Regular.woff';
import { HelsinkiGroteskRegularTtf } from './fonts/Mali-Bold.ttf'; // testing files

/* eslint no-unused-expressions: 0 */
injectGlobal`

  @font-face {
    font-family: "HelsinkiGroteskRegular";
    url("./fonts/IndieFlower.ttf") format("truetype"),
    url(${HelsinkiGroteskRegularWoff}) format("woff");
    font-weight: normal;
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
    font-family: HelsinkiGroteskRegular, 'Open Sans', sans-serif;
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
    letter-spacing: -2px;
  }

  p,
  label {
    line-height: 1.5em;
  }
`;
