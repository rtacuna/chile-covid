import React from 'react'
import CommunePicker from './components/CommunePicker'
import Chart from './components/Chart'
import './assets/css/application.scss';

import coronaImage from './assets/images/icono_virus.png'

import { fetchCommuneData } from './api/v1/index'
class App extends React.Component {

  state = {
    commune: '',
    data: null
  }

  handleCommune = async (commune) => {
    if (commune) {
      const data = await fetchCommuneData(commune)
      this.setState({ commune: commune, data: data })
    } else {
      this.setState({ commune: commune, data: null })
    }
  }

  render () {
    return(
      <div className='container'>
        <img className='coronaImage' src={coronaImage} alt='COVID' />
        <h1>Casos confirmados según informe epidemiológico por comuna</h1>
        <CommunePicker handleCommune={this.handleCommune}/>
        <Chart  data={this.state.data} />
      </div>
    )
  }
}

export default App