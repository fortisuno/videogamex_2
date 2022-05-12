import React from 'react'

export const useDialog = () => {
	const [opened, setOpened] = React.useState(false)
	const [data, setData] = React.useState({})
	const [dialogView, setDialogView] = React.useState('ver')

	const handleOpen = React.useCallback((data, view = 'ver') => {
		setDialogView(view)
		setData(data)
		setOpened(true)
	 }, [setOpened, setData])
  
	const handleClose = React.useCallback((event, reason) => {
		if(reason && reason == "backdropClick")
			return;
		setOpened(false)
	}, [setOpened])

	const handleDialogView = React.useCallback((view) => {
		setDialogView(view)
	}, [setDialogView])

	return {opened, data, dialogView, handleOpen, handleClose, handleDialogView}
}