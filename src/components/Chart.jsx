import React from 'react'
import { Line } from 'react-chartjs-2'

const Chart = ({ data }) => {

  return (
    <div className='chart'>
      {data? <Line
        data={{
          labels: data.map(({ date }) => date),
          datasets: [{
            data: data.map(({ confirmed }) => confirmed ),
            label: 'Infectados',
            borderColor : '#3333ff',
            fill: true
          }]
        }}
      />
      : null }
    </div>
  )
}

export default Chart