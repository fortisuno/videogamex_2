import React, { useState } from 'react'
import Link from 'next/link'
import { Dropdown, DropdownButton, FormControl, InputGroup, SplitButton } from 'react-bootstrap'

const Navbar = ({admin}) => {
	
	return (
		<div className={"nav-app w-100 shadow-sm " + ( admin ? "bg-primary" : "" )}>
			<div className="nav-header">
				<div className="nav-image py-2 px-3 me-3">
					<img height={56} src="/images/logo.jpeg" className='ms-3'></img>
				</div>
			</div>
			<div className="nav-menu py-2 px-3 ">
				<Link href={admin ? '/' : '/dashboard/productos'}>
					<a className={'btn me-3 btn-outline-' + ( admin ? "white" : "dark" )}>
						{admin ? "Volver a la tienda" : "Ir al dashboard"}
					</a>
				</Link>
				<Dropdown>
					<Dropdown.Toggle variant={'btn btn-transparent-'  + ( admin ? "light" : "dark" )} id="dropdown-basic" disabled>
						<i className="bi-gear-fill me-1"/>
					</Dropdown.Toggle>

					<Dropdown.Menu>
						<Dropdown.Item>Configuación de cuenta</Dropdown.Item>
						<Dropdown.Item>Cerrar Sesión</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			</div>
		</div>
	)
}

export default Navbar