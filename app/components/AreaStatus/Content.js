import React from 'react';
import styled from 'styled-components';
import H1 from 'components/H1';
import H2 from 'components/H2';
import P from './P';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const Wrapper = styled.div`
	margin-bottom: 30px;
`;

class Content extends React.Component {
	constructor(props) {
		super();
		this.state = {
			room: 'Studiotila 1',
			status: 'Tila on vapaa',
			until: 'Klo 13:00',
		};
	}

	render() {
		return (
			<Wrapper className="c-content">
				<H1>
					<FormattedMessage {...messages.areaTitle} />
				</H1>
				<P>
					<FormattedMessage {...messages.areaStatus} />
				</P>
				<H2>
					{this.state.until}{' '}
					<FormattedMessage {...messages.areaOccupiedUntil} />{' '}
				</H2>
			</Wrapper>
		);
	}
}

export default Content;
