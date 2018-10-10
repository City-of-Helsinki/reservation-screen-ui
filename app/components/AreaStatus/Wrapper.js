import styled from 'styled-components';

const Wrapper = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 50%;
	padding: 5%;
	background-color: ${props => props.theme.primaryColor};
`;

export default Wrapper;
