import styled, { css, keyframes } from 'styled-components';

const AnimationTime = '6s';

const Spin = keyframes`
	0% {
    	transform: rotate(0deg);
  	}
  	100% {
    	transform: rotate(360deg);
  	}
`;

const ShowHide = keyframes`
	0% {
    	opacity: 1;
  	}
  
  	50%, 100% {
    	opacity: 0;
  	}
`;

export const Wrapper = styled.div`
  display: block;
  width: 100px;
  height: 100px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  &.timer--opaque {
    opacity: 0.5;
  }
  &.timer--hidden {
    display: none;
  }
`;

const Aligner = css`
  top: 0;
  position: absolute;
  width: 50%;
  height: 100%;
`;

export const LeftHalf = styled.div`
  ${Aligner};
  left: 0;
  background: ${props => props.theme.secondaryColor};
  z-index: 3;
  opacity: 1;
  animation: ${ShowHide} ${AnimationTime} infinite steps(1, end);
  border-radius: 100% 0 0 100%/ 50% 0 0 50%;
`;

export const RightHalf = styled.div`
  ${Aligner};
  right: 0;
  background: ${props => props.theme.primaryColor};
  z-index: 1;
  opacity: 0;
  animation: ${ShowHide} ${AnimationTime} infinite steps(1, end) reverse;
  border-radius: 0 100% 100% 0/ 0 50% 50% 0;
`;

export const Spinner = styled.div`
  ${Aligner};
  left: 0;
  background: ${props => props.theme.primaryColor};
  animation: ${Spin} ${AnimationTime} linear infinite;
  transform-origin: center right;
  z-index: 2;
  border-radius: 100% 0 0 100%/ 50% 0 0 50%;
`;
