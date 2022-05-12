import React from 'react'
import DashboardLayout from '../../components/DashboardLayout'

export async function getStaticProps({params}) {
	return {
		props: {
			data: {
				slug: ["resumen_de_ingresos"],
			}
		},
	}
}

const ResumenDeIngresos = () => {
  return (
	 <div>ResumenDeIngresos</div>
  )
}

ResumenDeIngresos.getLayout = DashboardLayout.getLayout

export default ResumenDeIngresos