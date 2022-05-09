import React, { useContext, useEffect } from 'react'
import { Card, Button } from 'react-bootstrap'
import CarritoContext from './Carrito'

const Producto = ({
	slug,
	titulo,
	categoria,
	imagen,
	precio,
}) => {

	const { carrito, setCarrito } = useContext(CarritoContext);

	const addToCart = (data) => {
		const producto = carrito.find((item) => item.slug === data.slug)
		
		if(!!producto) {
			setCarrito(carrito.map((item) => {
				if (item.slug === producto.slug) {
					item.cantidad++;
				}
				return item;
			}))
		} else {
			setCarrito((carritoPrev) => [...carritoPrev, {...data, cantidad: 1}])
		}
		
	}

	return (
		<Card className='producto position-relative' role="button" onClick={() => addToCart({slug, titulo, imagen, precio})}>
			{
				!!imagen
					? <Card.Img className='card-image' variant="top" src={imagen}/>
					: (
						<div className="bg-light rounded-top d-flex justify-content-center align-items-center" style={{width: '100%'}}>
							<i className='bi bi-eye-slash fs-1 text-muted'/>
						</div>
					)
			}
			<Card.Body className='text-center'>
				<h6>{titulo}</h6>
				<h6 className='text-muted'>{categoria}</h6>
				<Card.Text className='mt-3 fs-5'>${precio.toFixed(2)}</Card.Text>
			</Card.Body>
		</Card>
	)
}

export default Producto