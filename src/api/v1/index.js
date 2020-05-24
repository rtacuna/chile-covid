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

export const fetchCommuneData = async (commune) => {
  try {
    let url = `https://chile-coronapi1.p.rapidapi.com/v3/historical/communes?id=${commune}`
    const { data: { confirmed } } = await axios.get(url, axiosConfig)
    var result = Object.keys(confirmed).map((key) => ({
      date: key,
      confirmed: confirmed[key]
    }))
    return result
  } catch (error) { console.log(error) }
}