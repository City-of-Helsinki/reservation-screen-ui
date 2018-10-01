import React, { PropTypes } from 'react';
import Wrapper from './Wrapper';
import { ThemeProvider } from 'styled-components';
import LocaleToggle from 'containers/LocaleToggle';
import Confirm from 'components/Confirm';
import Timer from 'components/Timer';

import SceneStart from 'components/SceneStart';
import SceneCancel from 'components/SceneCancel';
import SceneAction from 'components/SceneAction';

import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import messages from './messages';

import {
  makeSelectScene,
} from 'containers/HomePage/selectors';

/* eslint-disable react/prefer-stateless-function */

class AreaBooking extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			disabled: true,
		};
	}

	render() {
		return (
			<Wrapper>
				<div>
					<LocaleToggle />

					{this.props.scene == 'Start' && <SceneStart />}
					{this.props.scene == 'Action' && <SceneAction />}
					{this.props.scene == 'Cancel' && <SceneCancel />}
					{this.props.scene == 'Start' && <SceneStart />}
				</div>
			</Wrapper>
		);
	}
}

// export function mapDispatchToProps(dispatch) {
//   return {
//     onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
//     onSubmitForm: evt => {
//       if (evt !== undefined && evt.preventDefault) evt.preventDefault();
//       dispatch(loadRepos());
//     },
//     onInitClock: evt => dispatch(initClock),
//     onLoadReservations: evt => dispatch(loadReservations),
//   };
// }

const mapStateToProps = createStructuredSelector({
  scene: makeSelectScene(),
});

const withConnect = connect(
  mapStateToProps,
  // mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'home', reducer });

export default compose(
  withReducer,
  withConnect,
)(AreaBooking);
