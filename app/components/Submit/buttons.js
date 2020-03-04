import styled from 'styled-components';
import BasicButton from 'components/BasicButton';
import ChevronLeft from './icon-chevron-left.png';

const fontSize = '20px';

export const StyledButton = styled(BasicButton)`
  background-color: #63e080;
  border: 0;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
  padding-left: 4rem;
  padding-right: 4rem;
  line-height: 4.4rem;
  border-radius: 2.2rem;
  font-size: 24px;
  transition: 0.1s opacity linear 0.1s;

  margin-bottom: 30px;

  &[disabled] {
    opacity: 0.2;
    pointer-events: none;
  }
`;

export const CancelLink = styled.div`
  display: block;
  color: red;
  text-decoration: none;
`;

export const ResetLink = styled.div`
  display: block;
  color: #686e6a;
  text-decoration: none;
  font-size: ${fontSize};
  position: relative;

  &:before {
    content: ' ';
    transform: translateY(3px);
    display: inline-block;
    background-image: url(${ChevronLeft});
    background-size: contain;
    background-repeat: no-repeat;
    width: ${fontSize};
    height: ${fontSize};
  }
`;
