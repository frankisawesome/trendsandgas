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

//Metric selection row that takes the top one third of the app component
const MetricsSelect = (props) => {
  const metrics1 = ['Your gas prices paid', 'Network gas prices']
  const metrics2 = ['Ethereum price', 'Ethereum market cap', 'Ethereum volume']
  const dateRange = ['week', 'month', '3 months']
  return (<div className='xs:flex-wrap md:flex w-full justify-around'>
    <div>
      <h1 className="font-medium text-3xl text-red-500">Metric One</h1>
      <CustomSelect options={metrics1} state={props.metricOne} setState={props.setMetricOne} />
    </div>
    <div>
      <h1 className="font-medium text-3xl text-red-500">Date Range</h1>
      <CustomSelect options={dateRange} state={props.dateRange} setState={props.setDateRange} />
    </div>
    <div>
      <h1 className="font-medium text-3xl text-red-500">Metric Two</h1>
      <CustomSelect options={metrics2} state={props.metricTwo} setState={props.setMetricTwo} />
    </div>
  </div>)
}

export default MetricsSelect