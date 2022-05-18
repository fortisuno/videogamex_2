import { TableCell } from '@mui/material'
import React from 'react'

const TableHeadCell = ({titulo}) => {
  return <TableCell sx={{ fontWeight: "bolder", textAlign: "center" }} >{titulo}</TableCell>
}

export default TableHeadCell