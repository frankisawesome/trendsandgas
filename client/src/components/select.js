import React from 'react'
import { Select, MenuItem } from '@material-ui/core'

const CustomSelect = ({options, setState, state}) => {
  return (<Select
  labelId="demo-simple-select-outlined-label"
  id="demo-simple-select-outlined"
  value={state}
  onChange={(e) => setState(e.target.value)}
  label="Metric"
>
{options.map((option) => <MenuItem value={option}>{option}</MenuItem>)}
</Select>)
}

export default CustomSelect