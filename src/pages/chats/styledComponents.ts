import styled from "@emotion/styled";

export const ChatPageBlock = styled.div`
	height: 100vh;
	display: flex;
`

export const Menu = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: start;
	align-items: center;
	max-width: 200px;
	min-width: 25%;
	height: 100%;
	background: #8dc4ff;
	color: #253E82;
`

export const AllChatsBlock = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	overflow-y:scroll;
	margin-top: 10px;
	flex-grow: 97;
	&::-webkit-scrollbar {
		display: none;
	}
`