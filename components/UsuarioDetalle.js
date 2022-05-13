import { Grid, Stack, Typography, Box, Chip, capitalize } from '@mui/material'
import React, { useContext } from 'react'
import DetalleView from './DetalleView'
import { DialogContext } from './DialogContainer'
import UsuarioForm from './UsuarioForm'

const UsuarioDetalle = ({}) => {

    const {data} = useContext(DialogContext)

    return (
      <DetalleView editableView={<UsuarioForm checkOnSave={true}/>} title="Editar usuario">
        <Grid item xs={6}>
          <Box display={"grid"} alignItems="baseline" gridTemplateColumns="100px 1fr">
            <Typography variant="overline" gutterBottom><b>Alias:</b></Typography>
            <Typography variant="body1" gutterBottom>{data.alias}</Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box display={"grid"} alignItems="baseline" gridTemplateColumns="100px 1fr">
            <Typography variant="overline" gutterBottom><b>Nombre:</b></Typography>
            <Typography variant="body1" gutterBottom>{`${data.nombre} ${data.apellidoPaterno} ${data.apellidoMaterno}`}</Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box display={"grid"} alignItems="baseline" gridTemplateColumns="100px 1fr">
            <Typography variant="overline" gutterBottom><b>Telefono:</b></Typography>
            <Typography variant="body1" gutterBottom>{data.telefono}</Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box display={"grid"} alignItems="baseline" gridTemplateColumns="100px 1fr">
            <Typography variant="overline" gutterBottom><b>Tipo:</b></Typography>
            <Box>
              <Chip label={capitalize(data.tipo)} variant="contained" color={data.tipo === "admin" ? "success" : "default"} />
            </Box>
          </Box>
        </Grid>
        
        <Grid item xs={12}>
          <Box display={"grid"} alignItems="baseline" gridTemplateColumns="100px 1fr">
            <Typography variant="overline" gutterBottom><b>Correo:</b></Typography>
            <Typography variant="body1" gutterBottom noWrap={true}>{data.correo}</Typography>
          </Box>
        </Grid>
      </DetalleView>
    )
}

export default UsuarioDetalle