import styled from "@emotion/styled";

export const MessageBlock = styled.div<{ isAuthorCurrentUser: boolean; }>`
	width: auto;
	height: auto;
	display: flex;
	flex-direction: column;
	padding: 10px;
	justify-content: ${({ isAuthorCurrentUser }) => isAuthorCurrentUser ? 'flex-end' : 'start'};
`

export const MessageContentBlock = styled.div<{ isAuthorCurrentUser: boolean; }>`
	color: white;
  display: flex;
  align-items: center;
	justify-content: ${({ isAuthorCurrentUser }) => isAuthorCurrentUser ? 'end' : 'start'};
	& > div {
		width: auto;
		height: auto;
		display: block;
		align-items: center;
		border-radius: 5px;
		min-height: 40px;
		overflow-wrap: break-word;
		word-break: break-word;
		padding-right: ${({ isAuthorCurrentUser }) => isAuthorCurrentUser ? '15px' : '25px'};
  	padding-left: ${({ isAuthorCurrentUser }) => isAuthorCurrentUser ? '25px' : '15px'};
		background-color: ${({ isAuthorCurrentUser }) => isAuthorCurrentUser ? '#4f67c0' : '#174c85'};
	}
`

export const MessageMetaBlock = styled.div<{ isAuthorCurrentUser: boolean; }>`
	width: auto;
	display: flex;
	font-size: 12px;
	justify-content: ${({ isAuthorCurrentUser }) => isAuthorCurrentUser ? 'end' : 'start'};
	& > p {
		margin-top: 1px;
		margin-left: 5px;
	}
`