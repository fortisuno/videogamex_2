import React from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';

const VentasSearch = () => {
	const [date, setDate] = React.useState(new Date());
	const [periodo, setPeriodo] = React.useState(0);

	return (
		<LocalizationProvider dateAdapter={AdapterMoment}>
			<Stack direction={"row"} spacing={3}>
				<FormControl>
					<InputLabel id="outlined-adornment-venta">Periodo</InputLabel>
					<Select
						labelId="outlined-adornment-venta"
						id="demo-simple-select"
						value={periodo}
						label="Periodo"
						onChange={({target}) => setPeriodo(target.value)}
					>
						<MenuItem value={0}>Año</MenuItem>
						<MenuItem value={1}>Mes</MenuItem>
					</Select>
				</FormControl>
				{
					!periodo
						? (
							<DatePicker
								views={['year']}
								label="Buscar venta"
								value={date}
								onChange={(newDate) => {
									setDate(newDate);
								}}
								renderInput={(params) => <TextField {...params} helperText={null} />}
							/>
						) : (
							<DatePicker
								views={['year', 'month']}
								label="Buscar venta"
								value={date}
								onChange={(newDate) => {
									setDate(newDate);
								}}
								renderInput={(params) => <TextField {...params} helperText={null} />}
							/>
						)
				}
				
			</Stack>
		</LocalizationProvider>
	)
}

export default VentasSearch