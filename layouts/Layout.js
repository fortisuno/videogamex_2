import React, { useContext, useEffect } from 'react'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { AppContext } from '../pages/_app';

const Layout = ({admin, children}) => {

	return (
		<div className='app-layout'>
			<Navbar admin={admin} />
				{children}
			<Footer/>
		</div>
	)
}

export default Layout