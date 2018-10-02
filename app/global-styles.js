import { injectGlobal } from 'styled-components';
import HelsinkiGroteskRegularWoff from './fonts/HelsinkiGrotesk-Regular.woff';
import HelsinkiGroteskRegularTtf from './fonts/Mali-Bold.ttf'; // testing files

/* eslint no-unused-expressions: 0 */
injectGlobal`

  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: Times;
  }

  body.fontLoaded {
    font-family: HelsinkiGroteskRegularWoff, 'Open Sans', Impact;
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

  p,
  label {
    line-height: 1.5em;
  }
`;
