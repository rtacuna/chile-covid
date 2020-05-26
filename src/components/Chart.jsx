import React from 'react'
import { Line } from 'react-chartjs-2'

const Chart = ({ data, label, color}) => {

  return (
    <div className='chart'>
      {data ?
          <Line
            data={{
              labels: data.map(({ date }) => date),
              datasets: [{
                data: data.map(({ confirmed }) => confirmed ),
                label: label,
                borderColor : color,
                fill: true,
              }]
            }}
            option={{
              title: {
                  display: true,
                  text: 'Custom Chart Title'
              }
            }}
          />
      : null }
    </div>
  )
}

export default Chart