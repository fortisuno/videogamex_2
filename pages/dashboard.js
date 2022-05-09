import React from 'react'
import DashboardLayout from '../layouts/DashboardLayout'

export async function getStaticProps(ctx) {

  return {
    props: {
      data: {
        title: 'Administración',
        admin: true
      }
    }, // will be passed to the page component as props
  }
}

const Dashboard = ({data}) => {
  return (
	 <div className='fs-1'>Dashboard</div>
  )
}

Dashboard.getLayout = DashboardLayout.getLayout

export default Dashboard