import styled from 'styled-components';

const Wrapper = styled.li`
	width: 100%;
	display: flex;
	align-items: center;
	position: relative;
	font-size: 28px;
	border-bottom: 1px solid rgba(0, 0, 0, 0.14);
	&:first-child {
		border-top: none;
	}
`;

export default Wrapper;
