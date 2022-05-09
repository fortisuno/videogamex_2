import React, { useContext, useEffect, useState } from 'react'
import { Button, FormControl, InputGroup } from 'react-bootstrap'
import CarritoContext from './Carrito'

const ProductoThumbnail = ({data}) => {

	const {carrito, setCarrito} = useContext(CarritoContext)
	const [cantidad, setCantidad] = useState(data.cantidad)

	useEffect(() => {

	},[cantidad])

	const addOne = () => {
		
		setCarrito(carrito.map((item) => {
			if (item.slug === data.slug) {
				item.cantidad++;
			}
			return item;
		}))
	}

	const removeOne = () => {
		
		setCarrito(carrito.map((item) => {
			if (item.slug === data.slug && item.cantidad > 1) {
				item.cantidad--;
			}
			return item;
		}))
	}

	const removeAll = () => {
		
		setCarrito(carrito.filter((item) => item.slug !== data.slug))
	}

	return (
		<div className="card border-0 w-100" key={data.slug} style={{userSelect: 'none'}}>
			<div className="row g-0">
				<div className="col">
					{
						data.imagen
							? <img src={data.imagen} className="img-fluid rounded-start" alt="caratula" />
							: (
								<div className="position-relative w-100" style={{paddingTop: '100%'}}>
									<div className="bg-light rounded-start d-flex justify-content-center align-items-center position-absolute top-0 bottom-0 start-0 end-0">
										<i className='bi bi-eye-slash fs-1 text-muted'/>
									</div>
								</div>
							)
					}
				</div>
				<div className="col-md-8">
					<div className="card-body p-0 ps-2 position-relative h-100">
						<h5 className="card-title text-truncate m-0">{data.titulo}</h5>
						<span className="card-text">${data.precio}</span>
						<InputGroup className="mt-auto position-absolute start-0 bottom-0 ms-2" style={{width: 100}} size='sm'>
							<Button variant="secondary" disabled={data.cantidad > 1 ? false : true} onClick={removeOne}>
								<i className='bi bi-dash'/>
							</Button>
							<FormControl
								placeholder='1'
								value={data.cantidad}
								className='text-center bg-white count-input'
								disabled
							/>
							<Button variant="secondary" onClick={addOne}>
								<i className='bi bi-plus'/>
							</Button>
						</InputGroup>
						<Button className='position-absolute bottom-0 end-0 me-2' size='sm' variant="danger" onClick={removeAll}>
							<i className='bi bi-trash-fill'/>
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProductoThumbnail