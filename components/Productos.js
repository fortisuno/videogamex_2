import React from 'react'
import Producto from './Producto'

const Productos = ({data}) => {
  return (
	 <div className="productos">
			{data.map((props, i) => (
				<Producto key={i} {...props}/>
			))}
	 </div>
  )
}

export default Productos