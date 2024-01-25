import React, { FC } from 'react';
import { StyledAvatar } from '../../themes/styledComponents';

export const CustomAvatar:FC<{email: string | undefined}> = ({email}) => {
	const avatar = email?.[0]?.toUpperCase() ?? 'User';
	return (
		<StyledAvatar>{avatar}</StyledAvatar>
	)
}
