import { useEffect, useState } from 'react'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newFilter, setNewFilter] = useState('')

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }
  useEffect(hook, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter = {newFilter} setNewFilter = {setNewFilter} />
      <h2>Add a bew</h2>
      <PersonForm 
      persons = {persons} 
      setPersons = {setPersons} 
      />     
      <h2>Numbers</h2>
      <Persons
      persons = {persons}
      filter = {newFilter}
      />
    </div>
  )
}
export default App