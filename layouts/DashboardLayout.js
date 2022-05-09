import React from 'react'
import Container from '../components/Container'
import Sidebar from '../components/Sidebar'
import Layout from './Layout'

const DashboardLayout = ({data = {}, children}) => {
	return (
		<Layout admin={!!data && (data.admin || false)}>
			<div className='dashboard h-100'>
				<Sidebar path={data.path}/>
				<div className="content px-5">
					<Container title={!!data && (data.title || "Page")}>
						{children}
					</Container>
				</div>
			</div>
		</Layout>
	)
}

DashboardLayout.getLayout = (data, page) => <DashboardLayout data={data}>{page}</DashboardLayout>

export default DashboardLayout