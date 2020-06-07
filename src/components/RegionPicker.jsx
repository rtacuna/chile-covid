import React, { useState, useEffect } from 'react'
import { FormControl, NativeSelect, InputLabel } from '@material-ui/core'

import { fetchRegion } from './../api/v1/index'

const RegionPicker = ({ handleRegion }) => {
  const [regions, setRegions] = useState(null)

  useEffect(() => {
    const fetchRegionsAPI = async () => {
      const initialRegions = await fetchRegion()
      setRegions(initialRegions)
    }
    fetchRegionsAPI()
  }, [])

  return(
    <div className='communesPicker'>
      {regions ?
        <FormControl>
          <InputLabel id="demo-simple-select-label">Region</InputLabel>
          <NativeSelect onChange={(e) => handleRegion(e.target.value)}>
            <option value=''></option>
            {regions.map((region) => <option key={region.id} value={region.id}>{region.name}</option>)}
          </NativeSelect>
        </FormControl>
      : <h2>Cargando ...</h2>}
    </div>
  )

}

export default RegionPicker