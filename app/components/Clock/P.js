import styled from 'styled-components';
// For some reason this file that does not exist is imported.
// eslint-disable-next-line import/no-unresolved, import/extensions
import clockStyles from './clockStyles';

const P = styled.p`
  ${clockStyles};
`;

export default P;
