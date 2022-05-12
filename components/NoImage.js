import React from 'react'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Box } from '@mui/material';

const NoImage = ({height = "100%"}) => {
	return (
		<Box width={"100%"} pt={height} position={"relative"}>
			<Box
				position={"absolute"}
				top={0}
				left={0}
				right={0}
				bottom={0}
				backgroundColor="#fafafa"
				display="flex"
				justifyContent={"center"}
				alignItems="center"
			>
				<VisibilityOffIcon fontSize='large'/>
			</Box>
		</Box>
	)
}

export default NoImage