import React from 'react'
import { Card, CardContent, Typography, Grid } from '@material-ui/core'
import CountUp from 'react-countup'

const GeneralData = ({ data: { confirmed, newConfirmed }}) => {

  return(
    <div className='card-container'>
      <Grid container spacing={3} justify='center'>
        <Grid item component={Card} xs={12} md={4} className='card'>
          <CardContent>
            <Typography color='textSecondary' gutterBottom>Infectados Total</Typography>
            <Typography variant='h5'>
              <CountUp start={0} end={confirmed} duration={1.5} separator={','} />
            </Typography>
            <Typography variant='body2'>Número de casos infectados por COVID-19 en la comuna</Typography>
          </CardContent>
        </Grid>
        <Grid item component={Card} xs={12} md={4} className='card'>
          <CardContent>
            <Typography color='textSecondary' gutterBottom>Nuevos casos</Typography>
            <Typography variant='h5'>
              <CountUp start={0} end={newConfirmed} duration={1.5} separator={','} />
            </Typography>
            <Typography variant='body2'>Número de nuevos casos por COVID-19 según último informe epidemiológico</Typography>
          </CardContent>
        </Grid>
      </Grid>
    </div>
  )

}

export default GeneralData