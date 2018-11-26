import React from 'react';
import styled from 'styled-components';
import HelperLink from 'components/HelperLink';
import ButtonList from 'components/ButtonList';
import Submit from 'components/Submit';
import { FormattedMessage, defineMessages } from 'react-intl';
import messages from './messages';

const Wrapper = styled.div`
  display: block;
`;

const LinkWrapper = styled.div`
  color: #f00;
`;

const H2 = styled.h2`
  font-size: 48px;
  text-align: center;
  line-height: 1.2;
`;

const H3 = styled.h3`
  font-weight: 400;
  font-size: 48px;
  text-align: center;
  line-height: 1.1;
`;

class SceneStart extends React.Component {
  constructor(props) {
    super(props);
  }

  selectSlot(slot) {
    this.props.onSelectSlot(slot);
  }

  onSubmit() {
    this.props.onSubmit();
  }

  render() {
    const disabled = this.props.selectedSlot ? false : true;
    const available = this.props.freeSlots.length > 0;
    return (
      <Wrapper>
        {available && (
          <div>
            <H2>
              <FormattedMessage {...messages.title} />
            </H2>
            <ButtonList
              freeSlots={this.props.freeSlots}
              selectedSlot={this.props.selectedSlot}
              onButtonClick={slot => this.selectSlot(slot)}
            />
            <Submit disabled={disabled} onClick={() => this.onSubmit()}>
              <FormattedMessage {...messages.book} />
            </Submit>
          </div>
        )}
        {!available && (
          <H3>
            <FormattedMessage
              {...messages.notAvailable}
              values={{ br: <br /> }}
            />
          </H3>
        )}
      </Wrapper>
    );
  }
}

export default SceneStart;
