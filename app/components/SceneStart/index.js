import React from 'react';
import styled from 'styled-components';
import HelperLink from 'components/HelperLink';
import ButtonList from 'components/ButtonList';
import Submit from 'components/Submit';
import { FormattedMessage, defineMessages } from 'react-intl';

const messages = defineMessages({
	cancel: {
		id: 'boilerplate.components.SceneStart.link.cancel',
		defaultMessage: 'Peruuta tilaus',
	},
	book: {
		id: 'boilerplate.components.SceneStart.link.book',
		defaultMessage: 'Varaa',
	},
	title: {
		id: 'boilerplate.components.SceneStart.link.title',
		defaultMessage: 'Varaa tila',
	},
});

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
			selectedSlot: '',
			items: [
				{ id: 'button-1', text: '11:00', active: false },
				{ id: 'button-2', text: '13:00', active: false },
				{ id: 'button-3', text: '16:00', active: false },
			],
		};
	}

	switchButtonState = (evt, btnIndex) => {
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

		this.setState({
			selectedSlot: clickedBtn.text,
			disabled: !sameBtn,
		});
	};

	render() {
		return (
			<Wrapper>
				<H2>
					<FormattedMessage {...messages.title} />
				</H2>
				<ButtonList
					items={this.state.items}
					onButtonClick={this.switchButtonState}
				/>
				<Submit
					disabled={this.state.disabled}
					onClick={() => this.props.onClick()}
				>
					<FormattedMessage {...messages.book} />
				</Submit>
			</Wrapper>
		);
	}
}

export default SceneStart;
