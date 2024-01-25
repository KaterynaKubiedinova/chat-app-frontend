import styled from "@emotion/styled";

export const ConversationBlock = styled.div`
	width: 75%;
	height: 100%;
	color: #0b498b;
	background: #c5ddf9;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;	
` 
	
export const ConversationHeaderBlock = styled.div`
	background: #7eb3ec;
	width: 100%;
	height: 9%;
	display: flex;
	align-items: center;
	`

export const HeaderContentBlock = styled.div`
	margin: 10px;
	display: flex;
	align-items: center;
`


export const ConversationBodyBlock = styled.div`
	width: 100%;
	height: 87%;
	display: flex;
	flex-direction: column-reverse;
	background: #d6f7eb;
	overflow-y: scroll;
	overflow-x: hidden;
	&::-webkit-scrollbar {
		display: none;
	}
`