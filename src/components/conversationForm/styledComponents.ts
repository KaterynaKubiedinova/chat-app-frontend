import styled from "@emotion/styled";

export const ConversationFormDiv = styled('div')`
	width: 100%;
	min-height: 20px;
	display: flex;
	justify-content: space-between;
	height: 4%;
	position: relative;
`

export const ConversationButton = styled('button')`
	color: white;
	border: none;
	border-radius: 5%;
	background: #8dc4ff;
	flex-grow: 1;
	cursor: pointer;
`

export const ConversationInput = styled('input')`
	padding-left: 5px;
	font-size: 15px;
	border: none;
	flex-grow: 20;
`

export const EmojiButton = styled('button')`
	background: none;
	border: none;
	padding-top: 8px;
	color: #174c85;
	position: relative;
	cursor: pointer;
`

export const EmojiPickerBlock = styled('div')`
	display: flex;
	flex-direction: column;
	position: absolute;
	right: 10%;
`

export const EmojiPicker = styled('div')`
	position: absolute;
	bottom: 40px;
	right: 10%;
`