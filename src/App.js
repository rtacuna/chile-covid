import React from 'react'
import CommunePicker from './components/CommunePicker'
import RegionPicker from './components/RegionPicker'
import Chart from './components/Chart'
import GeneralData from './components/GeneralData'
import './assets/css/application.scss';
import { ButtonGroup, Button } from '@material-ui/core'

import coronaImage from './assets/images/icono_virus.png'

import { fetchCommuneData, fetchRegionData } from './api/v1/index'
class App extends React.Component {

  state = {
    commune: '',
    region: '',
    data: null,
    dataDate: null,
    dataGeneral: null,
    selectInfo: null,
  }

  handleCommune = async (commune) => {
    if (commune) {
      const { result, resultDate } = await fetchCommuneData(commune)
      this.setState({ commune: commune, data: result, dataDate: resultDate, dataGeneral: { confirmed: result[result.length -1].confirmed, newConfirmed: resultDate[resultDate.length -1].confirmed } })
    } else {
      this.setState({ commune: '', data: null, dataDate: null, dataGeneral: null })
    }
  }

  handleRegion = async (region) => {
    if (region) {
      const { result, resultDate } = await fetchRegionData(region)
      this.setState({ commune: region, data: result, dataDate: resultDate, dataGeneral: { confirmed: result[result.length -1].confirmed, newConfirmed: resultDate[resultDate.length -1].confirmed } })
    } else {
      this.setState({ region: '', data: null, dataDate: null, dataGeneral: null })
    }
  }

  groupClicked = (info) => {
    this.setState({ selectInfo: info, commune: '', region: '', data: null, dataDate: null, dataGeneral: null });
  }

  render () {
    return(
      <div className='container'>
        <img className='coronaImage' src={coronaImage} alt='COVID' />
        <h1 className='tittleLabel'>Datos del coronavirus por comuna y región en Chile</h1>

        <ButtonGroup variant="contained" color="primary">
          <Button disabled={this.state.selectInfo === 'regions' ? true : false} onClick={this.groupClicked.bind(this, 'regions')}>Regiones</Button>
          <Button disabled={this.state.selectInfo === 'comunes' ? true : false} onClick={this.groupClicked.bind(this, 'comunes')}>Comunas</Button>
        </ButtonGroup>

        { this.state.selectInfo === 'comunes' ?
            <CommunePicker handleCommune={this.handleCommune}/>
        : null }
        { this.state.selectInfo === 'regions' ?
            <RegionPicker handleRegion={this.handleRegion}/>
        : null }
        { this.state.dataGeneral ? <GeneralData data={this.state.dataGeneral} /> : null }
        { this.state.data ? <h3 className='tittleLabel'>Casos confirmados acumulados según informe epidemiológico</h3> : null }
        <Chart data={this.state.data} label={'Infectados'} color={'#3333ff'}/>
        { this.state.dataDate ? <h3 className='tittleLabel'>Casos nuevos infectados según informe epidemiológico</h3> : null }
        <Chart data={this.state.dataDate} label={'Infectados Nuevos'} color={'green'}/>
      </div>
    )
  }
}

export default App