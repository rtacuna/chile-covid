import React from 'react'
import CommunePicker from './components/CommunePicker'
import Chart from './components/Chart'
import GeneralData from './components/GeneralData'
import './assets/css/application.scss';

import coronaImage from './assets/images/icono_virus.png'

import { fetchCommuneData } from './api/v1/index'
class App extends React.Component {

  state = {
    commune: '',
    data: null,
    dataDate: null,
    dataGeneral: null
  }

  handleCommune = async (commune) => {
    if (commune) {
      const { result, resultDate } = await fetchCommuneData(commune)
      this.setState({ commune: commune, data: result, dataDate: resultDate, dataGeneral: { confirmed: result[result.length -1].confirmed, newConfirmed: resultDate[resultDate.length -1].confirmed } })
    } else {
      this.setState({ commune: commune, data: null, dataDate: null, dataGeneral: null })
    }
  }

  render () {
    return(
      <div className='container'>
        <img className='coronaImage' src={coronaImage} alt='COVID' />
        <h1 className='tittleLabel'>Datos del coronavirus por comuna en Chile</h1>
        <CommunePicker handleCommune={this.handleCommune}/>
        { this.state.dataGeneral ? <GeneralData data={this.state.dataGeneral} /> : null }
        { this.state.data ? <h3 className='tittleLabel'>Casos confirmados acumulados según informe epidemiológico por comuna</h3> : null }
        <Chart data={this.state.data} label={'Infectados'} color={'#3333ff'}/>
        { this.state.dataDate ? <h3 className='tittleLabel'>Casos nuevos infectados según informe epidemiológico por comuna</h3> : null }
        <Chart data={this.state.dataDate} label={'Infectados Nuevos'} color={'green'}/>
      </div>
    )
  }
}

export default App