import React from 'react';
import styled from 'styled-components';
import { withTheme } from 'styled-components';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Theme from 'components/Theme';

let percentage = 0;
let sec = 0;

const Wrapper = styled.div`
	display: block;
	width: 100px;
	height: auto;
	margin: 0 auto;
`;

class Timer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			perc: 0,
		};
	}

	componentDidMount() {
		const self = this;
		self.interval = setInterval(function() {
			percentage += 1;
			if (percentage <= 100) {
				self.setState({
					perc: percentage,
				});
			} else {
				clearInterval(self.interval);
				self.props.onTimesUp();
			}
		}, 60);
	}

	componentWillUnmount() {
		console.log('UNMOUNT');
		const self = this;
		clearInterval(self.interval);
		percentage = 0;
	}

	render() {
		return (
			<Wrapper>
				<CircularProgressbar
					percentage={this.state.perc}
					strokeWidth={50}
					background={false}
					backgroundPadding={2}
					styles={{
						trail: { stroke: '#63e080' },
						path: {
							strokeLinecap: 'butt',
							stroke: '#effbf2',
						},
						text: { fill: '#000' },
					}}
				/>
			</Wrapper>
		);
	}
}

export default Timer;
