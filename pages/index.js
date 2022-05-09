import ContainerProductos from '../components/ProductosContainer';
import Productos from '../components/Productos';
import VentaContainer from '../components/VentaContainer';
import ContentLayout from '../layouts/ContentLayout'
import { useState } from 'react';
import CarritoContext from '../components/Carrito'

export async function getStaticProps(ctx) {

  return {
    props: {
      data: {
        title: 'Inicio',
        admin: false
      }
    }, // will be passed to the page component as props
  }
}

export default function Home({data}) {

  const [carrito, setCarrito] = useState([]);

  return (
    <div className='d-flex h-100 py-5 gap-5 align-items-start'>
      <CarritoContext.Provider value={{carrito, setCarrito}}>
          <ContainerProductos/>
          <div className="vr my-auto" style={{height: '90%'}}/>
          <VentaContainer/>
      </CarritoContext.Provider>
    </div>
  )
}

Home.getLayout = ContentLayout.getLayout;