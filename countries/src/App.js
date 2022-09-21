import './App.css';
import { useState, useEffect} from 'react';
import axios from 'axios'

function App() {
  const [input, setInput] = useState('')
  const [countries, setCountries] = useState([])
  const handleInputChange = (event) => {
    event.preventDefault()
    setInput(event.target.value)
  }
  const lookupHook = () =>{
    axios
    .get("https://restcountries.com/v3.1/all")
    .then(response => {
      setCountries(response.data)
   })
  }
  useEffect(lookupHook,[])
  //console.log(countries)

  return (
    <div>
      <form>
        Find Country:
        <input
        placeholder="Country name"
        value = {input}
        onChange = {handleInputChange}
        />
      </form>
      <DisplayResult
        countries = {countries}
        input = {input}
      />
    </div>
  );
}
const DisplayResult = ({countries, input}) =>{
  const result = countries
  .filter(x => x.name.common.toLowerCase().includes(input.toLowerCase()))
  if(input.length === 0){
    return(null)
  }
  else if(result.length  === 0){
    return (<p>No match</p>)
  }
  else if(result.length > 10) {
    return(<p>Too many matches, specify another filter</p>)
  }
  else if(result.length > 1){
    return(
      result.map(x => <p>{x.name.common}</p>)
    )
  }
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
      </div>
    )
  }

}
export default App;
