import React, { useState, useEffect } from 'react'
import { FormControl, NativeSelect, InputLabel } from '@material-ui/core'

import { fetchComune } from './../api/v1/index'

const CommunePicker = ({ handleCommune }) => {
  const [comunes, setComunes] = useState(null)

  useEffect(() => {
    const fetchComunesAPI = async () => {
      const initialComunes = await fetchComune()
      setComunes(initialComunes)
    }
    fetchComunesAPI()
  }, [])

  return(
    <div className='communesPicker'>
      {comunes ?
        <FormControl>
          <InputLabel id="demo-simple-select-label">Comuna</InputLabel>
          <NativeSelect onChange={(e) => handleCommune(e.target.value)}>
            <option value=''></option>
            {comunes.map((comune) => <option key={comune.id} value={comune.id}>{comune.name}</option>)}
          </NativeSelect>
        </FormControl>
      : <h2>Cargando ...</h2>}
    </div>
  )

}

export default CommunePicker