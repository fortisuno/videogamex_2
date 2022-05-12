import { Grid, Stack, Typography, Box } from '@mui/material'
import React from 'react'
import DetalleView from './DetalleView'

const UsuarioDetalle = ({data, dialogActions}) => {
    return (
      <DetalleView {...dialogActions}>
        <Grid item xs={6}>
          <Box display={"grid"} gridTemplateColumns="40% 1fr">
            <Typography variant="overline" gutterBottom><b>Alias:</b></Typography>
            <Typography variant="overline" gutterBottom>{data.alias}</Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box display={"grid"} gridTemplateColumns="40% 1fr">
            <Typography variant="overline" gutterBottom><b>Nombre ompleto:</b></Typography>
            <Typography variant="overline" noWrap={true} gutterBottom>{`${data.nombre} ${data.apellidoPaterno} ${data.apellidoMaterno}`}</Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box display={"grid"} gridTemplateColumns="40% 1fr">
            <Typography variant="overline" gutterBottom><b>Correo:</b></Typography>
            <Typography variant="overline" gutterBottom noWrap={true}>{data.correo}</Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box display={"grid"} gridTemplateColumns="40% 1fr">
            <Typography variant="overline" gutterBottom><b>Telefono:</b></Typography>
            <Typography variant="overline" gutterBottom>{data.telefono}</Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box display={"grid"} gridTemplateColumns="40% 1fr">
            <Typography variant="overline" gutterBottom><b>Contra:</b></Typography>
            <Typography variant="overline" gutterBottom>{data.contra}</Typography>
          </Box>
        </Grid>
      </DetalleView>
    )
}

export default UsuarioDetalle