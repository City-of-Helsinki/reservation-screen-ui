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
`;

class SceneStart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      selectedSlot: false,
      /*items: [
        { id: 'button-1', text: '11:00', active: false },
        { id: 'button-2', text: '13:00', active: false },
        { id: 'button-3', text: '16:00', active: false },
      ],*/
    };
  }

  switchButtonState = begin => {
    /*
    let btns = this.state.items;
    let clickedBtn = btns[btnIndex];
    let sameBtn = !btns[btnIndex].active ? true : false;
    let filteredButtons = btns.filter(function(btn, i) {
      if (i !== btnIndex) {
        return btn;
      }
    });

    filteredButtons.map(item => (item.active = false));
    btns[btnIndex].active = sameBtn;
    */
    this.setState({
      selectedSlot: begin,
      disabled: false,
    });
  };

  render() {
    return (
      <Wrapper>
        <H2>
          <FormattedMessage {...messages.title} />
        </H2>
        <ButtonList
          freeSlots={this.props.freeSlots}
          selectedSlot={this.state.selectedSlot}
          onButtonClick={this.switchButtonState}
        />
        <Submit
          disabled={this.state.disabled}
          onClick={this.props.onButtonClick}
        >
          <FormattedMessage {...messages.book} />
        </Submit>
      </Wrapper>
    );
  }
}

export default SceneStart;
