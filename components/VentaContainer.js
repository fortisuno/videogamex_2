import React, { useContext, useEffect, useState } from 'react'
import { ButtonGroup, Card, Button, ToggleButton, ToggleButtonGroup, Form, InputGroup, FormControl } from 'react-bootstrap'
import CarritoContext from './Carrito'
import ProductoThumbnail from './ProductoThumbnail'

const VentaContainer = () => {

	const {carrito, setCarrito} = useContext(CarritoContext)
	const [metodoPago, setMetodoPago] = useState('Efectivo')
	const [total, setTotal] = useState(0)
	const [monto, setMonto] = useState(0)

	const radios = [
		{ name: <i className='bi bi-cash-coin fs-3'/>, value: 'Efectivo' },
		{ name: <i className='bi bi-credit-card-2-front-fill fs-3'/>, value: 'Tarjeta de crédito' },
	 ];

	useEffect(() => {
		let compra = 0;
		for(let producto of carrito) {
			compra = compra + (producto.precio * producto.cantidad)
		}
		setTotal(compra)
	}, [carrito])

	const handleMetodoPago = ({currentTarget}) => {
		setMetodoPago(currentTarget.value)
	} 

	return (
		<div className='venta-container gap-4'>
			<h2 className='mb-0'>Punto de venta</h2>
			<div className="position-relative"  style={{overflowY: 'auto'}}>
				<div className='vstack gap-3 position-absolute w-100'>
					{
						carrito.map((item) => <ProductoThumbnail data={item} key={item.slug}/>)
					}
				</div>
			</div>
			<div className='vstack gap-3'>
				<div className='vstack'>
					<h3>Metodo de pago</h3>
					<ButtonGroup>
					{radios.map((radio, idx) => (
						<ToggleButton
							key={idx}
							id={`radio-${idx}`}
							type="radio"
							variant="outline-primary"
							name="radio"
							className='btn-metodo-pago'
							value={radio.value}
							checked={metodoPago === radio.value}
							onChange={(e) => setMetodoPago(e.currentTarget.value)}
						>
							{radio.name}
						</ToggleButton>
					))}
					</ButtonGroup>
				</div>
				<div className='mb-3 vstack'>
					<h3>Resumen</h3>
					<div className='hstack'>
						<span>Total a pagar: </span>
						<span className='ms-auto fw-bolder'>${total.toFixed(2)}</span>
					</div>
					<div className='hstack'>
						<span>Método de pago:</span>
						<span className='ms-auto text-truncate text-muted' style={{maxWidth: '140px'}}>{metodoPago}</span>
					</div>
					<div className='hstack align-content-center'>
						<span className=''>Método recibido:</span>
						<InputGroup size="sm" className="w-50 ms-auto">
							<InputGroup.Text>$</InputGroup.Text>
							<FormControl value={monto} type="numeric" className='text-end' placeholder='00' disabled={total > 0 ? false : true} onChange={({currentTarget}) => setMonto(currentTarget.value ? currentTarget.value : 0)}/>
							<InputGroup.Text>.00</InputGroup.Text>
						</InputGroup>
					</div>
					<div className='hstack align-content-center mt-2'>
						<span className=''>Cambio:</span>
						<span className='ms-auto fw-bolder'>${monto - total > 0 ? (monto - total).toFixed(2) : (0).toFixed(2)}</span>
					</div>
				</div>
				<button className='btn btn-lg btn-primary'>
					<i className='bi bi-bag-check-fill me-2'/>
					Realizar venta
				</button>
				<button className='btn btn-lg btn-danger' disabled={carrito.length > 0 ? false : true} onClick={() => setCarrito([])}>
					<i className='bi bi-x-lg me-2'/>
					Cancelar
				</button>
			</div>
      </div>
	)
}

export default VentaContainer