import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import React, { useContext } from 'react'
import NoImage from './NoImage'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { CarritoContext } from './Carrito';

const ProductoCard = ({producto}) => {
    const {slug, imagen, titulo, categoria, precio} = producto

    const {carrito, setCarrito} = useContext(CarritoContext)

    const addToCarrito = (data) => {
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
      <Card elevation={0}>
        {
          imagen ? (
            <CardMedia
              component={"img"}
              alt={slug}
              height={200}
              src={imagen}
            />
          ) : <NoImage height='200px'/>
        }
        <CardContent>
          <Typography variant="subtitle1" textAlign={"center"} noWrap component="div">
            <b>{titulo}</b>
          </Typography>
          <Typography gutterBottom variant="subtitle2" textAlign={"center"} noWrap component="div">
            {categoria}
          </Typography>
          <Typography gutterBottom variant="body1" textAlign={"center"} noWrap component="div">
            ${precio}
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant='contained' startIcon={<AddShoppingCartIcon/>} fullWidth onClick={() => addToCarrito(producto)}>
            Agregar
          </Button>
        </CardActions>
      </Card>
    )
}

export default ProductoCard