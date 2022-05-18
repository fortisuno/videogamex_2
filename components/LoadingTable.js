import { CircularProgress } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const LoadingTable = () => {
	return (
		<Box
			sx={{
				position: "absolute",
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				bgcolor: "#fff",
				zIndex: 10,
				display: "flex",
				justifyContent: "center",
				alignItems: "center"
			}}
		>
			<CircularProgress />
		</Box>
	)
}

export default LoadingTable