import './App.css';
import { useState, useEffect} from 'react';
import axios from 'axios'

function App() {
  //API
  const api_key = process.env.REACT_APP_API_KEY
  //Hook State
  const [input, setInput] = useState('')
  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState()
  const [result, setResult] = useState([])
  //Weather 
  function WeatherAPI(result){
    console.log("WeatherAPI")
    if(result.length === 1){
      axios
      .get("https://api.openweathermap.org/data/2.5/weather", {
        params:{
          lat : result[0].capitalInfo.latlng[0],
          lon : result[0].capitalInfo.latlng[1],
          appid : process.env.REACT_APP_API_KEY
        }
      })
      .then(response => {
        //console.log(response.data)
        setWeather(response.data)
      })
    }
  }
  //Input Change Event handler
  const handleInputChangeEvent = (event) => {
    event.preventDefault()
    setInput(event.target.value)
    setResult(
      countries.filter(x => x.name.common.toLowerCase().includes(input.toLowerCase()))
    )
  }
  const handleInputChange = (newInput) =>{
    setInput(newInput)
    setResult(
      countries.filter(x => x.name.common.toLowerCase().includes(newInput.toLowerCase()))
    )
  }
  //Get country data
  const lookupHook = () =>{
    axios
    .get("https://restcountries.com/v3.1/all")
    .then(response => {
      setCountries(response.data)
   })
  }


  //Hook Effect
  useEffect(lookupHook,[])
  useEffect(()=> WeatherAPI(result), [result.length])


  return (
    <div>
      <form>
        Find Country:
        <input
        placeholder="Country name"
        value = {input}
        onChange = {handleInputChangeEvent}
        />
      </form>
      <DisplayResult
        result = {result}
        input = {input}
        weather = {weather}
        handleInputChange = {handleInputChange}
      />
    </div>
  );
}
const DisplayResult = ({result, input, weather, handleInputChange}) =>{
  console.log("Display")
  //No input
  if(input.length === 0){
    return(null)
  }
  //No match
  else if(result.length  === 0){
    return (<p>No match</p>)
  }
  //Too many matchs
  else if(result.length > 10) {
    return(<p>Too many matches, specify another filter</p>)
  }
  //Choose one match
  else if(result.length > 1){
    return(
      result.map(x => 
      <div key = {x.name.common}>
      <p>
      {x.name.common}
      <button onClick={() => handleInputChange(x.name.common)}>Show</button>
      </p> 
      </div>
      )
    )
  }
  //Only one match
  else{
    const res = result[0]
    return(
      <div>
        <h1>{res.name.common}</h1>
        <p>Capital: {res.capital}</p>
        <p>Area: {res.area}</p>
        <h2>Languages:</h2>
        <ul>
          {Object.values(res.languages).map(x => <li key = {x}>{x}</li>)}
        </ul>
        <img src = {res.flags.png} alt="Flag"></img>
        <h2>Weather in {res.capital}</h2>
        <p>Temperature: {weather ? (weather.main.temp -273.15).toLocaleString(undefined, {maximumFractionDigits:2}) : "NoData"} °C </p>
        <p>Wind: {weather ? weather.wind.speed : "NoData"} m/s </p> 
      </div>
    )
  }

}
export default App;
