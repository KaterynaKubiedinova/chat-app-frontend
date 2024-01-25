import DeleteTwoToneIcon  from '@mui/icons-material/DeleteTwoTone';
import styled from "@emotion/styled";

export const ChatIcon = styled.div` 
	background: #7eb3ec;
	padding: 10px 15px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 5px;
	width: 90%;
	cursor: auto;
	&:hover {
		background: #253e823a;
		width: 90%;
	}
`

export const ChatName = styled.p`
	word-wrap: break-all;
`

export const DeleteButton = styled(DeleteTwoToneIcon)`
	cursor: pointer;
`