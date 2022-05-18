import { Inventory } from '@mui/icons-material'
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import Link from './Link'

const DrawerItem = ({text, icon, selected, path}) => {
	const router = useRouter()
	return (
		<ListItem disablePadding>
			<ListItemButton selected={selected} onClick={() => router.push('/dashboard/' + path)}>
				<ListItemIcon>
					{icon}
				</ListItemIcon>
				<ListItemText primary={text}/>
			</ListItemButton>
		</ListItem>
	)
}

export default DrawerItem