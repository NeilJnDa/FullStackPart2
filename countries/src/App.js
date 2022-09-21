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
        setInput = {setInput}
      />
    </div>
  );
}
const DisplayResult = ({countries, input, setInput}) =>{
  function handleShow(newInput){
    setInput(newInput)
  }
  const result = countries
  .filter(x => x.name.common.toLowerCase().includes(input.toLowerCase()))

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
      <div>
      <p>
      {x.name.common}
      <button onClick={() => handleShow(x.name.common)}>Show</button>
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
      </div>
    )
  }

}
export default App;
