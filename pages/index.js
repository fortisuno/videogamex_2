import { Box, Button, Container, Divider, FormControl, Grid, IconButton, InputAdornment, InputLabel, List, ListItem, ListItemText, OutlinedInput, Stack, TextField, Typography } from "@mui/material";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import Navbar from "../components/Navbar";
import ProductosContainer from "../components/ProductosContainer";
import VentaLayout from "../components/VentaLayout";
import { appData } from "../utils/data";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CarritoItem from "../components/CarritoItem";
import { CarritoContext } from "../components/Carrito";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CloseIcon from '@mui/icons-material/Close';
import UsuariosDialog from '../components/UsuariosDialog'
import { useDialog } from "../hooks/useDialog";
import { SessionContext } from "../components/Session";
import DialogContainer from "../components/DialogContainer";
import axios from "axios";

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



export default function Home() {
	const [productos, setProductos] = useState([])
	const [carrito, setCarrito] = useState([])
	const [total, setTotal] = useState(0)
	const [pago, setPago] = useState(0)
	const [cambio, setCambio] = useState(0)

	const loadProductos = useCallback((p) => setProductos(p), [setProductos])
	const updateTotal = useCallback((t) => setTotal(t), [setTotal])
	const updateCambio = useCallback((c) => setCambio(c), [setCambio])
	const resetPago = useCallback(() => setPago(0), [setPago])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const {data} = await axios.get('/api/productos')
				loadProductos(data.entities)
			} catch (error) {
				console.log("error", error)
			}
		}

		fetchData()
	}, [loadProductos])

	useEffect(() => {
		let compra = 0;
		for(let producto of carrito) {
			compra += (producto.precio * producto.cantidad)
		}
		updateTotal(compra)
	}, [carrito, updateTotal])

	useEffect(() => {
		if(!(total > 0)) {
			resetPago()
		}
	}, [total, resetPago])

	useEffect(() => {
		if(pago > total) {
			updateCambio(pago - total)
		} else {
			updateCambio(0)
		}
	}, [pago, total, updateCambio])

	return (
		<CarritoContext.Provider value={{carrito, setCarrito}}>
			<Stack direction="row" sx={{height:'100%', width: '100%'}} divider={<Divider orientation="vertical" flexItem  />} py={5} spacing={4}>
				<Box flexGrow={1}>
					<ProductosContainer data={productos}/>
				</Box>
				<Box width={350}>
					<Box position={"sticky"} sx={{width:"100%", height: "80vh", top: 104 }}>
						<Typography variant="h4" gutterBottom>
						Punto de venta
						</Typography>
						<List sx={{ maxHeight: "50%", overflow: "auto"}}>
						{
							carrito.map((p, idx) => <CarritoItem key={idx} data={p} />)
						}              
						</List>
						<Box position={"absolute"} width="100%" bottom={0}>
							<Stack spacing={3}>
								<TextField 
									variant="outlined"
									size="small"
									label="Pago del cliente"
									disabled={total > 0 ? false : true}
									value={pago}
									onChange={({target}) => setPago(target.value)}
									sx={{textAlign: "rigth"}}
									placeholder="0"
									InputProps={{
										startAdornment: <InputAdornment position="start">$</InputAdornment>,
										endAdornment: <InputAdornment position="end">.00</InputAdornment>
									}}/>
								<Stack spacing={1}>
									<Box display="flex" >
										<Typography flexGrow={1} variant="body2">Total a pagar:</Typography>
										<Typography variant="body2">${total.toFixed(2)}</Typography>
									</Box>
									<Box display="flex">
										<Typography flexGrow={1} variant="body2">Cambio:</Typography>
										<Typography variant="body2">${cambio.toFixed(2)}</Typography>
									</Box>
								</Stack>
								<Stack spacing={1}>
									<Button variant="contained" disabled={carrito.length > 0 ? false : true} startIcon={<AttachMoneyIcon/>}>Pagar</Button>
									<Button variant="contained" disabled={carrito.length > 0 ? false : true} color="error" startIcon={<CloseIcon/>} onClick={() => setCarrito([])}>Cancelar</Button>
								</Stack>
							</Stack>
						</Box>
					</Box>
				</Box>
			</Stack>
		</CarritoContext.Provider>
	)
}

Home.getLayout = VentaLayout.getLayout
