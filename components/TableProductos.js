import React from 'react'
import { Col, Row, ListGroup, Button } from 'react-bootstrap'

const TableProductos = ({items}) => {
	return (
		<ListGroup className='mt-5 text-center'>
			{
				items.map((producto, i) => (
					<ListGroup.Item className={i > 0 ? "item-row" : 'bg-primary text-white fw-bolder'} key={i}>
						<Row>
							{
								producto.map((attr, j) => (
									<Col key={j}>
										{
											attr
										}
									</Col>
								))
							}
							<Col>
								{
									i === 0
										? "Eliminar"
										: (
											<Button size='sm' variant="danger">
												<i className='bi bi-trash-fill'/>
											</Button>
										)
								}
							</Col>
						</Row>
					</ListGroup.Item>
				))
			}
		</ListGroup>
	)
}

export default TableProductos