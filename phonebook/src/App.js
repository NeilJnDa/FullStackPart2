import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/Person'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newFilter, setNewFilter] = useState('')

  const hook = () => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
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