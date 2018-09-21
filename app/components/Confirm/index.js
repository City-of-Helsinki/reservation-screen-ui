import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import Wrapper from './Wrapper';
import messages from './messages';

function Confirm(props) {
	return (
		<Wrapper>
			<p>
				<FormattedMessage
					{...messages.bookingStartsAt}
					values={{ time: props.time, br: <br /> }}
				/>
			</p>

			<p>
				<FormattedMessage
					{...messages.bookingEndsAt}
					values={{ time: props.time, br: <br /> }}
				/>
			</p>
		</Wrapper>
	);
}

export default Confirm;
