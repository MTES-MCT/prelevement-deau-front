'use client'

import {PieChart} from '@mui/x-charts'

const Pie = ({data, height, width}) => (
  <PieChart
    series={[
      {
        data: [...data],
        arcLabel: item => item.value ?? ''
      }
    ]}
    width={width || 400}
    height={height || 300}
    margin={{right: 150}}
  />
)

export default Pie
