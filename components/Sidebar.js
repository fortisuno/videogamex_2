import React from 'react'
import Link from 'next/link'
import { Nav } from 'react-bootstrap'

const Sidebar = ({path}) => {
  return (
    <div className='sidebar py-5'>
      <Nav variant='pills' className="flex-column" defaultActiveKey={path}>
        <Link href="/dashboard/productos" passHref><Nav.Link eventKey="/dashboard/productos"><i className='bi bi-bag-fill me-2'/> Productos</Nav.Link></Link>
        <Link href="/dashboard/categorias" passHref><Nav.Link eventKey="/dashboard/categorias"><i className='bi bi-bookmarks-fill me-2'/> Categorias</Nav.Link></Link>
        <Link href="/dashboard/usuarios" passHref><Nav.Link eventKey="/dashboard/usuarios"><i className='bi bi-person-fill me-2'/> Usuarios</Nav.Link></Link>
      </Nav>
    </div>
  )
}

export default Sidebar