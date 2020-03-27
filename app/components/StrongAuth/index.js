import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import QRCode from 'qrcode.react';
import PropTypes from 'prop-types';

import { toggleDisplayClass } from 'utils/toggleDisplayClass';
import PBase from 'components/P';
import messages from './messages';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 16px;
`;

const P = styled(PBase)`
  text-align: center;
`;

const StrongAuth = ({ isHidden, resourceId }) => (
  <Wrapper className={toggleDisplayClass(isHidden)}>
    <QRCode value={`https://varaamo.hel.fi/resources/${resourceId}`} />
    <P>
      <FormattedMessage
        {...messages.bookAt}
        values={{
          linkLabel: `varaamo.hel.fi/resources/${resourceId}`,
          b: (...chunks) => <b>{chunks}</b>,
        }}
      />
      <br />
      <FormattedMessage {...messages.qrinfo} />
    </P>
  </Wrapper>
);

StrongAuth.propTypes = {
  isHidden: PropTypes.bool,
  resourceId: PropTypes.string.isRequired,
};

export default StrongAuth;
