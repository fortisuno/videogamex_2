import React from 'react'
import { InputGroup, Button, FormControl, Form, Row, Col } from 'react-bootstrap'
import Productos from './Productos'
import {appData} from '../utils/appData'

const ContainerProductos = () => {
  return (
	 <div className="productos-container">
		<Form className='w-100 mb-4' style={{padding: '0 1.5rem'}}>
			<Row>
				<Col xs='8'>
					<InputGroup>
						<Button variant="primary" id="button-addon1">
							<i className='bi bi-search me-2'/>
							Buscar 
						</Button>
						<FormControl
							aria-label="Example text with button addon"
							aria-describedby="basic-addon1"
							placeholder='Titulo...'
						/>
					</InputGroup>
				</Col>
				<Col>
					<Form.Select aria-label="Default select example">
						<option value="todos">Todas las categorías</option>
						{appData.categorias.map((categoria) => <option key={categoria.slug} value={categoria.slug}>{categoria.title}</option>)}
					</Form.Select>
				</Col>
			</Row>
		</Form>
		<div className="productos-view ">
			<Productos data={appData.productos}/>
		</div>
	 </div>
  )
}

export default ContainerProductos