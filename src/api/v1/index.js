import axios from 'axios'

let api_key = process.env.REACT_APP_API_KEY

let axiosConfig = {
  headers: {
      "x-rapidapi-host": "chile-coronapi1.p.rapidapi.com",
      "x-rapidapi-key": api_key,
      "useQueryString": true
  }
};


export const fetchComune = async () => {
  try {
    let url = 'https://chile-coronapi1.p.rapidapi.com/v3/models/communes'
    const { data } = await axios.get(url, axiosConfig)
    var result = Object.keys(data).map((key) => ({
      id: key,
      name: data[key].commune
    }))
    result.sort(function (a, b) {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
    return result
  } catch (error) { console.log(error) }
}

export const fetchRegion = async () => {
  try {
    let url = 'https://chile-coronapi1.p.rapidapi.com/v3/models/regions'
    const { data } = await axios.get(url, axiosConfig)
    var result = Object.keys(data).map((key) => ({
      id: key,
      name: data[key].region
    }))
    result.sort(function (a, b) {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
    return result
  } catch (error) { console.log(error) }
}

export const fetchCommuneData = async (commune) => {
  try {
    let url = `https://chile-coronapi1.p.rapidapi.com/v3/historical/communes?id=${commune}`
    const { data: { confirmed } } = await axios.get(url, axiosConfig)
    var result = Object.keys(confirmed).map((key) => ({
      date: key,
      confirmed: confirmed[key]
    }))
    var dateBefore = 0
    var resultDate = Object.keys(confirmed).map((key) => {
      let auxData = dateBefore
      dateBefore = confirmed[key]
      return ({ date: key, confirmed: (confirmed[key] - auxData) })
    })
    return { result: result, resultDate: resultDate }
  } catch (error) { console.log(error) }
}

export const fetchRegionData = async (region) => {
  try {
    let url = `https://chile-coronapi1.p.rapidapi.com/v3/historical/regions?id=${region}`
    const { data: { regionData } } = await axios.get(url, axiosConfig)
    var result = Object.keys(regionData).map((key) => ({
      date: key,
      confirmed: regionData[key].confirmed
    }))
    var dateBefore = 0
    var resultDate = Object.keys(regionData).map((key) => {
      let auxData = dateBefore
      dateBefore = regionData[key].confirmed
      return ({ date: key, confirmed: (regionData[key].confirmed - auxData) })
    })
    return { result: result, resultDate: resultDate }
  } catch (error) { console.log(error) }
}

export const fetchDataChile = async () => {
  const url = 'https://covid19.mathdro.id/api/countries/chile'
  try {
    const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(url)
    return { confirmed, recovered, deaths, lastUpdate }
  } catch ( error ) {

  }
}